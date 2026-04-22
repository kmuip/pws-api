import type { PsrApi, PsrGuid, PsrTag } from '@kmuip/pws-api'
import type {
  TagCreateInput,
  TagListOptions,
  TagRecord,
  TagUsageOptions,
  TagUpdateInput,
  TagUsageRecord,
} from '../types.js'
import {
  asArray,
  containsText,
  createTagReference,
  createRuntimeModel,
  isWithinDateRange,
  normalizeText,
  sortRecords,
} from '../utils.js'

function toTagRecord(tag: PsrTag): TagRecord {
  return {
    id: tag.Id,
    name: normalizeText(tag.Name),
    color: normalizeText(tag.Color),
    raw: tag,
  }
}

export class TagsResource {
  constructor(private readonly raw: PsrApi) {}

  private async getAllTags() {
    const filter = await this.raw.tagManager.getTagListFilter(true)
    return asArray(await this.raw.tagManager.getTags(filter))
  }

  async list(options: TagListOptions = {}) {
    let tags = await this.getAllTags()
    if (options.ids?.length) {
      const ids = new Set(options.ids)
      tags = tags.filter((tag) => ids.has(tag.Id))
    }
    if (options.names?.length) {
      const names = new Set(options.names.map((name) => name.trim().toLowerCase()))
      tags = tags.filter(
        (tag) =>
          normalizeText(tag.Name)?.toLowerCase() &&
          names.has(normalizeText(tag.Name)!.toLowerCase()),
      )
    }
    if (options.search) {
      tags = tags.filter((tag) => containsText(tag.Name, options.search))
    }
    if (options.color != null) {
      tags = tags.filter((tag) => normalizeText(tag.Color) === normalizeText(options.color))
    }
    if (options.systemTag != null) {
      tags = tags.filter((tag) => Boolean(tag.SystemTag) === options.systemTag)
    }

    const records = tags.map(toTagRecord)
    return options.sortBy
      ? sortRecords(records, (record) => record[options.sortBy ?? 'name'], options.sortDirection)
      : records
  }

  async create(input: TagCreateInput) {
    const tag = createRuntimeModel<PsrTag>('PsrTag')
    ;(tag as Record<string, unknown>).__type = 'PsrDataLayer.Structure.MtoTag, PsrDataLayer'
    tag.Name = input.name
    const created = await this.raw.tagManager.addTag(tag, input.color ?? '')
    return toTagRecord(created)
  }

  async update(id: PsrGuid, input: TagUpdateInput) {
    const tag = await this.getById(id)
    if (input.name != null) {
      tag.Name = input.name
    }

    const updated = await this.raw.tagManager.updateTag(tag, input.color ?? tag.Color ?? '')
    return toTagRecord(updated)
  }

  async delete(id: PsrGuid) {
    const tag = await this.getById(id)
    await this.raw.tagManager.deleteTag(tag)
  }

  async get(id: PsrGuid) {
    return toTagRecord(await this.getById(id))
  }

  async getByName(name: string) {
    const normalizedName = normalizeText(name)?.toLowerCase()
    if (!normalizedName) {
      return null
    }

    const tag =
      (await this.getAllTags()).find(
        (candidate) => normalizeText(candidate.Name)?.toLowerCase() === normalizedName,
      ) ?? null

    return tag ? toTagRecord(tag) : null
  }

  async getUsage(options: TagUsageOptions = {}) {
    let entries = await this.raw.tagManager.getTagGlobalUsageInfos(options.take ?? 0)
    if (options.ids?.length) {
      const ids = new Set(options.ids)
      entries = entries.filter((entry) => ids.has(entry.TagId))
    }
    if (options.names?.length) {
      const names = new Set(options.names.map((name) => name.trim().toLowerCase()))
      entries = entries.filter((entry) => {
        const name = normalizeText(entry.Name)?.toLowerCase()
        return name ? names.has(name) : false
      })
    }
    if (options.search) {
      entries = entries.filter((entry) => containsText(entry.Name, options.search))
    }
    if (typeof options.minCount === 'number') {
      entries = entries.filter((entry) => Number(entry.Count ?? 0) >= options.minCount!)
    }
    if (typeof options.maxCount === 'number') {
      entries = entries.filter((entry) => Number(entry.Count ?? 0) <= options.maxCount!)
    }
    if (options.usedFrom || options.usedTo) {
      entries = entries.filter((entry) =>
        isWithinDateRange(entry.LastUsageUtc, options.usedFrom, options.usedTo),
      )
    }

    return entries.map(
      (entry): TagUsageRecord => ({
        id: entry.TagId,
        name: normalizeText(entry.Name),
        count: Number(entry.Count ?? 0),
        lastUsageUtc: (entry.LastUsageUtc as Date | string | null | undefined) ?? null,
        raw: entry,
      }),
    )
  }

  async ensure(names: string[]) {
    const wanted = [...new Set(names.map((name) => name.trim()).filter(Boolean))]
    if (wanted.length === 0) {
      return []
    }

    const existing = await this.getAllTags()
    const byName = new Map(
      existing.map((tag) => [normalizeText(tag.Name)?.toLowerCase(), tag] as const),
    )
    const ensured: PsrTag[] = []

    for (const name of wanted) {
      const match = byName.get(name.toLowerCase()) ?? null
      if (match) {
        ensured.push(match)
        continue
      }

      const created = await this.raw.tagManager.addTag(
        Object.assign(createRuntimeModel<PsrTag>('PsrTag'), {
          __type: 'PsrDataLayer.Structure.MtoTag, PsrDataLayer',
          Name: name,
        }),
        '',
      )
      byName.set(name.toLowerCase(), created)
      ensured.push(created)
    }

    return ensured.map(toTagRecord)
  }

  async setForData(input: { dataId: PsrGuid; tagIds: PsrGuid[] }) {
    const tags = await this.getByIds(input.tagIds)
    await this.raw.tagManager.setDataTags(
      tags.map((tag) => createTagReference(tag, input.dataId)),
      input.dataId,
    )
  }

  async addFavorite(dataId: PsrGuid) {
    await this.raw.tagManager.addDataFavorite(dataId)
  }

  async removeFavorite(dataId: PsrGuid) {
    await this.raw.tagManager.removeDataFavorite(dataId)
  }

  async getByIds(ids: PsrGuid[]) {
    const wanted = new Set(ids)
    const tags = (await this.getAllTags()).filter((tag) => wanted.has(tag.Id))
    if (tags.length !== ids.length) {
      const found = new Set(tags.map((tag) => tag.Id))
      const missing = ids.filter((id) => !found.has(id))
      throw new Error(`Tags not found: ${missing.join(', ')}`)
    }

    return tags
  }

  private async getById(id: PsrGuid) {
    const tag = (await this.getAllTags()).find((candidate) => candidate.Id === id) ?? null
    if (!tag) {
      throw new Error(`Tag ${id} was not found.`)
    }

    return tag
  }
}
