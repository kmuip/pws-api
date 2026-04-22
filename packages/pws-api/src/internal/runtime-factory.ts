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
  PsrBatchRightItem,
  PsrApi as PsrApiShape,
  PsrApiEnumsShape,
  PsrApiOptions,
  PsrContainer,
  PsrContainerItem,
  PsrDataRightTemplate,
  PsrGuid,
  RealtimeEventManager,
  RightManager,
  RoleManager,
  SealManager,
  TagManager,
  TemplateManager,
  TriggerManager,
} from '@kmuip/pws-types'
import { RuntimeApiKeyManager } from './api-key.js'
import { RuntimeAuthenticationManager } from './authentication.js'
import { RuntimeContainerManager } from './container.js'
import { RuntimeEncryptionManager } from './encryption-manager.js'
import { runtimeEnums } from './enums.js'
import { RuntimeExternalLinkManager } from './external-link.js'
import { RuntimeGenericRightManager } from './generic-right.js'
import { RuntimeInheritanceManager } from './inheritance.js'
import { RuntimeOneTimePasswordManager } from './one-time-password.js'
import { RuntimePasswordManager } from './password.js'
import { createRealtimeEventManager } from './realtime.js'
import {
  createAuthServiceClient,
  createDirectManager,
  createMultiFactorServiceClient,
  createWebServiceClient,
} from './service.js'
import type { RuntimeContext } from './runtime-context.js'
import { PsrApiTypes } from './runtime-types.js'
import { RuntimeUserKeyManager } from './user-key.js'

type RuntimeApiHost = PsrApiShape

type ContainerInheritanceRunner = (
  data: PsrContainer,
  rights: PsrDataRightTemplate[] | null,
  additionalBatchItemsFactory?: ((dataId: PsrGuid) => Promise<PsrBatchRightItem[]>) | null,
  targetId?: PsrGuid | null,
  templateGroupId?: PsrGuid | null,
  dataType?: number | null,
  hierarchyTargetId?: PsrGuid | null,
) => Promise<unknown>

export type RuntimeBundle = {
  activeDirectoryManager: ActiveDirectoryManager
  apiKeyManager: RuntimeApiKeyManager
  applicationManager: ApplicationManager
  authenticationManagerV2: RuntimeAuthenticationManager
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
}

function createPasswordManager() {
  return new RuntimePasswordManager({
    minimumQuality: runtimeEnums.PsrApiExceptionCode.PolicyMinimumPasswordQualityNotExceeded,
    notAllowedChars: runtimeEnums.PsrApiExceptionCode.PolicyNotAllowedChars,
    notAllowedPassword: runtimeEnums.PsrApiExceptionCode.PolicyNotAllowedPassword,
    notAllowedUsername: runtimeEnums.PsrApiExceptionCode.PolicyNotAllowedPasswordUserName,
    numbersRequired: runtimeEnums.PsrApiExceptionCode.PolicyNumbersRequired,
    passwordLengthTooShort: runtimeEnums.PsrApiExceptionCode.PolicyPasswordLengthTooShort,
    remainingCategoryRequired: runtimeEnums.PsrApiExceptionCode.PolicyRemainingCategoryRequired,
    remainingCategoriesRequired: runtimeEnums.PsrApiExceptionCode.PolicyRemainingCategoriesRequired,
    similarCharsNotAllowed: runtimeEnums.PsrApiExceptionCode.PolicySimilarCharsNotAllowed,
    specialCharsRequired: runtimeEnums.PsrApiExceptionCode.PolicySpecialCharsRequired,
    upperCaseRequired: runtimeEnums.PsrApiExceptionCode.PolicyUpperCaseRequired,
    lowerCaseRequired: runtimeEnums.PsrApiExceptionCode.PolicyLowerCaseRequired,
  })
}

