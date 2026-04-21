export const PsrSealOpenTypes = {
  None: 0,
  OpenRequestPermission: 1,
  OpenViewRequestState: 2,
  OpenRequestReaction: 3,
  OpenEdit: 4,
  OpenBreak: 5,
  BrokenByUser: 6,
  BrokenExpired: 7,
} as const

export type PsrSealOpenType = (typeof PsrSealOpenTypes)[keyof typeof PsrSealOpenTypes]
