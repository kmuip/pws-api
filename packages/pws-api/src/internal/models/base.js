export const GUID_EMPTY = '00000000-0000-0000-0000-000000000000';
export class RuntimeDataModel {
    Id = GUID_EMPTY;
    TimeStampUtc = null;
    ValidTimeStampUtc = null;
    ChangedOrganisationUnit = null;
    ChangedOrganisationUnitId = null;
    PublicKey = null;
    DataStates = null;
    ParentDataBindings = null;
    ChildDataBindings = null;
    DataRights = null;
    DataTags = null;
    LogbookEntries = null;
    IsFavorite = false;
    HasTrigger = false;
    HasTriggerAlert = false;
    DataType() {
        throw new Error('DataType() not implemented');
    }
    DataName() {
        throw new Error('DataName() not implemented');
    }
    ExtendedDataName() {
        return this.DataName();
    }
    ContentSearchExpression() {
        throw new Error('ContentSearchExpression() not implemented');
    }
}
export class RuntimePsrApiException extends Error {
    ExceptionCode;
    constructor(exceptionCode = 0) {
        super(String(exceptionCode));
        this.ExceptionCode = exceptionCode;
    }
}
