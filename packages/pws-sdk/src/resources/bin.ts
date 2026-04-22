import { PsrApiEnums, type PsrApi, type PsrContainer, type PsrGuid } from '@kmuip/pws-api'
import type {
  BinDocumentListOptions,
  BinOrganisationUnitListOptions,
  BinPasswordListOptions,
  BinUserListOptions,
  DeletedDocumentRecord,
  DeletedOrganisationUnitRecord,
  DeletedPasswordRecord,
  DeletedUserRecord,
} from '../types.js'
import {
  applyOrganisationUnitFilter,
  asArray,
  containsText,
  findContainerItemByName,
  getContainerDisplayName,
  getDataStatesValue,
  getParentId,
  normalizeText,
  paginate,
  setDataStatesFilter,
  setOrganisationUnitFilterScope,
  sortRecords,
} from '../utils.js'

function toDeletedPasswordRecord(container: PsrContainer): DeletedPasswordRecord {
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
    dataStates: getDataStatesValue(container.DataStates),
    raw: container,
  }
}

function toDeletedDocumentRecord(container: PsrContainer): DeletedDocumentRecord {
  return {
    id: container.Id,
    name: getContainerDisplayName(container),
    description: container.Description ?? null,
    path: container.DocumentPath ?? null,
    documentType: container.DocumentType ?? null,
    isLink: Boolean(container.IsDocumentLink),
    organisationUnitId: (container.OrganisationUnitId as PsrGuid | undefined) ?? null,
    dataStates: getDataStatesValue(container.DataStates),
    raw: container,
  }
}

export class BinResource {
  constructor(private readonly raw: PsrApi) {}

