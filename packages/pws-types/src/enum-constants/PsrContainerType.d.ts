export declare const PsrContainerTypes: {
    readonly Password: 0;
    readonly Form: 1;
    readonly Document: 2;
};
export type PsrContainerType = (typeof PsrContainerTypes)[keyof typeof PsrContainerTypes];
