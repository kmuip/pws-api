import type { PsrGuid } from '../base'
import type { PsrServerKeyType, PsrSyncOperation } from '../enum-constants'

export type PsrOrganisationUnitUser = {
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
  __type: string
  ActiveDirectoryDomain?: string
  Country?: string
  Description?: string
  FirstName?: string
  HasToChangePasswordOnNextLogin?: boolean
  IsDeactivated?: boolean
  Language?: string
  LastLoginUtc?: Date
  LastName?: string
  LastPasswordChangeUtc?: Date
  Mail?: string
  Mobilephone?: string
  Office?: string
  Phone?: string
  Place?: string
  Province?: string
  RestrictiveUser?: boolean
  Street?: string
  UserName?: string
  ZipCode?: string
}