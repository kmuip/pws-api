import type {
  GenericRightManager,
  OrganisationUnitManager,
  PsrBatchRightItem,
  PsrData,
  PsrDataRight,
  PsrGuid,
  PsrOrganisationUnitStructure,
  RightManager,
  SealManager,
} from '@kmuip/pws-types'
import {
  asArray,
  getDataType,
  isGroupStructureNode,
  isRoleOrUser,
  normalizeDateBoundary,
  normalizeRightFlags,
} from './data-helpers.js'
import { runtimeEnums } from './enums.js'
import { RuntimeUserKeyManager } from './user-key.js'

type RuntimeApiLike = {
  currentUser: { Id: PsrGuid } | null
}

type RightPropertyUpdates = number

type GenericRightChange = {
  LegitimateData?: Record<string, any> | null
  Legitimate?: Record<string, any> | null
  LegitimateId: PsrGuid
  LegitimateRights: number
  IncludeDataRightKey?: boolean
  Seal?: Record<string, any> | null
  OwnerRight?: boolean
  SecuredData?: boolean
  LegitimateRightsAdd: boolean
  RightPropertyUpdates: RightPropertyUpdates
  ValidFromUtc?: Date | string | null
  ValidToUtc?: Date | string | null
}

type RightChangeSet = {
  rightChanges: GenericRightChange[]
  validChanges: Array<{
    LegitimateData?: Record<string, any> | null
    LegitimateId?: PsrGuid
    ValidFrom?: Date | string | null
    ValidTo?: Date | string | null
  }>
}

const RIGHT_PROPERTY_UPDATES = {
  NoChanges: 0,
  OwnerRightChanged: 1,
  LegitimateRightsChanged: 2,
  SecuredDataChanged: 4,
  SealIdChanged: 8,
  UpdateAll: 15,
} as const

export class RuntimeGenericRightManager implements GenericRightManager {
  constructor(
    private readonly api: RuntimeApiLike,
    private readonly rightManager: RightManager,
    private readonly organisationUnitManager: OrganisationUnitManager,
    private readonly sealManager: SealManager,
    private readonly userKeyManager: RuntimeUserKeyManager,
  ) {}

  async saveRights(
    datas: PsrData[],
    rights: PsrDataRight[],
    inherit: boolean,
    overwrite: boolean,
    ignoreDatabaseAdmins = false,
  ) {
    if (!datas?.length) {
      return
    }

    if (overwrite) {
      const rightChanges = asArray(rights)
        .filter((right) => Number(right.Rights ?? 0) > 0)
        .map((right) => ({
          LegitimateData: right.Legitimate as Record<string, any> | null,
          LegitimateId: right.LegitimateId,
          LegitimateRights: normalizeRightFlags(right.Rights),
          IncludeDataRightKey: !!right.IncludeDataRightKey,
          OwnerRight: !!right.OwnerRight,
          SecuredData: !!right.SecuredData,
          Seal: right.Seal as Record<string, any> | null,
          LegitimateRightsAdd: true,
          RightPropertyUpdates: RIGHT_PROPERTY_UPDATES.UpdateAll,
          ValidFromUtc: right.ValidFromUtc,
          ValidToUtc: right.ValidToUtc,
        }))
      const validChanges = asArray(rights)
        .filter((right) => Number(right.Rights ?? 0) > 0)
        .map((right) => {
          this.normalizeValidDates(right as Record<string, any>)
          return {
            LegitimateData: right.Legitimate as Record<string, any> | null,
            ValidFrom: right.ValidFromUtc,
            ValidTo: right.ValidToUtc,
          }
        })

      await this.applyRightsToDatas(
        datas as Array<PsrData & Record<string, any>>,
        { rightChanges, validChanges },
        inherit,
        true,
        ignoreDatabaseAdmins,
      )
      return
    }

    for (const data of datas as Array<PsrData & Record<string, any>>) {
      const changes = await this.calculateChanges(data.Id, rights)
      await this.applyRightsToDatas([data], changes, inherit, false, ignoreDatabaseAdmins)
    }
  }

