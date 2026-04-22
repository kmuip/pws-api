import type {
  PsrApi,
  PsrApiOptions,
  PsrActiveDirectoryProfile,
  PsrApplication,
  PsrApplicationType,
  PsrAuthenticationRequirement,
  PsrContainer,
  PsrContainerHistory,
  PsrDataBinding,
  PsrDataRight,
  PsrDataRightTemplate,
  PsrDataRightTemplateTarget,
  PsrDataRightTemplateTargetNode,
  PsrDataTagTemplate,
  PsrGuid,
  PsrLogbook,
  PsrLogbookEvent,
  PsrNotifyTriggerAlert,
  PsrNotifyTriggerAlertAdditionalData,
  PsrNotifyTriggerConfig,
  PsrNotifyTriggerReason,
  PsrNotifyTriggerType,
  PsrOption,
  PsrEntityObjectType,
  PsrOrganisationUnitGroup,
  PsrOrganisationUnitStructure,
  PsrOrganisationUnitUser,
  PsrRight,
  PsrRole,
  PsrSeal,
  PsrSealKey,
  PsrSealOpenType,
  PsrSealTemplate,
  PsrServerMessagePayload,
  PsrSessionToken,
  PsrTag,
  PsrTagGlobalUsageInfo,
  PsrTemplateGroup,
  PsrContainerChangedEvent,
  PsrRoleChangedEvent,
  PsrUserChangedEvent,
  PsrGroupChangedEvent,
  PsrDataBindingChangedEvent,
  PsrThisSessionClosedEvent,
  PsrUserKey,
} from '@kmuip/pws-api'

export type SortDirection = 'asc' | 'desc'
export type DatePreset =
  | 'last24h'
  | 'last7d'
  | 'last30d'
  | 'today'
  | 'yesterday'
  | 'thisWeek'
  | 'thisMonth'

export type ApiKeyAuthConfig = {
  type: 'apiKey'
  apiKey: string
}

export type PasswordAuthConfig = {
  type: 'password'
  database: string
  username: string
  password: string
  otp?: (() => Promise<string> | string) | undefined
}

export type OidcLoginRecord = {
  providerId: string | null
  loginUrl: string
  redirectUrl: string
  requirement: PsrAuthenticationRequirement
}

export type PwsOidcFlow = OidcLoginRecord & {
  complete(authorizationCode: string): Promise<PwsSdk>
}

export type OidcAuthConfig = {
  type: 'oidc'
  database: string
  username: string
  redirectUrl: string
  authorizationCode?: string | null
  getAuthorizationCode?: ((login: OidcLoginRecord) => Promise<string> | string) | undefined
}

export type SessionClientInfo = {
  clientInstanceId: string
  clientType: string
  clientVersion: string
}

export type CredentialDataKey = {
  Id: PsrGuid
  PrivateKey: string
}

export type CredentialDataRecord = {
  SessionId: string
  SessionKey: string
  UserKey: {
    Keys: CredentialDataKey[]
  }
  ClientType: string
  ClientInstanceId: string
  UserName: string | null
  DatabaseName: string
  EncryptionVersion: number
}

export type SessionBundle = {
  session: PsrSessionToken | ForkedSessionTokenLike
  userKeys: PsrUserKey[]
  apiKey?: string | null
  client: SessionClientInfo
}

export type SessionAuthConfig = {
  type: 'session'
  session: PsrSessionToken | ForkedSessionTokenLike
  userKeys: PsrUserKey[]
  apiKey?: string | null
}

export type ForkedSessionTokenLike = {
  Token: PsrSessionToken
  UserName?: string
  ClientVersion?: string
  ClientInstanceId?: string
  ClientType?: string
  EncryptionVersion?: number
  csrfToken?: string
}

export type CreatePwsSdkOptions = {
  url: string
  auth: ApiKeyAuthConfig | PasswordAuthConfig | OidcAuthConfig | SessionAuthConfig
  clientOptions?: PsrApiOptions
}

export type PasswordCreateInput = {
  organisationUnitId: PsrGuid
  templateId?: PsrGuid | null
  name: string
  username?: string | null
  password: string
  url?: string | null
  notes?: string | null
  otpSecret?: string | null
  tagIds?: PsrGuid[] | null
}

export type PasswordCreateFromFormInput = Omit<PasswordCreateInput, 'templateId'> & {
  formId: PsrGuid
}

export type PasswordUpdateInput = {
  name?: string | null
  username?: string | null
  password?: string | null
  url?: string | null
  notes?: string | null
  otpSecret?: string | null
  tagIds?: PsrGuid[] | null
}

export type PasswordListOptions = {
  ids?: PsrGuid[] | null
  organisationUnitId?: PsrGuid | null
  includeSubOrganisationUnits?: boolean | null
  search?: string | null
  name?: string | null
  username?: string | null
  url?: string | null
  notes?: string | null
  tagIds?: PsrGuid[] | null
  matchAllTags?: boolean | null
  page?: number | null
  pageSize?: number | null
  sortBy?: 'name' | 'username' | 'url' | 'notes' | 'id' | null
  sortDirection?: SortDirection | null
}

export type PasswordGetOptions = {
  includeSecrets?: boolean | null
  reason?: string | null
}

export type PasswordRecord = {
  id: PsrGuid
  name: string | null
  username: string | null
  url: string | null
  notes: string | null
  tagIds: PsrGuid[]
  organisationUnitId: PsrGuid | null
  raw: PsrContainer
}

export type FormRecord = {
  id: PsrGuid
  name: string | null
  organisationUnitId: PsrGuid | null
  raw: PsrContainer
}

export type PasswordSecretRecord = {
  id: PsrGuid
  password: string | null
  otpSecret: string | null
  raw: PsrContainer
}

export type PasswordHistoryRecord = {
  id: PsrGuid | null
  name: string | null
  timestampUtc: Date | string | null
  container: PsrContainer | null
  raw: PsrContainerHistory
}

export type DocumentRecord = {
  id: PsrGuid
  name: string | null
  description: string | null
  path: string | null
  documentType: string | null
  isLink: boolean
  organisationUnitId: PsrGuid | null
  raw: PsrContainer
}

export type DocumentAllowedTypesRecord = {
  allowed: string[]
  source: 'server' | 'default'
  raw: unknown
}

