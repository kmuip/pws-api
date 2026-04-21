import type { PsrGuid } from '../base'

export type PsrCredentialCheck = {
  ContainerId: PsrGuid
  LastCheckUtc: Date
  LastError: string
  Result: string
  SyncOperation: string
  TimeStampUtc: Date
  TransactionId: string
}
