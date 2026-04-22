export declare const PsrForwardingTypes: {
    readonly ForwardToSmtp: 0;
    readonly ForwardToServerFile: 1;
    readonly ForwardToEventLog: 2;
};
export type PsrForwardingType = (typeof PsrForwardingTypes)[keyof typeof PsrForwardingTypes];
