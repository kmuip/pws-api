import type { PsrData } from './PsrData';
import { PsrSealTemplateLegitimate } from './PsrSealTemplateLegitimate';
export type PsrSealTemplate = PsrData & {
    __type: string;
    AllowMultiBreak: boolean;
    BreakRunTime: number;
    Description: string;
    Legitimates?: PsrSealTemplateLegitimate[];
    Name: string;
    ReleaseRequiredAll: boolean;
    ReleaseRunTime: number;
    RequiredReleases: number;
};