export function createRuntimeBundle(
  api: RuntimeApiHost,
  context: RuntimeContext,
  options?: PsrApiOptions,
): RuntimeBundle {
  const serviceClient = createWebServiceClient(
    context.httpClient,
    context.runtimeSession,
    PsrApiTypes,
  )
  const multiFactorClient = createMultiFactorServiceClient(
    context.httpClient,
    context.runtimeSession,
  )
  const authClient = createAuthServiceClient(context.httpClient)
  const realtimeEventManager = createRealtimeEventManager(PsrApiTypes, context.realtimeConnection)
  const apiKeyManager = new RuntimeApiKeyManager(runtimeEnums as unknown as PsrApiEnumsShape)
  const encryptionManager = new RuntimeEncryptionManager()
  const passwordManager = createPasswordManager()
  const oneTimePasswordManager = new RuntimeOneTimePasswordManager(
    runtimeEnums.PsrApiExceptionCode.ContainerItemOtpMustBeBase32Encoded,
  )
  const externalLinkManager = new RuntimeExternalLinkManager()

  const activeDirectoryManager = createDirectManager<ActiveDirectoryManager>(
    'activeDirectory',
    serviceClient,
  )
  const applicationManager = createDirectManager<ApplicationManager>('application', serviceClient)
  const dataBindingManager = createDirectManager<DataBindingManager>('dataBinding', serviceClient)
  const emailVerificationManager = createDirectManager<EmailVerificationManager>(
    'emailVerification',
    serviceClient,
  )
  const forwardingRuleManager = createDirectManager<ForwardingRuleManager>(
    'forwardingRule',
    serviceClient,
  )
  const licenseManager = createDirectManager<LicenseManager>('license', serviceClient)
  const logbookManager = createDirectManager<LogbookManager>('logbook', serviceClient)
  const mailingManager = createDirectManager<MailingManager>('mailing', serviceClient)
  const optionManager = createDirectManager<OptionManager>('option', serviceClient)
  const organisationUnitManager = createDirectManager<OrganisationUnitManager>(
    'organisationUnit',
    serviceClient,
  )
  const policyManager = createDirectManager<PolicyManager>('policy', serviceClient)
  const progressToken = createDirectManager<ProgressTokenManager>('progressToken', serviceClient)
  const rightManager = createDirectManager<RightManager>('right', serviceClient)
  const roleManager = createDirectManager<RoleManager>('role', serviceClient)
  const sealManager = createDirectManager<SealManager>('seal', serviceClient)
  const tagManager = createDirectManager<TagManager>('tag', serviceClient)
  const templateManager = createDirectManager<TemplateManager>('template', serviceClient)
  const triggerManager = createDirectManager<TriggerManager>('trigger', serviceClient)

  const userKeyManager = new RuntimeUserKeyManager(
    api,
    {
      breakSeal: sealManager.breakSeal.bind(sealManager),
      getSealOpenType: (seal, dataId, legitimateId, ignoreSealKey) =>
        sealManager.getSealOpenTypeBySealId(seal.Id, dataId, legitimateId, ignoreSealKey),
      hasRelease: sealManager.hasRelease.bind(sealManager),
    },
    {
      getLegitimateDataRights: async (dataId, includeChildren, inherit) =>
        Array.from(await rightManager.getLegitimateDataRights(dataId, includeChildren, inherit)),
      getLegitimateDataRight: rightManager.getLegitimateDataRight.bind(rightManager),
    },
    {
      getUserRoles: roleManager.getUserRoles.bind(roleManager),
    },
    encryptionManager,
    {
      getDataBindingsByData: async (dataId, entityObjectType) =>
        Array.from(await dataBindingManager.getDataBindingsByData(dataId, entityObjectType as any)),
    },
    {
      getCurrentUserRightKey: multiFactorClient.getCurrentUserRightKey,
    },
    serviceClient.getContainerItemWithSecretValue as (
      itemId: string,
      reason: string,
    ) => Promise<PsrContainerItem>,
  )
  const inheritanceManager = new RuntimeInheritanceManager(
    api,
    rightManager,
    templateManager,
    optionManager,
  )
  const genericRightManager = new RuntimeGenericRightManager(
    api,
    rightManager,
    organisationUnitManager,
    sealManager,
    userKeyManager,
  )
  const containerManager = new RuntimeContainerManager(
    serviceClient as unknown as ConstructorParameters<typeof RuntimeContainerManager>[0],
    passwordManager,
    {
      run: inheritanceManager.run.bind(inheritanceManager) as unknown as ContainerInheritanceRunner,
    },
    {
      batchUpdateRights: async (batchItems) => {
        await Promise.resolve(rightManager.batchUpdateRights(batchItems))
      },
      getLegitimateDataRights: async (dataId, includeChildren, inherit) =>
        Array.from(await rightManager.getLegitimateDataRights(dataId, includeChildren, inherit)),
    },
    {
      encryptDataRightKey: userKeyManager.encryptDataRightKey.bind(userKeyManager),
      decryptContainerItem: userKeyManager.decryptContainerItem.bind(userKeyManager),
      encryptContainerItem: userKeyManager.encryptContainerItem.bind(userKeyManager),
      encryptRightKeysAndReturn: userKeyManager.encryptRightKeysAndReturn.bind(userKeyManager),
    },
    {
      getCurrentUserPublicKey: () => api.currentUser?.PublicKey ?? null,
    },
    { saveRights: genericRightManager.saveRights.bind(genericRightManager) },
    oneTimePasswordManager,
    {
      PsrContainer: PsrApiTypes.PsrContainer as unknown as new () => PsrContainer,
      PsrContainerItem: PsrApiTypes.PsrContainerItem as unknown as new () => PsrContainerItem,
    },
  )
  const authenticationManagerV2 = new RuntimeAuthenticationManager(
    api,
    context.httpClient,
    context.runtimeSession,
    organisationUnitManager,
    context.realtimeConnection,
    realtimeEventManager,
    serviceClient,
    authClient,
    (userKeys) => userKeyManager.setUserKeys(userKeys),
    options?.customRedirectUrl,
  )

  return {
    activeDirectoryManager,
    apiKeyManager,
    applicationManager,
    authenticationManagerV2,
    containerManager,
    dataBindingManager,
    emailVerificationManager,
    encryptionManager,
    externalLinkManager,
    forwardingRuleManager,
    genericRightManager,
    licenseManager,
    logbookManager,
    mailingManager,
    oneTimePasswordManager,
    optionManager,
    organisationUnitManager,
    passwordManager,
    policyManager,
    progressToken,
    realtimeEventManager,
    rightManager,
    roleManager,
    sealManager,
    tagManager,
    templateManager,
    triggerManager,
  }
}
