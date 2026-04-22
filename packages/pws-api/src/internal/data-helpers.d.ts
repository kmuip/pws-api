import type { PsrBatchRightItem, PsrContainer, PsrContainerItem, PsrData, PsrDataRight, PsrGuid, PsrOrganisationUnitStructure, PsrRight } from '@kmuip/pws-types';
export declare const GUID_EMPTY = "00000000-0000-0000-0000-000000000000";
export declare function asArray<T>(value: Iterable<T> | T[] | null | undefined): T[];
export declare function getDataType(data: unknown): number;
export declare function isEncryptedContainerItem(item: PsrContainerItem | Record<string, unknown> | null | undefined): boolean;
export declare function isPasswordContainer(container: PsrContainer | Record<string, unknown> | null | undefined): boolean;
export declare function isHistoryData(data: PsrData | Record<string, unknown> | null | undefined): boolean;
export declare function isGroupStructureNode(value: unknown): value is PsrOrganisationUnitStructure & {
    DataType?: () => number;
};
export declare function isRoleOrUser(data: unknown): boolean;
export declare function normalizeRightFlags(value: unknown): PsrRight;
export declare function normalizeDateBoundary(value: Date | string | null | undefined, isEnd: boolean): string | Date | null;
export declare function createBatchRightKeyUpdate(dataId: PsrGuid, legitimateId: PsrGuid, rightKey: string | null): PsrBatchRightItem;
export declare function matchesLegitimateId(dataRight: PsrDataRight | Record<string, unknown>, legitimateId: PsrGuid): boolean;
