export const PsrSessionStates = {
  Disconnected: 0,
  Connected: 1,
} as const

export type PsrSessionState = (typeof PsrSessionStates)[keyof typeof PsrSessionStates]

