import type {
  ContainerManager,
  OneTimePasswordManager,
  PasswordManager,
  PsrBatchRightItem,
  PsrBehaviours,
  PsrContainer,
  PsrContainerHistory,
  PsrContainerItem,
  PsrContainerListFilter,
  PsrContainerType,
  PsrCredentialCheck,
  PsrDataRightTemplate,
  PsrGuid,
} from '@kmuip/pws-types'
import {
  asArray,
  GUID_EMPTY,
  isEncryptedContainerItem,
  isPasswordContainer,
} from './data-helpers.js'
import { runtimeEnums } from './enums.js'

type ServiceClientLike = {
  getContainerListFilter(
    type: PsrContainerType,
    defaultFilter: boolean,
  ): Promise<PsrContainerListFilter>
  getContainerList(
    containerType: PsrContainerType,
    filter: PsrContainerListFilter,
    behaviours?: PsrBehaviours,
  ): Promise<PsrContainer[]>
  getContainerCount(
    containerType: PsrContainerType,
    filter: PsrContainerListFilter,
  ): Promise<number>
  getContainer(id: PsrGuid): Promise<PsrContainer>
  updateContainer(container: PsrContainer, behaviours: PsrBehaviours): Promise<PsrContainer>
  addContainer(
    container: PsrContainer,
    parentOrganisationUnitId: PsrGuid | null,
  ): Promise<PsrContainer>
  addContainerV2(
    container: unknown,
    parentOrganisationUnitId?: PsrGuid | null,
    rightInheritanceOptions?: unknown,
  ): Promise<PsrContainer>
  initContainerItem(containerItemType: number): Promise<PsrContainerItem>
  deleteContainer(container: PsrContainer): Promise<void>
  getContainerItemWithSecretValue(itemId: PsrGuid, reason: string): Promise<PsrContainerItem>
  getContainerItem(itemId: PsrGuid): Promise<PsrContainerItem>
  getContainerInvolvedOrganisationUnit(dataId: PsrGuid): Promise<PsrGuid[]>
  getContainerHistoryList(
    containerType: PsrContainerType,
    id: PsrGuid,
  ): Promise<PsrContainerHistory[]>
  cloneContainer(baseContainerId: PsrGuid): Promise<PsrContainer>
  initContainer(containerType: PsrContainerType): Promise<PsrContainer>
  getContainerBrowserSsoList(getContainersWithoutUrl: boolean): Promise<PsrContainer[]>
  SearchContainersBrowserSsoList(searchValue: string): Promise<PsrContainer[]>
  getCredentialCheck(containerId: PsrGuid): Promise<PsrCredentialCheck>
}

type TypedConstructors = {
  PsrContainer: new () => PsrContainer
  PsrContainerItem: new () => PsrContainerItem
}

type EncryptedItemKey = {
  itemName: string
  privateKey: string | Uint8Array | null
}

type RightInheritanceOptions = {
  RightInheritanceMode: number
  TemplateGroupId: PsrGuid | null
  RightTemplates: PsrDataRightTemplate[]
  Keys: Array<{
    EncryptedPrivateKey: string
    Identifier: string
  }>
  IncludeCurrentUser: boolean
}

type AddContainerV2ItemPayload = {
  [key: string]: unknown
}

type AddContainerV2ContainerPayload = {
  [key: string]: unknown
}

type InheritanceApplier = {
  run: (
    data: PsrContainer,
    rights: PsrDataRightTemplate[] | null,
    additionalBatchItemsFactory?: ((dataId: PsrGuid) => Promise<PsrBatchRightItem[]>) | null,
    targetId?: PsrGuid | null,
    templateGroupId?: PsrGuid | null,
    dataType?: number | null,
    hierarchyTargetId?: PsrGuid | null,
  ) => Promise<unknown>
}

type RightBatchUpdater = {
  batchUpdateRights(batchItems: PsrBatchRightItem[]): Promise<unknown>
}

