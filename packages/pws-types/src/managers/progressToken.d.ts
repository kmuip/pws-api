import type { PsrProgressTokenInfo } from '../runtime';
export type ProgressTokenManager = {
    registerProgressToken(tokenInfo: PsrProgressTokenInfo, tokenName: string): Promise<void> | void;
    unregisterProgressToken(tokenIdentity: string): Promise<void> | void;
    getCurrentUserProgressTokens(): Promise<PsrProgressTokenInfo[]>;
};
