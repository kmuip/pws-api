export const PsrMultiFactorAuthTypes = {
  None: 0,
  GoogleAuthenticator: 1,
  RsaSecurIdToken: 2,
  SafeNetOtp: 3,
  Pki: 4,
  Yubico: 5,
  Radius: 6,
} as const

export type PsrMultiFactorAuthType =
  (typeof PsrMultiFactorAuthTypes)[keyof typeof PsrMultiFactorAuthTypes]
