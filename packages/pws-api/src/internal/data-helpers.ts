import type {
  PsrBatchRightItem,
  PsrContainer,
  PsrContainerItem,
  PsrData,
  PsrDataRight,
  PsrGuid,
  PsrOrganisationUnitStructure,
  PsrRight,
} from '@kmuip/pws-types'
import { runtimeEnums } from './enums.js'

export const GUID_EMPTY = '00000000-0000-0000-0000-000000000000'

type MaybeMethodCarrier = Record<string, unknown>

function hasMethod<T extends string>(
  value: unknown,
  methodName: T,
): value is Record<T, (...args: never[]) => unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as Record<string, unknown>)[methodName] === 'function'
  )
}

export function asArray<T>(value: Iterable<T> | T[] | null | undefined): T[] {
  if (!value) {
    return []
  }

  return Array.isArray(value) ? value : Array.from(value)
}

export function getDataType(data: unknown): number {
  if (hasMethod(data, 'DataType')) {
    return Number(data.DataType())
  }

  const candidate = data as MaybeMethodCarrier | null
  if (!candidate) {
    return runtimeEnums.PsrEntityObjectType.EntityObjectTypeUnknown
  }

  if ('ContainerItemType' in candidate) {
    return runtimeEnums.PsrEntityObjectType.EntityObjectTypeContainerItem
  }

  if ('ContainerType' in candidate) {
    const containerType = Number(candidate.ContainerType)
    if (containerType === runtimeEnums.PsrContainerType.Form) {
      return runtimeEnums.PsrEntityObjectType.EntityObjectTypeFormular
    }
    if (containerType === runtimeEnums.PsrContainerType.Document) {
      return runtimeEnums.PsrEntityObjectType.EntityObjectTypeDocument
    }
    return runtimeEnums.PsrEntityObjectType.EntityObjectTypePassword
  }

  if ('RoleName' in candidate) {
    return runtimeEnums.PsrEntityObjectType.EntityObjectTypeRole
  }
  if ('UserName' in candidate) {
    return runtimeEnums.PsrEntityObjectType.EntityObjectTypeUser
  }
  if ('GroupName' in candidate) {
    return runtimeEnums.PsrEntityObjectType.EntityObjectTypeGroup
  }
  if ('RequiredReleases' in candidate || 'Keys' in candidate) {
    return runtimeEnums.PsrEntityObjectType.EntityObjectTypeSeal
  }

  return runtimeEnums.PsrEntityObjectType.EntityObjectTypeUnknown
}

export function isEncryptedContainerItem(
  item: PsrContainerItem | Record<string, unknown> | null | undefined,
): boolean {
  if (!item) {
    return false
  }

  if (hasMethod(item, 'IsEncrypted')) {
    return Boolean(item.IsEncrypted())
  }

  if (typeof item.IsEncrypted === 'boolean') {
    return item.IsEncrypted
  }

  const itemType = Number(item.ContainerItemType)
  return (
    itemType === runtimeEnums.PsrContainerItemType.ContainerItemPassword ||
    itemType === runtimeEnums.PsrContainerItemType.ContainerItemPasswordMemo ||
    itemType === runtimeEnums.PsrContainerItemType.ContainerItemOtp
  )
}

export function isPasswordContainer(
  container: PsrContainer | Record<string, unknown> | null | undefined,
) {
  return Number(container?.ContainerType) === runtimeEnums.PsrContainerType.Password
}

export function isHistoryData(data: PsrData | Record<string, unknown> | null | undefined) {
  return (
    (Number(data?.DataStates ?? 0) & runtimeEnums.PsrDataStates.StateHistory) ===
    runtimeEnums.PsrDataStates.StateHistory
  )
}

export function isGroupStructureNode(
  value: unknown,
): value is PsrOrganisationUnitStructure & { DataType?: () => number } {
  const candidate = value as Record<string, unknown> | null
  return (
    !!candidate &&
    typeof candidate === 'object' &&
    'OrganisationUnit' in candidate &&
    'ChildrenOrganisationUnits' in candidate
  )
}

export function isRoleOrUser(data: unknown) {
  const dataType = getDataType(data)
  return (
    dataType === runtimeEnums.PsrEntityObjectType.EntityObjectTypeRole ||
    dataType === runtimeEnums.PsrEntityObjectType.EntityObjectTypeUser
  )
}

export function normalizeRightFlags(value: unknown): PsrRight {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (Array.isArray(value)) {
    return value.reduce((combined, entry) => combined | normalizeRightFlags(entry), 0)
  }

  if (typeof value === 'string') {
    if (value in runtimeEnums.PsrRights) {
      return (runtimeEnums.PsrRights as unknown as Record<string, number>)[value]
    }

    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : 0
  }

  return 0
}

export function normalizeDateBoundary(value: Date | string | null | undefined, isEnd: boolean) {
  if (!value) {
    return value ?? null
  }

  const date = value instanceof Date ? new Date(value) : new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  if (isEnd) {
    date.setHours(23, 59, 59, 0)
  } else {
    date.setHours(0, 0, 0, 0)
  }

  return date
}

export function createBatchRightKeyUpdate(
  dataId: PsrGuid,
  legitimateId: PsrGuid,
  rightKey: string | null,
): PsrBatchRightItem {
  const update: PsrBatchRightItem = {
    ItemType: runtimeEnums.PsrBatchRightItemType.UpdateLegitimateDataRightKey,
    DataId: dataId,
    LegitimateId: legitimateId,
  }

  if (rightKey != null) {
    update.RightKey = rightKey
  }

  return update
}

export function matchesLegitimateId(
  dataRight: PsrDataRight | Record<string, unknown>,
  legitimateId: PsrGuid,
) {
  return String(dataRight.LegitimateId) === String(legitimateId)
}
