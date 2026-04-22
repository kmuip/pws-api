import type { PsrRealtimeEventType, RealtimeEventManager } from '@kmuip/pws-types';
type RealtimeMessage = {
    Channel?: string;
    Type?: PsrRealtimeEventType | number;
    Data?: unknown;
};
export declare class PsrRealtimeConnection {
    private readonly subject;
    readonly observable: import("rxjs").Observable<RealtimeMessage>;
    private manualClose;
    private reconnectTimer;
    private socket;
    private readonly endpoint;
    constructor(endpoint: string);
    connect(authToken: Record<string, unknown>): void;
    closeConnection(): void;
}
export declare function createRealtimeEventManager(PsrApiTypes: Record<string, new () => object>, connection: PsrRealtimeConnection): RealtimeEventManager;
export {};
