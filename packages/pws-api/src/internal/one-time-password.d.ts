import type { OneTimePasswordManager, PsrOneTimePassword } from '@kmuip/pws-types';
export declare class RuntimeOneTimePasswordManager implements OneTimePasswordManager {
    private readonly otpBase32ErrorCode;
    constructor(otpBase32ErrorCode: number);
    generateGoogleAuthenticatorOtp(secret: string): PsrOneTimePassword;
    generateGoogleAuthenticatorOtpAsPromise(secret: string): Promise<PsrOneTimePassword>;
}
