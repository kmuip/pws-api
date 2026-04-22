export const PsrNotifyTriggerReasons = {
  TriggerNew: 1,
  TriggerEdit: 2,
  TriggerDelete: 4,
  TriggerRightChange: 8,
  TriggerUse: 16,
  TriggerPasswordShow: 32,
  TriggerPasswordExpires: 64,
  TriggerPasswordExpired: 128,
  TriggerSystemError: 256,
  TriggerSealRequest: 512,
  TriggerSealEdit: 1024,
  TriggerSealReaction: 2048,
  TriggerRightRequest: 4096,
  TriggerSealBreak: 8192,
  TriggerSealRelease: 16384,
  TriggerMovedToDifferentOu: 32768,
  TriggerAccessExpires: 65536,
  TriggerAccessExpired: 131072,
} as const

export type PsrNotifyTriggerReason =
  (typeof PsrNotifyTriggerReasons)[keyof typeof PsrNotifyTriggerReasons]
