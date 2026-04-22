import { runtimeEnums } from './enums.js';
export const GUID_EMPTY = '00000000-0000-0000-0000-000000000000';
function hasMethod(value, methodName) {
    return (typeof value === 'object' &&
        value !== null &&
        typeof value[methodName] === 'function');
}
export function asArray(value) {
    if (!value) {
        return [];
    }
    return Array.isArray(value) ? value : Array.from(value);
}
export function getDataType(data) {
    if (hasMethod(data, 'DataType')) {
        return Number(data.DataType());
    }
    const candidate = data;
    if (!candidate) {
        return runtimeEnums.PsrEntityObjectType.EntityObjectTypeUnknown;
    }
    if ('ContainerItemType' in candidate) {
        return runtimeEnums.PsrEntityObjectType.EntityObjectTypeContainerItem;
    }
    if ('ContainerType' in candidate) {
        const containerType = Number(candidate.ContainerType);
        if (containerType === runtimeEnums.PsrContainerType.Form) {
            return runtimeEnums.PsrEntityObjectType.EntityObjectTypeFormular;
        }
        if (containerType === runtimeEnums.PsrContainerType.Document) {
            return runtimeEnums.PsrEntityObjectType.EntityObjectTypeDocument;
        }
        return runtimeEnums.PsrEntityObjectType.EntityObjectTypePassword;
    }
    if ('RoleName' in candidate) {
        return runtimeEnums.PsrEntityObjectType.EntityObjectTypeRole;
    }
    if ('UserName' in candidate) {
        return runtimeEnums.PsrEntityObjectType.EntityObjectTypeUser;
    }
    if ('GroupName' in candidate) {
        return runtimeEnums.PsrEntityObjectType.EntityObjectTypeGroup;
    }
    if ('RequiredReleases' in candidate || 'Keys' in candidate) {
        return runtimeEnums.PsrEntityObjectType.EntityObjectTypeSeal;
    }
    return runtimeEnums.PsrEntityObjectType.EntityObjectTypeUnknown;
}
export function isEncryptedContainerItem(item) {
    if (!item) {
        return false;
    }
    if (hasMethod(item, 'IsEncrypted')) {
        return Boolean(item.IsEncrypted());
    }
    if (typeof item.IsEncrypted === 'boolean') {
        return item.IsEncrypted;
    }
    const itemType = Number(item.ContainerItemType);
    return (itemType === runtimeEnums.PsrContainerItemType.ContainerItemPassword ||
        itemType === runtimeEnums.PsrContainerItemType.ContainerItemPasswordMemo ||
        itemType === runtimeEnums.PsrContainerItemType.ContainerItemOtp);
}
export function isPasswordContainer(container) {
    return Number(container?.ContainerType) === runtimeEnums.PsrContainerType.Password;
}
export function isHistoryData(data) {
    return ((Number(data?.DataStates ?? 0) & runtimeEnums.PsrDataStates.StateHistory) ===
        runtimeEnums.PsrDataStates.StateHistory);
}
export function isGroupStructureNode(value) {
    const candidate = value;
    return (!!candidate &&
        typeof candidate === 'object' &&
        'OrganisationUnit' in candidate &&
        'ChildrenOrganisationUnits' in candidate);
}
export function isRoleOrUser(data) {
    const dataType = getDataType(data);
    return (dataType === runtimeEnums.PsrEntityObjectType.EntityObjectTypeRole ||
        dataType === runtimeEnums.PsrEntityObjectType.EntityObjectTypeUser);
}
export function normalizeRightFlags(value) {
    if (typeof value === 'number' && Number.isFinite(value)) {
        return value;
    }
    if (Array.isArray(value)) {
        return value.reduce((combined, entry) => combined | normalizeRightFlags(entry), 0);
    }
    if (typeof value === 'string') {
        if (value in runtimeEnums.PsrRights) {
            return runtimeEnums.PsrRights[value];
        }
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : 0;
    }
    return 0;
}
export function normalizeDateBoundary(value, isEnd) {
    if (!value) {
        return value ?? null;
    }
    const date = value instanceof Date ? new Date(value) : new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    if (isEnd) {
        date.setHours(23, 59, 59, 0);
    }
    else {
        date.setHours(0, 0, 0, 0);
    }
    return date;
}
export function createBatchRightKeyUpdate(dataId, legitimateId, rightKey) {
    const update = {
        ItemType: runtimeEnums.PsrBatchRightItemType.UpdateLegitimateDataRightKey,
        DataId: dataId,
        LegitimateId: legitimateId,
    };
    if (rightKey != null) {
        update.RightKey = rightKey;
    }
    return update;
}
export function matchesLegitimateId(dataRight, legitimateId) {
    return String(dataRight.LegitimateId) === String(legitimateId);
}
