import {
  PsrApiEnums,
  type PsrApi,
  type PsrContainer,
  type PsrContainerItem,
  type PsrContainerListFilter,
  type PsrGuid,
} from '@kmuip/pws-api'
import type {
  FormListOptions,
  FormRecord,
  PasswordCreateInput,
  PasswordCreateFromFormInput,
  PasswordGetOptions,
  PasswordRotateInput,
  PasswordRotateResult,
  PasswordHistoryRecord,
  PasswordListOptions,
  PasswordRecord,
  PasswordSecretRecord,
  PasswordUpdateInput,
} from '../types.js'
import {
  applyOrganisationUnitFilter,
  asArray,
  containsText,
  createSearchFilterGroup,
  createTagReference,
  ensureContainerItem,
  findContainerItemByName,
  getContainerDisplayName,
  isPasswordContainer,
  normalizeText,
  paginate,
  setOrganisationUnitFilterScope,
  sortRecords,
} from '../utils.js'
import { PasswordGenerationResource } from './password-generation.js'
import { TagsResource } from './tags.js'

function toPasswordRecord(container: PsrContainer): PasswordRecord {
  return {
    id: container.Id,
    name: getContainerDisplayName(container),
    username: normalizeText(findContainerItemByName(container, 'Username')?.Value),
    url: normalizeText(findContainerItemByName(container, 'Website')?.Value),
    notes: normalizeText(
      findContainerItemByName(container, 'Information')?.ValueMemo ??
        findContainerItemByName(container, 'Information')?.Value,
    ),
    tagIds: asArray(container.DataTags).map((tag) => tag.TagId as PsrGuid),
    organisationUnitId: (container.OrganisationUnitId as PsrGuid | undefined) ?? null,
    raw: container,
  }
}

function toFormRecord(container: PsrContainer): FormRecord {
  return {
    id: container.Id,
    name: getContainerDisplayName(container),
    organisationUnitId: (container.OrganisationUnitId as PsrGuid | undefined) ?? null,
    raw: container,
  }
}

function setItemValue(item: PsrContainerItem, value: string | null | undefined) {
  const normalized = value ?? undefined
  if (item.ContainerItemType === PsrApiEnums.PsrContainerItemType.ContainerItemMemo) {
    ;(item as Record<string, unknown>).ValueMemo = normalized
  }
  item.Value = normalized
}

async function upsertStandardItems(
  raw: PsrApi,
  container: PsrContainer,
  input: Pick<
    PasswordCreateInput,
    'name' | 'username' | 'password' | 'url' | 'notes' | 'otpSecret'
  >,
) {
  const descriptionItem = await ensureContainerItem(
    container,
    'Description',
    PsrApiEnums.PsrContainerItemType.ContainerItemText,
    () =>
      raw.containerManager.initContainerItem(PsrApiEnums.PsrContainerItemType.ContainerItemText),
  )
  setItemValue(descriptionItem, input.name)

  const usernameItem = await ensureContainerItem(
    container,
    'Username',
    PsrApiEnums.PsrContainerItemType.ContainerItemUserName,
    () =>
      raw.containerManager.initContainerItem(
        PsrApiEnums.PsrContainerItemType.ContainerItemUserName,
      ),
  )
  setItemValue(usernameItem, input.username ?? null)

  const passwordItem = await ensureContainerItem(
    container,
    'Password',
    PsrApiEnums.PsrContainerItemType.ContainerItemPassword,
    () =>
      raw.containerManager.initContainerItem(
        PsrApiEnums.PsrContainerItemType.ContainerItemPassword,
      ),
  )
  passwordItem.PlainTextValue = input.password

  const urlItem = await ensureContainerItem(
    container,
    'Website',
    PsrApiEnums.PsrContainerItemType.ContainerItemUrl,
    () => raw.containerManager.initContainerItem(PsrApiEnums.PsrContainerItemType.ContainerItemUrl),
  )
  setItemValue(urlItem, input.url ?? null)

  const notesItem = await ensureContainerItem(
    container,
    'Information',
    PsrApiEnums.PsrContainerItemType.ContainerItemMemo,
    () =>
      raw.containerManager.initContainerItem(PsrApiEnums.PsrContainerItemType.ContainerItemMemo),
  )
  setItemValue(notesItem, input.notes ?? null)

  if (input.otpSecret != null) {
    const otpItem = await ensureContainerItem(
      container,
      'One-Time Password',
      PsrApiEnums.PsrContainerItemType.ContainerItemOtp,
      () =>
        raw.containerManager.initContainerItem(PsrApiEnums.PsrContainerItemType.ContainerItemOtp),
    )
    otpItem.PlainTextValue = input.otpSecret
  } else {
    const existingOtpItem = findContainerItemByName(container, 'One-Time Password')
    if (
      existingOtpItem &&
      existingOtpItem.ContainerItemType === PsrApiEnums.PsrContainerItemType.ContainerItemOtp
    ) {
      existingOtpItem.PlainTextValue = ''
    }
  }
}

