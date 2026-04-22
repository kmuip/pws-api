export declare const PsrExternalLinkTypes: {
    readonly Password: 0;
    readonly PasswordCopy: 1;
    readonly Document: 2;
    readonly Rdp: 3;
    readonly Ssh: 4;
    readonly Sso: 5;
};
export type PsrExternalLinkType = (typeof PsrExternalLinkTypes)[keyof typeof PsrExternalLinkTypes];
