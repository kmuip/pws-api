import {
  PsrApiEnums,
  type PsrApi,
  type PsrGuid,
  type PsrOrganisationUnitUser,
} from '@kmuip/pws-api'
import type {
  CreateLocalUserInput,
  UpdateLocalUserInput,
  UserListOptions,
  UserRecord,
} from '../types.js'
import {
  asArray,
  containsText,
  ensureAuthenticatedUser,
  getParentId,
  normalizeText,
  paginate,
  sortRecords,
  toBase64Binary,
} from '../utils.js'

function toUserRecord(user: PsrOrganisationUnitUser): UserRecord {
  return {
    id: user.Id,
    username: normalizeText(user.UserName),
    firstName: normalizeText(user.FirstName),
    lastName: normalizeText(user.LastName),
    parentId: getParentId(user),
    raw: user,
  }
}

export class UsersResource {
  constructor(private readonly raw: PsrApi) {}

  async list(options: UserListOptions = {}) {
    const users = asArray(await this.raw.organisationUnitManager.getOrganisationUnitUserList({}))
    const records = users
      .filter((user) => {
        if (options.ids?.length) {
          const ids = new Set(options.ids)
          if (!ids.has(user.Id)) {
            return false
          }
        }
        if (options.parentId && getParentId(user) !== options.parentId) {
          return false
        }
        if (!containsText(user.UserName, options.username)) {
          return false
        }
        if (!containsText(user.Mail, options.email)) {
          return false
        }
        if (!containsText(user.FirstName, options.firstName)) {
          return false
        }
        if (!containsText(user.LastName, options.lastName)) {
          return false
        }
        if (!containsText(user.Language, options.language)) {
          return false
        }
        if (
          options.restrictiveUser != null &&
          Boolean(user.RestrictiveUser) !== options.restrictiveUser
        ) {
          return false
        }
        if (
          options.isDeactivated != null &&
          Boolean(user.IsDeactivated) !== options.isDeactivated
        ) {
          return false
        }
        if (options.search) {
          const haystack = [user.UserName, user.FirstName, user.LastName, user.Mail]
            .filter(Boolean)
            .join(' ')
          if (!containsText(haystack, options.search)) {
            return false
          }
        }
        return true
      })
      .map(toUserRecord)

    const sorted = options.sortBy
      ? sortRecords(
          records,
          (record) => {
            switch (options.sortBy) {
              case 'email':
                return (record.raw.Mail as string | null | undefined) ?? null
              case 'username':
                return record.username
              case 'firstName':
                return record.firstName
              case 'lastName':
                return record.lastName
              case 'id':
                return record.id
              default:
                return record.username
            }
          },
          options.sortDirection,
        )
      : records

    return paginate(sorted, options.page, options.pageSize)
  }

  async createLocalUser(input: CreateLocalUserInput) {
    const currentUser = ensureAuthenticatedUser(this.raw)
    if (!currentUser.PublicKey) {
      throw new Error('Current user public key is not available.')
    }

    const currentUserKey = this.raw.authenticationManagerV2.getUserKeys()[0]?.privateKey ?? null
    if (!currentUserKey) {
      throw new Error('Current user key is not available.')
    }

    const user = {
      UserName: input.username,
      ...(input.firstName ? { FirstName: input.firstName } : {}),
      ...(input.lastName ? { LastName: input.lastName } : {}),
      ...(input.description ? { Description: input.description } : {}),
      ...(input.email ? { Mail: input.email } : {}),
      Language: input.language ?? 'de',
      HasToChangePasswordOnNextLogin: input.hasToChangePasswordOnNextLogin ?? false,
      RestrictiveUser: input.restrictiveUser ?? false,
    } as PsrOrganisationUnitUser

    const passwordHash = await this.raw.encryptionManager.mtoPbkdf2(
      input.password,
      undefined,
      PsrApiEnums.MtoHashAlgorithm.Pbkdf2Sha256_623420Iterations,
    )
    const keyPair = await this.raw.encryptionManager.generateKeyPair()
    const encryptedUserPrivateKey = await this.raw.encryptionManager.encryptWithPassword(
      input.password,
      keyPair.privateKey,
    )
    const encryptedCurrentUserPrivateKey = await this.raw.encryptionManager.encryptWithPublicKey(
      currentUser.PublicKey,
      keyPair.privateKey,
    )

    const created = await this.raw.organisationUnitManager.addOrganisationUnitUser(
      user,
      passwordHash.Hash as never,
      passwordHash.Salt as never,
      toBase64Binary(keyPair.publicKey) as never,
      toBase64Binary(encryptedUserPrivateKey) as never,
      toBase64Binary(encryptedCurrentUserPrivateKey) as never,
      passwordHash.HashAlgorithm as never,
      input.parentId,
    )

    return toUserRecord(created)
  }

  async get(id: PsrGuid) {
    return toUserRecord(await this.raw.organisationUnitManager.getOrganisationUnitUser(id))
  }

  async getCurrent() {
    return toUserRecord(await this.raw.organisationUnitManager.getCurrentOrganisationUnit())
  }

  async update(id: PsrGuid, input: UpdateLocalUserInput) {
    const user = await this.raw.organisationUnitManager.getOrganisationUnitUser(id)
    if (input.username != null) {
      user.UserName = input.username
    }
    if (input.firstName != null) {
      user.FirstName = input.firstName
    }
    if (input.lastName != null) {
      user.LastName = input.lastName
    }
    if (input.description != null) {
      user.Description = input.description
    }
    if (input.email != null) {
      user.Mail = input.email
    }
    if (input.language != null) {
      user.Language = input.language
    }
    if (input.hasToChangePasswordOnNextLogin != null) {
      user.HasToChangePasswordOnNextLogin = input.hasToChangePasswordOnNextLogin
    }
    if (input.restrictiveUser != null) {
      user.RestrictiveUser = input.restrictiveUser
    }
    if (input.isDeactivated != null) {
      user.IsDeactivated = input.isDeactivated
    }

    await this.raw.organisationUnitManager.updateOrganisationUnitUser(user)
    return toUserRecord(await this.raw.organisationUnitManager.getOrganisationUnitUser(id))
  }

  async setDeactivated(id: PsrGuid, isDeactivated: boolean) {
    return this.update(id, { isDeactivated })
  }

  async getInvolvedOrganisationUnits(dataId: PsrGuid) {
    return this.raw.organisationUnitManager.getUserInvolvedOrganisationUnit(dataId)
  }

  async getImageSource(id: PsrGuid) {
    return this.raw.organisationUnitManager.getOrganisationUnitImageSource(id)
  }

  async hasMasterKeyMode(id: PsrGuid) {
    return this.raw.organisationUnitManager.hasUserMasterKeyMode(id)
  }

  async delete(id: PsrGuid) {
    const user = await this.raw.organisationUnitManager.getOrganisationUnitUser(id)
    await this.raw.organisationUnitManager.deleteOrganisationUnitUser(user)
  }
}
