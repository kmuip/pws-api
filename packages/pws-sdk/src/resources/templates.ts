import type {
  PsrApi,
  PsrDataRightTemplate,
  PsrDataTagTemplate,
  PsrDataRightTemplateTarget,
  PsrGuid,
  PsrRight,
  PsrTemplateGroup,
} from '@kmuip/pws-api'
import type {
  AddRoleRightsTemplateInput,
  AddTagTemplateInput,
  DataRightTemplateListOptions,
  DataRightTemplateRecord,
  DataTagTemplateListOptions,
  DataTagTemplateRecord,
  SetPredefinedRightOwnerInput,
  TemplateGroupMatch,
  TemplateGroupCreateInput,
  TemplateGroupListOptions,
  TemplateGroupRecord,
  TemplateGroupUpdateInput,
  UpdateTagTemplateInput,
} from '../types.js'
import { PsrApiEnums } from '@kmuip/pws-api'
import { asArray, containsText, normalizeText, paginate, sortRecords } from '../utils.js'

function toTemplateGroupRecord(group: PsrTemplateGroup): TemplateGroupRecord {
  return {
    id: group.Id,
    name: normalizeText(group.Name),
    organisationUnitId: (group.OrganisationUnitId as PsrGuid | undefined) ?? null,
    parentGroupId: (group.ParentGroupId as PsrGuid | undefined) ?? null,
    raw: group,
  }
}

function toDataRightTemplateRecord(template: PsrDataRightTemplate): DataRightTemplateRecord {
  const arrayRights = Array.isArray(template.Rights) ? Number(template.Rights[0] as unknown) : null
  const rights =
    typeof template.Rights === 'number'
      ? (template.Rights as PsrRight)
      : Number.isFinite(arrayRights)
        ? (arrayRights as PsrRight)
        : null

  return {
    dataId: (template.DataId as PsrGuid | undefined) ?? null,
    legitimateId: (template.LegitimateId as PsrGuid | undefined) ?? null,
    targetId: (template.TargetId as PsrGuid | undefined) ?? null,
    templateGroupId: (template.TemplateGroupId as PsrGuid | undefined) ?? null,
    rights,
    ownerRight: typeof template.OwnerRight === 'boolean' ? template.OwnerRight : null,
    raw: template,
  }
}

function toDataTagTemplateRecord(template: PsrDataTagTemplate): DataTagTemplateRecord {
  return {
    dataId: (template.DataId as PsrGuid | undefined) ?? null,
    targetId: (template.TargetId as PsrGuid | undefined) ?? null,
    templateGroupId: (template.TemplateGroupId as PsrGuid | undefined) ?? null,
    tagIds: asArray(template.TagIds as PsrGuid[] | null | undefined),
    raw: template,
  }
}

export class TemplatesResource {
  constructor(private readonly raw: PsrApi) {}

  async getGroup(id: PsrGuid) {
    return toTemplateGroupRecord(await this.raw.templateManager.getTemplateGroupById(id))
  }

  async listGroups(options: TemplateGroupListOptions = {}) {
    const groups = options.rootOnly
      ? asArray(
          await this.raw.templateManager.getRootTemplateGroupList(
            options.organisationUnitId ?? null,
          ),
        )
      : asArray(
          await this.raw.templateManager.getTemplateGroupList(
            options.organisationUnitId ?? null,
            options.ignoreOrganisationUnitPath ?? false,
          ),
        )

    const filtered = groups
      .filter((group) => {
        if (options.ids?.length) {
          const ids = new Set(options.ids)
          if (!ids.has(group.Id)) {
            return false
          }
        }
        if (options.parentGroupId && group.ParentGroupId !== options.parentGroupId) {
          return false
        }
        if (!containsText(group.Name, options.search)) {
          return false
        }
        return true
      })
      .map(toTemplateGroupRecord)

    const sorted = options.sortBy
      ? sortRecords(filtered, (record) => record[options.sortBy ?? 'name'], options.sortDirection)
      : filtered

    return paginate(sorted, options.page, options.pageSize)
  }

