import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
export class PsrRealtimeConnection {
    subject = new Subject();
    observable = this.subject.asObservable();
    manualClose = false;
    reconnectTimer = null;
    socket = null;
    endpoint;
    constructor(endpoint) {
        const normalized = endpoint.replace(/^https:\/\//, '').replace(/\/+$/, '');
        const realtimeBase = normalized.endsWith('/api') ? normalized.slice(0, -4) : normalized;
        this.endpoint = `wss://${realtimeBase}/realtime`;
    }
    connect(authToken) {
        if (typeof WebSocket === 'undefined') {
            return;
        }
        this.manualClose = false;
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
        const socket = new WebSocket(this.endpoint);
        socket.onopen = () => {
            socket.send(JSON.stringify({
                Command: 'Register',
                Data: Buffer.from(JSON.stringify(authToken), 'utf8').toString('base64'),
            }));
        };
        socket.onmessage = (event) => {
            const payload = JSON.parse(String(event.data));
            if (payload.Channel && typeof payload.Data === 'string') {
                payload.Data = JSON.parse(payload.Data);
            }
            this.subject.next(payload);
        };
        socket.onclose = (event) => {
            if (!this.manualClose && event.code !== 1000) {
                this.reconnectTimer = setTimeout(() => this.connect(authToken), 3000);
            }
            if (this.socket === socket) {
                this.socket = null;
            }
        };
        this.socket = socket;
    }
    closeConnection() {
        this.manualClose = true;
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
        this.socket?.close(1000);
        this.socket = null;
    }
}
export function createRealtimeEventManager(PsrApiTypes, connection) {
    const hydrate = (value, ctorName) => {
        const ctor = PsrApiTypes[ctorName];
        return ctor ? Object.setPrototypeOf(value, new ctor()) : value;
    };
    return {
        serverMessageReceived: connection.observable.pipe(filter((event) => event.Channel === 'ServerMessage'), map((event) => ({ serverMessage: event.Data }))),
        containerChanged: connection.observable.pipe(filter((event) => event.Channel === 'ContainerChanged'), map((event) => ({
            eventType: event.Type,
            container: hydrate(event.Data, 'PsrContainer'),
        }))),
        roleChanged: connection.observable.pipe(filter((event) => event.Channel === 'RoleChanged'), map((event) => ({ eventType: event.Type, role: hydrate(event.Data, 'PsrRole') }))),
        userChanged: connection.observable.pipe(filter((event) => event.Channel === 'OrganisationUnitUserChanged'), map((event) => ({
            eventType: event.Type,
            user: hydrate(event.Data, 'PsrOrganisationUnitUser'),
        }))),
        groupChanged: connection.observable.pipe(filter((event) => event.Channel === 'OrganisationUnitGroupChanged'), map((event) => ({
            eventType: event.Type,
            group: hydrate(event.Data, 'PsrOrganisationUnitGroup'),
        }))),
        dataBindingChanged: connection.observable.pipe(filter((event) => event.Channel === 'DataBindingChanged'), map((event) => ({
            eventType: event.Type,
            dataBinding: event.Data,
        }))),
        thisSessionClosed: connection.observable.pipe(filter((event) => event.Channel === 'ThisSessionClosed'), map((event) => ({ eventType: event.Type }))),
    };
}
