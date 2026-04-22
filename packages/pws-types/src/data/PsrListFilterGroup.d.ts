import type { PsrListFilterObjectOrganisationUnit } from './PsrListFilterObject';
export type PsrListFilterGroup = {
    AndLinkedGroup?: boolean;
    Expanded?: boolean;
};
export type PsrListFilterGroupApplicationType = PsrListFilterGroup & {
    __type: string;
    ApplicationTypeFilters?: unknown[];
};
export type PsrListFilterGroupCredentialCheckResult = PsrListFilterGroup & {
    __type: string;
    CredentialCheckResults?: unknown[];
};
export type PsrListFilterGroupDataBinding = PsrListFilterGroup & {
    __type: string;
    BindingFilters?: unknown[];
};
export type PsrListFilterGroupDataObject = PsrListFilterGroup & {
    __type: string;
    DataObjectFilters?: unknown[];
};
export type PsrListFilterGroupDeactivated = PsrListFilterGroup & {
    __type: string;
};
export type PsrListFilterGroupDirectoryService = PsrListFilterGroup & {
    __type: string;
    DirectoryServiceFilters?: unknown[];
};
export type PsrListFilterGroupFavourite = PsrListFilterGroup & {
    __type: string;
    FavouriteFilters?: unknown[];
};
export type PsrListFilterGroupForm = PsrListFilterGroup & {
    __type: string;
    FormFilters?: unknown[];
};
export type PsrListFilterGroupForStringLists<T = unknown> = PsrListFilterGroup & {
    __type: string;
    StringListFilters?: T[];
    ListType?: string;
};
export type PsrListFilterGroupHasLock = PsrListFilterGroup & {
    __type: string;
    LockFilters?: unknown[];
};
export type PsrListFilterGroupHasTag = PsrListFilterGroup & {
    __type: string;
    TagFilters?: unknown[];
};
export declare const PsrListFilterGroupLogbook$Type: "PsrDataLayer.FilterObjects.ListFilterGroupLogbook, PsrDataLayer";
export type PsrListFilterGroupLogbook = PsrListFilterGroup & {
    $type: typeof PsrListFilterGroupLogbook$Type;
    LogbookFilters?: unknown[];
};
export declare const PsrListFilterGroupLogbookEvent$Type: "PsrDataLayer.FilterObjects.ListFilterGroupLogbookEvent, PsrDataLayer";
export type PsrListFilterGroupLogbookEvent = PsrListFilterGroup & {
    $type: typeof PsrListFilterGroupLogbookEvent$Type;
    EventFilters?: unknown[];
};
export declare const PsrListFilterGroupOrganisationUnit$Type: "PsrDataLayer.FilterObjects.ListFilterGroupOrganisationUnit, PsrDataLayer";
export type PsrListFilterGroupOrganisationUnit = PsrListFilterGroup & {
    $type: typeof PsrListFilterGroupOrganisationUnit$Type;
    OrganisationUnitFilter?: PsrListFilterObjectOrganisationUnit;
};
export type PsrListFilterGroupOrganisationUnitType = PsrListFilterGroup & {
    __type: string;
    TypeFilters?: PsrListFilterObjectOrganisationUnit[];
};
export type PsrListFilterGroupRight = PsrListFilterGroup & {
    __type: string;
    RightFilters?: unknown[];
};
export type PsrListFilterGroupSeal = PsrListFilterGroup & {
    __type: string;
    SealFilters?: unknown[];
};
export type PsrListFilterGroupTag = PsrListFilterGroup & {
    __type: string;
    TagValueFilters?: unknown[];
};
export type PsrListFilterGroupTrigger = PsrListFilterGroup & {
    __type: string;
    TriggerFilters?: unknown[];
};
export type PsrListFilterGroupTriggerRead = PsrListFilterGroup & {
    __type: string;
    TriggerReadFilters?: unknown[];
};
export type PsrListFilterGroupTriggerType = PsrListFilterGroup & {
    __type: string;
    TriggerTypeFilters?: unknown[];
};
