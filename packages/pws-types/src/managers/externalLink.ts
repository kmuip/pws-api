import type { PsrGuid } from '../base'
import type { PsrExternalLinkType } from '../enum-constants'

export type ExternalLinkManager = {
  getExternalLink(
    primaryType: PsrExternalLinkType,
    primaryId: PsrGuid,
    secondaryType?: PsrExternalLinkType | null,
    secondaryId?: PsrGuid | null,
  ): string
}
