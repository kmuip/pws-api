import type { PsrGuid } from '../base'
import type { PsrEntityClass, PsrNotifyTriggerReason, PsrNotifyTriggerType, PsrSyncOperation } from '../enum-constants'

export type PsrNotifyTrigger = {
  __type: string
  ObjectTypes: PsrEntityClass[]
  Reason: PsrNotifyTriggerReason
  SyncOperation?: PsrSyncOperation
  TransactionId?: PsrGuid
  TriggerType: PsrNotifyTriggerType
}
