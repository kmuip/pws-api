export const PasswordGeneratorSeparator = {
  None: 0,
  UpperCaseLetter: 1,
  Space: 2,
  Hyphen: 3,
  Underscore: 4,
} as const

export type PasswordGeneratorSeparator =
  (typeof PasswordGeneratorSeparator)[keyof typeof PasswordGeneratorSeparator]
