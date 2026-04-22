import type { PsrSeal, PsrSealKey, PsrSealTemplate, PsrListFilter } from '../data';
import type { PsrGuid } from '../base';
import type { PsrSealOpenType, PsrEntityObjectType } from '../enum-constants';
export type SealManager = {
    getSeal(sealId: PsrGuid): Promise<PsrSeal>;
    breakSeal(sealId: PsrGuid): Promise<PsrSeal>;
    getSealOpenType(seal: PsrSeal, dataId: PsrGuid, userId: PsrGuid, ignoreSealKey: boolean): Promise<PsrSealOpenType>;
    getSealOpenTypeBySealId(sealId: PsrGuid, dataId: PsrGuid, userId: PsrGuid, ignoreSealKey: boolean): Promise<PsrSealOpenType>;
    addSeal(seal: PsrSeal, dataId: PsrGuid, dataType: PsrEntityObjectType): Promise<PsrSeal>;
    updateSeal(seal: PsrSeal, dataId: PsrGuid, dataType: PsrEntityObjectType): Promise<PsrSeal>;
    deleteKeyReleasesForUser(seal: PsrSeal, legitimateId: PsrGuid): Promise<void> | void;
    updateSealKeyRelease(release: PsrSealKey, dataId: PsrGuid, dataType: PsrEntityObjectType): Promise<void> | void;
    getSealKey(sealKeyId: PsrGuid, legitimateId: PsrGuid): Promise<PsrSealKey>;
    deleteSeal(sealId: PsrGuid): Promise<void> | void;
    getSealTemplateList(filter: PsrListFilter): Promise<Iterable<PsrSealTemplate>>;
    getSealTemplateInvolvedOrganisationUnits(dataId: PsrGuid): Promise<PsrGuid[]>;
    hasRelease(seal: PsrSeal, legitimateId: PsrGuid): Promise<boolean>;
};
