import type { PsrSessionToken } from '@kmuip/pws-types';
type SignDataFn = (data: string, privateKey: string) => Promise<string | Uint8Array>;
export type ClientInformation = {
    ClientType: string;
    ClientVersion: string;
    ClientInstanceId: string;
};
export declare function normalizeEndpoint(endpoint: string): string;
export declare function getClientInformation(clientInstanceId?: string): ClientInformation;
export declare function getClientVersion(): string;
export declare function toBase64(value: string, encoding?: BufferEncoding): string;
export declare function fromBase64(value: string, encoding?: BufferEncoding): string;
export declare function toBase64Json(value: unknown): string;
export declare function parseJsonWebTokenPayload<T>(jsonWebToken: string): T;
export declare function computeCsrfToken(authToken: PsrSessionToken, privateKey: string, signData: SignDataFn): Promise<string>;
export {};
