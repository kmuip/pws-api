export const PsrEscalationLevels = {
  DebugMessage: 0,
  VerboseMessage: 1,
  NormalMessage: 2,
  WarningMessage: 3,
  ErrorMessage: 5,
} as const

export type PsrEscalationLevel = (typeof PsrEscalationLevels)[keyof typeof PsrEscalationLevels]