export class PasswordsResource {
  private readonly tags: TagsResource
  private readonly passwordGeneration: PasswordGenerationResource
  private defaultCreateFormIdPromise: Promise<PsrGuid> | null = null

  constructor(private readonly raw: PsrApi) {
    this.tags = new TagsResource(raw)
    this.passwordGeneration = new PasswordGenerationResource(raw)
  }

  async create(input: PasswordCreateInput) {
    const templateId = input.templateId ?? (await this.resolveDefaultCreateFormId())
    const container = await this.raw.containerManager.cloneContainer(templateId)

    container.ContainerType = PsrApiEnums.PsrContainerType.Password as never
    await upsertStandardItems(this.raw, container, input)

    if (input.tagIds?.length) {
      const tags = await this.tags.getByIds(input.tagIds)
      container.DataTags = tags.map((tag) => createTagReference(tag))
    }

    const created = await this.raw.containerManager.addContainer(
      container,
      input.organisationUnitId,
      null,
      null,
    )

    return toPasswordRecord(created)
  }

  async createFromForm(input: PasswordCreateFromFormInput) {
    return this.create({
      ...input,
      templateId: input.formId,
    })
  }

  async clone(
    id: PsrGuid,
    input: PasswordUpdateInput & { organisationUnitId?: PsrGuid | null } = {},
  ) {
    const source = await this.raw.containerManager.getContainer(id)
    if (!isPasswordContainer(source)) {
      throw new Error(`Container ${id} is not a password container.`)
    }

    const parentOrganisationUnitId =
      input.organisationUnitId ??
      (source.OrganisationUnitId as PsrGuid | undefined) ??
      (await this.raw.containerManager.getContainerInvolvedOrganisationUnit(id)).at(0) ??
      null
    if (!parentOrganisationUnitId) {
      throw new Error(`Could not resolve parent organisation unit for password container ${id}.`)
    }
    const secret = await this.getSecret(id, 'SDK password clone')
    return this.create({
      organisationUnitId: parentOrganisationUnitId,
      templateId: (source.BaseContainerId as PsrGuid | undefined) ?? null,
      name: input.name ?? getContainerDisplayName(source) ?? 'Cloned Password',
      username:
        input.username ?? normalizeText(findContainerItemByName(source, 'Username')?.Value) ?? null,
      password: input.password ?? secret.password ?? '',
      url: input.url ?? normalizeText(findContainerItemByName(source, 'Website')?.Value) ?? null,
      notes:
        input.notes ??
        normalizeText(
          findContainerItemByName(source, 'Information')?.ValueMemo ??
            findContainerItemByName(source, 'Information')?.Value,
        ) ??
        null,
      otpSecret: input.otpSecret ?? secret.otpSecret ?? null,
      tagIds: input.tagIds ?? asArray(source.DataTags).map((tag) => tag.TagId as PsrGuid),
    })
  }

  async rotate(id: PsrGuid, input: PasswordRotateInput = {}) {
    const nextPassword =
      input.password ??
      (await this.passwordGeneration.generate(
        input.generate?.mode === 'policy'
          ? {
              mode: 'policy',
              policyId: input.generate.policyId ?? null,
              policyCategory: input.generate.policyCategory ?? null,
              usernames: input.generate.usernames ?? null,
            }
          : {
              mode: 'phonetic',
              length: input.generate?.length ?? 20,
              syllableCount: input.generate?.syllableCount ?? 4,
              separator: input.generate?.separator ?? null,
              useLeetSpeak: input.generate?.useLeetSpeak ?? false,
            },
      ))

    const record = await this.update(id, { password: nextPassword })
    return { record, password: nextPassword } satisfies PasswordRotateResult
  }

