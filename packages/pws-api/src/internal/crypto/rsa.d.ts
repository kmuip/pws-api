import { type CryptoValue } from './shared.js';
export declare class NativeRsa {
    private privateKey;
    private publicKey;
    generateKeyPair(): void;
    publicKeyFromXml(value: string): void;
    privateKeyFromXml(value: string): void;
    publicKeyToXml(): string;
    privateKeyToXml(): string;
    encrypt(value: string): string;
    decrypt(value: string): string;
    signData(value: string): string;
}
export declare function getPublicKeyType(value: CryptoValue): "RSA" | "ECC";
export declare function getPrivateKeyType(value: CryptoValue): "RSA" | "ECC";
export declare function encryptWithPasswordProviderV1(password: string, plaintext: CryptoValue): Promise<string>;
export declare function decryptWithPasswordProviderV1(password: string, encryptedValue: CryptoValue): Promise<string>;
export declare function encryptWithRsaProvider(publicKey: CryptoValue, plaintext: CryptoValue): Promise<string>;
export declare function decryptWithRsaProvider(privateKey: CryptoValue, encryptedValue: CryptoValue): Promise<string>;
