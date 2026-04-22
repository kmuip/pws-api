import type { AuthenticationManagerV2, PsrSessionToken, PsrUserKey } from '@kmuip/pws-types';
import type { PsrHttpClient, RuntimeSession } from './http.js';
import type { PsrRealtimeConnection } from './realtime.js';
import type { AuthServiceClientLike, RuntimeApiLike, SessionEventSource, SessionLifecycleDeps, SessionServiceLike } from './auth/types.js';
export declare class RuntimeAuthenticationManager implements AuthenticationManagerV2 {
    private readonly api;
    private readonly httpClient;
    private readonly runtimeSession;
    private readonly organisationUnitManager;
    private readonly realtimeConnection;
    private readonly serviceClient;
    private readonly authServiceClient;
    private readonly onUserKeysChanged?;
    private readonly customRedirectUrl?;
    private readonly state;
    private readonly sessionDeps;
    constructor(api: RuntimeApiLike, httpClient: PsrHttpClient, runtimeSession: RuntimeSession, organisationUnitManager: SessionLifecycleDeps['organisationUnitManager'], realtimeConnection: PsrRealtimeConnection, realtimeEventManager: SessionEventSource, serviceClient: SessionServiceLike, authServiceClient: AuthServiceClientLike, onUserKeysChanged?: ((userKeys: PsrUserKey[]) => void) | undefined, customRedirectUrl?: string | undefined);
    get isAuthenticated(): boolean;
    loginWithApiKey(apiKey: string): Promise<void>;
    startLogin(database: string, username: string): Promise<void>;
    getNameOfUser(): string | undefined;
    getUserImage(): string | undefined;
    getNextRequirement(): Promise<import("@kmuip/pws-types").PsrAuthenticationRequirementSet>;
    authenticate(requirement: Parameters<AuthenticationManagerV2['authenticate']>[0]): Promise<void>;
    forkSession(clientInstanceId: string, clientType: string, clientVersion: string): Promise<PsrSessionToken>;
    getUserKeys(): {
        id: string;
        privateKey: string;
    }[];
    logout(): Promise<void>;
    setSession(authToken: PsrSessionToken, userKeys: PsrUserKey[], apiKey?: string): Promise<void>;
    private decryptUserKeys;
    private processAuthStep;
    private handleUserKeySignatureRequirement;
    private decryptInteractiveUserKey;
}
