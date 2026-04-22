import {
  PsrApiEnums,
  type PsrApi,
  type PsrBatchRightItem,
  type PsrDataRight,
  type PsrGuid,
} from '@kmuip/pws-api'
import type {
  GrantRightInput,
  RightBatchItemInput,
  RightRecord,
  UpdateRightInput,
} from '../types.js'
import { asArray, toDate } from '../utils.js'

function toRightRecord(right: PsrDataRight): RightRecord {
  return {
    dataId: right.DataId,
    legitimateId: right.LegitimateId,
    rights:
      typeof right.Rights === 'number'
        ? right.Rights
        : right.Rights == null
          ? null
          : Number(right.Rights),
    ownerRight: Boolean(right.OwnerRight),
    securedData: Boolean(right.SecuredData),
    sealId: (right.SealId as PsrGuid | undefined) ?? null,
    validFromUtc: (right.ValidFromUtc as Date | string | null | undefined) ?? null,
    validToUtc: (right.ValidToUtc as Date | string | null | undefined) ?? null,
    raw: right,
  }
}

const batchItemTypeMap = {
  add: PsrApiEnums.PsrBatchRightItemType.AddLegitimateDataRight,
  update: PsrApiEnums.PsrBatchRightItemType.UpdateLegitimateDataRight,
  remove: PsrApiEnums.PsrBatchRightItemType.RemoveLegitimateDataRight,
  updateKey: PsrApiEnums.PsrBatchRightItemType.UpdateLegitimateDataRightKey,
  updateSeal: PsrApiEnums.PsrBatchRightItemType.UpdateLegitimateSealId,
  updateSecuredData: PsrApiEnums.PsrBatchRightItemType.UpdateLegitimateDataRightSecuredData,
  updateOwnerRight: PsrApiEnums.PsrBatchRightItemType.UpdateLegitimateDataRightOwnerRight,
  updateValidDate: PsrApiEnums.PsrBatchRightItemType.UpdateLegitimateDataRightValidDate,
  removeCurrentOrganisationUnit:
    PsrApiEnums.PsrBatchRightItemType.RemoveCurrentOrganisationUnitFromRights,
} as const

function toIsoDate(value: Date | string | null | undefined) {
  const date = toDate(value)
  return date ? date.toISOString() : null
}

function toBatchItem(input: RightBatchItemInput): PsrBatchRightItem {
  return {
    DataId: input.dataId,
    LegitimateId: input.legitimateId,
    ItemType: batchItemTypeMap[input.itemType],
    Rights: input.rights ?? undefined,
    RightKey: (input.rightKey as string | undefined) ?? undefined,
    SealId: input.sealId ?? undefined,
    SecuredData: input.securedData ?? undefined,
    OwnerRight: input.ownerRight ?? undefined,
    ValidFrom: toDate(input.validFrom) ?? undefined,
    ValidTo: toDate(input.validTo) ?? undefined,
  }
}

export class RightsResource {
  constructor(private readonly raw: PsrApi) {}

  async list(dataId: PsrGuid) {
    return asArray(await this.raw.rightManager.getLegitimateDataRights(dataId, true, true)).map(
      toRightRecord,
    )
  }

  async listMany(
    dataIds: PsrGuid[],
    options: { checkRights?: boolean | null; showDeletedNames?: boolean | null } = {},
  ) {
    return asArray(
      await this.raw.rightManager.getMultiLegitimateDataRights(
        dataIds,
        options.checkRights ?? true,
        options.showDeletedNames ?? true,
      ),
    ).map(toRightRecord)
  }

  async listWithTemporalRights(dataId: PsrGuid, validFrom: Date | string, validTo: Date | string) {
    return asArray(
      await this.raw.rightManager.getLegitimateDataRightsWithTemporalRights(
        dataId,
        toIsoDate(validFrom) ?? new Date(validFrom).toISOString(),
        toIsoDate(validTo) ?? new Date(validTo).toISOString(),
      ),
    ).map(toRightRecord)
  }

