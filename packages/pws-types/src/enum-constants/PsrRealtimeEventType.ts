export const PsrRealtimeEventTypes = {
  Add: 0,
  Update: 1,
  Remove: 2,
  Unknown: -1,
} as const

export type PsrRealtimeEventType =
  (typeof PsrRealtimeEventTypes)[keyof typeof PsrRealtimeEventTypes]
