import type { PsrActiveDirectoryProfile, PsrApi, PsrGuid } from '@kmuip/pws-api'
import type {
  ActiveDirectoryProfileInput,
  ActiveDirectoryProfileListOptions,
  ActiveDirectoryProfileRecord,
} from '../types.js'
import { asArray, containsText, normalizeText, paginate, sortRecords } from '../utils.js'

function toProfileRecord(profile: PsrActiveDirectoryProfile): ActiveDirectoryProfileRecord {
  return {
    id: profile.Id,
    name: normalizeText((profile as any).Name ?? (profile as any).ProfileName),
    domain: normalizeText((profile as any).DomainName ?? (profile as any).ActiveDirectoryDomain),
    syncEnabled: Boolean((profile as any).ActiveDirectorySync),
    raw: profile,
  }
}

export class ActiveDirectorySyncResource {
  constructor(private readonly raw: PsrApi) {}

  async listProfiles(options: ActiveDirectoryProfileListOptions = {}) {
    const filter = await this.raw.activeDirectoryManager.getActiveDirectoryProfileListFilter(true)
    const records = asArray(
      await this.raw.activeDirectoryManager.getActiveDirectoryProfileList(filter),
    )
      .filter((profile) => {
        if (options.ids?.length && !new Set(options.ids).has(profile.Id)) {
          return false
        }
        if (!containsText((profile as any).Name ?? (profile as any).ProfileName, options.name)) {
          return false
        }
        if (options.search) {
          const haystack = [
            (profile as any).Name,
            (profile as any).ProfileName,
            (profile as any).DomainName,
            (profile as any).ActiveDirectoryDomain,
          ]
            .filter(Boolean)
            .join(' ')
          if (!containsText(haystack, options.search)) {
            return false
          }
        }
        return true
      })
      .map(toProfileRecord)

    const sorted = options.sortBy
      ? sortRecords(
          records,
          (record) => {
            switch (options.sortBy) {
              case 'domain':
                return record.domain
              case 'id':
                return record.id
              default:
                return record.name
            }
          },
          options.sortDirection,
        )
      : records

    return paginate(sorted, options.page, options.pageSize)
  }

  async getProfileListFilter(defaultFilter = true) {
    return this.raw.activeDirectoryManager.getActiveDirectoryProfileListFilter(defaultFilter)
  }

  async getInvolvedOrganisationUnits(dataId: PsrGuid) {
    return this.raw.activeDirectoryManager.getActiveDirecotryProfileInvolvedOrganisationUnit(dataId)
  }

  async createProfile(input: ActiveDirectoryProfileInput) {
    await this.raw.activeDirectoryManager.addActiveDirectoryProfile((input.raw ?? input) as never)
  }

  async updateProfile(id: PsrGuid, input: ActiveDirectoryProfileInput) {
    const profile = { Id: id, ...(input.raw ?? input) } as PsrActiveDirectoryProfile
    await this.raw.activeDirectoryManager.updateActiveDirectoryProfile(profile)
  }

  async deleteProfile(id: PsrGuid) {
    await this.raw.activeDirectoryManager.deleteActiveDirectoryProfile({ Id: id } as never)
  }

  async checkConnection(input: {
    profileId?: PsrGuid | null
    domainName: string
    userName: string
    authTypes: unknown
    encryptedUserPassword?: string | null
  }) {
    return this.raw.activeDirectoryManager.checkActiveDirectoryConnection(
      input.profileId ?? null,
      input.domainName,
      input.userName,
      input.authTypes as never,
      input.encryptedUserPassword ?? null,
    )
  }

  async getRootElements(profileId: PsrGuid, cnFilter: string | null = null) {
    return this.raw.activeDirectoryManager.getActiveDirectoryRootElements(profileId, cnFilter)
  }

  async getMembersOfGroup(profileId: PsrGuid, objectGuid: string) {
    return this.raw.activeDirectoryManager.getActiveDirectoryMembersOfGroup(profileId, objectGuid)
  }

  async getElements(profileId: PsrGuid, elementName: string, search: string, fullSearch = false) {
    return this.raw.activeDirectoryManager.getActiveDirectoryElementList(
      profileId,
      elementName,
      search,
      fullSearch,
    )
  }

  async getSpecificElements(profileId: PsrGuid, objectGuids: string[]) {
    return this.raw.activeDirectoryManager.getSpecificActiveDirectoryElements(
      profileId,
      objectGuids,
    )
  }

  async import(
    profileId: PsrGuid,
    newActiveDirectoryObjects: Record<string, unknown>[],
    excludeItems: Record<string, unknown>[],
    parentOrganisationUnitId: PsrGuid | null = null,
    tokenIdentity: string | null = null,
  ) {
    await this.raw.activeDirectoryManager.importActiveDirectory(
      profileId,
      newActiveDirectoryObjects,
      excludeItems,
      parentOrganisationUnitId,
      tokenIdentity,
    )
  }

  async sync(profileId: PsrGuid, tokenIdentity: string | null = null) {
    await this.raw.activeDirectoryManager.syncActiveDirectory(profileId, tokenIdentity)
  }

  async generateSummaryDetails(
    profileId: PsrGuid,
    newActiveDirectoryObjects: Record<string, unknown>[],
    excludeItems: Record<string, unknown>[],
    parentOrganisationUnitId: PsrGuid | null = null,
    tokenIdentity: string | null = null,
    withSyncInfo = false,
  ) {
    await this.raw.activeDirectoryManager.generateActiveDirectorySummaryDetails(
      profileId,
      newActiveDirectoryObjects,
      excludeItems,
      parentOrganisationUnitId,
      tokenIdentity,
      withSyncInfo,
    )
  }

  async getSummaryDetails(tokenIdentity: string) {
    return this.raw.activeDirectoryManager.getActiveDirectorySummaryDetails(tokenIdentity)
  }
}
