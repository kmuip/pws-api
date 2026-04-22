import { randomUUID, webcrypto } from 'node:crypto'

export const cryptoImpl = globalThis.crypto ?? webcrypto
export const textEncoder = new TextEncoder()
export const textDecoder = new TextDecoder()
export const RSA_SEPARATOR = Buffer.from('AQUABQ==', 'base64').toString('binary')

export const MTO_ENCRYPTION_CHAIN = {
  Rsa_Pbkdf2Sha1_AesCbc: 0,
  Pbkdf2Sha1_AesCbc: 1,
  Ecdh_HkdfSha256_AesGcm: 2,
  Pbkdf2Sha256_AesGcm: 3,
  AesGcm: 4,
  Pbkdf2Sha256_610005Iterations_AesGcm_withPadding: 5,
  AesGcm_withPadding: 6,
} as const

export const MTO_HASH_ALGORITHM = {
  Pbkdf2Sha1_100000Iterations: 0,
  Pbkdf2Sha256_100000Iterations: 1,
  Pbkdf2Sha256_623420Iterations: 2,
} as const

export type CryptoValue = string | Uint8Array | ArrayBufferLike
export type SymmetricAesRightKey = { iv: Uint8Array; encryptedValue: Uint8Array }
export type SymmetricPasswordRightKey = {
  salt: Uint8Array
  aesIv: Uint8Array
  encryptedValue: Uint8Array
}
export type AsymmetricEccRightKey = {
  eccPublicKey: Uint8Array
  salt: Uint8Array
  aesIv: Uint8Array
  encryptedValue: Uint8Array
}
export type EccPublicKeyJwk = { x: string; y: string; kty: 'EC'; crv: 'P-521' }
export type EccPrivateKeyJwk = EccPublicKeyJwk & { d: string }

export function toBinaryString(value: CryptoValue | null | undefined): string {
  if (value == null) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  if (value instanceof Uint8Array) {
    return Buffer.from(value).toString('binary')
  }

  return Buffer.from(value).toString('binary')
}

export function toUint8Array(value: CryptoValue | null | undefined): Uint8Array {
  if (value == null) {
    return new Uint8Array()
  }

  if (value instanceof Uint8Array) {
    return Uint8Array.from(value)
  }

  if (typeof value === 'string') {
    return Uint8Array.from(value, (character) => character.charCodeAt(0))
  }

  return Uint8Array.from(new Uint8Array(value))
}

function looksLikeKeyPrefix(bytes: Uint8Array) {
  if (bytes.length < 2) {
    return false
  }

  return (
    (bytes[0] === 80 && bytes[1] === 70) ||
    (bytes[0] === 146 && bytes[1] === 196) ||
    (bytes[0] === 147 && bytes[1] === 196)
  )
}

export function toSerializedKeyBytes(value: CryptoValue | null | undefined): Uint8Array {
  const bytes = toUint8Array(value)
  if (looksLikeKeyPrefix(bytes)) {
    return bytes
  }

  if (typeof value === 'string') {
    try {
      const decoded = Uint8Array.from(Buffer.from(value, 'base64'))
      if (looksLikeKeyPrefix(decoded)) {
        return decoded
      }
    } catch {
      return bytes
    }
  }

  return bytes
}

export function binaryToUtf8(value: CryptoValue | null | undefined) {
  return textDecoder.decode(toUint8Array(value))
}

export function utf8ToBinary(value: string) {
  return toBinaryString(textEncoder.encode(value))
}

export function concatBytes(...chunks: Uint8Array[]) {
  const length = chunks.reduce((sum, chunk) => sum + chunk.length, 0)
  const result = new Uint8Array(length)
  let offset = 0

  for (const chunk of chunks) {
    result.set(chunk, offset)
    offset += chunk.length
  }

  return result
}

export function randomUint8Array(length: number) {
  return Uint8Array.from(cryptoImpl.getRandomValues(new Uint8Array(length)))
}

export function toArrayBuffer(value: Uint8Array) {
  return value.buffer.slice(value.byteOffset, value.byteOffset + value.byteLength) as ArrayBuffer
}

export function base64UrlDecode(value: string) {
  let normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  if (normalized.length % 4 !== 0) {
    normalized += '='.repeat(4 - (normalized.length % 4))
  }
  return normalized
}

export function base64UrlEncode(value: string) {
  return value.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

export function serializeEccParameter(value: string) {
  return Uint8Array.from(Buffer.from(base64UrlDecode(value), 'base64'))
}

export function deserializeCurve521Parameter(value: Uint8Array) {
  const padded = value.length >= 66 ? value : concatBytes(new Uint8Array(66 - value.length), value)
  return base64UrlEncode(Buffer.from(padded).toString('base64'))
}

export function createClientInformation(clientInstanceId?: string) {
  return {
    ClientType: 'PsrApiJs',
    ClientVersion: '26.3.101.34065',
    ClientInstanceId: clientInstanceId ?? randomUUID(),
  }
}

export function getClientVersion() {
  return '26.3.101.34065'
}

export function usesSymmetricKey(value: CryptoValue | null | undefined) {
  return toUint8Array(value).length === 32
}
