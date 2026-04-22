import type {
  PsrApi,
  PsrGuid,
  PsrOrganisationUnitGroup,
  PsrOrganisationUnitStructure,
} from '@kmuip/pws-api'
import type {
  OrganisationUnitCreateInput,
  OrganisationUnitListOptions,
  OrganisationUnitNode,
  OrganisationUnitRecord,
  OrganisationUnitUpdateInput,
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

type StructureLike =
  | PsrOrganisationUnitStructure
  | (PsrOrganisationUnitGroup & {
      ChildrenOrganisationUnits?: StructureLike[] | null
      UserName?: string
    })

function toGroupRecord(group: PsrOrganisationUnitGroup): OrganisationUnitRecord {
  return {
    id: group.Id,
    name: normalizeText(group.GroupName),
    parentId: getParentId(group),
    raw: group,
  }
}

function getOrganisationUnit(
  structure: StructureLike,
): (PsrOrganisationUnitGroup & { UserName?: string }) | null {
  if ('OrganisationUnit' in structure && structure.OrganisationUnit) {
    return structure.OrganisationUnit as PsrOrganisationUnitGroup & { UserName?: string }
  }

  if ('Id' in structure) {
    return structure
  }

  return null
}

function getChildren(structure: StructureLike): StructureLike[] {
  if ('ChildrenOrganisationUnits' in structure) {
    return asArray(structure.ChildrenOrganisationUnits)
  }

  return []
}

function buildNode(structure: StructureLike, parentPath: string): OrganisationUnitNode | null {
  const organisationUnit = getOrganisationUnit(structure)
  if (!organisationUnit) {
    return null
  }

  const name =
    normalizeText(organisationUnit.GroupName) ??
    normalizeText((organisationUnit as { UserName?: string }).UserName) ??
    organisationUnit.Id
  const path = parentPath ? `${parentPath}/${name}` : name

  return {
    id: organisationUnit.Id,
    name,
    parentId: getParentId(organisationUnit),
    path,
    children: getChildren(structure)
      .map((child) => buildNode(child, path))
      .filter((child): child is OrganisationUnitNode => child != null),
    raw: structure as PsrOrganisationUnitStructure,
  }
}

export class OrganisationUnitsResource {
  constructor(private readonly raw: PsrApi) {}

  async list(options: OrganisationUnitListOptions = {}) {
    const tree = await this.listTree()
    const records: OrganisationUnitRecord[] = []

    const walk = (nodes: OrganisationUnitNode[]) => {
      for (const node of nodes) {
        const organisationUnit = getOrganisationUnit(
          node.raw as unknown as StructureLike,
        ) as PsrOrganisationUnitGroup | null
        if (!organisationUnit) {
          continue
        }
        records.push({
          id: node.id,
          name: node.name,
          parentId: node.parentId,
          raw: organisationUnit,
        })
        walk(node.children)
      }
    }

    walk(tree)

    const filtered = records.filter((record) => {
      if (options.ids?.length) {
        const ids = new Set(options.ids)
        if (!ids.has(record.id)) {
          return false
        }
      }
      if (options.parentId && record.parentId !== options.parentId) {
        return false
      }
      if (!containsText(record.name, options.name)) {
        return false
      }
      if (options.search && !containsText(record.name, options.search)) {
        return false
      }
      return true
    })

    const sorted = options.sortBy
      ? sortRecords(filtered, (record) => record[options.sortBy ?? 'name'], options.sortDirection)
      : filtered

    return paginate(sorted, options.page, options.pageSize)
  }

  async listTree() {
    const structures = asArray(
      await this.raw.organisationUnitManager.getOrganisationUnitStructure({}),
    )
    return structures
      .filter((structure) => {
        const group = getOrganisationUnit(structure) as Record<string, unknown> | null
        if (!group) {
          return false
        }
        return typeof group.GroupName === 'string' || !('UserName' in group)
      })
      .map((structure) => buildNode(structure, ''))
      .filter((structure): structure is OrganisationUnitNode => structure != null)
  }

  async createGroup(input: OrganisationUnitCreateInput) {
    const currentUser = ensureAuthenticatedUser(this.raw)
    const keyPair = await this.raw.encryptionManager.generateKeyPair()
    if (!currentUser.PublicKey) {
      throw new Error('Current user public key is not available.')
    }

    const group = {
      GroupName: input.name,
      ...(input.description ? { Description: input.description } : {}),
    } as PsrOrganisationUnitGroup

    const encryptedGroupPrivateKey = await this.raw.encryptionManager.encryptWithPublicKey(
      currentUser.PublicKey,
      keyPair.privateKey,
    )

    const created = await this.raw.organisationUnitManager.addOrganisationUnitGroup(
      group,
      toBase64Binary(keyPair.publicKey) as never,
      toBase64Binary(encryptedGroupPrivateKey) as never,
      input.parentId,
    )

    return toGroupRecord(created)
  }

  async getCurrent() {
    const current = await this.raw.organisationUnitManager.getCurrentOrganisationUnit()
    return {
      id: current.Id,
      username: normalizeText(current.UserName),
      firstName: normalizeText(current.FirstName),
      lastName: normalizeText(current.LastName),
      parentId: getParentId(current),
      raw: current,
    }
  }

  async get(id: PsrGuid) {
    const group = await this.raw.organisationUnitManager.getOrganisationUnitGroup(id)
    return toGroupRecord(group)
  }

  async updateGroup(id: PsrGuid, input: OrganisationUnitUpdateInput) {
    const group = await this.raw.organisationUnitManager.getOrganisationUnitGroup(id)
    if (input.name != null) {
      group.GroupName = input.name
    }
    if (input.description != null) {
      group.Description = input.description
    }

    await this.raw.organisationUnitManager.updateOrganisationUnitGroup(group)
    return toGroupRecord(group)
  }

  async getInvolvedOrganisationUnits(dataId: PsrGuid) {
    return this.raw.organisationUnitManager.getGroupInvolvedOrganisationUnit(dataId)
  }

  async getImageSource(id: PsrGuid) {
    return this.raw.organisationUnitManager.getOrganisationUnitImageSource(id)
  }

  async hasMasterKeyMode(id: PsrGuid) {
    return this.raw.organisationUnitManager.hasGroupMasterKeyMode(id)
  }

  async deleteGroup(id: PsrGuid) {
    const group = await this.raw.organisationUnitManager.getOrganisationUnitGroup(id)
    await this.raw.organisationUnitManager.deleteOrganisationUnitGroup(group)
  }

  async resolvePath(path: string) {
    const normalized = path
      .split('/')
      .map((segment) => segment.trim())
      .filter(Boolean)
      .join('/')

    if (!normalized) {
      return null
    }

    const allNodes = await this.listTree()
    const walk = (nodes: OrganisationUnitNode[]): OrganisationUnitNode | null => {
      for (const node of nodes) {
        if (node.path === normalized) {
          return node
        }
        const child = walk(node.children)
        if (child) {
          return child
        }
      }

      return null
    }

    return walk(allNodes)
  }
}
