export declare const PsrContainerInfoFieldTypes: {
    readonly InfoFieldTypeText: 0;
    readonly InfoFieldTypeUrl: 1;
    readonly InfoFieldTypeEmail: 2;
    readonly InfoFieldTypePhone: 3;
    readonly InfoFieldTypeRdp: 4;
    readonly InfoFieldTypeFtp: 5;
    readonly InfoFieldTypeDate: 6;
    readonly InfoFieldTypeSsh: 7;
    readonly InfoFieldTypeSso: 8;
};
export type PsrContainerInfoFieldType = (typeof PsrContainerInfoFieldTypes)[keyof typeof PsrContainerInfoFieldTypes];
