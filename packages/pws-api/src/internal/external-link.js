function encodeGuid(guid) {
    const bytes = [];
    guid.split('-').forEach((segment, index) => {
        const pairs = segment.match(/.{1,2}/g) ?? [];
        const orderedPairs = index < 3 ? [...pairs].reverse() : pairs;
        for (const pair of orderedPairs) {
            bytes.push(Number.parseInt(pair, 16));
        }
    });
    return Buffer.from(bytes).toString('base64').replace('/', '_').replace('+', '-').slice(0, 22);
}
export class RuntimeExternalLinkManager {
    getExternalLink(primaryType, primaryId, secondaryType, secondaryId) {
        if (primaryType == null || !primaryId) {
            return '';
        }
        let payload = `${primaryType}:${encodeGuid(primaryId)}`;
        if (secondaryType != null && secondaryId) {
            payload += `;${secondaryType}:${encodeGuid(secondaryId)}`;
        }
        return `ps8://${Buffer.from(payload, 'utf8').toString('base64')}`;
    }
}
