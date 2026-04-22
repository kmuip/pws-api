export declare const PsrActiveDirectoryAuthenticationTypes: {
    readonly None: 0;
    readonly Secure: 1;
    readonly SecureSocketsLayer: 2;
    readonly ReadonlyServer: 4;
    readonly Signing: 64;
    readonly Sealing: 128;
};
export type PsrActiveDirectoryAuthenticationType = (typeof PsrActiveDirectoryAuthenticationTypes)[keyof typeof PsrActiveDirectoryAuthenticationTypes];
