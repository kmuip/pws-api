import type { PsrApi, PsrGuid } from '@kmuip/pws-api'
import type { DataBindingRecord } from '../types.js'
import { asArray } from '../utils.js'

function toDataBindingRecord(binding: any): DataBindingRecord {
  return {
    id: (binding.Id as string | undefined) ?? null,
    dataId: binding.DataId,
    dataType: (binding.DataType as string | null | undefined) ?? null,
    parentDataId: binding.ParentDataId,
    parentDataType: (binding.ParentDataType as string | null | undefined) ?? null,
    raw: binding,
  }
}

export class DataBindingsSdkResource {
  constructor(private readonly raw: PsrApi) {}

  async listByData(dataId: PsrGuid, parentType: number | null = null) {
    return asArray(
      await this.raw.dataBindingManager.getDataBindingsByData(dataId, parentType as never),
    ).map(toDataBindingRecord)
  }

  async listByParent(parentId: PsrGuid, dataType: number | null = null) {
    return asArray(
      await this.raw.dataBindingManager.getDataBindingsByParent(parentId, dataType as never),
    ).map(toDataBindingRecord)
  }

  async add(dataId: PsrGuid, dataType: number, parentId: PsrGuid, parentType: number) {
    await this.raw.dataBindingManager.addDataBinding(
      dataId,
      dataType as never,
      parentId,
      parentType as never,
    )
  }

  async remove(id: PsrGuid, parentId: PsrGuid) {
    await this.raw.dataBindingManager.removeDataBinding(id, parentId)
  }

  async removeAll(dataId: PsrGuid, parentType: number | null = null) {
    await this.raw.dataBindingManager.removeAllDataBinding(dataId, parentType as never)
  }

  async replaceAll(dataId: PsrGuid, dataType: number, parentIds: PsrGuid[], parentType: number) {
    await this.removeAll(dataId, parentType)
    for (const parentId of parentIds) {
      await this.add(dataId, dataType, parentId, parentType)
    }
  }
}
