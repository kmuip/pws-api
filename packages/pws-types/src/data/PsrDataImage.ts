import type { PsrGuid } from '../base'

export type PsrDataImage = {
  // PsrData inherited properties
  Id: PsrGuid
  ChangedOrganisationUnit?: string
  ChangedOrganisationUnitId?: string
  ChildDataBindings?: any[]
  DataRights?: any[]
  DataStates?: any[]
  DataTags?: any[]
  HasTrigger?: boolean
  HasTriggerAlert?: boolean
  IsFavorite?: boolean
  LogbookEntries?: any[]
  ParentDataBindings?: any[]
  PublicKey?: string
  SyncOperation?: string
  TimeStampUtc?: Date
  TransactionId?: string
  ValidTimeStampUtc?: Date

  // PsrDataImage specific properties
  __type: string
  DeleteIcon: boolean
  DeleteLogo: boolean
  Icon?: string
  IconFileHandle?: string
  IconSize?: number
  Logo?: string
  LogoFileHandle?: string
  LogoSize?: number
  Name: string
  SearchValue?: string
}
