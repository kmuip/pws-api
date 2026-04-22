import { runtimeEnums } from '../enums.js'
import { RuntimeDataModel } from './base.js'

export class RuntimePsrActiveDirectoryProfile extends RuntimeDataModel {
  Name: string | null = null
  Description: string | null = null
  MasterKeyModus = false
  ServerKeyId: string | null = null
  ServerKey: unknown = null
  MasterKeyUserId: string | null = null
  MasterKeyUser: unknown = null
  UserDomain: string | null = null
  AdditionalUserDomains: string | null = null
  UserName: string | null = null
  UserPassword: string | null = null
  CnFilter: string | null = null
  UseSsl = false
  AuthenticationTypes: number = runtimeEnums.PsrActiveDirectoryAuthenticationTypes.None
  DirectSearch = false
  LastConfig: unknown = null
  LastRunUtc: Date | string | null = null

  override DataType() {
    return runtimeEnums.PsrEntityObjectType.EntityObjectTypeActiveDirectoryProfile
  }

  override DataName() {
    return this.Name
  }
}

export class RuntimePsrRole extends RuntimeDataModel {
  RoleName: string | null = null
  RoleDescription: string | null = null
  ActiveDirectoryDomain: string | null = null
  ActiveDirectoryObjektId: string | null = null
  ActiveDirectoryProfileId: string | null = null
  ActiveDirectorySync = false

  override DataType() {
    return runtimeEnums.PsrEntityObjectType.EntityObjectTypeRole
  }

  override DataName() {
    return this.RoleName
  }
}

class RuntimeOrganisationUnitBase extends RuntimeDataModel {
  Image: string | null = null
  ActiveDirectoryObjektId: string | null = null
  ActiveDirectoryProfileId: string | null = null
  ActiveDirectorySync = false
}

export class RuntimePsrOrganisationUnitUser extends RuntimeOrganisationUnitBase {
  FirstName: string | null = null
  LastName: string | null = null
  UserName: string | null = null
  Description: string | null = null
  Language: string | null = null
  Office: string | null = null
  Phone: string | null = null
  Mobilephone: string | null = null
  Mail: string | null = null
  ZipCode: string | null = null
  Street: string | null = null
  Place: string | null = null
  Province: string | null = null
  Country: string | null = null
  ActiveDirectoryDomain: string | null = null
  HasToChangePasswordOnNextLogin = false
  RestrictiveUser = false
  LastLoginUtc: Date | string | null = null
  LastPasswordChangeUtc: Date | string | null = null

  override DataType() {
    return runtimeEnums.PsrEntityObjectType.EntityObjectTypeUser
  }

  override DataName() {
    const loginName = this.ActiveDirectoryDomain
      ? `${this.ActiveDirectoryDomain}\\${this.UserName}`
      : this.UserName
    let fullName = ''
    if (this.LastName) {
      fullName += this.LastName
    }
    if (this.FirstName) {
      fullName += `, ${this.FirstName}`
    }
    return fullName ? `${fullName} (${loginName})` : loginName
  }

  IsDeactivated() {
    return !!this.ValidTimeStampUtc && new Date(this.ValidTimeStampUtc).getTime() < Date.now()
  }
}

export class RuntimePsrOrganisationUnitGroup extends RuntimeOrganisationUnitBase {
  GroupName: string | null = null
  Description: string | null = null
  ActiveDirectoryDomain: string | null = null

  override DataType() {
    return runtimeEnums.PsrEntityObjectType.EntityObjectTypeGroup
  }

  override DataName() {
    return this.GroupName
  }
}
