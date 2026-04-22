# TypeScript

## Goal

Build browser-first or Node-facing integrations that match the public Netwrix Password Secure JavaScript runtime surface and use the declaration package for compile-time guidance.

## Use These Inputs

1. `@kmuip/pws-types`
2. `@kmuip/pws-api`
3. `references/api-docs`
4. `references/examples.md`
5. Optional local browser or Node runtime assets from your Netwrix Password Secure deployment or from `https://license.passwordsafe.de/kis`

## Typical Flow

1. For Bun or Node code, import `PsrApi` from `@kmuip/pws-api`.
2. Import types from `@kmuip/pws-types` or from `@kmuip/pws-api` root exports.
3. For browser code, use `window.PsrApi`, `window.PsrApiEnums`, and `window.PsrApiTypes` when the host environment injects them.
4. Authenticate with `authenticationManagerV2` or inspect an API key with `apiKeyManager`.
5. Call manager methods using runtime names exactly as exported.
6. If a payload shape is missing or ambiguous, use the bundled handbooks under `references/api-docs` before widening the type.
7. If the runtime package is not locally available, keep imports abstract and focus on the request and response shapes.
8. If you need a working browser or migration pattern, copy the structure from `references/examples.md` instead of inventing one.

## Patterns

- Use the root `PsrApi` type for the runtime instance.
- Prefer the browser globals for frontend work because that is the most common deployment shape.
- Use manager-specific types from `@kmuip/pws-types/managers` when exposing narrow interfaces.
- Use `Record<string, unknown>` only for payload segments that the runtime or docs do not define clearly.
- Preserve server field casing in request and response objects.

## Example Shape

```ts
import { PsrApi } from '@kmuip/pws-api'
import type { PsrContainer } from '@kmuip/pws-types/data'

async function listContainers(apiUrl: string, filter: unknown): Promise<PsrContainer[]> {
  const api = new PsrApi(apiUrl)
  return api.containerManager.getContainerList(0, filter as never)
}
```

Treat examples as shape guidance. Confirm exact enum values and filter types from the declaration package before finalizing code.
