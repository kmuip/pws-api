import type {
  MtoHashAlgorithm,
  PsrEncryptionKeyPair,
  PsrPasswordHashResult,
} from '@kmuip/pws-types'
import {
  decryptWithAesGcm,
  decryptWithAesGcmPadding,
  decryptWithPasswordProviderV2,
  decryptWithPasswordProviderV3,
  encryptWithAesGcm,
  encryptWithAesGcmPadding,
  encryptWithPasswordProviderV2,
  encryptWithPasswordProviderV3,
  generateAesKey,
  pbkdf2,
} from './crypto/aes.js'
import {
  decryptWithEcc,
  encryptWithEcc,
  generateEccKey,
  signWithEccPrivateKey,
} from './crypto/ecc.js'
import {
  decryptWithPasswordProviderV1,
  decryptWithRsaProvider,
  encryptWithPasswordProviderV1,
  encryptWithRsaProvider,
  getPrivateKeyType,
  getPublicKeyType,
  NativeRsa,
} from './crypto/rsa.js'
import {
  MTO_ENCRYPTION_CHAIN,
  MTO_HASH_ALGORITHM,
  type CryptoValue,
  binaryToUtf8,
  concatBytes,
  createClientInformation,
  getClientVersion,
  randomUint8Array,
  toBinaryString,
  toUint8Array,
  utf8ToBinary,
  usesSymmetricKey,
} from './crypto/shared.js'

export async function calculateMtoHash(
  hashAlgorithm: MtoHashAlgorithm | number,
  password: string,
  saltBase64?: string | null,
): Promise<PsrPasswordHashResult> {
  if (password == null) {
    return {
      HashAlgorithm: Number(hashAlgorithm),
      Hash: '',
      Salt: '',
    }
  }

  const salt = saltBase64
    ? Uint8Array.from(Buffer.from(saltBase64, 'base64'))
    : randomUint8Array(16)

  let hash: Uint8Array
  switch (Number(hashAlgorithm)) {
    case MTO_HASH_ALGORITHM.Pbkdf2Sha1_100000Iterations:
      hash = await pbkdf2(password, salt, 100000, 'SHA-1', 256)
      break
    case MTO_HASH_ALGORITHM.Pbkdf2Sha256_100000Iterations:
      hash = await pbkdf2(password, salt, 100000, 'SHA-256', 256)
      break
    case MTO_HASH_ALGORITHM.Pbkdf2Sha256_623420Iterations:
      hash = await pbkdf2(password, salt, 623420, 'SHA-256', 256)
      break
    default:
      throw new Error(`CalculateHashWithNewSalt - unknown hash algorithm: ${String(hashAlgorithm)}`)
  }

  return {
    HashAlgorithm: Number(hashAlgorithm),
    Hash: Buffer.from(hash).toString('base64'),
    Salt: Buffer.from(salt).toString('base64'),
  }
}

export {
  createClientInformation,
  generateAesKey,
  generateEccKey,
  getClientVersion,
  usesSymmetricKey,
}

export async function generateRsaPkcs1Key(): Promise<PsrEncryptionKeyPair> {
  const rsa = new NativeRsa()
  rsa.generateKeyPair()
  return {
    publicKey: rsa.publicKeyToXml(),
    privateKey: rsa.privateKeyToXml(),
  }
}

export async function encryptWithDetectedPublicKey(publicKey: CryptoValue, value: CryptoValue) {
  return getPublicKeyType(publicKey) === 'RSA'
    ? encryptWithRsaProvider(publicKey, value)
    : encryptWithEcc(publicKey, value)
}

export async function signWithDetectedPrivateKey(privateKey: CryptoValue, value: CryptoValue) {
  if (getPrivateKeyType(privateKey) === 'RSA') {
    const rsa = new NativeRsa()
    rsa.privateKeyFromXml(toBinaryString(privateKey))
    return rsa.signData(toBinaryString(value))
  }

  return signWithEccPrivateKey(privateKey, value)
}

export async function mtoEncrypt(chain: number, key: CryptoValue, value: CryptoValue) {
  if (!value) {
    return ''
  }

  let encryptedValue = ''
  switch (chain) {
    case MTO_ENCRYPTION_CHAIN.Rsa_Pbkdf2Sha1_AesCbc:
      encryptedValue = await encryptWithRsaProvider(key, value)
      break
    case MTO_ENCRYPTION_CHAIN.Pbkdf2Sha1_AesCbc:
      encryptedValue = await encryptWithPasswordProviderV1(toBinaryString(key), value)
      break
    case MTO_ENCRYPTION_CHAIN.Ecdh_HkdfSha256_AesGcm:
      encryptedValue = await encryptWithEcc(key, value)
      break
    case MTO_ENCRYPTION_CHAIN.Pbkdf2Sha256_AesGcm:
      encryptedValue = await encryptWithPasswordProviderV2(toBinaryString(key), value)
      break
    case MTO_ENCRYPTION_CHAIN.AesGcm:
      encryptedValue = await encryptWithAesGcm(key, value)
      break
    case MTO_ENCRYPTION_CHAIN.Pbkdf2Sha256_610005Iterations_AesGcm_withPadding:
      encryptedValue = await encryptWithPasswordProviderV3(toBinaryString(key), value)
      break
    case MTO_ENCRYPTION_CHAIN.AesGcm_withPadding:
      encryptedValue = await encryptWithAesGcmPadding(key, value)
      break
    default:
      throw new Error(`Unsupported encryption chain ${chain}`)
  }

  return toBinaryString(concatBytes(Uint8Array.of(chain), toUint8Array(encryptedValue)))
}

export async function mtoDecrypt(key: CryptoValue, encryptedValue: CryptoValue) {
  if (!encryptedValue) {
    return ''
  }

  const bytes = toUint8Array(encryptedValue)
  const chain = bytes[0]
  const payload = bytes.slice(1)

  switch (chain) {
    case MTO_ENCRYPTION_CHAIN.Rsa_Pbkdf2Sha1_AesCbc:
      return decryptWithRsaProvider(key, payload)
    case MTO_ENCRYPTION_CHAIN.Pbkdf2Sha1_AesCbc:
      return decryptWithPasswordProviderV1(toBinaryString(key), payload)
    case MTO_ENCRYPTION_CHAIN.Ecdh_HkdfSha256_AesGcm:
      return decryptWithEcc(key, payload)
    case MTO_ENCRYPTION_CHAIN.Pbkdf2Sha256_AesGcm:
      return decryptWithPasswordProviderV2(toBinaryString(key), payload)
    case MTO_ENCRYPTION_CHAIN.AesGcm:
      return decryptWithAesGcm(key, payload)
    case MTO_ENCRYPTION_CHAIN.Pbkdf2Sha256_610005Iterations_AesGcm_withPadding:
      return decryptWithPasswordProviderV3(toBinaryString(key), payload)
    case MTO_ENCRYPTION_CHAIN.AesGcm_withPadding:
      return decryptWithAesGcmPadding(key, payload)
    default:
      throw new Error(`Unsupported encryption chain ${chain}`)
  }
}

export function normalizeBinaryValue(value: CryptoValue | null | undefined) {
  return toBinaryString(value)
}

export function encodeUtf8Binary(value: string) {
  return utf8ToBinary(value)
}

export function decodeUtf8Binary(value: CryptoValue) {
  return binaryToUtf8(value)
}
