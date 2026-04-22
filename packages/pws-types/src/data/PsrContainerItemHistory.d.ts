import type { PsrGuid } from '../base';
import type { PsrContainerItem } from './PsrContainerItem';
export type PsrContainerItemHistory = {
    __type: string;
    CompareItemId: PsrGuid;
    Binding?: unknown;
    ContainerItem?: PsrContainerItem;
};
