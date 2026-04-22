import type { PsrGuid } from '../base';
export type EmailVerificationManager = {
    checkEmailVerification(userId: PsrGuid): Promise<boolean>;
};
