import type { ExternalLinkManager, PsrGuid } from '@kmuip/pws-types'
import type { PsrExternalLinkType } from '@kmuip/pws-types/enum-constants'

function encodeGuid(guid: PsrGuid) {
  const bytes: number[] = []

  guid.split('-').forEach((segment, index) => {
    const pairs = segment.match(/.{1,2}/g) ?? []
    const orderedPairs = index < 3 ? [...pairs].reverse() : pairs
    for (const pair of orderedPairs) {
      bytes.push(Number.parseInt(pair, 16))
    }
  })

  return Buffer.from(bytes).toString('base64').replace('/', '_').replace('+', '-').slice(0, 22)
}

export class RuntimeExternalLinkManager implements ExternalLinkManager {
  getExternalLink(
    primaryType: PsrExternalLinkType,
    primaryId: PsrGuid,
    secondaryType?: PsrExternalLinkType | null,
    secondaryId?: PsrGuid | null,
  ) {
    if (primaryType == null || !primaryId) {
      return ''
    }

    let payload = `${primaryType}:${encodeGuid(primaryId)}`
    if (secondaryType != null && secondaryId) {
      payload += `;${secondaryType}:${encodeGuid(secondaryId)}`
    }

    return `ps8://${Buffer.from(payload, 'utf8').toString('base64')}`
  }
}
