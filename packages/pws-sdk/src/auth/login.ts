import type { PsrApi, PsrAuthenticationRequirement } from '@kmuip/pws-api'
import type {
  ApiKeyAuthConfig,
  OidcAuthConfig,
  OidcLoginRecord,
  PasswordAuthConfig,
  SessionAuthConfig,
} from '../types.js'

function findRequirement(
  requirements: PsrAuthenticationRequirement[],
  matcher: (requirement: PsrAuthenticationRequirement) => boolean,
) {
  return requirements.find(matcher) ?? null
}

function setRequirementField(
  requirement: PsrAuthenticationRequirement,
  candidateKeys: string[],
  value: string,
) {
  const field =
    requirement.Fields?.find((candidate) => candidateKeys.includes(candidate.Key)) ??
    requirement.Fields?.[0] ??
    null

  if (!field) {
    throw new Error(`Authentication field ${candidateKeys.join('/')} is not available.`)
  }

  field.Value = value
}

export async function authenticateWithPassword(raw: PsrApi, auth: PasswordAuthConfig) {
  await raw.authenticationManagerV2.startLogin(auth.database, auth.username)

  let requirementSet = await raw.authenticationManagerV2.getNextRequirement()
  const passwordRequirement = findRequirement(requirementSet.PossibleRequirements, (requirement) =>
    requirement.AuthType.includes('PasswordHashCredentialRequirement'),
  )
  if (!passwordRequirement) {
    throw new Error('Password authentication requirement is not available.')
  }

  setRequirementField(passwordRequirement, ['password'], auth.password)
  await raw.authenticationManagerV2.authenticate(passwordRequirement)

  if (raw.authenticationManagerV2.isAuthenticated) {
    return
  }

  requirementSet = await raw.authenticationManagerV2.getNextRequirement()
  const otpRequirement = findRequirement(requirementSet.PossibleRequirements, (requirement) =>
    /GoogleAuthCredentialRequirement|SafeNetOneTimePasswordCredentialRequirement|YubicoOneTimePasswordCredentialRequirement|RadiusTokenCredentialRequirement|RsaSecurIdTokenCredentialRequirement/.test(
      requirement.AuthType,
    ),
  )

  if (!otpRequirement) {
    throw new Error(
      `Authentication did not complete after password step: ${requirementSet.PossibleRequirements.map((requirement) => requirement.AuthType).join(', ')}`,
    )
  }

  if (!auth.otp) {
    throw new Error('A one-time password callback is required for this account.')
  }

  const otp = await auth.otp()
  setRequirementField(otpRequirement, ['code', 'token', 'password', 'otp', 'oneTimePassword'], otp)
  await raw.authenticationManagerV2.authenticate(otpRequirement)

  if (!raw.authenticationManagerV2.isAuthenticated) {
    throw new Error('Authentication did not complete after OTP step.')
  }
}

export function normalizeOidcAuthorizationCode(value: string) {
  const trimmed = value.trim()
  if (!trimmed) {
    throw new Error('OIDC authorization code or callback URL is empty.')
  }

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    const url = new URL(trimmed)
    if (url.hash) {
      return url.hash
    }
    if (url.search) {
      return `#${url.search.slice(1)}`
    }
  }

  if (trimmed.startsWith('#')) {
    return trimmed
  }

  if (trimmed.includes('=')) {
    return `#${trimmed.replace(/^#?/, '')}`
  }

  return `#code=${encodeURIComponent(trimmed)}`
}

export async function prepareOidcLogin(
  raw: PsrApi,
  auth: Pick<OidcAuthConfig, 'database' | 'username'>,
): Promise<OidcLoginRecord> {
  await raw.authenticationManagerV2.startLogin(auth.database, auth.username)

  const requirementSet = await raw.authenticationManagerV2.getNextRequirement()
  const oidcRequirement = findRequirement(requirementSet.PossibleRequirements, (requirement) =>
    requirement.AuthType.includes('OidcCredentialRequirement'),
  )

  if (!oidcRequirement || !oidcRequirement.LoginUrl || !oidcRequirement.RedirectUrl) {
    throw new Error(
      `OIDC authentication requirement is not available: ${requirementSet.PossibleRequirements.map((requirement) => requirement.AuthType).join(', ')}`,
    )
  }

  return {
    providerId: oidcRequirement.ProviderId ?? null,
    loginUrl: oidcRequirement.LoginUrl,
    redirectUrl: oidcRequirement.RedirectUrl,
    requirement: oidcRequirement,
  }
}

export async function authenticateWithOidc(raw: PsrApi, auth: OidcAuthConfig) {
  const login = await prepareOidcLogin(raw, auth)
  const authorizationCodeInput =
    auth.authorizationCode ?? (auth.getAuthorizationCode ? await auth.getAuthorizationCode(login) : null)

  if (!authorizationCodeInput) {
    throw new Error(
      `OIDC authentication requires an authorization code or callback URL. Start at: ${login.loginUrl}`,
    )
  }

  const requirement: PsrAuthenticationRequirement = {
    ...login.requirement,
    AuthorizationCode: normalizeOidcAuthorizationCode(authorizationCodeInput),
  }

  await raw.authenticationManagerV2.authenticate(requirement)

  if (!raw.authenticationManagerV2.isAuthenticated) {
    throw new Error('Authentication did not complete after OIDC step.')
  }
}

export async function authenticate(
  raw: PsrApi,
  auth: ApiKeyAuthConfig | PasswordAuthConfig | OidcAuthConfig | SessionAuthConfig,
) {
  if (auth.type === 'apiKey') {
    await raw.authenticationManagerV2.loginWithApiKey(auth.apiKey)
    return
  }

  if (auth.type === 'session') {
    await raw.authenticationManagerV2.setSession(
      auth.session as Parameters<PsrApi['authenticationManagerV2']['setSession']>[0],
      auth.userKeys,
      auth.apiKey ?? undefined,
    )
    return
  }

  if (auth.type === 'oidc') {
    await authenticateWithOidc(raw, auth)
    return
  }

  await authenticateWithPassword(raw, auth)
}