  private async applyRightsToDatas(
    datas: Array<PsrData & Record<string, any>>,
    changeSet: RightChangeSet,
    inherit: boolean,
    overwrite: boolean,
    ignoreDatabaseAdmins: boolean,
  ) {
    const groupStructure =
      !inherit &&
      datas.some(
        (data) => getDataType(data) === runtimeEnums.PsrEntityObjectType.EntityObjectTypeGroup,
      )
        ? asArray(await this.organisationUnitManager.getOrganisationUnitStructure({} as never))
        : null

    const updates: Promise<unknown>[] = []
    for (const data of datas) {
      const dataType = getDataType(data)
      if (
        dataType === runtimeEnums.PsrEntityObjectType.EntityObjectTypePassword ||
        dataType === runtimeEnums.PsrEntityObjectType.EntityObjectTypeFormular ||
        dataType === runtimeEnums.PsrEntityObjectType.EntityObjectTypeDocument
      ) {
        updates.push(
          this.applyRightsToDataWithItems(
            data,
            changeSet,
            overwrite,
            inherit,
            ignoreDatabaseAdmins,
          ),
        )
        continue
      }

      if (dataType === runtimeEnums.PsrEntityObjectType.EntityObjectTypeGroup) {
        updates.push(
          this.applyGroupRights(
            data,
            changeSet,
            groupStructure,
            overwrite,
            inherit,
            (data as Record<string, any>).ActiveDirectoryProfileId,
          ),
        )
        continue
      }

      updates.push(this.applyRightsToSingleData(data, changeSet, inherit, ignoreDatabaseAdmins))
    }

    await Promise.all(updates)
  }

