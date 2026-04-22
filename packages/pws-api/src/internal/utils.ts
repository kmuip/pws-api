import { createHash } from 'node:crypto'
import type { PsrSessionToken } from '@kmuip/pws-types'
import {
  createClientInformation,
  getClientVersion as getNativeClientVersion,
} from './mto-crypto.js'

type SignDataFn = (data: string, privateKey: string) => Promise<string | Uint8Array>

export type ClientInformation = {
  ClientType: string
  ClientVersion: string
  ClientInstanceId: string
}

export function normalizeEndpoint(endpoint: string) {
  const withProtocol = /^https:\/\//i.test(endpoint) ? endpoint : `https://${endpoint}`
  return `${withProtocol.replace(/\/+$/, '')}/`
}

export function getClientInformation(clientInstanceId?: string): ClientInformation {
  return createClientInformation(clientInstanceId)
}

export function getClientVersion() {
  return getNativeClientVersion()
}

export function toBase64(value: string, encoding: BufferEncoding = 'binary') {
  return Buffer.from(value, encoding).toString('base64')
}

export function fromBase64(value: string, encoding: BufferEncoding = 'binary') {
  return Buffer.from(value, 'base64').toString(encoding)
}

export function toBase64Json(value: unknown) {
  return Buffer.from(JSON.stringify(value), 'utf8').toString('base64')
}

export function parseJsonWebTokenPayload<T>(jsonWebToken: string): T {
  const [, payload] = jsonWebToken.split('.', 3)
  if (!payload) {
    throw new Error('Malformed JSON Web Token of API key')
  }

  const normalized = payload.replace(/-/g, '+').replace(/_/g, '/')
  const padding = normalized.length % 4
  const padded = padding === 0 ? normalized : `${normalized}${'='.repeat(4 - padding)}`

  return JSON.parse(Buffer.from(padded, 'base64').toString('utf8')) as T
}

export async function computeCsrfToken(
  authToken: PsrSessionToken,
  privateKey: string,
  signData: SignDataFn,
) {
  const timestamp = new Date().toJSON()
  const digest = createHash('sha256').update(`${authToken.SessionId};${timestamp}`).digest('hex')
  const digestBase64 = Buffer.from(digest, 'utf8').toString('base64')
  const signature = await signData(digestBase64, privateKey)
  const signatureBinary =
    typeof signature === 'string' ? signature : Buffer.from(signature).toString('binary')

  return `${toBase64(signatureBinary)};${authToken.SessionId};${timestamp}`
}
