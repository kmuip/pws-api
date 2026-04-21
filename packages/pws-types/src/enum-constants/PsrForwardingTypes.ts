export const PsrForwardingTypes = {
  ForwardToSmtp: 0,
  ForwardToServerFile: 1,
  ForwardToEventLog: 2,
} as const

export type PsrForwardingType = (typeof PsrForwardingTypes)[keyof typeof PsrForwardingTypes]
