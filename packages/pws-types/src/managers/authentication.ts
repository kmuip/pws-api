import type { PsrAuthenticationRequirement, PsrAuthenticationRequirementSet, PsrSessionToken, PsrUserKey } from '../runtime'

export type AuthenticationManagerV2 = {
  isAuthenticated: boolean
  loginWithApiKey(apiKey: string): Promise<void> | void
  startLogin(database: string, username: string): Promise<void> | void
  getNameOfUser(): string | undefined
  getUserImage(): string | undefined
  getNextRequirement(): Promise<PsrAuthenticationRequirementSet>
  authenticate(requirement: PsrAuthenticationRequirement): Promise<void> | void
  forkSession(clientInstanceId: string, clientType: string, clientVersion: string): Promise<PsrSessionToken>
  getUserKeys(): PsrUserKey[]
  logout(): Promise<void> | void
  setSession(authToken: PsrSessionToken, userKeys: PsrUserKey[], apiKey?: string): Promise<void> | void
}
