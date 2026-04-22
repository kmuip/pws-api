export declare const PsrServerStatuses: {
    readonly Online: 0;
    readonly Offline: 1;
};
export type PsrServerStatus = (typeof PsrServerStatuses)[keyof typeof PsrServerStatuses];
