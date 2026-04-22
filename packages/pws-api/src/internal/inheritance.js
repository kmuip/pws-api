import { asArray, getDataType, GUID_EMPTY, isEncryptedContainerItem } from './data-helpers.js';
import { runtimeEnums } from './enums.js';
export class RuntimeInheritanceManager {
    api;
    rightManager;
    templateManager;
    optionManager;
    constructor(api, rightManager, templateManager, optionManager) {
        this.api = api;
        this.rightManager = rightManager;
        this.templateManager = templateManager;
        this.optionManager = optionManager;
    }
    async run(data, rights, additionalBatchItemsFactory, targetId, templateGroupId, dataType, hierarchyTargetId) {
        const normalizedTargetId = targetId ?? this.api.currentUser?.Id ?? null;
        const normalizedRights = asArray(rights);
        if (normalizedRights.length > 0) {
            return this.applyExplicitRights(data, normalizedRights, additionalBatchItemsFactory, normalizedTargetId);
        }
        if (templateGroupId) {
            return this.applyHierarchyTemplates(data, additionalBatchItemsFactory, normalizedTargetId, templateGroupId, dataType ?? null, hierarchyTargetId ?? null);
        }
        return this.applyExplicitRights(data, [], additionalBatchItemsFactory, normalizedTargetId);
    }
    async applyExplicitRights(data, rights, additionalBatchItemsFactory, targetId) {
        const updates = [];
        updates.push(this.copyRights(data, rights, additionalBatchItemsFactory, targetId));
        if (Array.isArray(data.Items)) {
            for (const item of data.Items) {
                updates.push(this.copyRights(item, rights, additionalBatchItemsFactory, targetId));
            }
        }
        return this.flushBatchUpdates(updates);
    }
    async applyHierarchyTemplates(data, additionalBatchItemsFactory, targetId, templateGroupId, dataType, hierarchyTargetId) {
        if (!hierarchyTargetId) {
            throw new Error('targetId is necessary when using inheritance with template group ID.');
        }
        const updates = [];
        const rootRights = asArray(await this.templateManager.getHierarchyDataRightTemplate(data.Id, dataType, targetId ?? hierarchyTargetId, templateGroupId));
        updates.push(this.copyRights(data, rootRights, additionalBatchItemsFactory, null));
        if (!Array.isArray(data.Items)) {
            return this.flushBatchUpdates(updates);
        }
        for (const item of data.Items) {
            const itemRights = asArray(await this.templateManager.getHierarchyDataRightTemplate(targetId ?? hierarchyTargetId, runtimeEnums.PsrEntityObjectType.EntityObjectTypeContainerItem, item.BaseContainerItemId, templateGroupId));
            updates.push(this.copyRights(item, itemRights, additionalBatchItemsFactory, null));
        }
        return this.flushBatchUpdates(updates);
    }
    async copyRights(data, rights, additionalBatchItemsFactory, targetId) {
        const currentUserId = this.api.currentUser?.Id;
        if (!currentUserId) {
            return [];
        }
        if (rights.length === 0 && targetId) {
            return this.inheritRightsFromTarget(data, targetId, additionalBatchItemsFactory);
        }
        const batchItems = [];
        for (const right of rights) {
            if (!right.LegitimateId || right.LegitimateId === currentUserId) {
                continue;
            }
            const dataType = getDataType(data);
            if (dataType !== runtimeEnums.PsrEntityObjectType.EntityObjectTypeGroup) {
                ;
                right.Rights =
                    Number(right.Rights ?? 0) & ~runtimeEnums.PsrRights.RightAppend;
            }
            const legitimateId = right.LegitimateId === GUID_EMPTY ? currentUserId : right.LegitimateId;
            batchItems.push({
                ItemType: runtimeEnums.PsrBatchRightItemType.AddLegitimateDataRight,
                DataId: data.Id,
                LegitimateId: legitimateId,
                Rights: Number(right.Rights ?? 0),
            });
        }
        await this.rightManager.batchUpdateRights(batchItems);
        const extraBatchItems = await this.getAdditionalBatchItems(data, additionalBatchItemsFactory);
        return [
            ...extraBatchItems,
            {
                ItemType: runtimeEnums.PsrBatchRightItemType.RemoveCurrentOrganisationUnitFromRights,
                DataId: data.Id,
                LegitimateId: currentUserId,
            },
        ];
    }
    async inheritRightsFromTarget(data, targetId, additionalBatchItemsFactory) {
        const currentUser = this.api.currentUser;
        if (!currentUser) {
            return [];
        }
        const inheritanceOption = await this.optionManager.getOption('OrganisationUnitInheritance', currentUser);
        if (inheritanceOption?.ValueSelectedItem === 'OrganisationUnitInheritanceModeNone') {
            return [];
        }
        if (inheritanceOption?.ValueSelectedItem === 'OrganisationUnitInheritanceModeGroup' &&
            targetId === currentUser.Id) {
            return [];
        }
        const rights = asArray(await this.rightManager.getLegitimateDataRights(targetId, false, false));
        const batchItems = [];
        for (const right of rights) {
            if (right.LegitimateId === currentUser.Id ||
                (right.Legitimate && 'KeyType' in right.Legitimate)) {
                continue;
            }
            batchItems.push({
                ItemType: runtimeEnums.PsrBatchRightItemType.AddLegitimateDataRight,
                DataId: data.Id,
                LegitimateId: right.LegitimateId,
                Rights: Number(right.Rights ?? 0) & ~runtimeEnums.PsrRights.RightAppend,
            });
        }
        await this.rightManager.batchUpdateRights(batchItems);
        return this.getAdditionalBatchItems(data, additionalBatchItemsFactory);
    }
    async getAdditionalBatchItems(data, factory) {
        if (!factory) {
            return [];
        }
        const dataType = getDataType(data);
        const isEncryptedItem = dataType === runtimeEnums.PsrEntityObjectType.EntityObjectTypeContainerItem &&
            isEncryptedContainerItem(data);
        const isDocument = dataType === runtimeEnums.PsrEntityObjectType.EntityObjectTypeDocument;
        return isEncryptedItem || isDocument ? await factory(data.Id) : [];
    }
    async flushBatchUpdates(updates) {
        const resolved = await Promise.all(updates);
        const flat = resolved.flat();
        if (flat.length > 0) {
            await this.rightManager.batchUpdateRights(flat);
        }
    }
}
