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
      encryptedItemKeys = await this.prepareEncryptedItems(asArray(container.Items))
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

    container.DataTags = []
    for (const item of asArray(container.Items).filter(
      (candidate) => isEncryptedContainerItem(candidate) && !candidate.PlainTextValue,
    )) {
      item.PlainTextValue = ''
    }

    let encryptedItemKeys: EncryptedItemKey[] = []
    if (isPasswordContainer(container)) {
      encryptedItemKeys = await this.prepareEncryptedItems(asArray(container.Items))
    }

    const createdContainer = await this.serviceClient.addContainer(
      container,
      parentOrganisationUnitId,
    )
    if (isPasswordContainer(container)) {
      const keyUpdates = await this.createRightKeyBatchUpdates(
        asArray(createdContainer.Items),
        encryptedItemKeys,
      )
      await this.rightManager.batchUpdateRights(keyUpdates)
      await this.inheritanceManager.run(
        createdContainer as never,
        rightTemplates as never,
        async (dataId) => {
          const item = asArray(createdContainer.Items).find((candidate) => candidate.Id === dataId)
          if (!item) {
            return []
          }

          const keyEntry = encryptedItemKeys.find((candidate) => candidate.itemName === item.Name)
          if (!keyEntry?.privateKey) {
            return []
          }

          const rightKeys = await this.userKeyManager.encryptRightKeysAndReturn(
            item,
            keyEntry.privateKey,
          )
          return rightKeys.map((entry) => ({
            ItemType: runtimeEnums.PsrBatchRightItemType.UpdateLegitimateDataRightKey,
            DataId: entry.dataId,
            LegitimateId: entry.legitimateId,
            RightKey: entry.key,
          }))
        },
        parentOrganisationUnitId,
        templateGroupId,
        runtimeEnums.PsrEntityObjectType.EntityObjectTypePassword,
        createdContainer.BaseContainerId,
      )
    }

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
}
