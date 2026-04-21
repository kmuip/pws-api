export const PsrApplicationTypes = {
  ApplicationSso: 0,
  ApplicationRdp: 1,
  ApplicationSsh: 2,
  ApplicationWeb: 3,
  ApplicationSaml: 4,
} as const

export type PsrApplicationType = (typeof PsrApplicationTypes)[keyof typeof PsrApplicationTypes]
