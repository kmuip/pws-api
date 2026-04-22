import type { PsrGuid } from '../base';
import { PsrListFilterGroup } from './PsrListFilterGroup';
export type PsrListFilter = {
    DataId?: PsrGuid;
    DataStates?: unknown;
    ExcludeDataState?: unknown;
    FilterGroups?: PsrListFilterGroup[];
    First?: unknown;
    Page?: unknown;
    PageOrder?: string;
    PageOrderAsc?: boolean;
    PageSize?: unknown;
    SaveFilter?: boolean;
    TimeStampUtcFrom?: Date;
    TimeStampUtcTo?: Date;
    ValidTimeStampUtcFrom?: Date;
    ValidTimeStampUtcTo?: Date;
};
