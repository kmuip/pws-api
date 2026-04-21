import type { PsrGuid } from '../base'

export type PsrDataTagTemplate = {
  Data: Record<string, unknown>
  DataId: PsrGuid
  DataType: string
  SyncOperation: string
  TagIds?: unknown
  Target: Record<string, unknown>
  TargetId: PsrGuid
  TemplateGroup?: Record<string, unknown>
  TemplateGroupId?: PsrGuid
  TransactionId: string
}
