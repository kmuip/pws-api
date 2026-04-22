export declare const PsrDataStates: {
    readonly StateActive: 1;
    readonly StateHistory: 2;
    readonly StateDeleted: 4;
};
export type PsrDataState = (typeof PsrDataStates)[keyof typeof PsrDataStates];
