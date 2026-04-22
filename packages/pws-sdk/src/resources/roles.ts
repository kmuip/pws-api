import type { PsrApi, PsrGuid, PsrRole } from '@kmuip/pws-api'
import type {
  RoleCreateInput,
  RoleListOptions,
  RoleRecord,
  RoleUpdateInput,
  UserRecord,
} from '../types.js'
import {
  asArray,
  containsText,
  normalizeText,
  paginate,
  sortRecords,
  toBase64Binary,
} from '../utils.js'

function toRoleRecord(role: PsrRole): RoleRecord {
  return {
    id: role.Id,
    name: normalizeText(role.RoleName),
    description: normalizeText(role.RoleDescription),
    raw: role,
  }
}

function toUserRecord(user: any): UserRecord {
  return {
    id: user.Id,
    username: normalizeText(user.UserName),
    firstName: normalizeText(user.FirstName),
    lastName: normalizeText(user.LastName),
    parentId: user.ParentDataId ?? null,
    raw: user,
  }
}

export class RolesResource {
  constructor(private readonly raw: PsrApi) {}

  async list(options: RoleListOptions = {}) {
    const filter = await this.raw.roleManager.getRoleListFilter(true)
    const roles = asArray(await this.raw.roleManager.getRoleList(filter))

    const records = roles
      .filter((role) => {
        if (options.ids?.length) {
          const ids = new Set(options.ids)
          if (!ids.has(role.Id)) {
            return false
          }
        }
        if (!containsText(role.RoleName, options.name)) {
          return false
        }
        if (options.search) {
          const haystack = [role.RoleName, role.RoleDescription].filter(Boolean).join(' ')
          if (!containsText(haystack, options.search)) {
            return false
          }
        }
        return true
      })
      .map(toRoleRecord)

    const sorted = options.sortBy
      ? sortRecords(records, (record) => record[options.sortBy ?? 'name'], options.sortDirection)
      : records

    return paginate(sorted, options.page, options.pageSize)
  }

  async get(id: PsrGuid) {
    return toRoleRecord(await this.raw.roleManager.getRole(id))
  }

  async getByName(name: string) {
    const normalizedName = normalizeText(name)?.toLowerCase()
    if (!normalizedName) {
      return null
    }

    const roles = await this.list({ name })
    return roles.find((role) => normalizeText(role.name)?.toLowerCase() === normalizedName) ?? null
  }

  async create(input: RoleCreateInput) {
    const currentUser = this.raw.currentUser
    if (!currentUser?.PublicKey) {
      throw new Error('Current user public key is not available.')
    }

    const keyPair = await this.raw.encryptionManager.generateKeyPair()
    const encryptedRolePrivateKey = await this.raw.encryptionManager.encryptWithPublicKey(
      currentUser.PublicKey,
      keyPair.privateKey,
    )

    const role = {
      RoleName: input.name,
      ...(input.description ? { RoleDescription: input.description } : {}),
    } as PsrRole

    const created = await this.raw.roleManager.addRole(
      role,
      toBase64Binary(keyPair.publicKey) as never,
      toBase64Binary(encryptedRolePrivateKey as string | Uint8Array) as never,
    )

    return toRoleRecord(created)
  }

  async update(id: PsrGuid, input: RoleUpdateInput) {
    const role = await this.raw.roleManager.getRole(id)
    if (input.name != null) {
      role.RoleName = input.name
    }
    if (input.description != null) {
      role.RoleDescription = input.description
    }
    await this.raw.roleManager.updateRole(role)
    return this.get(id)
  }

  async delete(id: PsrGuid) {
    const role = await this.raw.roleManager.getRole(id)
    await this.raw.roleManager.deleteRole(role)
  }

  async listUsers(roleId: PsrGuid) {
    return asArray(await this.raw.roleManager.getUsersInRole(roleId)).map(toUserRecord)
  }

  async getUserRoles(userId: PsrGuid) {
    return asArray(await this.raw.roleManager.getUserRoles(userId)).map(toRoleRecord)
  }

  async hasMasterKeyMode(id: PsrGuid) {
    return this.raw.roleManager.hasRoleMasterKeyMode(id)
  }

  async getInvolvedOrganisationUnits(dataId: PsrGuid) {
    return this.raw.roleManager.getRoleInvolvedOrganisationUnit(dataId)
  }
}
