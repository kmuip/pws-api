import { parseJsonWebTokenPayload } from './utils.js';
function createApiKeyError(message) {
    const error = { ExceptionCode: 0 };
    return Object.setPrototypeOf(error, new Error(message));
}
function requireStringClaim(claims, claimName) {
    const value = claims[claimName];
    if (typeof value === 'string' && value.length > 0) {
        return value;
    }
    throw createApiKeyError(`The provided API key does not contain a valid '${claimName}' claim`);
}
function requireNumericClaim(claims, claimName) {
    const value = claims[claimName];
    if (typeof value === 'number' && Number.isFinite(value)) {
        return value;
    }
    throw createApiKeyError(`The provided API keys '${claimName}' claims value is invalid`);
}
function parseFlagSet(claims, claimName, enumValues) {
    const rawValue = requireStringClaim(claims, claimName);
    const names = rawValue.split(', ').filter(Boolean);
    if (names.length === 0) {
        throw createApiKeyError(`The provided API keys '${claimName}' claims value is invalid`);
    }
    const values = names.map((name) => enumValues[name]);
    if (values.some((value) => value === undefined)) {
        throw createApiKeyError(`The provided API keys '${claimName}' claims value is invalid`);
    }
    return values.reduce((combined, value) => combined | value, 0);
}
export function parseApiKey(apiKey) {
    const parts = apiKey.split(':', 2);
    if (parts.length !== 2) {
        throw createApiKeyError('Malformed API key');
    }
    try {
        const [jsonWebToken, encodedPrivateKey] = parts;
        const apiKeyPrivateKey = Buffer.from(encodedPrivateKey, 'base64').toString('binary');
        return {
            jsonWebToken,
            apiKeyPrivateKey,
            claims: parseJsonWebTokenPayload(jsonWebToken),
        };
    }
    catch (cause) {
        throw createApiKeyError(`Malformed private key of API key: ${String(cause)}`);
    }
}
export class RuntimeApiKeyManager {
    enums;
    constructor(enums) {
        this.enums = enums;
    }
    getUsername(apiKey) {
        return requireStringClaim(parseApiKey(apiKey).claims, 'usrn');
    }
    getDatabaseName(apiKey) {
        return requireStringClaim(parseApiKey(apiKey).claims, 'dbn');
    }
    getIssueDateUtc(apiKey) {
        const seconds = requireNumericClaim(parseApiKey(apiKey).claims, 'iat');
        return new Date(seconds * 1000).toISOString();
    }
    getExpirationDateUtc(apiKey) {
        const seconds = requireNumericClaim(parseApiKey(apiKey).claims, 'exp');
        return new Date(seconds * 1000).toISOString();
    }
    getAccessRights(apiKey) {
        return parseFlagSet(parseApiKey(apiKey).claims, 'acr', this.enums.PsrApiKeyAccessRights);
    }
    getAccessScopes(apiKey) {
        return parseFlagSet(parseApiKey(apiKey).claims, 'acs', this.enums.PsrApiKeyAccessScopes);
    }
}
