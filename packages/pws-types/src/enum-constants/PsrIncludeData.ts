export const PsrIncludeDataConst = {
  IncludeData_Container_CredentialCheck: 0,
} as const

export type PsrIncludeData = (typeof PsrIncludeDataConst)[keyof typeof PsrIncludeDataConst]

