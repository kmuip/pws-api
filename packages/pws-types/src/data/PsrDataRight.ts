import type { PsrGuid } from '../base'

export type PsrDataRight = {
  __type: string
  Data: Record<string, unknown>
  DataId: PsrGuid
  HasRightKey: boolean
  IncludeDataRightKey?: unknown
  Legitimate: Record<string, unknown>
  LegitimateId: PsrGuid
  LegitimatePublicKey: string
  OwnerRight: boolean
  RightKey?: unknown
  Rights?: unknown
  Seal?: unknown
  SealId: PsrGuid
  SecuredData: boolean
  SyncOperation: string
  TimeStampUtc: Date
  TransactionId: string
  ValidFromUtc: Date
  ValidToUtc: Date
}