  async createGroup(input: TemplateGroupCreateInput) {
    const group = {
      Id: '00000000-0000-0000-0000-000000000000',
      Name: input.name,
      ...(input.organisationUnitId ? { OrganisationUnitId: input.organisationUnitId } : {}),
      ...(input.parentGroupId ? { ParentGroupId: input.parentGroupId } : {}),
    } as PsrTemplateGroup

    return toTemplateGroupRecord(await this.raw.templateManager.addTemplateGroup(group))
  }

  async updateGroup(id: PsrGuid, input: TemplateGroupUpdateInput) {
    const group = await this.raw.templateManager.getTemplateGroupById(id)
    if (input.name != null) {
      group.Name = input.name
    }
    if (input.organisationUnitId !== undefined) {
      group.OrganisationUnitId = input.organisationUnitId ?? undefined
    }
    if (input.parentGroupId !== undefined) {
      group.ParentGroupId = input.parentGroupId ?? undefined
    }
    return toTemplateGroupRecord(await this.raw.templateManager.updateTemplateGroup(group))
  }

  async deleteGroup(id: PsrGuid) {
    await this.raw.templateManager.deleteTemplateGroup(id)
  }

  async getGroupByName(match: TemplateGroupMatch) {
    const normalizedName = normalizeText(match.name)?.toLowerCase()
    if (!normalizedName) {
      return null
    }

    const groups = await this.listGroups({
      organisationUnitId: match.organisationUnitId ?? null,
      parentGroupId: match.parentGroupId ?? null,
      search: match.name,
    })

    return (
      groups.find((group) => normalizeText(group.name)?.toLowerCase() === normalizedName) ?? null
    )
  }

  async ensureGroup(input: TemplateGroupCreateInput) {
    const existing = await this.getGroupByName({
      organisationUnitId: input.organisationUnitId ?? null,
      parentGroupId: input.parentGroupId ?? null,
      name: input.name,
    })

    return existing ?? this.createGroup(input)
  }

  async getDefaultGroupId(
    organisationUnitId: PsrGuid,
    options: { ignoreParents?: boolean | null } = {},
  ) {
    return this.raw.templateManager.getDefaultOrganisationUnitTemplateGroupId(
      organisationUnitId,
      options.ignoreParents ?? false,
    )
  }

  async setDefaultGroup(organisationUnitId: PsrGuid, templateGroupId: PsrGuid) {
    await this.raw.optionManager.updateStringOption(
      `TemplateGroupDefault_${organisationUnitId}`,
      'OptionCategoryConfig',
      PsrApiEnums.PsrOptionGroup.OptionGroupSystem,
      templateGroupId,
      null,
    )
  }

  async getGroupCount(organisationUnitId: PsrGuid) {
    return this.raw.templateManager.getTemplateGroupCount(organisationUnitId)
  }

  async listRootGroups(organisationUnitId: PsrGuid | null = null) {
    return asArray(await this.raw.templateManager.getRootTemplateGroupList(organisationUnitId)).map(
      toTemplateGroupRecord,
    )
  }

  async listDataRightTemplates(options: DataRightTemplateListOptions) {
    if (options.hierarchical) {
      if (!options.targetId) {
        throw new Error('targetId is required when hierarchical right templates are requested.')
      }

      const templates = await this.raw.templateManager.getHierarchyDataRightTemplate(
        options.dataId,
        options.dataType ?? null,
        options.targetId,
        options.templateGroupId,
      )

      return asArray(templates).map(toDataRightTemplateRecord)
    }

    const templates = await this.raw.templateManager.getDataRightTemplates(
      options.dataId,
      options.dataType ?? null,
      options.targetId ?? null,
      options.templateGroupId,
    )

    return asArray(templates).map(toDataRightTemplateRecord)
  }

