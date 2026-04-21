export const PsrContainerItemDescHighlights = {
  ContainerItemDescHighlightNone: 0,
  ContainerItemDescHighlightInfo: 1,
  ContainerItemDescHighlightWarning: 2,
  ContainerItemDescHighlightError: 3,
} as const

export type PsrContainerItemDescHighlight = (typeof PsrContainerItemDescHighlights)[keyof typeof PsrContainerItemDescHighlights]
