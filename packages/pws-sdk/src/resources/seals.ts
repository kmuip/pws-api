import {
  PsrApiEnums,
  type PsrApi,
  type PsrBatchRightItem,
  type PsrGuid,
  type PsrOrganisationUnitUser,
  type PsrRole,
  type PsrSeal,
  type PsrSealKey,
} from '@kmuip/pws-api'
import type {
  SealCreateInput,
  SealKeyRecord,
  SealLegitimateInput,
  SealRecord,
  SealTemplateListOptions,
  SealTemplateRecord,
  SealUpdateInput,
} from '../types.js'
import {
  asArray,
  containsText,
  normalizeText,
  paginate,
  sortRecords,
  toBase64Binary,
} from '../utils.js'

function toSealRecord(seal: PsrSeal): SealRecord {
  return {
    id: seal.Id,
    name: normalizeText(seal.Name),
    description: normalizeText(seal.Description),
    requiredReleases: seal.RequiredReleases == null ? null : Number(seal.RequiredReleases),
    releaseRequiredAll: Boolean(seal.ReleaseRequiredAll),
    allowMultiBreak: Boolean(seal.AllowMultiBreak),
    breakRunTime: seal.BreakRunTime == null ? null : Number(seal.BreakRunTime),
    releaseRunTime: seal.ReleaseRunTime == null ? null : Number(seal.ReleaseRunTime),
    raw: seal,
  }
}

function toSealKeyRecord(sealKey: PsrSealKey): SealKeyRecord {
  return {
    id: sealKey.Id,
    sealId: (sealKey.SealId as PsrGuid | undefined) ?? null,
    sealKey: sealKey.SealKey ?? null,
    raw: sealKey,
  }
}

function toSealTemplateRecord(template: any): SealTemplateRecord {
  return {
    id: template.Id,
    name: normalizeText(template.Name),
    description: normalizeText(template.Description),
    requiredReleases: template.RequiredReleases == null ? null : Number(template.RequiredReleases),
    releaseRequiredAll: Boolean(template.ReleaseRequiredAll),
    allowMultiBreak: Boolean(template.AllowMultiBreak),
    raw: template,
  }
}

type ResolvedLegitimate = {
  id: PsrGuid
  type: 'user' | 'role'
  legitimate: PsrOrganisationUnitUser | PsrRole
  sealedFor: boolean
  canRelease: boolean
  obligatory: boolean
}

type WritableSealCacheEntry = {
  dataId: PsrGuid
  dataType: number
  seal: PsrSeal
  legitimates: ResolvedLegitimate[]
}

type ResolvedLegitimateLookup = {
  type: 'user' | 'role'
  legitimate: PsrOrganisationUnitUser | PsrRole
}

export class SealsResource {
  private readonly cache = new Map<PsrGuid, PsrSeal>()
  private readonly writableCache = new Map<PsrGuid, WritableSealCacheEntry>()
  private readonly legitimateCache = new Map<string, Promise<ResolvedLegitimateLookup>>()

  constructor(private readonly raw: PsrApi) {}

  private getLegitimateCacheKey(type: 'user' | 'role', id: PsrGuid) {
    return `${type}:${id}`
  }

  private getAutoLegitimateCacheKey(id: PsrGuid) {
    return `auto:${id}`
  }

  private loadLegitimate(type: 'user' | 'role', id: PsrGuid) {
    if (type === 'user') {
      return this.raw.organisationUnitManager
        .getOrganisationUnitUser(id)
        .then((legitimate) => ({ type, legitimate }))
    }

    return this.raw.roleManager.getRole(id).then((legitimate) => ({ type, legitimate }))
  }

  private resolveCachedLegitimate(type: 'user' | 'role', id: PsrGuid) {
    const cacheKey = this.getLegitimateCacheKey(type, id)
    const cached = this.legitimateCache.get(cacheKey)
    if (cached) {
      return cached
    }

    const pending = this.loadLegitimate(type, id)
    this.legitimateCache.set(cacheKey, pending)
    return pending
  }

  private resolveAutoLegitimate(id: PsrGuid) {
    const autoKey = this.getAutoLegitimateCacheKey(id)
    const cached = this.legitimateCache.get(autoKey)
    if (cached) {
      return cached
    }

    const pending: Promise<ResolvedLegitimateLookup> = this.loadLegitimate('user', id).catch(
      async (): Promise<ResolvedLegitimateLookup> => this.loadLegitimate('role', id),
    )
    this.legitimateCache.set(autoKey, pending)
    return pending
  }

  private async resolveLegitimate(input: SealLegitimateInput): Promise<ResolvedLegitimate> {
    const sealedFor = Boolean(input.sealedFor)
    const canRelease = Boolean(input.canRelease)
    const obligatory = Boolean(input.obligatory)

    if (!sealedFor && !canRelease) {
      throw new Error(`Seal legitimate ${input.legitimateId} must be sealedFor or canRelease.`)
    }

    if (sealedFor && this.raw.currentUser?.Id === input.legitimateId) {
      throw new Error('The current user cannot be sealed.')
    }

    const resolved =
      input.type != null
        ? await this.resolveCachedLegitimate(input.type, input.legitimateId)
        : await this.resolveAutoLegitimate(input.legitimateId)

    return {
      id: input.legitimateId,
      type: resolved.type,
      legitimate: resolved.legitimate,
      sealedFor,
      canRelease,
      obligatory,
    }
  }

