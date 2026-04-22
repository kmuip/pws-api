import { PsrGuid } from '../base';
import type { PsrApplication, PsrListFilter } from '../data';
export type ApplicationManager = {
    getApplication(id: PsrGuid): Promise<PsrApplication>;
    getApplicationListFilter(defaultFilter: boolean): Promise<PsrListFilter>;
    getApplicationList(filter: PsrListFilter): Promise<Iterable<PsrApplication>>;
    addApplication(application: PsrApplication): Promise<PsrApplication>;
    updateApplication(application: PsrApplication): Promise<PsrApplication>;
};
