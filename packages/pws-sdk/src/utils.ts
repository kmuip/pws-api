import {
  PsrApiEnums,
  PsrApiTypes,
  type PsrApi,
  type PsrContainer,
  type PsrContainerItem,
  type PsrContainerListFilter,
  type PsrDataTag,
  type PsrGuid,
  type PsrListFilter,
  type PsrOrganisationUnit,
  type PsrTag,
} from '@kmuip/pws-api'
import type { DatePreset, SortDirection } from './types.js'

export const GUID_EMPTY = '00000000-0000-0000-0000-000000000000'

export function asArray<T>(value: Iterable<T> | T[] | null | undefined): T[] {
  if (!value) {
    return []
  }

  return Array.isArray(value) ? value : Array.from(value)
}

export function createRuntimeModel<T>(typeName: string): T {
  const constructor = (PsrApiTypes as Record<string, unknown>)[typeName]
  if (typeof constructor !== 'function') {
    throw new Error(`Runtime type ${typeName} is not available.`)
  }

  return new (constructor as new () => T)()
}

export function getParentId(data: Pick<PsrOrganisationUnit, 'ParentDataBindings'>): PsrGuid | null {
  const binding = asArray(data.ParentDataBindings).find((candidate) => candidate?.ParentDataId)
  return (binding?.ParentDataId as PsrGuid | undefined) ?? null
}

export function normalizeText(value: unknown): string | null {
  if (value == null) {
    return null
  }

  const trimmed = String(value).trim()
  return trimmed.length === 0 ? null : trimmed
}

export function toBase64Binary(value: string | Uint8Array) {
  return typeof value === 'string'
    ? Buffer.from(value, 'binary').toString('base64')
    : Buffer.from(value).toString('base64')
}

export function getDataStatesValue(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

export function hasDataState(value: unknown, state: number) {
  const current = getDataStatesValue(value)
  return current == null ? false : (current & state) === state
}

export function setDataStatesFilter(
  filter: { DataStates?: unknown },
  dataState: number | null | undefined,
) {
  if (dataState == null) {
    delete (filter as { DataStates?: unknown }).DataStates
    return
  }

  ;(filter as { DataStates?: unknown }).DataStates = dataState
}

export function containsText(value: unknown, search?: string | null) {
  if (!search) {
    return true
  }

  const haystack = normalizeText(value)
  return haystack ? haystack.toLowerCase().includes(search.toLowerCase()) : false
}

export function toDate(value: Date | string | null | undefined): Date | null {
  if (value == null) {
    return null
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value
  }

  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

export function resolveDateRangePreset(preset?: DatePreset | null) {
  if (!preset) {
    return { from: null, to: null }
  }

  const now = new Date()
  const startOfToday = new Date(now)
  startOfToday.setHours(0, 0, 0, 0)
  const endOfToday = new Date(now)
  endOfToday.setHours(23, 59, 59, 999)

  switch (preset) {
    case 'last24h':
      return { from: new Date(now.getTime() - 24 * 60 * 60 * 1000), to: now }
    case 'last7d':
      return { from: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), to: now }
    case 'last30d':
      return { from: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), to: now }
    case 'today':
      return { from: startOfToday, to: endOfToday }
    case 'yesterday': {
      const from = new Date(startOfToday)
      from.setDate(from.getDate() - 1)
      const to = new Date(endOfToday)
      to.setDate(to.getDate() - 1)
      return { from, to }
    }
    case 'thisWeek': {
      const from = new Date(startOfToday)
      const weekday = from.getDay()
      const shift = weekday === 0 ? 6 : weekday - 1
      from.setDate(from.getDate() - shift)
      return { from, to: now }
    }
    case 'thisMonth':
      return { from: new Date(now.getFullYear(), now.getMonth(), 1), to: now }
  }
}

export function isWithinDateRange(
  value: Date | string | null | undefined,
  from?: Date | string | null,
  to?: Date | string | null,
) {
  const current = toDate(value)
  if (!current) {
    return false
  }

  const fromDate = toDate(from)
  const toDateValue = toDate(to)

  if (fromDate && current < fromDate) {
    return false
  }

  if (toDateValue && current > toDateValue) {
    return false
  }

  return true
}

export function paginate<T>(items: T[], page?: number | null, pageSize?: number | null) {
  if (typeof pageSize !== 'number' || pageSize <= 0) {
    return items
  }

  const pageIndex = typeof page === 'number' && page > 0 ? page : 0
  const start = pageIndex * pageSize
  return items.slice(start, start + pageSize)
}

export function sortRecords<T>(
  items: T[],
  getValue: (item: T) => unknown,
  direction: SortDirection | null | undefined = 'asc',
) {
  const multiplier = direction === 'desc' ? -1 : 1

  return [...items].sort((left, right) => {
    const leftValue = getValue(left)
    const rightValue = getValue(right)

    const leftDate = toDate(leftValue as Date | string | null | undefined)
    const rightDate = toDate(rightValue as Date | string | null | undefined)
    if (leftDate && rightDate) {
      return (leftDate.getTime() - rightDate.getTime()) * multiplier
    }

    const leftText = normalizeText(leftValue)?.toLowerCase() ?? ''
    const rightText = normalizeText(rightValue)?.toLowerCase() ?? ''
    if (leftText < rightText) {
      return -1 * multiplier
    }
    if (leftText > rightText) {
      return 1 * multiplier
    }
    return 0
  })
}

type PageableListFilter =
  | Pick<PsrListFilter, 'Page' | 'PageSize'>
  | Pick<PsrContainerListFilter, 'Page' | 'PageSize'>

