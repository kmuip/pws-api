import { PsrGuid } from '../base'
import type {
  PsrDataRightTemplate,
  PsrTemplateGroup,
  PsrDataTagTemplate,
  PsrDataRightTemplateTarget,
  PsrDataRightTemplateTargetNode,
} from '../data'
import { PsrEntityObjectType, PsrRight } from '../enum-constants'

export type TemplateManager = {
  getDataRightTemplates(
    dataId: PsrGuid,
    dataType: PsrEntityObjectType | null,
    targetId: PsrGuid | null,
    templateGroupId: PsrGuid,
  ): Promise<Iterable<PsrDataRightTemplate>>
  getHierarchyDataRightTemplate(
    dataId: PsrGuid,
    dataType: PsrEntityObjectType | null,
    targetId: PsrGuid,
    templateGroupId: PsrGuid,
  ): Promise<Iterable<PsrDataRightTemplate>>
  getTemplateGroupList(
    organisationUnitId: PsrGuid | null,
    ignoreOrganisationUnitPath: boolean,
  ): Promise<Iterable<PsrTemplateGroup>>
  getDefaultOrganisationUnitTemplateGroupId(
    organisationUnitId: PsrGuid,
    ignoreParents: boolean,
  ): Promise<PsrGuid>
  getDataTagTemplates(
    dataId: PsrGuid,
    dataType: PsrEntityObjectType | null,
    targetId: PsrGuid | null,
    templateGroupId: PsrGuid,
  ): Promise<Iterable<PsrDataTagTemplate>>
  getTemplateGroupCount(organisationUnitId: PsrGuid): Promise<number>
  getTemplateGroupById(templateGroupId: PsrGuid): Promise<PsrTemplateGroup>
  getHierarchyDataTagTemplate(
    dataId: PsrGuid,
    dataType: PsrEntityObjectType | null,
    targetId: PsrGuid | null,
    templateGroupId: PsrGuid,
  ): Promise<Iterable<PsrDataTagTemplate>>
  getDataRightTemplateTargets(dataId: PsrGuid | null): Promise<Iterable<PsrDataRightTemplateTarget>>
  getDataRightTemplateTargetNode(dataId: PsrGuid): Promise<PsrDataRightTemplateTargetNode>
  addTemplateGroup(group: PsrTemplateGroup): Promise<PsrTemplateGroup>
  updateTemplateGroup(group: PsrTemplateGroup): Promise<PsrTemplateGroup>
  deleteTemplateGroup(id: PsrGuid): Promise<void> | void
  getRootTemplateGroupList(organisationUnitId: PsrGuid | null): Promise<Iterable<PsrTemplateGroup>>
  addLegitimateDataRightTemplate(
    dataId: PsrGuid,
    legitimateId: PsrGuid,
    rights: PsrRight,
    dataType: PsrEntityObjectType | null,
    targetId: PsrGuid,
    templateGroupId: PsrGuid,
  ): Promise<void> | void
  updateLegitimateDataRightTemplate(
    dataId: PsrGuid,
    legitimateId: PsrGuid,
    rights: PsrRight,
    dataType: PsrEntityObjectType | null,
    targetId: PsrGuid,
    templateGroupId: PsrGuid,
  ): Promise<void> | void
  updateLegitimateDataRightTemplateOwnerRight(
    dataId: PsrGuid,
    legitimateId: PsrGuid,
    dataType: PsrEntityObjectType | null,
    targetId: PsrGuid,
    templateGroupId: PsrGuid,
    ownerRight: boolean,
  ): Promise<void> | void
  removeLegitimateDataRightTemplate(
    dataId: PsrGuid,
    legitimateId: PsrGuid,
    rights: PsrRight,
    dataType: PsrEntityObjectType | null,
    targetId: PsrGuid,
    templateGroupId: PsrGuid,
  ): Promise<void> | void
  removeAllLegitimateDataRightTemplate(dataId: PsrGuid): Promise<void> | void
  addDataTagTemplate(
    dataId: PsrGuid,
    tagIds: PsrGuid[],
    dataType: PsrEntityObjectType | null,
    targetId: PsrGuid,
    templateGroupId: PsrGuid,
  ): Promise<void> | void
  updateDataTagTemplate(
    dataId: PsrGuid,
    tagId: PsrGuid,
    dataType: PsrEntityObjectType | null,
    targetId: PsrGuid,
    templateGroupId: PsrGuid,
  ): Promise<void> | void
  removeDataTagTemplate(
    dataId: PsrGuid,
    tagId: PsrGuid,
    dataType: PsrEntityObjectType | null,
    targetId: PsrGuid | null,
    templateGroupId: PsrGuid,
  ): Promise<void> | void
  removeAllDataTagTemplate(dataId: PsrGuid): Promise<void> | void
  getDataRightTemplate(
    dataId: PsrGuid,
    legitimateId: PsrGuid,
    dataType: PsrEntityObjectType | null,
    targetId: PsrGuid,
    templateGroupId: PsrGuid,
  ): Promise<PsrDataRightTemplate>
  getDataTagTemplate(
    dataId: PsrGuid,
    dataType: PsrEntityObjectType | null,
    targetId: PsrGuid | null,
    templateGroupId: PsrGuid,
  ): Promise<PsrDataTagTemplate>
}
