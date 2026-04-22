import type {
  OptionManager,
  PsrBatchRightItem,
  PsrData,
  PsrDataRightTemplate,
  PsrEntityObjectType,
  PsrGuid,
  RightManager,
  TemplateManager,
} from '@kmuip/pws-types'
import { asArray, getDataType, GUID_EMPTY, isEncryptedContainerItem } from './data-helpers.js'
import { runtimeEnums } from './enums.js'

type RuntimeApiLike = {
  currentUser: { Id: PsrGuid } | null
}

type AdditionalBatchItemsFactory =
  | ((dataId: PsrGuid) => Promise<PsrBatchRightItem[]>)
  | null
  | undefined

type DataRightTemplateLike = PsrDataRightTemplate & {
  Rights?: number | string[] | string
  LegitimateId?: PsrGuid
  OwnerRight?: boolean
  Legitimate?: Record<string, unknown>
}

export class RuntimeInheritanceManager {
  constructor(
    private readonly api: RuntimeApiLike,
    private readonly rightManager: RightManager,
    private readonly templateManager: TemplateManager,
    private readonly optionManager: OptionManager,
  ) {}

  async run(
    data: PsrData & Record<string, any>,
    rights: Iterable<DataRightTemplateLike> | null | undefined,
    additionalBatchItemsFactory?: AdditionalBatchItemsFactory,
    targetId?: PsrGuid | null,
    templateGroupId?: PsrGuid | null,
    dataType?: PsrEntityObjectType | null,
    hierarchyTargetId?: PsrGuid | null,
  ) {
    const normalizedTargetId = targetId ?? this.api.currentUser?.Id ?? null
    const normalizedRights = asArray(rights)

    if (normalizedRights.length > 0) {
      return this.applyExplicitRights(
        data,
        normalizedRights,
        additionalBatchItemsFactory,
        normalizedTargetId,
      )
    }

    if (templateGroupId) {
      return this.applyHierarchyTemplates(
        data,
        additionalBatchItemsFactory,
        normalizedTargetId,
        templateGroupId,
        dataType ?? null,
        hierarchyTargetId ?? null,
      )
    }

    return this.applyExplicitRights(data, [], additionalBatchItemsFactory, normalizedTargetId)
  }

  private async applyExplicitRights(
    data: PsrData & Record<string, any>,
    rights: DataRightTemplateLike[],
    additionalBatchItemsFactory: AdditionalBatchItemsFactory,
    targetId: PsrGuid | null,
  ) {
    const updates: Promise<PsrBatchRightItem[]>[] = []
    updates.push(this.copyRights(data, rights, additionalBatchItemsFactory, targetId))

    if (Array.isArray(data.Items)) {
      for (const item of data.Items) {
        updates.push(this.copyRights(item, rights, additionalBatchItemsFactory, targetId))
      }
    }

    return this.flushBatchUpdates(updates)
  }

  private async applyHierarchyTemplates(
    data: PsrData & Record<string, any>,
    additionalBatchItemsFactory: AdditionalBatchItemsFactory,
    targetId: PsrGuid | null,
    templateGroupId: PsrGuid,
    dataType: PsrEntityObjectType | null,
    hierarchyTargetId: PsrGuid | null,
  ) {
    if (!hierarchyTargetId) {
      throw new Error('targetId is necessary when using inheritance with template group ID.')
    }

    const updates: Promise<PsrBatchRightItem[]>[] = []
    const rootRights = asArray(
      await this.templateManager.getHierarchyDataRightTemplate(
        data.Id,
        dataType,
        targetId ?? hierarchyTargetId,
        templateGroupId,
      ),
    ) as DataRightTemplateLike[]

    updates.push(this.copyRights(data, rootRights, additionalBatchItemsFactory, null))

    if (!Array.isArray(data.Items)) {
      return this.flushBatchUpdates(updates)
    }

    for (const item of data.Items) {
      const itemRights = asArray(
        await this.templateManager.getHierarchyDataRightTemplate(
          targetId ?? hierarchyTargetId,
          runtimeEnums.PsrEntityObjectType.EntityObjectTypeContainerItem,
          item.BaseContainerItemId,
          templateGroupId,
        ),
      ) as DataRightTemplateLike[]
      updates.push(this.copyRights(item, itemRights, additionalBatchItemsFactory, null))
    }

    return this.flushBatchUpdates(updates)
  }