  async update(id: PsrGuid, input: PasswordUpdateInput) {
    const container = await this.raw.containerManager.getContainer(id)
    if (!isPasswordContainer(container)) {
      throw new Error(`Container ${id} is not a password container.`)
    }

    if (input.name != null) {
      setItemValue(
        await ensureContainerItem(
          container,
          'Description',
          PsrApiEnums.PsrContainerItemType.ContainerItemText,
          () =>
            this.raw.containerManager.initContainerItem(
              PsrApiEnums.PsrContainerItemType.ContainerItemText,
            ),
        ),
        input.name,
      )
    }
    if (input.username != null) {
      setItemValue(
        await ensureContainerItem(
          container,
          'Username',
          PsrApiEnums.PsrContainerItemType.ContainerItemUserName,
          () =>
            this.raw.containerManager.initContainerItem(
              PsrApiEnums.PsrContainerItemType.ContainerItemUserName,
            ),
        ),
        input.username,
      )
    }
    if (input.password != null) {
      ;(
        await ensureContainerItem(
          container,
          'Password',
          PsrApiEnums.PsrContainerItemType.ContainerItemPassword,
          () =>
            this.raw.containerManager.initContainerItem(
              PsrApiEnums.PsrContainerItemType.ContainerItemPassword,
            ),
        )
      ).PlainTextValue = input.password
    }
    if (input.url != null) {
      setItemValue(
        await ensureContainerItem(
          container,
          'Website',
          PsrApiEnums.PsrContainerItemType.ContainerItemUrl,
          () =>
            this.raw.containerManager.initContainerItem(
              PsrApiEnums.PsrContainerItemType.ContainerItemUrl,
            ),
        ),
        input.url,
      )
    }
    if (input.notes != null) {
      setItemValue(
        await ensureContainerItem(
          container,
          'Information',
          PsrApiEnums.PsrContainerItemType.ContainerItemMemo,
          () =>
            this.raw.containerManager.initContainerItem(
              PsrApiEnums.PsrContainerItemType.ContainerItemMemo,
            ),
        ),
        input.notes,
      )
    }
    if (input.otpSecret != null) {
      ;(
        await ensureContainerItem(
          container,
          'One-Time Password',
          PsrApiEnums.PsrContainerItemType.ContainerItemOtp,
          () =>
            this.raw.containerManager.initContainerItem(
              PsrApiEnums.PsrContainerItemType.ContainerItemOtp,
            ),
        )
      ).PlainTextValue = input.otpSecret
    }

    const updated = await this.raw.containerManager.updateContainer(container, undefined as never)

    if (input.tagIds) {
      const tags = await this.tags.getByIds(input.tagIds)
      await this.raw.tagManager.setDataTags(
        tags.map((tag) => createTagReference(tag, updated.Id)),
        updated.Id,
      )
      updated.DataTags = tags.map((tag) => createTagReference(tag, updated.Id))
    }

    return toPasswordRecord(updated)
  }

  async get(id: PsrGuid, options: PasswordGetOptions = {}) {
    const container = await this.raw.containerManager.getContainer(id)
    if (!isPasswordContainer(container)) {
      throw new Error(`Container ${id} is not a password container.`)
    }

    if (options.includeSecrets) {
      await this.applySecrets(container, options.reason ?? 'SDK get')
    }

    return toPasswordRecord(container)
  }

  async list(options: PasswordListOptions = {}) {
    const filter = await this.raw.containerManager.getContainerListFilter(
      PsrApiEnums.PsrContainerType.Password,
      true,
    )

    if (options.organisationUnitId) {
      applyOrganisationUnitFilter(filter, options.organisationUnitId)
      setOrganisationUnitFilterScope(filter, options.includeSubOrganisationUnits ?? true)
    }

    const groups = ((filter as Record<string, unknown>).FilterGroups ??= []) as Record<
      string,
      unknown
    >[]
    if (options.search) {
      groups.push(createSearchFilterGroup(options.search))
    }

    const containers = asArray(
      await this.raw.containerManager.getContainerList(
        PsrApiEnums.PsrContainerType.Password,
        filter,
      ),
    )

    const records = containers
      .filter((container) => {
        if (options.ids?.length) {
          const ids = new Set(options.ids)
          if (!ids.has(container.Id)) {
            return false
          }
        }

        const tagIds = new Set(asArray(container.DataTags).map((tag) => tag.TagId as PsrGuid))
        if (options.tagIds?.length) {
          const matchAll = options.matchAllTags ?? true
          const hasMatch = matchAll
            ? options.tagIds.every((tagId) => tagIds.has(tagId))
            : options.tagIds.some((tagId) => tagIds.has(tagId))
          if (!hasMatch) {
            return false
          }
        }

        const name = getContainerDisplayName(container)
        const username = findContainerItemByName(container, 'Username')?.Value
        const url = findContainerItemByName(container, 'Website')?.Value
        const notes = findContainerItemByName(container, 'Information')?.Value

        if (!containsText(name, options.name)) {
          return false
        }
        if (!containsText(username, options.username)) {
          return false
        }
        if (!containsText(url, options.url)) {
          return false
        }
        if (!containsText(notes, options.notes)) {
          return false
        }

        if (options.search) {
          const haystack = [name, username, url, notes].filter(Boolean).join(' ')
          if (!containsText(haystack, options.search)) {
            return false
          }
        }

        return true
      })
      .map(toPasswordRecord)

    const sorted = options.sortBy
      ? sortRecords(records, (record) => record[options.sortBy ?? 'name'], options.sortDirection)
      : records

    return paginate(sorted, options.page, options.pageSize)
  }

