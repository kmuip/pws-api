import type { PsrOneTimePassword } from '../runtime'

export type OneTimePasswordManager = {
  generateGoogleAuthenticatorOtp(secret: string): PsrOneTimePassword
  generateGoogleAuthenticatorOtpAsPromise(secret: string): Promise<PsrOneTimePassword>
}
