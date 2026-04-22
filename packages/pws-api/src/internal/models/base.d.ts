export declare const GUID_EMPTY = "00000000-0000-0000-0000-000000000000";
export declare class RuntimeDataModel {
    Id: string;
    TimeStampUtc: Date | string | null;
    ValidTimeStampUtc: Date | string | null;
    ChangedOrganisationUnit: string | null;
    ChangedOrganisationUnitId: string | null;
    PublicKey: string | null;
    DataStates: number | null;
    ParentDataBindings: unknown[] | null;
    ChildDataBindings: unknown[] | null;
    DataRights: unknown[] | null;
    DataTags: unknown[] | null;
    LogbookEntries: unknown[] | null;
    IsFavorite: boolean;
    HasTrigger: boolean;
    HasTriggerAlert: boolean;
    DataType(): void;
    DataName(): void;
    ExtendedDataName(): void;
    ContentSearchExpression(): void;
}
export declare class RuntimePsrApiException extends Error {
    ExceptionCode: number;
    constructor(exceptionCode?: number);
}
