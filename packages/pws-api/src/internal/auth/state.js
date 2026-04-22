function createAuthenticatedLoginData() {
    return {
        UserId: '',
        UserName: '',
        SessionId: '',
        SessionKey: '',
        Keys: [],
    };
}
export function createAuthState(clientInformation) {
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
    };
}
export function resetLoginState(state, database, username, filledAuthentications = []) {
    state.database = database;
    state.username = username;
    state.sessionId = undefined;
    state.nameOfUser = undefined;
    state.userImage = undefined;
    state.currentUserPrivateKey = undefined;
    state.authenticationSteps = [];
    state.filledAuthentications = [...filledAuthentications];
    state.authenticatedLoginData = createAuthenticatedLoginData();
    state.isAuthenticated = false;
}
