export const PsrContainerItemTypes = {
  ContainerItemText: 0,
  ContainerItemPassword: 1,
  ContainerItemDate: 2,
  ContainerItemCheck: 3,
  ContainerItemUrl: 4,
  ContainerItemEmail: 5,
  ContainerItemPhone: 6,
  ContainerItemList: 7,
  ContainerItemHeader: 8,
  ContainerItemMemo: 9,
  ContainerItemPasswordMemo: 10,
  ContainerItemInt: 11,
  ContainerItemDecimal: 12,
  ContainerItemUserName: 13,
  ContainerItemIp: 14,
  ContainerItemHostName: 15,
  ContainerItemOtp: 16,
} as const

export type PsrContainerItemType =
  (typeof PsrContainerItemTypes)[keyof typeof PsrContainerItemTypes]
