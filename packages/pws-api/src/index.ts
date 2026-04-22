import type {
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
  PsrApi as PsrApiShape,
  PsrApiConstructor,
  PsrApiEnumsShape,
  PsrApiOptions,
  PsrOrganisationUnitUser,
  PsrSessionState,
  PsrSessionToken,
  RealtimeEventManager,
  RightManager,
  RoleManager,
  SealManager,
  TagManager,
  TemplateManager,
  TriggerManager,
} from '@kmuip/pws-types'
import { runtimeEnums } from './internal/enums.js'
import { ensureNodeRuntimeCompatibility } from './internal/runtime-compat.js'
import { createRuntimeContext } from './internal/runtime-context.js'
import { createRuntimeBundle } from './internal/runtime-factory.js'
import { PsrApiTypes } from './internal/runtime-types.js'
import { getClientVersion } from './internal/utils.js'

export type * from '@kmuip/pws-types'

class PsrApiCompat implements PsrApiShape {
  activeDirectoryManager!: ActiveDirectoryManager
  apiKeyManager!: PsrApiShape['apiKeyManager']
  applicationManager!: ApplicationManager
  authenticationManagerV2!: PsrApiShape['authenticationManagerV2']
  containerManager!: ContainerManager
  currentUser: PsrOrganisationUnitUser | null = null
  dataBindingManager!: DataBindingManager
  emailVerificationManager!: EmailVerificationManager
  encryptionManager!: EncryptionManager
  readonly endpoint!: string
  externalLinkManager!: ExternalLinkManager
  forwardingRuleManager!: ForwardingRuleManager
  genericRightManager!: GenericRightManager
  licenseManager!: LicenseManager
  logbookManager!: LogbookManager
  mailingManager!: MailingManager
  oneTimePasswordManager!: OneTimePasswordManager
  onSessionExpired: ((expiredToken: PsrSessionToken) => void | Promise<void>) | null = null
  optionManager!: OptionManager
  organisationUnitManager!: OrganisationUnitManager
  passwordManager!: PasswordManager
  policyManager!: PolicyManager
  progressToken!: ProgressTokenManager
  realtimeEventManager!: RealtimeEventManager
  rightManager!: RightManager
  roleManager!: RoleManager
  sealManager!: SealManager
  sessionExpiration: Date | null = null
  sessionState: PsrSessionState = 0
  tagManager!: TagManager
  templateManager!: TemplateManager
  triggerManager!: TriggerManager

  private readonly runtimeSession!: ReturnType<typeof createRuntimeContext>['runtimeSession']

  constructor(apiUrl: string, options?: PsrApiOptions) {
    ensureNodeRuntimeCompatibility()

    const context = createRuntimeContext(apiUrl)
    this.endpoint = context.endpoint
    this.runtimeSession = context.runtimeSession
    Object.assign(this, createRuntimeBundle(this, context, options))
  }

  static getVersion() {
    return getClientVersion()
  }
}

export const PsrApi = PsrApiCompat as unknown as PsrApiConstructor
export type PsrApi = PsrApiShape

export const PsrApiEnums = runtimeEnums as unknown as PsrApiEnumsShape
export { PsrApiTypes }

export default PsrApi
