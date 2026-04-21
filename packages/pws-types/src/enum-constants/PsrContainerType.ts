export const PsrContainerTypes = {
  Password: 0,
  Form: 1,
  Document: 2,
} as const

export type PsrContainerType = (typeof PsrContainerTypes)[keyof typeof PsrContainerTypes]
