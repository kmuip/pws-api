import { managerManifest, serviceManifest } from '../generated/forward-manifests.js';
import { hydrateResponse } from './hydration.js';
import { PsrHttpClient } from './http.js';
function createPayload(payloadEntries, args, argNames) {
    const byName = new Map(argNames.map((name, index) => [name, args[index]]));
    return Object.fromEntries(payloadEntries.map(([payloadKey, argumentName]) => [payloadKey, byName.get(argumentName)]));
}
function createServiceMethod(httpClient, runtimeSession, methodName, onTouchedRef) {
    void runtimeSession;
    const definition = serviceManifest[methodName];
    return async (...args) => {
        if (definition.payload.length === 0) {
            const value = definition.transport === 'getData'
                ? await httpClient.get('WebService', definition.endpoint, undefined, true)
                : await httpClient.post('WebService', definition.endpoint, {}, true);
            onTouchedRef.current?.(methodName);
            return value;
        }
        const payload = createPayload(definition.payload, args, definition.args);
        const value = definition.transport === 'getData'
            ? await httpClient.get('WebService', definition.endpoint, payload, true)
            : await httpClient.post('WebService', definition.endpoint, payload, true);
        onTouchedRef.current?.(methodName);
        return value;
    };
}
export function createWebServiceClient(httpClient, runtimeSession, typeConstructors) {
    const onTouchedRef = { current: null };
    const client = {};
    for (const methodName of Object.keys(serviceManifest)) {
        const baseMethod = createServiceMethod(httpClient, runtimeSession, methodName, onTouchedRef);
        client[methodName] = async (...args) => hydrateResponse(await baseMethod(...args), typeConstructors);
    }
    client.addContainerV2 = async (container, parentOrganisationUnitId, rightInheritanceOptions) => hydrateResponse(await httpClient.post('WebService', 'AddContainerV2', {
        container,
        parentOrganisationUnitId: parentOrganisationUnitId ?? null,
        rightInheritanceOptions: rightInheritanceOptions ?? null,
    }, true), typeConstructors);
    client.getContainerItemWithSecretValue = async (itemId, reason) => hydrateResponse(await httpClient.post('WebService', 'GetContainerItemWithSecretValue', { itemId, reason }, true), typeConstructors);
    client.setTokens = (authToken, csrfToken, onTouched, apiKeyToken) => {
        runtimeSession.authToken = authToken ?? null;
        runtimeSession.csrfToken = csrfToken ?? null;
        runtimeSession.apiKeyToken = apiKeyToken ?? null;
        onTouchedRef.current = onTouched ?? null;
    };
    return client;
}
export function createMaintenanceServiceClient(httpClient, runtimeSession) {
    return {
        setToken(authToken) {
            runtimeSession.authToken = authToken ?? null;
        },
        getEncryptionVersion: () => httpClient.get('WebMaintenanceService', 'GetEncryptionVersion', undefined, true),
        getOrganisationUnitUserSalt: () => httpClient.get('WebMaintenanceService', 'GetOrganisationUnitUserSalt', undefined, true),
        getOrganisationUnitServerPublicKey: () => httpClient.get('WebMaintenanceService', 'GetOrganisationUnitServerPublicKey', undefined, true),
        getOrganisationUnitUserGuid: (username) => httpClient.post('WebMaintenanceService', 'GetOrganisationUnitUserGuid', { username }, true),
    };
}
export function createMultiFactorServiceClient(httpClient, runtimeSession) {
    return {
        setToken(authToken) {
            runtimeSession.authToken = authToken ?? null;
        },
        getCurrentUserRightKey: () => httpClient.get('WebServiceMultiFactorAuth', 'GetCurrentUserRightKey', undefined, true),
        getClientAuthOptions: () => httpClient.get('WebServiceMultiFactorAuth', 'GetClientAuthOptions', undefined, true),
        checkAuthentication: (jsonAuthOptions) => httpClient.post('WebServiceMultiFactorAuth', 'CheckAuthentication', { jsonAuthOptions }, true),
    };
}
export function createAuthServiceClient(httpClient) {
    return {
        getFirstAuthentication: (request) => httpClient.post('Auth', 'GetFirstAuthentication', { request }, false),
        initializeFirstFactorReset: (request) => httpClient.post('Auth', 'InitializeFirstFactorReset', { request }, false),
        configureAuthentication: (config) => httpClient.post('Auth', 'ConfigureAuthentication', { config }, false),
        authenticateUserKeySignatureCredential: (credential) => httpClient.post('Auth', 'AuthenticateUserKeySignatureCredential', { credential }, false),
        authenticate: (credential) => httpClient.post('Auth', 'Authenticate', { credential }, false),
        authenticateApiKey: (credential) => httpClient.post('Auth', 'AuthenticateApiKey', { credential }, false),
    };
}
export function createDirectManager(managerName, serviceClient) {
    const manager = {};
    for (const [methodName, definition] of Object.entries(managerManifest[managerName])) {
        manager[methodName] = (...args) => serviceClient[definition.serviceMethod](...args);
    }
    return manager;
}
