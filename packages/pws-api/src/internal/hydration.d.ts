type TypeConstructors = Record<string, new () => object>;
export declare function hydrateResponse<T>(value: T, typeConstructors: TypeConstructors): T;
export {};
