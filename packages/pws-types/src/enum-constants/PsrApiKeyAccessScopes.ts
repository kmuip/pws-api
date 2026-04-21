export const PsrApiKeyAccessScopes = {
  None: 0,
  Passwords: 1,
  Forms: 2,
  Documents: 4,
  OrganisationalUnits: 8,
  Roles: 16,
  Unrestricted: 2147483647,
} as const

export type PsrApiKeyAccessScopes = (typeof PsrApiKeyAccessScopes)[keyof typeof PsrApiKeyAccessScopes]