  private async calculateChanges(dataId: PsrGuid, sourceRights: PsrDataRight[]) {
    const existingRights = asArray(
      await this.rightManager.getLegitimateDataRightsWithTemporalRights(
        dataId,
        new Date('0001-01-01T00:00:00Z').toISOString(),
        new Date('9999-12-31T23:59:59Z').toISOString(),
      ),
    )

    const rightChanges: GenericRightChange[] = []
    const validChanges: RightChangeSet['validChanges'] = []
    const indexedExistingRights = existingRights.map((right) => ({
      DataRight: right,
      IncludeDataRightKey: !!right.RightKey,
    }))

    for (const sourceRight of asArray(sourceRights)) {
      const normalizedRights = normalizeRightFlags(sourceRight.Rights)
      const existing = indexedExistingRights.find(
        (candidate) => candidate.DataRight.LegitimateId === sourceRight.LegitimateId,
      )
      if (existing) {
        const addedRights = normalizedRights & ~normalizeRightFlags(existing.DataRight.Rights)
        const removedRights = normalizeRightFlags(existing.DataRight.Rights) & ~normalizedRights

        if (addedRights > 0 || removedRights > 0) {
          rightChanges.push({
            LegitimateData: sourceRight.Legitimate as Record<string, any> | null,
            LegitimateId: sourceRight.LegitimateId,
            LegitimateRights: addedRights > 0 ? addedRights : removedRights,
            IncludeDataRightKey: !!sourceRight.IncludeDataRightKey,
            Seal: sourceRight.Seal as Record<string, any> | null,
            OwnerRight: !!sourceRight.OwnerRight,
            SecuredData: !!sourceRight.SecuredData,
            LegitimateRightsAdd: addedRights > 0,
            RightPropertyUpdates: RIGHT_PROPERTY_UPDATES.LegitimateRightsChanged,
          })
        }

        if (
          !!sourceRight.IncludeDataRightKey !== existing.IncludeDataRightKey ||
          !!sourceRight.OwnerRight !== !!existing.DataRight.OwnerRight ||
          !!sourceRight.SecuredData !== !!existing.DataRight.SecuredData ||
          String(sourceRight.SealId ?? '') !== String(existing.DataRight.SealId ?? '')
        ) {
          const change: GenericRightChange = {
            LegitimateData: sourceRight.Legitimate as Record<string, any> | null,
            LegitimateId: sourceRight.LegitimateId,
            LegitimateRights: normalizedRights,
            IncludeDataRightKey: !!sourceRight.IncludeDataRightKey,
            Seal: sourceRight.Seal as Record<string, any> | null,
            OwnerRight: !!sourceRight.OwnerRight,
            SecuredData: !!sourceRight.SecuredData,
            LegitimateRightsAdd: true,
            RightPropertyUpdates: RIGHT_PROPERTY_UPDATES.NoChanges,
          }

          let propertyUpdates: RightPropertyUpdates = RIGHT_PROPERTY_UPDATES.NoChanges
          if (!!existing.DataRight.OwnerRight !== !!change.OwnerRight) {
            propertyUpdates |= RIGHT_PROPERTY_UPDATES.OwnerRightChanged
          }
          if (normalizeRightFlags(existing.DataRight.Rights) !== change.LegitimateRights) {
            propertyUpdates |= RIGHT_PROPERTY_UPDATES.LegitimateRightsChanged
          }
          if (!!existing.DataRight.SecuredData !== !!change.SecuredData) {
            propertyUpdates |= RIGHT_PROPERTY_UPDATES.SecuredDataChanged
          }
          if (
            (!change.Seal && existing.DataRight.SealId) ||
            (change.Seal && String(existing.DataRight.SealId) !== String(change.Seal.Id))
          ) {
            propertyUpdates |= RIGHT_PROPERTY_UPDATES.SealIdChanged
          }

          change.RightPropertyUpdates = propertyUpdates
          rightChanges.push(change)
        }

        if (
          String(sourceRight.ValidFromUtc ?? '') !==
            String(existing.DataRight.ValidFromUtc ?? '') ||
          String(sourceRight.ValidToUtc ?? '') !== String(existing.DataRight.ValidToUtc ?? '')
        ) {
          this.normalizeValidDates(sourceRight as Record<string, any>)
          validChanges.push({
            LegitimateData: sourceRight.Legitimate as Record<string, any> | null,
            ValidFrom: sourceRight.ValidFromUtc,
            ValidTo: sourceRight.ValidToUtc,
          })
        }

        continue
      }

      if (normalizedRights <= 0) {
        continue
      }

      const change: GenericRightChange = {
        LegitimateData: sourceRight.Legitimate as Record<string, any> | null,
        LegitimateId: sourceRight.LegitimateId,
        LegitimateRights: normalizedRights,
        IncludeDataRightKey: !!sourceRight.IncludeDataRightKey,
        Seal: sourceRight.Seal as Record<string, any> | null,
        OwnerRight: !!sourceRight.OwnerRight,
        SecuredData: !!sourceRight.SecuredData,
        LegitimateRightsAdd: true,
        RightPropertyUpdates: RIGHT_PROPERTY_UPDATES.UpdateAll,
        ValidFromUtc: sourceRight.ValidFromUtc,
        ValidToUtc: sourceRight.ValidToUtc,
      }

      rightChanges.push(change)
      this.normalizeValidDates(change as Record<string, any>)
      validChanges.push({
        LegitimateData: sourceRight.Legitimate as Record<string, any> | null,
        LegitimateId:
          (sourceRight.Legitimate as { Id?: PsrGuid } | undefined)?.Id ?? sourceRight.LegitimateId,
        ValidFrom: change.ValidFromUtc,
        ValidTo: change.ValidToUtc,
      })
    }

    for (const existing of indexedExistingRights) {
      const legitimateId = existing.DataRight.LegitimateId
      if (
        sourceRights.find((right) => right.LegitimateId === legitimateId) ||
        normalizeRightFlags(existing.DataRight.Rights) <= 0
      ) {
        continue
      }

      rightChanges.push({
        LegitimateData: existing.DataRight.Legitimate as Record<string, any> | null,
        LegitimateId: legitimateId,
        LegitimateRights: normalizeRightFlags(existing.DataRight.Rights),
        LegitimateRightsAdd: false,
        RightPropertyUpdates: RIGHT_PROPERTY_UPDATES.LegitimateRightsChanged,
      })
    }

    return { rightChanges, validChanges }
  }