  async listPasswords(options: BinPasswordListOptions = {}) {
    const filter = await this.raw.containerManager.getContainerListFilter(
      PsrApiEnums.PsrContainerType.Password,
      false,
    )
    setDataStatesFilter(filter, PsrApiEnums.PsrDataStates.StateDeleted)
    if (options.organisationUnitId) {
      applyOrganisationUnitFilter(filter, options.organisationUnitId)
      setOrganisationUnitFilterScope(filter, options.includeSubOrganisationUnits ?? true)
    }

    const entries = asArray(
      await this.raw.containerManager.getContainerList(
        PsrApiEnums.PsrContainerType.Password,
        filter,
      ),
    )
      .filter((container) => {
        if (options.ids?.length) {
          const ids = new Set(options.ids)
          if (!ids.has(container.Id)) {
            return false
          }
        }
        if (!containsText(getContainerDisplayName(container), options.name)) {
          return false
        }
        if (
          !containsText(findContainerItemByName(container, 'Username')?.Value, options.username)
        ) {
          return false
        }
        if (!containsText(findContainerItemByName(container, 'Website')?.Value, options.url)) {
          return false
        }
        if (options.search) {
          const haystack = [
            getContainerDisplayName(container),
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
      .map(toDeletedPasswordRecord)

    const sorted = options.sortBy
      ? sortRecords(
          entries,
          (record) => {
            switch (options.sortBy) {
              case 'username':
                return record.username
              case 'url':
                return record.url
              case 'notes':
                return record.notes
              case 'id':
                return record.id
              default:
                return record.name
            }
          },
          options.sortDirection,
        )
      : entries

    return paginate(sorted, options.page, options.pageSize)
  }

  async listDocuments(options: BinDocumentListOptions = {}) {
    const filter = await this.raw.containerManager.getContainerListFilter(
      PsrApiEnums.PsrContainerType.Document,
      false,
    )
    setDataStatesFilter(filter, PsrApiEnums.PsrDataStates.StateDeleted)
    if (options.organisationUnitId) {
      applyOrganisationUnitFilter(filter, options.organisationUnitId)
      setOrganisationUnitFilterScope(filter, options.includeSubOrganisationUnits ?? true)
    }

    const entries = asArray(
      await this.raw.containerManager.getContainerList(
        PsrApiEnums.PsrContainerType.Document,
        filter,
      ),
    )
      .filter((container) => {
        if (options.ids?.length) {
          const ids = new Set(options.ids)
          if (!ids.has(container.Id)) {
            return false
          }
        }
        if (!containsText(getContainerDisplayName(container), options.name)) {
          return false
        }
        if (!containsText(container.DocumentPath, options.path)) {
          return false
        }
        if (!containsText(container.DocumentType, options.documentType)) {
          return false
        }
        if (options.search) {
          const haystack = [
            getContainerDisplayName(container),
            container.Description,
            container.DocumentPath,
            container.DocumentType,
          ]
            .filter(Boolean)
            .join(' ')
          if (!containsText(haystack, options.search)) {
            return false
          }
        }
        return true
      })
      .map(toDeletedDocumentRecord)

    const sorted = options.sortBy
      ? sortRecords(
          entries,
          (record) => {
            switch (options.sortBy) {
              case 'path':
                return record.path
              case 'documentType':
                return record.documentType
              case 'id':
                return record.id
              default:
                return record.name
            }
          },
          options.sortDirection,
        )
      : entries

    return paginate(sorted, options.page, options.pageSize)
  }

  async listOrganisationUnits(options: BinOrganisationUnitListOptions = {}) {
    const filter = await this.raw.organisationUnitManager.getOrganisationUnitListFilter(false)
    setDataStatesFilter(filter, PsrApiEnums.PsrDataStates.StateDeleted)
    const entries = asArray(await this.raw.organisationUnitManager.getOrganisationUnitList(filter))
      .filter((entry) => {
        const groupName = (entry as { GroupName?: string | null }).GroupName ?? null
        if (options.ids?.length) {
          const ids = new Set(options.ids)
          if (!ids.has(entry.Id)) {
            return false
          }
        }
        if (options.parentId && getParentId(entry) !== options.parentId) {
          return false
        }
        if (!containsText(groupName, options.name)) {
          return false
        }
        if (options.search && !containsText(groupName, options.search)) {
          return false
        }
        return true
      })
      .map(
        (entry): DeletedOrganisationUnitRecord => ({
          id: entry.Id,
          name: normalizeText((entry as { GroupName?: string | null }).GroupName ?? null),
          parentId: getParentId(entry),
          dataStates: getDataStatesValue(entry.DataStates),
          raw: entry as never,
        }),
      )

    const sorted = options.sortBy
      ? sortRecords(entries, (record) => record[options.sortBy ?? 'name'], options.sortDirection)
      : entries

    return paginate(sorted, options.page, options.pageSize)
  }

  async listUsers(options: BinUserListOptions = {}) {
    const filter = await this.raw.organisationUnitManager.getOrganisationUnitListFilter(false)
    setDataStatesFilter(filter, PsrApiEnums.PsrDataStates.StateDeleted)
    const entries = asArray(
      await this.raw.organisationUnitManager.getOrganisationUnitUserList(filter),
    )
      .filter((user) => {
        if (options.ids?.length) {
          const ids = new Set(options.ids)
          if (!ids.has(user.Id)) {
            return false
          }
        }
        if (options.parentId && getParentId(user) !== options.parentId) {
          return false
        }
        if (!containsText(user.UserName, options.username)) {
          return false
        }
        if (options.search) {
          const haystack = [user.UserName, user.FirstName, user.LastName, user.Mail]
            .filter(Boolean)
            .join(' ')
          if (!containsText(haystack, options.search)) {
            return false
          }
        }
        return true
      })
      .map(
        (user): DeletedUserRecord => ({
          id: user.Id,
          username: normalizeText(user.UserName),
          firstName: normalizeText(user.FirstName),
          lastName: normalizeText(user.LastName),
          parentId: getParentId(user),
          dataStates: getDataStatesValue(user.DataStates),
          raw: user,
        }),
      )

    const sorted = options.sortBy
      ? sortRecords(
          entries,
          (record) => {
            switch (options.sortBy) {
              case 'email':
                return (record.raw.Mail as string | null | undefined) ?? null
              case 'firstName':
                return record.firstName
              case 'lastName':
                return record.lastName
              case 'id':
                return record.id
              default:
                return record.username
            }
          },
          options.sortDirection,
        )
      : entries

    return paginate(sorted, options.page, options.pageSize)
  }

  async purgePassword(id: PsrGuid) {
    await this.raw.containerManager.deleteContainer({ Id: id } as PsrContainer)
  }

  async purgeDocument(id: PsrGuid) {
    await this.raw.containerManager.deleteContainer({ Id: id } as PsrContainer)
  }

  async purgeOrganisationUnit(id: PsrGuid) {
    await this.raw.organisationUnitManager.deleteOrganisationUnitGroup({ Id: id } as never)
  }

  async purgeUser(id: PsrGuid) {
    await this.raw.organisationUnitManager.deleteOrganisationUnitUser({ Id: id } as never)
  }
}
