export declare const PsrServerKeyTypes: {
    readonly ServerKeyTypeCertificate: 0;
    readonly ServerKeyTypePkcs11: 1;
};
export type PsrServerKeyType = (typeof PsrServerKeyTypes)[keyof typeof PsrServerKeyTypes];
