import type { PsrGuid } from '../base'
import type { PsrServerKeyType, PsrSyncOperation } from '../enum-constants'

export type PsrOrganisationUnit = {
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
  SyncOperation?: PsrSyncOperation
  TimeStampUtc?: Date
  TransactionId?: PsrGuid
  ValidTimeStampUtc?: Date
  ActiveDirectoryObjektId?: string
  ActiveDirectoryProfile?: string
  ActiveDirectoryProfileId?: PsrGuid
  ActiveDirectorySync?: boolean
  EncryptionKeyType?: PsrServerKeyType
  Image?: string
}