export type DocumentListOptions = {
  ids?: PsrGuid[] | null
  organisationUnitId?: PsrGuid | null
  includeSubOrganisationUnits?: boolean | null
  search?: string | null
  name?: string | null
  path?: string | null
  documentType?: string | null
  page?: number | null
  pageSize?: number | null
  sortBy?: 'name' | 'path' | 'documentType' | 'id' | null
  sortDirection?: SortDirection | null
}

export type DocumentCreateInput = {
  organisationUnitId: PsrGuid
  name: string
  description?: string | null
  path?: string | null
  documentType?: string | null
  isLink?: boolean | null
  filePath?: string | null
  fileName?: string | null
  content?: string | Uint8Array | ArrayBuffer | null
}

export type DocumentUpdateInput = {
  name?: string | null
  description?: string | null
  path?: string | null
  documentType?: string | null
  isLink?: boolean | null
  filePath?: string | null
  fileName?: string | null
  content?: string | Uint8Array | ArrayBuffer | null
}

export type DocumentUploadInput = Omit<DocumentCreateInput, 'isLink' | 'path'> & {
  path?: string | null
}

export type DocumentLinkInput = Omit<
  DocumentCreateInput,
  'isLink' | 'content' | 'filePath' | 'fileName'
> & {
  path: string
}

export type DocumentUploadUpdateInput = Omit<DocumentUpdateInput, 'isLink'>

export type DocumentLinkUpdateInput = Omit<
  DocumentUpdateInput,
  'isLink' | 'content' | 'filePath' | 'fileName'
>

export type ContainerRecord = {
  id: PsrGuid
  name: string | null
  containerType: number | null
  organisationUnitId: PsrGuid | null
  raw: PsrContainer
}

export type ContainerListOptions = {
  ids?: PsrGuid[] | null
  containerType?: number | null
  organisationUnitId?: PsrGuid | null
  includeSubOrganisationUnits?: boolean | null
  search?: string | null
  name?: string | null
  page?: number | null
  pageSize?: number | null
  sortBy?: 'name' | 'containerType' | 'id' | null
  sortDirection?: SortDirection | null
}

export type ContainerCloneInput = {
  organisationUnitId?: PsrGuid | null
  name?: string | null
}

export type BaseContainerCreateInput = {
  baseContainerId: PsrGuid
  newContainerType: number
  organisationUnitId?: PsrGuid | null
  name?: string | null
}

export type ContainerItemRecord = {
  id: PsrGuid
  name: string | null
  containerItemType: number | null
  value: string | null
  raw: unknown
}

export type ApplicationRecord = {
  id: PsrGuid
  name: string | null
  description: string | null
  applicationType: PsrApplicationType | number | null
  settings: string | null
  parentIds: PsrGuid[]
  raw: PsrApplication
}

export type ApplicationListOptions = {
  ids?: PsrGuid[] | null
  parentId?: PsrGuid | null
  search?: string | null
  name?: string | null
  applicationType?: PsrApplicationType | number | null
  page?: number | null
  pageSize?: number | null
  sortBy?: 'name' | 'applicationType' | 'id' | null
  sortDirection?: SortDirection | null
}

export type ApplicationCreateInput = {
  name: string
  description?: string | null
  applicationType: PsrApplicationType | number
  settings?: string | null
  parentId?: PsrGuid | null
}

export type ApplicationUpdateInput = {
  name?: string | null
  description?: string | null
  applicationType?: PsrApplicationType | number | null
  settings?: string | null
  parentId?: PsrGuid | null
}

export type TagRecord = {
  id: PsrGuid
  name: string | null
  color: string | null
  raw: PsrTag
}

export type TagCreateInput = {
  name: string
  color?: string | null
}

export type TagUpdateInput = {
  name?: string | null
  color?: string | null
}

export type TagListOptions = {
  ids?: PsrGuid[] | null
  names?: string[] | null
  search?: string | null
  color?: string | null
  systemTag?: boolean | null
  sortBy?: 'name' | 'color' | 'id' | null
  sortDirection?: SortDirection | null
}

export type TagUsageRecord = {
  id: PsrGuid
  name: string | null
  count: number
  lastUsageUtc: Date | string | null
  raw: PsrTagGlobalUsageInfo
}

export type TagUsageOptions = {
  take?: number | null
  ids?: PsrGuid[] | null
  names?: string[] | null
  search?: string | null
  minCount?: number | null
  maxCount?: number | null
  usedFrom?: Date | string | null
  usedTo?: Date | string | null
}

export type DataTagSetInput = {
  dataId: PsrGuid
  tagIds: PsrGuid[]
}

export type OrganisationUnitNode = {
  id: PsrGuid
  name: string | null
  parentId: PsrGuid | null
  path: string
  children: OrganisationUnitNode[]
  raw: PsrOrganisationUnitStructure
}

export type OrganisationUnitCreateInput = {
  parentId: PsrGuid | null
  name: string
  description?: string | null
}

export type OrganisationUnitListOptions = {
  ids?: PsrGuid[] | null
  parentId?: PsrGuid | null
  search?: string | null
  name?: string | null
  page?: number | null
  pageSize?: number | null
  sortBy?: 'name' | 'id' | null
  sortDirection?: SortDirection | null
}

export type OrganisationUnitRecord = {
  id: PsrGuid
  name: string | null
  parentId: PsrGuid | null
  raw: PsrOrganisationUnitGroup
}

export type OrganisationUnitUpdateInput = {
  name?: string | null
  description?: string | null
}

export type DeletedOrganisationUnitRecord = OrganisationUnitRecord & {
  dataStates: number | null
}

export type RoleListOptions = {
  ids?: PsrGuid[] | null
  search?: string | null
  name?: string | null
  page?: number | null
  pageSize?: number | null
  sortBy?: 'name' | 'id' | null
  sortDirection?: SortDirection | null
}

export type RoleCreateInput = {
  name: string
  description?: string | null
}

export type RoleUpdateInput = {
  name?: string | null
  description?: string | null
}

export type RoleRecord = {
  id: PsrGuid
  name: string | null
  description: string | null
  raw: PsrRole
}

export type RightRecord = {
  dataId: PsrGuid
  legitimateId: PsrGuid
  rights: number | null
  ownerRight: boolean
  securedData: boolean
  sealId: PsrGuid | null
  validFromUtc: Date | string | null
  validToUtc: Date | string | null
  raw: PsrDataRight
}

