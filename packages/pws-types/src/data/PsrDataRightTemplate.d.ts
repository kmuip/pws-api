import type { PsrRight } from '../enum-constants/PsrRights';
import type { PsrGuid } from '../base';
export type PsrDataRightTemplate = {
    Data?: unknown;
    DataId?: PsrGuid;
    DataType?: number;
    Legitimate?: unknown;
    LegitimateId?: PsrGuid;
    OwnerRight?: boolean;
    Rights?: PsrRight;
    Target?: unknown;
    TargetId?: PsrGuid;
    TemplateGroup?: unknown;
    TemplateGroupId?: PsrGuid;
    SyncOperation?: string;
    TransactionId?: string;
};
