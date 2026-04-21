import type { PsrGuid } from '../base'

export type PsrDataBinding = {
  __type: string
  Data: Record<string, unknown>
  DataId: PsrGuid
  DataType: string
  ParentData: Record<string, unknown>
  ParentDataId: PsrGuid
  ParentDataType: string
  SyncOperation: string
  TimeStampUtc: Date
  TransactionId: string
}
