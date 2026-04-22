export declare const cryptoImpl: Crypto;
export declare const textEncoder: TextEncoder;
export declare const textDecoder: TextDecoder;
export declare const RSA_SEPARATOR: string;
export declare const MTO_ENCRYPTION_CHAIN: {
    readonly Rsa_Pbkdf2Sha1_AesCbc: 0;
    readonly Pbkdf2Sha1_AesCbc: 1;
    readonly Ecdh_HkdfSha256_AesGcm: 2;
    readonly Pbkdf2Sha256_AesGcm: 3;
    readonly AesGcm: 4;
    readonly Pbkdf2Sha256_610005Iterations_AesGcm_withPadding: 5;
    readonly AesGcm_withPadding: 6;
};
export declare const MTO_HASH_ALGORITHM: {
    readonly Pbkdf2Sha1_100000Iterations: 0;
    readonly Pbkdf2Sha256_100000Iterations: 1;
    readonly Pbkdf2Sha256_623420Iterations: 2;
};
export type CryptoValue = string | Uint8Array | ArrayBufferLike;
export type SymmetricAesRightKey = {
    iv: Uint8Array;
    encryptedValue: Uint8Array;
};
export type SymmetricPasswordRightKey = {
    salt: Uint8Array;
    aesIv: Uint8Array;
    encryptedValue: Uint8Array;
};
export type AsymmetricEccRightKey = {
    eccPublicKey: Uint8Array;
    salt: Uint8Array;
    aesIv: Uint8Array;
    encryptedValue: Uint8Array;
};
export type EccPublicKeyJwk = {
    x: string;
    y: string;
    kty: 'EC';
    crv: 'P-521';
};
export type EccPrivateKeyJwk = EccPublicKeyJwk & {
    d: string;
};
export declare function toBinaryString(value: CryptoValue | null | undefined): string;
export declare function toUint8Array(value: CryptoValue | null | undefined): Uint8Array;
export declare function toSerializedKeyBytes(value: CryptoValue | null | undefined): Uint8Array;
export declare function binaryToUtf8(value: CryptoValue | null | undefined): string;
export declare function utf8ToBinary(value: string): string;
export declare function concatBytes(...chunks: Uint8Array[]): Uint8Array<ArrayBuffer>;
export declare function randomUint8Array(length: number): Uint8Array<ArrayBuffer>;
export declare function toArrayBuffer(value: Uint8Array): ArrayBuffer;
export declare function base64UrlDecode(value: string): string;
export declare function base64UrlEncode(value: string): string;
export declare function serializeEccParameter(value: string): Uint8Array<ArrayBuffer>;
export declare function deserializeCurve521Parameter(value: Uint8Array): string;
export declare function createClientInformation(clientInstanceId?: string): {
    ClientType: string;
    ClientVersion: string;
    ClientInstanceId: string;
};
export declare function getClientVersion(): string;
export declare function usesSymmetricKey(value: CryptoValue | null | undefined): boolean;
