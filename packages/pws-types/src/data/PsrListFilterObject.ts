import { PsrGuid } from '../base'
import {
  PsrApplicationType,
  PsrCredentialCheckResult,
  PsrEntityObjectType,
  PsrLogbookEvent,
  PsrNotifyTriggerReason,
  PsrNotifyTriggerType,
  PsrRight,
} from '../enum-constants'
import { PsrContainer } from './PsrContainer'
import { PsrTag } from './PsrTag'

// Base filter object type
export type PsrListFilterObject = {
  // Core properties
  FilterActive?: boolean | null // How the filter is used for filtering: false = deactivated, true = include, null = exclude
  ForceShowRemoveButton?: boolean // True if the "remove"-button should always be shown
  Ident?: string // For better identification of the object
}

// Application type filter object
export type PsrListFilterObjectApplicationType = PsrListFilterObject & {
  // Application type specific properties
  ApplicationType?: PsrApplicationType // Filter by application type
}

// Binding type filter object
export type PsrListFilterObjectDataBinding = PsrListFilterObject & {
  // Data binding specific properties
  BindingsType?: PsrListFilterObjectBindingType // Filter by binding type
  ObjectId?: PsrGuid // Filter by object ID
  ObjektType?: PsrEntityObjectType // Filter by object type
}

// By string filter object
export type PsrListFilterObjectByString = PsrListFilterObject & {
  // String filter specific properties
  Search?: string // Search value
}

// Content filter object
export type PsrListFilterObjectContent = PsrListFilterObject & {
  // String filter specific properties
  Search?: string // Search value
  SearchOrganisationUnits?: boolean
  SearchTags?: boolean
  ExactSearch?: boolean
  ExtendedSearch?: string
}

// Credential check result filter object
export type PsrListFilterObjectCredentialCheckResult = PsrListFilterObject & {
  // Credential check result specific properties
  Result?: PsrCredentialCheckResult // Filter by credential check result
}

// Data object filter object
export type PsrListFilterObjectDataObject = PsrListFilterObject & {
  // Data object specific properties
  DataObject?: PsrEntityObjectType // Filter by data object
}

// Deactivated filter object
export type PsrListFilterObjectDeactivated = PsrListFilterObject & {
  // Deactivated specific properties
  IsDeactivated?: boolean // Filter by deactivated status
}

// Directory service filter object
export type PsrListFilterObjectDirectoryService = PsrListFilterObject & {
  // Directory service specific properties
  DirectoryServiceType?: PsrFilterDirectoryServiceType // Filter by directory service type
}

// Document extension filter object
export type PsrListFilterObjectDocumentExtension = PsrListFilterObject & {
  // Directory service specific properties
  Search?: string // Filter by document extension
}

// Favourite filter object
export type PsrListFilterObjectFavourite = PsrListFilterObject & {
  // Favourite specific properties
  Favourite?: boolean // Filter by favourite status
}

// Form filter object
export type PsrListFilterObjectForm = PsrListFilterObject & {
  // Form specific properties
  Form?: PsrContainer
}

// Has lock filter object
export type PsrListFilterObjectHasLock = PsrListFilterObject & {
  // Has lock specific properties
  HasLock?: boolean // Filter by lock status
}

// Has tag filter object
export type PsrListFilterObjectHasTag = PsrListFilterObject & {
  // Has tag specific properties
  HasTag?: boolean // Filter by tag status
}

// Logbook filter object
export type PsrListFilterObjectLogbook = PsrListFilterObject & {
  // Logbook specific properties
  DatePeriod: PsrListFilterObjectLogbookDatePeriod
  LastLogbookEntry: boolean
  LogbookEvent: PsrLogbookEvent
  OnlyWithInfo: boolean
  OrganisationUnitId: PsrGuid
  TimeStampUtcFrom: Date
  TimeStampUtcTo: Date
}

// Logbook event filter object
export const PsrListFilterObjectLogbookEvent$Type = 'PsrDataLayer.FilterObjects.ListFilterObjectLogbookEvent, PsrDataLayer' as const

export type PsrListFilterObjectLogbookEvent = PsrListFilterObject & {
  // Logbook event specific properties
  $type: typeof PsrListFilterObjectLogbookEvent$Type
  LogbookEvent: PsrLogbookEvent
}

// Organisation unit filter object
export const PsrListFilterObjectOrganisationUnit$Type = 'PsrDataLayer.FilterObjects.ListFilterObjectOrganisationUnit, PsrDataLayer' as const

export type PsrListFilterObjectOrganisationUnit = PsrListFilterObject & {
  $type: typeof PsrListFilterObjectOrganisationUnit$Type
  // Organisation unit specific properties
  IncludeSubOrganisationUnits?: boolean
  SelectedOrganisationUnitId: PsrGuid
}

// Organisation unit type filter object
export type PsrListFilterObjectOrganisationUnitType = PsrListFilterObject & {
  // Organisation unit type specific properties
  OrganisationUnitType: PsrFilterOrganisationUnitType
}

// Right filter object
export type PsrListFilterObjectRight = PsrListFilterObject & {
  // Right specific properties
  CheckRightKey?: boolean
  LegitimateId: PsrGuid
  OwnerRight?: boolean
  Right: PsrRight
  SearchMembers: boolean
}

// Seal filter object
export type PsrListFilterObjectSeal = PsrListFilterObject & {
  // Seal specific properties
  FilterType: PsrListFilterObjectSealType
  LegitimateId: PsrGuid
}

// Tag filter object
export type PsrListFilterObjectTag = PsrListFilterObject & {
  // Tag specific properties
  Tag: PsrTag
}

// Trigger filter object
export type PsrListFilterObjectTrigger = PsrListFilterObject & {
  // Trigger specific properties
  Trigger: PsrNotifyTriggerReason
}

// Trigger read filter object
export type PsrListFilterObjectTriggerRead = PsrListFilterObject & {
  // Trigger read specific properties
  ReadType: PsrListFilterObjectTriggerReadType
}

// Trigger type filter object
export type PsrListFilterObjectTriggerType = PsrListFilterObject & {
  // Trigger type specific properties
  TriggerType: PsrNotifyTriggerType
}

// Enums used by filter objects
export enum PsrListFilterObjectBindingType {
  Parent = 'Parent',
  Child = 'Child',
  Both = 'Both',
}

export enum PsrListFilterObjectLogbookDatePeriod {
  Today = 'Today',
  Yesterday = 'Yesterday',
  ThisWeek = 'ThisWeek',
  LastWeek = 'LastWeek',
  ThisMonth = 'ThisMonth',
  LastMonth = 'LastMonth',
  Custom = 'Custom',
}

export enum PsrListFilterObjectSealType {
  Open = 'Open',
  Closed = 'Closed',
  All = 'All',
}

export enum PsrFilterDirectoryServiceType {
  FilterDirectoryServiceTypeActiveDirectory = 0,
  FilterDirectoryServiceTypeEntraId = 1,
}

export enum PsrFilterOrganisationUnitType {
  FilterOrganisationUnitTypeUser = 0,
  FilterOrganisationUnitTypeGroup = 1,
}

export enum PsrListFilterObjectTriggerReadType {
  ListFilterObjectTriggerReadTypeRead = 0,
  ListFilterObjectTriggerReadTypeNotRead = 1,
}
