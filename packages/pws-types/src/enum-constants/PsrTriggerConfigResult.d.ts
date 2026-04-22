export declare const PsrTriggerConfigResults: {
    readonly None: 0;
    readonly Own: 1;
    readonly Any: 2;
};
export type PsrTriggerConfigResult = (typeof PsrTriggerConfigResults)[keyof typeof PsrTriggerConfigResults];