export type RightBatchItemInput = {
  itemType:
    | 'add'
    | 'update'
    | 'remove'
    | 'updateKey'
    | 'updateSeal'
    | 'updateSecuredData'
    | 'updateOwnerRight'
    | 'updateValidDate'
    | 'removeCurrentOrganisationUnit'
  dataId: PsrGuid
  legitimateId: PsrGuid
  rights?: PsrRight | null
  rightKey?: Uint8Array | string | null
  sealId?: PsrGuid | null
  securedData?: boolean | null
  ownerRight?: boolean | null
  validFrom?: Date | string | null
  validTo?: Date | string | null
}

export type GrantRightInput = {
  dataId: PsrGuid
  legitimateId: PsrGuid
  rights: PsrRight
}

export type UpdateRightInput = {
  dataId: PsrGuid
  legitimateId: PsrGuid
  rights?: PsrRight | null
  rightKey?: Uint8Array | string | null
  sealId?: PsrGuid | null
  securedData?: boolean | null
  ownerRight?: boolean | null
  validFrom?: Date | string | null
  validTo?: Date | string | null
}

export type FormListOptions = {
  ids?: PsrGuid[] | null
  search?: string | null
  name?: string | null
  page?: number | null
  pageSize?: number | null
  sortBy?: 'name' | 'id' | null
  sortDirection?: SortDirection | null
}

export type UserListOptions = {
  ids?: PsrGuid[] | null
  parentId?: PsrGuid | null
  search?: string | null
  username?: string | null
  email?: string | null
  firstName?: string | null
  lastName?: string | null
  language?: string | null
  restrictiveUser?: boolean | null
  isDeactivated?: boolean | null
  page?: number | null
  pageSize?: number | null
  sortBy?: 'username' | 'firstName' | 'lastName' | 'email' | 'id' | null
  sortDirection?: SortDirection | null
}

export type CreateLocalUserInput = {
  parentId: PsrGuid | null
  username: string
  password: string
  firstName?: string | null
  lastName?: string | null
  description?: string | null
  email?: string | null
  language?: string | null
  hasToChangePasswordOnNextLogin?: boolean | null
  restrictiveUser?: boolean | null
}

export type UpdateLocalUserInput = {
  username?: string | null
  firstName?: string | null
  lastName?: string | null
  description?: string | null
  email?: string | null
  language?: string | null
  hasToChangePasswordOnNextLogin?: boolean | null
  restrictiveUser?: boolean | null
  isDeactivated?: boolean | null
}

export type UserRecord = {
  id: PsrGuid
  username: string | null
  firstName: string | null
  lastName: string | null
  parentId: PsrGuid | null
  raw: PsrOrganisationUnitUser
}

export type ActiveDirectoryProfileRecord = {
  id: PsrGuid
  name: string | null
  domain: string | null
  syncEnabled: boolean
  raw: PsrActiveDirectoryProfile
}

export type ActiveDirectoryProfileListOptions = {
  ids?: PsrGuid[] | null
  search?: string | null
  name?: string | null
  page?: number | null
  pageSize?: number | null
  sortBy?: 'name' | 'domain' | 'id' | null
  sortDirection?: SortDirection | null
}

export type ActiveDirectoryProfileInput = {
  name?: string | null
  domain?: string | null
  raw?: Partial<PsrActiveDirectoryProfile> | null
}

export type DataBindingRecord = {
  id: string | null
  dataId: PsrGuid
  dataType: string | null
  parentDataId: PsrGuid
  parentDataType: string | null
  raw: PsrDataBinding
}

export type OptionValueRecord = {
  name: string
  category: string | null
  group: number | null
  dataId: PsrGuid | null
  parentDataId: PsrGuid | null
  value: unknown
  selected: string | null
  raw: PsrOption | null
}

export type OptionWriteInput = {
  name: string
  category: string
  group: number
  dataId?: PsrGuid | null
}

export type PasswordRotateInput = {
  password?: string | null
  reason?: string | null
  generate?: {
    mode?: 'phonetic' | 'policy' | null
    length?: number | null
    syllableCount?: number | null
    separator?: number | null
    useLeetSpeak?: boolean | null
    policyId?: PsrGuid | null
    policyCategory?: number | null
    usernames?: string[] | null
  } | null
}

export type PasswordRotateResult = {
  record: PasswordRecord
  password: string
}

export type LogbookExportRecord = {
  id: PsrGuid
  timestampUtc: Date | string | null
  dataId: PsrGuid | null
  dataName: string | null
  event: number | null
  organisationUnitId: PsrGuid | null
  info: string | null
  raw: PsrLogbook
}

export type LogbookExportResult = {
  entries: LogbookRecord[]
  rows: LogbookExportRecord[]
}

export type PasswordGenerationInput =
  | {
      mode: 'phonetic'
      length?: number | null
      syllableCount?: number | null
      separator?: number | null
      useLeetSpeak?: boolean | null
    }
  | {
      mode: 'policy'
      policyId?: PsrGuid | null
      policyCategory?: number | null
      usernames?: string[] | null
    }

export type RealtimeSubscription = {
  unsubscribe(): void
}

export type RealtimeWaitOptions<T> = {
  timeoutMs?: number | null
  predicate?: ((value: T) => boolean) | undefined
}

export type DeletedUserRecord = UserRecord & {
  dataStates: number | null
}

export type LogbookListOptions = {
  page?: number | null
  pageSize?: number | null
  dataId?: PsrGuid | null
  dataIds?: PsrGuid[] | null
  organisationUnitId?: PsrGuid | null
  organisationUnitIds?: PsrGuid[] | null
  events?: PsrLogbookEvent[] | null
  dataName?: string | null
  info?: string | null
  search?: string | null
  clientUser?: string | null
  clientIpAddress?: string | null
  onlyWithInfo?: boolean | null
  dateFrom?: Date | string | null
  dateTo?: Date | string | null
  datePreset?: DatePreset | null
  sortBy?: 'timestampUtc' | 'dataName' | 'event' | 'id' | null
  sortDirection?: SortDirection | null
}

export type LogbookRecord = {
  id: PsrGuid
  dataId: PsrGuid | null
  dataName: string | null
  event: PsrLogbookEvent | number | null
  organisationUnitId: PsrGuid | null
  info: string | null
  timestampUtc: Date | string | null
  raw: PsrLogbook
}

export type TemplateGroupListOptions = {
  ids?: PsrGuid[] | null
  organisationUnitId?: PsrGuid | null
  ignoreOrganisationUnitPath?: boolean | null
  rootOnly?: boolean | null
  parentGroupId?: PsrGuid | null
  search?: string | null
  page?: number | null
  pageSize?: number | null
  sortBy?: 'name' | 'id' | null
  sortDirection?: SortDirection | null
}

