# `@kmuip/pws-api`

Runtime package for Netwrix Password Secure in Bun and Node.

This package provides a usable `PsrApi` runtime with the current JavaScript API surface, plus typed exports aligned with `@kmuip/pws-types`.

For typical application work, prefer `@kmuip/pws-sdk` first. Use `@kmuip/pws-api` when you need direct access to the low-level manager surface or parity-oriented behavior.

## Install

```bash
bun add @kmuip/pws-api @kmuip/pws-types
```

```bash
npm install @kmuip/pws-api @kmuip/pws-types
```

## Usage

```ts
import { PsrApi } from '@kmuip/pws-api'

const api = new PsrApi('https://pass.example.com/')
await api.authenticationManagerV2.loginWithApiKey(process.env.API_KEY!)
const currentUser = await api.organisationUnitManager.getCurrentOrganisationUnit()
await api.authenticationManagerV2.logout()
```

## Notes

- Bun and Node only in v1
- ESM only
- preserves the current JS runtime naming and manager surface
- published package is native runtime code
- legacy wrapper files are not required for normal builds; add them temporarily under `legacy/` only when doing parity or regeneration work
- browser-observed write paths such as `AddContainerV2`, `AddOrganisationUnitUser2`, and `AddOrganisationUnitGroup` are the main parity anchors for create/update operations; see `PARITY-NOTES.md`

## License

MIT
