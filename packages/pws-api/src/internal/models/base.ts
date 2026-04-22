export const GUID_EMPTY = '00000000-0000-0000-0000-000000000000'

export class RuntimeDataModel {
  Id: string = GUID_EMPTY
  TimeStampUtc: Date | string | null = null
  ValidTimeStampUtc: Date | string | null = null
  ChangedOrganisationUnit: string | null = null
  ChangedOrganisationUnitId: string | null = null
  PublicKey: string | null = null
  DataStates: number | null = null
  ParentDataBindings: unknown[] | null = null
  ChildDataBindings: unknown[] | null = null
  DataRights: unknown[] | null = null
  DataTags: unknown[] | null = null
  LogbookEntries: unknown[] | null = null
  IsFavorite = false
  HasTrigger = false
  HasTriggerAlert = false

  DataType() {
    throw new Error('DataType() not implemented')
  }

  DataName() {
    throw new Error('DataName() not implemented')
  }

  ExtendedDataName() {
    return this.DataName()
  }

  ContentSearchExpression() {
    throw new Error('ContentSearchExpression() not implemented')
  }
}

export class RuntimePsrApiException extends Error {
  ExceptionCode: number

  constructor(exceptionCode = 0) {
    super(String(exceptionCode))
    this.ExceptionCode = exceptionCode
  }
}
