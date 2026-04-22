import { readFile } from 'node:fs/promises'
import { basename, extname } from 'node:path'
import { PsrApiEnums, type PsrApi, type PsrContainer, type PsrGuid } from '@kmuip/pws-api'
import type {
  DocumentCreateInput,
  DocumentAllowedTypesRecord,
  DocumentLinkInput,
  DocumentLinkUpdateInput,
  DocumentListOptions,
  DocumentRecord,
  DocumentUploadInput,
  DocumentUploadUpdateInput,
  DocumentUpdateInput,
  PasswordHistoryRecord,
} from '../types.js'
import {
  applyOrganisationUnitFilter,
  asArray,
  containsText,
  getContainerDisplayName,
  paginate,
  setOrganisationUnitFilterScope,
  sortRecords,
  toBase64Binary,
} from '../utils.js'

function toDocumentRecord(container: PsrContainer): DocumentRecord {
  return {
    id: container.Id,
    name: getContainerDisplayName(container),
    description: container.Description ?? null,
    path: container.DocumentPath ?? null,
    documentType: container.DocumentType ?? null,
    isLink: Boolean(container.IsDocumentLink),
    organisationUnitId: (container.OrganisationUnitId as PsrGuid | undefined) ?? null,
    raw: container,
  }
}

function toHistoryRecord(entry: PsrContainer): PasswordHistoryRecord {
  return {
    id: entry.Id ?? null,
    name: getContainerDisplayName(entry),
    timestampUtc: entry.TimeStampUtc ?? null,
    container: entry,
    raw: entry as never,
  }
}

const DEFAULT_ALLOWED_DOCUMENT_TYPES = Object.freeze([
  'png',
  'pdf',
  'doc',
  'docx',
  'dot',
  'dotm',
  'dotx',
  'xls',
  'xlsx',
  'xlr',
  'wps',
  'jpg',
  'gif',
  'rtf',
  'txt',
  'ppt',
  'pptx',
  'pps',
  'ppm',
  'vss',
  'vssm',
  'vstm',
  'one',
  'onepkg',
  'pfx',
  'htm',
  'html',
  'lic',
  'ini',
  'xml',
] as const)

function normalizeDocumentType(value: string | null | undefined) {
  if (!value) {
    return null
  }

  const trimmed = value.trim()
  if (trimmed.length === 0) {
    return null
  }

  return trimmed.startsWith('.') ? trimmed : `.${trimmed}`
}

function normalizeAllowedDocumentType(value: string | null | undefined) {
  return normalizeDocumentType(value)?.slice(1).toLowerCase() ?? null
}

function splitAllowedDocumentTypes(value: string | null | undefined) {
  return value
    ?.split('|')
    .map((entry) => normalizeAllowedDocumentType(entry))
    .filter((entry): entry is string => Boolean(entry))
}

async function resolveDocumentContent(
  input: Pick<DocumentCreateInput, 'content' | 'filePath' | 'fileName' | 'documentType'>,
) {
  if (input.content == null && !input.filePath) {
    return null
  }

  const fileBytes =
    input.content instanceof ArrayBuffer
      ? new Uint8Array(input.content)
      : typeof input.content === 'string'
        ? Buffer.from(input.content, 'utf8')
        : input.content

  const bytes = fileBytes ?? (input.filePath ? await readFile(input.filePath) : null)
  if (!bytes) {
    return null
  }

  const nameSource = input.fileName ?? input.filePath ?? null
  const inferredDocumentType = normalizeDocumentType(
    input.documentType ?? (nameSource ? extname(nameSource) : null),
  )

  return {
    data: { DocumentData: toBase64Binary(bytes) },
    size: bytes.byteLength,
    documentType: inferredDocumentType,
    path: input.filePath ? basename(input.filePath) : (input.fileName ?? null),
  }
}

export class DocumentsResource {
  private allowedDocumentTypesPromise: Promise<DocumentAllowedTypesRecord> | null = null

  constructor(private readonly raw: PsrApi) {}

