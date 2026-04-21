import type { PsrListFilterObjectOrganisationUnit } from './PsrListFilterObject'

// Base filter group type
export type PsrListFilterGroup = {
  // Core properties
  AndLinkedGroup?: boolean // If this property is set to true, the group will be AND linked with other groups. Otherwise OR.
  Expanded?: boolean // If the group is opened or not
}

// Application type filter group
export type PsrListFilterGroupApplicationType = PsrListFilterGroup & {
  // Application type specific properties
  __type: string // Internally used, never change this value
  ApplicationTypeFilters?: unknown[] // Filter objects for application types
}

// Credential check result filter group
export type PsrListFilterGroupCredentialCheckResult = PsrListFilterGroup & {
  // Credential check result specific properties
  __type: string // Internally used, never change this value
  CredentialCheckResults?: unknown[] // Filter objects for credential check results
}

// Data binding filter group
export type PsrListFilterGroupDataBinding = PsrListFilterGroup & {
  // Data binding specific properties
  __type: string // Internally used, never change this value
  BindingFilters?: unknown[] // Filter objects for data bindings
}

// Data object filter group
export type PsrListFilterGroupDataObject = PsrListFilterGroup & {
  // Data object specific properties
  __type: string // Internally used, never change this value
  DataObjectFilters?: unknown[] // Filter objects for data objects (password, role, etc.)
}

// Deactivated filter group
export type PsrListFilterGroupDeactivated = PsrListFilterGroup & {
  // Deactivated specific properties
  __type: string // Internally used, never change this value
  // Additional properties would be defined based on specific API documentation (content was truncated)
}

// Directory service filter group
export type PsrListFilterGroupDirectoryService = PsrListFilterGroup & {
  // Directory service specific properties
  __type: string // Internally used, never change this value
  DirectoryServiceFilters?: unknown[] // Filter objects for directory services
}

// Favourite filter group
export type PsrListFilterGroupFavourite = PsrListFilterGroup & {
  // Favourite specific properties
  __type: string // Internally used, never change this value
  FavouriteFilters?: unknown[] // Filter objects for favourites
}

// Form filter group
export type PsrListFilterGroupForm = PsrListFilterGroup & {
  // Form specific properties
  __type: string // Internally used, never change this value
  FormFilters?: unknown[] // Filter objects for forms
}

// String lists filter group
export type PsrListFilterGroupForStringLists<T = unknown> = PsrListFilterGroup & {
  // String lists specific properties
  __type: string // Internally used, never change this value
  StringListFilters?: T[] // Generic filter objects for string lists
  ListType?: string // Type of string list being filtered
}

// Has lock filter group
export type PsrListFilterGroupHasLock = PsrListFilterGroup & {
  // Has lock specific properties
  __type: string // Internally used, never change this value
  LockFilters?: unknown[] // Filter objects for lock status
}

// Has tag filter group
export type PsrListFilterGroupHasTag = PsrListFilterGroup & {
  // Has tag specific properties
  __type: string // Internally used, never change this value
  TagFilters?: unknown[] // Filter objects for tag presence
}

export const PsrListFilterGroupLogbook$Type =
  'PsrDataLayer.FilterObjects.ListFilterGroupLogbook, PsrDataLayer' as const

// Logbook filter group
export type PsrListFilterGroupLogbook = PsrListFilterGroup & {
  // Logbook specific properties
  $type: typeof PsrListFilterGroupLogbook$Type // Internally used, never change this value
  LogbookFilters?: unknown[] // Filter objects for logbook entries
}

// Logbook event filter group
export const PsrListFilterGroupLogbookEvent$Type =
  'PsrDataLayer.FilterObjects.ListFilterGroupLogbookEvent, PsrDataLayer' as const

export type PsrListFilterGroupLogbookEvent = PsrListFilterGroup & {
  // Logbook event specific properties
  $type: typeof PsrListFilterGroupLogbookEvent$Type // Internally used, never change this value
  EventFilters?: unknown[] // Filter objects for logbook events
}

// Organisation unit filter group
export const PsrListFilterGroupOrganisationUnit$Type =
  'PsrDataLayer.FilterObjects.ListFilterGroupOrganisationUnit, PsrDataLayer' as const

export type PsrListFilterGroupOrganisationUnit = PsrListFilterGroup & {
  $type: typeof PsrListFilterGroupOrganisationUnit$Type
  // Organisation unit specific properties
  OrganisationUnitFilter?: PsrListFilterObjectOrganisationUnit // Filter objects for organisation units
}

// Organisation unit type filter group
export type PsrListFilterGroupOrganisationUnitType = PsrListFilterGroup & {
  // Organisation unit type specific properties
  __type: string // Internally used, never change this value
  TypeFilters?: PsrListFilterObjectOrganisationUnit[] // Filter objects for organisation unit types
}

// Right filter group
export type PsrListFilterGroupRight = PsrListFilterGroup & {
  // Right specific properties
  __type: string // Internally used, never change this value
  RightFilters?: unknown[] // Filter objects for rights/permissions
}

// Seal filter group
export type PsrListFilterGroupSeal = PsrListFilterGroup & {
  // Seal specific properties
  __type: string // Internally used, never change this value
  SealFilters?: unknown[] // Filter objects for seals
}

// Tag filter group
export type PsrListFilterGroupTag = PsrListFilterGroup & {
  // Tag specific properties
  __type: string // Internally used, never change this value
  TagValueFilters?: unknown[] // Filter objects for tag values
}

// Trigger filter group
export type PsrListFilterGroupTrigger = PsrListFilterGroup & {
  // Trigger specific properties
  __type: string // Internally used, never change this value
  TriggerFilters?: unknown[] // Filter objects for triggers
}

// Trigger read filter group
export type PsrListFilterGroupTriggerRead = PsrListFilterGroup & {
  // Trigger read specific properties
  __type: string // Internally used, never change this value
  TriggerReadFilters?: unknown[] // Filter objects for trigger read operations
}

// Trigger type filter group
export type PsrListFilterGroupTriggerType = PsrListFilterGroup & {
  // Trigger type specific properties
  __type: string // Internally used, never change this value
  TriggerTypeFilters?: unknown[] // Filter objects for trigger types
}