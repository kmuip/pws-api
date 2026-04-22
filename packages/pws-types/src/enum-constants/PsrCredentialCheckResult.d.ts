export declare const PsrCredentialCheckResults: {
    readonly CredentialCheckResultTrue: 0;
    readonly CredentialCheckResultFalse: 1;
    readonly CredentialCheckResultUnknown: 2;
    readonly CredentialCheckResultError: 3;
};
export type PsrCredentialCheckResult = (typeof PsrCredentialCheckResults)[keyof typeof PsrCredentialCheckResults];
