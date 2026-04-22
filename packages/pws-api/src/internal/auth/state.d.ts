import type { PsrAuthenticationRequirement } from '@kmuip/pws-types';
import type { AuthState } from './types.js';
export declare function createAuthState(clientInformation: Record<string, unknown>): AuthState;
export declare function resetLoginState(state: AuthState, database: string, username: string, filledAuthentications?: PsrAuthenticationRequirement[]): void;
