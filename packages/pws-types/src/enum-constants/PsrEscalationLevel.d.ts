export declare const PsrEscalationLevels: {
    readonly DebugMessage: 0;
    readonly VerboseMessage: 1;
    readonly NormalMessage: 2;
    readonly WarningMessage: 3;
    readonly ErrorMessage: 5;
};
export type PsrEscalationLevel = (typeof PsrEscalationLevels)[keyof typeof PsrEscalationLevels];
