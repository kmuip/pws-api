import type { PsrForkedSessionToken, PsrSessionToken, PsrUserKey } from '@kmuip/pws-types';
import type { AuthState, SessionLifecycleDeps } from './types.js';
export declare function setSessionState(deps: SessionLifecycleDeps, state: AuthState, authToken: PsrSessionToken | PsrForkedSessionToken, userKeys: PsrUserKey[], apiKey?: string): Promise<void>;
export declare function logoutSession(deps: SessionLifecycleDeps, state: AuthState): Promise<void>;
export declare function handleClosedSession(deps: SessionLifecycleDeps, state: AuthState): Promise<void>;
