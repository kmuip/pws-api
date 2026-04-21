import type { PsrGuid } from '../base'
import type { PsrContainerItem } from './PsrContainerItem'

export type PsrContainerItemHistory = {
  // Core properties
  __type: string // Internally used, never change this value
  CompareItemId: PsrGuid // ID of the item, use it to compare this item to other historic items
  Binding?: unknown // Binding to the item
  ContainerItem?: PsrContainerItem // Historic container item
}
