export const PsrActiveDirectoryAuthenticationTypes = {
  None: 0,
  Secure: 1,
  SecureSocketsLayer: 2,
  ReadonlyServer: 4,
  Signing: 64,
  Sealing: 128,
} as const

export type PsrActiveDirectoryAuthenticationType =
  (typeof PsrActiveDirectoryAuthenticationTypes)[keyof typeof PsrActiveDirectoryAuthenticationTypes]
