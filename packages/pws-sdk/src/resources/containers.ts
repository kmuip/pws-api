import { PsrApiEnums, type PsrApi, type PsrContainer, type PsrGuid } from '@kmuip/pws-api'
import type {
  BaseContainerCreateInput,
  ContainerCloneInput,
  ContainerItemRecord,
  ContainerListOptions,
  ContainerRecord,
  PasswordHistoryRecord,
} from '../types.js'
import {
  applyOrganisationUnitFilter,
  asArray,
  containsText,
  findContainerItemByName,
  getContainerDisplayName,
  paginate,
  setOrganisationUnitFilterScope,
  sortRecords,
} from '../utils.js'

function toContainerRecord(container: PsrContainer): ContainerRecord {
  return {
    id: container.Id,
    name: getContainerDisplayName(container),
    containerType: container.ContainerType == null ? null : Number(container.ContainerType),
    organisationUnitId: (container.OrganisationUnitId as PsrGuid | undefined) ?? null,
    raw: container,
  }
}

function toHistoryRecord(entry: any): PasswordHistoryRecord {
  const container = (entry.Container as PsrContainer | null | undefined) ?? null
  return {
    id: container?.Id ?? null,
    name: container ? getContainerDisplayName(container) : null,
    timestampUtc: (container?.TimeStampUtc as Date | string | null | undefined) ?? null,
    container,
    raw: entry,
  }
}

export class ContainersSdkResource {
  constructor(private readonly raw: PsrApi) {}

  async list(options: ContainerListOptions = {}) {
    const type = (options.containerType ?? PsrApiEnums.PsrContainerType.Password) as number
    const filter = await this.raw.containerManager.getContainerListFilter(type as never, true)
    if (options.organisationUnitId) {
      applyOrganisationUnitFilter(filter, options.organisationUnitId)
      setOrganisationUnitFilterScope(filter, options.includeSubOrganisationUnits ?? true)
    }

    const records = asArray(await this.raw.containerManager.getContainerList(type as never, filter))
      .filter((container) => {
        if (options.ids?.length && !new Set(options.ids).has(container.Id)) {
          return false
        }
        if (!containsText(getContainerDisplayName(container), options.name)) {
          return false
        }
        if (options.search) {
          const haystack = [
            getContainerDisplayName(container),
            container.Description,
            findContainerItemByName(container, 'Username')?.Value,
            findContainerItemByName(container, 'Website')?.Value,
          ]
            .filter(Boolean)
            .join(' ')
          if (!containsText(haystack, options.search)) {
            return false
          }
        }
        return true
      })
      .map(toContainerRecord)

    const sorted = options.sortBy
      ? sortRecords(
          records,
          (record) => {
            switch (options.sortBy) {
              case 'containerType':
                return record.containerType
              case 'id':
                return record.id
              default:
                return record.name
            }
          },
          options.sortDirection,
        )
      : records

    return paginate(sorted, options.page, options.pageSize)
  }

  async get(id: PsrGuid) {
    return toContainerRecord(await this.raw.containerManager.getContainer(id))
  }

  async clone(id: PsrGuid, input: ContainerCloneInput = {}) {
    const source = await this.raw.containerManager.getContainer(id)
    const container = await this.raw.containerManager.cloneContainer(id)
    if (input.name != null) {
      container.Name = input.name
      const description = findContainerItemByName(container, 'Description')
      if (description) {
        description.Value = input.name
      }
    }
    const created = await this.raw.containerManager.addContainer(
      container,
      input.organisationUnitId ?? (source.OrganisationUnitId as PsrGuid | undefined) ?? null,
      null,
      null,
    )
    return toContainerRecord(created)
  }

  async createFromBaseContainer(input: BaseContainerCreateInput) {
    const base = await this.raw.containerManager.getContainer(input.baseContainerId)
    const container = this.raw.containerManager.createContainerFromBaseContainer(
      base,
      input.newContainerType as never,
    )
    if (input.name != null) {
      container.Name = input.name
    }
    const created = await this.raw.containerManager.addContainer(
      container,
      input.organisationUnitId ?? (base.OrganisationUnitId as PsrGuid | undefined) ?? null,
      null,
      null,
    )
    return toContainerRecord(created)
  }

  async delete(id: PsrGuid) {
    const container = await this.raw.containerManager.getContainer(id)
    await this.raw.containerManager.deleteContainer(container)
  }

  async history(containerType: number, id: PsrGuid) {
    return asArray(
      await this.raw.containerManager.getContainerHistoryList(containerType as never, id),
    ).map(toHistoryRecord)
  }

  async getItem(id: PsrGuid) {
    const item = await this.raw.containerManager.getContainerItem(id)
    return {
      id: item.Id,
      name: item.Name ?? null,
      containerItemType: item.ContainerItemType == null ? null : Number(item.ContainerItemType),
      value: (item.Value as string | null | undefined) ?? null,
      raw: item,
    } satisfies ContainerItemRecord
  }

  async revealItem(id: PsrGuid, reason = 'SDK reveal container item') {
    const item = await this.raw.containerManager.getContainerItem(id)
    return this.raw.containerManager.decryptContainerItem(item, reason)
  }

  async credentialCheck(id: PsrGuid) {
    return this.raw.containerManager.getCredentialCheck(id)
  }
}
