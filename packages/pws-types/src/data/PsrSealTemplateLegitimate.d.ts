import type { PsrData } from './PsrData';
import { PsrSealTemplate } from './PsrSealTemplate';
export type PsrSealTemplateLegitimate = PsrData & {
    __type: string;
    CanRelease: boolean;
    IsSealed: boolean;
    Legitimate?: any;
    LegitimateId: string;
    Required: number;
    SealTemplate?: PsrSealTemplate;
    SealTemplateId: string;
};
