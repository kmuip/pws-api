import type { PsrApiError, PsrSessionToken } from '@kmuip/pws-types'
import { toBase64, toBase64Json } from './utils.js'

export type RuntimeSession = {
  authToken: PsrSessionToken | null
  apiKeyToken: string | null
  csrfToken: string | null
  userKeys: Array<{ id: string; privateKey: string }>
}

type ServiceArea = 'Auth' | 'WebService' | 'WebMaintenanceService' | 'WebServiceMultiFactorAuth'

function createHttpError(message: string, status?: number, url?: string): PsrApiError {
  const error = new Error(message) as PsrApiError
  error.status = status
  error.url = url
  return error
}

function buildHeaders(session: RuntimeSession | null) {
  const headers: Record<string, string> = {
    'content-type': 'application/json',
  }

  if (session?.authToken) {
    const tokenHeader = Object.prototype.hasOwnProperty.call(session.authToken, 'ClientInstanceId')
      ? 'token'
      : 'token2'
    headers[tokenHeader] = toBase64Json(session.authToken)
  }

  if (session?.csrfToken) {
    headers['CSRF-Token'] = toBase64(session.csrfToken, 'utf8')
  }

  if (session?.apiKeyToken) {
    headers.ApiKeyToken = session.apiKeyToken
  }

  return headers
}

async function parseResponse(response: Response) {
  const rawText = await response.text()
  const text = rawText.replace(/^\uFEFF/, '')

  if (response.status === 200) {
    return text.length === 0 ? undefined : JSON.parse(text)
  }

  if (response.status === 500 && text.length > 0) {
    const error = JSON.parse(text) as PsrApiError
    error.status = response.status
    error.url = response.url
    throw Object.setPrototypeOf(error, new Error(error.message ?? error.txt ?? 'Server error'))
  }

  if (response.status === 401) {
    throw createHttpError('Unauthorized.', response.status, response.url)
  }

  if (response.status === 403) {
    throw createHttpError('Forbidden.', response.status, response.url)
  }

  if (response.status === 502) {
    throw createHttpError('The server is unreachable.', response.status, response.url)
  }

  throw createHttpError(
    `Unexpected response status ${response.status}.`,
    response.status,
    response.url,
  )
}

export class PsrHttpClient {
  constructor(
    private readonly endpoint: string,
    private readonly getSession: () => RuntimeSession | null,
  ) {}

  async post<T>(
    area: ServiceArea,
    method: string,
    payload: unknown,
    withSession = true,
  ): Promise<T> {
    const response = await fetch(new URL(`${area}/${method}`, this.endpoint), {
      method: 'POST',
      headers: buildHeaders(withSession ? this.getSession() : null),
      body: JSON.stringify(payload),
      cache: 'no-cache',
    })

    return parseResponse(response) as Promise<T>
  }

  async get<T>(
    area: ServiceArea,
    method: string,
    query?: Record<string, unknown>,
    withSession = true,
  ): Promise<T> {
    const url = new URL(`${area}/${method}`, this.endpoint)
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value))
        }
      }
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: buildHeaders(withSession ? this.getSession() : null),
      cache: 'no-cache',
    })

    return parseResponse(response) as Promise<T>
  }
}
