export declare const MtoEncryptionChains: {
    readonly Rsa_Pbkdf2Sha1_AesCbc: 0;
    readonly Pbkdf2Sha1_AesCbc: 1;
    readonly Ecdh_HkdfSha256_AesGcm: 2;
    readonly Pbkdf2Sha256_AesGcm: 3;
    readonly AesGcm: 4;
    readonly Pbkdf2Sha256_610005Iterations_AesGcm_withPadding: 5;
    readonly AesGcm_withPadding: 6;
};
export type MtoEncryptionChain = (typeof MtoEncryptionChains)[keyof typeof MtoEncryptionChains];
