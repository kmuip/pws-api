import type { OrganisationUnitManager, PsrAuthenticationRequirement, PsrApiError, PsrOrganisationUnitUser, PsrSessionState, PsrSessionToken, PsrUserKey, RealtimeEventManager } from '@kmuip/pws-types';
import type { RuntimeSession } from '../http.js';
import type { PsrRealtimeConnection } from '../realtime.js';
export type EncryptionManagerLike = {
    setEncryptionVersion(version: number): void;
    getEncryptionVersion(): number;
    decrypt(privateKey: string, encryptedValue: string | Uint8Array): Promise<string | Uint8Array> | string | Uint8Array;
    encrypt(encryptionChain: number, value: string, privateKey?: string | null): Promise<string | Uint8Array> | string | Uint8Array;
    mtoPbkdf2(password: string, salt?: string | Uint8Array | null, hashAlgorithm?: number | null): Promise<{
        Hash: string;
        Salt: string;
        HashAlgorithm: number;
    }>;
    signData(data: string, privateKey: string): Promise<string | Uint8Array>;
};
export type RuntimeApiLike = {
    encryptionManager: EncryptionManagerLike;
    passwordManager: {
        validatePassword(policy: Record<string, unknown>, password: string, usernames: string[]): {
            isValid: boolean;
            errors: number[];
        };
    };
    currentUser: PsrOrganisationUnitUser | null;
    onSessionExpired: ((expiredToken: PsrSessionToken) => void | Promise<void>) | null;
    sessionExpiration: Date | null;
    sessionState: PsrSessionState;
};
export type AuthenticationResultCompleted = {
    $type?: string;
    UserId: string;
    SessionId: string;
    SessionKey: string;
    EncryptedRoleRightKey?: Record<string, string>;
};
export type AuthenticationUserKeySignatureRequirement = {
    $type?: string;
    Challenge: string;
    ChallengeSignature: string;
    EncryptionVersion?: number;
    SessionId: string;
    UserKey?: string | null;
};
export type AuthServiceClientLike = {
    getFirstAuthentication(request: unknown): Promise<unknown>;
    configureAuthentication(config: unknown): Promise<unknown>;
    authenticateUserKeySignatureCredential(credential: unknown): Promise<unknown>;
    authenticate(credential: unknown): Promise<unknown>;
};
export type SessionServiceLike = {
    closeSession(): Promise<unknown>;
    forkSession(clientInstanceId: string, clientType: string, clientVersion: string): Promise<unknown>;
    setTokens(authToken?: PsrSessionToken | null, csrfToken?: string | null, onTouched?: ((methodName: string) => void) | null, apiKeyToken?: string | null): void;
};
export type AuthenticatedLoginData = {
    UserId: string;
    UserName: string;
    SessionId: string;
    SessionKey: string;
    Keys: PsrUserKey[];
};
export type AuthState = {
    operationMode: number;
    database: string | undefined;
    username: string | undefined;
    sessionId: string | undefined;
    nameOfUser: string | undefined;
    userImage: string | undefined;
    authenticationSteps: unknown[];
    filledAuthentications: PsrAuthenticationRequirement[];
    authenticatedLoginData: AuthenticatedLoginData;
    currentUserPrivateKey: string | undefined;
    clientInformation: Record<string, unknown>;
    isAuthenticated: boolean;
    isLoggingOut: boolean;
};
export type SessionLifecycleDeps = {
    api: RuntimeApiLike;
    runtimeSession: RuntimeSession;
    organisationUnitManager: OrganisationUnitManager;
    realtimeConnection: PsrRealtimeConnection;
    serviceClient: SessionServiceLike;
    onUserKeysChanged?: ((userKeys: PsrUserKey[]) => void) | undefined;
};
export type SessionEventSource = Pick<RealtimeEventManager, 'thisSessionClosed'>;
export declare function createAuthenticationError(message: string, details?: unknown): PsrApiError;