type ItemKeyCryptography = {
  encryptDataRightKey(
    publicKey: string,
    key: string | Uint8Array | null,
  ): Promise<string | Uint8Array | null> | string | Uint8Array | null
  decryptContainerItem(item: PsrContainerItem, reason: string): Promise<string>
  encryptContainerItem(
    item: PsrContainerItem,
    plaintext: string,
  ): Promise<string | Uint8Array | null>
  encryptRightKeysAndReturn(
    item: Pick<PsrContainerItem, 'Id'>,
    privateKey: string | Uint8Array,
  ): Promise<Array<{ dataId: PsrGuid; legitimateId: PsrGuid; key: string }>>
}

type RightSaver = {
  saveRights(
    data: PsrContainerItem[],
    rights: unknown[],
    overwriteBrokenSeals: boolean,
    deleteUnchangedRights: boolean,
    useCanReadOwnRightsOptimization: boolean,
  ): Promise<unknown>
}

type CurrentUserAccess = {
  getCurrentUserPublicKey(): string | null
}

export class RuntimeContainerManager implements ContainerManager {
  constructor(
    private readonly serviceClient: ServiceClientLike,
    private readonly passwordManager: PasswordManager,
    private readonly inheritanceManager: InheritanceApplier,
    private readonly rightManager: RightBatchUpdater & {
      getLegitimateDataRights(
        dataId: PsrGuid,
        includeChildren: boolean,
        inherit: boolean,
      ): Promise<unknown[]>
    },
    private readonly userKeyManager: ItemKeyCryptography,
    private readonly currentUserAccess: CurrentUserAccess,
    private readonly genericRightManager: RightSaver,
    private readonly oneTimePasswordManager: OneTimePasswordManager,
    private readonly typeConstructors: TypedConstructors,
  ) {}

  getContainerListFilter(type: PsrContainerType, defaultFilter: boolean) {
    return this.serviceClient.getContainerListFilter(type, defaultFilter)
  }

  getContainerList(
    containerType: PsrContainerType,
    containerListFilter: PsrContainerListFilter,
    behaviours?: PsrBehaviours,
  ) {
    return this.serviceClient.getContainerList(containerType, containerListFilter, behaviours)
  }

  getContainerCount(containerType: PsrContainerType, containerListFilter: PsrContainerListFilter) {
    return this.serviceClient.getContainerCount(containerType, containerListFilter)
  }

  getContainer(containerId: PsrGuid) {
    return this.serviceClient.getContainer(containerId)
  }

  async updateContainer(container: PsrContainer, behaviours: PsrBehaviours) {
    container.DataTags = []
    container.TimeStampUtc = new Date().toUTCString() as never

    const newItems = asArray(container.Items).filter((item) => !item.Id || item.Id === GUID_EMPTY)
    newItems.forEach((item) => {
      item.DataStates = runtimeEnums.PsrDataStates.StateActive as never
    })

    let encryptedItemKeys: EncryptedItemKey[] = []
    if (isPasswordContainer(container)) {
      encryptedItemKeys = await this.prepareEncryptedItemsForCreate(asArray(container.Items))
    }

    const updatedContainer = await this.serviceClient.updateContainer(container, behaviours)
    const createdItems = asArray(updatedContainer.Items).filter((candidate) =>
      newItems.some((item) => item.Name === candidate.Name),
    )

    for (const item of asArray(container.Items)) {
      const matchingUpdatedItem = asArray(updatedContainer.Items).find(
        (candidate) => candidate.Name === item.Name,
      )
      if (matchingUpdatedItem) {
        item.Id = matchingUpdatedItem.Id
      }
    }

    if (newItems.length > 0) {
      newItems.forEach((item) => {
        const matchingUpdatedItem = asArray(updatedContainer.Items).find(
          (candidate) => candidate.Name === item.Name,
        )
        if (matchingUpdatedItem) {
          item.Id = matchingUpdatedItem.Id
        }
      })

      const currentRights = asArray(
        await this.rightManager.getLegitimateDataRights(container.Id, false, false),
      )
      await this.genericRightManager.saveRights(
        createdItems as never,
        currentRights as never,
        false,
        false,
        false,
      )
    }

    if (isPasswordContainer(container)) {
      const keyUpdates = await this.createRightKeyBatchUpdates(createdItems, encryptedItemKeys)
      await this.rightManager.batchUpdateRights(keyUpdates)
    }

    return updatedContainer
  }

