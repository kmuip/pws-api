# Netwrix Password Secure Agent Toolkit

This repository packages public skill and package deliverables for Netwrix Password Secure:

- `skills/pws-api`
  A self-contained agent skill for building Netwrix Password Secure integrations.
- `packages/pws-sdk`
  A high-level Bun and Node SDK for common Netwrix Password Secure app and admin flows.
- `packages/pws-api`
  A Bun and Node runtime package for the Netwrix Password Secure JavaScript API parity surface.
- `packages/pws-types`
  A declaration-only TypeScript package for the Netwrix Password Secure JavaScript runtime surface.

## Install The Skill

The skill is organized in a top-level `skills/` directory so it is discoverable by the Skills CLI:

```bash
bunx skills add kmuip/pws-api --skill pws-api
```

Or from a full repository URL:

```bash
bunx skills add https://github.com/kmuip/pws-api --skill pws-api
```

## Package The SDK

Published package:

- `@kmuip/pws-sdk`

Use this package first for common application work such as password CRUD, tag management, organisation unit work, user creation, and logbook reads.

```bash
bun install
bun run sdk:check
bun run sdk:build
bun run sdk:live-smoke
bun run sdk:live-filter-smoke
bun run sdk:live-atomic-smoke
```

Dry-run the published package:

```bash
bun run sdk:pack
```

Write-safe SDK validation workflow:

- [packages/pws-sdk/TESTING.md](/home/luke/projects/kmuip/pws-api-wrapper/packages/pws-sdk/TESTING.md)

## Package The Types

Published package:

- `@kmuip/pws-types`
- `https://www.npmjs.com/package/@kmuip/pws-types`

```bash
bun install
bun run types:check
bun run types:build
```

Dry-run the published package:

```bash
bun run types:pack
```

## Package The Runtime

Runtime package:

- `@kmuip/pws-api`

Use this package when you need the low-level parity-oriented `PsrApi` surface directly or when `@kmuip/pws-sdk` does not yet cover the required operation.

```bash
bun run api:check
bun run api:build
```

Dry-run the published runtime package:

```bash
bun run api:pack
```

## Lint And Format

The repo uses Oxc for linting and formatting.

```bash
bun run lint
bun run lint:fix
bun run format
bun run format:check
```

## Runtime Reference Inputs

`packages/pws-api` is native at runtime and in the published npm tarball. Legacy wrapper files are optional maintainer reference input only, used temporarily when you want to compare a future official wrapper release for parity.

Reference inputs, when present under `packages/pws-api/legacy`, are used for three generated artifacts:

- `scripts/generate-forward-manifests.mjs`
  Extracts service and manager method wiring from the legacy JS wrapper into `src/generated/forward-manifests.ts`.
- `scripts/generate-runtime-enums.mjs`
  Extracts the legacy enum object into `src/generated/runtime-enums.ts`.
- `scripts/generate-parity-manifest.mjs`
  Extracts the public surface into `parity-manifest.json` for compatibility checks.

Policy:

- do not keep legacy files committed by default
- if parity work is needed, paste legacy files temporarily under `packages/pws-api/legacy`
- never import legacy files from runtime source code
- never publish legacy files in the npm package
- use them only to regenerate manifests, enums, and parity metadata when a newer official wrapper becomes available

To refresh the generated reference artifacts manually:

```bash
cd packages/pws-api
node ./scripts/generate-forward-manifests.mjs
node ./scripts/generate-runtime-enums.mjs
node ./scripts/generate-parity-manifest.mjs
```

## Publish The Runtime

Publish `@kmuip/pws-api` from `packages/pws-api`.

Recommended publish flow:

```bash
bun install
bun run api:check
bun run api:build
cd packages/pws-api
bun publish --access public
```

## Publish The SDK

Publish `@kmuip/pws-sdk` from `packages/pws-sdk`.

Recommended publish flow:

```bash
bun install
bun run sdk:check
bun run sdk:build
cd packages/pws-sdk
bun publish --access public
```

## Publish The Types

Publish `@kmuip/pws-types` from `packages/pws-types`.

Prerequisites:

- the `kmuip` scope exists on npm
- your npm user has publish rights for that scope
- you are logged in locally with `npm login`

Recommended publish flow:

```bash
bun install
bun run types:check
bun run types:build
cd packages/pws-types
bun publish --access public
```

For the first public publish of a scoped package, `--access public` is required.

If Bun returns a scope or registry error on the first publish, verify your npm registry config:

```bash
npm whoami
npm config get registry
npm config get @kmuip:registry
```

Expected registry:

```bash
https://registry.npmjs.org/
```

If needed, reset it and retry:

```bash
npm config delete @kmuip:registry
npm config set registry https://registry.npmjs.org/
cd packages/pws-types
bun publish --access public
```

Fallback for the first release if Bun still fails:

```bash
cd packages/pws-types
npm publish --access public
```

## Maintain The Skill

Use the repo root as the maintenance workspace. The public skill itself stays self-contained under `skills/pws-api`.

1. Mirror the official Netwrix Password Secure HTML docs locally:

```bash
bun run docs:mirror
```

2. Rebuild the bundled handbook markdown inside the skill:

```bash
bun run skill:build-docs
```

3. Validate the skill after edits:

```bash
bun run skill:validate
```

4. Re-check and pack the runtime and type packages before publishing:

```bash
bun run sdk:check
bun run sdk:build
bun run sdk:live-smoke
bun run sdk:live-password-auth-smoke
bun run sdk:live-otp-auth-smoke
bun run sdk:live-filter-smoke
bun run sdk:live-atomic-smoke
bun run sdk:pack
bun run api:check
bun run api:build
bun run api:pack
bun run types:check
bun run types:build
bun run types:pack
```

If you need the official browser, Node, or .NET wrapper assets while maintaining typings or examples, download them separately from the Netwrix Password Secure KIS portal: `https://license.passwordsafe.de/kis`. Do not commit those downloaded wrapper files back into this public repository.

## Repo Layout

- `skills/pws-api`
  Public installable skill.
- `packages/pws-sdk`
  Publishable high-level Bun and Node SDK for common integrations.
- `packages/pws-api`
  Publishable Bun and Node runtime package. Legacy wrapper files are optional unshipped maintainer reference inputs for parity and regeneration.
- `packages/pws-types`
  Publishable TypeScript declarations.
- `docs/passwordsafe`
  Created locally by `bun run docs:mirror` as a cache for the official HTML docs when rebuilding the bundled handbook set.
- `scripts`
  Docs mirror and handbook build helpers.

## License

MIT. See `LICENSE`.
