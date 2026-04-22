import type {
  PsrApi,
  PsrEntityObjectType,
  PsrGuid,
  PsrNotifyTriggerAlert,
  PsrNotifyTriggerAlertAdditionalData,
  PsrNotifyTriggerConfig,
} from '@kmuip/pws-api'
import type {
  SetTriggerDataConfigInput,
  SetTriggerOrganisationUnitConfigInput,
  TriggerAlertAdditionalDataRecord,
  TriggerAlertListOptions,
  TriggerAlertRecord,
  TriggerConfigRecord,
} from '../types.js'
import {
  asArray,
  containsText,
  isWithinDateRange,
  paginate,
  resolveDateRangePreset,
  sortRecords,
} from '../utils.js'

function toTriggerAlertRecord(alert: PsrNotifyTriggerAlert): TriggerAlertRecord {
  return {
    id: alert.Id,
    dataId: alert.DataId,
    dataName: alert.DataName ?? null,
    organisationUnitId: alert.OrganisationUnitId ?? null,
    triggerOrganisationUnitId: alert.TriggerOrganisationUnitId ?? null,
    reason: alert.TriggerReason ?? null,
    type: alert.TriggerType ?? null,
    info: alert.Info ?? null,
    read: Boolean(alert.Read),
    timestampUtc: alert.TimeStampUtc ?? null,
    raw: alert,
  }
}

function toTriggerAlertAdditionalDataRecord(
  entry: PsrNotifyTriggerAlertAdditionalData,
): TriggerAlertAdditionalDataRecord {
  return {
    id: entry.Id,
    dataId: entry.DataId,
    dataName: entry.DataName ?? null,
    notifyTriggerAlertId: entry.NotifyTriggerAlertId,
    raw: entry,
  }
}

function toTriggerConfigRecord(config: PsrNotifyTriggerConfig): TriggerConfigRecord {
  return {
    id: config.Id,
    organisationUnitId: config.OrganisationUnitId ?? null,
    triggerOrganisationUnitId: config.TriggerOrganisationUnitId ?? null,
    triggerDataId: config.TriggerDataId ?? null,
    triggerObjectType: config.TriggerObjectType ?? null,
    reason: config.NotifyTriggerReason ?? null,
    type: config.TriggerType ?? null,
    checkRights: Boolean(config.CheckRights),
    raw: config,
  }
}

export class TriggersResource {
  constructor(private readonly raw: PsrApi) {}

  async listAlerts(options: TriggerAlertListOptions = {}) {
    const filter = await this.raw.triggerManager.getTriggerListFilter(true)
    const alerts = asArray(await this.raw.triggerManager.getTriggerAlerts(filter))
    const preset = resolveDateRangePreset(options.datePreset)
    const from = options.dateFrom ?? preset.from
    const to = options.dateTo ?? preset.to

    const filtered = alerts
      .filter((alert) => {
        if (options.ids?.length) {
          const ids = new Set(options.ids)
          if (!ids.has(alert.Id)) {
            return false
          }
        }
        if (options.dataId && alert.DataId !== options.dataId) {
          return false
        }
        if (options.dataIds?.length) {
          const ids = new Set(options.dataIds)
          if (!ids.has(alert.DataId)) {
            return false
          }
        }
        if (options.organisationUnitId && alert.OrganisationUnitId !== options.organisationUnitId) {
          return false
        }
        if (
          options.triggerOrganisationUnitId &&
          alert.TriggerOrganisationUnitId !== options.triggerOrganisationUnitId
        ) {
          return false
        }
        if (options.reason != null && alert.TriggerReason !== options.reason) {
          return false
        }
        if (options.type != null && alert.TriggerType !== options.type) {
          return false
        }
        if (options.read != null && Boolean(alert.Read) !== options.read) {
          return false
        }
        if (!containsText(alert.Info, options.info)) {
          return false
        }
        if (options.search) {
          const haystack = [alert.DataName, alert.Info].filter(Boolean).join(' ')
          if (!containsText(haystack, options.search)) {
            return false
          }
        }
        if (from || to) {
          if (!isWithinDateRange(alert.TimeStampUtc, from, to)) {
            return false
          }
        }
        return true
      })
      .map(toTriggerAlertRecord)

    const sorted = options.sortBy
      ? sortRecords(
          filtered,
          (record) => record[options.sortBy ?? 'timestampUtc'],
          options.sortDirection ?? 'desc',
        )
      : sortRecords(filtered, (record) => record.timestampUtc, 'desc')

    return paginate(sorted, options.page, options.pageSize)
  }

  async countAlerts(options: TriggerAlertListOptions = {}) {
    const entries = await this.listAlerts({
      ...options,
      page: null,
      pageSize: null,
    })
    return entries.length
  }

  async getAlertAdditionalData(alertId: PsrGuid) {
    const entries = await this.raw.triggerManager.getTriggerAlertAdditionalDatas(alertId)
    return asArray(entries).map(toTriggerAlertAdditionalDataRecord)
  }

  async markRead(alertIds: PsrGuid[], read = true) {
    await this.raw.triggerManager.setNotifyTriggerAlertsRead(alertIds, read)
  }

  async getConfigForData(dataId: PsrGuid) {
    const configs = await this.raw.triggerManager.getTriggerConfigList(dataId)
    return asArray(configs).map(toTriggerConfigRecord)
  }

  async getConfigForObject(organisationUnitId: PsrGuid, objectType: PsrEntityObjectType) {
    const configs = await this.raw.triggerManager.getTriggerObjektConfigList(
      organisationUnitId,
      objectType,
    )
    return asArray(configs).map(toTriggerConfigRecord)
  }

  async hasConfigForData(dataId: PsrGuid, dataType: PsrEntityObjectType) {
    return this.raw.triggerManager.dataHasTriggerConfig(dataId, dataType)
  }

  async setConfigForData(input: SetTriggerDataConfigInput) {
    await this.raw.triggerManager.setNotifyDataTriggerConfig(
      input.reason,
      input.dataId,
      input.overrideType ?? null,
      input.checkRights ?? false,
      (input.filterObjects ?? []) as never,
    )
  }

  async setConfigForOrganisationUnit(input: SetTriggerOrganisationUnitConfigInput) {
    await this.raw.triggerManager.setNotifyOuTriggerConfig(
      input.reason,
      input.organisationUnitId,
      input.objectType,
      input.overrideType ?? null,
      input.checkRights ?? false,
      (input.filterObjects ?? []) as never,
    )
  }

  async removeConfigForData(reason: any, dataId: PsrGuid) {
    await this.raw.triggerManager.removeNotifyDataTriggerConfig(reason, dataId)
  }

  async removeConfigForOrganisationUnit(
    reason: any,
    organisationUnitId: PsrGuid,
    objectType: PsrEntityObjectType,
  ) {
    await this.raw.triggerManager.removeNotifyOuTriggerConfig(
      reason,
      organisationUnitId,
      objectType,
    )
  }
}
