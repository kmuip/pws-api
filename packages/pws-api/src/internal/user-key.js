import { asArray, GUID_EMPTY, isEncryptedContainerItem, isHistoryData } from './data-helpers.js';
import { runtimeEnums } from './enums.js';
import { fromBase64, toBase64 } from './utils.js';
function findMatchingPrivateKey(keys, legitimateId) {
    return keys?.find((entry) => entry.id === legitimateId) ?? null;
}
export class RuntimeUserKeyManager {
    api;
    sealManager;
    rightManager;
    roleManager;
    encryptionManager;
    dataBindingManager;
    multiFactorServiceClient;
    getContainerItemWithSecretValue;
    keys = null;
    constructor(api, sealManager, rightManager, roleManager, encryptionManager, dataBindingManager, multiFactorServiceClient, getContainerItemWithSecretValue) {
        this.api = api;
        this.sealManager = sealManager;
        this.rightManager = rightManager;
        this.roleManager = roleManager;
        this.encryptionManager = encryptionManager;
        this.dataBindingManager = dataBindingManager;
        this.multiFactorServiceClient = multiFactorServiceClient;
        this.getContainerItemWithSecretValue = getContainerItemWithSecretValue;
    }
    encryptDataRightKey(publicKey, key) {
        return key
            ? this.encryptionManager.encryptRightKeyWithPublicKey(fromBase64(publicKey), key)
            : null;
    }
    async decryptContainerItem(item, reason) {
        if (!isEncryptedContainerItem(item)) {
            return '';
        }
        let itemId = item.Id;
        if (isHistoryData(item)) {
            const binding = asArray(await this.dataBindingManager.getDataBindingsByData(itemId, runtimeEnums.PsrEntityObjectType.EntityObjectTypeContainerItem))[0];
            itemId = binding?.ParentDataId ?? null;
            if (!itemId) {
                throw new Error(String(runtimeEnums.PsrApiExceptionCode.RightNoKey));
            }
        }
        const rights = asArray(await this.rightManager.getLegitimateDataRights(itemId, false, false));
        if (rights.length === 0) {
            throw new Error(String(runtimeEnums.PsrApiExceptionCode.RightNoKey));
        }
        let itemKey = await this.decryptDirectRightKey(rights);
        if (!itemKey) {
            const sealedKeys = await Promise.all(rights
                .filter((right) => !!right.SealId)
                .map((right) => this.decryptDataRightWithSeal(item, right)));
            itemKey = sealedKeys.find((candidate) => !!candidate) ?? null;
        }
        if (!itemKey) {
            throw new Error(String(runtimeEnums.PsrApiExceptionCode.RightNoKey));
        }
        const secretItem = await this.getContainerItemWithSecretValue(item.Id, reason);
        return secretItem?.Value
            ? this.encryptionManager.decryptContainerItem(itemKey, fromBase64(secretItem.Value))
            : '';
    }
    async encryptContainerItem(item, plaintext) {
        const normalizedPlaintext = typeof plaintext === 'string' ? plaintext : '';
        const publicKey = item.PublicKey ? fromBase64(item.PublicKey) : null;
        const encryptionResult = await this.encryptionManager.encryptContainerItem(publicKey, normalizedPlaintext, async () => {
            if (item.Id === GUID_EMPTY) {
                return null;
            }
            const rights = asArray(await this.rightManager.getLegitimateDataRights(item.Id, false, false));
            const directKey = await this.decryptDirectRightKey(rights);
            if (directKey) {
                return directKey;
            }
            const currentUserId = this.api.currentUser?.Id;
            if (!currentUserId) {
                return null;
            }
            for (const right of rights.filter((candidate) => !!candidate.SealId)) {
                const seal = await this.sealManager.breakSeal(right.SealId);
                const openType = await this.sealManager.getSealOpenType(seal, item.Id, currentUserId, false);
                if (openType !== runtimeEnums.PsrSealOpenType.BrokenByUser) {
                    throw new Error(String(runtimeEnums.PsrApiExceptionCode.SealNotBrokenCurrently));
                }
                const key = await this.decryptSealProtectedRightKey([right], seal, currentUserId);
                if (key) {
                    return key;
                }
            }
            return null;
        });
        item.Value = toBase64(this.toBinaryString(encryptionResult.encryptedValue));
        if (encryptionResult.privateKey) {
            item.PublicKey = toBase64(this.toBinaryString(encryptionResult.publicKey ?? ''));
        }
        return encryptionResult.privateKey;
    }
    async initializeUserKeys(currentUserPrivateKey) {
        if (this.keys) {
            return;
        }
        const currentUserId = this.api.currentUser?.Id;
        if (!currentUserId) {
            throw new Error('Current user is not available');
        }
        this.keys = [];
        const [encryptedCurrentUserRightKey, roles] = await Promise.all([
            this.multiFactorServiceClient.getCurrentUserRightKey(),
            this.roleManager.getUserRoles(currentUserId),
        ]);
        const decryptedCurrentUserRightKey = await this.encryptionManager.decrypt(currentUserPrivateKey, fromBase64(String(encryptedCurrentUserRightKey)));
        const normalizedCurrentUserKey = this.toBinaryString(decryptedCurrentUserRightKey);
        const roleRights = await Promise.all(asArray(roles).map((role) => this.rightManager.getLegitimateDataRight(role.Id, currentUserId, runtimeEnums.PsrRights.RightRead)));
        this.keys.push({ id: currentUserId, privateKey: normalizedCurrentUserKey });
        await Promise.all(asArray(roleRights)
            .filter((right) => !!right?.RightKey)
            .map(async (right) => {
            const decryptedRoleKey = await this.encryptionManager.decrypt(normalizedCurrentUserKey, fromBase64(String(right.RightKey)));
            this.keys?.push({
                id: right.DataId,
                privateKey: this.toBinaryString(decryptedRoleKey),
            });
        }));
    }
    async encryptRightKeysAndReturn(item, privateKey) {
        const results = [];
        const normalizedPrivateKey = this.toBinaryString(privateKey);
        for (const right of asArray(await this.rightManager.getLegitimateDataRights(item.Id, false, false))) {
            if (!right.LegitimatePublicKey) {
                continue;
            }
            const encrypted = await this.encryptionManager.encryptRightKeyWithPublicKey(fromBase64(right.LegitimatePublicKey), normalizedPrivateKey);
            results.push({
                dataId: item.Id,
                legitimateId: right.LegitimateId,
                key: toBase64(this.toBinaryString(encrypted)),
            });
        }
        return results;
    }
    decryptDataRight(right) {
        if (!right?.RightKey) {
            return null;
        }
        const matchingKey = findMatchingPrivateKey(this.keys, right.LegitimateId);
        if (!matchingKey) {
            return null;
        }
        return this.encryptionManager.decrypt(matchingKey.privateKey, fromBase64(String(right.RightKey)));
    }
    async decryptDataRightWithSeal(data, right) {
        const currentUserId = this.api.currentUser?.Id;
        if (!currentUserId || !right.SealId) {
            return null;
        }
        const seal = await this.sealManager.breakSeal(right.SealId);
        const openType = await this.sealManager.getSealOpenType(seal, data.Id, currentUserId, false);
        if (openType === runtimeEnums.PsrSealOpenType.BrokenExpired) {
            throw new Error('The seal release is expired');
        }
        const hasRelease = await this.sealManager.hasRelease(seal, currentUserId);
        return hasRelease ? this.decryptSealProtectedRightKey([right], seal, currentUserId) : null;
    }
    getUserKeys() {
        return [...(this.keys ?? [])].map((entry) => ({ id: entry.id, privateKey: entry.privateKey }));
    }
    setUserKeys(userKeys) {
        this.keys = userKeys ? [...userKeys] : [];
    }
    async decryptDirectRightKey(rights) {
        if (!this.keys?.length) {
            return null;
        }
        const directRight = rights.find((right) => !!right.RightKey &&
            !right.SealId &&
            !!findMatchingPrivateKey(this.keys, right.LegitimateId));
        if (!directRight) {
            return null;
        }
        const matchingKey = findMatchingPrivateKey(this.keys, directRight.LegitimateId);
        return matchingKey
            ? this.encryptionManager.decrypt(matchingKey.privateKey, fromBase64(String(directRight.RightKey)))
            : null;
    }
    async decryptSealProtectedRightKey(rights, seal, legitimateId) {
        if (!rights.length || !seal || !this.keys?.length) {
            return null;
        }
        const sealKeyCarrier = asArray(seal.Keys).find((candidate) => asArray(candidate.KeyReleases).some((release) => !!release.LegitimateSealKey &&
            !!findMatchingPrivateKey(this.keys, String(release.LegitimateId))));
        if (!sealKeyCarrier) {
            return null;
        }
        const release = asArray(sealKeyCarrier.KeyReleases).find((candidate) => !!candidate.LegitimateSealKey && String(candidate.LegitimateId) === String(legitimateId));
        if (!release) {
            return null;
        }
        const matchingKey = findMatchingPrivateKey(this.keys, String(release.LegitimateId));
        const right = rights.find((candidate) => !!candidate.RightKey &&
            String(candidate.SealId) === String(seal.Id) &&
            !!findMatchingPrivateKey(this.keys, candidate.LegitimateId));
        if (!matchingKey || !right?.RightKey) {
            return null;
        }
        try {
            const decryptedSealKey = await this.encryptionManager.decrypt(matchingKey.privateKey, fromBase64(String(release.LegitimateSealKey)));
            return this.encryptionManager.decrypt(this.toBinaryString(decryptedSealKey), fromBase64(String(right.RightKey)));
        }
        catch {
            return null;
        }
    }
    toBinaryString(value) {
        if (value == null) {
            return '';
        }
        return typeof value === 'string' ? value : Buffer.from(value).toString('binary');
    }
}
