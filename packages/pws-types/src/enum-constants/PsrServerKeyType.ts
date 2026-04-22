export const PsrServerKeyTypes = {
  ServerKeyTypeCertificate: 0,
  ServerKeyTypePkcs11: 1,
} as const

export type PsrServerKeyType = (typeof PsrServerKeyTypes)[keyof typeof PsrServerKeyTypes]
