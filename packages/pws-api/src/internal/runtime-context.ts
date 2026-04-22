import type { PsrSessionToken } from '@kmuip/pws-types'
import { PsrHttpClient, type RuntimeSession } from './http.js'
import { PsrRealtimeConnection } from './realtime.js'
import { normalizeEndpoint } from './utils.js'

export type RuntimeContext = {
  endpoint: string
  runtimeSession: RuntimeSession
  httpClient: PsrHttpClient
  realtimeConnection: PsrRealtimeConnection
}

export function createRuntimeContext(apiUrl: string): RuntimeContext {
  const endpoint = normalizeEndpoint(apiUrl)
  const runtimeSession: RuntimeSession = {
    authToken: null,
    apiKeyToken: null,
    csrfToken: null,
    userKeys: [],
  }

  return {
    endpoint,
    runtimeSession,
    httpClient: new PsrHttpClient(endpoint, () => runtimeSession),
    realtimeConnection: new PsrRealtimeConnection(endpoint),
  }
}

export function cloneSessionToken(token: PsrSessionToken | null | undefined) {
  return token ? { ...token } : null
}