  private async loadAllowedDocumentTypes() {
    const option = this.raw.currentUser
      ? await this.raw.optionManager.getOption(
          'AllowedDocumentTypes',
          this.raw.currentUser as never,
        )
      : null

    const configured = splitAllowedDocumentTypes(
      (option as { ValueString?: string | null } | null)?.ValueString ??
        (option as { ValueSelectedItem?: string | null } | null)?.ValueSelectedItem ??
        (option?.Value as string | null | undefined) ??
        null,
    )

    const allowed = (configured?.length ? configured : [...DEFAULT_ALLOWED_DOCUMENT_TYPES]).map(
      (entry) => entry.toLowerCase(),
    )

    return {
      allowed,
      source: configured?.length ? 'server' : 'default',
      raw: option,
    } satisfies DocumentAllowedTypesRecord
  }

  private async ensureDocumentTypeAllowed(documentType: string | null | undefined) {
    const normalized = normalizeAllowedDocumentType(documentType)
    if (!normalized) {
      return
    }

    const allowedTypes = await this.getAllowedTypes()
    if (allowedTypes.allowed.includes(normalized)) {
      return
    }

    throw new Error(
      `Document type ".${normalized}" is not allowed by this Password Secure instance. Allowed types: ${allowedTypes.allowed.join(', ')}`,
    )
  }

  async getAllowedTypes() {
    this.allowedDocumentTypesPromise ??= this.loadAllowedDocumentTypes()
    return this.allowedDocumentTypesPromise
  }

  async createUpload(input: DocumentUploadInput) {
    return this.create({
      ...input,
      isLink: false,
    })
  }

  async createLink(input: DocumentLinkInput) {
    return this.create({
      ...input,
      isLink: true,
    })
  }

  async clone(
    id: PsrGuid,
    input: Partial<DocumentUpdateInput> & { organisationUnitId?: PsrGuid | null } = {},
  ) {
    const source = await this.raw.containerManager.getContainer(id)
    const container = await this.raw.containerManager.cloneContainer(id)
    if (input.name != null) {
      container.Name = input.name
    }
    if (input.description != null) {
      container.Description = input.description
    }
    if (input.path != null) {
      container.DocumentPath = input.path
    }
    if (input.documentType != null) {
      container.DocumentType = normalizeDocumentType(input.documentType) ?? undefined
      await this.ensureDocumentTypeAllowed(container.DocumentType)
    }
    const created = await this.raw.containerManager.addContainer(
      container,
      input.organisationUnitId ?? (source.OrganisationUnitId as PsrGuid | undefined) ?? null,
      null,
      null,
    )
    return toDocumentRecord(created)
  }

