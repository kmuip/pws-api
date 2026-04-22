import { RuntimeApiKeyManager } from './api-key.js';
import { RuntimeAuthenticationManager } from './authentication.js';
import { RuntimeContainerManager } from './container.js';
import { RuntimeEncryptionManager } from './encryption-manager.js';
import { runtimeEnums } from './enums.js';
import { RuntimeExternalLinkManager } from './external-link.js';
import { RuntimeGenericRightManager } from './generic-right.js';
import { RuntimeInheritanceManager } from './inheritance.js';
import { RuntimeOneTimePasswordManager } from './one-time-password.js';
import { RuntimePasswordManager } from './password.js';
import { createRealtimeEventManager } from './realtime.js';
import { createAuthServiceClient, createDirectManager, createMultiFactorServiceClient, createWebServiceClient, } from './service.js';
import { PsrApiTypes } from './runtime-types.js';
import { RuntimeUserKeyManager } from './user-key.js';
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
    });
}
export function createRuntimeBundle(api, context, options) {
    const serviceClient = createWebServiceClient(context.httpClient, context.runtimeSession, PsrApiTypes);
    const multiFactorClient = createMultiFactorServiceClient(context.httpClient, context.runtimeSession);
    const authClient = createAuthServiceClient(context.httpClient);
    const realtimeEventManager = createRealtimeEventManager(PsrApiTypes, context.realtimeConnection);
    const apiKeyManager = new RuntimeApiKeyManager(runtimeEnums);
    const encryptionManager = new RuntimeEncryptionManager();
    const passwordManager = createPasswordManager();
    const oneTimePasswordManager = new RuntimeOneTimePasswordManager(runtimeEnums.PsrApiExceptionCode.ContainerItemOtpMustBeBase32Encoded);
    const externalLinkManager = new RuntimeExternalLinkManager();
    const activeDirectoryManager = createDirectManager('activeDirectory', serviceClient);
    const applicationManager = createDirectManager('application', serviceClient);
    const dataBindingManager = createDirectManager('dataBinding', serviceClient);
    const emailVerificationManager = createDirectManager('emailVerification', serviceClient);
    const forwardingRuleManager = createDirectManager('forwardingRule', serviceClient);
    const licenseManager = createDirectManager('license', serviceClient);
    const logbookManager = createDirectManager('logbook', serviceClient);
    const mailingManager = createDirectManager('mailing', serviceClient);
    const optionManager = createDirectManager('option', serviceClient);
    const organisationUnitManager = createDirectManager('organisationUnit', serviceClient);
    const policyManager = createDirectManager('policy', serviceClient);
    const progressToken = createDirectManager('progressToken', serviceClient);
    const rightManager = createDirectManager('right', serviceClient);
    const roleManager = createDirectManager('role', serviceClient);
    const sealManager = createDirectManager('seal', serviceClient);
    const tagManager = createDirectManager('tag', serviceClient);
    const templateManager = createDirectManager('template', serviceClient);
    const triggerManager = createDirectManager('trigger', serviceClient);
    const userKeyManager = new RuntimeUserKeyManager(api, {
        breakSeal: sealManager.breakSeal.bind(sealManager),
        getSealOpenType: (seal, dataId, legitimateId, ignoreSealKey) => sealManager.getSealOpenTypeBySealId(seal.Id, dataId, legitimateId, ignoreSealKey),
        hasRelease: sealManager.hasRelease.bind(sealManager),
    }, {
        getLegitimateDataRights: async (dataId, includeChildren, inherit) => Array.from(await rightManager.getLegitimateDataRights(dataId, includeChildren, inherit)),
        getLegitimateDataRight: rightManager.getLegitimateDataRight.bind(rightManager),
    }, {
        getUserRoles: roleManager.getUserRoles.bind(roleManager),
    }, encryptionManager, {
        getDataBindingsByData: async (dataId, entityObjectType) => Array.from(await dataBindingManager.getDataBindingsByData(dataId, entityObjectType)),
    }, {
        getCurrentUserRightKey: multiFactorClient.getCurrentUserRightKey,
    }, serviceClient.getContainerItemWithSecretValue);
    const inheritanceManager = new RuntimeInheritanceManager(api, rightManager, templateManager, optionManager);
    const genericRightManager = new RuntimeGenericRightManager(api, rightManager, organisationUnitManager, sealManager, userKeyManager);
    const containerManager = new RuntimeContainerManager(serviceClient, passwordManager, {
        run: inheritanceManager.run.bind(inheritanceManager),
    }, {
        batchUpdateRights: async (batchItems) => {
            await Promise.resolve(rightManager.batchUpdateRights(batchItems));
        },
        getLegitimateDataRights: async (dataId, includeChildren, inherit) => Array.from(await rightManager.getLegitimateDataRights(dataId, includeChildren, inherit)),
    }, {
        encryptDataRightKey: userKeyManager.encryptDataRightKey.bind(userKeyManager),
        decryptContainerItem: userKeyManager.decryptContainerItem.bind(userKeyManager),
        encryptContainerItem: userKeyManager.encryptContainerItem.bind(userKeyManager),
        encryptRightKeysAndReturn: userKeyManager.encryptRightKeysAndReturn.bind(userKeyManager),
    }, {
        getCurrentUserPublicKey: () => api.currentUser?.PublicKey ?? null,
    }, { saveRights: genericRightManager.saveRights.bind(genericRightManager) }, oneTimePasswordManager, {
        PsrContainer: PsrApiTypes.PsrContainer,
        PsrContainerItem: PsrApiTypes.PsrContainerItem,
    });
    const authenticationManagerV2 = new RuntimeAuthenticationManager(api, context.httpClient, context.runtimeSession, organisationUnitManager, context.realtimeConnection, realtimeEventManager, serviceClient, authClient, (userKeys) => userKeyManager.setUserKeys(userKeys), options?.customRedirectUrl);
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
    };
}
