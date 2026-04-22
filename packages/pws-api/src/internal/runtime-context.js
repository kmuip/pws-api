import { PsrHttpClient } from './http.js';
import { PsrRealtimeConnection } from './realtime.js';
import { normalizeEndpoint } from './utils.js';
export function createRuntimeContext(apiUrl) {
    const endpoint = normalizeEndpoint(apiUrl);
    const runtimeSession = {
        authToken: null,
        apiKeyToken: null,
        csrfToken: null,
        userKeys: [],
    };
    return {
        endpoint,
        runtimeSession,
        httpClient: new PsrHttpClient(endpoint, () => runtimeSession),
        realtimeConnection: new PsrRealtimeConnection(endpoint),
    };
}
export function cloneSessionToken(token) {
    return token ? { ...token } : null;
}
