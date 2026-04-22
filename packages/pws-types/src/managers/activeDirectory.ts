import type { PsrGuid } from '../base'
import type { PsrListFilter, PsrActiveDirectoryProfile } from '../data'
import type { PsrActiveDirectoryAuthenticationType } from '../enum-constants'

export type ActiveDirectoryManager = {
  getActiveDirectoryProfileList(filter: PsrListFilter): Promise<Iterable<PsrActiveDirectoryProfile>>
  getActiveDirectoryProfileListFilter(defaultFilter: boolean): Promise<PsrListFilter>
  getActiveDirecotryProfileInvolvedOrganisationUnit(dataId: PsrGuid): Promise<PsrGuid[]>
  deleteActiveDirectoryProfile(profile: PsrActiveDirectoryProfile): Promise<void> | void
  updateActiveDirectoryProfile(profile: PsrActiveDirectoryProfile): Promise<void> | void
  addActiveDirectoryProfile(profile: PsrActiveDirectoryProfile): Promise<void> | void
  checkActiveDirectoryConnection(
    profileId: PsrGuid | null,
    domainName: string,
    userName: string,
    authTypes: PsrActiveDirectoryAuthenticationType | boolean,
    encryptedUserPassword?: string | null,
  ): Promise<boolean>
  getActiveDirectoryRootElements(
    profileId: PsrGuid,
    cnFilter: string | null,
  ): Promise<Record<string, unknown>[]>
  getActiveDirectoryMembersOfGroup(
    profileId: PsrGuid,
    objectGuid: string,
  ): Promise<Record<string, unknown>[]>
  getActiveDirectoryElementList(
    profileId: PsrGuid,
    elementName: string,
    search: string,
    fullSearch: boolean,
  ): Promise<Record<string, unknown>[]>
  getSpecificActiveDirectoryElements(
    profileId: PsrGuid,
    objectGuids: string[],
  ): Promise<Record<string, unknown>[]>
  importActiveDirectory(
    profileId: PsrGuid,
    newActiveDirectoryObjects: Record<string, unknown>[],
    excludeItems: Record<string, unknown>[],
    parentOrganisationUnitId: PsrGuid | null,
    tokenIdentity?: string | null,
  ): Promise<void> | void
  syncActiveDirectory(profileId: PsrGuid, tokenIdentity?: string | null): Promise<void> | void
  generateActiveDirectorySummaryDetails(
    profileId: PsrGuid,
    newActiveDirectoryObjects: Record<string, unknown>[],
    excludeItems: Record<string, unknown>[],
    parentOrganisationUnitId: PsrGuid | null,
    tokenIdentity?: string | null,
    withSyncInfo?: boolean,
  ): Promise<void> | void
  getActiveDirectorySummaryDetails(tokenIdentity: string): Promise<Record<string, unknown>>
}
