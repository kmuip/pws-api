export const PsrPolicyCategories = {
  PolicyCategoryUser: 0,
  PolicyCategoryWebview: 1,
  PolicyCategoryDatabase: 2,
} as const

export type PsrPolicyCategory = (typeof PsrPolicyCategories)[keyof typeof PsrPolicyCategories]
