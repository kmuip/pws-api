export const PsrCredentialCheckResults = {
  CredentialCheckResultTrue: 0,
  CredentialCheckResultFalse: 1,
  CredentialCheckResultUnknown: 2,
  CredentialCheckResultError: 3,
} as const

export type PsrCredentialCheckResult =
  (typeof PsrCredentialCheckResults)[keyof typeof PsrCredentialCheckResults]
