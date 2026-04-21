import type { PsrDateIsoString } from '../base'
import type { PsrLicenseModule } from '../enum-constants'

export type LicenseManager = {
  getServerLicenseModuleList(): Promise<PsrLicenseModule[]>
  getServerLicenseIsMsp(): Promise<boolean>
  getCurrentCustomersIsBilled(): Promise<boolean>
  getCurrentCustomersExpirationDateUtc(): Promise<PsrDateIsoString | null>
}
