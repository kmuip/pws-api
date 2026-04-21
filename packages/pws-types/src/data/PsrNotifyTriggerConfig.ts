import type { PsrGuid } from '../base'
import type { PsrNotifyTriggerReason, PsrNotifyTriggerType, PsrSyncOperation } from '../enum-constants'
import { PsrData } from './PsrData'
import { PsrNotifyTrigger } from './PsrNotifyTrigger'
import { PsrOrganisationUnit } from './PsrOrganisationUnit'
import { PsrNotifyTriggerConfigFilterObject } from './PsrNotifyTriggerConfigFilterObject'

export type PsrNotifyTriggerConfig = {
  __type: string
  CheckRights: boolean
  ConfigFilterObjects?: PsrNotifyTriggerConfigFilterObject[]
  Id: PsrGuid
  NotifyTrigger?: PsrNotifyTrigger
  NotifyTriggerReason: PsrNotifyTriggerReason
  OrganisationUnit?: PsrOrganisationUnit
  OrganisationUnitId: PsrGuid
  SyncOperation?: PsrSyncOperation
  TransactionId?: PsrGuid
  TriggerData?: PsrData
  TriggerDataId?: PsrGuid
  TriggerObjectType?: string
  TriggerOrganisationUnit?: PsrOrganisationUnit
  TriggerOrganisationUnitId?: PsrGuid
  TriggerType: PsrNotifyTriggerType
}
