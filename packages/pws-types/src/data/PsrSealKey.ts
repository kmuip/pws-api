import type { PsrGuid } from '../base'
import type { PsrSyncOperation } from '../enum-constants'

export type PsrSealKey = {
  __type: string
  Id: PsrGuid
  KeyReleases?: any[]
  Seal?: any
  SealId?: PsrGuid
  SealKey?: string
  SyncOperation?: PsrSyncOperation
  TransactionId?: PsrGuid
}
