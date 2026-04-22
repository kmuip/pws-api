export declare const PsrServerMessageTypes: {
    readonly Info: 0;
    readonly Warning: 1;
    readonly Error: 2;
};
export type PsrServerMessageType = (typeof PsrServerMessageTypes)[keyof typeof PsrServerMessageTypes];
