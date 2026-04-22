import { RuntimeDataModel } from './base.js';
export declare class RuntimePsrActiveDirectoryProfile extends RuntimeDataModel {
    Name: string | null;
    Description: string | null;
    MasterKeyModus: boolean;
    ServerKeyId: string | null;
    ServerKey: unknown;
    MasterKeyUserId: string | null;
    MasterKeyUser: unknown;
    UserDomain: string | null;
    AdditionalUserDomains: string | null;
    UserName: string | null;
    UserPassword: string | null;
    CnFilter: string | null;
    UseSsl: boolean;
    AuthenticationTypes: number;
    DirectSearch: boolean;
    LastConfig: unknown;
    LastRunUtc: Date | string | null;
    DataType(): 11;
    DataName(): string | null;
}
export declare class RuntimePsrRole extends RuntimeDataModel {
    RoleName: string | null;
    RoleDescription: string | null;
    ActiveDirectoryDomain: string | null;
    ActiveDirectoryObjektId: string | null;
    ActiveDirectoryProfileId: string | null;
    ActiveDirectorySync: boolean;
    DataType(): 4;
    DataName(): string | null;
}
declare class RuntimeOrganisationUnitBase extends RuntimeDataModel {
    Image: string | null;
    ActiveDirectoryObjektId: string | null;
    ActiveDirectoryProfileId: string | null;
    ActiveDirectorySync: boolean;
}
export declare class RuntimePsrOrganisationUnitUser extends RuntimeOrganisationUnitBase {
    FirstName: string | null;
    LastName: string | null;
    UserName: string | null;
    Description: string | null;
    Language: string | null;
    Office: string | null;
    Phone: string | null;
    Mobilephone: string | null;
    Mail: string | null;
    ZipCode: string | null;
    Street: string | null;
    Place: string | null;
    Province: string | null;
    Country: string | null;
    ActiveDirectoryDomain: string | null;
    HasToChangePasswordOnNextLogin: boolean;
    RestrictiveUser: boolean;
    LastLoginUtc: Date | string | null;
    LastPasswordChangeUtc: Date | string | null;
    DataType(): 5;
    DataName(): string | null;
    IsDeactivated(): boolean;
}
export declare class RuntimePsrOrganisationUnitGroup extends RuntimeOrganisationUnitBase {
    GroupName: string | null;
    Description: string | null;
    ActiveDirectoryDomain: string | null;
    DataType(): 6;
    DataName(): string | null;
}
export {};
