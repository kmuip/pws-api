import type { PsrGuid } from '../base'
import type { PsrPolicyCategory, PsrOptionGroup, PsrSyncOperation } from '../enum-constants'

export type PsrOption = {
  __type: string
  Category: PsrPolicyCategory
  Data?: unknown
  DataId?: PsrGuid
  Group: PsrOptionGroup
  Id: PsrGuid
  Name: string
  ParentDataId?: PsrGuid
  Value?: unknown
  ValueItems?: unknown[]
  ValueSelectedItem?: string | null
  SyncOperation?: PsrSyncOperation
  TimeStampUtc?: Date
  TransactionId?: PsrGuid
}
