import type { PsrGuid } from '../base';
export type PsrListFilterBase = {
    DataId?: PsrGuid;
    DataStates?: string[];
    ExcludeDataState?: string[];
    FilterGroups?: unknown[];
    First?: number;
    Page?: number;
    PageOrder?: string;
    PageOrderAsc?: boolean;
    PageSize?: number;
    SaveFilter?: boolean;
    TimeStampUtcFrom?: Date;
    TimeStampUtcTo?: Date;
    ValidTimeStampUtcFrom?: Date;
    ValidTimeStampUtcTo?: Date;
};
export type PsrContainerListFilter = PsrListFilterBase & {
    ContainerType?: string;
    OrderFieldAsc?: boolean;
    OrderFieldName?: string;
    OrderFieldType?: string;
};
