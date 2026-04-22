import type { PsrGuid } from '../base';
import { PsrContainerInfoFieldType } from '../enum-constants';
export type PsrContainerInfoField = {
    ContainerId: PsrGuid;
    FieldType: PsrContainerInfoFieldType;
    Text: string;
    Value?: string;
    ValueDateUtc?: Date;
};
