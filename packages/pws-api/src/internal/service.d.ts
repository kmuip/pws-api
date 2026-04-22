import type { PsrSessionToken } from '@kmuip/pws-types';
import { managerManifest } from '../generated/forward-manifests.js';
import { PsrHttpClient, type RuntimeSession } from './http.js';
type TouchCallback = ((methodName: string) => void) | null;
type ForwardServiceClient = Record<string, (...args: unknown[]) => Promise<unknown>> & {
    setTokens(authToken?: PsrSessionToken | null, csrfToken?: string | null, onTouched?: TouchCallback, apiKeyToken?: string | null): void;
    addContainerV2(container: unknown, parentOrganisationUnitId?: string | null, rightInheritanceOptions?: unknown): Promise<unknown>;
    getContainerItemWithSecretValue(itemId: string, reason: string): Promise<unknown>;
    openSession(): Promise<unknown>;
    closeSession(): Promise<unknown>;
    forkSession(clientInstanceId: string, clientType: string, clientVersion: string): Promise<unknown>;
};
export declare function createWebServiceClient(httpClient: PsrHttpClient, runtimeSession: RuntimeSession, typeConstructors: Record<string, new () => object>): ForwardServiceClient;
export declare function createMaintenanceServiceClient(httpClient: PsrHttpClient, runtimeSession: RuntimeSession): {
    setToken(authToken?: PsrSessionToken | null): void;
    getEncryptionVersion: () => Promise<unknown>;
    getOrganisationUnitUserSalt: () => Promise<unknown>;
    getOrganisationUnitServerPublicKey: () => Promise<unknown>;
    getOrganisationUnitUserGuid: (username: string) => Promise<unknown>;
};
export declare function createMultiFactorServiceClient(httpClient: PsrHttpClient, runtimeSession: RuntimeSession): {
    setToken(authToken?: PsrSessionToken | null): void;
    getCurrentUserRightKey: () => Promise<unknown>;
    getClientAuthOptions: () => Promise<unknown>;
    checkAuthentication: (jsonAuthOptions: string) => Promise<unknown>;
};
export declare function createAuthServiceClient(httpClient: PsrHttpClient): {
    getFirstAuthentication: (request: unknown) => Promise<unknown>;
    initializeFirstFactorReset: (request: unknown) => Promise<unknown>;
    configureAuthentication: (config: unknown) => Promise<unknown>;
    authenticateUserKeySignatureCredential: (credential: unknown) => Promise<unknown>;
    authenticate: (credential: unknown) => Promise<unknown>;
    authenticateApiKey: (credential: unknown) => Promise<unknown>;
};
export declare function createDirectManager<T>(managerName: keyof typeof managerManifest, serviceClient: ForwardServiceClient): T;
export {};
