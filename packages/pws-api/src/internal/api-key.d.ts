import type { ApiKeyManager, PsrApiKeyAccessRights, PsrApiKeyAccessScopes, PsrDateIsoString } from '@kmuip/pws-types';
import type { PsrApiEnumsShape } from '@kmuip/pws-types';
type ApiKeyClaims = {
    usrn?: string;
    dbn?: string;
    iat?: number;
    exp?: number;
    acr?: string;
    acs?: string;
    [key: string]: unknown;
};
export type ParsedApiKey = {
    jsonWebToken: string;
    apiKeyPrivateKey: string;
    claims: ApiKeyClaims;
};
export declare function parseApiKey(apiKey: string): ParsedApiKey;
export declare class RuntimeApiKeyManager implements ApiKeyManager {
    private readonly enums;
    constructor(enums: PsrApiEnumsShape);
    getUsername(apiKey: string): string;
    getDatabaseName(apiKey: string): string;
    getIssueDateUtc(apiKey: string): PsrDateIsoString;
    getExpirationDateUtc(apiKey: string): PsrDateIsoString;
    getAccessRights(apiKey: string): PsrApiKeyAccessRights;
    getAccessScopes(apiKey: string): PsrApiKeyAccessScopes;
}
export {};
