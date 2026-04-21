export const PsrEventSources = {
  PsrTracing: 0,
  PsrNotification: 1,
} as const

export type PsrEventSource = (typeof PsrEventSources)[keyof typeof PsrEventSources]
