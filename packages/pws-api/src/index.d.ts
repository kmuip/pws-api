import type { PsrApi as PsrApiShape, PsrApiConstructor, PsrApiEnumsShape } from '@kmuip/pws-types';
import { PsrApiTypes } from './internal/runtime-types.js';
export type * from '@kmuip/pws-types';
export declare const PsrApi: PsrApiConstructor;
export type PsrApi = PsrApiShape;
export declare const PsrApiEnums: PsrApiEnumsShape;
export { PsrApiTypes };
export default PsrApi;
