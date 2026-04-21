import type { PsrGuid } from '../base'

export type PsrDataTag = {
  __type: string
  Data: Record<string, unknown>
  DataId: PsrGuid
  Id: PsrGuid
  OrganisationUnit?: unknown
  OrganisationUnitId?: PsrGuid
  SyncOperation: string
  Tag: Record<string, unknown>
  TagId: PsrGuid
  TimeStampUtc: Date
  TransactionId: string
}
