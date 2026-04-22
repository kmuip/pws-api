import { webcrypto } from 'node:crypto'
import { WebSocket as NodeWebSocket } from 'ws'

export function ensureNodeRuntimeCompatibility() {
  if (typeof globalThis.crypto === 'undefined') {
    Object.defineProperty(globalThis, 'crypto', {
      configurable: true,
      value: webcrypto,
    })
  }

  if (typeof globalThis.WebSocket === 'undefined') {
    Object.defineProperty(globalThis, 'WebSocket', {
      configurable: true,
      value: NodeWebSocket,
    })
  }
}
