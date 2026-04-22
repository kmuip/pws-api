import { runtimeEnums } from './internal/enums.js';
import { ensureNodeRuntimeCompatibility } from './internal/runtime-compat.js';
import { createRuntimeContext } from './internal/runtime-context.js';
import { createRuntimeBundle } from './internal/runtime-factory.js';
import { PsrApiTypes } from './internal/runtime-types.js';
import { getClientVersion } from './internal/utils.js';
class PsrApiCompat {
    activeDirectoryManager;
    apiKeyManager;
    applicationManager;
    authenticationManagerV2;
    containerManager;
    currentUser = null;
    dataBindingManager;
    emailVerificationManager;
    encryptionManager;
    endpoint;
    externalLinkManager;
    forwardingRuleManager;
    genericRightManager;
    licenseManager;
    logbookManager;
    mailingManager;
    oneTimePasswordManager;
    onSessionExpired = null;
    optionManager;
    organisationUnitManager;
    passwordManager;
    policyManager;
    progressToken;
    realtimeEventManager;
    rightManager;
    roleManager;
    sealManager;
    sessionExpiration = null;
    sessionState = 0;
    tagManager;
    templateManager;
    triggerManager;
    runtimeSession;
    constructor(apiUrl, options) {
        ensureNodeRuntimeCompatibility();
        const context = createRuntimeContext(apiUrl);
        this.endpoint = context.endpoint;
        this.runtimeSession = context.runtimeSession;
        Object.assign(this, createRuntimeBundle(this, context, options));
    }
    static getVersion() {
        return getClientVersion();
    }
}
export const PsrApi = PsrApiCompat;
export const PsrApiEnums = runtimeEnums;
export { PsrApiTypes };
export default PsrApi;