  private async applyRightsToDataWithItems(
    data: PsrData & Record<string, any>,
    changeSet: RightChangeSet,
    overwrite: boolean,
    inherit: boolean,
    ignoreDatabaseAdmins: boolean,
  ) {
    const updates: Promise<unknown>[] = []
    updates.push(this.applyRightsToSingleData(data, changeSet, true, ignoreDatabaseAdmins))

    if (!overwrite || !Array.isArray(data.Items)) {
      await Promise.all(updates)
      return
    }

    for (const item of data.Items) {
      updates.push(this.applyRightsToSingleData(item, changeSet, false, ignoreDatabaseAdmins))
    }

    await Promise.all(updates)
  }

  private async applyGroupRights(
    group: PsrData & Record<string, any>,
    changeSet: RightChangeSet,
    groupStructure: PsrOrganisationUnitStructure[] | null,
    overwrite: boolean,
    inherit: boolean,
    activeDirectoryProfileId: PsrGuid | null | undefined,
  ) {
    if (group.ActiveDirectoryProfileId === activeDirectoryProfileId) {
      await this.applyRightsToSingleData(group, changeSet, inherit, false)
    }

    if (!overwrite || !groupStructure?.length) {
      return
    }

    const currentNode = groupStructure.find(
      (node) => isGroupStructureNode(node) && node.OrganisationUnit.Id === group.Id,
    )
    if (!currentNode?.ChildrenOrganisationUnits) {
      return
    }

    await Promise.all(
      currentNode.ChildrenOrganisationUnits.filter(
        (child) => getDataType(child) !== runtimeEnums.PsrEntityObjectType.EntityObjectTypeGroup,
      ).map((child) =>
        this.applyGroupRights(
          child as never,
          changeSet,
          groupStructure,
          true,
          inherit,
          activeDirectoryProfileId,
        ),
      ),
    )
  }

  private async buildOverwriteBatch(
    data: PsrData & Record<string, any>,
    rightChanges: GenericRightChange[],
    validChanges: RightChangeSet['validChanges'],
    dataRightKey: string,
    ignoreDatabaseAdmins: boolean,
  ) {
    let ignoredLegitimateIds: PsrGuid[] = []
    let hasObjektRight = false

    if (ignoreDatabaseAdmins) {
      const adminRights = asArray(
        await this.rightManager.getDatabaseAdministratorDataRights(data.Id),
      )
      ignoredLegitimateIds = adminRights.map((right) => right.LegitimateId)
      hasObjektRight = adminRights.some(
        (right) =>
          (normalizeRightFlags(right.Rights) & runtimeEnums.PsrRights.RightRight) ===
          runtimeEnums.PsrRights.RightRight,
      )
    }

    if (!hasObjektRight) {
      const objectRightCandidates = rightChanges.filter(
        (change) =>
          (change.LegitimateRights & runtimeEnums.PsrRights.RightRight) ===
          runtimeEnums.PsrRights.RightRight,
      )
      const temporalObjectRights = validChanges.filter(
        (change) => !!change.ValidFrom && !!change.ValidTo,
      )
      const hasPermanentObjektRight = objectRightCandidates.some(
        (change) =>
          !temporalObjectRights
            .filter((candidate) => !!candidate.LegitimateData)
            .map((candidate) => candidate.LegitimateData!.Id)
            .includes(change.LegitimateId),
      )

      if (!hasPermanentObjektRight) {
        throw new Error(String(runtimeEnums.PsrApiExceptionCode.RightLastObjektRight))
      }
    }

    const removedLegitimateId = await this.rightManager.removeAllLegitimateDataRightsExcept(
      data.Id,
      ignoredLegitimateIds,
      true,
    )
    const batchItems: PsrBatchRightItem[] = []
    const removedRight = rightChanges.find((change) => change.LegitimateId === removedLegitimateId)
    if (removedRight) {
      rightChanges.splice(rightChanges.indexOf(removedRight), 1)
      rightChanges.push(removedRight)
    }

    for (const change of rightChanges) {
      if (ignoredLegitimateIds.includes(change.LegitimateId)) {
        continue
      }

      batchItems.push({
        ItemType: runtimeEnums.PsrBatchRightItemType.AddLegitimateDataRight,
        DataId: data.Id,
        LegitimateId: change.LegitimateId,
        Rights: change.LegitimateRights,
      })

      const rightKeyUpdate = await this.buildRightKeyUpdate(change, data, dataRightKey)
      if (rightKeyUpdate) {
        batchItems.push(rightKeyUpdate)
      }

      batchItems.push({
        ItemType: runtimeEnums.PsrBatchRightItemType.UpdateLegitimateSealId,
        DataId: data.Id,
        LegitimateId: change.LegitimateId,
        SealId: change.Seal ? change.Seal.Id : null,
      })
      batchItems.push({
        ItemType: runtimeEnums.PsrBatchRightItemType.UpdateLegitimateDataRightSecuredData,
        DataId: data.Id,
        LegitimateId: change.LegitimateId,
        SecuredData: !!change.SecuredData,
      })
      batchItems.push({
        ItemType: runtimeEnums.PsrBatchRightItemType.UpdateLegitimateDataRightOwnerRight,
        DataId: data.Id,
        LegitimateId: change.LegitimateId,
        OwnerRight: !!change.OwnerRight,
      })
    }

    if (!removedRight && removedLegitimateId) {
      batchItems.push({
        ItemType: runtimeEnums.PsrBatchRightItemType.RemoveLegitimateDataRight,
        DataId: data.Id,
        LegitimateId: removedLegitimateId,
        Rights: runtimeEnums.PsrRights.RightRead,
      })
    }

    return { batchItems, ignoredLegitimateIds }
  }

