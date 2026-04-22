export const PsrRights = {
  RightRead: 1,
  RightWrite: 2,
  RightDelete: 4,
  RightRight: 8,
  RightMove: 16,
  RightExport: 32,
  RightPrint: 64,
  RightAll: 127,
  RightAppend: 128,
} as const

export type PsrRight = number // flags – allow composite values