export type TemplateGroupRecord = {
  id: PsrGuid
  name: string | null
  organisationUnitId: PsrGuid | null
  parentGroupId: PsrGuid | null
  raw: PsrTemplateGroup
}

export type DataRightTemplateListOptions = {
  dataId: PsrGuid
  dataType?: PsrEntityObjectType | null
  targetId?: PsrGuid | null
  templateGroupId: PsrGuid
  hierarchical?: boolean | null
}

export type DataRightTemplateRecord = {
  dataId: PsrGuid | null
  legitimateId: PsrGuid | null
  targetId: PsrGuid | null
  templateGroupId: PsrGuid | null
  rights: PsrRight | null
  ownerRight: boolean | null
  raw: PsrDataRightTemplate
}

export type DataTagTemplateListOptions = {
  dataId: PsrGuid
  dataType?: PsrEntityObjectType | null
  targetId?: PsrGuid | null
  templateGroupId: PsrGuid
  hierarchical?: boolean | null
}

export type DataTagTemplateRecord = {
  dataId: PsrGuid | null
  targetId: PsrGuid | null
  templateGroupId: PsrGuid | null
  tagIds: PsrGuid[]
  raw: PsrDataTagTemplate
}

export type TemplateGroupCreateInput = {
  name: string
  organisationUnitId?: PsrGuid | null
  parentGroupId?: PsrGuid | null
}

export type TemplateGroupUpdateInput = {
  name?: string | null
  organisationUnitId?: PsrGuid | null
  parentGroupId?: PsrGuid | null
}

export type TemplateGroupMatch = {
  organisationUnitId?: PsrGuid | null
  parentGroupId?: PsrGuid | null
  name: string
}

export type AddRoleRightsTemplateInput = {
  dataId: PsrGuid
  legitimateId: PsrGuid
  rights: PsrRight
  templateGroupId: PsrGuid
  dataType?: PsrEntityObjectType | null
  targetId?: PsrGuid | null
}

export type AddTagTemplateInput = {
  dataId: PsrGuid
  tagIds: PsrGuid[]
  templateGroupId: PsrGuid
  dataType?: PsrEntityObjectType | null
  targetId?: PsrGuid | null
}

export type UpdateTagTemplateInput = {
  dataId: PsrGuid
  tagId: PsrGuid
  templateGroupId: PsrGuid
  dataType?: PsrEntityObjectType | null
  targetId?: PsrGuid | null
}

export type PredefinedRightTargetNode = {
  dataType: PsrEntityObjectType | null
  targetId: PsrGuid | null
  name: string | null
  templates: DataRightTemplateRecord[]
  tagTemplates: DataTagTemplateRecord[]
  children: PredefinedRightTargetNode[]
  raw: PsrDataRightTemplateTargetNode
}

export type PredefinedRightTargetMatch = {
  targetId?: PsrGuid | null
  dataType?: PsrEntityObjectType | null
  name?: string | null
}

export type PredefinedRightListOptions = {
  dataId: PsrGuid
  templateGroupId?: PsrGuid | null
  dataType?: PsrEntityObjectType | null
  targetId?: PsrGuid | null
  hierarchical?: boolean | null
}

export type SetPredefinedRightInput = {
  dataId: PsrGuid
  legitimateId: PsrGuid
  rights: PsrRight
  templateGroupId?: PsrGuid | null
  dataType?: PsrEntityObjectType | null
  targetId?: PsrGuid | null
  ownerRight?: boolean | null
}

export type RemovePredefinedRightInput = {
  dataId: PsrGuid
  legitimateId: PsrGuid
  rights: PsrRight
  templateGroupId?: PsrGuid | null
  dataType?: PsrEntityObjectType | null
  targetId?: PsrGuid | null
}

export type SetPredefinedRightOwnerInput = {
  dataId: PsrGuid
  legitimateId: PsrGuid
  ownerRight: boolean
  templateGroupId?: PsrGuid | null
  dataType?: PsrEntityObjectType | null
  targetId?: PsrGuid | null
}

export type SetPredefinedRightByTargetInput = Omit<
  SetPredefinedRightInput,
  'dataType' | 'targetId'
> & {
  target: PredefinedRightTargetMatch
}

export type RemovePredefinedRightByTargetInput = Omit<
  RemovePredefinedRightInput,
  'dataType' | 'targetId'
> & {
  target: PredefinedRightTargetMatch
}

export type SealRecord = {
  id: PsrGuid
  name: string | null
  description: string | null
  requiredReleases: number | null
  releaseRequiredAll: boolean
  allowMultiBreak: boolean
  breakRunTime: number | null
  releaseRunTime: number | null
  raw: PsrSeal
}

export type SealLegitimateInput = {
  legitimateId: PsrGuid
  type?: 'user' | 'role' | null
  sealedFor?: boolean | null
  canRelease?: boolean | null
  obligatory?: boolean | null
}

export type SealCreateInput = {
  dataId: PsrGuid
  dataType: PsrEntityObjectType
  name: string
  description?: string | null
  requiredReleases?: number | null
  releaseRequiredAll?: boolean | null
  allowMultiBreak?: boolean | null
  breakRunTime?: number | null
  releaseRunTime?: number | null
  legitimates: SealLegitimateInput[]
}

export type SealUpdateInput = {
  dataId: PsrGuid
  dataType: PsrEntityObjectType
  name?: string | null
  description?: string | null
  requiredReleases?: number | null
  releaseRequiredAll?: boolean | null
  allowMultiBreak?: boolean | null
  breakRunTime?: number | null
  releaseRunTime?: number | null
  legitimates?: SealLegitimateInput[] | null
}

export type SealKeyRecord = {
  id: PsrGuid
  sealId: PsrGuid | null
  sealKey: string | null
  raw: PsrSealKey
}

export type SealTemplateListOptions = {
  search?: string | null
  page?: number | null
  pageSize?: number | null
  sortBy?: 'name' | 'requiredReleases' | 'id' | null
  sortDirection?: SortDirection | null
}

export type SealTemplateRecord = {
  id: PsrGuid
  name: string | null
  description: string | null
  requiredReleases: number | null
  releaseRequiredAll: boolean
  allowMultiBreak: boolean
  raw: PsrSealTemplate
}

export type DeletedPasswordRecord = PasswordRecord & {
  dataStates: number | null
}

export type DeletedDocumentRecord = DocumentRecord & {
  dataStates: number | null
}

