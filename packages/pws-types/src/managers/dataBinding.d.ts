import { PsrGuid } from '../base';
import type { PsrDataBinding } from '../data';
import { PsrEntityObjectType } from '../enum-constants';
export type DataBindingManager = {
    addDataBinding(dataId: PsrGuid, dataType: PsrEntityObjectType, parentId: PsrGuid, parentType: PsrEntityObjectType): Promise<void> | void;
    removeAllDataBinding(dataId: PsrGuid, parentType: PsrEntityObjectType | null): Promise<void> | void;
    getDataBindingsByData(dataId: PsrGuid, parentType: PsrEntityObjectType | null): Promise<Iterable<PsrDataBinding>>;
    getDataBindingsByParent(parentId: PsrGuid, dataType: PsrEntityObjectType | null): Promise<Iterable<PsrDataBinding>>;
    removeDataBinding(id: PsrGuid, parentId: PsrGuid): Promise<void> | void;
};
