export const PsrSyncOperations = {
  None: 0,
  Add: 1,
  Update: 2,
  UpdateIfTimestampNewer: 3,
  AddOrUpdate: 4,
  AddOrUpdateIfTimestampNewer: 5,
  Set: 6,
  Delete: 7,
  AddAsHistory: 8,
} as const

export type PsrSyncOperation = (typeof PsrSyncOperations)[keyof typeof PsrSyncOperations]