  async addContainer(
    container: PsrContainer,
    parentOrganisationUnitId: PsrGuid | null,
    rightTemplates: PsrDataRightTemplate[] | null,
    templateGroupId: PsrGuid | null,
  ) {
    if (
      Number(container.ContainerType) === runtimeEnums.PsrContainerType.Password &&
      !parentOrganisationUnitId
    ) {
      throw new Error('Containers of type password must have a parent organisation unit.')
    }

    if (!isPasswordContainer(container)) {
      container.DataTags = []
    }

    let encryptedItemKeys: EncryptedItemKey[] = []
    if (isPasswordContainer(container)) {
      encryptedItemKeys = await this.prepareEncryptedItems(asArray(container.Items))
    }

    const createdContainer = isPasswordContainer(container)
      ? await this.serviceClient.addContainerV2(
          this.serializeContainerForAddContainerV2(container),
          parentOrganisationUnitId,
          await this.createRightInheritanceOptions(
            encryptedItemKeys,
            rightTemplates,
            templateGroupId,
          ),
        )
      : await this.serviceClient.addContainer(container, parentOrganisationUnitId)

    return createdContainer
  }

  initContainerItem(containerItemType: number) {
    return this.serviceClient.initContainerItem(containerItemType)
  }

  deleteContainer(container: PsrContainer) {
    return this.serviceClient.deleteContainer(container)
  }

  getContainerItemWithSecretValue(itemId: PsrGuid, reason: string) {
    return this.serviceClient.getContainerItemWithSecretValue(itemId, reason)
  }

  getContainerItem(itemId: PsrGuid) {
    return this.serviceClient.getContainerItem(itemId)
  }

  createContainerFromBaseContainer(
    baseContainer: PsrContainer,
    newContainerType: PsrContainerType,
  ) {
    const container = new this.typeConstructors.PsrContainer()
    container.Items = []
    ;(container as Record<string, unknown>).ContainerType = newContainerType
    container.BaseContainerId = baseContainer.Id

    for (const item of asArray(baseContainer.Items)) {
      const clone = new this.typeConstructors.PsrContainerItem() as Record<string, any>
      const sourceItem = item as Record<string, any>
      clone.Name = item.Name
      clone.Description = item.Description
      clone.ContainerItemDescHighlightType = item.ContainerItemDescHighlightType
      clone.AllowedChars = item.AllowedChars
      clone.AllowOnlyGeneratedPasswords = item.AllowOnlyGeneratedPasswords
      clone.BaseContainerItemId = item.Id
      clone.ChangedOrganisationUnitId = item.ChangedOrganisationUnitId
      clone.CheckPolicy = item.CheckPolicy
      clone.ContainerId = item.ContainerId
      clone.ContainerItemType = item.ContainerItemType
      clone.DataStates = item.DataStates
      clone.Id = GUID_EMPTY
      clone.Mandatory = sourceItem.Mandatory
      clone.MaxLength = sourceItem.MaxLength
      clone.MinLength = sourceItem.MinLength
      clone.PolicyId = item.PolicyId
      clone.Position = item.Position
      clone.PublicKey = item.PublicKey
      clone.Regex = item.Regex
      clone.TimeStampUtc = item.TimeStampUtc
      clone.Quality = item.Quality
      clone.SecretValueRequiredReason = item.SecretValueRequiredReason
      clone.NoPermission = sourceItem.NoPermission
      clone.Value = item.Value
      clone.ValueBool = item.ValueBool
      clone.ValueDateUtc = item.ValueDateUtc
      clone.ValueDecimal = item.ValueDecimal
      clone.ValueInt = item.ValueInt
      if (item.ListItems) {
        clone.ListItems = [...item.ListItems]
      }
      if (isEncryptedContainerItem(clone)) {
        clone.Value = null as never
      }

      container.Items.push(clone as unknown as PsrContainerItem)
    }

    return container
  }

