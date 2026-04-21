export const PsrMultiFactorFields = {
  None: 0,
  OneTimeToken: 1,
  NextOneTimeToken: 2,
  Pin: 4,
  NewPinRequired: 8,
  CertificateThumbPrint: 16,
  SignedDataId: 32,
} as const

export type PsrMultiFactorField = (typeof PsrMultiFactorFields)[keyof typeof PsrMultiFactorFields]
