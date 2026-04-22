export declare const PasswordGeneratorSeparators: {
    readonly None: 0;
    readonly UpperCaseLetter: 1;
    readonly Space: 2;
    readonly Hyphen: 3;
    readonly Underscore: 4;
};
export type PasswordGeneratorSeparator = (typeof PasswordGeneratorSeparators)[keyof typeof PasswordGeneratorSeparators];
