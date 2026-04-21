import type { PsrGuid } from '../base'
import { PsrContainerInfoFieldType } from '../enum-constants'

export type PsrContainerInfoField = {
  // Core properties
  ContainerId: PsrGuid // ID of the container
  FieldType: PsrContainerInfoFieldType // Type of the field
  Text: string // Text that should be shown
  Value?: string // Value for executable infos like URL, e-mail, RDP, etc.
  ValueDateUtc?: Date // Date field value
}
