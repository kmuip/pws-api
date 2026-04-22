export declare const PsrApiKeyAccessRights: {
    readonly Audit: 0;
    readonly Read: 1;
    readonly ReadWrite: 3;
    readonly ReadWriteManage: 7;
};
export type PsrApiKeyAccessRights = (typeof PsrApiKeyAccessRights)[keyof typeof PsrApiKeyAccessRights];
