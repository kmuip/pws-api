import { PsrByteArray, PsrDateIsoString, PsrGuid } from '../base'
import type { PsrBatchRightItem, PsrDataRight } from '../data'
import { PsrEntityObjectType, PsrRight } from '../enum-constants'

export type RightManager = {
  getLegitimateDataRight(
    dataId: PsrGuid,
    legitimateId: PsrGuid,
    rights: PsrRight,
  ): Promise<PsrDataRight>
  getLegitimateDataRights(
    dataId: PsrGuid,
    checkRights: boolean,
    showDeletedNames: boolean,
  ): Promise<Iterable<PsrDataRight>>
  getMultiLegitimateDataRights(
    dataIds: PsrGuid[],
    checkRights: boolean,
    showDeletedNames: boolean,
  ): Promise<Iterable<PsrDataRight>>
  updateLegitimateDataRightKey(
    dataId: PsrGuid,
    legitimateId: PsrGuid,
    rightKey: PsrByteArray,
  ): Promise<void> | void
  removeCurrentOrganisationUnitFromRights(dataId: PsrGuid): Promise<void> | void
  addLegitimateDataRight(
    dataId: PsrGuid,
    legitimateId: PsrGuid,
    rights: PsrRight,
  ): Promise<void> | void
  updateLegitimateDataRight(
    dataId: PsrGuid,
    legitimateId: PsrGuid,
    rights: PsrRight,
  ): Promise<void> | void
  removeAllLegitimateDataRights(dataId: PsrGuid, allRights: boolean): Promise<PsrGuid | null>
  updateLegitimateDataRightOwnerRight(
    dataId: PsrGuid,
    legitimateId: PsrGuid,
    ownerRight: boolean,
  ): Promise<void> | void
  updateLegitimateDataRightSecuredData(
    dataId: PsrGuid,
    legitimateId: PsrGuid,
    secured: boolean,
  ): Promise<void> | void
  removeLegitimateDataRight(
    dataId: PsrGuid,
    legitimateId: PsrGuid,
    rights: PsrRight,
  ): Promise<void> | void
  updateLegitimateDataRightValidDate(
    dataId: PsrGuid,
    legitimateId: PsrGuid,
    validFrom: PsrDateIsoString | null,
    validTo: PsrDateIsoString | null,
  ): Promise<void> | void
  updateLegitimateSealId(
    dataId: PsrGuid,
    legitimateId: PsrGuid,
    sealId: PsrGuid | null,
  ): Promise<void> | void
  batchUpdateRights(items: PsrBatchRightItem[]): Promise<void> | void
  getCurrentConnectionDataRights(dataId: PsrGuid): Promise<PsrRight | null>
  getCurrentConnectionDataRightList(dataIds: PsrGuid[]): Promise<(PsrRight | null)[]>
  getLegitimateDataRightsWithTemporalRights(
    dataId: PsrGuid,
    validFrom: PsrDateIsoString,
    validTo: PsrDateIsoString,
  ): Promise<Iterable<PsrDataRight>>
  getLegitimateDataRightsWithoutDeleted(dataId: PsrGuid): Promise<Iterable<PsrDataRight>>
  getLegitimateDataRightCheckRoles(
    dataId: PsrGuid,
    legitimateId: PsrGuid,
    rights: PsrRight,
  ): Promise<PsrDataRight>
  requestDataRight(dataId: PsrGuid, type: PsrEntityObjectType): Promise<void> | void
  getDatabaseAdministratorDataRights(dataId: PsrGuid): Promise<PsrDataRight[]>
  removeAllLegitimateDataRightsExcept(
    dataId: PsrGuid,
    excludedLegitimateIds: PsrGuid[],
    excludeCurrentUserOrRoleRight: boolean,
  ): Promise<PsrGuid | null>
}
