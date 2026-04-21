import { PsrGuid } from '../base'
import type { PsrListFilter, PsrNotifyTriggerAlert, PsrNotifyTriggerAlertAdditionalData, PsrNotifyTriggerConfig } from '../data'
import { PsrEntityObjectType, PsrNotifyTriggerReason, PsrNotifyTriggerType, PsrTriggerConfigResult } from '../enum-constants'

export type TriggerManager = {
  getTriggerCount(filter: PsrListFilter): Promise<number>
  getTriggerListFilter(defaultFilter: boolean): Promise<PsrListFilter>
  getTriggerAlerts(listFilter: PsrListFilter): Promise<Iterable<PsrNotifyTriggerAlert>>
  getTriggerAlertAdditionalDatas(alertId: PsrGuid): Promise<Iterable<PsrNotifyTriggerAlertAdditionalData>>
  setNotifyTriggerAlertsRead(alertIds: PsrGuid[], read: boolean): Promise<void> | void
  dataHasTriggerConfig(dataId: PsrGuid, dataType: PsrEntityObjectType): Promise<PsrTriggerConfigResult>
  getTriggerConfigList(dataId: PsrGuid): Promise<Iterable<PsrNotifyTriggerConfig>>
  getTriggerObjektConfigList(
    triggerOrganisationUnitId: PsrGuid,
    triggerObjectType: PsrEntityObjectType,
  ): Promise<Iterable<PsrNotifyTriggerConfig>>
  setNotifyDataTriggerConfig(
    reason: PsrNotifyTriggerReason,
    dataId: PsrGuid,
    overrideType: PsrNotifyTriggerType | null,
    checkRights: boolean,
    filterObjects: any[],
  ): Promise<void> | void
  setNotifyOuTriggerConfig(
    reason: PsrNotifyTriggerReason,
    organisationUnitId: PsrGuid,
    objectType: PsrEntityObjectType,
    overrideType: PsrNotifyTriggerType | null,
    checkRights: boolean,
    filterObjects: any[],
  ): Promise<void> | void
  removeNotifyDataTriggerConfig(reason: PsrNotifyTriggerReason, dataId: PsrGuid): Promise<void> | void
  removeNotifyOuTriggerConfig(
    reason: PsrNotifyTriggerReason,
    organisationUnitId: PsrGuid,
    objectType: PsrEntityObjectType,
  ): Promise<void> | void
}
