export declare const PsrOptionGroups: {
    readonly OptionGroupSystem: 0;
    readonly OptionGroupSecurity1: 1;
    readonly OptionGroupSecurity2: 2;
    readonly OptionGroupSecurity3: 3;
    readonly OptionGroupSecurity4: 4;
    readonly OptionGroupSecurity5: 5;
    readonly OptionGroupUserRights: 6;
};
export type PsrOptionGroup = (typeof PsrOptionGroups)[keyof typeof PsrOptionGroups];
