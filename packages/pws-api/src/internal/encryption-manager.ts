import type {
  EncryptionManager,
  MtoEncryptionChain,
  MtoHashAlgorithm,
  PsrByteArrayLike,
  PsrEncryptionKeyPair,
} from '@kmuip/pws-types'
import {
  calculateMtoHash,
  decodeUtf8Binary,
  encodeUtf8Binary,
  generateAesKey,
  generateEccKey,
  generateRsaPkcs1Key,
  mtoDecrypt,
  mtoEncrypt,
  normalizeBinaryValue,
  signWithDetectedPrivateKey,
  encryptWithDetectedPublicKey,
} from './mto-crypto.js'

type EncryptionEngine = {
  decrypt(
    privateKey: PsrByteArrayLike,
    encryptedValue: PsrByteArrayLike,
  ): Promise<string | Uint8Array> | string | Uint8Array
  encryptWithPublicKey(
    publicKey: PsrByteArrayLike,
    value: PsrByteArrayLike,
  ): Promise<string | Uint8Array> | string | Uint8Array
  encryptWithPassword(
    password: string,
    value: PsrByteArrayLike,
  ): Promise<string | Uint8Array> | string | Uint8Array
  encryptWithKey?(
    privateKey: PsrByteArrayLike,
    value: PsrByteArrayLike,
  ): Promise<string | Uint8Array> | string | Uint8Array
  signData(data: PsrByteArrayLike, privateKey: PsrByteArrayLike): Promise<string | Uint8Array>
  generateKeyPair(): Promise<PsrEncryptionKeyPair>
}

class EncryptionV1 implements EncryptionEngine {
  decrypt(privateKey: PsrByteArrayLike, encryptedValue: PsrByteArrayLike) {
    return mtoDecrypt(privateKey, encryptedValue)
  }

  encryptWithPublicKey(publicKey: PsrByteArrayLike, value: PsrByteArrayLike) {
    return encryptWithDetectedPublicKey(publicKey, value)
  }

  encryptWithPassword(password: string, value: PsrByteArrayLike) {
    return mtoEncrypt(5, password, value)
  }

  encryptWithKey(privateKey: PsrByteArrayLike, value: PsrByteArrayLike) {
    return mtoEncrypt(6, privateKey, value)
  }

  signData(data: PsrByteArrayLike, privateKey: PsrByteArrayLike) {
    return signWithDetectedPrivateKey(privateKey, data)
  }

  generateKeyPair() {
    return generateRsaPkcs1Key()
  }
}

class EncryptionV2 implements EncryptionEngine {
  decrypt(privateKey: PsrByteArrayLike, encryptedValue: PsrByteArrayLike) {
    return mtoDecrypt(privateKey, encryptedValue)
  }

  encryptWithPublicKey(publicKey: PsrByteArrayLike, value: PsrByteArrayLike) {
    return encryptWithDetectedPublicKey(publicKey, value)
  }

  encryptWithPassword(password: string, value: PsrByteArrayLike) {
    return mtoEncrypt(5, password, value)
  }

  encryptWithKey(privateKey: PsrByteArrayLike, value: PsrByteArrayLike) {
    return mtoEncrypt(6, privateKey, value)
  }

  signData(data: PsrByteArrayLike, privateKey: PsrByteArrayLike) {
    return signWithDetectedPrivateKey(privateKey, data)
  }

  generateKeyPair() {
    return generateEccKey()
  }
}

export class RuntimeEncryptionManager implements EncryptionManager {
  private readonly encryptions: EncryptionEngine[]
  private currentEncryption: EncryptionEngine
  private encryptionVersion = 0

  constructor() {
    this.encryptions = [new EncryptionV1(), new EncryptionV2()]
    this.currentEncryption = this.encryptions[0]
  }

  decrypt(privateKey: PsrByteArrayLike, encryptedValue: PsrByteArrayLike) {
    return this.currentEncryption.decrypt(privateKey, encryptedValue)
  }

  async decryptContainerItem(privateKey: PsrByteArrayLike, encryptedValue: PsrByteArrayLike) {
    const decrypted = await this.currentEncryption.decrypt(privateKey, encryptedValue)
    return decodeUtf8Binary(normalizeBinaryValue(decrypted))
  }

  encryptWithPublicKey(publicKey: PsrByteArrayLike, value: PsrByteArrayLike) {
    return this.currentEncryption.encryptWithPublicKey(publicKey, value)
  }

  encryptTextWithPublicKey(publicKey: PsrByteArrayLike, value: string) {
    return this.currentEncryption.encryptWithPublicKey(publicKey, encodeUtf8Binary(value))
  }

  encryptWithPassword(password: string, value: PsrByteArrayLike) {
    return this.currentEncryption.encryptWithPassword(password, value)
  }

  encrypt(
    encryptionChain: MtoEncryptionChain | number,
    value: string,
    privateKey?: PsrByteArrayLike | null,
  ) {
    return mtoEncrypt(Number(encryptionChain), privateKey ?? '', value)
  }

  async encryptContainerItem(
    publicKey: PsrByteArrayLike | null,
    plaintext: string,
    privateKeyFactory?: (() => Promise<string | Uint8Array | null>) | null,
  ) {
    const encodedText = encodeUtf8Binary(plaintext)
    const result = {
      encryptedValue: null as string | Uint8Array | null,
      privateKey: null as string | Uint8Array | null,
      publicKey: null as string | Uint8Array | null,
    }

    if (this.encryptionVersion === 0 || publicKey) {
      result.publicKey = publicKey
      if (!result.publicKey) {
        const generated = await this.currentEncryption.generateKeyPair()
        result.privateKey = generated.privateKey
        result.publicKey = generated.publicKey
      }

      result.encryptedValue = await this.currentEncryption.encryptWithPublicKey(
        result.publicKey,
        encodedText,
      )
      return result
    }

    result.privateKey = privateKeyFactory ? await privateKeyFactory() : null
    if (!result.privateKey) {
      result.privateKey = generateAesKey()
    }

    if (!this.currentEncryption.encryptWithKey) {
      throw new Error('Current encryption engine does not support symmetric key encryption')
    }

    result.encryptedValue = await this.currentEncryption.encryptWithKey(
      result.privateKey,
      encodedText,
    )
    return result
  }

  mtoPbkdf2(
    password: string,
    salt?: PsrByteArrayLike | null,
    hashAlgorithm?: MtoHashAlgorithm | number | null,
  ) {
    const normalizedSalt =
      salt == null ? null : typeof salt === 'string' ? salt : Buffer.from(salt).toString('base64')
    return calculateMtoHash(
      hashAlgorithm == null ? 2 : Number(hashAlgorithm),
      password,
      normalizedSalt,
    )
  }

  signData(data: PsrByteArrayLike, privateKey: PsrByteArrayLike) {
    return this.currentEncryption.signData(data, privateKey)
  }

  generateKeyPair() {
    return this.currentEncryption.generateKeyPair()
  }

  setEncryptionVersion(version: number) {
    this.currentEncryption = this.encryptions[version]
    this.encryptionVersion = version
  }

  getEncryptionVersion() {
    return this.encryptionVersion
  }
}
