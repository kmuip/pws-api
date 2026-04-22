export const PsrContainerInfoFieldTypes = {
  InfoFieldTypeText: 0,
  InfoFieldTypeUrl: 1,
  InfoFieldTypeEmail: 2,
  InfoFieldTypePhone: 3,
  InfoFieldTypeRdp: 4,
  InfoFieldTypeFtp: 5,
  InfoFieldTypeDate: 6,
  InfoFieldTypeSsh: 7,
  InfoFieldTypeSso: 8,
} as const

export type PsrContainerInfoFieldType =
  (typeof PsrContainerInfoFieldTypes)[keyof typeof PsrContainerInfoFieldTypes]
