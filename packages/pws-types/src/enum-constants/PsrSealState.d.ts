export declare const PsrSealStates: {
    readonly SealStateUndecided: 0;
    readonly SealStateGranted: 1;
    readonly SealStateDenied: 2;
};
export type PsrSealState = (typeof PsrSealStates)[keyof typeof PsrSealStates];
