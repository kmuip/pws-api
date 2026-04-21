export const PsrApiKeyAccessRights = {
  Audit: 0,
  Read: 1,
  ReadWrite: 3,
  ReadWriteManage: 7,
} as const

export type PsrApiKeyAccessRights = (typeof PsrApiKeyAccessRights)[keyof typeof PsrApiKeyAccessRights]