type OrganisationUnitFilterable =
  | Pick<PsrListFilter, 'FilterGroups'>
  | Pick<PsrContainerListFilter, 'FilterGroups'>

export function setFilterPage(
  filter: PageableListFilter,
  page?: number | null,
  pageSize?: number | null,
) {
  if (typeof page === 'number') {
    ;(filter as Record<string, unknown>).Page = page
  }
  if (typeof pageSize === 'number') {
    ;(filter as Record<string, unknown>).PageSize = pageSize
  }
}

export function applyOrganisationUnitFilter(
  filter: OrganisationUnitFilterable,
  organisationUnitId: PsrGuid,
) {
  const groups = ((filter as Record<string, unknown>).FilterGroups ??= []) as Record<
    string,
    unknown
  >[]
  const existingGroup =
    groups.find(
      (candidate) =>
        candidate.$type ===
        'PsrDataLayer.FilterObjects.ListFilterGroupOrganisationUnit, PsrDataLayer',
    ) ?? null

  const group =
    existingGroup ??
    ({
      $type: 'PsrDataLayer.FilterObjects.ListFilterGroupOrganisationUnit, PsrDataLayer',
      Expanded: true,
      AndLinkedGroup: false,
      OrganisationUnitFilter: {
        $type: 'PsrDataLayer.FilterObjects.ListFilterObjectOrganisationUnit, PsrDataLayer',
        FilterActive: true,
        Ident: 'ListFilterObjectOrganisationUnit',
        ForceShowRemoveButton: false,
      },
    } as Record<string, unknown>)

  const ouFilter = (group.OrganisationUnitFilter ??= {}) as Record<string, unknown>
  ouFilter.$type = 'PsrDataLayer.FilterObjects.ListFilterObjectOrganisationUnit, PsrDataLayer'
  ouFilter.SelectedOrganisationUnitId = organisationUnitId
  ouFilter.IncludeSubOrganisationUnit = true
  ouFilter.IncludeSubOrganisationUnits = true
  ouFilter.FilterActive = true

  if (!existingGroup) {
    groups.push(group)
  }
}

export function setOrganisationUnitFilterScope(
  filter: OrganisationUnitFilterable,
  includeSubOrganisationUnits: boolean,
) {
  const groups = asArray(
    (filter as { FilterGroups?: Record<string, unknown>[] | null }).FilterGroups,
  )
  const group =
    groups.find(
      (candidate) =>
        candidate.$type ===
        'PsrDataLayer.FilterObjects.ListFilterGroupOrganisationUnit, PsrDataLayer',
    ) ?? null

  if (!group) {
    return
  }

  const ouFilter = (group.OrganisationUnitFilter ??= {}) as Record<string, unknown>
  ouFilter.IncludeSubOrganisationUnit = includeSubOrganisationUnits
  ouFilter.IncludeSubOrganisationUnits = includeSubOrganisationUnits
}

export function createSearchFilterGroup(search: string) {
  return {
    $type: 'PsrDataLayer.FilterObjects.ListFilterGroupContent, PsrDataLayer',
    StringListFilters: [
      {
        $type: 'PsrDataLayer.FilterObjects.ListFilterObjectContent, PsrDataLayer',
        Search: search,
        SearchOrganisationUnits: false,
        SearchTags: true,
        ExactSearch: false,
        ExtendedSearch: '',
        FilterActive: true,
        Ident: 'sdk-content-search',
        ForceShowRemoveButton: false,
      },
    ],
    Expanded: true,
    AndLinkedGroup: true,
  }
}

export function findContainerItemByName(container: PsrContainer, name: string) {
  return asArray(container.Items).find((item) => item.Name === name) ?? null
}

export function ensureContainerItem(
  container: PsrContainer,
  itemName: string,
  containerItemType: number,
  factory: () => Promise<PsrContainerItem>,
) {
  const existing = findContainerItemByName(container, itemName)
  if (existing) {
    return Promise.resolve(existing)
  }

  return factory().then((item) => {
    item.Name = itemName
    item.ContainerItemType = containerItemType as never
    item.Id = GUID_EMPTY
    item.Position = asArray(container.Items).length
    container.Items = [...asArray(container.Items), item]
    return item
  })
}

export function createTagReference(tag: PsrTag, dataId: PsrGuid = GUID_EMPTY): PsrDataTag {
  const dataTag = createRuntimeModel<PsrDataTag>('PsrDataTag')
  ;(dataTag as Record<string, unknown>).__type = 'PsrDataLayer.Structure.MtoDataTag, PsrDataLayer'
  dataTag.Id = GUID_EMPTY
  dataTag.DataId = dataId
  dataTag.TagId = tag.Id
  dataTag.Tag = tag as unknown as Record<string, unknown>
  dataTag.SyncOperation = 0 as never
  dataTag.TransactionId = GUID_EMPTY
  dataTag.TimeStampUtc = new Date()
  dataTag.Data = {} as never
  return dataTag
}

export function getContainerDisplayName(container: PsrContainer): string | null {
  const descriptionItem = findContainerItemByName(container, 'Description')
  const infoName = (container.Info as { ContainerName?: string | null } | null | undefined)
    ?.ContainerName

  return normalizeText(
    descriptionItem?.Value ??
      descriptionItem?.PlainTextValue ??
      infoName ??
      container.Name ??
      container.Description,
  )
}

export function isPasswordContainer(container: PsrContainer) {
  return Number(container.ContainerType) === Number(PsrApiEnums.PsrContainerType.Password)
}

export function ensureAuthenticatedUser(raw: PsrApi) {
  if (!raw.currentUser) {
    throw new Error('Authenticated current user is not available.')
  }

  return raw.currentUser
}
