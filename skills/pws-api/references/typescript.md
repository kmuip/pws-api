# TypeScript

## Goal

Build browser-first or Node-facing integrations that match the public Netwrix Password Secure JavaScript runtime surface and use the declaration package for compile-time guidance.

## Use These Inputs

1. `@kmuip/pws-sdk`
2. `@kmuip/pws-types`
3. `@kmuip/pws-api`
4. `references/api-docs`
5. `references/examples.md`
6. Optional local browser or Node runtime assets from your Netwrix Password Secure deployment or from `https://license.passwordsafe.de/kis`

## Typical Flow

1. For Bun or Node application code, start with `createPwsSdk()` from `@kmuip/pws-sdk`.
2. Prefer SDK resources first. Use `sdk.raw` only for exact parity objects or session internals.
3. Import types from `@kmuip/pws-types` or from package root exports when you need compile-time guidance.
4. For browser code, use `window.PsrApi`, `window.PsrApiEnums`, and `window.PsrApiTypes` when the host environment injects them.
5. Authenticate with the SDK auth config or with `authenticationManagerV2` on the raw runtime.
6. For Microsoft or other OIDC-backed users, prefer `beginPwsOidcLogin()` with a real redirect URL. The callback returns as a URL fragment, and the completion step must run in the same auth session that generated the provider login URL.
7. Call low-level manager methods using runtime names exactly as exported.
8. If a payload shape is missing or ambiguous, use the bundled handbooks under `references/api-docs` before widening the type.
9. If the runtime package is not locally available, keep imports abstract and focus on the request and response shapes.
10. If you need a working browser or migration pattern, copy the structure from `references/examples.md` instead of inventing one.

## Patterns

- Use `@kmuip/pws-sdk` first for common Bun or Node application work.
- Prefer SDK filter DTOs over raw `PsrListFilter` objects for app code.
- Prefer SDK resources for atomic operations such as OU create/update, role lookup, right assignment, predefined-right setup, template-group setup, form-based container creation, document upload/link creation, seal create/update/delete, password reveal, option reads and updates, policy reads, forwarding-rule work, and progress-token or realtime access.
- Use `sdk.sessions.fork()` plus `createPwsSdkFromSession()` when another client should adopt an already-authenticated session instead of performing a fresh login.
- Use `sdk.optionValues`, `sdk.passwordGeneration`, `sdk.activeDirectorySync`, `sdk.dataBindingsSdk`, `sdk.favorites`, `sdk.containersSdk`, and `sdk.subscriptions` for the higher-level helpers that sit above the raw manager aliases.
- Use the root `PsrApi` type for low-level runtime instances.
- Prefer the browser globals for frontend work because that is the most common deployment shape.
- Use manager-specific types from `@kmuip/pws-types/managers` when exposing narrow interfaces.
- Use `Record<string, unknown>` only for payload segments that the runtime or docs do not define clearly.
- Preserve server field casing in request and response objects.

## Example Shape

```ts
import { createPwsSdk } from '@kmuip/pws-sdk'
import type { PasswordRecord } from '@kmuip/pws-sdk'

async function listPasswords(apiUrl: string, apiKey: string): Promise<PasswordRecord[]> {
  const sdk = await createPwsSdk({
    url: apiUrl,
    auth: { type: 'apiKey', apiKey },
  })

  return sdk.passwords.list({
    search: 'sample',
    pageSize: 20,
    sortBy: 'name',
    sortDirection: 'asc',
  })
}
```

Treat examples as shape guidance. Confirm exact enum values and filter types from the declaration package before finalizing code.

## Seal Notes

- Seal create and update use a `legitimates` list instead of raw seal-key payloads.
- Mark releasers with `canRelease: true`.
- Mark sealed users or roles with `sealedFor: true`.
- Mark mandatory releasers with `obligatory: true`.
- When updating a seal in a fresh SDK session, provide `name` and `legitimates` so the SDK can regenerate the server-required key payload.
