import type { PsrByteArray, PsrDateIsoString, PsrGuid } from './base'
import type {
  MtoHashAlgorithm,
  PsrExternalLinkType,
  PsrProgressCode,
  PsrRealtimeEventType,
  PsrServerMessageType,
} from './enum-constants'
import type {
  PsrContainer,
  PsrOrganisationUnitGroup,
  PsrOrganisationUnitUser,
  PsrRole,
} from './data'

export type ObservableLike<T> = {
  subscribe(next: (value: T) => unknown): unknown
}

export type PsrApiOptions = {
  forgeUsePureJavaScript?: boolean
  customRedirectUrl?: string
}

export type PsrSessionToken = {
  Database: string
  SessionId: string
  SessionKey: string
  ClientVersion?: string
  ClientInstanceId?: string
  ClientType?: string
  EncryptionVersion?: number
  csrfToken?: string
}

export type PsrUserKey = {
  id: PsrGuid
  privateKey: string
}

export type PsrEncryptionKeyPair = {
  privateKey: string
  publicKey: string
}

export type PsrPasswordHashResult = {
  Hash: string
  Salt: string
  HashAlgorithm: MtoHashAlgorithm | number
}

export type PsrAuthenticationFieldValue = {
  Key: string
  Name: string
  FieldType: number
  Value: string
  Requirement?: Record<string, unknown>
}

export type PsrAuthenticationRequirement = {
  Name: string
  AuthType: string
  Fields?: PsrAuthenticationFieldValue[]
  AuthorizationCode?: string
  HashAlgorithm?: number
  LoginUrl?: string
  NewPassword?: string
  OnlyShowPkiValidCertificates?: boolean
  Policy?: Record<string, unknown>
  ProviderId?: string
  QualityLevel1?: number
  QualityLevel2?: number
  RedirectUrl?: string
  RequireKeyEnciphermentFlag?: boolean
  Secret?: string
  Username?: string
  [key: string]: unknown
}

export type PsrAuthenticationRequirementSet = {
  IsConfiguration: boolean
  PossibleRequirements: PsrAuthenticationRequirement[]
}

export type PsrOneTimePassword = {
  OneTimePassword: string
  ExpirationTimestamp: Date
}

export type PsrProgressTokenInfo = {
  TokenIdentity?: string
  TokenName?: string
  Message?: string
  Percent?: number
  ProgressCode?: PsrProgressCode | number
  [key: string]: unknown
}

export type PsrServerMessagePayload = {
  Type?: PsrServerMessageType | number
  Message?: string
  [key: string]: unknown
}

export type PsrContainerChangedEvent = {
  eventType: PsrRealtimeEventType | number
  container: PsrContainer
}

export type PsrRoleChangedEvent = {
  eventType: PsrRealtimeEventType | number
  role: PsrRole
}

export type PsrUserChangedEvent = {
  eventType: PsrRealtimeEventType | number
  user: PsrOrganisationUnitUser
}

export type PsrGroupChangedEvent = {
  eventType: PsrRealtimeEventType | number
  group: PsrOrganisationUnitGroup
}

export type PsrDataBindingChangedEvent = {
  eventType: PsrRealtimeEventType | number
  dataBinding: Record<string, unknown>
}

export type PsrThisSessionClosedEvent = {
  eventType: PsrRealtimeEventType | number
}

export type PsrApiError = Error & {
  ExceptionCode?: number
  status?: number
  url?: string
  txt?: string
}

export type PsrByteArrayLike = PsrByteArray | string

export type PsrDateLike = PsrDateIsoString | Date | null

export type PsrExternalLinkRequest = {
  primaryType: PsrExternalLinkType
  primaryId: PsrGuid
  secondaryType?: PsrExternalLinkType | null
  secondaryId?: PsrGuid | null
}
