import type { PsrGuid } from '../base'
import type { PsrSyncOperation } from '../enum-constants'

export type PsrTag = {
  Id: PsrGuid
  ChangedOrganisationUnit?: string
  ChangedOrganisationUnitId?: string
  ChildDataBindings?: any[]
  Color?: string
  DataRights?: any[]
  DataStates?: any[]
  DataTags?: any[]
  Description?: string
  FilterUsageCount?: number
  HasTrigger?: boolean
  HasTriggerAlert?: boolean
  IsFavorite?: boolean
  LastFilterUsageUtc?: Date
  LogbookEntries?: any[]
  Name?: string
  ParentDataBindings?: any[]
  PublicKey?: string
  SyncOperation?: PsrSyncOperation
  SystemTag?: boolean
  TimeStampUtc?: Date
  TransactionId?: PsrGuid
  ValidTimeStampUtc?: Date
  __type?: string
}
