import type { PsrGuid } from '../base'

// Base list filter properties that PsrContainerListFilter inherits from PsrListFilter
export type PsrListFilterBase = {
  // Core filter properties
  DataId?: PsrGuid // Filter by ID
  DataStates?: string[] // Filter by data states (active, historic, deleted)
  ExcludeDataState?: string[] // Filter by not set data states
  FilterGroups?: unknown[] // Filter groups
  First?: number // Returns only the first X objects
  Page?: number // Page number
  PageOrder?: string // Name of the field that should be sorted by
  PageOrderAsc?: boolean // Sort order for paging
  PageSize?: number // Page size
  SaveFilter?: boolean // If the filter should be stored for the current session
  TimeStampUtcFrom?: Date // Filter by creation timestamp begin
  TimeStampUtcTo?: Date // Filter by creation timestamp end
  ValidTimeStampUtcFrom?: Date // Filter by validity date begin
  ValidTimeStampUtcTo?: Date // Filter by validity date end
}

export type PsrContainerListFilter = PsrListFilterBase & {
  // PsrContainerListFilter specific properties
  ContainerType?: string // Container type
  OrderFieldAsc?: boolean // Ascending order when OrderFieldName is used
  OrderFieldName?: string // Order by container item name
  OrderFieldType?: string // Filtering special container item types
}
