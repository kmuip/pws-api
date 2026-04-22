import type { PsrRight } from '../enum-constants/PsrRights'
import type { PsrGuid } from '../base'

export type PsrDataRightTemplate = {
  // Core data properties
  Data?: unknown // Organisation unit that the template applies on
  DataId?: PsrGuid // ID of the organisation unit that the template applies on
  DataType?: number // Which object type the template applies to

  // Legitimate properties
  Legitimate?: unknown // Object that should be legitimated by this template
  LegitimateId?: PsrGuid // ID of the object that should be legitimated by this template

  // Rights and permissions
  OwnerRight?: boolean // Used for ContainerItemPassword, if secured data is true, the legitimate cannot reveal the password, but only use it for automatic entry
  Rights?: PsrRight // Permissions that should be applied by the template

  // Target properties
  Target?: unknown // Object that the template should apply to
  TargetId?: PsrGuid // ID of the object that the template should apply to

  // Template group properties
  TemplateGroup?: unknown // Template group
  TemplateGroupId?: PsrGuid // ID of the template group

  // Synchronization properties
  SyncOperation?: string // Synchronisation State. Used to determine which operation to perform when synchronizing the data.
  TransactionId?: string // The Id of the transaction. Used to identify the object in results, even if its id has changed. Must be generated for sync operations.
}
