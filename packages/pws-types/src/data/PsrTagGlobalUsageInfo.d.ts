import type { PsrGuid } from '../base';
import type { PsrSyncOperation } from '../enum-constants';
export type PsrTagGlobalUsageInfo = {
    Count: number;
    LastUsageUtc: Date;
    Name: string;
    SyncOperation?: PsrSyncOperation;
    TagId: PsrGuid;
    TransactionId?: PsrGuid;
};
