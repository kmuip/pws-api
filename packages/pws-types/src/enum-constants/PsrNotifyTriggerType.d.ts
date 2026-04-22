export declare const PsrNotifyTriggerTypes: {
    readonly NotifyTriggerTypeInfo: 0;
    readonly NotifyTriggerTypeWarning: 1;
    readonly NotifyTriggerTypeError: 2;
};
export type PsrNotifyTriggerType = (typeof PsrNotifyTriggerTypes)[keyof typeof PsrNotifyTriggerTypes];
