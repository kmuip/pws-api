export const PsrNotifyTriggerTypes = {
  NotifyTriggerTypeInfo: 0,
  NotifyTriggerTypeWarning: 1,
  NotifyTriggerTypeError: 2,
} as const

export type PsrNotifyTriggerType = (typeof PsrNotifyTriggerTypes)[keyof typeof PsrNotifyTriggerTypes]
