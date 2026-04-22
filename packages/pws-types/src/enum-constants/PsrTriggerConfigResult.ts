export const PsrTriggerConfigResults = {
  None: 0,
  Own: 1,
  Any: 2,
} as const

export type PsrTriggerConfigResult =
  (typeof PsrTriggerConfigResults)[keyof typeof PsrTriggerConfigResults]
