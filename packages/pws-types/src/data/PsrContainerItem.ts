import type { PsrGuid } from '../base'
import type { PsrContainerItemType } from '../enum-constants/PsrContainerItemType'
import type { PsrContainerItemDescHighlight } from '../enum-constants/PsrContainerItemDescHighlight'
import type { PsrServerKeyType } from '../enum-constants/PsrServerKeyType'

export type PsrContainerItem = {
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
  PublicKey?: string
  SyncOperation?: string
  TimeStampUtc?: Date
  TransactionId?: string
  ValidTimeStampUtc?: Date

  // PsrContainerItem specific properties
  AdditionalData?: string // Additional Date for the ContainerItem. For example serialized List items if the type of the password field is list
  AllowedChars?: string // Allowed characters (validation)
  AllowOnlyGeneratedPasswords?: boolean // Only generated passwords are allowed for this field. Only possible when the type is ContainerItemPassword or ContainerItemPasswordMemo
  BaseContainerItem?: any // Base container item
  BaseContainerItemId?: PsrGuid // Base container item ID
  CheckPolicy?: boolean // If the password policy should be validated
  Container?: any // Container
  ContainerId?: PsrGuid // Container ID
  ContainerItemDescHighlightType?: PsrContainerItemDescHighlight // Highlight type of the container item
  ContainerItemType: PsrContainerItemType // Type
  Description?: string // Description
  EncryptionKeyType?: PsrServerKeyType // The type of the key
  IsEncrypted?: boolean // If the item is encrypted
  ListItems?: any[] // List items when type is ContainerItemList
  Name?: string // Name
  Policy?: any // Password policy
  PolicyId?: PsrGuid // Password policy ID
  Position?: number // Position (index)
  Quality?: number // Quality of the item (used for passwords)
  Regex?: string // Regular expression (validation)
  SecretValueRequiredReason?: string // If a reason is required to retrieve the value of the item

  // Value properties (multiple types supported)
  PlainTextValue?: string // Plain text value
  Value?: string // Text value
  ValueBool?: boolean // Boolean value
  ValueDateUtc?: Date // Date value
  ValueDecimal?: number // Decimal value
  ValueHash?: string // Encrypted values
  ValueInt?: number // Integer value
  ValueMemo?: string // Memo Value
}
