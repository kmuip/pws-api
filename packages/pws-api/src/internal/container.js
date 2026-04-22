import { asArray, GUID_EMPTY, isEncryptedContainerItem, isPasswordContainer, } from './data-helpers.js';
import { runtimeEnums } from './enums.js';
export class RuntimeContainerManager {
    serviceClient;
    passwordManager;
    inheritanceManager;
    rightManager;
    userKeyManager;
    currentUserAccess;
    genericRightManager;
    oneTimePasswordManager;
    typeConstructors;
    constructor(serviceClient, passwordManager, inheritanceManager, rightManager, userKeyManager, currentUserAccess, genericRightManager, oneTimePasswordManager, typeConstructors) {
        this.serviceClient = serviceClient;
        this.passwordManager = passwordManager;
        this.inheritanceManager = inheritanceManager;
        this.rightManager = rightManager;
        this.userKeyManager = userKeyManager;
        this.currentUserAccess = currentUserAccess;
        this.genericRightManager = genericRightManager;
        this.oneTimePasswordManager = oneTimePasswordManager;
        this.typeConstructors = typeConstructors;
    }
    getContainerListFilter(type, defaultFilter) {
        return this.serviceClient.getContainerListFilter(type, defaultFilter);
    }
    getContainerList(containerType, containerListFilter, behaviours) {
        return this.serviceClient.getContainerList(containerType, containerListFilter, behaviours);
    }
    getContainerCount(containerType, containerListFilter) {
        return this.serviceClient.getContainerCount(containerType, containerListFilter);
    }
    getContainer(containerId) {
        return this.serviceClient.getContainer(containerId);
    }
    async updateContainer(container, behaviours) {
        container.DataTags = [];
        container.TimeStampUtc = new Date().toUTCString();
        const newItems = asArray(container.Items).filter((item) => !item.Id || item.Id === GUID_EMPTY);
        newItems.forEach((item) => {
            item.DataStates = runtimeEnums.PsrDataStates.StateActive;
        });
        let encryptedItemKeys = [];
        if (isPasswordContainer(container)) {
            encryptedItemKeys = await this.prepareEncryptedItemsForCreate(asArray(container.Items));
        }
        const updatedContainer = await this.serviceClient.updateContainer(container, behaviours);
        const createdItems = asArray(updatedContainer.Items).filter((candidate) => newItems.some((item) => item.Name === candidate.Name));
        for (const item of asArray(container.Items)) {
            const matchingUpdatedItem = asArray(updatedContainer.Items).find((candidate) => candidate.Name === item.Name);
            if (matchingUpdatedItem) {
                item.Id = matchingUpdatedItem.Id;
            }
        }
        if (newItems.length > 0) {
            newItems.forEach((item) => {
                const matchingUpdatedItem = asArray(updatedContainer.Items).find((candidate) => candidate.Name === item.Name);
                if (matchingUpdatedItem) {
                    item.Id = matchingUpdatedItem.Id;
                }
            });
            const currentRights = asArray(await this.rightManager.getLegitimateDataRights(container.Id, false, false));
            await this.genericRightManager.saveRights(createdItems, currentRights, false, false, false);
        }
        if (isPasswordContainer(container)) {
            const keyUpdates = await this.createRightKeyBatchUpdates(createdItems, encryptedItemKeys);
            await this.rightManager.batchUpdateRights(keyUpdates);
        }
        return updatedContainer;
    }
    async addContainer(container, parentOrganisationUnitId, rightTemplates, templateGroupId) {
        if (Number(container.ContainerType) === runtimeEnums.PsrContainerType.Password &&
            !parentOrganisationUnitId) {
            throw new Error('Containers of type password must have a parent organisation unit.');
        }
        if (!isPasswordContainer(container)) {
            container.DataTags = [];
        }
        let encryptedItemKeys = [];
        if (isPasswordContainer(container)) {
            encryptedItemKeys = await this.prepareEncryptedItems(asArray(container.Items));
        }
        const createdContainer = isPasswordContainer(container)
            ? await this.serviceClient.addContainerV2(this.serializeContainerForAddContainerV2(container), parentOrganisationUnitId, await this.createRightInheritanceOptions(encryptedItemKeys, rightTemplates, templateGroupId))
            : await this.serviceClient.addContainer(container, parentOrganisationUnitId);
        return createdContainer;
    }
    initContainerItem(containerItemType) {
        return this.serviceClient.initContainerItem(containerItemType);
    }
    deleteContainer(container) {
        return this.serviceClient.deleteContainer(container);
    }
    getContainerItemWithSecretValue(itemId, reason) {
        return this.serviceClient.getContainerItemWithSecretValue(itemId, reason);
    }
    getContainerItem(itemId) {
        return this.serviceClient.getContainerItem(itemId);
    }
    createContainerFromBaseContainer(baseContainer, newContainerType) {
        const container = new this.typeConstructors.PsrContainer();
        container.Items = [];
        container.ContainerType = newContainerType;
        container.BaseContainerId = baseContainer.Id;
        for (const item of asArray(baseContainer.Items)) {
            const clone = new this.typeConstructors.PsrContainerItem();
            const sourceItem = item;
            clone.Name = item.Name;
            clone.Description = item.Description;
            clone.ContainerItemDescHighlightType = item.ContainerItemDescHighlightType;
            clone.AllowedChars = item.AllowedChars;
            clone.AllowOnlyGeneratedPasswords = item.AllowOnlyGeneratedPasswords;
            clone.BaseContainerItemId = item.Id;
            clone.ChangedOrganisationUnitId = item.ChangedOrganisationUnitId;
            clone.CheckPolicy = item.CheckPolicy;
            clone.ContainerId = item.ContainerId;
            clone.ContainerItemType = item.ContainerItemType;
            clone.DataStates = item.DataStates;
            clone.Id = GUID_EMPTY;
            clone.Mandatory = sourceItem.Mandatory;
            clone.MaxLength = sourceItem.MaxLength;
            clone.MinLength = sourceItem.MinLength;
            clone.PolicyId = item.PolicyId;
            clone.Position = item.Position;
            clone.PublicKey = item.PublicKey;
            clone.Regex = item.Regex;
            clone.TimeStampUtc = item.TimeStampUtc;
            clone.Quality = item.Quality;
            clone.SecretValueRequiredReason = item.SecretValueRequiredReason;
            clone.NoPermission = sourceItem.NoPermission;
            clone.Value = item.Value;
            clone.ValueBool = item.ValueBool;
            clone.ValueDateUtc = item.ValueDateUtc;
            clone.ValueDecimal = item.ValueDecimal;
            clone.ValueInt = item.ValueInt;
            if (item.ListItems) {
                clone.ListItems = [...item.ListItems];
            }
            if (isEncryptedContainerItem(clone)) {
                clone.Value = null;
            }
            container.Items.push(clone);
        }
        return container;
    }
    decryptContainerItem(item, reason) {
        return this.userKeyManager.decryptContainerItem(item, reason);
    }
    encryptContainerItem(item, plaintext) {
        return this.userKeyManager.encryptContainerItem(item, plaintext);
    }
    getContainerInvolvedOrganisationUnit(dataId) {
        return this.serviceClient.getContainerInvolvedOrganisationUnit(dataId);
    }
    getContainerHistoryList(containerType, id) {
        return this.serviceClient.getContainerHistoryList(containerType, id);
    }
    getContainerBrowserSsoList(getContainersWithoutUrl) {
        return this.serviceClient.getContainerBrowserSsoList(getContainersWithoutUrl);
    }
    SearchContainersBrowserSsoList(searchValue) {
        return this.serviceClient.SearchContainersBrowserSsoList(searchValue);
    }
    cloneContainer(baseContainerId) {
        return this.serviceClient.cloneContainer(baseContainerId);
    }
    initContainer(containerType) {
        return this.serviceClient.initContainer(containerType);
    }
    getCredentialCheck(containerId) {
        return this.serviceClient.getCredentialCheck(containerId);
    }
    async prepareEncryptedItems(items) {
        items.forEach((item, index) => {
            item.Position = index;
        });
        const encryptedItems = items.filter((item) => isEncryptedContainerItem(item) && item.PlainTextValue != null);
        const keyEntries = encryptedItems.map((item) => ({
            itemName: item.Name ?? '',
            privateKey: null,
        }));
        for (const item of encryptedItems) {
            this.validateOtpItem(item);
            item.Quality = this.passwordManager.getPasswordStrength(item.PlainTextValue ?? '');
            const privateKey = await this.userKeyManager.encryptContainerItem(item, item.PlainTextValue ?? '');
            const entry = keyEntries.find((candidate) => candidate.itemName === item.Name);
            if (entry) {
                entry.privateKey = privateKey;
            }
        }
        return keyEntries;
    }
    async prepareEncryptedItemsForCreate(items) {
        items.forEach((item, index) => {
            item.Position = index;
        });
        const encryptedItems = items.filter((item) => isEncryptedContainerItem(item));
        const keyEntries = encryptedItems.map((item) => ({
            itemName: item.Name ?? '',
            privateKey: null,
        }));
        for (const item of encryptedItems) {
            const plaintext = item.PlainTextValue ?? '';
            item.PlainTextValue = plaintext;
            this.validateOtpItem(item);
            item.Quality = this.passwordManager.getPasswordStrength(plaintext);
            const privateKey = await this.userKeyManager.encryptContainerItem(item, plaintext);
            const entry = keyEntries.find((candidate) => candidate.itemName === item.Name);
            if (entry) {
                entry.privateKey = privateKey;
            }
        }
        return keyEntries;
    }
    validateOtpItem(item) {
        if (item.ContainerItemType !== runtimeEnums.PsrContainerItemType.ContainerItemOtp ||
            !item.PlainTextValue) {
            return;
        }
        try {
            this.oneTimePasswordManager.generateGoogleAuthenticatorOtp(item.PlainTextValue);
        }
        catch {
            throw new Error(String(runtimeEnums.PsrApiExceptionCode.ContainerItemOtpMustBeBase32Encoded));
        }
    }
    async createRightKeyBatchUpdates(items, encryptedItemKeys) {
        const batchItems = [];
        const updates = items
            .filter((item) => isEncryptedContainerItem(item))
            .map(async (item) => {
            const keyEntry = encryptedItemKeys.find((candidate) => candidate.itemName === item.Name && candidate.privateKey);
            if (!keyEntry?.privateKey) {
                return;
            }
            const rightKeys = await this.userKeyManager.encryptRightKeysAndReturn(item, keyEntry.privateKey);
            rightKeys.forEach((entry) => {
                batchItems.push({
                    ItemType: runtimeEnums.PsrBatchRightItemType.UpdateLegitimateDataRightKey,
                    DataId: entry.dataId,
                    LegitimateId: entry.legitimateId,
                    RightKey: entry.key,
                });
            });
        });
        await Promise.all(updates);
        return batchItems;
    }
    async createRightInheritanceOptions(encryptedItemKeys, rightTemplates, templateGroupId) {
        const currentUserPublicKey = this.currentUserAccess.getCurrentUserPublicKey();
        if (!currentUserPublicKey) {
            throw new Error('Current user public key is not available.');
        }
        const keys = await Promise.all(encryptedItemKeys
            .filter((entry) => entry.privateKey != null)
            .map(async (entry) => ({
            EncryptedPrivateKey: this.toBase64((await this.userKeyManager.encryptDataRightKey(currentUserPublicKey, entry.privateKey)) ?? ''),
            Identifier: entry.itemName,
        })));
        return {
            RightInheritanceMode: 1,
            TemplateGroupId: templateGroupId ?? null,
            RightTemplates: asArray(rightTemplates),
            Keys: keys,
            IncludeCurrentUser: true,
        };
    }
    toBase64(value) {
        return typeof value === 'string'
            ? Buffer.from(value, 'binary').toString('base64')
            : Buffer.from(value).toString('base64');
    }
    serializeContainerForAddContainerV2(container) {
        const baseContainerName = container.BaseContainer?.Name ??
            container.Info
                ?.BaseContainerName ??
            null;
        return {
            $type: container.$type ??
                'PsrDataLayer.Structure.MtoContainer, PsrDataLayer',
            IsDocumentLink: Boolean(container.IsDocumentLink),
            Id: container.Id,
            TimeStampUtc: container.TimeStampUtc,
            ValidTimeStampUtc: container.ValidTimeStampUtc ?? null,
            ChangedOrganisationUnitId: container.ChangedOrganisationUnitId ?? null,
            PublicKey: container.PublicKey ?? null,
            DataStates: container.DataStates,
            DataTags: asArray(container.DataTags ?? []),
            IsFavorite: Boolean(container.IsFavorite),
            HasTrigger: Boolean(container.HasTrigger),
            HasTriggerAlert: Boolean(container.HasTriggerAlert),
            Name: container.Name ?? null,
            Description: container.Description ?? null,
            BaseContainerId: container.BaseContainerId ?? null,
            EncryptionKeyType: container.EncryptionKeyType ?? null,
            Items: asArray(container.Items).map((item) => this.serializeContainerItemForAddContainerV2(item)),
            DocumentDataId: container.DocumentDataId ?? null,
            DocumentPath: container.DocumentPath ?? null,
            DocumentType: container.DocumentType ?? null,
            DocumentSize: Number(container.DocumentSize ?? 0),
            DocumentMeta: container.DocumentMeta ?? null,
            DocumentParams: container.DocumentParams ?? null,
            DocumentCacheDeleteTime: Number(container.DocumentCacheDeleteTime ?? 0),
            ContainerType: container.ContainerType,
            ContainerInfoConfig: container.ContainerInfoConfig ?? null,
            Info: baseContainerName ? { BaseContainerName: baseContainerName } : null,
            ContainerQuality: Number(container.ContainerQuality ?? 0),
        };
    }
    serializeContainerItemForAddContainerV2(item) {
        const publicKey = typeof item.PublicKey === 'string' && item.PublicKey.length === 0
            ? null
            : (item.PublicKey ?? null);
        return {
            Name: item.Name ?? null,
            Description: item.Description ?? null,
            ContainerItemDescHighlightType: item.ContainerItemDescHighlightType,
            AllowedChars: item.AllowedChars ?? null,
            AllowOnlyGeneratedPasswords: Boolean(item.AllowOnlyGeneratedPasswords),
            BaseContainerItemId: item.BaseContainerItemId ?? null,
            ChangedOrganisationUnitId: item.ChangedOrganisationUnitId ?? null,
            CheckPolicy: Boolean(item.CheckPolicy),
            ContainerId: item.ContainerId,
            ContainerItemType: item.ContainerItemType,
            DataStates: item.DataStates,
            Id: item.Id,
            Mandatory: Boolean(item.Mandatory),
            MaxLength: Number(item.MaxLength ?? 0),
            MinLength: Number(item.MinLength ?? 0),
            PolicyId: item.PolicyId ?? null,
            Position: item.Position,
            PublicKey: publicKey,
            Regex: item.Regex ?? null,
            TimeStampUtc: item.TimeStampUtc,
            Quality: Number(item.Quality ?? 0),
            SecretValueRequiredReason: item.SecretValueRequiredReason ?? false,
            NoPermission: Boolean(item.NoPermission),
            Value: item.Value ?? null,
            ValueBool: item.ValueBool ?? null,
            ValueDateUtc: item.ValueDateUtc ?? null,
            ValueDecimal: item.ValueDecimal ?? null,
            ValueInt: item.ValueInt ?? null,
            ValueMemo: item.ValueMemo ?? null,
            EncryptionKeyType: item.EncryptionKeyType ?? null,
        };
    }
}
