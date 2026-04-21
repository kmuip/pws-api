export const PsrOptionGroups = {
  OptionGroupSystem: 0,
  OptionGroupSecurity1: 1,
  OptionGroupSecurity2: 2,
  OptionGroupSecurity3: 3,
  OptionGroupSecurity4: 4,
  OptionGroupSecurity5: 5,
  OptionGroupUserRights: 6,
} as const

export type PsrOptionGroup = (typeof PsrOptionGroups)[keyof typeof PsrOptionGroups]
