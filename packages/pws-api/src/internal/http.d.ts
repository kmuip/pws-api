import type { PsrSessionToken } from '@kmuip/pws-types';
export type RuntimeSession = {
    authToken: PsrSessionToken | null;
    apiKeyToken: string | null;
    csrfToken: string | null;
    userKeys: Array<{
        id: string;
        privateKey: string;
    }>;
};
type ServiceArea = 'Auth' | 'WebService' | 'WebMaintenanceService' | 'WebServiceMultiFactorAuth';
export declare class PsrHttpClient {
    private readonly endpoint;
    private readonly getSession;
    constructor(endpoint: string, getSession: () => RuntimeSession | null);
    post<T>(area: ServiceArea, method: string, payload: unknown, withSession?: boolean): Promise<T>;
    get<T>(area: ServiceArea, method: string, query?: Record<string, unknown>, withSession?: boolean): Promise<T>;
}
export {};
