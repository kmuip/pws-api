import type { PsrForkedSessionToken, PsrSessionToken, PsrUserKey } from '@kmuip/pws-types'
import { computeCsrfToken } from '../utils.js'
import type { AuthState, SessionLifecycleDeps } from './types.js'

function normalizeSessionToken(
  authToken: PsrSessionToken | PsrForkedSessionToken,
): PsrSessionToken {
  if ('Token' in authToken && authToken.Token) {
    const token = { ...authToken.Token } as PsrSessionToken & { $type?: string }
    delete token.$type

    return {
      Database: token.Database,
      SessionId: token.SessionId,
      SessionKey: token.SessionKey,
      EncryptionVersion: token.EncryptionVersion ?? authToken.EncryptionVersion,
      csrfToken: token.csrfToken ?? authToken.csrfToken,
    }
  }

  const token = { ...authToken } as PsrSessionToken & { $type?: string }
  delete token.$type
  return token
}

export async function setSessionState(
  deps: SessionLifecycleDeps,
  state: AuthState,
  authToken: PsrSessionToken | PsrForkedSessionToken,
  userKeys: PsrUserKey[],
  apiKey?: string,
) {
  const normalizedAuthToken = normalizeSessionToken(authToken)
  const primaryUserKey = userKeys[0]?.privateKey
  const csrfToken =
    normalizedAuthToken.csrfToken ??
    (primaryUserKey
      ? await computeCsrfToken(
          normalizedAuthToken,
          primaryUserKey,
          deps.api.encryptionManager.signData.bind(deps.api.encryptionManager),
        )
      : null)

  const sanitizedAuthToken = { ...normalizedAuthToken }
  delete sanitizedAuthToken.csrfToken

  deps.runtimeSession.authToken = sanitizedAuthToken
  deps.runtimeSession.apiKeyToken = apiKey ?? deps.runtimeSession.apiKeyToken
  deps.runtimeSession.csrfToken = csrfToken
  deps.runtimeSession.userKeys = [...userKeys]
  deps.onUserKeysChanged?.([...userKeys])
  deps.serviceClient.setTokens(sanitizedAuthToken, csrfToken, null, deps.runtimeSession.apiKeyToken)
  state.isAuthenticated = true
  deps.api.sessionState = 1
  deps.api.currentUser = await deps.organisationUnitManager.getCurrentOrganisationUnit()
  deps.realtimeConnection.connect(sanitizedAuthToken as Record<string, unknown>)
  deps.api.sessionExpiration = null
}

export async function logoutSession(deps: SessionLifecycleDeps, state: AuthState) {
  if (state.isLoggingOut) {
    return
  }

  state.isLoggingOut = true

  try {
    if (deps.api.sessionState === 1) {
      await deps.serviceClient.closeSession()
    }
  } finally {
    deps.realtimeConnection.closeConnection()
    deps.api.currentUser = null
    deps.api.sessionExpiration = null
    deps.api.sessionState = 0
    state.isAuthenticated = false
    deps.runtimeSession.authToken = null
    deps.runtimeSession.apiKeyToken = null
    deps.runtimeSession.csrfToken = null
    deps.runtimeSession.userKeys = []
    deps.onUserKeysChanged?.([])
    deps.serviceClient.setTokens(null, null, null, null)
    state.isLoggingOut = false
  }
}

export async function handleClosedSession(deps: SessionLifecycleDeps, state: AuthState) {
  if (state.isLoggingOut || deps.api.sessionState !== 1 || !deps.runtimeSession.authToken) {
    return
  }

  const expiredToken = deps.runtimeSession.authToken
  await logoutSession(deps, state)

  if (typeof deps.api.onSessionExpired === 'function') {
    await deps.api.onSessionExpired(expiredToken)
    return
  }

  console.warn('PsrApi-Session expired')
}
