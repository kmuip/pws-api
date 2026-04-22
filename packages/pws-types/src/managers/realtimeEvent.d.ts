import type { ObservableLike, PsrContainerChangedEvent, PsrDataBindingChangedEvent, PsrGroupChangedEvent, PsrRoleChangedEvent, PsrServerMessagePayload, PsrThisSessionClosedEvent, PsrUserChangedEvent } from '../runtime';
export type RealtimeEventManager = {
    serverMessageReceived: ObservableLike<{
        serverMessage: PsrServerMessagePayload;
    }>;
    containerChanged: ObservableLike<PsrContainerChangedEvent>;
    roleChanged: ObservableLike<PsrRoleChangedEvent>;
    userChanged: ObservableLike<PsrUserChangedEvent>;
    groupChanged: ObservableLike<PsrGroupChangedEvent>;
    dataBindingChanged: ObservableLike<PsrDataBindingChangedEvent>;
    thisSessionClosed: ObservableLike<PsrThisSessionClosedEvent>;
};
