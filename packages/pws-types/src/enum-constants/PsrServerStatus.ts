export const PsrServerStatuses = {
  Online: 0,
  Offline: 1,
} as const

export type PsrServerStatus = (typeof PsrServerStatuses)[keyof typeof PsrServerStatuses]
