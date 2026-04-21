import type { PsrOrganisationUnitUser } from './data'
import type { PsrApiEnumsShape } from './enums'
import type { PsrSessionState } from './enum-constants'
import type {
  ApiKeyManager,
  AuthenticationManagerV2,
  ActiveDirectoryManager,
  ApplicationManager,
  ContainerManager,
  DataBindingManager,
  EmailVerificationManager,
  EncryptionManager,
  ExternalLinkManager,
  ForwardingRuleManager,
  GenericRightManager,
  LicenseManager,
  LogbookManager,
  MailingManager,
  OneTimePasswordManager,
  OptionManager,
  OrganisationUnitManager,
  PasswordManager,
  PolicyManager,
  ProgressTokenManager,
  RealtimeEventManager,
  RightManager,
  RoleManager,
  SealManager,
  TagManager,
  TemplateManager,
  TriggerManager,
} from './managers'
import type { PsrApiOptions, PsrSessionToken } from './runtime'

export * from './base'
export * from './data'
export * from './enum-constants'
export type { PsrApiEnumsShape } from './enums'
export * from './managers'
export * from './runtime'

export type PsrApi = {
  activeDirectoryManager: ActiveDirectoryManager
  apiKeyManager: ApiKeyManager
  applicationManager: ApplicationManager
  authenticationManagerV2: AuthenticationManagerV2
  containerManager: ContainerManager
  dataBindingManager: DataBindingManager
  emailVerificationManager: EmailVerificationManager
  encryptionManager: EncryptionManager
  externalLinkManager: ExternalLinkManager
  forwardingRuleManager: ForwardingRuleManager
  genericRightManager: GenericRightManager
  licenseManager: LicenseManager
  logbookManager: LogbookManager
  mailingManager: MailingManager
  oneTimePasswordManager: OneTimePasswordManager
  optionManager: OptionManager
  organisationUnitManager: OrganisationUnitManager
  passwordManager: PasswordManager
  policyManager: PolicyManager
  progressToken: ProgressTokenManager
  realtimeEventManager: RealtimeEventManager
  rightManager: RightManager
  roleManager: RoleManager
  sealManager: SealManager
  tagManager: TagManager
  templateManager: TemplateManager
  triggerManager: TriggerManager

  endpoint: string
  sessionState: PsrSessionState
  currentUser: PsrOrganisationUnitUser | null
  sessionExpiration: Date | null
  onSessionExpired: ((expiredToken: PsrSessionToken) => void | Promise<void>) | null
}

export interface PsrApiConstructor {
  new (apiUrl: string, options?: PsrApiOptions): PsrApi
  getVersion(): string
}

declare global {
  interface Window {
    PsrApi: PsrApiConstructor
    PsrApiEnums: PsrApiEnumsShape
    PsrApiTypes: Record<string, unknown>
  }
}
