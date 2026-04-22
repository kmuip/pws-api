export declare const PsrEventSources: {
    readonly PsrTracing: 0;
    readonly PsrNotification: 1;
};
export type PsrEventSource = (typeof PsrEventSources)[keyof typeof PsrEventSources];
