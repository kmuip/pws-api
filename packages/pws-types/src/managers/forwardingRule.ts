import type { PsrForwardingRule } from '../data'

export type ForwardingRuleManager = {
  addForwardingRule(rule: PsrForwardingRule): Promise<void> | void
  updateForwardingRule(rule: PsrForwardingRule): Promise<void> | void
  deleteForwardingRule(rule: PsrForwardingRule): Promise<void> | void
  getForwardingRuleList(): Promise<PsrForwardingRule[]>
}