  private async findEditableRight(dataId: PsrGuid, requiredRight: number) {
    const currentUserId = this.api.currentUser?.Id
    if (!currentUserId) {
      return null
    }

    const currentUserRight = await this.rightManager.getLegitimateDataRight(
      dataId,
      currentUserId,
      requiredRight,
    )
    if (currentUserRight) {
      return currentUserRight
    }

    const matchingRights = await Promise.all(
      (this.userKeyManager.keys ?? []).map((key) =>
        this.rightManager
          .getLegitimateDataRight(dataId, key.id, runtimeEnums.PsrRights.RightRight)
          .then((right) => right || null),
      ),
    )

    return matchingRights.find((candidate) => !!candidate) ?? null
  }

  private async buildPartialUpdateBatch(
    data: PsrData & Record<string, any>,
    rightChanges: GenericRightChange[],
    dataRightKey: string,
    inherit: boolean,
  ) {
    const currentUserId = this.api.currentUser?.Id
    const userKeyIds = new Set((this.userKeyManager.keys ?? []).map((key) => key.id))
    let ownerRightRemovalCandidate: GenericRightChange | null = null
    const batchItems: PsrBatchRightItem[] = []

    for (const change of rightChanges) {
      let currentRight: PsrDataRight | null = null
      if (!inherit) {
        currentRight = await this.rightManager.getLegitimateDataRight(
          data.Id,
          change.LegitimateId,
          runtimeEnums.PsrRights.RightRead,
        )
        if (currentRight?.SealId) {
          change.Seal = (await this.sealManager.getSeal(currentRight.SealId)) as unknown as Record<
            string,
            any
          >
        }
      }

      const isCurrentUserOrKeyOwner =
        change.LegitimateId === currentUserId || userKeyIds.has(change.LegitimateId)
      const removesObjektRight =
        !change.LegitimateRightsAdd &&
        (change.LegitimateRights & runtimeEnums.PsrRights.RightRight) ===
          runtimeEnums.PsrRights.RightRight
      if (!ownerRightRemovalCandidate && isCurrentUserOrKeyOwner && removesObjektRight) {
        ownerRightRemovalCandidate = change
        continue
      }

      if (
        (change.RightPropertyUpdates & RIGHT_PROPERTY_UPDATES.LegitimateRightsChanged) ===
        RIGHT_PROPERTY_UPDATES.LegitimateRightsChanged
      ) {
        batchItems.push({
          ItemType: change.LegitimateRightsAdd
            ? runtimeEnums.PsrBatchRightItemType.AddLegitimateDataRight
            : runtimeEnums.PsrBatchRightItemType.RemoveLegitimateDataRight,
          DataId: data.Id,
          LegitimateId: change.LegitimateId,
          Rights: change.LegitimateRights,
        })
      }

      const rightKeyUpdate = await this.buildRightKeyUpdate(change, data, dataRightKey)
      if (rightKeyUpdate) {
        batchItems.push(rightKeyUpdate)
      }

      if (
        (change.RightPropertyUpdates & RIGHT_PROPERTY_UPDATES.SealIdChanged) ===
        RIGHT_PROPERTY_UPDATES.SealIdChanged
      ) {
        batchItems.push({
          ItemType: runtimeEnums.PsrBatchRightItemType.UpdateLegitimateSealId,
          DataId: data.Id,
          LegitimateId: change.LegitimateId,
          SealId: change.Seal ? change.Seal.Id : null,
        })
      }

      if (
        (change.RightPropertyUpdates & RIGHT_PROPERTY_UPDATES.SecuredDataChanged) ===
        RIGHT_PROPERTY_UPDATES.SecuredDataChanged
      ) {
        batchItems.push({
          ItemType: runtimeEnums.PsrBatchRightItemType.UpdateLegitimateDataRightSecuredData,
          DataId: data.Id,
          LegitimateId: change.LegitimateId,
          SecuredData: !!change.SecuredData,
        })
      }

      if (
        (change.RightPropertyUpdates & RIGHT_PROPERTY_UPDATES.OwnerRightChanged) ===
        RIGHT_PROPERTY_UPDATES.OwnerRightChanged
      ) {
        batchItems.push({
          ItemType: runtimeEnums.PsrBatchRightItemType.UpdateLegitimateDataRightOwnerRight,
          DataId: data.Id,
          LegitimateId: change.LegitimateId,
          OwnerRight: !!change.OwnerRight,
        })
      }
    }

    if (ownerRightRemovalCandidate) {
      batchItems.push({
        ItemType: runtimeEnums.PsrBatchRightItemType.RemoveLegitimateDataRight,
        DataId: data.Id,
        LegitimateId: ownerRightRemovalCandidate.LegitimateId,
        Rights: ownerRightRemovalCandidate.LegitimateRights,
      })
      batchItems.push({
        ItemType: runtimeEnums.PsrBatchRightItemType.UpdateLegitimateDataRightOwnerRight,
        DataId: data.Id,
        LegitimateId: ownerRightRemovalCandidate.LegitimateId,
        OwnerRight: !!ownerRightRemovalCandidate.OwnerRight,
      })
    }

    return batchItems
  }

