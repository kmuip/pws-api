import { PsrByteArray, PsrGuid } from '../base'
import type {
  PsrListFilter,
  PsrOrganisationUnit,
  PsrOrganisationUnitStructure,
  PsrOrganisationUnitUser,
  PsrOrganisationUnitGroup,
} from '../data'

export type OrganisationUnitManager = {
  getOrganisationUnitList(listFilter: PsrListFilter): Promise<Iterable<PsrOrganisationUnit>>
  getOrganisationUnitListFilter(defaultFilter: boolean): Promise<PsrListFilter>
  getOrganisationUnitStructure(listFilter: PsrListFilter): Promise<Iterable<PsrOrganisationUnitStructure>>
  getOrganisationUnitUser(userId: PsrGuid): Promise<PsrOrganisationUnitUser>
  getOrganisationUnitGroup(groupId: PsrGuid): Promise<PsrOrganisationUnitGroup>
  getOrganisationUnitUserList(filter: PsrListFilter): Promise<Iterable<PsrOrganisationUnitUser>>
  changeOrganisationUnitPassword(
    userId: PsrGuid,
    oldHash: PsrByteArray,
    newHash: PsrByteArray,
    newSalt: PsrByteArray,
    newEncryptedPrivateKey: PsrByteArray,
  ): Promise<void> | void
  getUserInvolvedOrganisationUnit(dataId: PsrGuid): Promise<PsrGuid[]>
  getGroupInvolvedOrganisationUnit(dataId: PsrGuid): Promise<PsrGuid[]>
  getOrganisationUnitImageSource(organisationId: PsrGuid): Promise<string>
  hasUserMasterKeyMode(id: PsrGuid): Promise<boolean>
  hasGroupMasterKeyMode(id: PsrGuid): Promise<boolean>
  addOrganisationUnitGroup(
    group: PsrOrganisationUnitGroup,
    publicKey: PsrByteArray,
    encryptedGroupPrivateKey: PsrByteArray,
    parentOrganisationUnitId: PsrGuid | null,
  ): Promise<PsrOrganisationUnitGroup>
  updateOrganisationUnitGroup(organisationUnitGroup: PsrOrganisationUnitGroup): Promise<void> | void
  deleteOrganisationUnitGroup(organisationUnitGroup: PsrOrganisationUnitGroup): Promise<void> | void
  addOrganisationUnitUser(
    user: PsrOrganisationUnitUser,
    userPasswordHash: PsrByteArray,
    userPasswordSalt: PsrByteArray,
    publicKey: PsrByteArray,
    encryptedUserPrivateKey: PsrByteArray,
    encryptedCurrentUserPrivateKey: PsrByteArray,
    parentOrganisationUnitId: PsrGuid | null,
    clientHashAlgorithm?: string | null,
  ): Promise<PsrOrganisationUnitUser>
  updateOrganisationUnitUser(organisationUnitUser: PsrOrganisationUnitUser): Promise<void> | void
  deleteOrganisationUnitUser(organisationUnitUser: PsrOrganisationUnitUser): Promise<void> | void
  getCurrentOrganisationUnit(): Promise<PsrOrganisationUnitUser>
}
