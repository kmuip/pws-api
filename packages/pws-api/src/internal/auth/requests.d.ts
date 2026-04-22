import type { PsrAuthenticationRequirement } from '@kmuip/pws-types';
import type { AuthState, RuntimeApiLike } from './types.js';
type BuildRequestContext = {
    api: RuntimeApiLike;
    state: AuthState;
    customRedirectUrl?: string;
};
export declare function createAuthRequest<T extends Record<string, unknown>>(state: AuthState, request: T): T & {
    Database: string | null;
    Username: string | null;
    OperationMode: number;
    SessionId?: string;
    ClientInformation: Record<string, unknown>;
};
export declare function buildCredentialRequest(context: BuildRequestContext, rawRequirement: unknown, requirement: PsrAuthenticationRequirement): Promise<Record<string, any> & {
    Database: string | null;
    Username: string | null;
    OperationMode: number;
    SessionId?: string;
    ClientInformation: Record<string, unknown>;
}>;
export declare function buildConfigurationRequest(context: BuildRequestContext, rawRequirement: unknown, requirement: PsrAuthenticationRequirement): Promise<Record<string, any> & {
    Database: string | null;
    Username: string | null;
    OperationMode: number;
    SessionId?: string;
    ClientInformation: Record<string, unknown>;
}>;
export declare function replaceFilledRequirement(state: AuthState, requirement: PsrAuthenticationRequirement): void;
export declare function findRequirementByType(rawRequirements: unknown[] | undefined, requirement: PsrAuthenticationRequirement): unknown;
export {};
