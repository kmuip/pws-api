import type { PsrApi, PsrGuid, PsrOption } from '@kmuip/pws-api'
import type { OptionValueRecord, OptionWriteInput } from '../types.js'

function toOptionValueRecord(option: PsrOption | null): OptionValueRecord {
  return {
    name: option?.Name ?? '',
    category: (option?.Category as string | null | undefined) ?? null,
    group: option?.Group == null ? null : Number(option.Group),
    dataId: (option?.DataId as PsrGuid | undefined) ?? null,
    parentDataId: (option?.ParentDataId as PsrGuid | undefined) ?? null,
    value:
      (option as { ValueString?: unknown } | null)?.ValueString ??
      option?.Value ??
      (option as { ValueItems?: unknown[] | null } | null)?.ValueItems ??
      null,
    selected:
      ((option as { ValueSelectedItem?: string | null } | null)?.ValueSelectedItem as
        | string
        | null
        | undefined) ?? null,
    raw: option,
  }
}

export class OptionValuesResource {
  constructor(private readonly raw: PsrApi) {}

  async get(name: string, data: unknown = this.raw.currentUser) {
    const option = data ? await this.raw.optionManager.getOption(name, data as never) : null
    return toOptionValueRecord(option)
  }

  async getString(name: string, data?: unknown) {
    const option = await this.get(name, data)
    const value = option.value
    if (value == null) {
      return option.selected
    }
    if (typeof value === 'string') {
      return value
    }
    return String(value)
  }

  async getBoolean(name: string, data?: unknown) {
    const value = await this.getString(name, data)
    if (value == null) {
      return null
    }
    if (value === 'true' || value === '1') {
      return true
    }
    if (value === 'false' || value === '0') {
      return false
    }
    return null
  }

  async getNumber(name: string, data?: unknown) {
    const value = await this.getString(name, data)
    if (value == null) {
      return null
    }
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : null
  }

  async getList(name: string, data?: unknown, separator = '|') {
    const value = await this.getString(name, data)
    return (
      value
        ?.split(separator)
        .map((entry) => entry.trim())
        .filter(Boolean) ?? []
    )
  }

  async setString(input: OptionWriteInput, value: string) {
    await this.raw.optionManager.updateStringOption(
      input.name,
      input.category,
      input.group as never,
      value,
      input.dataId ?? null,
    )
  }

  async setBoolean(input: OptionWriteInput, value: boolean) {
    await this.raw.optionManager.updateBooleanOption(
      input.name,
      input.category,
      input.group as never,
      value,
      input.dataId ?? null,
    )
  }

  async setNumber(input: OptionWriteInput, value: number) {
    await this.raw.optionManager.updateIntegerOption(
      input.name,
      input.category,
      input.group as never,
      value,
      input.dataId ?? null,
    )
  }

  async setList(input: OptionWriteInput, value: string) {
    await this.raw.optionManager.updateListOption(
      input.name,
      input.category,
      input.group as never,
      value,
      input.dataId ?? null,
    )
  }

  async delete(name: string, dataId: PsrGuid | null = null) {
    await this.raw.optionManager.deleteOption(name, dataId)
  }

  async getAllowedDocumentTypes(data?: unknown) {
    return this.getList('AllowedDocumentTypes', data)
  }
}
