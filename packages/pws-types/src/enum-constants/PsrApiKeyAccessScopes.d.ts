export declare const PsrApiKeyAccessScopes: {
    readonly None: 0;
    readonly Passwords: 1;
    readonly Forms: 2;
    readonly Documents: 4;
    readonly OrganisationalUnits: 8;
    readonly Roles: 16;
    readonly Unrestricted: 2147483647;
};
export type PsrApiKeyAccessScopes = (typeof PsrApiKeyAccessScopes)[keyof typeof PsrApiKeyAccessScopes];
