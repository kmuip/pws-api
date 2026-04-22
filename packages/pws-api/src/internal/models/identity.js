import { runtimeEnums } from '../enums.js';
import { RuntimeDataModel } from './base.js';
export class RuntimePsrActiveDirectoryProfile extends RuntimeDataModel {
    Name = null;
    Description = null;
    MasterKeyModus = false;
    ServerKeyId = null;
    ServerKey = null;
    MasterKeyUserId = null;
    MasterKeyUser = null;
    UserDomain = null;
    AdditionalUserDomains = null;
    UserName = null;
    UserPassword = null;
    CnFilter = null;
    UseSsl = false;
    AuthenticationTypes = runtimeEnums.PsrActiveDirectoryAuthenticationTypes.None;
    DirectSearch = false;
    LastConfig = null;
    LastRunUtc = null;
    DataType() {
        return runtimeEnums.PsrEntityObjectType.EntityObjectTypeActiveDirectoryProfile;
    }
    DataName() {
        return this.Name;
    }
}
export class RuntimePsrRole extends RuntimeDataModel {
    RoleName = null;
    RoleDescription = null;
    ActiveDirectoryDomain = null;
    ActiveDirectoryObjektId = null;
    ActiveDirectoryProfileId = null;
    ActiveDirectorySync = false;
    DataType() {
        return runtimeEnums.PsrEntityObjectType.EntityObjectTypeRole;
    }
    DataName() {
        return this.RoleName;
    }
}
class RuntimeOrganisationUnitBase extends RuntimeDataModel {
    Image = null;
    ActiveDirectoryObjektId = null;
    ActiveDirectoryProfileId = null;
    ActiveDirectorySync = false;
}
export class RuntimePsrOrganisationUnitUser extends RuntimeOrganisationUnitBase {
    FirstName = null;
    LastName = null;
    UserName = null;
    Description = null;
    Language = null;
    Office = null;
    Phone = null;
    Mobilephone = null;
    Mail = null;
    ZipCode = null;
    Street = null;
    Place = null;
    Province = null;
    Country = null;
    ActiveDirectoryDomain = null;
    HasToChangePasswordOnNextLogin = false;
    RestrictiveUser = false;
    LastLoginUtc = null;
    LastPasswordChangeUtc = null;
    DataType() {
        return runtimeEnums.PsrEntityObjectType.EntityObjectTypeUser;
    }
    DataName() {
        const loginName = this.ActiveDirectoryDomain
            ? `${this.ActiveDirectoryDomain}\\${this.UserName}`
            : this.UserName;
        let fullName = '';
        if (this.LastName) {
            fullName += this.LastName;
        }
        if (this.FirstName) {
            fullName += `, ${this.FirstName}`;
        }
        return fullName ? `${fullName} (${loginName})` : loginName;
    }
    IsDeactivated() {
        return !!this.ValidTimeStampUtc && new Date(this.ValidTimeStampUtc).getTime() < Date.now();
    }
}
export class RuntimePsrOrganisationUnitGroup extends RuntimeOrganisationUnitBase {
    GroupName = null;
    Description = null;
    ActiveDirectoryDomain = null;
    DataType() {
        return runtimeEnums.PsrEntityObjectType.EntityObjectTypeGroup;
    }
    DataName() {
        return this.GroupName;
    }
}
