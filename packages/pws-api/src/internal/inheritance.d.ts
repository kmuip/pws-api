import type { OptionManager, PsrBatchRightItem, PsrData, PsrDataRightTemplate, PsrEntityObjectType, PsrGuid, RightManager, TemplateManager } from '@kmuip/pws-types';
type RuntimeApiLike = {
    currentUser: {
        Id: PsrGuid;
    } | null;
};
type AdditionalBatchItemsFactory = ((dataId: PsrGuid) => Promise<PsrBatchRightItem[]>) | null | undefined;
type DataRightTemplateLike = PsrDataRightTemplate & {
    Rights?: number | string[] | string;
    LegitimateId?: PsrGuid;
    OwnerRight?: boolean;
    Legitimate?: Record<string, unknown>;
};
export declare class RuntimeInheritanceManager {
    private readonly api;
    private readonly rightManager;
    private readonly templateManager;
    private readonly optionManager;
    constructor(api: RuntimeApiLike, rightManager: RightManager, templateManager: TemplateManager, optionManager: OptionManager);
    run(data: PsrData & Record<string, any>, rights: Iterable<DataRightTemplateLike> | null | undefined, additionalBatchItemsFactory?: AdditionalBatchItemsFactory, targetId?: PsrGuid | null, templateGroupId?: PsrGuid | null, dataType?: PsrEntityObjectType | null, hierarchyTargetId?: PsrGuid | null): Promise<void>;
    private applyExplicitRights;
    private applyHierarchyTemplates;
    private copyRights;
    private inheritRightsFromTarget;
    private getAdditionalBatchItems;
    private flushBatchUpdates;
}
export {};
