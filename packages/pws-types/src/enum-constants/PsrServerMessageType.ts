export const PsrServerMessageTypes = {
  Info: 0,
  Warning: 1,
  Error: 2,
} as const

export type PsrServerMessageType = (typeof PsrServerMessageTypes)[keyof typeof PsrServerMessageTypes]

