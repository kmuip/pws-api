import { MtoEncryptionChains } from './enum-constants/MtoEncryptionChain'
import { MtoHashAlgorithms } from './enum-constants/MtoHashAlgorithm'
import { PasswordGeneratorSeparator as PasswordGeneratorSeparatorConst } from './enum-constants/PasswordGeneratorSeparator'
import { PsrActiveDirectoryAuthenticationTypes } from './enum-constants/PsrActiveDirectoryAuthenticationTypes'
import { PsrApiExceptionCode as PsrApiExceptionCodeObject } from './enum-constants/PsrApiExceptionCode'
import { PsrApiKeyAccessRights } from './enum-constants/PsrApiKeyAccessRights'
import { PsrApiKeyAccessScopes } from './enum-constants/PsrApiKeyAccessScopes'
import { PsrApplicationTypes } from './enum-constants/PsrApplicationType'
import { PsrBatchRightItemTypes } from './enum-constants/PsrBatchRightItemType'
import { PsrContainerInfoFieldTypes } from './enum-constants/PsrContainerInfoFieldType'
import { PsrContainerItemDescHighlights } from './enum-constants/PsrContainerItemDescHighlight'
import { PsrContainerItemTypes } from './enum-constants/PsrContainerItemType'
import { PsrContainerTypes } from './enum-constants/PsrContainerType'
import { PsrDataStates } from './enum-constants/PsrDataStates'
import { PsrEntityObjectTypes } from './enum-constants/PsrEntityObjectType'
import { PsrExternalLinkTypes } from './enum-constants/PsrExternalLinkType'
import { PsrLicenseModules } from './enum-constants/PsrLicenseModule'
import { PsrLogbookEvents } from './enum-constants/PsrLogbookEvent'
import { PsrNotifyTriggerReasons } from './enum-constants/PsrNotifyTriggerReasons'
import { PsrNotifyTriggerTypes } from './enum-constants/PsrNotifyTriggerType'
import { PsrOptionGroups } from './enum-constants/PsrOptionGroup'
import { PsrPolicyCategories } from './enum-constants/PsrPolicyCategory'
import { PsrRights } from './enum-constants/PsrRights'
import { PsrSealOpenTypes } from './enum-constants/PsrSealOpenType'
import { PsrSealStates } from './enum-constants/PsrSealState'
import { PsrServerKeyTypes } from './enum-constants/PsrServerKeyType'
import { PsrSessionStates } from './enum-constants/PsrSessionState'
import { PsrTriggerConfigResults } from './enum-constants/PsrTriggerConfigResult'

type RuntimeEnumObject<T extends Record<string, number>> = T & {
  readonly [key: string]: string | number
}

export type PsrApiEnumsShape = {
  PsrActiveDirectoryAuthenticationTypes: RuntimeEnumObject<
    typeof PsrActiveDirectoryAuthenticationTypes
  >
  PsrApplicationType: RuntimeEnumObject<typeof PsrApplicationTypes>
  PsrBatchRightItemType: RuntimeEnumObject<typeof PsrBatchRightItemTypes>
  PsrContainerInfoFieldType: RuntimeEnumObject<typeof PsrContainerInfoFieldTypes>
  PsrContainerItemDescHighlight: RuntimeEnumObject<typeof PsrContainerItemDescHighlights>
  PsrContainerItemType: RuntimeEnumObject<typeof PsrContainerItemTypes>
  PsrContainerType: RuntimeEnumObject<typeof PsrContainerTypes>
  PsrDataStates: RuntimeEnumObject<typeof PsrDataStates>
  PsrEntityObjectType: RuntimeEnumObject<typeof PsrEntityObjectTypes>
  PsrLicenseModule: RuntimeEnumObject<typeof PsrLicenseModules>
  PsrLogbookEvent: RuntimeEnumObject<typeof PsrLogbookEvents>
  PsrNotifyTriggerReasons: RuntimeEnumObject<typeof PsrNotifyTriggerReasons>
  PsrNotifyTriggerType: RuntimeEnumObject<typeof PsrNotifyTriggerTypes>
  PsrOptionGroup: RuntimeEnumObject<typeof PsrOptionGroups>
  PsrPolicyCategory: RuntimeEnumObject<typeof PsrPolicyCategories>
  PsrRights: RuntimeEnumObject<typeof PsrRights>
  PsrSealOpenType: RuntimeEnumObject<typeof PsrSealOpenTypes>
  PsrSealState: RuntimeEnumObject<typeof PsrSealStates>
  PsrServerKeyType: RuntimeEnumObject<typeof PsrServerKeyTypes>
  PsrSessionState: RuntimeEnumObject<typeof PsrSessionStates>
  PsrApiExceptionCode: RuntimeEnumObject<typeof PsrApiExceptionCodeObject>
  PsrExternalLinkType: RuntimeEnumObject<typeof PsrExternalLinkTypes>
  PsrApiKeyAccessRights: RuntimeEnumObject<typeof PsrApiKeyAccessRights>
  PsrApiKeyAccessScopes: RuntimeEnumObject<typeof PsrApiKeyAccessScopes>
  MtoHashAlgorithm: RuntimeEnumObject<typeof MtoHashAlgorithms>
  MtoEncryptionChain: RuntimeEnumObject<typeof MtoEncryptionChains>
  PasswordGeneratorSeparator: RuntimeEnumObject<typeof PasswordGeneratorSeparatorConst>
  PsrTriggerConfigResult: RuntimeEnumObject<typeof PsrTriggerConfigResults>
}
