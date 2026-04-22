import { runtimeEnums } from '../enums.js'
import { RuntimeDataModel, GUID_EMPTY } from './base.js'

export class RuntimePsrContainerInfo {
  BaseContainerName: string | null = null
  ContainerName: string | null = null
  ContainerInfo: string | null = null
  ContainerInfoFields: unknown[] | null = null
}

export class RuntimePsrContainer extends RuntimeDataModel {
  Name: string | null = null
  Description: string | null = null
  BaseContainerId: string | null = null
  BaseContainer: unknown = null
  Items: Array<Record<string, any>> | null = null
  DocumentDataId: string | null = null
  DocumentData: unknown = null
  DocumentPath: string | null = null
  DocumentType: string | null = null
  DocumentSize = 0
  DocumentMeta: unknown = null
  DocumentParams: unknown = null
  DocumentCacheDeleteTime = 0
  ContainerType: number | null = null
  ContainerInfoConfig: unknown = null
  Info: unknown = null
  ContainerQuality = 0
  IsDocumentLink = false

  override DataType() {
    if (this.ContainerType === runtimeEnums.PsrContainerType.Form) {
      return runtimeEnums.PsrEntityObjectType.EntityObjectTypeFormular
    }

    if (this.ContainerType === runtimeEnums.PsrContainerType.Document) {
      return runtimeEnums.PsrEntityObjectType.EntityObjectTypeDocument
    }

    return runtimeEnums.PsrEntityObjectType.EntityObjectTypePassword
  }

  override DataName() {
    switch (this.ContainerType) {
      case runtimeEnums.PsrContainerType.Document:
      case runtimeEnums.PsrContainerType.Form:
        return this.Name
      case runtimeEnums.PsrContainerType.Password: {
        const preferredTypes = [
          runtimeEnums.PsrContainerItemType.ContainerItemText,
          runtimeEnums.PsrContainerItemType.ContainerItemUrl,
          runtimeEnums.PsrContainerItemType.ContainerItemEmail,
          runtimeEnums.PsrContainerItemType.ContainerItemPhone,
          runtimeEnums.PsrContainerItemType.ContainerItemMemo,
          runtimeEnums.PsrContainerItemType.ContainerItemUserName,
          runtimeEnums.PsrContainerItemType.ContainerItemIp,
          runtimeEnums.PsrContainerItemType.ContainerItemHostName,
        ]

        if (Array.isArray(this.Items)) {
          let candidate = this.Items.find(
            (item: Record<string, any>) =>
              item?.Name === 'Name' &&
              preferredTypes.some((type) => type === item.ContainerItemType),
          )
          candidate =
            candidate ??
            this.Items.find(
              (item: Record<string, any>) =>
                item?.ContainerItemType === runtimeEnums.PsrContainerItemType.ContainerItemText,
            )
          return candidate?.Value ?? ''
        }

        return ''
      }
      default:
        return this.Name ?? ''
    }
  }
}

export class RuntimePsrContainerItem extends RuntimeDataModel {
  Name: string | null = null
  Description: string | null = null
  ContainerItemDescHighlightType: number =
    runtimeEnums.PsrContainerItemDescHighlight.ContainerItemDescHighlightNone
  Value: string | null = null
  ValueDateUtc: Date | string | null = null
  ValueBool: boolean | null = null
  ValueInt: number | null = null
  ValueDecimal: number | null = null
  ValueHash: string | null = null
  Mandatory = false
  Position = 0
  MinLength = 0
  MaxLength = 0
  AllowedChars: string | null = null
  Regex: string | null = null
  Quality = 0
  AllowOnlyGeneratedPasswords = false
  SecretValueRequiredReason: string | boolean | null = false
  Policy: unknown = null
  PolicyId: string | null = null
  ContainerId: string = GUID_EMPTY
  Container: unknown = null
  BaseContainerItemId: string | null = null
  BaseContainerItem: unknown = null
  ContainerItemType: number = runtimeEnums.PsrContainerItemType.ContainerItemText
  CheckPolicy = false
  ListItems: unknown[] | null = null
  NoPermission = false
  PlainTextValue: string | null = null

  IsPasswordItem() {
    return (
      this.ContainerItemType === runtimeEnums.PsrContainerItemType.ContainerItemPassword ||
      this.ContainerItemType === runtimeEnums.PsrContainerItemType.ContainerItemPasswordMemo
    )
  }

  IsEncrypted() {
    return (
      this.ContainerItemType === runtimeEnums.PsrContainerItemType.ContainerItemPassword ||
      this.ContainerItemType === runtimeEnums.PsrContainerItemType.ContainerItemPasswordMemo ||
      this.ContainerItemType === runtimeEnums.PsrContainerItemType.ContainerItemOtp
    )
  }

  override DataType() {
    return runtimeEnums.PsrEntityObjectType.EntityObjectTypeContainerItem
  }

  override DataName() {
    return this.Name
  }
}