  decryptContainerItem(item: PsrContainerItem, reason: string) {
    return this.userKeyManager.decryptContainerItem(item, reason)
  }

  encryptContainerItem(item: PsrContainerItem, plaintext: string) {
    return this.userKeyManager.encryptContainerItem(item, plaintext) as never
  }

  getContainerInvolvedOrganisationUnit(dataId: PsrGuid) {
    return this.serviceClient.getContainerInvolvedOrganisationUnit(dataId)
  }

  getContainerHistoryList(containerType: PsrContainerType, id: PsrGuid) {
    return this.serviceClient.getContainerHistoryList(containerType, id)
  }

  getContainerBrowserSsoList(getContainersWithoutUrl: boolean) {
    return this.serviceClient.getContainerBrowserSsoList(getContainersWithoutUrl)
  }

  SearchContainersBrowserSsoList(searchValue: string) {
    return this.serviceClient.SearchContainersBrowserSsoList(searchValue)
  }

  cloneContainer(baseContainerId: PsrGuid) {
    return this.serviceClient.cloneContainer(baseContainerId)
  }

  initContainer(containerType: PsrContainerType) {
    return this.serviceClient.initContainer(containerType)
  }

  getCredentialCheck(containerId: PsrGuid) {
    return this.serviceClient.getCredentialCheck(containerId)
  }

  private async prepareEncryptedItems(items: PsrContainerItem[]) {
    items.forEach((item, index) => {
      item.Position = index
    })

    const encryptedItems = items.filter(
      (item) => isEncryptedContainerItem(item) && item.PlainTextValue != null,
    )
    const keyEntries: EncryptedItemKey[] = encryptedItems.map((item) => ({
      itemName: item.Name ?? '',
      privateKey: null,
    }))

    for (const item of encryptedItems) {
      this.validateOtpItem(item)
      item.Quality = this.passwordManager.getPasswordStrength(item.PlainTextValue ?? '')
      const privateKey = await this.userKeyManager.encryptContainerItem(
        item,
        item.PlainTextValue ?? '',
      )
      const entry = keyEntries.find((candidate) => candidate.itemName === item.Name)
      if (entry) {
        entry.privateKey = privateKey
      }
    }

    return keyEntries
  }

  private async prepareEncryptedItemsForCreate(items: PsrContainerItem[]) {
    items.forEach((item, index) => {
      item.Position = index
    })

    const encryptedItems = items.filter((item) => isEncryptedContainerItem(item))
    const keyEntries: EncryptedItemKey[] = encryptedItems.map((item) => ({
      itemName: item.Name ?? '',
      privateKey: null,
    }))

    for (const item of encryptedItems) {
      const plaintext = item.PlainTextValue ?? ''
      item.PlainTextValue = plaintext
      this.validateOtpItem(item)
      item.Quality = this.passwordManager.getPasswordStrength(plaintext)
      const privateKey = await this.userKeyManager.encryptContainerItem(item, plaintext)
      const entry = keyEntries.find((candidate) => candidate.itemName === item.Name)
      if (entry) {
        entry.privateKey = privateKey
      }
    }

    return keyEntries
  }

