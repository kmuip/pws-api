import { parseApiKey } from './api-key.js';
import { normalizeBinaryValue } from './mto-crypto.js';
import { fromBase64, getClientInformation, toBase64 } from './utils.js';
import { buildConfigurationRequest, buildCredentialRequest, createAuthRequest, findRequirementByType, replaceFilledRequirement, } from './auth/requests.js';
import { isCompletedAuthentication, isObject, isUserKeySignatureRequirement, parseRequirementSet, trackAuthStep, throwOnFailedLogin, getLatestAuthStep, } from './auth/requirements.js';
import { handleClosedSession, logoutSession, setSessionState } from './auth/session.js';
import { createAuthState, resetLoginState } from './auth/state.js';
import { createAuthenticationError } from './auth/types.js';
function toBinaryString(value) {
    return typeof value === 'string' ? value : Buffer.from(value).toString('binary');
}
export class RuntimeAuthenticationManager {
    api;
    httpClient;
    runtimeSession;
    organisationUnitManager;
    realtimeConnection;
    serviceClient;
    authServiceClient;
    onUserKeysChanged;
    customRedirectUrl;
    state = createAuthState(getClientInformation());
    sessionDeps;
    constructor(api, httpClient, runtimeSession, organisationUnitManager, realtimeConnection, realtimeEventManager, serviceClient, authServiceClient, onUserKeysChanged, customRedirectUrl) {
        this.api = api;
        this.httpClient = httpClient;
        this.runtimeSession = runtimeSession;
        this.organisationUnitManager = organisationUnitManager;
        this.realtimeConnection = realtimeConnection;
        this.serviceClient = serviceClient;
        this.authServiceClient = authServiceClient;
        this.onUserKeysChanged = onUserKeysChanged;
        this.customRedirectUrl = customRedirectUrl;
        this.sessionDeps = {
            api,
            runtimeSession,
            organisationUnitManager,
            realtimeConnection,
            serviceClient,
            onUserKeysChanged,
        };
        realtimeEventManager.thisSessionClosed.subscribe(() => {
            void handleClosedSession(this.sessionDeps, this.state);
        });
    }
    get isAuthenticated() {
        return this.state.isAuthenticated;
    }
    async loginWithApiKey(apiKey) {
        if (!apiKey) {
            throw createAuthenticationError('API key is null or undefined');
        }
        const parsedApiKey = parseApiKey(apiKey);
        const authenticateApiKeyResult = await this.httpClient.post('Auth', 'AuthenticateApiKey', {
            credential: {
                JsonWebToken: parsedApiKey.jsonWebToken,
                ClientInformation: getClientInformation(),
            },
        }, false);
        let currentUserPrivateKey = parsedApiKey.apiKeyPrivateKey;
        let completedAuthentication = authenticateApiKeyResult;
        if (isUserKeySignatureRequirement(authenticateApiKeyResult)) {
            const encryptionVersion = authenticateApiKeyResult.EncryptionVersion ?? 0;
            this.api.encryptionManager.setEncryptionVersion(encryptionVersion);
            if (authenticateApiKeyResult.UserKey) {
                currentUserPrivateKey = normalizeBinaryValue(await this.api.encryptionManager.decrypt(parsedApiKey.apiKeyPrivateKey, fromBase64(authenticateApiKeyResult.UserKey)));
            }
            const challengeSignature = await this.api.encryptionManager.signData(fromBase64(authenticateApiKeyResult.Challenge), currentUserPrivateKey);
            completedAuthentication = await this.httpClient.post('Auth', 'AuthenticateUserKeySignatureCredential', {
                credential: {
                    Database: parsedApiKey.claims.dbn ?? null,
                    Username: parsedApiKey.claims.usrn ?? null,
                    SessionId: authenticateApiKeyResult.SessionId,
                    OperationMode: this.state.operationMode,
                    ClientInformation: this.state.clientInformation,
                    Challenge: authenticateApiKeyResult.Challenge,
                    ChallengeSignature: authenticateApiKeyResult.ChallengeSignature,
                    UserKeyChallengeSignature: toBase64(toBinaryString(challengeSignature)),
                },
            }, false);
        }
        if (!isCompletedAuthentication(completedAuthentication)) {
            throw createAuthenticationError('Unsupported authentication result received from server', completedAuthentication);
        }
        const userKeys = await this.decryptUserKeys(completedAuthentication.UserId, currentUserPrivateKey, completedAuthentication.EncryptedRoleRightKey);
        await this.setSession({
            Database: parsedApiKey.claims.dbn ?? '',
            SessionId: completedAuthentication.SessionId,
            SessionKey: completedAuthentication.SessionKey,
        }, userKeys, parsedApiKey.jsonWebToken);
    }
    startLogin(database, username) {
        resetLoginState(this.state, database, username);
        return this.authServiceClient
            .getFirstAuthentication(createAuthRequest(this.state, {
            CustomRedirectUrl: this.customRedirectUrl ?? null,
        }))
            .then((step) => this.processAuthStep(step));
    }
    getNameOfUser() {
        return this.state.nameOfUser;
    }
    getUserImage() {
        return this.state.userImage;
    }
    async getNextRequirement() {
        return parseRequirementSet(getLatestAuthStep(this.state), this.state);
    }
    async authenticate(requirement) {
        if (!requirement) {
            throw new Error('requirement needs to be filled');
        }
        replaceFilledRequirement(this.state, requirement);
        const currentStep = getLatestAuthStep(this.state);
        if (isCompletedAuthentication(currentStep)) {
            return;
        }
        if (isObject(currentStep) &&
            typeof currentStep.$type === 'string' &&
            currentStep.$type.includes('PossibleAuthCredentialRequirements')) {
            const rawRequirement = findRequirementByType(currentStep.PossibleAuthenticationCredentialRequirements, requirement);
            if (!rawRequirement) {
                throw new Error('Server credential requirement was not found.');
            }
            const credential = await buildCredentialRequest({
                api: this.api,
                state: this.state,
                customRedirectUrl: this.customRedirectUrl,
            }, rawRequirement, requirement);
            const nextStep = await this.authServiceClient.authenticate(credential);
            await this.processAuthStep(nextStep);
            return;
        }
        if (isObject(currentStep) &&
            typeof currentStep.$type === 'string' &&
            currentStep.$type.includes('PossibleAuthConfigurationRequirements')) {
            const rawRequirement = findRequirementByType(currentStep.PossibleAuthenticationConfigurationRequirements, requirement);
            if (!rawRequirement) {
                throw new Error('Server config requirement was not found');
            }
            const config = await buildConfigurationRequest({
                api: this.api,
                state: this.state,
                customRedirectUrl: this.customRedirectUrl,
            }, rawRequirement, requirement);
            const nextStep = await this.authServiceClient.configureAuthentication(config);
            await this.processAuthStep(nextStep);
        }
    }
    forkSession(clientInstanceId, clientType, clientVersion) {
        return this.serviceClient.forkSession(clientInstanceId, clientType, clientVersion);
    }
    getUserKeys() {
        return [...this.runtimeSession.userKeys];
    }
    logout() {
        return logoutSession(this.sessionDeps, this.state);
    }
    setSession(authToken, userKeys, apiKey) {
        return setSessionState(this.sessionDeps, this.state, authToken, userKeys, apiKey);
    }
    async decryptUserKeys(userId, currentUserPrivateKey, encryptedRoleRightKeys) {
        const userKeys = [{ id: userId, privateKey: currentUserPrivateKey }];
        if (!encryptedRoleRightKeys) {
            return userKeys;
        }
        for (const [legitimateId, encryptedPrivateKey] of Object.entries(encryptedRoleRightKeys)) {
            if (legitimateId === '$type') {
                continue;
            }
            userKeys.push({
                id: legitimateId,
                privateKey: normalizeBinaryValue(await this.api.encryptionManager.decrypt(currentUserPrivateKey, fromBase64(encryptedPrivateKey))),
            });
        }
        return userKeys;
    }
    async processAuthStep(step) {
        if (!isObject(step)) {
            return;
        }
        throwOnFailedLogin(step);
        trackAuthStep(this.state, step);
        if (isCompletedAuthentication(step)) {
            if (this.state.operationMode === 0) {
                this.state.authenticatedLoginData.Keys = await this.decryptUserKeys(step.UserId, this.state.currentUserPrivateKey ?? '', step.EncryptedRoleRightKey);
                this.state.authenticatedLoginData.UserName = this.state.username ?? '';
                this.state.authenticatedLoginData.UserId = step.UserId;
                this.state.authenticatedLoginData.SessionId = step.SessionId;
                this.state.authenticatedLoginData.SessionKey = step.SessionKey;
            }
            this.state.isAuthenticated = true;
            await this.setSession({
                Database: this.state.database ?? '',
                SessionId: this.state.authenticatedLoginData.SessionId,
                SessionKey: this.state.authenticatedLoginData.SessionKey,
            }, this.state.authenticatedLoginData.Keys);
            return;
        }
        if (typeof step.$type === 'string' &&
            step.$type.includes('AuthenticationUserKeySignatureRequirement')) {
            if (!isUserKeySignatureRequirement(step)) {
                throw createAuthenticationError('Unsupported user-key signature authentication step received from server', step);
            }
            await this.handleUserKeySignatureRequirement(step);
        }
    }
    async handleUserKeySignatureRequirement(step) {
        this.state.sessionId = step.SessionId;
        const encryptionVersion = step.EncryptionVersion ?? 0;
        this.api.encryptionManager.setEncryptionVersion(encryptionVersion);
        const encryptedUserKey = step.UserKey ? fromBase64(step.UserKey) : null;
        if (encryptedUserKey !== null) {
            this.state.currentUserPrivateKey = await this.decryptInteractiveUserKey(encryptedUserKey);
        }
        const challengeSignature = await this.api.encryptionManager.signData(fromBase64(step.Challenge), this.state.currentUserPrivateKey ?? '');
        const nextStep = await this.authServiceClient.authenticateUserKeySignatureCredential(createAuthRequest(this.state, {
            Challenge: step.Challenge,
            ChallengeSignature: step.ChallengeSignature,
            UserKeyChallengeSignature: toBase64(toBinaryString(challengeSignature)),
        }));
        await this.processAuthStep(nextStep);
    }
    async decryptInteractiveUserKey(encryptedUserKey) {
        const firstRequirement = this.state.filledAuthentications[0];
        if (firstRequirement?.Fields?.length &&
            firstRequirement.AuthType.includes('PasswordHashCredentialRequirement')) {
            const passwordField = firstRequirement.Fields.find((field) => field.Key === 'password');
            if (passwordField) {
                return normalizeBinaryValue(await this.api.encryptionManager.decrypt(passwordField.Value, encryptedUserKey));
            }
        }
        return encryptedUserKey;
    }
}
