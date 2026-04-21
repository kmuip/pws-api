import type { PsrGuid } from '../base'

export type PsrNotifyTriggerConfigFilterObject = {
  __type: string
  Include: boolean
  ObjectId: PsrGuid
  ObjectType: string
}
