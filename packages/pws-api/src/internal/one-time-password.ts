import { TOTP } from 'otpauth'
import type { OneTimePasswordManager, PsrOneTimePassword } from '@kmuip/pws-types'

export class RuntimeOneTimePasswordManager implements OneTimePasswordManager {
  constructor(private readonly otpBase32ErrorCode: number) {}

  generateGoogleAuthenticatorOtp(secret: string): PsrOneTimePassword {
    const normalizedSecret = (secret ?? '').replace(/\s/gi, '')
    if (!normalizedSecret) {
      throw new Error(String(this.otpBase32ErrorCode))
    }

    const totp = new TOTP({ secret: normalizedSecret })
    const now = new Date()

    return {
      OneTimePassword: totp.generate(),
      ExpirationTimestamp: new Date(
        now.setMilliseconds(30_000 - (Date.now() % 30_000) + now.getMilliseconds()),
      ),
    }
  }

  generateGoogleAuthenticatorOtpAsPromise(secret: string) {
    return Promise.resolve(this.generateGoogleAuthenticatorOtp(secret))
  }
}
