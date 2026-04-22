import { PsrGuid } from '../base';
import { PsrApplicationType, PsrCredentialCheckResult, PsrEntityObjectType, PsrLogbookEvent, PsrNotifyTriggerReason, PsrNotifyTriggerType, PsrRight } from '../enum-constants';
import { PsrContainer } from './PsrContainer';
import { PsrTag } from './PsrTag';
export type PsrListFilterObject = {
    FilterActive?: boolean | null;
    ForceShowRemoveButton?: boolean;
    Ident?: string;
};
export type PsrListFilterObjectApplicationType = PsrListFilterObject & {
    ApplicationType?: PsrApplicationType;
};
export type PsrListFilterObjectDataBinding = PsrListFilterObject & {
    BindingsType?: PsrListFilterObjectBindingType;
    ObjectId?: PsrGuid;
    ObjektType?: PsrEntityObjectType;
};
export type PsrListFilterObjectByString = PsrListFilterObject & {
    Search?: string;
};
export type PsrListFilterObjectContent = PsrListFilterObject & {
    Search?: string;
    SearchOrganisationUnits?: boolean;
    SearchTags?: boolean;
    ExactSearch?: boolean;
    ExtendedSearch?: string;
};
export type PsrListFilterObjectCredentialCheckResult = PsrListFilterObject & {
    Result?: PsrCredentialCheckResult;
};
export type PsrListFilterObjectDataObject = PsrListFilterObject & {
    DataObject?: PsrEntityObjectType;
};
export type PsrListFilterObjectDeactivated = PsrListFilterObject & {
    IsDeactivated?: boolean;
};
export type PsrListFilterObjectDirectoryService = PsrListFilterObject & {
    DirectoryServiceType?: PsrFilterDirectoryServiceType;
};
export type PsrListFilterObjectDocumentExtension = PsrListFilterObject & {
    Search?: string;
};
export type PsrListFilterObjectFavourite = PsrListFilterObject & {
    Favourite?: boolean;
};
export type PsrListFilterObjectForm = PsrListFilterObject & {
    Form?: PsrContainer;
};
export type PsrListFilterObjectHasLock = PsrListFilterObject & {
    HasLock?: boolean;
};
export type PsrListFilterObjectHasTag = PsrListFilterObject & {
    HasTag?: boolean;
};
export type PsrListFilterObjectLogbook = PsrListFilterObject & {
    DatePeriod: PsrListFilterObjectLogbookDatePeriod;
    LastLogbookEntry: boolean;
    LogbookEvent: PsrLogbookEvent;
    OnlyWithInfo: boolean;
    OrganisationUnitId: PsrGuid;
    TimeStampUtcFrom: Date;
    TimeStampUtcTo: Date;
};
export declare const PsrListFilterObjectLogbookEvent$Type: "PsrDataLayer.FilterObjects.ListFilterObjectLogbookEvent, PsrDataLayer";
export type PsrListFilterObjectLogbookEvent = PsrListFilterObject & {
    $type: typeof PsrListFilterObjectLogbookEvent$Type;
    LogbookEvent: PsrLogbookEvent;
};
export declare const PsrListFilterObjectOrganisationUnit$Type: "PsrDataLayer.FilterObjects.ListFilterObjectOrganisationUnit, PsrDataLayer";
export type PsrListFilterObjectOrganisationUnit = PsrListFilterObject & {
    $type: typeof PsrListFilterObjectOrganisationUnit$Type;
    IncludeSubOrganisationUnits?: boolean;
    SelectedOrganisationUnitId: PsrGuid;
};
export type PsrListFilterObjectOrganisationUnitType = PsrListFilterObject & {
    OrganisationUnitType: PsrFilterOrganisationUnitType;
};
export type PsrListFilterObjectRight = PsrListFilterObject & {
    CheckRightKey?: boolean;
    LegitimateId: PsrGuid;
    OwnerRight?: boolean;
    Right: PsrRight;
    SearchMembers: boolean;
};
export type PsrListFilterObjectSeal = PsrListFilterObject & {
    FilterType: PsrListFilterObjectSealType;
    LegitimateId: PsrGuid;
};
export type PsrListFilterObjectTag = PsrListFilterObject & {
    Tag: PsrTag;
};
export type PsrListFilterObjectTrigger = PsrListFilterObject & {
    Trigger: PsrNotifyTriggerReason;
};
export type PsrListFilterObjectTriggerRead = PsrListFilterObject & {
    ReadType: PsrListFilterObjectTriggerReadType;
};
export type PsrListFilterObjectTriggerType = PsrListFilterObject & {
    TriggerType: PsrNotifyTriggerType;
};
export declare enum PsrListFilterObjectBindingType {
    Parent = "Parent",
    Child = "Child",
    Both = "Both"
}
export declare enum PsrListFilterObjectLogbookDatePeriod {
    Today = "Today",
    Yesterday = "Yesterday",
    ThisWeek = "ThisWeek",
    LastWeek = "LastWeek",
    ThisMonth = "ThisMonth",
    LastMonth = "LastMonth",
    Custom = "Custom"
}
export declare enum PsrListFilterObjectSealType {
    Open = "Open",
    Closed = "Closed",
    All = "All"
}
export declare enum PsrFilterDirectoryServiceType {
    FilterDirectoryServiceTypeActiveDirectory = 0,
    FilterDirectoryServiceTypeEntraId = 1
}
export declare enum PsrFilterOrganisationUnitType {
    FilterOrganisationUnitTypeUser = 0,
    FilterOrganisationUnitTypeGroup = 1
}
export declare enum PsrListFilterObjectTriggerReadType {
    ListFilterObjectTriggerReadTypeRead = 0,
    ListFilterObjectTriggerReadTypeNotRead = 1
}
