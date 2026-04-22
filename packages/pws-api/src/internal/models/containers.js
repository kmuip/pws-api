import { runtimeEnums } from '../enums.js';
import { RuntimeDataModel, GUID_EMPTY } from './base.js';
export class RuntimePsrContainerInfo {
    BaseContainerName = null;
    ContainerName = null;
    ContainerInfo = null;
    ContainerInfoFields = null;
}
export class RuntimePsrContainer extends RuntimeDataModel {
    Name = null;
    Description = null;
    BaseContainerId = null;
    BaseContainer = null;
    Items = null;
    DocumentDataId = null;
    DocumentData = null;
    DocumentPath = null;
    DocumentType = null;
    DocumentSize = 0;
    DocumentMeta = null;
    DocumentParams = null;
    DocumentCacheDeleteTime = 0;
    ContainerType = null;
    ContainerInfoConfig = null;
    Info = null;
    ContainerQuality = 0;
    IsDocumentLink = false;
    DataType() {
        if (this.ContainerType === runtimeEnums.PsrContainerType.Form) {
            return runtimeEnums.PsrEntityObjectType.EntityObjectTypeFormular;
        }
        if (this.ContainerType === runtimeEnums.PsrContainerType.Document) {
            return runtimeEnums.PsrEntityObjectType.EntityObjectTypeDocument;
        }
        return runtimeEnums.PsrEntityObjectType.EntityObjectTypePassword;
    }
    DataName() {
        switch (this.ContainerType) {
            case runtimeEnums.PsrContainerType.Document:
            case runtimeEnums.PsrContainerType.Form:
                return this.Name;
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
                ];
                if (Array.isArray(this.Items)) {
                    let candidate = this.Items.find((item) => item?.Name === 'Name' &&
                        preferredTypes.some((type) => type === item.ContainerItemType));
                    candidate =
                        candidate ??
                            this.Items.find((item) => item?.ContainerItemType === runtimeEnums.PsrContainerItemType.ContainerItemText);
                    return candidate?.Value ?? '';
                }
                return '';
            }
            default:
                return this.Name ?? '';
        }
    }
}
export class RuntimePsrContainerItem extends RuntimeDataModel {
    Name = null;
    Description = null;
    ContainerItemDescHighlightType = runtimeEnums.PsrContainerItemDescHighlight.ContainerItemDescHighlightNone;
    Value = null;
    ValueDateUtc = null;
    ValueBool = null;
    ValueInt = null;
    ValueDecimal = null;
    ValueHash = null;
    Mandatory = false;
    Position = 0;
    MinLength = 0;
    MaxLength = 0;
    AllowedChars = null;
    Regex = null;
    Quality = 0;
    AllowOnlyGeneratedPasswords = false;
    SecretValueRequiredReason = false;
    Policy = null;
    PolicyId = null;
    ContainerId = GUID_EMPTY;
    Container = null;
    BaseContainerItemId = null;
    BaseContainerItem = null;
    ContainerItemType = runtimeEnums.PsrContainerItemType.ContainerItemText;
    CheckPolicy = false;
    ListItems = null;
    NoPermission = false;
    PlainTextValue = null;
    IsPasswordItem() {
        return (this.ContainerItemType === runtimeEnums.PsrContainerItemType.ContainerItemPassword ||
            this.ContainerItemType === runtimeEnums.PsrContainerItemType.ContainerItemPasswordMemo);
    }
    IsEncrypted() {
        return (this.ContainerItemType === runtimeEnums.PsrContainerItemType.ContainerItemPassword ||
            this.ContainerItemType === runtimeEnums.PsrContainerItemType.ContainerItemPasswordMemo ||
            this.ContainerItemType === runtimeEnums.PsrContainerItemType.ContainerItemOtp);
    }
    DataType() {
        return runtimeEnums.PsrEntityObjectType.EntityObjectTypeContainerItem;
    }
    DataName() {
        return this.Name;
    }
}
