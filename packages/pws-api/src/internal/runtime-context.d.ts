import type { PsrForkedSessionToken, PsrSessionToken } from '@kmuip/pws-types';
import { PsrHttpClient, type RuntimeSession } from './http.js';
import { PsrRealtimeConnection } from './realtime.js';
export type RuntimeContext = {
    endpoint: string;
    runtimeSession: RuntimeSession;
    httpClient: PsrHttpClient;
    realtimeConnection: PsrRealtimeConnection;
};
export declare function createRuntimeContext(apiUrl: string): RuntimeContext;
export declare function cloneSessionToken(token: PsrSessionToken | PsrForkedSessionToken | null | undefined): {
    Database: string;
    SessionId: string;
    SessionKey: string;
    ClientVersion?: string;
    ClientInstanceId?: string;
    ClientType?: string;
    EncryptionVersion?: number;
    csrfToken?: string;
} | {
    Token: PsrSessionToken;
    UserName?: string;
    ClientVersion?: string;
    ClientInstanceId?: string;
    ClientType?: string;
    EncryptionVersion?: number;
    csrfToken?: string;
} | null;
