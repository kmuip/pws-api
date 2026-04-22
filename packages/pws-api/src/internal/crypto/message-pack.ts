import type {
  AsymmetricEccRightKey,
  CryptoValue,
  EccPrivateKeyJwk,
  EccPublicKeyJwk,
  SymmetricAesRightKey,
  SymmetricPasswordRightKey,
} from './shared.js'
import {
  concatBytes,
  deserializeCurve521Parameter,
  serializeEccParameter,
  toSerializedKeyBytes,
  toUint8Array,
} from './shared.js'

function encodeArrayHeader(length: number) {
  if (length < 16) {
    return Uint8Array.of(0x90 | length)
  }

  if (length < 0x10000) {
    return Uint8Array.of(0xdc, (length >> 8) & 0xff, length & 0xff)
  }

  throw new Error(`Unsupported MessagePack array length ${length}`)
}

function encodeBinHeader(length: number) {
  if (length < 0x100) {
    return Uint8Array.of(0xc4, length)
  }

  if (length < 0x10000) {
    return Uint8Array.of(0xc5, (length >> 8) & 0xff, length & 0xff)
  }

  return Uint8Array.of(
    0xc6,
    (length >> 24) & 0xff,
    (length >> 16) & 0xff,
    (length >> 8) & 0xff,
    length & 0xff,
  )
}

function encodeMessagePackBinaryArray(values: Uint8Array[]) {
  return concatBytes(
    encodeArrayHeader(values.length),
    ...values.flatMap((value) => [encodeBinHeader(value.length), value]),
  )
}

function readLength(bytes: Uint8Array, offset: number, prefix: number) {
  if (prefix <= 0xbf) {
    return { length: prefix & 0x0f, nextOffset: offset }
  }

  if (prefix === 0xdc) {
    return { length: (bytes[offset] << 8) | bytes[offset + 1], nextOffset: offset + 2 }
  }

  if (prefix === 0xc4) {
    return { length: bytes[offset], nextOffset: offset + 1 }
  }

  if (prefix === 0xc5) {
    return { length: (bytes[offset] << 8) | bytes[offset + 1], nextOffset: offset + 2 }
  }

  if (prefix === 0xc6) {
    return {
      length:
        ((bytes[offset] << 24) >>> 0) |
        (bytes[offset + 1] << 16) |
        (bytes[offset + 2] << 8) |
        bytes[offset + 3],
      nextOffset: offset + 4,
    }
  }

  throw new Error(`Unsupported MessagePack prefix 0x${prefix.toString(16)}`)
}

function decodeMessagePackBinaryArray(value: Uint8Array) {
  let offset = 0
  const arrayPrefix = value[offset]
  offset += 1
  const { length: itemCount, nextOffset } = readLength(value, offset, arrayPrefix)
  offset = nextOffset

  const result: Uint8Array[] = []
  for (let index = 0; index < itemCount; index += 1) {
    const prefix = value[offset]
    offset += 1
    const { length, nextOffset: valueOffset } = readLength(value, offset, prefix)
    offset = valueOffset
    result.push(value.slice(offset, offset + length))
    offset += length
  }

  return result
}

export function serializeSymmetricAesRightKey(value: SymmetricAesRightKey) {
  return encodeMessagePackBinaryArray([value.iv, value.encryptedValue])
}

export function deserializeSymmetricAesRightKey(value: CryptoValue): SymmetricAesRightKey {
  const [iv, encryptedValue] = decodeMessagePackBinaryArray(toUint8Array(value))
  return { iv, encryptedValue }
}

export function serializeSymmetricPasswordRightKey(value: SymmetricPasswordRightKey) {
  return encodeMessagePackBinaryArray([value.salt, value.aesIv, value.encryptedValue])
}

export function deserializeSymmetricPasswordRightKey(
  value: CryptoValue,
): SymmetricPasswordRightKey {
  const [salt, aesIv, encryptedValue] = decodeMessagePackBinaryArray(toUint8Array(value))
  return { salt, aesIv, encryptedValue }
}

export function serializeEccPublicKey(publicKey: EccPublicKeyJwk) {
  return encodeMessagePackBinaryArray([
    serializeEccParameter(publicKey.x),
    serializeEccParameter(publicKey.y),
  ])
}

export function deserializeEccPublicKey(value: CryptoValue): EccPublicKeyJwk {
  const [x, y] = decodeMessagePackBinaryArray(toSerializedKeyBytes(value))
  return {
    x: deserializeCurve521Parameter(x),
    y: deserializeCurve521Parameter(y),
    kty: 'EC',
    crv: 'P-521',
  }
}

export function serializeEccPrivateKey(privateKey: EccPrivateKeyJwk) {
  return encodeMessagePackBinaryArray([
    serializeEccParameter(privateKey.d),
    serializeEccParameter(privateKey.x),
    serializeEccParameter(privateKey.y),
  ])
}

export function deserializeEccPrivateKey(value: CryptoValue): EccPrivateKeyJwk {
  const [d, x, y] = decodeMessagePackBinaryArray(toSerializedKeyBytes(value))
  return {
    d: deserializeCurve521Parameter(d),
    x: deserializeCurve521Parameter(x),
    y: deserializeCurve521Parameter(y),
    kty: 'EC',
    crv: 'P-521',
  }
}

export function serializeAsymmetricEccRightKey(value: AsymmetricEccRightKey) {
  return encodeMessagePackBinaryArray([
    value.eccPublicKey,
    value.salt,
    value.aesIv,
    value.encryptedValue,
  ])
}

export function deserializeAsymmetricEccRightKey(value: CryptoValue): AsymmetricEccRightKey {
  const [eccPublicKey, salt, aesIv, encryptedValue] = decodeMessagePackBinaryArray(
    toUint8Array(value),
  )
  return { eccPublicKey, salt, aesIv, encryptedValue }
}
