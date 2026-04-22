import type { PsrGuid } from '../base'
import type {
  PsrNotifyTriggerReason,
  PsrNotifyTriggerType,
  PsrSyncOperation,
} from '../enum-constants'
import { PsrNotifyTriggerConfig } from './PsrNotifyTriggerConfig'
import { PsrOrganisationUnit } from './PsrOrganisationUnit'

export type PsrNotifyTriggerAlert = {
  __type: string
  DataId: PsrGuid
  DataName: string
  DataType: string
  Id: PsrGuid
  Info: string
  NotifyTriggerConfig?: PsrNotifyTriggerConfig
  NotifyTriggerConfigId: PsrGuid
  OrganisationUnit?: PsrOrganisationUnit
  OrganisationUnitId: PsrGuid
  Read: boolean
  SyncOperation?: PsrSyncOperation
  TimeStampUtc: Date
  TransactionId?: PsrGuid
  TriggerOrganisationUnit?: PsrOrganisationUnit
  TriggerOrganisationUnitId: PsrGuid
  TriggerReason: PsrNotifyTriggerReason
  TriggerType: PsrNotifyTriggerType
}