  private async buildSealData(
    existingSeal: PsrSeal | null,
    input: Pick<
      SealCreateInput | SealUpdateInput,
      | 'name'
      | 'description'
      | 'requiredReleases'
      | 'releaseRequiredAll'
      | 'allowMultiBreak'
      | 'breakRunTime'
      | 'releaseRunTime'
      | 'legitimates'
    >,
  ) {
    const legitimates = await Promise.all(
      asArray(input.legitimates).map((entry) => this.resolveLegitimate(entry)),
    )
    const releasers = legitimates.filter((entry) => entry.canRelease)
    const sealedTargets = legitimates.filter((entry) => entry.sealedFor)

    if (releasers.length === 0) {
      throw new Error('Seals require at least one releasing user or role.')
    }

    if (sealedTargets.length === 0) {
      throw new Error('Seals require at least one sealed user or role.')
    }

    const sealName = input.name ?? existingSeal?.Name ?? ''
    if (!sealName) {
      throw new Error('Seal name is required when regenerating a seal payload.')
    }

    const keyPair = await this.raw.encryptionManager.generateKeyPair()
    const keys = await Promise.all(
      releasers.map(async (entry) => {
        const publicKey = entry.legitimate.PublicKey
        if (!publicKey) {
          throw new Error(`Legitimate ${entry.id} has no public key.`)
        }

        const encryptedSealKey = await this.raw.encryptionManager.encryptWithPublicKey(
          Uint8Array.from(Buffer.from(publicKey, 'base64')),
          keyPair.privateKey,
        )

        return {
          Legitimate: entry.legitimate,
          LegitimateId: entry.id,
          Required: entry.obligatory ? 1 : 0,
          SealKey: toBase64Binary(encryptedSealKey as string | Uint8Array),
        }
      }),
    )

    const seal = existingSeal ?? ({} as PsrSeal)
    seal.Name = sealName
    seal.Description = input.description ?? existingSeal?.Description ?? ''
    seal.RequiredReleases = input.requiredReleases ?? existingSeal?.RequiredReleases ?? 1
    seal.ReleaseRequiredAll = input.releaseRequiredAll ?? existingSeal?.ReleaseRequiredAll ?? false
    seal.AllowMultiBreak = input.allowMultiBreak ?? existingSeal?.AllowMultiBreak ?? false
    seal.BreakRunTime = input.breakRunTime ?? existingSeal?.BreakRunTime ?? 72
    seal.ReleaseRunTime = input.releaseRunTime ?? existingSeal?.ReleaseRunTime ?? 72
    seal.Keys = keys as never
    seal.PublicKey = toBase64Binary(keyPair.publicKey)

    return { seal, legitimates }
  }

  private async getAffectedDataIds(dataId: PsrGuid, dataType: number) {
    if (Number(dataType) !== Number(PsrApiEnums.PsrEntityObjectType.EntityObjectTypePassword)) {
      return [dataId]
    }

    const container = await this.raw.containerManager.getContainer(dataId)
    return [
      dataId,
      ...asArray(container.Items)
        .map((item) => item.Id)
        .filter(Boolean),
    ]
  }

  private async syncSealRights(
    dataId: PsrGuid,
    dataType: number,
    legitimates: ResolvedLegitimate[],
  ) {
    const dataIds = await this.getAffectedDataIds(dataId, dataType)
    const batchItems: PsrBatchRightItem[] = []

    for (const affectedDataId of dataIds) {
      for (const legitimate of legitimates) {
        const rights = legitimate.canRelease
          ? PsrApiEnums.PsrRights.RightAll
          : legitimate.sealedFor
            ? PsrApiEnums.PsrRights.RightRead
            : 0

        if (!rights) {
          continue
        }

        batchItems.push({
          DataId: affectedDataId,
          ItemType: PsrApiEnums.PsrBatchRightItemType.AddLegitimateDataRight,
          LegitimateId: legitimate.id,
          Rights: rights,
        })
      }
    }

    if (batchItems.length > 0) {
      await this.raw.rightManager.batchUpdateRights(batchItems)
    }
  }

  async get(id: PsrGuid) {
    const seal = await this.raw.sealManager.getSeal(id)
    if (seal) {
      this.cache.set(id, seal)
      return toSealRecord(seal)
    }

    const cached = this.cache.get(id)
    if (cached) {
      return toSealRecord(cached)
    }

    throw new Error(`Seal ${id} could not be loaded.`)
  }

