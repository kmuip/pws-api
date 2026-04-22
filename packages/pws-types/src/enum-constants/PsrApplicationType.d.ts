export declare const PsrApplicationTypes: {
    readonly ApplicationSso: 0;
    readonly ApplicationRdp: 1;
    readonly ApplicationSsh: 2;
    readonly ApplicationWeb: 3;
    readonly ApplicationSaml: 4;
};
export type PsrApplicationType = (typeof PsrApplicationTypes)[keyof typeof PsrApplicationTypes];
