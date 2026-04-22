import type { EncryptionManager, MtoEncryptionChain, MtoHashAlgorithm, PsrByteArrayLike, PsrEncryptionKeyPair } from '@kmuip/pws-types';
export declare class RuntimeEncryptionManager implements EncryptionManager {
    private readonly encryptions;
    private currentEncryption;
    private encryptionVersion;
    constructor();
    decrypt(privateKey: PsrByteArrayLike, encryptedValue: PsrByteArrayLike): string | Uint8Array<ArrayBufferLike> | Promise<string | Uint8Array<ArrayBufferLike>>;
    decryptContainerItem(privateKey: PsrByteArrayLike, encryptedValue: PsrByteArrayLike): Promise<string>;
    encryptWithPublicKey(publicKey: PsrByteArrayLike, value: PsrByteArrayLike): string | Uint8Array<ArrayBufferLike> | Promise<string | Uint8Array<ArrayBufferLike>>;
    encryptRightKeyWithPublicKey(publicKey: PsrByteArrayLike, value: PsrByteArrayLike): Promise<string>;
    encryptTextWithPublicKey(publicKey: PsrByteArrayLike, value: string): string | Uint8Array<ArrayBufferLike> | Promise<string | Uint8Array<ArrayBufferLike>>;
    encryptWithPassword(password: string, value: PsrByteArrayLike): string | Uint8Array<ArrayBufferLike> | Promise<string | Uint8Array<ArrayBufferLike>>;
    encrypt(encryptionChain: MtoEncryptionChain | number, value: string, privateKey?: PsrByteArrayLike | null): Promise<string>;
    encryptContainerItem(publicKey: PsrByteArrayLike | null, plaintext: string, privateKeyFactory?: (() => Promise<string | Uint8Array | null>) | null): Promise<{
        encryptedValue: string | Uint8Array | null;
        privateKey: string | Uint8Array | null;
        publicKey: string | Uint8Array | null;
    }>;
    mtoPbkdf2(password: string, salt?: PsrByteArrayLike | null, hashAlgorithm?: MtoHashAlgorithm | number | null): Promise<import("@kmuip/pws-types").PsrPasswordHashResult>;
    signData(data: PsrByteArrayLike, privateKey: PsrByteArrayLike): Promise<string | Uint8Array<ArrayBufferLike>>;
    generateKeyPair(): Promise<PsrEncryptionKeyPair>;
    setEncryptionVersion(version: number): void;
    getEncryptionVersion(): number;
}