  private async copyRights(
    data: PsrData & Record<string, any>,
    rights: DataRightTemplateLike[],
    additionalBatchItemsFactory: AdditionalBatchItemsFactory,
    targetId: PsrGuid | null,
  ) {
    const currentUserId = this.api.currentUser?.Id
    if (!currentUserId) {
      return []
    }

    if (rights.length === 0 && targetId) {
      return this.inheritRightsFromTarget(data, targetId, additionalBatchItemsFactory)
    }

    const batchItems: PsrBatchRightItem[] = []
    for (const right of rights) {
      if (!right.LegitimateId || right.LegitimateId === currentUserId) {
        continue
      }

      const dataType = getDataType(data)
      if (dataType !== runtimeEnums.PsrEntityObjectType.EntityObjectTypeGroup) {
        ;(right as Record<string, unknown>).Rights =
          Number(right.Rights ?? 0) & ~runtimeEnums.PsrRights.RightAppend
      }

      const legitimateId = right.LegitimateId === GUID_EMPTY ? currentUserId : right.LegitimateId
      batchItems.push({
        ItemType: runtimeEnums.PsrBatchRightItemType.AddLegitimateDataRight,
        DataId: data.Id,
        LegitimateId: legitimateId,
        Rights: Number(right.Rights ?? 0),
      })
    }

    await this.rightManager.batchUpdateRights(batchItems)
    const extraBatchItems = await this.getAdditionalBatchItems(data, additionalBatchItemsFactory)
    return [
      ...extraBatchItems,
      {
        ItemType: runtimeEnums.PsrBatchRightItemType.RemoveCurrentOrganisationUnitFromRights,
        DataId: data.Id,
        LegitimateId: currentUserId,
      },
    ]
  }

  private async inheritRightsFromTarget(
    data: PsrData & Record<string, any>,
    targetId: PsrGuid,
    additionalBatchItemsFactory: AdditionalBatchItemsFactory,
  ) {
    const currentUser = this.api.currentUser
    if (!currentUser) {
      return []
    }

    const inheritanceOption = await this.optionManager.getOption(
      'OrganisationUnitInheritance',
      currentUser as never,
    )
    if (inheritanceOption?.ValueSelectedItem === 'OrganisationUnitInheritanceModeNone') {
      return []
    }
    if (
      inheritanceOption?.ValueSelectedItem === 'OrganisationUnitInheritanceModeGroup' &&
      targetId === currentUser.Id
    ) {
      return []
    }

    const rights = asArray(await this.rightManager.getLegitimateDataRights(targetId, false, false))
    const batchItems: PsrBatchRightItem[] = []
    for (const right of rights) {
      if (
        right.LegitimateId === currentUser.Id ||
        (right.Legitimate && 'KeyType' in (right.Legitimate as Record<string, unknown>))
      ) {
        continue
      }

      batchItems.push({
        ItemType: runtimeEnums.PsrBatchRightItemType.AddLegitimateDataRight,
        DataId: data.Id,
        LegitimateId: right.LegitimateId,
        Rights: Number(right.Rights ?? 0) & ~runtimeEnums.PsrRights.RightAppend,
      })
    }

    await this.rightManager.batchUpdateRights(batchItems)
    return this.getAdditionalBatchItems(data, additionalBatchItemsFactory)
  }

  private async getAdditionalBatchItems(
    data: PsrData & Record<string, any>,
    factory: AdditionalBatchItemsFactory,
  ) {
    if (!factory) {
      return []
    }

    const dataType = getDataType(data)
    const isEncryptedItem =
      dataType === runtimeEnums.PsrEntityObjectType.EntityObjectTypeContainerItem &&
      isEncryptedContainerItem(data)
    const isDocument = dataType === runtimeEnums.PsrEntityObjectType.EntityObjectTypeDocument
    return isEncryptedItem || isDocument ? await factory(data.Id) : []
  }

  private async flushBatchUpdates(updates: Promise<PsrBatchRightItem[]>[]) {
    const resolved = await Promise.all(updates)
    const flat = resolved.flat()
    if (flat.length > 0) {
      await this.rightManager.batchUpdateRights(flat)
    }
  }
}
