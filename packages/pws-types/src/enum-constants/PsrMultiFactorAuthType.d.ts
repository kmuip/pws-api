export declare const PsrMultiFactorAuthTypes: {
    readonly None: 0;
    readonly GoogleAuthenticator: 1;
    readonly RsaSecurIdToken: 2;
    readonly SafeNetOtp: 3;
    readonly Pki: 4;
    readonly Yubico: 5;
    readonly Radius: 6;
};
export type PsrMultiFactorAuthType = (typeof PsrMultiFactorAuthTypes)[keyof typeof PsrMultiFactorAuthTypes];