  private validateOtpItem(item: PsrContainerItem) {
    if (
      item.ContainerItemType !== runtimeEnums.PsrContainerItemType.ContainerItemOtp ||
      !item.PlainTextValue
    ) {
      return
    }

    try {
      this.oneTimePasswordManager.generateGoogleAuthenticatorOtp(item.PlainTextValue)
    } catch {
      throw new Error(String(runtimeEnums.PsrApiExceptionCode.ContainerItemOtpMustBeBase32Encoded))
    }
  }

  private async createRightKeyBatchUpdates(
    items: PsrContainerItem[],
    encryptedItemKeys: EncryptedItemKey[],
  ) {
    const batchItems: PsrBatchRightItem[] = []
    const updates = items
      .filter((item) => isEncryptedContainerItem(item))
      .map(async (item) => {
        const keyEntry = encryptedItemKeys.find(
          (candidate) => candidate.itemName === item.Name && candidate.privateKey,
        )
        if (!keyEntry?.privateKey) {
          return
        }

        const rightKeys = await this.userKeyManager.encryptRightKeysAndReturn(
          item,
          keyEntry.privateKey,
        )
        rightKeys.forEach((entry) => {
          batchItems.push({
            ItemType: runtimeEnums.PsrBatchRightItemType.UpdateLegitimateDataRightKey,
            DataId: entry.dataId,
            LegitimateId: entry.legitimateId,
            RightKey: entry.key,
          })
        })
      })

    await Promise.all(updates)
    return batchItems
  }

  private async createRightInheritanceOptions(
    encryptedItemKeys: EncryptedItemKey[],
    rightTemplates: PsrDataRightTemplate[] | null,
    templateGroupId: PsrGuid | null,
  ): Promise<RightInheritanceOptions> {
    const currentUserPublicKey = this.currentUserAccess.getCurrentUserPublicKey()
    if (!currentUserPublicKey) {
      throw new Error('Current user public key is not available.')
    }

    const keys = await Promise.all(
      encryptedItemKeys
        .filter(
          (entry): entry is EncryptedItemKey & { privateKey: string | Uint8Array } =>
            entry.privateKey != null,
        )
        .map(async (entry) => ({
          EncryptedPrivateKey: this.toBase64(
            (await this.userKeyManager.encryptDataRightKey(
              currentUserPublicKey,
              entry.privateKey,
            )) ?? '',
          ),
          Identifier: entry.itemName,
        })),
    )

    return {
      RightInheritanceMode: 1,
      TemplateGroupId: templateGroupId ?? null,
      RightTemplates: asArray(rightTemplates),
      Keys: keys,
      IncludeCurrentUser: true,
    }
  }

  private toBase64(value: string | Uint8Array) {
    return typeof value === 'string'
      ? Buffer.from(value, 'binary').toString('base64')
      : Buffer.from(value).toString('base64')
  }

