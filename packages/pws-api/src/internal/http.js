import { toBase64, toBase64Json } from './utils.js';
function createHttpError(message, status, url) {
    const error = new Error(message);
    error.status = status;
    error.url = url;
    return error;
}
function buildHeaders(session) {
    const headers = {
        'content-type': 'application/json',
    };
    if (session?.authToken) {
        const tokenHeader = Object.prototype.hasOwnProperty.call(session.authToken, 'ClientInstanceId')
            ? 'token'
            : 'token2';
        headers[tokenHeader] = toBase64Json(session.authToken);
    }
    if (session?.csrfToken) {
        headers['CSRF-Token'] = toBase64(session.csrfToken, 'utf8');
    }
    if (session?.apiKeyToken) {
        headers.ApiKeyToken = session.apiKeyToken;
    }
    return headers;
}
async function parseResponse(response) {
    const rawText = await response.text();
    const text = rawText.replace(/^\uFEFF/, '');
    if (response.status === 200) {
        return text.length === 0 ? undefined : JSON.parse(text);
    }
    if (response.status === 500 && text.length > 0) {
        const error = JSON.parse(text);
        error.status = response.status;
        error.url = response.url;
        throw Object.setPrototypeOf(error, new Error(error.message ?? error.txt ?? 'Server error'));
    }
    if (response.status === 401) {
        throw createHttpError('Unauthorized.', response.status, response.url);
    }
    if (response.status === 403) {
        throw createHttpError('Forbidden.', response.status, response.url);
    }
    if (response.status === 502) {
        throw createHttpError('The server is unreachable.', response.status, response.url);
    }
    throw createHttpError(`Unexpected response status ${response.status}.`, response.status, response.url);
}
export class PsrHttpClient {
    endpoint;
    getSession;
    constructor(endpoint, getSession) {
        this.endpoint = endpoint;
        this.getSession = getSession;
    }
    async post(area, method, payload, withSession = true) {
        const response = await fetch(new URL(`${area}/${method}`, this.endpoint), {
            method: 'POST',
            headers: buildHeaders(withSession ? this.getSession() : null),
            body: JSON.stringify(payload),
            cache: 'no-cache',
        });
        return parseResponse(response);
    }
    async get(area, method, query, withSession = true) {
        const url = new URL(`${area}/${method}`, this.endpoint);
        if (query) {
            for (const [key, value] of Object.entries(query)) {
                if (value !== undefined && value !== null) {
                    url.searchParams.set(key, String(value));
                }
            }
        }
        const response = await fetch(url, {
            method: 'GET',
            headers: buildHeaders(withSession ? this.getSession() : null),
            cache: 'no-cache',
        });
        return parseResponse(response);
    }
}
