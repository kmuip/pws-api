import type { PsrPolicy } from '../data'
import type { PsrGuid } from '../base'
import type { PsrPolicyCategory } from '../enum-constants'

export type PolicyManager = {
  getPolicy(policyId: PsrGuid): Promise<PsrPolicy>
  getPolicies(): Promise<PsrPolicy[]>
  getCategoryPolicy(category: PsrPolicyCategory): Promise<PsrPolicy>
}