  async delete(id: PsrGuid) {
    const container = await this.raw.containerManager.getContainer(id)
    await this.raw.containerManager.deleteContainer(container)
  }

  async getSecret(id: PsrGuid, reason = 'SDK secret read') {
    const container = await this.raw.containerManager.getContainer(id)
    if (!isPasswordContainer(container)) {
      throw new Error(`Container ${id} is not a password container.`)
    }

    await this.applySecrets(container, reason)
    return {
      id: container.Id,
      password: normalizeText(findContainerItemByName(container, 'Password')?.PlainTextValue),
      otpSecret: normalizeText(
        findContainerItemByName(container, 'One-Time Password')?.PlainTextValue,
      ),
      raw: container,
    } satisfies PasswordSecretRecord
  }

  async reveal(id: PsrGuid, reason = 'SDK reveal password') {
    const secret = await this.getSecret(id, reason)
    return secret.password
  }

  async history(id: PsrGuid) {
    const historyEntries = await this.raw.containerManager.getContainerHistoryList(
      PsrApiEnums.PsrContainerType.Password,
      id,
    )

    return historyEntries.map((entry): PasswordHistoryRecord => {
      const container = (entry.Container as PsrContainer | null | undefined) ?? null
      return {
        id: container?.Id ?? null,
        name: container ? getContainerDisplayName(container) : null,
        timestampUtc: (container?.TimeStampUtc as Date | string | null | undefined) ?? null,
        container,
        raw: entry,
      }
    })
  }

  async listForms(options: FormListOptions = {}) {
    const filter = (await this.raw.containerManager.getContainerListFilter(
      PsrApiEnums.PsrContainerType.Form,
      true,
    )) as PsrContainerListFilter

    const groups = ((filter as Record<string, unknown>).FilterGroups ??= []) as Record<
      string,
      unknown
    >[]
    if (options.search) {
      groups.push(createSearchFilterGroup(options.search))
    }

    const forms = asArray(
      await this.raw.containerManager.getContainerList(PsrApiEnums.PsrContainerType.Form, filter),
    )

    const records = forms
      .filter((container) => {
        if (options.ids?.length) {
          const ids = new Set(options.ids)
          if (!ids.has(container.Id)) {
            return false
          }
        }

        const name = getContainerDisplayName(container)
        if (!containsText(name, options.name)) {
          return false
        }

        if (options.search && !containsText(name, options.search)) {
          return false
        }

        return true
      })
      .map(toFormRecord)

    const sorted = options.sortBy
      ? sortRecords(records, (record) => record[options.sortBy ?? 'name'], options.sortDirection)
      : records

    return paginate(sorted, options.page, options.pageSize)
  }

  private async resolveDefaultCreateFormId(): Promise<PsrGuid> {
    this.defaultCreateFormIdPromise ??= this.findDefaultCreateFormId()
    return this.defaultCreateFormIdPromise
  }

  private async findDefaultCreateFormId(): Promise<PsrGuid> {
    const forms = await this.listForms()
    if (forms.length === 0) {
      throw new Error('No password forms are available for password creation.')
    }

    const requiredItemNames = new Set([
      'Description',
      'Username',
      'Password',
      'Website',
      'Information',
    ])

    const scored = forms.map((form) => {
      const itemNames = new Set(asArray(form.raw.Items).map((item) => item.Name))
      const hasRequiredItems = [...requiredItemNames].every((name) => itemNames.has(name))
      const normalizedName = normalizeText(form.name)?.toLowerCase() ?? null
      let score = hasRequiredItems ? 100 : 0
      if (itemNames.has('One-Time Password')) {
        score += 10
      }
      if (!normalizedName) {
        score += 25
      }
      if (normalizedName && /website|internetseite|web site/.test(normalizedName)) {
        score += 15
      }
      score -= Math.max(0, itemNames.size - requiredItemNames.size)
      return { id: form.id, score }
    })

    const best = [...scored].sort((left, right) => right.score - left.score)[0]
    if (!best || best.score <= 0) {
      return forms[0].id
    }

    return best.id
  }

  private async applySecrets(container: PsrContainer, reason: string) {
    for (const item of asArray(container.Items)) {
      if (
        item.ContainerItemType !== PsrApiEnums.PsrContainerItemType.ContainerItemPassword &&
        item.ContainerItemType !== PsrApiEnums.PsrContainerItemType.ContainerItemOtp
      ) {
        continue
      }

      item.PlainTextValue = await this.raw.containerManager.decryptContainerItem(item, reason)
    }
  }
}