  async listWithoutDeleted(dataId: PsrGuid) {
    return asArray(await this.raw.rightManager.getLegitimateDataRightsWithoutDeleted(dataId)).map(
      toRightRecord,
    )
  }

  async get(dataId: PsrGuid, legitimateId: PsrGuid, rights: number) {
    return toRightRecord(
      await this.raw.rightManager.getLegitimateDataRight(dataId, legitimateId, rights as never),
    )
  }

  async grant(input: GrantRightInput) {
    await this.raw.rightManager.addLegitimateDataRight(
      input.dataId,
      input.legitimateId,
      input.rights,
    )
  }

  async remove(dataId: PsrGuid, legitimateId: PsrGuid, rights: number) {
    await this.raw.rightManager.removeLegitimateDataRight(dataId, legitimateId, rights as never)
  }

  async removeAll(dataId: PsrGuid, allRights = false) {
    return this.raw.rightManager.removeAllLegitimateDataRights(dataId, allRights)
  }

  async update(input: UpdateRightInput) {
    if (input.rights != null) {
      await this.raw.rightManager.updateLegitimateDataRight(
        input.dataId,
        input.legitimateId,
        input.rights,
      )
    }
    if (input.rightKey != null) {
      await this.raw.rightManager.updateLegitimateDataRightKey(
        input.dataId,
        input.legitimateId,
        input.rightKey as never,
      )
    }
    if (input.sealId !== undefined) {
      await this.raw.rightManager.updateLegitimateSealId(
        input.dataId,
        input.legitimateId,
        input.sealId ?? null,
      )
    }
    if (input.securedData != null) {
      await this.raw.rightManager.updateLegitimateDataRightSecuredData(
        input.dataId,
        input.legitimateId,
        input.securedData,
      )
    }
    if (input.ownerRight != null) {
      await this.raw.rightManager.updateLegitimateDataRightOwnerRight(
        input.dataId,
        input.legitimateId,
        input.ownerRight,
      )
    }
    if (input.validFrom !== undefined || input.validTo !== undefined) {
      await this.raw.rightManager.updateLegitimateDataRightValidDate(
        input.dataId,
        input.legitimateId,
        toIsoDate(input.validFrom),
        toIsoDate(input.validTo),
      )
    }
  }

  async batch(items: RightBatchItemInput[]) {
    await this.raw.rightManager.batchUpdateRights(items.map(toBatchItem))
  }

  async removeCurrentOrganisationUnit(dataId: PsrGuid) {
    await this.raw.rightManager.removeCurrentOrganisationUnitFromRights(dataId)
  }

  async getCurrentConnection(dataId: PsrGuid) {
    return this.raw.rightManager.getCurrentConnectionDataRights(dataId)
  }

  async getCurrentConnectionList(dataIds: PsrGuid[]) {
    return this.raw.rightManager.getCurrentConnectionDataRightList(dataIds)
  }

  async getRoleCheckRight(dataId: PsrGuid, legitimateId: PsrGuid, rights: number) {
    return toRightRecord(
      await this.raw.rightManager.getLegitimateDataRightCheckRoles(
        dataId,
        legitimateId,
        rights as never,
      ),
    )
  }

  async getDatabaseAdministratorRights(dataId: PsrGuid) {
    return asArray(await this.raw.rightManager.getDatabaseAdministratorDataRights(dataId)).map(
      toRightRecord,
    )
  }

  async request(dataId: PsrGuid, type: number) {
    await this.raw.rightManager.requestDataRight(dataId, type as never)
  }

  async removeAllExcept(
    dataId: PsrGuid,
    excludedLegitimateIds: PsrGuid[],
    excludeCurrentUserOrRoleRight = false,
  ) {
    return this.raw.rightManager.removeAllLegitimateDataRightsExcept(
      dataId,
      excludedLegitimateIds,
      excludeCurrentUserOrRoleRight,
    )
  }
}