  private serializeContainerForAddContainerV2(
    container: PsrContainer,
  ): AddContainerV2ContainerPayload {
    const baseContainerName =
      (container.BaseContainer as { Name?: string | null } | null | undefined)?.Name ??
      (container.Info as { BaseContainerName?: string | null } | null | undefined)
        ?.BaseContainerName ??
      null

    return {
      $type:
        (container as Record<string, unknown>).$type ??
        'PsrDataLayer.Structure.MtoContainer, PsrDataLayer',
      IsDocumentLink: Boolean((container as Record<string, unknown>).IsDocumentLink),
      Id: container.Id,
      TimeStampUtc: container.TimeStampUtc,
      ValidTimeStampUtc: container.ValidTimeStampUtc ?? null,
      ChangedOrganisationUnitId: container.ChangedOrganisationUnitId ?? null,
      PublicKey: container.PublicKey ?? null,
      DataStates: container.DataStates,
      DataTags: asArray(
        ((container as Record<string, unknown>).DataTags as
          | Iterable<unknown>
          | unknown[]
          | null
          | undefined) ?? [],
      ),
      IsFavorite: Boolean((container as Record<string, unknown>).IsFavorite),
      HasTrigger: Boolean((container as Record<string, unknown>).HasTrigger),
      HasTriggerAlert: Boolean((container as Record<string, unknown>).HasTriggerAlert),
      Name: container.Name ?? null,
      Description: container.Description ?? null,
      BaseContainerId: container.BaseContainerId ?? null,
      EncryptionKeyType: (container as Record<string, unknown>).EncryptionKeyType ?? null,
      Items: asArray(container.Items).map((item) =>
        this.serializeContainerItemForAddContainerV2(item),
      ),
      DocumentDataId: (container as Record<string, unknown>).DocumentDataId ?? null,
      DocumentPath: (container as Record<string, unknown>).DocumentPath ?? null,
      DocumentType: (container as Record<string, unknown>).DocumentType ?? null,
      DocumentSize: Number((container as Record<string, unknown>).DocumentSize ?? 0),
      DocumentMeta: (container as Record<string, unknown>).DocumentMeta ?? null,
      DocumentParams: (container as Record<string, unknown>).DocumentParams ?? null,
      DocumentCacheDeleteTime: Number(
        (container as Record<string, unknown>).DocumentCacheDeleteTime ?? 0,
      ),
      ContainerType: container.ContainerType,
      ContainerInfoConfig: (container as Record<string, unknown>).ContainerInfoConfig ?? null,
      Info: baseContainerName ? { BaseContainerName: baseContainerName } : null,
      ContainerQuality: Number((container as Record<string, unknown>).ContainerQuality ?? 0),
    }
  }

  private serializeContainerItemForAddContainerV2(
    item: PsrContainerItem,
  ): AddContainerV2ItemPayload {
    const publicKey =
      typeof item.PublicKey === 'string' && item.PublicKey.length === 0
        ? null
        : (item.PublicKey ?? null)

    return {
      Name: item.Name ?? null,
      Description: item.Description ?? null,
      ContainerItemDescHighlightType: item.ContainerItemDescHighlightType,
      AllowedChars: (item as Record<string, unknown>).AllowedChars ?? null,
      AllowOnlyGeneratedPasswords: Boolean(
        (item as Record<string, unknown>).AllowOnlyGeneratedPasswords,
      ),
      BaseContainerItemId: item.BaseContainerItemId ?? null,
      ChangedOrganisationUnitId: item.ChangedOrganisationUnitId ?? null,
      CheckPolicy: Boolean((item as Record<string, unknown>).CheckPolicy),
      ContainerId: item.ContainerId,
      ContainerItemType: item.ContainerItemType,
      DataStates: item.DataStates,
      Id: item.Id,
      Mandatory: Boolean((item as Record<string, unknown>).Mandatory),
      MaxLength: Number((item as Record<string, unknown>).MaxLength ?? 0),
      MinLength: Number((item as Record<string, unknown>).MinLength ?? 0),
      PolicyId: item.PolicyId ?? null,
      Position: item.Position,
      PublicKey: publicKey,
      Regex: (item as Record<string, unknown>).Regex ?? null,
      TimeStampUtc: item.TimeStampUtc,
      Quality: Number((item as Record<string, unknown>).Quality ?? 0),
      SecretValueRequiredReason:
        (item as Record<string, unknown>).SecretValueRequiredReason ?? false,
      NoPermission: Boolean((item as Record<string, unknown>).NoPermission),
      Value: item.Value ?? null,
      ValueBool: (item as Record<string, unknown>).ValueBool ?? null,
      ValueDateUtc: item.ValueDateUtc ?? null,
      ValueDecimal: (item as Record<string, unknown>).ValueDecimal ?? null,
      ValueInt: item.ValueInt ?? null,
      ValueMemo: item.ValueMemo ?? null,
      EncryptionKeyType: (item as Record<string, unknown>).EncryptionKeyType ?? null,
    }
  }
}
