import type { EncryptionManager, PsrContainerItem, PsrDataRight, PsrGuid, PsrOrganisationUnitUser, PsrSeal, PsrUserKey } from '@kmuip/pws-types';
type MultiFactorServiceClientLike = {
    getCurrentUserRightKey(): Promise<unknown>;
};
type RuntimeApiUserContext = {
    currentUser: PsrOrganisationUnitUser | null;
};
type SealAccess = {
    breakSeal(sealId: PsrGuid): Promise<PsrSeal>;
    getSealOpenType(seal: PsrSeal, dataId: PsrGuid, legitimateId: PsrGuid, includeHistory: boolean): Promise<number>;
    hasRelease(seal: PsrSeal, legitimateId: PsrGuid): Promise<boolean>;
};
type RightAccess = {
    getLegitimateDataRights(dataId: PsrGuid, includeChildren: boolean, inherit: boolean): Promise<PsrDataRight[]>;
    getLegitimateDataRight(dataId: PsrGuid, legitimateId: PsrGuid, rightType: number): Promise<PsrDataRight>;
};
type RoleAccess = {
    getUserRoles(userId: PsrGuid): Promise<Array<{
        Id: PsrGuid;
    }>>;
};
type DataBindingAccess = {
    getDataBindingsByData(dataId: PsrGuid, entityObjectType: number): Promise<unknown[]>;
};
type DataRightKeyResult = {
    dataId: PsrGuid;
    legitimateId: PsrGuid;
    key: string;
};
export declare class RuntimeUserKeyManager {
    private readonly api;
    private readonly sealManager;
    private readonly rightManager;
    private readonly roleManager;
    private readonly encryptionManager;
    private readonly dataBindingManager;
    private readonly multiFactorServiceClient;
    private readonly getContainerItemWithSecretValue;
    keys: PsrUserKey[] | null;
    constructor(api: RuntimeApiUserContext, sealManager: SealAccess, rightManager: RightAccess, roleManager: RoleAccess, encryptionManager: EncryptionManager, dataBindingManager: DataBindingAccess, multiFactorServiceClient: MultiFactorServiceClientLike, getContainerItemWithSecretValue: (itemId: PsrGuid, reason: string) => Promise<PsrContainerItem>);
    encryptDataRightKey(publicKey: string, key: string | Uint8Array | null): string | Uint8Array<ArrayBufferLike> | Promise<string | Uint8Array<ArrayBufferLike>> | null;
    decryptContainerItem(item: PsrContainerItem, reason: string): Promise<string>;
    encryptContainerItem(item: PsrContainerItem, plaintext: string): Promise<string | Uint8Array<ArrayBufferLike> | null>;
    initializeUserKeys(currentUserPrivateKey: string): Promise<void>;
    encryptRightKeysAndReturn(item: Pick<PsrContainerItem, 'Id'>, privateKey: string | Uint8Array): Promise<DataRightKeyResult[]>;
    decryptDataRight(right: PsrDataRight | null | undefined): string | Uint8Array<ArrayBufferLike> | Promise<string | Uint8Array<ArrayBufferLike>> | null;
    decryptDataRightWithSeal(data: {
        Id: PsrGuid;
    }, right: PsrDataRight): Promise<string | Uint8Array<ArrayBufferLike> | null>;
    getUserKeys(): {
        id: string;
        privateKey: string;
    }[];
    setUserKeys(userKeys: PsrUserKey[] | null | undefined): void;
    private decryptDirectRightKey;
    private decryptSealProtectedRightKey;
    private toBinaryString;
}
export {};
