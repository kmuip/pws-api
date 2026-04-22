import { Subject } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import type { ObservableLike, PsrRealtimeEventType, RealtimeEventManager } from '@kmuip/pws-types'

type RealtimeMessage = {
  Channel?: string
  Type?: PsrRealtimeEventType | number
  Data?: unknown
}

export class PsrRealtimeConnection {
  private readonly subject = new Subject<RealtimeMessage>()
  readonly observable = this.subject.asObservable()
  private manualClose = false
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null
  private socket: WebSocket | null = null
  private readonly endpoint: string

  constructor(endpoint: string) {
    const normalized = endpoint.replace(/^https:\/\//, '').replace(/\/+$/, '')
    const realtimeBase = normalized.endsWith('/api') ? normalized.slice(0, -4) : normalized
    this.endpoint = `wss://${realtimeBase}/realtime`
  }

  connect(authToken: Record<string, unknown>) {
    if (typeof WebSocket === 'undefined') {
      return
    }

    this.manualClose = false

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }

    const socket = new WebSocket(this.endpoint)
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          Command: 'Register',
          Data: Buffer.from(JSON.stringify(authToken), 'utf8').toString('base64'),
        }),
      )
    }
    socket.onmessage = (event) => {
      const payload = JSON.parse(String(event.data)) as RealtimeMessage
      if (payload.Channel && typeof payload.Data === 'string') {
        payload.Data = JSON.parse(payload.Data)
      }

      this.subject.next(payload)
    }
    socket.onclose = (event) => {
      if (!this.manualClose && event.code !== 1000) {
        this.reconnectTimer = setTimeout(() => this.connect(authToken), 3000)
      }

      if (this.socket === socket) {
        this.socket = null
      }
    }

    this.socket = socket
  }

  closeConnection() {
    this.manualClose = true

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }

    this.socket?.close(1000)
    this.socket = null
  }
}

export function createRealtimeEventManager(
  PsrApiTypes: Record<string, new () => object>,
  connection: PsrRealtimeConnection,
): RealtimeEventManager {
  const hydrate = <T extends object>(value: T, ctorName: string) => {
    const ctor = PsrApiTypes[ctorName]
    return ctor ? Object.setPrototypeOf(value, new ctor()) : value
  }

  return {
    serverMessageReceived: connection.observable.pipe(
      filter((event) => event.Channel === 'ServerMessage'),
      map((event) => ({ serverMessage: event.Data as Record<string, unknown> })),
    ) as ObservableLike<{ serverMessage: Record<string, unknown> }>,
    containerChanged: connection.observable.pipe(
      filter((event) => event.Channel === 'ContainerChanged'),
      map((event) => ({
        eventType: event.Type!,
        container: hydrate(event.Data as object, 'PsrContainer'),
      })),
    ) as RealtimeEventManager['containerChanged'],
    roleChanged: connection.observable.pipe(
      filter((event) => event.Channel === 'RoleChanged'),
      map((event) => ({ eventType: event.Type!, role: hydrate(event.Data as object, 'PsrRole') })),
    ) as RealtimeEventManager['roleChanged'],
    userChanged: connection.observable.pipe(
      filter((event) => event.Channel === 'OrganisationUnitUserChanged'),
      map((event) => ({
        eventType: event.Type!,
        user: hydrate(event.Data as object, 'PsrOrganisationUnitUser'),
      })),
    ) as RealtimeEventManager['userChanged'],
    groupChanged: connection.observable.pipe(
      filter((event) => event.Channel === 'OrganisationUnitGroupChanged'),
      map((event) => ({
        eventType: event.Type!,
        group: hydrate(event.Data as object, 'PsrOrganisationUnitGroup'),
      })),
    ) as RealtimeEventManager['groupChanged'],
    dataBindingChanged: connection.observable.pipe(
      filter((event) => event.Channel === 'DataBindingChanged'),
      map((event) => ({
        eventType: event.Type!,
        dataBinding: event.Data as Record<string, unknown>,
      })),
    ) as RealtimeEventManager['dataBindingChanged'],
    thisSessionClosed: connection.observable.pipe(
      filter((event) => event.Channel === 'ThisSessionClosed'),
      map((event) => ({ eventType: event.Type! })),
    ) as RealtimeEventManager['thisSessionClosed'],
  }
}
