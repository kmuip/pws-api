import type { PsrGuid } from '../base'
import { PsrContainerInfo } from './PsrContainerInfo'
import { PsrContainerItem } from './PsrContainerItem'

export type PsrContainer = {
  // Inherited from PsrData
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

  // PsrContainer specific properties
  __type?: string // Internally used, never change this value
  BaseContainer?: any // Optional base container
  BaseContainerId?: PsrGuid // ID of the optional base container
  ContainerInfoConfig?: any // Configuration of the info fields
  ContainerQuality?: number // Quality of a container
  ContainerType?: string
  CredentialCheck?: any // Credential check state
  Description?: string
  DocumentCacheDeleteTime?: Date // After which time the data should be deleted from the cache
  DocumentData?: any // Document data
  DocumentDataId?: PsrGuid // ID of the document data
  DocumentMeta?: any // Meta data of the document
  DocumentParams?: any // Parameters to open the document
  DocumentPath?: string // Path to the document (link or original path)
  DocumentSize?: number // Size of the document in kilobytes
  DocumentType?: string // File extension (.txt, .pdf, etc.)
  EncryptionKeyType?: string // The type of the key
  Info?: PsrContainerInfo // Container information
  IsDocumentLink?: boolean // Indicates whether a document is a link or not
  Items?: PsrContainerItem[] // Container items
  Name?: string // Optional name of the container

  // Custom properties (not in API spec - may need verification)
  ParentId?: PsrGuid
  OrganisationUnitId?: PsrGuid
  IsLocked?: boolean
  PasswordStrength?: number
  LastAccessedUtc?: Date
  IconId?: PsrGuid
}
