export const PsrDataStates = {
  StateActive: 1,
  StateHistory: 2,
  StateDeleted: 4,
} as const

export type PsrDataState = (typeof PsrDataStates)[keyof typeof PsrDataStates]
