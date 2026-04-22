import type {
  PsrApi,
  PsrContainerChangedEvent,
  PsrDataBindingChangedEvent,
  PsrGroupChangedEvent,
  PsrRoleChangedEvent,
  PsrServerMessagePayload,
  PsrThisSessionClosedEvent,
  PsrUserChangedEvent,
} from '@kmuip/pws-api'
import type { RealtimeSubscription } from '../types.js'

function wrapSubscription(value: unknown): RealtimeSubscription {
  return {
    unsubscribe() {
      if (value && typeof value === 'object' && 'unsubscribe' in value) {
        ;(value as { unsubscribe: () => void }).unsubscribe()
      }
    },
  }
}

type ObservableLike<T> = {
  subscribe(next: (value: T) => unknown): unknown
}

type WaitOptions<T> = {
  timeoutMs?: number | null
  predicate?: ((value: T) => boolean) | undefined
}

function waitForObservable<T>(observable: ObservableLike<T>, options: WaitOptions<T> = {}) {
  return new Promise<T>((resolve, reject) => {
    let settled = false
    let timeout: ReturnType<typeof setTimeout> | null = null
    let subscription: { unsubscribe?: (() => void) | undefined } | null = null

    const cleanup = () => {
      if (timeout) {
        clearTimeout(timeout)
      }
      subscription?.unsubscribe?.()
    }

    const settle = (callback: () => void) => {
      if (settled) {
        return
      }
      settled = true
      cleanup()
      callback()
    }

    if (options.timeoutMs && options.timeoutMs > 0) {
      timeout = setTimeout(() => {
        settle(() => reject(new Error(`Timed out waiting for realtime event after ${options.timeoutMs}ms.`)))
      }, options.timeoutMs)
    }

    subscription = observable.subscribe((value) => {
      if (options.predicate && !options.predicate(value)) {
        return
      }

      settle(() => resolve(value))
    }) as { unsubscribe?: (() => void) | undefined }
  })
}

export class RealtimeSubscriptionsResource {
  constructor(private readonly raw: PsrApi) {}

  onServerMessage(next: (value: { serverMessage: PsrServerMessagePayload }) => unknown) {
    return wrapSubscription(this.raw.realtimeEventManager.serverMessageReceived.subscribe(next))
  }

  onContainerChanged(next: (value: PsrContainerChangedEvent) => unknown) {
    return wrapSubscription(this.raw.realtimeEventManager.containerChanged.subscribe(next))
  }

  onRoleChanged(next: (value: PsrRoleChangedEvent) => unknown) {
    return wrapSubscription(this.raw.realtimeEventManager.roleChanged.subscribe(next))
  }

  onUserChanged(next: (value: PsrUserChangedEvent) => unknown) {
    return wrapSubscription(this.raw.realtimeEventManager.userChanged.subscribe(next))
  }

  onGroupChanged(next: (value: PsrGroupChangedEvent) => unknown) {
    return wrapSubscription(this.raw.realtimeEventManager.groupChanged.subscribe(next))
  }

  onDataBindingChanged(next: (value: PsrDataBindingChangedEvent) => unknown) {
    return wrapSubscription(this.raw.realtimeEventManager.dataBindingChanged.subscribe(next))
  }

  onSessionClosed(next: (value: PsrThisSessionClosedEvent) => unknown) {
    return wrapSubscription(this.raw.realtimeEventManager.thisSessionClosed.subscribe(next))
  }

  onceServerMessage(options?: WaitOptions<{ serverMessage: PsrServerMessagePayload }>) {
    return waitForObservable(this.raw.realtimeEventManager.serverMessageReceived, options)
  }

  onceContainerChanged(options?: WaitOptions<PsrContainerChangedEvent>) {
    return waitForObservable(this.raw.realtimeEventManager.containerChanged, options)
  }

  onceRoleChanged(options?: WaitOptions<PsrRoleChangedEvent>) {
    return waitForObservable(this.raw.realtimeEventManager.roleChanged, options)
  }

  onceUserChanged(options?: WaitOptions<PsrUserChangedEvent>) {
    return waitForObservable(this.raw.realtimeEventManager.userChanged, options)
  }

  onceGroupChanged(options?: WaitOptions<PsrGroupChangedEvent>) {
    return waitForObservable(this.raw.realtimeEventManager.groupChanged, options)
  }

  onceDataBindingChanged(options?: WaitOptions<PsrDataBindingChangedEvent>) {
    return waitForObservable(this.raw.realtimeEventManager.dataBindingChanged, options)
  }

  onceSessionClosed(options?: WaitOptions<PsrThisSessionClosedEvent>) {
    return waitForObservable(this.raw.realtimeEventManager.thisSessionClosed, options)
  }
}
