export declare const PsrMultiFactorFields: {
    readonly None: 0;
    readonly OneTimeToken: 1;
    readonly NextOneTimeToken: 2;
    readonly Pin: 4;
    readonly NewPinRequired: 8;
    readonly CertificateThumbPrint: 16;
    readonly SignedDataId: 32;
};
export type PsrMultiFactorField = (typeof PsrMultiFactorFields)[keyof typeof PsrMultiFactorFields];
