import type { PsrGuid } from '../base';
export type PsrDocumentData = {
    __type: string;
    DocumentData?: unknown;
    Id: PsrGuid;
    SyncOperation: string;
    TransactionId: string;
};
