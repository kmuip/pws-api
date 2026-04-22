export declare const PsrBatchRightItemTypes: {
    readonly AddLegitimateDataRight: 0;
    readonly UpdateLegitimateDataRightKey: 1;
    readonly RemoveLegitimateDataRight: 2;
    readonly UpdateLegitimateSealId: 3;
    readonly UpdateLegitimateDataRightSecuredData: 4;
    readonly UpdateLegitimateDataRightOwnerRight: 5;
    readonly UpdateLegitimateDataRightValidDate: 6;
    readonly RemoveCurrentOrganisationUnitFromRights: 7;
    readonly UpdateLegitimateDataRight: 8;
};
export type PsrBatchRightItemType = (typeof PsrBatchRightItemTypes)[keyof typeof PsrBatchRightItemTypes];
