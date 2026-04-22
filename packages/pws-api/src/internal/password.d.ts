import type { PasswordManager, PolicyPasswordValidationResult, PsrPolicy } from '@kmuip/pws-types';
type PasswordPolicyErrorCodes = {
    minimumQuality: number;
    notAllowedChars: number;
    notAllowedPassword: number;
    notAllowedUsername: number;
    numbersRequired: number;
    passwordLengthTooShort: number;
    remainingCategoryRequired: number;
    remainingCategoriesRequired: number;
    similarCharsNotAllowed: number;
    specialCharsRequired: number;
    upperCaseRequired: number;
    lowerCaseRequired: number;
};
export declare class RuntimePasswordManager implements PasswordManager {
    private readonly errors;
    constructor(errors: PasswordPolicyErrorCodes);
    getPasswordStrength(password: string): number;
    validatePassword(policy: PsrPolicy, password: string, usernames?: string[]): PolicyPasswordValidationResult;
    generatePhoneticPassword(length: number, syllableCount: number, separator?: number, useLeetSpeak?: boolean): string;
    generatePolicyPassword(policy: PsrPolicy, usernames?: string[]): string;
}
export {};
