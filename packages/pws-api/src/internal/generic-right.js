import { asArray, getDataType, isGroupStructureNode, isRoleOrUser, normalizeDateBoundary, normalizeRightFlags, } from './data-helpers.js';
import { runtimeEnums } from './enums.js';
import { RuntimeUserKeyManager } from './user-key.js';
const RIGHT_PROPERTY_UPDATES = {
    NoChanges: 0,
    OwnerRightChanged: 1,
    LegitimateRightsChanged: 2,
    SecuredDataChanged: 4,
    SealIdChanged: 8,
    UpdateAll: 15,
};
export class RuntimeGenericRightManager {
    api;
    rightManager;
    organisationUnitManager;
    sealManager;
    userKeyManager;
    constructor(api, rightManager, organisationUnitManager, sealManager, userKeyManager) {
        this.api = api;
        this.rightManager = rightManager;
        this.organisationUnitManager = organisationUnitManager;
        this.sealManager = sealManager;
        this.userKeyManager = userKeyManager;
    }
    async saveRights(datas, rights, inherit, overwrite, ignoreDatabaseAdmins = false) {
        if (!datas?.length) {
            return;
        }
        if (overwrite) {
            const rightChanges = asArray(rights)
                .filter((right) => Number(right.Rights ?? 0) > 0)
                .map((right) => ({
                LegitimateData: right.Legitimate,
                LegitimateId: right.LegitimateId,
                LegitimateRights: normalizeRightFlags(right.Rights),
                IncludeDataRightKey: !!right.IncludeDataRightKey,
                OwnerRight: !!right.OwnerRight,
                SecuredData: !!right.SecuredData,
                Seal: right.Seal,
                LegitimateRightsAdd: true,
                RightPropertyUpdates: RIGHT_PROPERTY_UPDATES.UpdateAll,
                ValidFromUtc: right.ValidFromUtc,
                ValidToUtc: right.ValidToUtc,
            }));
            const validChanges = asArray(rights)
                .filter((right) => Number(right.Rights ?? 0) > 0)
                .map((right) => {
                this.normalizeValidDates(right);
                return {
                    LegitimateData: right.Legitimate,
                    ValidFrom: right.ValidFromUtc,
                    ValidTo: right.ValidToUtc,
                };
            });
            await this.applyRightsToDatas(datas, { rightChanges, validChanges }, inherit, true, ignoreDatabaseAdmins);
            return;
        }
        for (const data of datas) {
            const changes = await this.calculateChanges(data.Id, rights);
            await this.applyRightsToDatas([data], changes, inherit, false, ignoreDatabaseAdmins);
        }
    }
    async applyRightsToDatas(datas, changeSet, inherit, overwrite, ignoreDatabaseAdmins) {
        const groupStructure = !inherit &&
            datas.some((data) => getDataType(data) === runtimeEnums.PsrEntityObjectType.EntityObjectTypeGroup)
            ? asArray(await this.organisationUnitManager.getOrganisationUnitStructure({}))
            : null;
        const updates = [];
        for (const data of datas) {
            const dataType = getDataType(data);
            if (dataType === runtimeEnums.PsrEntityObjectType.EntityObjectTypePassword ||
                dataType === runtimeEnums.PsrEntityObjectType.EntityObjectTypeFormular ||
                dataType === runtimeEnums.PsrEntityObjectType.EntityObjectTypeDocument) {
                updates.push(this.applyRightsToDataWithItems(data, changeSet, overwrite, inherit, ignoreDatabaseAdmins));
                continue;
            }
            if (dataType === runtimeEnums.PsrEntityObjectType.EntityObjectTypeGroup) {
                updates.push(this.applyGroupRights(data, changeSet, groupStructure, overwrite, inherit, data.ActiveDirectoryProfileId));
                continue;
            }
            updates.push(this.applyRightsToSingleData(data, changeSet, inherit, ignoreDatabaseAdmins));
        }
        await Promise.all(updates);
    }
    async calculateChanges(dataId, sourceRights) {
        const existingRights = asArray(await this.rightManager.getLegitimateDataRightsWithTemporalRights(dataId, new Date('0001-01-01T00:00:00Z').toISOString(), new Date('9999-12-31T23:59:59Z').toISOString()));
        const rightChanges = [];
        const validChanges = [];
        const indexedExistingRights = existingRights.map((right) => ({
            DataRight: right,
            IncludeDataRightKey: !!right.RightKey,
        }));
        for (const sourceRight of asArray(sourceRights)) {
            const normalizedRights = normalizeRightFlags(sourceRight.Rights);
            const existing = indexedExistingRights.find((candidate) => candidate.DataRight.LegitimateId === sourceRight.LegitimateId);
            if (existing) {
                const addedRights = normalizedRights & ~normalizeRightFlags(existing.DataRight.Rights);
                const removedRights = normalizeRightFlags(existing.DataRight.Rights) & ~normalizedRights;
                if (addedRights > 0 || removedRights > 0) {
                    rightChanges.push({
                        LegitimateData: sourceRight.Legitimate,
                        LegitimateId: sourceRight.LegitimateId,
                        LegitimateRights: addedRights > 0 ? addedRights : removedRights,
                        IncludeDataRightKey: !!sourceRight.IncludeDataRightKey,
                        Seal: sourceRight.Seal,
                        OwnerRight: !!sourceRight.OwnerRight,
                        SecuredData: !!sourceRight.SecuredData,
                        LegitimateRightsAdd: addedRights > 0,
                        RightPropertyUpdates: RIGHT_PROPERTY_UPDATES.LegitimateRightsChanged,
                    });
                }
                if (!!sourceRight.IncludeDataRightKey !== existing.IncludeDataRightKey ||
                    !!sourceRight.OwnerRight !== !!existing.DataRight.OwnerRight ||
                    !!sourceRight.SecuredData !== !!existing.DataRight.SecuredData ||
                    String(sourceRight.SealId ?? '') !== String(existing.DataRight.SealId ?? '')) {
                    const change = {
                        LegitimateData: sourceRight.Legitimate,
                        LegitimateId: sourceRight.LegitimateId,
                        LegitimateRights: normalizedRights,
                        IncludeDataRightKey: !!sourceRight.IncludeDataRightKey,
                        Seal: sourceRight.Seal,
                        OwnerRight: !!sourceRight.OwnerRight,
                        SecuredData: !!sourceRight.SecuredData,
                        LegitimateRightsAdd: true,
                        RightPropertyUpdates: RIGHT_PROPERTY_UPDATES.NoChanges,
                    };
                    let propertyUpdates = RIGHT_PROPERTY_UPDATES.NoChanges;
                    if (!!existing.DataRight.OwnerRight !== !!change.OwnerRight) {
                        propertyUpdates |= RIGHT_PROPERTY_UPDATES.OwnerRightChanged;
                    }
                    if (normalizeRightFlags(existing.DataRight.Rights) !== change.LegitimateRights) {
                        propertyUpdates |= RIGHT_PROPERTY_UPDATES.LegitimateRightsChanged;
                    }
                    if (!!existing.DataRight.SecuredData !== !!change.SecuredData) {
                        propertyUpdates |= RIGHT_PROPERTY_UPDATES.SecuredDataChanged;
                    }
                    if ((!change.Seal && existing.DataRight.SealId) ||
                        (change.Seal && String(existing.DataRight.SealId) !== String(change.Seal.Id))) {
                        propertyUpdates |= RIGHT_PROPERTY_UPDATES.SealIdChanged;
                    }
                    change.RightPropertyUpdates = propertyUpdates;
                    rightChanges.push(change);
                }
                if (String(sourceRight.ValidFromUtc ?? '') !==
                    String(existing.DataRight.ValidFromUtc ?? '') ||
                    String(sourceRight.ValidToUtc ?? '') !== String(existing.DataRight.ValidToUtc ?? '')) {
                    this.normalizeValidDates(sourceRight);
                    validChanges.push({
                        LegitimateData: sourceRight.Legitimate,
                        ValidFrom: sourceRight.ValidFromUtc,
                        ValidTo: sourceRight.ValidToUtc,
                    });
                }
                continue;
            }
            if (normalizedRights <= 0) {
                continue;
            }
            const change = {
                LegitimateData: sourceRight.Legitimate,
                LegitimateId: sourceRight.LegitimateId,
                LegitimateRights: normalizedRights,
                IncludeDataRightKey: !!sourceRight.IncludeDataRightKey,
                Seal: sourceRight.Seal,
                OwnerRight: !!sourceRight.OwnerRight,
                SecuredData: !!sourceRight.SecuredData,
                LegitimateRightsAdd: true,
                RightPropertyUpdates: RIGHT_PROPERTY_UPDATES.UpdateAll,
                ValidFromUtc: sourceRight.ValidFromUtc,
                ValidToUtc: sourceRight.ValidToUtc,
            };
            rightChanges.push(change);
            this.normalizeValidDates(change);
            validChanges.push({
                LegitimateData: sourceRight.Legitimate,
                LegitimateId: sourceRight.Legitimate?.Id ?? sourceRight.LegitimateId,
                ValidFrom: change.ValidFromUtc,
                ValidTo: change.ValidToUtc,
            });
        }
        for (const existing of indexedExistingRights) {
            const legitimateId = existing.DataRight.LegitimateId;
            if (sourceRights.find((right) => right.LegitimateId === legitimateId) ||
                normalizeRightFlags(existing.DataRight.Rights) <= 0) {
                continue;
            }
            rightChanges.push({
                LegitimateData: existing.DataRight.Legitimate,
                LegitimateId: legitimateId,
                LegitimateRights: normalizeRightFlags(existing.DataRight.Rights),
                LegitimateRightsAdd: false,
                RightPropertyUpdates: RIGHT_PROPERTY_UPDATES.LegitimateRightsChanged,
            });
        }
        return { rightChanges, validChanges };
    }
    async applyRightsToDataWithItems(data, changeSet, overwrite, inherit, ignoreDatabaseAdmins) {
        const updates = [];
        updates.push(this.applyRightsToSingleData(data, changeSet, true, ignoreDatabaseAdmins));
        if (!overwrite || !Array.isArray(data.Items)) {
            await Promise.all(updates);
            return;
        }
        for (const item of data.Items) {
            updates.push(this.applyRightsToSingleData(item, changeSet, false, ignoreDatabaseAdmins));
        }
        await Promise.all(updates);
    }
    async applyGroupRights(group, changeSet, groupStructure, overwrite, inherit, activeDirectoryProfileId) {
        if (group.ActiveDirectoryProfileId === activeDirectoryProfileId) {
            await this.applyRightsToSingleData(group, changeSet, inherit, false);
        }
        if (!overwrite || !groupStructure?.length) {
            return;
        }
        const currentNode = groupStructure.find((node) => isGroupStructureNode(node) && node.OrganisationUnit.Id === group.Id);
        if (!currentNode?.ChildrenOrganisationUnits) {
            return;
        }
        await Promise.all(currentNode.ChildrenOrganisationUnits.filter((child) => getDataType(child) !== runtimeEnums.PsrEntityObjectType.EntityObjectTypeGroup).map((child) => this.applyGroupRights(child, changeSet, groupStructure, true, inherit, activeDirectoryProfileId)));
    }
    async buildOverwriteBatch(data, rightChanges, validChanges, dataRightKey, ignoreDatabaseAdmins) {
        let ignoredLegitimateIds = [];
        let hasObjektRight = false;
        if (ignoreDatabaseAdmins) {
            const adminRights = asArray(await this.rightManager.getDatabaseAdministratorDataRights(data.Id));
            ignoredLegitimateIds = adminRights.map((right) => right.LegitimateId);
            hasObjektRight = adminRights.some((right) => (normalizeRightFlags(right.Rights) & runtimeEnums.PsrRights.RightRight) ===
                runtimeEnums.PsrRights.RightRight);
        }
        if (!hasObjektRight) {
            const objectRightCandidates = rightChanges.filter((change) => (change.LegitimateRights & runtimeEnums.PsrRights.RightRight) ===
                runtimeEnums.PsrRights.RightRight);
            const temporalObjectRights = validChanges.filter((change) => !!change.ValidFrom && !!change.ValidTo);
            const hasPermanentObjektRight = objectRightCandidates.some((change) => !temporalObjectRights
                .filter((candidate) => !!candidate.LegitimateData)
                .map((candidate) => candidate.LegitimateData.Id)
                .includes(change.LegitimateId));
            if (!hasPermanentObjektRight) {
                throw new Error(String(runtimeEnums.PsrApiExceptionCode.RightLastObjektRight));
            }
        }
        const removedLegitimateId = await this.rightManager.removeAllLegitimateDataRightsExcept(data.Id, ignoredLegitimateIds, true);
        const batchItems = [];
        const removedRight = rightChanges.find((change) => change.LegitimateId === removedLegitimateId);
        if (removedRight) {
            rightChanges.splice(rightChanges.indexOf(removedRight), 1);
            rightChanges.push(removedRight);
        }
        for (const change of rightChanges) {
            if (ignoredLegitimateIds.includes(change.LegitimateId)) {
                continue;
            }
            batchItems.push({
                ItemType: runtimeEnums.PsrBatchRightItemType.AddLegitimateDataRight,
                DataId: data.Id,
                LegitimateId: change.LegitimateId,
                Rights: change.LegitimateRights,
            });
            const rightKeyUpdate = await this.buildRightKeyUpdate(change, data, dataRightKey);
            if (rightKeyUpdate) {
                batchItems.push(rightKeyUpdate);
            }
            batchItems.push({
                ItemType: runtimeEnums.PsrBatchRightItemType.UpdateLegitimateSealId,
                DataId: data.Id,
                LegitimateId: change.LegitimateId,
                SealId: change.Seal ? change.Seal.Id : null,
            });
            batchItems.push({
                ItemType: runtimeEnums.PsrBatchRightItemType.UpdateLegitimateDataRightSecuredData,
                DataId: data.Id,
                LegitimateId: change.LegitimateId,
                SecuredData: !!change.SecuredData,
            });
            batchItems.push({
                ItemType: runtimeEnums.PsrBatchRightItemType.UpdateLegitimateDataRightOwnerRight,
                DataId: data.Id,
                LegitimateId: change.LegitimateId,
                OwnerRight: !!change.OwnerRight,
            });
        }
        if (!removedRight && removedLegitimateId) {
            batchItems.push({
                ItemType: runtimeEnums.PsrBatchRightItemType.RemoveLegitimateDataRight,
                DataId: data.Id,
                LegitimateId: removedLegitimateId,
                Rights: runtimeEnums.PsrRights.RightRead,
            });
        }
        return { batchItems, ignoredLegitimateIds };
    }
    async findEditableRight(dataId, requiredRight) {
        const currentUserId = this.api.currentUser?.Id;
        if (!currentUserId) {
            return null;
        }
        const currentUserRight = await this.rightManager.getLegitimateDataRight(dataId, currentUserId, requiredRight);
        if (currentUserRight) {
            return currentUserRight;
        }
        const matchingRights = await Promise.all((this.userKeyManager.keys ?? []).map((key) => this.rightManager
            .getLegitimateDataRight(dataId, key.id, runtimeEnums.PsrRights.RightRight)
            .then((right) => right || null)));
        return matchingRights.find((candidate) => !!candidate) ?? null;
    }
    async buildPartialUpdateBatch(data, rightChanges, dataRightKey, inherit) {
        const currentUserId = this.api.currentUser?.Id;
        const userKeyIds = new Set((this.userKeyManager.keys ?? []).map((key) => key.id));
        let ownerRightRemovalCandidate = null;
        const batchItems = [];
        for (const change of rightChanges) {
            let currentRight = null;
            if (!inherit) {
                currentRight = await this.rightManager.getLegitimateDataRight(data.Id, change.LegitimateId, runtimeEnums.PsrRights.RightRead);
                if (currentRight?.SealId) {
                    change.Seal = (await this.sealManager.getSeal(currentRight.SealId));
                }
            }
            const isCurrentUserOrKeyOwner = change.LegitimateId === currentUserId || userKeyIds.has(change.LegitimateId);
            const removesObjektRight = !change.LegitimateRightsAdd &&
                (change.LegitimateRights & runtimeEnums.PsrRights.RightRight) ===
                    runtimeEnums.PsrRights.RightRight;
            if (!ownerRightRemovalCandidate && isCurrentUserOrKeyOwner && removesObjektRight) {
                ownerRightRemovalCandidate = change;
                continue;
            }
            if ((change.RightPropertyUpdates & RIGHT_PROPERTY_UPDATES.LegitimateRightsChanged) ===
                RIGHT_PROPERTY_UPDATES.LegitimateRightsChanged) {
                batchItems.push({
                    ItemType: change.LegitimateRightsAdd
                        ? runtimeEnums.PsrBatchRightItemType.AddLegitimateDataRight
                        : runtimeEnums.PsrBatchRightItemType.RemoveLegitimateDataRight,
                    DataId: data.Id,
                    LegitimateId: change.LegitimateId,
                    Rights: change.LegitimateRights,
                });
            }
            const rightKeyUpdate = await this.buildRightKeyUpdate(change, data, dataRightKey);
            if (rightKeyUpdate) {
                batchItems.push(rightKeyUpdate);
            }
            if ((change.RightPropertyUpdates & RIGHT_PROPERTY_UPDATES.SealIdChanged) ===
                RIGHT_PROPERTY_UPDATES.SealIdChanged) {
                batchItems.push({
                    ItemType: runtimeEnums.PsrBatchRightItemType.UpdateLegitimateSealId,
                    DataId: data.Id,
                    LegitimateId: change.LegitimateId,
                    SealId: change.Seal ? change.Seal.Id : null,
                });
            }
            if ((change.RightPropertyUpdates & RIGHT_PROPERTY_UPDATES.SecuredDataChanged) ===
                RIGHT_PROPERTY_UPDATES.SecuredDataChanged) {
                batchItems.push({
                    ItemType: runtimeEnums.PsrBatchRightItemType.UpdateLegitimateDataRightSecuredData,
                    DataId: data.Id,
                    LegitimateId: change.LegitimateId,
                    SecuredData: !!change.SecuredData,
                });
            }
            if ((change.RightPropertyUpdates & RIGHT_PROPERTY_UPDATES.OwnerRightChanged) ===
                RIGHT_PROPERTY_UPDATES.OwnerRightChanged) {
                batchItems.push({
                    ItemType: runtimeEnums.PsrBatchRightItemType.UpdateLegitimateDataRightOwnerRight,
                    DataId: data.Id,
                    LegitimateId: change.LegitimateId,
                    OwnerRight: !!change.OwnerRight,
                });
            }
        }
        if (ownerRightRemovalCandidate) {
            batchItems.push({
                ItemType: runtimeEnums.PsrBatchRightItemType.RemoveLegitimateDataRight,
                DataId: data.Id,
                LegitimateId: ownerRightRemovalCandidate.LegitimateId,
                Rights: ownerRightRemovalCandidate.LegitimateRights,
            });
            batchItems.push({
                ItemType: runtimeEnums.PsrBatchRightItemType.UpdateLegitimateDataRightOwnerRight,
                DataId: data.Id,
                LegitimateId: ownerRightRemovalCandidate.LegitimateId,
                OwnerRight: !!ownerRightRemovalCandidate.OwnerRight,
            });
        }
        return batchItems;
    }
    async buildRightKeyUpdate(change, data, dataRightKey) {
        const legitimateData = (change.Seal || change.LegitimateData);
        const publicKey = legitimateData?.PublicKey;
        if (!publicKey) {
            return undefined;
        }
        if (getDataType(data) === runtimeEnums.PsrEntityObjectType.EntityObjectTypeUser &&
            data.Id === change.LegitimateId) {
            return null;
        }
        const rightKey = dataRightKey && change.IncludeDataRightKey
            ? await this.userKeyManager.encryptDataRightKey(String(publicKey), dataRightKey)
            : !isRoleOrUser(data)
                ? dataRightKey
                    ? await this.userKeyManager.encryptDataRightKey(String(publicKey), dataRightKey)
                    : null
                : undefined;
        if (rightKey === undefined) {
            return undefined;
        }
        return {
            ItemType: runtimeEnums.PsrBatchRightItemType.UpdateLegitimateDataRightKey,
            DataId: data.Id,
            LegitimateId: change.LegitimateId,
            ...(rightKey
                ? {
                    RightKey: Buffer.from(typeof rightKey === 'string' ? rightKey : rightKey).toString('base64'),
                }
                : {}),
        };
    }
    createValidDateUpdates(data, rightChanges, validChanges, ignoredLegitimateIds = []) {
        if (!validChanges) {
            return [];
        }
        const updates = [];
        for (const change of validChanges) {
            const legitimateId = change.LegitimateData?.Id ?? change.LegitimateId;
            if (!legitimateId || ignoredLegitimateIds.includes(legitimateId)) {
                continue;
            }
            const rightChange = rightChanges.find((candidate) => candidate.LegitimateId === legitimateId);
            if (rightChange?.OwnerRight) {
                continue;
            }
            updates.push({
                ItemType: runtimeEnums.PsrBatchRightItemType.UpdateLegitimateDataRightValidDate,
                DataId: data.Id,
                LegitimateId: legitimateId,
                ...(change.ValidFrom ? { ValidFrom: new Date(change.ValidFrom) } : {}),
                ...(change.ValidTo ? { ValidTo: new Date(change.ValidTo) } : {}),
            });
        }
        return updates;
    }
    async applyRightsToSingleData(data, changeSet, inherit, ignoreDatabaseAdmins) {
        const currentUserId = this.api.currentUser?.Id;
        if (!currentUserId) {
            return;
        }
        let editableRight = await this.findEditableRight(data.Id, runtimeEnums.PsrRights.RightRight);
        if (!editableRight) {
            if (inherit) {
                throw new Error(String(runtimeEnums.PsrApiExceptionCode.RightInsufficientRight));
            }
            const isAllowedOwnerRightOnlyChange = changeSet.rightChanges.every((change) => change.LegitimateId === currentUserId &&
                change.RightPropertyUpdates === RIGHT_PROPERTY_UPDATES.OwnerRightChanged &&
                !change.OwnerRight);
            if (!isAllowedOwnerRightOnlyChange) {
                throw new Error(String(runtimeEnums.PsrApiExceptionCode.RightInsufficientRight));
            }
        }
        let dataRightKey = editableRight
            ? await this.userKeyManager.decryptDataRight(editableRight)
            : null;
        if (!dataRightKey && editableRight?.SealId) {
            dataRightKey = await this.userKeyManager.decryptDataRightWithSeal(data, editableRight);
            if (!dataRightKey) {
                throw new Error(String(runtimeEnums.PsrApiExceptionCode.SealCurrendOrganisationUnitCantEdit));
            }
        }
        if (!dataRightKey && data.Id === currentUserId) {
            const selfKey = (this.userKeyManager.keys ?? []).find((key) => key.id === currentUserId);
            dataRightKey = selfKey?.privateKey ?? null;
        }
        if (inherit) {
            const overwriteBatch = await this.buildOverwriteBatch(data, [...changeSet.rightChanges], [...changeSet.validChanges], String(dataRightKey ?? ''), ignoreDatabaseAdmins);
            const batchItems = overwriteBatch.batchItems;
            batchItems.push(...this.createValidDateUpdates(data, changeSet.rightChanges, changeSet.validChanges, overwriteBatch.ignoredLegitimateIds));
            await this.rightManager.batchUpdateRights(batchItems);
            return;
        }
        const batchItems = await this.buildPartialUpdateBatch(data, changeSet.rightChanges, String(dataRightKey ?? ''), inherit);
        batchItems.push(...this.createValidDateUpdates(data, changeSet.rightChanges, changeSet.validChanges));
        await this.rightManager.batchUpdateRights(batchItems);
    }
    normalizeValidDates(target) {
        target.ValidFromUtc = normalizeDateBoundary(target.ValidFromUtc, false);
        target.ValidToUtc = normalizeDateBoundary(target.ValidToUtc, true);
    }
}
