import { TOTP } from 'otpauth';
export class RuntimeOneTimePasswordManager {
    otpBase32ErrorCode;
    constructor(otpBase32ErrorCode) {
        this.otpBase32ErrorCode = otpBase32ErrorCode;
    }
    generateGoogleAuthenticatorOtp(secret) {
        const normalizedSecret = (secret ?? '').replace(/\s/gi, '');
        if (!normalizedSecret) {
            throw new Error(String(this.otpBase32ErrorCode));
        }
        const totp = new TOTP({ secret: normalizedSecret });
        const now = new Date();
        return {
            OneTimePassword: totp.generate(),
            ExpirationTimestamp: new Date(now.setMilliseconds(30_000 - (Date.now() % 30_000) + now.getMilliseconds())),
        };
    }
    generateGoogleAuthenticatorOtpAsPromise(secret) {
        return Promise.resolve(this.generateGoogleAuthenticatorOtp(secret));
    }
}
