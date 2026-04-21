import type { PsrGuid } from '../base'
import type { PsrBatchRightItemType } from '../enum-constants'

export type PsrBatchRightItem = {
  /** ID of the object on which the right change should apply */
  DataId: PsrGuid
  /** Type of batch right item operation */
  ItemType: PsrBatchRightItemType
  /** ID of the legitimated object */
  LegitimateId: PsrGuid
  /** Owner right flag */
  OwnerRight?: boolean
  /** Right key for encryption/decryption */
  RightKey?: string
  /** Rights to be applied */
  Rights?: number
  /** Seal ID for additional security */
  SealId?: PsrGuid
  /** Right protected/secured flag */
  SecuredData?: boolean
  /** Validity date begin */
  ValidFrom?: Date
  /** Validity date end */
  ValidTo?: Date
}
