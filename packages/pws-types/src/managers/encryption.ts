import type { PsrByteArrayLike, PsrEncryptionKeyPair, PsrPasswordHashResult } from '../runtime'
import type { MtoEncryptionChain, MtoHashAlgorithm } from '../enum-constants'

export type EncryptionManager = {
  decrypt(
    privateKey: PsrByteArrayLike,
    encryptedValue: PsrByteArrayLike,
  ): Promise<string | Uint8Array> | string | Uint8Array
  decryptContainerItem(
    privateKey: PsrByteArrayLike,
    encryptedValue: PsrByteArrayLike,
  ): Promise<string>
  encryptWithPublicKey(
    publicKey: PsrByteArrayLike,
    value: PsrByteArrayLike,
  ): Promise<string | Uint8Array> | string | Uint8Array
  encryptTextWithPublicKey(
    publicKey: PsrByteArrayLike,
    value: string,
  ): Promise<string | Uint8Array> | string | Uint8Array
  encryptWithPassword(
    password: string,
    value: PsrByteArrayLike,
  ): Promise<string | Uint8Array> | string | Uint8Array
  encrypt(
    encryptionChain: MtoEncryptionChain | number,
    value: string,
    privateKey?: PsrByteArrayLike | null,
  ): Promise<string | Uint8Array>
  encryptContainerItem(
    publicKey: PsrByteArrayLike | null,
    plaintext: string,
    privateKeyFactory?: (() => Promise<string | Uint8Array | null>) | null,
  ): Promise<{
    encryptedValue: string | Uint8Array | null
    privateKey: string | Uint8Array | null
    publicKey: string | Uint8Array | null
  }>
  mtoPbkdf2(
    password: string,
    salt?: PsrByteArrayLike | null,
    hashAlgorithm?: MtoHashAlgorithm | number | null,
  ): Promise<PsrPasswordHashResult>
  signData(data: PsrByteArrayLike, privateKey: PsrByteArrayLike): Promise<string | Uint8Array>
  generateKeyPair(): Promise<PsrEncryptionKeyPair>
  setEncryptionVersion(version: number): void
  getEncryptionVersion(): number
}