export type BinPasswordListOptions = Omit<PasswordListOptions, 'page' | 'pageSize'> & {
  page?: number | null
  pageSize?: number | null
}

export type BinDocumentListOptions = Omit<DocumentListOptions, 'page' | 'pageSize'> & {
  page?: number | null
  pageSize?: number | null
}

export type BinOrganisationUnitListOptions = Omit<
  OrganisationUnitListOptions,
  'page' | 'pageSize'
> & {
  page?: number | null
  pageSize?: number | null
}

export type BinUserListOptions = Omit<UserListOptions, 'page' | 'pageSize'> & {
  page?: number | null
  pageSize?: number | null
}

export type TriggerAlertListOptions = {
  ids?: PsrGuid[] | null
  dataId?: PsrGuid | null
  dataIds?: PsrGuid[] | null
  organisationUnitId?: PsrGuid | null
  triggerOrganisationUnitId?: PsrGuid | null
  reason?: PsrNotifyTriggerReason | null
  type?: PsrNotifyTriggerType | null
  read?: boolean | null
  search?: string | null
  info?: string | null
  dateFrom?: Date | string | null
  dateTo?: Date | string | null
  datePreset?: DatePreset | null
  page?: number | null
  pageSize?: number | null
  sortBy?: 'timestampUtc' | 'dataName' | 'id' | null
  sortDirection?: SortDirection | null
}

export type TriggerAlertRecord = {
  id: PsrGuid
  dataId: PsrGuid
  dataName: string | null
  organisationUnitId: PsrGuid | null
  triggerOrganisationUnitId: PsrGuid | null
  reason: PsrNotifyTriggerReason | null
  type: PsrNotifyTriggerType | null
  info: string | null
  read: boolean
  timestampUtc: Date | string | null
  raw: PsrNotifyTriggerAlert
}

export type TriggerAlertAdditionalDataRecord = {
  id: PsrGuid
  dataId: PsrGuid
  dataName: string | null
  notifyTriggerAlertId: PsrGuid
  raw: PsrNotifyTriggerAlertAdditionalData
}

export type TriggerConfigRecord = {
  id: PsrGuid
  organisationUnitId: PsrGuid | null
  triggerOrganisationUnitId: PsrGuid | null
  triggerDataId: PsrGuid | null
  triggerObjectType: string | null
  reason: PsrNotifyTriggerReason | null
  type: PsrNotifyTriggerType | null
  checkRights: boolean
  raw: PsrNotifyTriggerConfig
}

export type SetTriggerDataConfigInput = {
  reason: PsrNotifyTriggerReason
  dataId: PsrGuid
  overrideType?: PsrNotifyTriggerType | null
  checkRights?: boolean | null
  filterObjects?: unknown[] | null
}

export type SetTriggerOrganisationUnitConfigInput = {
  reason: PsrNotifyTriggerReason
  organisationUnitId: PsrGuid
  objectType: PsrEntityObjectType
  overrideType?: PsrNotifyTriggerType | null
  checkRights?: boolean | null
  filterObjects?: unknown[] | null
}

export type OptionGroupName =
  | 'system'
  | 'security1'
  | 'security2'
  | 'security3'
  | 'security4'
  | 'security5'
  | 'userRights'

