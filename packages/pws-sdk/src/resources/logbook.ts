import { type PsrApi, type PsrGuid, type PsrListFilter } from '@kmuip/pws-api'
import type { LogbookListOptions, LogbookRecord } from '../types.js'
import {
  asArray,
  containsText,
  isWithinDateRange,
  paginate,
  resolveDateRangePreset,
  setFilterPage,
  sortRecords,
  toDate,
} from '../utils.js'

function toLogbookRecord(entry: any): LogbookRecord {
  return {
    id: entry.Id,
    dataId: entry.DataId ?? null,
    dataName: entry.DataName ?? null,
    event: entry.LogbookEvent ?? null,
    organisationUnitId: entry.OrganisationUnitId ?? null,
    info: entry.Info ?? null,
    timestampUtc: entry.TimeStampUtc ?? null,
    raw: entry,
  }
}

function applyLocalFilters(entries: any[], options: LogbookListOptions) {
  const preset = resolveDateRangePreset(options.datePreset)
  const from = options.dateFrom ?? preset.from
  const to = options.dateTo ?? preset.to

  return entries.filter((entry) => {
    if (options.dataId && entry.DataId !== options.dataId) {
      return false
    }
    if (options.dataIds?.length) {
      const ids = new Set(options.dataIds)
      if (!ids.has(entry.DataId)) {
        return false
      }
    }
    if (options.organisationUnitId && entry.OrganisationUnitId !== options.organisationUnitId) {
      return false
    }
    if (options.organisationUnitIds?.length) {
      const ids = new Set(options.organisationUnitIds)
      if (!ids.has(entry.OrganisationUnitId)) {
        return false
      }
    }
    if (options.events?.length && !options.events.includes(entry.LogbookEvent)) {
      return false
    }
    if (!containsText(entry.DataName, options.dataName)) {
      return false
    }
    if (!containsText(entry.Info, options.info)) {
      return false
    }
    if (!containsText(entry.ClientUser, options.clientUser)) {
      return false
    }
    if (!containsText(entry.ClientIpAdress, options.clientIpAddress)) {
      return false
    }
    if (options.onlyWithInfo && !normalizeInfo(entry.Info)) {
      return false
    }
    if (options.search) {
      const haystack = [
        entry.DataName,
        entry.Info,
        entry.ClientUser,
        entry.ClientIpAdress,
        entry.OrganisationUnit,
      ]
        .filter(Boolean)
        .join(' ')
      if (!containsText(haystack, options.search)) {
        return false
      }
    }
    if (from || to) {
      if (!isWithinDateRange(entry.TimeStampUtc, from, to)) {
        return false
      }
    }
    return true
  })
}

function normalizeInfo(value: unknown) {
  const info = typeof value === 'string' ? value.trim() : String(value ?? '').trim()
  return info.length > 0 ? info : null
}

export class LogbookResource {
  constructor(private readonly raw: PsrApi) {}

  private async createFilter(options: LogbookListOptions = {}, withPaging = true) {
    const filter = (await this.raw.logbookManager.getLogbookListFilter(true)) as PsrListFilter
    if (withPaging) {
      setFilterPage(filter, options.page, options.pageSize)
    }
    if (options.dataId) {
      filter.DataId = options.dataId
    }
    const preset = resolveDateRangePreset(options.datePreset)
    const from = toDate(options.dateFrom) ?? preset.from
    const to = toDate(options.dateTo) ?? preset.to
    if (from) {
      filter.TimeStampUtcFrom = from
    }
    if (to) {
      filter.TimeStampUtcTo = to
    }
    return filter
  }

  async list(options: LogbookListOptions = {}) {
    const needsLocalFiltering =
      Boolean(options.dataIds?.length) ||
      Boolean(options.organisationUnitId) ||
      Boolean(options.organisationUnitIds?.length) ||
      Boolean(options.events?.length) ||
      Boolean(options.dataName) ||
      Boolean(options.info) ||
      Boolean(options.search) ||
      Boolean(options.clientUser) ||
      Boolean(options.clientIpAddress) ||
      Boolean(options.onlyWithInfo)

    const filter = await this.createFilter(options, !needsLocalFiltering)
    const entries = asArray(await this.raw.logbookManager.getLogbookEntries(filter))
    const filtered = applyLocalFilters(entries, options).map(toLogbookRecord)
    const sorted = options.sortBy
      ? sortRecords(
          filtered,
          (record) => record[options.sortBy ?? 'timestampUtc'],
          options.sortDirection ?? 'desc',
        )
      : sortRecords(filtered, (record) => record.timestampUtc, 'desc')

    return needsLocalFiltering ? paginate(sorted, options.page, options.pageSize) : sorted
  }

  async count(options: LogbookListOptions = {}) {
    const needsLocalFiltering =
      Boolean(options.dataIds?.length) ||
      Boolean(options.organisationUnitId) ||
      Boolean(options.organisationUnitIds?.length) ||
      Boolean(options.events?.length) ||
      Boolean(options.dataName) ||
      Boolean(options.info) ||
      Boolean(options.search) ||
      Boolean(options.clientUser) ||
      Boolean(options.clientIpAddress) ||
      Boolean(options.onlyWithInfo)

    const filter = await this.createFilter(options, false)
    if (!needsLocalFiltering) {
      return this.raw.logbookManager.getLogbookCount(filter)
    }

    const entries = asArray(await this.raw.logbookManager.getLogbookEntries(filter))
    return applyLocalFilters(entries, options).length
  }

  async get(id: PsrGuid) {
    const entry = await this.raw.logbookManager.getSingleLogbookEntry(id)
    return toLogbookRecord(entry)
  }

  async export(options: LogbookListOptions = {}) {
    const entries = await this.list({
      ...options,
      page: null,
      pageSize: null,
    })
    return {
      entries,
      rows: entries.map((entry) => ({
        id: entry.id,
        timestampUtc: entry.timestampUtc,
        dataId: entry.dataId,
        dataName: entry.dataName,
        event: entry.event == null ? null : Number(entry.event),
        organisationUnitId: entry.organisationUnitId,
        info: entry.info,
        raw: entry.raw,
      })),
    }
  }
}
