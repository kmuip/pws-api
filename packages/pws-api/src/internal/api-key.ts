import type {
  ApiKeyManager,
  PsrApiKeyAccessRights,
  PsrApiKeyAccessScopes,
  PsrDateIsoString,
} from '@kmuip/pws-types'
import type { PsrApiEnumsShape } from '@kmuip/pws-types'
import { parseJsonWebTokenPayload } from './utils.js'

type ApiKeyClaims = {
  usrn?: string
  dbn?: string
  iat?: number
  exp?: number
  acr?: string
  acs?: string
  [key: string]: unknown
}

export type ParsedApiKey = {
  jsonWebToken: string
  apiKeyPrivateKey: string
  claims: ApiKeyClaims
}

function createApiKeyError(message: string) {
  const error = { ExceptionCode: 0 }
  return Object.setPrototypeOf(error, new Error(message))
}

function requireStringClaim(claims: ApiKeyClaims, claimName: keyof ApiKeyClaims) {
  const value = claims[claimName]
  if (typeof value === 'string' && value.length > 0) {
    return value
  }

  throw createApiKeyError(`The provided API key does not contain a valid '${claimName}' claim`)
}

function requireNumericClaim(claims: ApiKeyClaims, claimName: keyof ApiKeyClaims): number {
  const value = claims[claimName]
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  throw createApiKeyError(`The provided API keys '${claimName}' claims value is invalid`)
}

function parseFlagSet<T extends Record<string, number>>(
  claims: ApiKeyClaims,
  claimName: keyof ApiKeyClaims,
  enumValues: T,
) {
  const rawValue = requireStringClaim(claims, claimName)
  const names = rawValue.split(', ').filter(Boolean)

  if (names.length === 0) {
    throw createApiKeyError(`The provided API keys '${claimName}' claims value is invalid`)
  }

  const values = names.map((name) => enumValues[name])
  if (values.some((value) => value === undefined)) {
    throw createApiKeyError(`The provided API keys '${claimName}' claims value is invalid`)
  }

  return values.reduce((combined, value) => combined | value, 0)
}

export function parseApiKey(apiKey: string): ParsedApiKey {
  const parts = apiKey.split(':', 2)
  if (parts.length !== 2) {
    throw createApiKeyError('Malformed API key')
  }

  try {
    const [jsonWebToken, encodedPrivateKey] = parts
    const apiKeyPrivateKey = Buffer.from(encodedPrivateKey, 'base64').toString('binary')

    return {
      jsonWebToken,
      apiKeyPrivateKey,
      claims: parseJsonWebTokenPayload<ApiKeyClaims>(jsonWebToken),
    }
  } catch (cause) {
    throw createApiKeyError(`Malformed private key of API key: ${String(cause)}`)
  }
}

export class RuntimeApiKeyManager implements ApiKeyManager {
  constructor(private readonly enums: PsrApiEnumsShape) {}

  getUsername(apiKey: string) {
    return requireStringClaim(parseApiKey(apiKey).claims, 'usrn')
  }

  getDatabaseName(apiKey: string) {
    return requireStringClaim(parseApiKey(apiKey).claims, 'dbn')
  }

  getIssueDateUtc(apiKey: string): PsrDateIsoString {
    const seconds = requireNumericClaim(parseApiKey(apiKey).claims, 'iat')
    return new Date(seconds * 1000).toISOString()
  }

  getExpirationDateUtc(apiKey: string): PsrDateIsoString {
    const seconds = requireNumericClaim(parseApiKey(apiKey).claims, 'exp')
    return new Date(seconds * 1000).toISOString()
  }

  getAccessRights(apiKey: string): PsrApiKeyAccessRights {
    return parseFlagSet(
      parseApiKey(apiKey).claims,
      'acr',
      this.enums.PsrApiKeyAccessRights as unknown as Record<string, number>,
    ) as PsrApiKeyAccessRights
  }

  getAccessScopes(apiKey: string): PsrApiKeyAccessScopes {
    return parseFlagSet(
      parseApiKey(apiKey).claims,
      'acs',
      this.enums.PsrApiKeyAccessScopes as unknown as Record<string, number>,
    ) as PsrApiKeyAccessScopes
  }
}
