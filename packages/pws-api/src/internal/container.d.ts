import type { ContainerManager, OneTimePasswordManager, PasswordManager, PsrBatchRightItem, PsrBehaviours, PsrContainer, PsrContainerHistory, PsrContainerItem, PsrContainerListFilter, PsrContainerType, PsrCredentialCheck, PsrDataRightTemplate, PsrGuid } from '@kmuip/pws-types';
type ServiceClientLike = {
    getContainerListFilter(type: PsrContainerType, defaultFilter: boolean): Promise<PsrContainerListFilter>;
    getContainerList(containerType: PsrContainerType, filter: PsrContainerListFilter, behaviours?: PsrBehaviours): Promise<PsrContainer[]>;
    getContainerCount(containerType: PsrContainerType, filter: PsrContainerListFilter): Promise<number>;
    getContainer(id: PsrGuid): Promise<PsrContainer>;
    updateContainer(container: PsrContainer, behaviours: PsrBehaviours): Promise<PsrContainer>;
    addContainer(container: PsrContainer, parentOrganisationUnitId: PsrGuid | null): Promise<PsrContainer>;
    addContainerV2(container: unknown, parentOrganisationUnitId?: PsrGuid | null, rightInheritanceOptions?: unknown): Promise<PsrContainer>;
    initContainerItem(containerItemType: number): Promise<PsrContainerItem>;
    deleteContainer(container: PsrContainer): Promise<void>;
    getContainerItemWithSecretValue(itemId: PsrGuid, reason: string): Promise<PsrContainerItem>;
    getContainerItem(itemId: PsrGuid): Promise<PsrContainerItem>;
    getContainerInvolvedOrganisationUnit(dataId: PsrGuid): Promise<PsrGuid[]>;
    getContainerHistoryList(containerType: PsrContainerType, id: PsrGuid): Promise<PsrContainerHistory[]>;
    cloneContainer(baseContainerId: PsrGuid): Promise<PsrContainer>;
    initContainer(containerType: PsrContainerType): Promise<PsrContainer>;
    getContainerBrowserSsoList(getContainersWithoutUrl: boolean): Promise<PsrContainer[]>;
    SearchContainersBrowserSsoList(searchValue: string): Promise<PsrContainer[]>;
    getCredentialCheck(containerId: PsrGuid): Promise<PsrCredentialCheck>;
};
type TypedConstructors = {
    PsrContainer: new () => PsrContainer;
    PsrContainerItem: new () => PsrContainerItem;
};
type InheritanceApplier = {
    run: (data: PsrContainer, rights: PsrDataRightTemplate[] | null, additionalBatchItemsFactory?: ((dataId: PsrGuid) => Promise<PsrBatchRightItem[]>) | null, targetId?: PsrGuid | null, templateGroupId?: PsrGuid | null, dataType?: number | null, hierarchyTargetId?: PsrGuid | null) => Promise<unknown>;
};
type RightBatchUpdater = {
    batchUpdateRights(batchItems: PsrBatchRightItem[]): Promise<unknown>;
};
type ItemKeyCryptography = {
    encryptDataRightKey(publicKey: string, key: string | Uint8Array | null): Promise<string | Uint8Array | null> | string | Uint8Array | null;
    decryptContainerItem(item: PsrContainerItem, reason: string): Promise<string>;
    encryptContainerItem(item: PsrContainerItem, plaintext: string): Promise<string | Uint8Array | null>;
    encryptRightKeysAndReturn(item: Pick<PsrContainerItem, 'Id'>, privateKey: string | Uint8Array): Promise<Array<{
        dataId: PsrGuid;
        legitimateId: PsrGuid;
        key: string;
    }>>;
};
type RightSaver = {
    saveRights(data: PsrContainerItem[], rights: unknown[], overwriteBrokenSeals: boolean, deleteUnchangedRights: boolean, useCanReadOwnRightsOptimization: boolean): Promise<unknown>;
};
type CurrentUserAccess = {
    getCurrentUserPublicKey(): string | null;
};
export declare class RuntimeContainerManager implements ContainerManager {
    private readonly serviceClient;
    private readonly passwordManager;
    private readonly inheritanceManager;
    private readonly rightManager;
    private readonly userKeyManager;
    private readonly currentUserAccess;
    private readonly genericRightManager;
    private readonly oneTimePasswordManager;
    private readonly typeConstructors;
    constructor(serviceClient: ServiceClientLike, passwordManager: PasswordManager, inheritanceManager: InheritanceApplier, rightManager: RightBatchUpdater & {
        getLegitimateDataRights(dataId: PsrGuid, includeChildren: boolean, inherit: boolean): Promise<unknown[]>;
    }, userKeyManager: ItemKeyCryptography, currentUserAccess: CurrentUserAccess, genericRightManager: RightSaver, oneTimePasswordManager: OneTimePasswordManager, typeConstructors: TypedConstructors);
    getContainerListFilter(type: PsrContainerType, defaultFilter: boolean): Promise<PsrContainerListFilter>;
    getContainerList(containerType: PsrContainerType, containerListFilter: PsrContainerListFilter, behaviours?: PsrBehaviours): Promise<PsrContainer[]>;
    getContainerCount(containerType: PsrContainerType, containerListFilter: PsrContainerListFilter): Promise<number>;
    getContainer(containerId: PsrGuid): Promise<PsrContainer>;
    updateContainer(container: PsrContainer, behaviours: PsrBehaviours): Promise<PsrContainer>;
    addContainer(container: PsrContainer, parentOrganisationUnitId: PsrGuid | null, rightTemplates: PsrDataRightTemplate[] | null, templateGroupId: PsrGuid | null): Promise<PsrContainer>;
    initContainerItem(containerItemType: number): Promise<PsrContainerItem>;
    deleteContainer(container: PsrContainer): Promise<void>;
    getContainerItemWithSecretValue(itemId: PsrGuid, reason: string): Promise<PsrContainerItem>;
    getContainerItem(itemId: PsrGuid): Promise<PsrContainerItem>;
    createContainerFromBaseContainer(baseContainer: PsrContainer, newContainerType: PsrContainerType): PsrContainer;
    decryptContainerItem(item: PsrContainerItem, reason: string): Promise<string>;
    encryptContainerItem(item: PsrContainerItem, plaintext: string): never;
    getContainerInvolvedOrganisationUnit(dataId: PsrGuid): Promise<string[]>;
    getContainerHistoryList(containerType: PsrContainerType, id: PsrGuid): Promise<PsrContainerHistory[]>;
    getContainerBrowserSsoList(getContainersWithoutUrl: boolean): Promise<PsrContainer[]>;
    SearchContainersBrowserSsoList(searchValue: string): Promise<PsrContainer[]>;
    cloneContainer(baseContainerId: PsrGuid): Promise<PsrContainer>;
    initContainer(containerType: PsrContainerType): Promise<PsrContainer>;
    getCredentialCheck(containerId: PsrGuid): Promise<PsrCredentialCheck>;
    private prepareEncryptedItems;
    private prepareEncryptedItemsForCreate;
    private validateOtpItem;
    private createRightKeyBatchUpdates;
    private createRightInheritanceOptions;
    private toBase64;
    private serializeContainerForAddContainerV2;
    private serializeContainerItemForAddContainerV2;
}
export {};
