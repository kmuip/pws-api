export const MtoEncryptionChains = {
  Rsa_Pbkdf2Sha1_AesCbc: 0,
  Pbkdf2Sha1_AesCbc: 1,
  Ecdh_HkdfSha256_AesGcm: 2,
  Pbkdf2Sha256_AesGcm: 3,
  AesGcm: 4,
  Pbkdf2Sha256_610005Iterations_AesGcm_withPadding: 5,
  AesGcm_withPadding: 6,
} as const

export type MtoEncryptionChain = (typeof MtoEncryptionChains)[keyof typeof MtoEncryptionChains]