  async create(input: SealCreateInput) {
    const { seal, legitimates } = await this.buildSealData(null, input)
    const created = await this.raw.sealManager.addSeal(seal, input.dataId, input.dataType)
    this.cache.set(created.Id, created)
    const writableSeal = structuredClone(seal)
    writableSeal.Id = created.Id
    this.writableCache.set(created.Id, {
      dataId: input.dataId,
      dataType: Number(input.dataType),
      seal: writableSeal,
      legitimates,
    })
    await this.syncSealRights(input.dataId, input.dataType, legitimates)
    return toSealRecord(created)
  }

  async update(id: PsrGuid, input: SealUpdateInput) {
    const cachedWritable = this.writableCache.get(id) ?? null
    const hasExplicitLegitimates = Boolean(input.legitimates?.length)
    const existingSeal = cachedWritable
      ? structuredClone(cachedWritable.seal)
      : ((await this.raw.sealManager.getSeal(id)) ?? this.cache.get(id) ?? null)

    if (!existingSeal) {
      throw new Error(
        'Seal could not be loaded. Provide legitimates to regenerate the seal payload for update.',
      )
    }

    const { seal: preparedSeal, legitimates } = hasExplicitLegitimates
      ? await this.buildSealData(existingSeal, {
          ...input,
          legitimates: input.legitimates,
          name: input.name ?? existingSeal.Name ?? '',
        })
      : {
          seal: existingSeal,
          legitimates: cachedWritable?.legitimates ?? ([] as ResolvedLegitimate[]),
        }

    if (input.name != null) {
      preparedSeal.Name = input.name
    }
    if (input.description != null) {
      preparedSeal.Description = input.description
    }
    if (input.requiredReleases != null) {
      preparedSeal.RequiredReleases = input.requiredReleases
    }
    if (input.releaseRequiredAll != null) {
      preparedSeal.ReleaseRequiredAll = input.releaseRequiredAll
    }
    if (input.allowMultiBreak != null) {
      preparedSeal.AllowMultiBreak = input.allowMultiBreak
    }
    if (input.breakRunTime != null) {
      preparedSeal.BreakRunTime = input.breakRunTime
    }
    if (input.releaseRunTime != null) {
      preparedSeal.ReleaseRunTime = input.releaseRunTime
    }

    const updated = await this.raw.sealManager.updateSeal(
      preparedSeal,
      input.dataId,
      input.dataType,
    )
    this.cache.set(updated.Id, updated)
    if (hasExplicitLegitimates || cachedWritable) {
      const writableSeal = structuredClone(preparedSeal)
      writableSeal.Id = updated.Id
      this.writableCache.set(updated.Id, {
        dataId: input.dataId,
        dataType: Number(input.dataType),
        seal: writableSeal,
        legitimates,
      })
    }
    if (hasExplicitLegitimates) {
      await this.syncSealRights(input.dataId, input.dataType, legitimates)
    }

    return toSealRecord(updated)
  }

  async delete(id: PsrGuid) {
    await this.raw.sealManager.deleteSeal(id)
    this.cache.delete(id)
    this.writableCache.delete(id)
  }

  async break(id: PsrGuid) {
    return toSealRecord(await this.raw.sealManager.breakSeal(id))
  }

  async hasRelease(sealId: PsrGuid, legitimateId: PsrGuid) {
    const seal = await this.raw.sealManager.getSeal(sealId)
    return this.raw.sealManager.hasRelease(seal, legitimateId)
  }

  async getOpenType(sealId: PsrGuid, dataId: PsrGuid, userId: PsrGuid, ignoreSealKey = false) {
    return this.raw.sealManager.getSealOpenTypeBySealId(sealId, dataId, userId, ignoreSealKey)
  }

  async clearReleasesForUser(sealId: PsrGuid, legitimateId: PsrGuid) {
    const seal = await this.raw.sealManager.getSeal(sealId)
    await this.raw.sealManager.deleteKeyReleasesForUser(seal, legitimateId)
  }

  async getKey(sealKeyId: PsrGuid, legitimateId: PsrGuid) {
    return toSealKeyRecord(await this.raw.sealManager.getSealKey(sealKeyId, legitimateId))
  }

  async updateKeyRelease(release: PsrSealKey, dataId: PsrGuid, dataType: number) {
    await this.raw.sealManager.updateSealKeyRelease(release, dataId, dataType as never)
  }

  async listTemplates(options: SealTemplateListOptions = {}) {
    const templates = asArray(await this.raw.sealManager.getSealTemplateList({} as never))
      .filter((template) => {
        if (!containsText(template.Name, options.search)) {
          return false
        }
        return true
      })
      .map(toSealTemplateRecord)

    const sorted = options.sortBy
      ? sortRecords(
          templates,
          (record) => {
            switch (options.sortBy) {
              case 'requiredReleases':
                return record.requiredReleases
              case 'id':
                return record.id
              default:
                return record.name
            }
          },
          options.sortDirection,
        )
      : templates

    return paginate(sorted, options.page, options.pageSize)
  }

  async getTemplateInvolvedOrganisationUnits(dataId: PsrGuid) {
    return asArray(await this.raw.sealManager.getSealTemplateInvolvedOrganisationUnits(dataId))
  }
}
