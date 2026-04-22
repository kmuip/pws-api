import type { PsrGuid } from '../base';
export type PsrForwardingRule = {
    DescriptiveName: string;
    ForwardingParameters?: unknown;
    ForwardingType?: unknown;
    Id: PsrGuid;
    NotifyTriggerDataTypes?: unknown;
    NotifyTriggerMinimumEscalationLevel?: unknown;
    NotifyTriggerReasons?: unknown;
    OrganisationUnitId: PsrGuid;
    PsrTraceCategories?: unknown;
    PsrTraceMinimumEscalationLevel?: unknown;
    Source?: unknown;
    SyncOperation: string;
    TimeStampUtc: Date;
    TransactionId: string;
};
