import type { PsrGuid } from '../base'
import type { PsrMultiFactorAuthType } from '../enum-constants'
import type { PsrMultiFactorAuthenticationField } from './PsrMultiFactorAuthenticationField'

export type PsrMultiFactorAuthenticationRequest = {
  AuthenticatorType: PsrMultiFactorAuthType
  DataToSign: string
  DisplayName: string
  Id: PsrGuid
  Mandatory: boolean
  RequiredFields: PsrMultiFactorAuthenticationField[]
}
