import { PsrApiEnums, type PsrApi } from '@kmuip/pws-api'
import type { PasswordGenerationInput } from '../types.js'

export class PasswordGenerationResource {
  constructor(private readonly raw: PsrApi) {}

  strength(password: string) {
    return this.raw.passwordManager.getPasswordStrength(password)
  }

  async generate(input: PasswordGenerationInput) {
    if (input.mode === 'policy') {
      const policy = input.policyId
        ? await this.raw.policyManager.getPolicy(input.policyId)
        : await this.raw.policyManager.getCategoryPolicy(
            (input.policyCategory ?? PsrApiEnums.PsrPolicyCategory.PolicyCategoryUser) as never,
          )
      return this.raw.passwordManager.generatePolicyPassword(policy, input.usernames ?? [])
    }

    return this.raw.passwordManager.generatePhoneticPassword(
      input.length ?? 20,
      input.syllableCount ?? 4,
      (input.separator ?? PsrApiEnums.PasswordGeneratorSeparator.Hyphen) as never,
      input.useLeetSpeak ?? false,
    )
  }

  async validate(input: {
    password: string
    policyId?: string | null
    policyCategory?: number | null
    usernames?: string[] | null
  }) {
    const policy = input.policyId
      ? await this.raw.policyManager.getPolicy(input.policyId)
      : await this.raw.policyManager.getCategoryPolicy(
          (input.policyCategory ?? PsrApiEnums.PsrPolicyCategory.PolicyCategoryUser) as never,
        )
    return this.raw.passwordManager.validatePassword(policy, input.password, input.usernames ?? [])
  }
}
