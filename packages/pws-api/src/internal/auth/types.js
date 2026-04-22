export function createAuthenticationError(message, details) {
    const error = new Error(message);
    if (details && typeof details === 'object') {
        Object.assign(error, details);
    }
    return error;
}
