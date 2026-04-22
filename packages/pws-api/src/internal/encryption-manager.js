import { calculateMtoHash, decodeUtf8Binary, encodeUtf8Binary, generateAesKey, generateEccKey, generateRsaPkcs1Key, mtoDecrypt, mtoEncrypt, normalizeBinaryValue, signWithDetectedPrivateKey, encryptWithDetectedPublicKey, } from './mto-crypto.js';
import { MTO_ENCRYPTION_CHAIN } from './crypto/shared.js';
import { getPublicKeyType } from './crypto/rsa.js';
class EncryptionV1 {
    decrypt(privateKey, encryptedValue) {
        return mtoDecrypt(privateKey, encryptedValue);
    }
    encryptWithPublicKey(publicKey, value) {
        return encryptWithDetectedPublicKey(publicKey, value);
    }
    encryptWithPassword(password, value) {
        return mtoEncrypt(5, password, value);
    }
    encryptWithKey(privateKey, value) {
        return mtoEncrypt(6, privateKey, value);
    }
    signData(data, privateKey) {
        return signWithDetectedPrivateKey(privateKey, data);
    }
    generateKeyPair() {
        return generateRsaPkcs1Key();
    }
}
class EncryptionV2 {
    decrypt(privateKey, encryptedValue) {
        return mtoDecrypt(privateKey, encryptedValue);
    }
    encryptWithPublicKey(publicKey, value) {
        return encryptWithDetectedPublicKey(publicKey, value);
    }
    encryptWithPassword(password, value) {
        return mtoEncrypt(5, password, value);
    }
    encryptWithKey(privateKey, value) {
        return mtoEncrypt(6, privateKey, value);
    }
    signData(data, privateKey) {
        return signWithDetectedPrivateKey(privateKey, data);
    }
    generateKeyPair() {
        return generateEccKey();
    }
}
export class RuntimeEncryptionManager {
    encryptions;
    currentEncryption;
    encryptionVersion = 0;
    constructor() {
        this.encryptions = [new EncryptionV1(), new EncryptionV2()];
        this.currentEncryption = this.encryptions[0];
    }
    decrypt(privateKey, encryptedValue) {
        return this.currentEncryption.decrypt(privateKey, encryptedValue);
    }
    async decryptContainerItem(privateKey, encryptedValue) {
        const decrypted = await this.currentEncryption.decrypt(privateKey, encryptedValue);
        return decodeUtf8Binary(normalizeBinaryValue(decrypted));
    }
    encryptWithPublicKey(publicKey, value) {
        return this.currentEncryption.encryptWithPublicKey(publicKey, value);
    }
    encryptRightKeyWithPublicKey(publicKey, value) {
        const chain = getPublicKeyType(publicKey) === 'RSA'
            ? MTO_ENCRYPTION_CHAIN.Rsa_Pbkdf2Sha1_AesCbc
            : MTO_ENCRYPTION_CHAIN.Ecdh_HkdfSha256_AesGcm;
        return mtoEncrypt(chain, publicKey, value);
    }
    encryptTextWithPublicKey(publicKey, value) {
        return this.currentEncryption.encryptWithPublicKey(publicKey, encodeUtf8Binary(value));
    }
    encryptWithPassword(password, value) {
        return this.currentEncryption.encryptWithPassword(password, value);
    }
    encrypt(encryptionChain, value, privateKey) {
        return mtoEncrypt(Number(encryptionChain), privateKey ?? '', value);
    }
    async encryptContainerItem(publicKey, plaintext, privateKeyFactory) {
        const encodedText = encodeUtf8Binary(plaintext);
        const result = {
            encryptedValue: null,
            privateKey: null,
            publicKey: null,
        };
        if (this.encryptionVersion === 0 || publicKey) {
            result.publicKey = publicKey;
            if (!result.publicKey) {
                const generated = await this.currentEncryption.generateKeyPair();
                result.privateKey = generated.privateKey;
                result.publicKey = generated.publicKey;
            }
            result.encryptedValue = await this.currentEncryption.encryptWithPublicKey(result.publicKey, encodedText);
            return result;
        }
        result.privateKey = privateKeyFactory ? await privateKeyFactory() : null;
        if (!result.privateKey) {
            result.privateKey = generateAesKey();
        }
        if (!this.currentEncryption.encryptWithKey) {
            throw new Error('Current encryption engine does not support symmetric key encryption');
        }
        result.encryptedValue = await this.currentEncryption.encryptWithKey(result.privateKey, encodedText);
        return result;
    }
    mtoPbkdf2(password, salt, hashAlgorithm) {
        const normalizedSalt = salt == null ? null : typeof salt === 'string' ? salt : Buffer.from(salt).toString('base64');
        return calculateMtoHash(hashAlgorithm == null ? 2 : Number(hashAlgorithm), password, normalizedSalt);
    }
    signData(data, privateKey) {
        return this.currentEncryption.signData(data, privateKey);
    }
    generateKeyPair() {
        return this.currentEncryption.generateKeyPair();
    }
    setEncryptionVersion(version) {
        this.currentEncryption = this.encryptions[version];
        this.encryptionVersion = version;
    }
    getEncryptionVersion() {
        return this.encryptionVersion;
    }
}
