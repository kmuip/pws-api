export declare const PsrRealtimeEventTypes: {
    readonly Add: 0;
    readonly Update: 1;
    readonly Remove: 2;
    readonly Unknown: -1;
};
export type PsrRealtimeEventType = (typeof PsrRealtimeEventTypes)[keyof typeof PsrRealtimeEventTypes];
