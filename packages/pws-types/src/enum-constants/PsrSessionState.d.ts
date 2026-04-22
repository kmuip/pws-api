export declare const PsrSessionStates: {
    readonly Disconnected: 0;
    readonly Connected: 1;
};
export type PsrSessionState = (typeof PsrSessionStates)[keyof typeof PsrSessionStates];
