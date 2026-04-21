# `@kmuip/pws-types`

Type declarations for the Netwrix Password Secure JavaScript runtime, with the public HTML docs used as an additional source of truth where they match the runtime surface.

## Scope

- The exported `PsrApi` type matches the public Netwrix Password Secure JavaScript runtime surface.
- The package is declaration-only and is intended to be published like an `@types`-style helper.

## Build

```bash
bun install
bun run types:check
bun run types:build
```

## Exports

- `@kmuip/pws-types`
- `@kmuip/pws-types/data`
- `@kmuip/pws-types/enum-constants`
- `@kmuip/pws-types/enums`
- `@kmuip/pws-types/managers`
- `@kmuip/pws-types/runtime`
