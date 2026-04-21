import type { PsrDateIsoString } from '../base'
import type { PsrApiKeyAccessRights, PsrApiKeyAccessScopes } from '../enum-constants'

export type ApiKeyManager = {
  getUsername(apiKey: string): string
  getDatabaseName(apiKey: string): string
  getIssueDateUtc(apiKey: string): PsrDateIsoString
  getExpirationDateUtc(apiKey: string): PsrDateIsoString
  getAccessRights(apiKey: string): PsrApiKeyAccessRights
  getAccessScopes(apiKey: string): PsrApiKeyAccessScopes
}
