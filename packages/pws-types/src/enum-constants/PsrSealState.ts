export const PsrSealStates = {
  SealStateUndecided: 0,
  SealStateGranted: 1,
  SealStateDenied: 2,
} as const

export type PsrSealState = (typeof PsrSealStates)[keyof typeof PsrSealStates]

