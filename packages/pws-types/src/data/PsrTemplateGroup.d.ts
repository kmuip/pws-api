import type { PsrGuid } from '../base';
import type { PsrSyncOperation } from '../enum-constants';
import type { PsrOrganisationUnit } from './PsrOrganisationUnit';
export interface PsrTemplateGroup {
    Id: PsrGuid;
    Name?: string;
    OrganisationUnit?: PsrOrganisationUnit;
    OrganisationUnitId?: PsrGuid;
    ParentGroup?: PsrTemplateGroup;
    ParentGroupId?: PsrGuid;
    SyncOperation?: PsrSyncOperation;
    TimeStampUtc?: Date;
    TransactionId?: PsrGuid;
}
