import type {
  PsrApi,
  PsrDataRightTemplate,
  PsrDataRightTemplateTargetNode,
  PsrDataTagTemplate,
  PsrEntityObjectType,
  PsrGuid,
  PsrRight,
} from '@kmuip/pws-api'
import type {
  DataRightTemplateRecord,
  DataTagTemplateRecord,
  PredefinedRightListOptions,
  RemovePredefinedRightByTargetInput,
  PredefinedRightTargetMatch,
  PredefinedRightTargetNode,
  RemovePredefinedRightInput,
  SetPredefinedRightByTargetInput,
  SetPredefinedRightInput,
  SetPredefinedRightOwnerInput,
} from '../types.js'
import { asArray, normalizeText } from '../utils.js'

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

function getTargetName(target: Record<string, unknown> | null | undefined) {
  return normalizeText(
    target?.Name ?? target?.GroupName ?? target?.RoleName ?? target?.UserName ?? null,
  )
}

function toTargetNode(node: PsrDataRightTemplateTargetNode): PredefinedRightTargetNode {
  const target =
    node.Target && typeof node.Target === 'object' ? (node.Target as Record<string, unknown>) : null

  return {
    dataType: (node.DataType as PsrEntityObjectType | undefined) ?? null,
    targetId: (target?.Id as PsrGuid | undefined) ?? null,
    name: getTargetName(target),
    templates: asArray(node.Templates as PsrDataRightTemplate[] | null | undefined).map(
      toDataRightTemplateRecord,
    ),
    tagTemplates: asArray(node.TagTemplates as PsrDataTagTemplate[] | null | undefined).map(
      toDataTagTemplateRecord,
    ),
    children: asArray(node.Children).map(toTargetNode),
    raw: node,
  }
}

function matchesTarget(node: PredefinedRightTargetNode, match: PredefinedRightTargetMatch) {
  if (match.targetId && node.targetId !== match.targetId) {
    return false
  }
  if (match.dataType != null && node.dataType !== match.dataType) {
    return false
  }
  if (
    match.name &&
    normalizeText(node.name)?.toLowerCase() !== normalizeText(match.name)?.toLowerCase()
  ) {
    return false
  }
  return true
}

export class PredefinedRightsResource {
  constructor(private readonly raw: PsrApi) {}

  private async resolveTemplateGroupId(dataId: PsrGuid, templateGroupId?: PsrGuid | null) {
    if (templateGroupId) {
      return templateGroupId
    }

    return this.raw.templateManager.getDefaultOrganisationUnitTemplateGroupId(dataId, true)
  }

  async getTargetTree(dataId: PsrGuid) {
    return toTargetNode(await this.raw.templateManager.getDataRightTemplateTargetNode(dataId))
  }

  async findTarget(dataId: PsrGuid, match: PredefinedRightTargetMatch) {
    const root = await this.getTargetTree(dataId)

    const walk = (node: PredefinedRightTargetNode): PredefinedRightTargetNode | null => {
      if (matchesTarget(node, match)) {
        return node
      }

      for (const child of node.children) {
        const hit = walk(child)
        if (hit) {
          return hit
        }
      }

      return null
    }

    return walk(root)
  }

  async list(options: PredefinedRightListOptions) {
    const templateGroupId = await this.resolveTemplateGroupId(
      options.dataId,
      options.templateGroupId,
    )

    const templates = options.hierarchical
      ? await this.raw.templateManager.getHierarchyDataRightTemplate(
          options.dataId,
          options.dataType ?? null,
          (options.targetId ?? null) as never,
          templateGroupId,
        )
      : await this.raw.templateManager.getDataRightTemplates(
          options.dataId,
          options.dataType ?? null,
          options.targetId ?? null,
          templateGroupId,
        )

    return asArray(templates).map(toDataRightTemplateRecord)
  }

  async set(input: SetPredefinedRightInput) {
    const templateGroupId = await this.resolveTemplateGroupId(input.dataId, input.templateGroupId)
    const existing = (
      await this.list({
        dataId: input.dataId,
        dataType: input.dataType ?? null,
        targetId: input.targetId ?? null,
        templateGroupId,
      })
    ).find((template) => template.legitimateId === input.legitimateId)

    if (existing) {
      await this.raw.templateManager.updateLegitimateDataRightTemplate(
        input.dataId,
        input.legitimateId,
        input.rights,
        input.dataType ?? null,
        (input.targetId ?? null) as never,
        templateGroupId,
      )
    } else {
      await this.raw.templateManager.addLegitimateDataRightTemplate(
        input.dataId,
        input.legitimateId,
        input.rights,
        input.dataType ?? null,
        (input.targetId ?? null) as never,
        templateGroupId,
      )
    }

    if (input.ownerRight != null) {
      await this.raw.templateManager.updateLegitimateDataRightTemplateOwnerRight(
        input.dataId,
        input.legitimateId,
        input.dataType ?? null,
        (input.targetId ?? null) as never,
        templateGroupId,
        input.ownerRight,
      )
    }
  }

  async setByTarget(input: SetPredefinedRightByTargetInput) {
    const target = await this.findTarget(input.dataId, input.target)
    if (!target) {
      throw new Error('Predefined-right target was not found.')
    }

    await this.set({
      ...input,
      dataType: target.dataType ?? null,
      targetId: target.targetId ?? null,
    })
  }

  async remove(input: RemovePredefinedRightInput) {
    const templateGroupId = await this.resolveTemplateGroupId(input.dataId, input.templateGroupId)
    await this.raw.templateManager.removeLegitimateDataRightTemplate(
      input.dataId,
      input.legitimateId,
      input.rights,
      input.dataType ?? null,
      (input.targetId ?? null) as never,
      templateGroupId,
    )
  }

  async removeByTarget(input: RemovePredefinedRightByTargetInput) {
    const target = await this.findTarget(input.dataId, input.target)
    if (!target) {
      throw new Error('Predefined-right target was not found.')
    }

    await this.remove({
      ...input,
      dataType: target.dataType ?? null,
      targetId: target.targetId ?? null,
    })
  }

  async setOwnerRight(input: SetPredefinedRightOwnerInput) {
    const templateGroupId = await this.resolveTemplateGroupId(input.dataId, input.templateGroupId)
    await this.raw.templateManager.updateLegitimateDataRightTemplateOwnerRight(
      input.dataId,
      input.legitimateId,
      input.dataType ?? null,
      (input.targetId ?? null) as never,
      templateGroupId,
      input.ownerRight,
    )
  }
}