  async list(options: DocumentListOptions = {}) {
    const filter = await this.raw.containerManager.getContainerListFilter(
      PsrApiEnums.PsrContainerType.Document,
      true,
    )
    if (options.organisationUnitId) {
      applyOrganisationUnitFilter(filter, options.organisationUnitId)
      setOrganisationUnitFilterScope(filter, options.includeSubOrganisationUnits ?? true)
    }

    const documents = asArray(
      await this.raw.containerManager.getContainerList(
        PsrApiEnums.PsrContainerType.Document,
        filter,
      ),
    )

    const records = documents
      .filter((document) => {
        if (options.ids?.length) {
          const ids = new Set(options.ids)
          if (!ids.has(document.Id)) {
            return false
          }
        }
        if (!containsText(getContainerDisplayName(document), options.name)) {
          return false
        }
        if (!containsText(document.DocumentPath, options.path)) {
          return false
        }
        if (!containsText(document.DocumentType, options.documentType)) {
          return false
        }
        if (options.search) {
          const haystack = [
            getContainerDisplayName(document),
            document.Description,
            document.DocumentPath,
            document.DocumentType,
          ]
            .filter(Boolean)
            .join(' ')
          if (!containsText(haystack, options.search)) {
            return false
          }
        }
        return true
      })
      .map(toDocumentRecord)

    const sorted = options.sortBy
      ? sortRecords(
          records,
          (record) => {
            switch (options.sortBy) {
              case 'path':
                return record.path
              case 'documentType':
                return record.documentType
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
    return toDocumentRecord(await this.raw.containerManager.getContainer(id))
  }

  async create(input: DocumentCreateInput) {
    const container = await this.raw.containerManager.initContainer(
      PsrApiEnums.PsrContainerType.Document,
    )
    container.ContainerType = PsrApiEnums.PsrContainerType.Document as never
    container.Name = input.name
    container.Description = input.description ?? undefined
    container.IsDocumentLink = input.isLink ?? false

    if (container.IsDocumentLink) {
      container.DocumentPath = input.path ?? undefined
      container.DocumentType = normalizeDocumentType(input.documentType) ?? undefined
      await this.ensureDocumentTypeAllowed(container.DocumentType)
      container.DocumentData = null
      container.DocumentSize = 0
    } else {
      const resolvedContent = await resolveDocumentContent(input)
      if (!resolvedContent) {
        throw new Error('Document uploads require content or filePath.')
      }

      container.DocumentPath = input.path ?? resolvedContent.path ?? undefined
      container.DocumentType = resolvedContent.documentType ?? undefined
      await this.ensureDocumentTypeAllowed(container.DocumentType)
      container.DocumentData = resolvedContent.data
      container.DocumentSize = resolvedContent.size
      container.PublicKey = null as never
    }

    const created = await this.raw.containerManager.addContainer(
      container,
      input.organisationUnitId,
      null,
      null,
    )

    return toDocumentRecord(created)
  }

  async update(id: PsrGuid, input: DocumentUpdateInput) {
    const container = await this.raw.containerManager.getContainer(id)
    if (input.name != null) {
      container.Name = input.name
    }
    if (input.description != null) {
      container.Description = input.description
    }
    if (input.isLink != null) {
      container.IsDocumentLink = input.isLink
    }

    if (container.IsDocumentLink) {
      if (input.path != null) {
        container.DocumentPath = input.path
      }
      if (input.documentType != null) {
        container.DocumentType = normalizeDocumentType(input.documentType) ?? undefined
        await this.ensureDocumentTypeAllowed(container.DocumentType)
      }
      if (input.content != null || input.filePath) {
        throw new Error('Link documents cannot be updated with binary content.')
      }
    } else {
      if (input.path != null) {
        container.DocumentPath = input.path
      }
      const resolvedContent = await resolveDocumentContent(input)
      if (resolvedContent) {
        container.DocumentPath =
          input.path ?? resolvedContent.path ?? container.DocumentPath ?? undefined
        container.DocumentType = resolvedContent.documentType ?? container.DocumentType ?? undefined
        await this.ensureDocumentTypeAllowed(container.DocumentType)
        container.DocumentData = resolvedContent.data
        container.DocumentSize = resolvedContent.size
        container.PublicKey = null as never
      } else if (input.documentType != null) {
        container.DocumentType = normalizeDocumentType(input.documentType) ?? undefined
        await this.ensureDocumentTypeAllowed(container.DocumentType)
      }
    }

    const updated = await this.raw.containerManager.updateContainer(container, {} as never)
    return toDocumentRecord(updated)
  }

  async updateUpload(id: PsrGuid, input: DocumentUploadUpdateInput) {
    return this.update(id, {
      ...input,
      isLink: false,
    })
  }

  async updateLink(id: PsrGuid, input: DocumentLinkUpdateInput) {
    return this.update(id, {
      ...input,
      isLink: true,
    })
  }

  async delete(id: PsrGuid) {
    const container = await this.raw.containerManager.getContainer(id)
    await this.raw.containerManager.deleteContainer(container)
  }

  async history(id: PsrGuid) {
    const history = await this.raw.containerManager.getContainerHistoryList(
      PsrApiEnums.PsrContainerType.Document,
      id,
    )
    return asArray(history).map((entry) => toHistoryRecord(entry as unknown as PsrContainer))
  }
}