  private async buildRightKeyUpdate(
    change: GenericRightChange,
    data: PsrData & Record<string, any>,
    dataRightKey: string | null,
  ) {
    const legitimateData = (change.Seal || change.LegitimateData) as
      | Record<string, any>
      | null
      | undefined
    const publicKey = legitimateData?.PublicKey
    if (!publicKey) {
      return undefined
    }

    if (
      getDataType(data) === runtimeEnums.PsrEntityObjectType.EntityObjectTypeUser &&
      data.Id === change.LegitimateId
    ) {
      return null
    }

    const rightKey =
      dataRightKey && change.IncludeDataRightKey
        ? await this.userKeyManager.encryptDataRightKey(String(publicKey), dataRightKey)
        : !isRoleOrUser(data)
          ? dataRightKey
            ? await this.userKeyManager.encryptDataRightKey(String(publicKey), dataRightKey)
            : null
          : undefined

    if (rightKey === undefined) {
      return undefined
    }

    return {
      ItemType: runtimeEnums.PsrBatchRightItemType.UpdateLegitimateDataRightKey,
      DataId: data.Id,
      LegitimateId: change.LegitimateId,
      ...(rightKey
        ? {
            RightKey: Buffer.from(typeof rightKey === 'string' ? rightKey : rightKey).toString(
              'base64',
            ),
          }
        : {}),
    } satisfies PsrBatchRightItem
  }

