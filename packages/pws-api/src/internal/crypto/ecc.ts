import type { PsrEncryptionKeyPair } from '@kmuip/pws-types'
import {
  deserializeAsymmetricEccRightKey,
  deserializeEccPrivateKey,
  deserializeEccPublicKey,
  serializeAsymmetricEccRightKey,
  serializeEccPrivateKey,
  serializeEccPublicKey,
} from './message-pack.js'
import {
  cryptoImpl,
  type CryptoValue,
  type EccPrivateKeyJwk,
  type EccPublicKeyJwk,
  randomUint8Array,
  toArrayBuffer,
  toBinaryString,
  toUint8Array,
} from './shared.js'

async function deriveEcdhAesKey(publicKey: CryptoKey, privateKey: CryptoKey, salt: Uint8Array) {
  let secret = new Uint8Array(
    await cryptoImpl.subtle.deriveBits({ name: 'ECDH', public: publicKey }, privateKey, 528),
  )
  while (secret[0] === 0) {
    secret = secret.slice(1)
  }

  const hkdfKey = await cryptoImpl.subtle.importKey('raw', secret, { name: 'HKDF' }, false, [
    'deriveKey',
  ])
  return cryptoImpl.subtle.deriveKey(
    { name: 'HKDF', hash: 'SHA-256', salt: toArrayBuffer(salt), info: new ArrayBuffer(0) },
    hkdfKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  )
}

export async function encryptWithEcc(publicKey: CryptoValue, plaintext: CryptoValue) {
  const targetPublicKey = await cryptoImpl.subtle.importKey(
    'jwk',
    deserializeEccPublicKey(publicKey),
    { name: 'ECDH', namedCurve: 'P-521' },
    false,
    [],
  )
  const ephemeralPair = await cryptoImpl.subtle.generateKey(
    { name: 'ECDH', namedCurve: 'P-521' },
    true,
    ['deriveBits'],
  )
  const salt = randomUint8Array(32)
  const aesIv = randomUint8Array(12)
  const derivedKey = await deriveEcdhAesKey(targetPublicKey, ephemeralPair.privateKey, salt)
  const ephemeralPublicKey = (await cryptoImpl.subtle.exportKey(
    'jwk',
    ephemeralPair.publicKey,
  )) as JsonWebKey
  const encryptedValue = new Uint8Array(
    await cryptoImpl.subtle.encrypt(
      { name: 'AES-GCM', iv: toArrayBuffer(aesIv) },
      derivedKey,
      toArrayBuffer(toUint8Array(plaintext)),
    ),
  )

  return toBinaryString(
    serializeAsymmetricEccRightKey({
      eccPublicKey: serializeEccPublicKey(ephemeralPublicKey as EccPublicKeyJwk),
      salt,
      aesIv,
      encryptedValue,
    }),
  )
}

export async function decryptWithEcc(privateKey: CryptoValue, encryptedValue: CryptoValue) {
  const payload = deserializeAsymmetricEccRightKey(encryptedValue)
  const targetPublicKey = await cryptoImpl.subtle.importKey(
    'jwk',
    deserializeEccPublicKey(payload.eccPublicKey),
    { name: 'ECDH', namedCurve: 'P-521' },
    false,
    [],
  )
  const privateCryptoKey = await cryptoImpl.subtle.importKey(
    'jwk',
    deserializeEccPrivateKey(privateKey),
    { name: 'ECDH', namedCurve: 'P-521' },
    false,
    ['deriveBits'],
  )
  const derivedKey = await deriveEcdhAesKey(targetPublicKey, privateCryptoKey, payload.salt)
  const decryptedValue = await cryptoImpl.subtle.decrypt(
    { name: 'AES-GCM', iv: toArrayBuffer(payload.aesIv) },
    derivedKey,
    toArrayBuffer(payload.encryptedValue),
  )
  return toBinaryString(new Uint8Array(decryptedValue))
}

export async function signWithEccPrivateKey(privateKey: CryptoValue, value: CryptoValue) {
  const cryptoKey = await cryptoImpl.subtle.importKey(
    'jwk',
    deserializeEccPrivateKey(privateKey),
    { name: 'ECDSA', namedCurve: 'P-521' },
    false,
    ['sign'],
  )
  const signature = await cryptoImpl.subtle.sign(
    { name: 'ECDSA', hash: 'SHA-256' },
    cryptoKey,
    toArrayBuffer(toUint8Array(value)),
  )
  return toBinaryString(new Uint8Array(signature))
}

export async function generateEccKey(): Promise<PsrEncryptionKeyPair> {
  const pair = await cryptoImpl.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-521' }, true, [
    'deriveBits',
  ])
  const privateKey = (await cryptoImpl.subtle.exportKey('jwk', pair.privateKey)) as JsonWebKey
  const publicKey = (await cryptoImpl.subtle.exportKey('jwk', pair.publicKey)) as JsonWebKey

  return {
    privateKey: toBinaryString(serializeEccPrivateKey(privateKey as EccPrivateKeyJwk)),
    publicKey: toBinaryString(serializeEccPublicKey(publicKey as EccPublicKeyJwk)),
  }
}
