export declare const PsrSyncOperations: {
    readonly None: 0;
    readonly Add: 1;
    readonly Update: 2;
    readonly UpdateIfTimestampNewer: 3;
    readonly AddOrUpdate: 4;
    readonly AddOrUpdateIfTimestampNewer: 5;
    readonly Set: 6;
    readonly Delete: 7;
    readonly AddAsHistory: 8;
};
export type PsrSyncOperation = (typeof PsrSyncOperations)[keyof typeof PsrSyncOperations];
