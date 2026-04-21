export const PsrExternalLinkTypes = {
  Password: 0,
  PasswordCopy: 1,
  Document: 2,
  Rdp: 3,
  Ssh: 4,
  Sso: 5,
} as const

export type PsrExternalLinkType = (typeof PsrExternalLinkTypes)[keyof typeof PsrExternalLinkTypes]
