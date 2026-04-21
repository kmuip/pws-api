import type { PsrGuid } from '../base'

export type PsrActiveDirectoryProfile = {
  Id: PsrGuid
  __type?: string // Internally used, never change this value
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
  AdditionalUserDomains?: string // Additional domain names. Can be used for login when Master Key mode is active
  AuthenticationTypes?: string // Flags used for connecting to the active directory server
  CnFilter?: string // LDAP-filter for detailed filtering of displayed elements
  Description?: string
  DirectSearch?: boolean // If the LDAP search should be executed directly
  LastConfig?: any // Previously selected Active Directory objects
  LastRunUtc?: Date // Timestamp of the last execution
  MasterKeyModus?: boolean // In Master Key mode (vs end-to-end mode), a server key is generated for server side encryption
  MasterKeyUser?: string // Organisation unit user that executes the import/synchronization in Master Key mode
  MasterKeyUserId?: string // ID of the organisation unit user that executes the import/synchronization in Master Key mode
  Name?: string // Name of the import profile
  ServerKey?: any // Server key that is used in Master Key mode
  ServerKeyId?: string // ID of the server key that is used in Master Key mode
  UserDomain?: string // Active Directory domain that should be synchronized
  UserName?: string // Username that is used for authentication against the Active Directory
  UserPassword?: string // Encrypted user password that is used for authentication against the Active Directory
  UseSsl?: boolean // Obsolete: Should the connection to the Active Directory be established via SecureSocketsLayer
}