  async listDataTagTemplates(options: DataTagTemplateListOptions) {
    const templates = options.hierarchical
      ? await this.raw.templateManager.getHierarchyDataTagTemplate(
          options.dataId,
          options.dataType ?? null,
          options.targetId ?? null,
          options.templateGroupId,
        )
      : await this.raw.templateManager.getDataTagTemplates(
          options.dataId,
          options.dataType ?? null,
          options.targetId ?? null,
          options.templateGroupId,
        )

    return asArray(templates).map(toDataTagTemplateRecord)
  }

  async addRoleRights(input: AddRoleRightsTemplateInput) {
    await this.raw.templateManager.addLegitimateDataRightTemplate(
      input.dataId,
      input.legitimateId,
      input.rights,
      input.dataType ?? null,
      (input.targetId ?? null) as never,
      input.templateGroupId,
    )
  }

  async updateRoleRights(input: AddRoleRightsTemplateInput) {
    await this.raw.templateManager.updateLegitimateDataRightTemplate(
      input.dataId,
      input.legitimateId,
      input.rights,
      input.dataType ?? null,
      (input.targetId ?? null) as never,
      input.templateGroupId,
    )
  }

  async setRoleOwnerRight(input: SetPredefinedRightOwnerInput & { templateGroupId: PsrGuid }) {
    await this.raw.templateManager.updateLegitimateDataRightTemplateOwnerRight(
      input.dataId,
      input.legitimateId,
      input.dataType ?? null,
      (input.targetId ?? null) as never,
      input.templateGroupId,
      input.ownerRight,
    )
  }

  async removeRoleRights(input: AddRoleRightsTemplateInput) {
    await this.raw.templateManager.removeLegitimateDataRightTemplate(
      input.dataId,
      input.legitimateId,
      input.rights,
      input.dataType ?? null,
      (input.targetId ?? null) as never,
      input.templateGroupId,
    )
  }

  async removeAllRoleRights(dataId: PsrGuid) {
    await this.raw.templateManager.removeAllLegitimateDataRightTemplate(dataId)
  }

  async addTags(input: AddTagTemplateInput) {
    await this.raw.templateManager.addDataTagTemplate(
      input.dataId,
      input.tagIds,
      input.dataType ?? null,
      (input.targetId ?? null) as never,
      input.templateGroupId,
    )
  }

  async updateTag(input: UpdateTagTemplateInput) {
    await this.raw.templateManager.updateDataTagTemplate(
      input.dataId,
      input.tagId,
      input.dataType ?? null,
      (input.targetId ?? null) as never,
      input.templateGroupId,
    )
  }

  async removeTags(input: AddTagTemplateInput) {
    for (const tagId of input.tagIds) {
      await this.raw.templateManager.removeDataTagTemplate(
        input.dataId,
        tagId,
        input.dataType ?? null,
        (input.targetId ?? null) as never,
        input.templateGroupId,
      )
    }
  }

  async removeAllTags(dataId: PsrGuid) {
    await this.raw.templateManager.removeAllDataTagTemplate(dataId)
  }

  async getDataRightTemplate(input: {
    dataId: PsrGuid
    legitimateId: PsrGuid
    dataType?: number | null
    targetId: PsrGuid
    templateGroupId: PsrGuid
  }) {
    return toDataRightTemplateRecord(
      await this.raw.templateManager.getDataRightTemplate(
        input.dataId,
        input.legitimateId,
        (input.dataType ?? null) as never,
        input.targetId,
        input.templateGroupId,
      ),
    )
  }

  async getDataTagTemplate(input: {
    dataId: PsrGuid
    dataType?: number | null
    targetId?: PsrGuid | null
    templateGroupId: PsrGuid
  }) {
    return toDataTagTemplateRecord(
      await this.raw.templateManager.getDataTagTemplate(
        input.dataId,
        (input.dataType ?? null) as never,
        input.targetId ?? null,
        input.templateGroupId,
      ),
    )
  }

  async getTargets(dataId: PsrGuid | null = null): Promise<PsrDataRightTemplateTarget[]> {
    return asArray(await this.raw.templateManager.getDataRightTemplateTargets(dataId))
  }
}
