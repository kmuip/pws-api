export declare const PsrPolicyCategories: {
    readonly PolicyCategoryUser: 0;
    readonly PolicyCategoryWebview: 1;
    readonly PolicyCategoryDatabase: 2;
};
export type PsrPolicyCategory = (typeof PsrPolicyCategories)[keyof typeof PsrPolicyCategories];
