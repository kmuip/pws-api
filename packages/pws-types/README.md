# `@kmuip/pws-types`

Type declarations for the Netwrix Password Secure JavaScript runtime, with the public HTML docs used as an additional source of truth where they match the runtime surface.

For the Bun and Node runtime package, use `@kmuip/pws-api`.

## Install

```bash
bun add @kmuip/pws-types
```

```bash
npm install @kmuip/pws-types
```

## What This Package Provides

- TypeScript declarations for the Netwrix Password Secure JavaScript runtime
- manager, data, enum, and runtime helper types
- a declaration-only package that can be used like an `@types` package

## What This Package Does Not Provide

- no runtime SDK or HTTP client
- no browser bundle
- no Node transport implementation

Bring your own Netwrix Password Secure runtime from the target environment, then use this package for compile-time typing.

## Usage

Type a runtime instance:

```ts
import type { PsrApi } from '@kmuip/pws-types'

declare const api: PsrApi

await api.authenticationManagerV2.loginWithApiKey('<api-key>')
const containers = await api.containerManager.getContainerList(0, {})
```

Type data models:

```ts
import type { PsrContainer, PsrListFilter } from '@kmuip/pws-types/data'

const filter: PsrListFilter = {}
const container = {} as PsrContainer
```

Type manager-focused interfaces:

```ts
import type { ContainerManager } from '@kmuip/pws-types/managers'

type ContainerReader = Pick<ContainerManager, 'getContainerList' | 'getContainerById'>
```

Type an injected browser runtime:

```ts
import type { PsrApi } from '@kmuip/pws-types'

declare global {
  interface Window {
    PsrApi: new (baseUrl: string, options?: unknown) => PsrApi
    PsrApiEnums: unknown
    PsrApiTypes: unknown
  }
}
```

## Exports

- `@kmuip/pws-types`
  Root runtime types such as `PsrApi`
- `@kmuip/pws-types/data`
  Request, response, and model types
- `@kmuip/pws-types/enum-constants`
  Enum-like constant maps
- `@kmuip/pws-types/enums`
  Enum declarations
- `@kmuip/pws-types/managers`
  Manager interfaces grouped by API area
- `@kmuip/pws-types/runtime`
  Runtime helper types

## Scope

- The exported `PsrApi` type matches the public Netwrix Password Secure JavaScript runtime surface.
- The package is declaration-only and is intended to be published like an `@types`-style helper.
- The declarations are aimed at the current Netwrix Password Secure v9 surface represented in this repository.
- Where the published docs and runtime behavior differ, the runtime-oriented public surface takes precedence.

## Limitations

- Some payload areas are intentionally broad where the public runtime or published docs do not define exact shapes.
- This package does not guarantee runtime availability of any specific browser bundle, Node package, or SDK distribution.
- Official runtime assets can be obtained separately from the Netwrix Password Secure KIS portal: `https://license.passwordsafe.de/kis`

## Local Build

```bash
bun install
bun run types:check
bun run types:build
```

## License

MIT
