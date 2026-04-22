import type { ExternalLinkManager, PsrGuid } from '@kmuip/pws-types';
import type { PsrExternalLinkType } from '@kmuip/pws-types/enum-constants';
export declare class RuntimeExternalLinkManager implements ExternalLinkManager {
    getExternalLink(primaryType: PsrExternalLinkType, primaryId: PsrGuid, secondaryType?: PsrExternalLinkType | null, secondaryId?: PsrGuid | null): string;
}
