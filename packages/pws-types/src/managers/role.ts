import { PsrByteArray, PsrGuid } from '../base'
import type { PsrListFilter, PsrOrganisationUnitUser, PsrRole } from '../data'

export type RoleManager = {
  getRoleList(filter: PsrListFilter): Promise<Iterable<PsrRole>>
  getRoleListFilter(defaultFilter: boolean): Promise<PsrListFilter>
  getUsersInRole(roleId: PsrGuid): Promise<PsrOrganisationUnitUser[]>
  getRole(roleId: PsrGuid): Promise<PsrRole>
  getUserRoles(userId: PsrGuid): Promise<PsrRole[]>
  deleteRole(role: PsrRole): Promise<void> | void
  addRole(
    role: PsrRole,
    publicKey: PsrByteArray,
    encryptedRolePrivateKey: PsrByteArray,
  ): Promise<PsrRole>
  updateRole(role: PsrRole): Promise<void> | void
  hasRoleMasterKeyMode(id: PsrGuid): Promise<boolean>
  getRoleInvolvedOrganisationUnit(dataId: PsrGuid): Promise<PsrGuid[]>
}
