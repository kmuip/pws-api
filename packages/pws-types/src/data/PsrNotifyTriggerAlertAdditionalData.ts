import type { PsrGuid } from '../base'
import type { PsrSyncOperation } from '../enum-constants'

export type PsrNotifyTriggerAlertAdditionalData = {
  __type: string
  DataId: PsrGuid
  DataName: string
  DataType: string
  Id: PsrGuid
  NotifyTriggerAlertId: PsrGuid
  SyncOperation?: PsrSyncOperation
  TransactionId?: PsrGuid
}
