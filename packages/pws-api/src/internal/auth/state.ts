import type { PsrAuthenticationRequirement } from '@kmuip/pws-types'
import type { AuthState, AuthenticatedLoginData } from './types.js'

function createAuthenticatedLoginData(): AuthenticatedLoginData {
  return {
    UserId: '',
    UserName: '',
    SessionId: '',
    SessionKey: '',
    Keys: [],
  }
}

export function createAuthState(clientInformation: Record<string, unknown>): AuthState {
  return {
    operationMode: 0,
    database: undefined,
    username: undefined,
    sessionId: undefined,
    nameOfUser: undefined,
    userImage: undefined,
    authenticationSteps: [],
    filledAuthentications: [],
    authenticatedLoginData: createAuthenticatedLoginData(),
    currentUserPrivateKey: undefined,
    clientInformation,
    isAuthenticated: false,
    isLoggingOut: false,
  }
}

export function resetLoginState(
  state: AuthState,
  database: string,
  username: string,
  filledAuthentications: PsrAuthenticationRequirement[] = [],
) {
  state.database = database
  state.username = username
  state.sessionId = undefined
  state.nameOfUser = undefined
  state.userImage = undefined
  state.currentUserPrivateKey = undefined
  state.authenticationSteps = []
  state.filledAuthentications = [...filledAuthentications]
  state.authenticatedLoginData = createAuthenticatedLoginData()
  state.isAuthenticated = false
}
