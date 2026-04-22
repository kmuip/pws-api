export declare const PsrSealOpenTypes: {
    readonly None: 0;
    readonly OpenRequestPermission: 1;
    readonly OpenViewRequestState: 2;
    readonly OpenRequestReaction: 3;
    readonly OpenEdit: 4;
    readonly OpenBreak: 5;
    readonly BrokenByUser: 6;
    readonly BrokenExpired: 7;
};
export type PsrSealOpenType = (typeof PsrSealOpenTypes)[keyof typeof PsrSealOpenTypes];
