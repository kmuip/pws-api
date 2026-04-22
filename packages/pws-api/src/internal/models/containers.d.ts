import { RuntimeDataModel } from './base.js';
export declare class RuntimePsrContainerInfo {
    BaseContainerName: string | null;
    ContainerName: string | null;
    ContainerInfo: string | null;
    ContainerInfoFields: unknown[] | null;
}
export declare class RuntimePsrContainer extends RuntimeDataModel {
    Name: string | null;
    Description: string | null;
    BaseContainerId: string | null;
    BaseContainer: unknown;
    Items: Array<Record<string, any>> | null;
    DocumentDataId: string | null;
    DocumentData: unknown;
    DocumentPath: string | null;
    DocumentType: string | null;
    DocumentSize: number;
    DocumentMeta: unknown;
    DocumentParams: unknown;
    DocumentCacheDeleteTime: number;
    ContainerType: number | null;
    ContainerInfoConfig: unknown;
    Info: unknown;
    ContainerQuality: number;
    IsDocumentLink: boolean;
    DataType(): 1 | 2 | 3;
    DataName(): any;
}
export declare class RuntimePsrContainerItem extends RuntimeDataModel {
    Name: string | null;
    Description: string | null;
    ContainerItemDescHighlightType: number;
    Value: string | null;
    ValueDateUtc: Date | string | null;
    ValueBool: boolean | null;
    ValueInt: number | null;
    ValueDecimal: number | null;
    ValueHash: string | null;
    Mandatory: boolean;
    Position: number;
    MinLength: number;
    MaxLength: number;
    AllowedChars: string | null;
    Regex: string | null;
    Quality: number;
    AllowOnlyGeneratedPasswords: boolean;
    SecretValueRequiredReason: string | boolean | null;
    Policy: unknown;
    PolicyId: string | null;
    ContainerId: string;
    Container: unknown;
    BaseContainerItemId: string | null;
    BaseContainerItem: unknown;
    ContainerItemType: number;
    CheckPolicy: boolean;
    ListItems: unknown[] | null;
    NoPermission: boolean;
    PlainTextValue: string | null;
    IsPasswordItem(): boolean;
    IsEncrypted(): boolean;
    DataType(): 10;
    DataName(): string | null;
}