export type PwsSdk = {
  raw: PsrApi
  logout(): Promise<void>
  sessions: {
    fork(options?: Partial<SessionClientInfo> | null): Promise<SessionBundle>
    exportCredentialData(
      options?: Partial<SessionClientInfo> | null,
    ): Promise<CredentialDataRecord>
  }
  passwords: {
    create(input: PasswordCreateInput): Promise<PasswordRecord>
    createFromForm(input: PasswordCreateFromFormInput): Promise<PasswordRecord>
    clone(
      id: PsrGuid,
      input?: PasswordUpdateInput & { organisationUnitId?: PsrGuid | null },
    ): Promise<PasswordRecord>
    rotate(id: PsrGuid, input?: PasswordRotateInput): Promise<PasswordRotateResult>
    update(id: PsrGuid, input: PasswordUpdateInput): Promise<PasswordRecord>
    get(id: PsrGuid, options?: PasswordGetOptions): Promise<PasswordRecord>
    list(options?: PasswordListOptions): Promise<PasswordRecord[]>
    delete(id: PsrGuid): Promise<void>
    getSecret(id: PsrGuid, reason?: string): Promise<PasswordSecretRecord>
    reveal(id: PsrGuid, reason?: string): Promise<string | null>
    history(id: PsrGuid): Promise<PasswordHistoryRecord[]>
    listForms(options?: FormListOptions): Promise<FormRecord[]>
  }
  documents: {
    getAllowedTypes(): Promise<DocumentAllowedTypesRecord>
    list(options?: DocumentListOptions): Promise<DocumentRecord[]>
    get(id: PsrGuid): Promise<DocumentRecord>
    create(input: DocumentCreateInput): Promise<DocumentRecord>
    createUpload(input: DocumentUploadInput): Promise<DocumentRecord>
    createLink(input: DocumentLinkInput): Promise<DocumentRecord>
    clone(
      id: PsrGuid,
      input?: Partial<DocumentUpdateInput> & { organisationUnitId?: PsrGuid | null },
    ): Promise<DocumentRecord>
    update(id: PsrGuid, input: DocumentUpdateInput): Promise<DocumentRecord>
    updateUpload(id: PsrGuid, input: DocumentUploadUpdateInput): Promise<DocumentRecord>
    updateLink(id: PsrGuid, input: DocumentLinkUpdateInput): Promise<DocumentRecord>
    delete(id: PsrGuid): Promise<void>
    history(id: PsrGuid): Promise<PasswordHistoryRecord[]>
  }
  applications: {
    list(options?: ApplicationListOptions): Promise<ApplicationRecord[]>
    get(id: PsrGuid): Promise<ApplicationRecord>
    create(input: ApplicationCreateInput): Promise<ApplicationRecord>
    update(id: PsrGuid, input: ApplicationUpdateInput): Promise<ApplicationRecord>
    attachToOrganisationUnit(id: PsrGuid, parentId: PsrGuid): Promise<void>
    detachFromOrganisationUnit(id: PsrGuid, parentId: PsrGuid): Promise<void>
    detachEverywhere(id: PsrGuid): Promise<void>
    delete?(id: PsrGuid): Promise<void>
  }
  tags: {
    list(options?: TagListOptions): Promise<TagRecord[]>
    create(input: TagCreateInput): Promise<TagRecord>
    update(id: PsrGuid, input: TagUpdateInput): Promise<TagRecord>
    delete(id: PsrGuid): Promise<void>
    getUsage(options?: TagUsageOptions): Promise<TagUsageRecord[]>
    ensure(names: string[]): Promise<TagRecord[]>
    get(id: PsrGuid): Promise<TagRecord>
    getByName(name: string): Promise<TagRecord | null>
    setForData(input: DataTagSetInput): Promise<void>
    addFavorite(dataId: PsrGuid): Promise<void>
    removeFavorite(dataId: PsrGuid): Promise<void>
  }
  favorites: {
    add(dataId: PsrGuid): Promise<void>
    remove(dataId: PsrGuid): Promise<void>
  }
  organisationUnits: {
    list(options?: OrganisationUnitListOptions): Promise<OrganisationUnitRecord[]>
    listTree(): Promise<OrganisationUnitNode[]>
    get(id: PsrGuid): Promise<OrganisationUnitRecord>
    getCurrent(): Promise<UserRecord>
    createGroup(input: OrganisationUnitCreateInput): Promise<OrganisationUnitRecord>
    updateGroup(id: PsrGuid, input: OrganisationUnitUpdateInput): Promise<OrganisationUnitRecord>
    getInvolvedOrganisationUnits(dataId: PsrGuid): Promise<PsrGuid[]>
    getImageSource(id: PsrGuid): Promise<string>
    hasMasterKeyMode(id: PsrGuid): Promise<boolean>
    deleteGroup(id: PsrGuid): Promise<void>
    resolvePath(path: string): Promise<OrganisationUnitNode | null>
  }
  roles: {
    list(options?: RoleListOptions): Promise<RoleRecord[]>
    get(id: PsrGuid): Promise<RoleRecord>
    getByName(name: string): Promise<RoleRecord | null>
    create(input: RoleCreateInput): Promise<RoleRecord>
    update(id: PsrGuid, input: RoleUpdateInput): Promise<RoleRecord>
    delete(id: PsrGuid): Promise<void>
    listUsers(roleId: PsrGuid): Promise<UserRecord[]>
    getUserRoles(userId: PsrGuid): Promise<RoleRecord[]>
    hasMasterKeyMode(id: PsrGuid): Promise<boolean>
    getInvolvedOrganisationUnits(dataId: PsrGuid): Promise<PsrGuid[]>
  }
  rights: {
    list(dataId: PsrGuid): Promise<RightRecord[]>
    listMany(
      dataIds: PsrGuid[],
      options?: { checkRights?: boolean | null; showDeletedNames?: boolean | null },
    ): Promise<RightRecord[]>
    listWithTemporalRights(
      dataId: PsrGuid,
      validFrom: Date | string,
      validTo: Date | string,
    ): Promise<RightRecord[]>
    listWithoutDeleted(dataId: PsrGuid): Promise<RightRecord[]>
    get(dataId: PsrGuid, legitimateId: PsrGuid, rights: PsrRight): Promise<RightRecord>
    grant(input: GrantRightInput): Promise<void>
    remove(dataId: PsrGuid, legitimateId: PsrGuid, rights: PsrRight): Promise<void>
    removeAll(dataId: PsrGuid, allRights?: boolean | null): Promise<PsrGuid | null>
    update(input: UpdateRightInput): Promise<void>
    batch(items: RightBatchItemInput[]): Promise<void>
    removeCurrentOrganisationUnit(dataId: PsrGuid): Promise<void>
    getCurrentConnection(dataId: PsrGuid): Promise<PsrRight | null>
    getCurrentConnectionList(dataIds: PsrGuid[]): Promise<(PsrRight | null)[]>
    getRoleCheckRight(
      dataId: PsrGuid,
      legitimateId: PsrGuid,
      rights: PsrRight,
    ): Promise<RightRecord>
    request(dataId: PsrGuid, type: PsrEntityObjectType): Promise<void>
    getDatabaseAdministratorRights(dataId: PsrGuid): Promise<RightRecord[]>
    removeAllExcept(
      dataId: PsrGuid,
      excludedLegitimateIds: PsrGuid[],
      excludeCurrentUserOrRoleRight?: boolean | null,
    ): Promise<PsrGuid | null>
  }
  templates: {
    listGroups(options?: TemplateGroupListOptions): Promise<TemplateGroupRecord[]>
    getGroup(id: PsrGuid): Promise<TemplateGroupRecord>
    getGroupByName(match: TemplateGroupMatch): Promise<TemplateGroupRecord | null>
    ensureGroup(input: TemplateGroupCreateInput): Promise<TemplateGroupRecord>
    createGroup(input: TemplateGroupCreateInput): Promise<TemplateGroupRecord>
    updateGroup(id: PsrGuid, input: TemplateGroupUpdateInput): Promise<TemplateGroupRecord>
    deleteGroup(id: PsrGuid): Promise<void>
    getGroupCount(organisationUnitId: PsrGuid): Promise<number>
    listRootGroups(organisationUnitId?: PsrGuid | null): Promise<TemplateGroupRecord[]>
    getDefaultGroupId(
      organisationUnitId: PsrGuid,
      options?: { ignoreParents?: boolean | null },
    ): Promise<PsrGuid>
    setDefaultGroup(organisationUnitId: PsrGuid, templateGroupId: PsrGuid): Promise<void>
    listDataRightTemplates(
      options: DataRightTemplateListOptions,
    ): Promise<DataRightTemplateRecord[]>
    listDataTagTemplates(options: DataTagTemplateListOptions): Promise<DataTagTemplateRecord[]>
    addRoleRights(input: AddRoleRightsTemplateInput): Promise<void>
    updateRoleRights(input: AddRoleRightsTemplateInput): Promise<void>
    setRoleOwnerRight(
      input: SetPredefinedRightOwnerInput & { templateGroupId: PsrGuid },
    ): Promise<void>
    removeRoleRights(input: AddRoleRightsTemplateInput): Promise<void>
    removeAllRoleRights(dataId: PsrGuid): Promise<void>
    addTags(input: AddTagTemplateInput): Promise<void>
    updateTag(input: UpdateTagTemplateInput): Promise<void>
    removeTags(input: AddTagTemplateInput): Promise<void>
    removeAllTags(dataId: PsrGuid): Promise<void>
    getDataRightTemplate(input: {
      dataId: PsrGuid
      legitimateId: PsrGuid
      dataType?: PsrEntityObjectType | null
      targetId: PsrGuid
      templateGroupId: PsrGuid
    }): Promise<DataRightTemplateRecord>
    getDataTagTemplate(input: {
      dataId: PsrGuid
      dataType?: PsrEntityObjectType | null
      targetId?: PsrGuid | null
      templateGroupId: PsrGuid
    }): Promise<DataTagTemplateRecord>
    getTargets(dataId?: PsrGuid | null): Promise<PsrDataRightTemplateTarget[]>
  }
  predefinedRights: {
    getTargetTree(dataId: PsrGuid): Promise<PredefinedRightTargetNode>
    findTarget(
      dataId: PsrGuid,
      match: PredefinedRightTargetMatch,
    ): Promise<PredefinedRightTargetNode | null>
    list(options: PredefinedRightListOptions): Promise<DataRightTemplateRecord[]>
    set(input: SetPredefinedRightInput): Promise<void>
    setByTarget(input: SetPredefinedRightByTargetInput): Promise<void>
    remove(input: RemovePredefinedRightInput): Promise<void>
    removeByTarget(input: RemovePredefinedRightByTargetInput): Promise<void>
    setOwnerRight(input: SetPredefinedRightOwnerInput): Promise<void>
  }
  seals: {
    get(id: PsrGuid): Promise<SealRecord>
    create(input: SealCreateInput): Promise<SealRecord>
    update(id: PsrGuid, input: SealUpdateInput): Promise<SealRecord>
    delete(id: PsrGuid): Promise<void>
    break(id: PsrGuid): Promise<SealRecord>
    hasRelease(sealId: PsrGuid, legitimateId: PsrGuid): Promise<boolean>
    getOpenType(
      sealId: PsrGuid,
      dataId: PsrGuid,
      userId: PsrGuid,
      ignoreSealKey?: boolean | null,
    ): Promise<PsrSealOpenType>
    clearReleasesForUser(sealId: PsrGuid, legitimateId: PsrGuid): Promise<void>
    getKey(sealKeyId: PsrGuid, legitimateId: PsrGuid): Promise<SealKeyRecord>
    updateKeyRelease(
      release: PsrSealKey,
      dataId: PsrGuid,
      dataType: PsrEntityObjectType,
    ): Promise<void>
    listTemplates(options?: SealTemplateListOptions): Promise<SealTemplateRecord[]>
    getTemplateInvolvedOrganisationUnits(dataId: PsrGuid): Promise<PsrGuid[]>
  }
  triggers: {
    listAlerts(options?: TriggerAlertListOptions): Promise<TriggerAlertRecord[]>
    countAlerts(options?: TriggerAlertListOptions): Promise<number>
    getAlertAdditionalData(alertId: PsrGuid): Promise<TriggerAlertAdditionalDataRecord[]>
    markRead(alertIds: PsrGuid[], read?: boolean): Promise<void>
    getConfigForData(dataId: PsrGuid): Promise<TriggerConfigRecord[]>
    getConfigForObject(
      organisationUnitId: PsrGuid,
      objectType: PsrEntityObjectType,
    ): Promise<TriggerConfigRecord[]>
    hasConfigForData(dataId: PsrGuid, dataType: PsrEntityObjectType): Promise<unknown>
    setConfigForData(input: SetTriggerDataConfigInput): Promise<void>
    setConfigForOrganisationUnit(input: SetTriggerOrganisationUnitConfigInput): Promise<void>
    removeConfigForData(reason: PsrNotifyTriggerReason, dataId: PsrGuid): Promise<void>
    removeConfigForOrganisationUnit(
      reason: PsrNotifyTriggerReason,
      organisationUnitId: PsrGuid,
      objectType: PsrEntityObjectType,
    ): Promise<void>
  }
  users: {
    list(options?: UserListOptions): Promise<UserRecord[]>
    get(id: PsrGuid): Promise<UserRecord>
    getCurrent(): Promise<UserRecord>
    createLocalUser(input: CreateLocalUserInput): Promise<UserRecord>
    update(id: PsrGuid, input: UpdateLocalUserInput): Promise<UserRecord>
    setDeactivated(id: PsrGuid, isDeactivated: boolean): Promise<UserRecord>
    getInvolvedOrganisationUnits(dataId: PsrGuid): Promise<PsrGuid[]>
    getImageSource(id: PsrGuid): Promise<string>
    hasMasterKeyMode(id: PsrGuid): Promise<boolean>
    delete(id: PsrGuid): Promise<void>
  }
  bin: {
    listPasswords(options?: BinPasswordListOptions): Promise<DeletedPasswordRecord[]>
    listDocuments(options?: BinDocumentListOptions): Promise<DeletedDocumentRecord[]>
    listOrganisationUnits(
      options?: BinOrganisationUnitListOptions,
    ): Promise<DeletedOrganisationUnitRecord[]>
    listUsers(options?: BinUserListOptions): Promise<DeletedUserRecord[]>
    purgePassword(id: PsrGuid): Promise<void>
    purgeDocument(id: PsrGuid): Promise<void>
    purgeOrganisationUnit(id: PsrGuid): Promise<void>
    purgeUser(id: PsrGuid): Promise<void>
  }
  logbook: {
    list(options?: LogbookListOptions): Promise<LogbookRecord[]>
    count(options?: LogbookListOptions): Promise<number>
    get(id: PsrGuid): Promise<LogbookRecord>
    export(options?: LogbookListOptions): Promise<LogbookExportResult>
  }
  containersSdk: {
    list(options?: ContainerListOptions): Promise<ContainerRecord[]>
    get(id: PsrGuid): Promise<ContainerRecord>
    clone(id: PsrGuid, input?: ContainerCloneInput): Promise<ContainerRecord>
    createFromBaseContainer(input: BaseContainerCreateInput): Promise<ContainerRecord>
    delete(id: PsrGuid): Promise<void>
    history(containerType: number, id: PsrGuid): Promise<PasswordHistoryRecord[]>
    getItem(id: PsrGuid): Promise<ContainerItemRecord>
    revealItem(id: PsrGuid, reason?: string): Promise<string | null>
    credentialCheck(id: PsrGuid): Promise<unknown>
  }
  optionValues: {
    get(name: string, data?: unknown): Promise<OptionValueRecord>
    getString(name: string, data?: unknown): Promise<string | null>
    getBoolean(name: string, data?: unknown): Promise<boolean | null>
    getNumber(name: string, data?: unknown): Promise<number | null>
    getList(name: string, data?: unknown, separator?: string): Promise<string[]>
    setString(input: OptionWriteInput, value: string): Promise<void>
    setBoolean(input: OptionWriteInput, value: boolean): Promise<void>
    setNumber(input: OptionWriteInput, value: number): Promise<void>
    setList(input: OptionWriteInput, value: string): Promise<void>
    delete(name: string, dataId?: PsrGuid | null): Promise<void>
    getAllowedDocumentTypes(data?: unknown): Promise<string[]>
  }
  activeDirectorySync: {
    listProfiles(
      options?: ActiveDirectoryProfileListOptions,
    ): Promise<ActiveDirectoryProfileRecord[]>
    getProfileListFilter(defaultFilter?: boolean): Promise<unknown>
    getInvolvedOrganisationUnits(dataId: PsrGuid): Promise<PsrGuid[]>
    createProfile(input: ActiveDirectoryProfileInput): Promise<void>
    updateProfile(id: PsrGuid, input: ActiveDirectoryProfileInput): Promise<void>
    deleteProfile(id: PsrGuid): Promise<void>
    checkConnection(input: {
      profileId?: PsrGuid | null
      domainName: string
      userName: string
      authTypes: unknown
      encryptedUserPassword?: string | null
    }): Promise<boolean>
    getRootElements(
      profileId: PsrGuid,
      cnFilter?: string | null,
    ): Promise<Record<string, unknown>[]>
    getMembersOfGroup(profileId: PsrGuid, objectGuid: string): Promise<Record<string, unknown>[]>
    getElements(
      profileId: PsrGuid,
      elementName: string,
      search: string,
      fullSearch?: boolean | null,
    ): Promise<Record<string, unknown>[]>
    getSpecificElements(
      profileId: PsrGuid,
      objectGuids: string[],
    ): Promise<Record<string, unknown>[]>
    import(
      profileId: PsrGuid,
      newActiveDirectoryObjects: Record<string, unknown>[],
      excludeItems: Record<string, unknown>[],
      parentOrganisationUnitId?: PsrGuid | null,
      tokenIdentity?: string | null,
    ): Promise<void>
    sync(profileId: PsrGuid, tokenIdentity?: string | null): Promise<void>
    generateSummaryDetails(
      profileId: PsrGuid,
      newActiveDirectoryObjects: Record<string, unknown>[],
      excludeItems: Record<string, unknown>[],
      parentOrganisationUnitId?: PsrGuid | null,
      tokenIdentity?: string | null,
      withSyncInfo?: boolean | null,
    ): Promise<void>
    getSummaryDetails(tokenIdentity: string): Promise<Record<string, unknown>>
  }
  dataBindingsSdk: {
    listByData(dataId: PsrGuid, parentType?: number | null): Promise<DataBindingRecord[]>
    listByParent(parentId: PsrGuid, dataType?: number | null): Promise<DataBindingRecord[]>
    add(dataId: PsrGuid, dataType: number, parentId: PsrGuid, parentType: number): Promise<void>
    remove(id: PsrGuid, parentId: PsrGuid): Promise<void>
    removeAll(dataId: PsrGuid, parentType?: number | null): Promise<void>
    replaceAll(
      dataId: PsrGuid,
      dataType: number,
      parentIds: PsrGuid[],
      parentType: number,
    ): Promise<void>
  }
  passwordGeneration: {
    strength(password: string): number
    generate(input: PasswordGenerationInput): Promise<string>
    validate(input: {
      password: string
      policyId?: PsrGuid | null
      policyCategory?: number | null
      usernames?: string[] | null
    }): Promise<ReturnType<PsrApi['passwordManager']['validatePassword']>>
  }
  subscriptions: {
    onServerMessage(
      next: (value: { serverMessage: PsrServerMessagePayload }) => unknown,
    ): RealtimeSubscription
    onContainerChanged(next: (value: PsrContainerChangedEvent) => unknown): RealtimeSubscription
    onRoleChanged(next: (value: PsrRoleChangedEvent) => unknown): RealtimeSubscription
    onUserChanged(next: (value: PsrUserChangedEvent) => unknown): RealtimeSubscription
    onGroupChanged(next: (value: PsrGroupChangedEvent) => unknown): RealtimeSubscription
    onDataBindingChanged(next: (value: PsrDataBindingChangedEvent) => unknown): RealtimeSubscription
    onSessionClosed(next: (value: PsrThisSessionClosedEvent) => unknown): RealtimeSubscription
    onceServerMessage(
      options?: RealtimeWaitOptions<{ serverMessage: PsrServerMessagePayload }>,
    ): Promise<{ serverMessage: PsrServerMessagePayload }>
    onceContainerChanged(options?: RealtimeWaitOptions<PsrContainerChangedEvent>): Promise<PsrContainerChangedEvent>
    onceRoleChanged(options?: RealtimeWaitOptions<PsrRoleChangedEvent>): Promise<PsrRoleChangedEvent>
    onceUserChanged(options?: RealtimeWaitOptions<PsrUserChangedEvent>): Promise<PsrUserChangedEvent>
    onceGroupChanged(options?: RealtimeWaitOptions<PsrGroupChangedEvent>): Promise<PsrGroupChangedEvent>
    onceDataBindingChanged(
      options?: RealtimeWaitOptions<PsrDataBindingChangedEvent>,
    ): Promise<PsrDataBindingChangedEvent>
    onceSessionClosed(options?: RealtimeWaitOptions<PsrThisSessionClosedEvent>): Promise<PsrThisSessionClosedEvent>
  }
  passwordTools: PsrApi['passwordManager']
  oneTimePasswords: PsrApi['oneTimePasswordManager']
  auth: PsrApi['authenticationManagerV2']
  containers: PsrApi['containerManager']
  encryption: PsrApi['encryptionManager']
  activeDirectory: PsrApi['activeDirectoryManager']
  apiKeys: PsrApi['apiKeyManager']
  dataBindings: PsrApi['dataBindingManager']
  emailVerification: PsrApi['emailVerificationManager']
  externalLinks: PsrApi['externalLinkManager']
  forwardingRules: PsrApi['forwardingRuleManager']
  genericRights: PsrApi['genericRightManager']
  licenses: PsrApi['licenseManager']
  mailing: PsrApi['mailingManager']
  options: PsrApi['optionManager']
  policies: PsrApi['policyManager']
  progressTokens: PsrApi['progressToken']
  realtime: PsrApi['realtimeEventManager']
}
