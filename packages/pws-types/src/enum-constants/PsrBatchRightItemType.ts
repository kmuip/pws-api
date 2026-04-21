export const PsrBatchRightItemTypes = {
  AddLegitimateDataRight: 0,
  UpdateLegitimateDataRightKey: 1,
  RemoveLegitimateDataRight: 2,
  UpdateLegitimateSealId: 3,
  UpdateLegitimateDataRightSecuredData: 4,
  UpdateLegitimateDataRightOwnerRight: 5,
  UpdateLegitimateDataRightValidDate: 6,
  RemoveCurrentOrganisationUnitFromRights: 7,
  UpdateLegitimateDataRight: 8,
} as const

export type PsrBatchRightItemType = (typeof PsrBatchRightItemTypes)[keyof typeof PsrBatchRightItemTypes]
