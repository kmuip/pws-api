export declare const PsrContainerItemDescHighlights: {
    readonly ContainerItemDescHighlightNone: 0;
    readonly ContainerItemDescHighlightInfo: 1;
    readonly ContainerItemDescHighlightWarning: 2;
    readonly ContainerItemDescHighlightError: 3;
};
export type PsrContainerItemDescHighlight = (typeof PsrContainerItemDescHighlights)[keyof typeof PsrContainerItemDescHighlights];
