import { PsrApiEnums, type PsrApi, type PsrApplication, type PsrGuid } from '@kmuip/pws-api'
import type {
  ApplicationCreateInput,
  ApplicationListOptions,
  ApplicationRecord,
  ApplicationUpdateInput,
} from '../types.js'
import { asArray, containsText, normalizeText, paginate, sortRecords } from '../utils.js'

function toApplicationRecord(application: PsrApplication): ApplicationRecord {
  return {
    id: application.Id,
    name: normalizeText(application.Name),
    description: normalizeText(application.Description),
    applicationType:
      application.ApplicationType == null ? null : (Number(application.ApplicationType) as never),
    settings: normalizeText(application.ApplicationSettings),
    parentIds: asArray(application.ParentDataBindings).flatMap((binding) =>
      binding?.ParentDataId ? [binding.ParentDataId as PsrGuid] : [],
    ),
    raw: application,
  }
}

export class ApplicationsResource {
  constructor(private readonly raw: PsrApi) {}

  async list(options: ApplicationListOptions = {}) {
    const filter = await this.raw.applicationManager.getApplicationListFilter(true)
    const applications = asArray(await this.raw.applicationManager.getApplicationList(filter))

    const records = applications
      .filter((application) => {
        if (options.ids?.length) {
          const ids = new Set(options.ids)
          if (!ids.has(application.Id)) {
            return false
          }
        }
        if (!containsText(application.Name, options.name)) {
          return false
        }
        if (
          options.applicationType != null &&
          Number(application.ApplicationType) !== Number(options.applicationType)
        ) {
          return false
        }
        if (options.parentId) {
          const parentIds = asArray(application.ParentDataBindings).flatMap((binding) =>
            binding?.ParentDataId ? [binding.ParentDataId as PsrGuid] : [],
          )
          if (!parentIds.includes(options.parentId)) {
            return false
          }
        }
        if (options.search) {
          const haystack = [
            application.Name,
            application.Description,
            application.ApplicationSettings,
          ]
            .filter(Boolean)
            .join(' ')
          if (!containsText(haystack, options.search)) {
            return false
          }
        }
        return true
      })
      .map(toApplicationRecord)

    const sorted = options.sortBy
      ? sortRecords(
          records,
          (record) => {
            switch (options.sortBy) {
              case 'applicationType':
                return record.applicationType
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

  async get(id: PsrGuid) {
    return toApplicationRecord(await this.raw.applicationManager.getApplication(id))
  }

  async create(input: ApplicationCreateInput) {
    const application = {
      Name: input.name,
      ...(input.description ? { Description: input.description } : {}),
      ApplicationType: Number(input.applicationType),
      ...(input.settings ? { ApplicationSettings: input.settings } : {}),
    } as unknown as PsrApplication

    const created = await this.raw.applicationManager.addApplication(application)
    if (input.parentId) {
      await this.attachToOrganisationUnit(created.Id, input.parentId)
    }

    return this.get(created.Id)
  }

  async update(id: PsrGuid, input: ApplicationUpdateInput) {
    const application = await this.raw.applicationManager.getApplication(id)
    if (input.name != null) {
      application.Name = input.name
    }
    if (input.description != null) {
      application.Description = input.description
    }
    if (input.applicationType != null) {
      application.ApplicationType = Number(input.applicationType) as never
    }
    if (input.settings != null) {
      application.ApplicationSettings = input.settings
    }

    await this.raw.applicationManager.updateApplication(application)

    if (input.parentId !== undefined) {
      await this.raw.dataBindingManager.removeAllDataBinding(
        id,
        PsrApiEnums.PsrEntityObjectType.EntityObjectTypeGroup,
      )
      if (input.parentId) {
        await this.attachToOrganisationUnit(id, input.parentId)
      }
    }

    return this.get(id)
  }

  async attachToOrganisationUnit(id: PsrGuid, parentId: PsrGuid) {
    await this.raw.dataBindingManager.addDataBinding(
      id,
      PsrApiEnums.PsrEntityObjectType.EntityObjectTypeApplication,
      parentId,
      PsrApiEnums.PsrEntityObjectType.EntityObjectTypeGroup,
    )
  }

  async detachFromOrganisationUnit(id: PsrGuid, parentId: PsrGuid) {
    await this.raw.dataBindingManager.removeDataBinding(id, parentId)
  }

  async detachEverywhere(id: PsrGuid) {
    const application = await this.raw.applicationManager.getApplication(id)
    const parentIds = asArray(application.ParentDataBindings).flatMap((binding) =>
      binding?.ParentDataId ? [binding.ParentDataId as PsrGuid] : [],
    )

    for (const parentId of parentIds) {
      await this.detachFromOrganisationUnit(id, parentId)
    }
  }
}
