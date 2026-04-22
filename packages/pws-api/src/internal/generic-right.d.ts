import type { GenericRightManager, OrganisationUnitManager, PsrData, PsrDataRight, PsrGuid, RightManager, SealManager } from '@kmuip/pws-types';
import { RuntimeUserKeyManager } from './user-key.js';
type RuntimeApiLike = {
    currentUser: {
        Id: PsrGuid;
    } | null;
};
export declare class RuntimeGenericRightManager implements GenericRightManager {
    private readonly api;
    private readonly rightManager;
    private readonly organisationUnitManager;
    private readonly sealManager;
    private readonly userKeyManager;
    constructor(api: RuntimeApiLike, rightManager: RightManager, organisationUnitManager: OrganisationUnitManager, sealManager: SealManager, userKeyManager: RuntimeUserKeyManager);
    saveRights(datas: PsrData[], rights: PsrDataRight[], inherit: boolean, overwrite: boolean, ignoreDatabaseAdmins?: boolean): Promise<void>;
    private applyRightsToDatas;
    private calculateChanges;
    private applyRightsToDataWithItems;
    private applyGroupRights;
    private buildOverwriteBatch;
    private findEditableRight;
    private buildPartialUpdateBatch;
    private buildRightKeyUpdate;
    private createValidDateUpdates;
    private applyRightsToSingleData;
    private normalizeValidDates;
}
export {};