  private createValidDateUpdates(
    data: PsrData & Record<string, any>,
    rightChanges: GenericRightChange[],
    validChanges: RightChangeSet['validChanges'],
    ignoredLegitimateIds: PsrGuid[] = [],
  ) {
    if (!validChanges) {
      return []
    }

    const updates: PsrBatchRightItem[] = []
    for (const change of validChanges) {
      const legitimateId = change.LegitimateData?.Id ?? change.LegitimateId
      if (!legitimateId || ignoredLegitimateIds.includes(legitimateId)) {
        continue
      }

      const rightChange = rightChanges.find((candidate) => candidate.LegitimateId === legitimateId)
      if (rightChange?.OwnerRight) {
        continue
      }

      updates.push({
        ItemType: runtimeEnums.PsrBatchRightItemType.UpdateLegitimateDataRightValidDate,
        DataId: data.Id,
        LegitimateId: legitimateId,
        ...(change.ValidFrom ? { ValidFrom: new Date(change.ValidFrom) } : {}),
        ...(change.ValidTo ? { ValidTo: new Date(change.ValidTo) } : {}),
      })
    }

    return updates
  }

  private async applyRightsToSingleData(
    data: PsrData & Record<string, any>,
    changeSet: RightChangeSet,
    inherit: boolean,
    ignoreDatabaseAdmins: boolean,
  ) {
    const currentUserId = this.api.currentUser?.Id
    if (!currentUserId) {
      return
    }

    let editableRight = await this.findEditableRight(data.Id, runtimeEnums.PsrRights.RightRight)
    if (!editableRight) {
      if (inherit) {
        throw new Error(String(runtimeEnums.PsrApiExceptionCode.RightInsufficientRight))
      }

      const isAllowedOwnerRightOnlyChange = changeSet.rightChanges.every(
        (change) =>
          change.LegitimateId === currentUserId &&
          change.RightPropertyUpdates === RIGHT_PROPERTY_UPDATES.OwnerRightChanged &&
          !change.OwnerRight,
      )
      if (!isAllowedOwnerRightOnlyChange) {
        throw new Error(String(runtimeEnums.PsrApiExceptionCode.RightInsufficientRight))
      }
    }

    let dataRightKey = editableRight
      ? await this.userKeyManager.decryptDataRight(editableRight)
      : null
    if (!dataRightKey && editableRight?.SealId) {
      dataRightKey = await this.userKeyManager.decryptDataRightWithSeal(data, editableRight)
      if (!dataRightKey) {
        throw new Error(
          String(runtimeEnums.PsrApiExceptionCode.SealCurrendOrganisationUnitCantEdit),
        )
      }
    }

    if (!dataRightKey && data.Id === currentUserId) {
      const selfKey = (this.userKeyManager.keys ?? []).find((key) => key.id === currentUserId)
      dataRightKey = selfKey?.privateKey ?? null
    }

    if (inherit) {
      const overwriteBatch = await this.buildOverwriteBatch(
        data,
        [...changeSet.rightChanges],
        [...changeSet.validChanges],
        String(dataRightKey ?? ''),
        ignoreDatabaseAdmins,
      )
      const batchItems = overwriteBatch.batchItems
      batchItems.push(
        ...this.createValidDateUpdates(
          data,
          changeSet.rightChanges,
          changeSet.validChanges,
          overwriteBatch.ignoredLegitimateIds,
        ),
      )
      await this.rightManager.batchUpdateRights(batchItems)
      return
    }

    const batchItems = await this.buildPartialUpdateBatch(
      data,
      changeSet.rightChanges,
      String(dataRightKey ?? ''),
      inherit,
    )
    batchItems.push(
      ...this.createValidDateUpdates(data, changeSet.rightChanges, changeSet.validChanges),
    )
    await this.rightManager.batchUpdateRights(batchItems)
  }

  private normalizeValidDates(target: Record<string, any>) {
    target.ValidFromUtc = normalizeDateBoundary(target.ValidFromUtc, false)
    target.ValidToUtc = normalizeDateBoundary(target.ValidToUtc, true)
  }
}
