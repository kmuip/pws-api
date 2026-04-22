import type { PsrEncryptionKeyPair } from '@kmuip/pws-types';
import { type CryptoValue } from './shared.js';
export declare function encryptWithEcc(publicKey: CryptoValue, plaintext: CryptoValue): Promise<string>;
export declare function decryptWithEcc(privateKey: CryptoValue, encryptedValue: CryptoValue): Promise<string>;
export declare function signWithEccPrivateKey(privateKey: CryptoValue, value: CryptoValue): Promise<string>;
export declare function generateEccKey(): Promise<PsrEncryptionKeyPair>;
