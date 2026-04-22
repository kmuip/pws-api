import type { PsrPolicy } from '../data'
import type { PasswordGeneratorSeparator } from './PasswordGeneratorSeparator'

export type PasswordManager = {
  getPasswordStrength(password: string): number
  validatePassword(
    policy: PsrPolicy,
    password: string,
    usernames: string[],
  ): PolicyPasswordValidationResult
  generatePolicyPassword(policy: PsrPolicy, usernames: string[]): string
  generatePhoneticPassword(
    length: number,
    syllableCount: number,
    separator: PasswordGeneratorSeparator,
    useLeetSpeak: boolean,
  ): string
}

export type PolicyPasswordValidationResult = {
  isValid: boolean
  errors: number[]
  missingCategoryCount: number
}
