import type { PsrEntityObjectType } from '../enum-constants';
import type { PsrDataRightTemplate } from './PsrDataRightTemplate';
import type { PsrDataTagTemplate } from './PsrDataTagTemplate';
export type PsrDataRightTemplateTargetNode = {
    $type?: string;
    Children?: PsrDataRightTemplateTargetNode[] | null;
    Target?: Record<string, unknown> | null;
    DataType?: PsrEntityObjectType | null;
    Templates?: PsrDataRightTemplate[] | null;
    TagTemplates?: PsrDataTagTemplate[] | null;
};
