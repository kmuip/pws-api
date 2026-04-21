# Netwrix Password Secure Agent Toolkit

This repository packages two public deliverables for Netwrix Password Secure:

- `skills/pws-api`
  A self-contained agent skill for building Netwrix Password Secure integrations.
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

## Package The Types

```bash
bun install
bun run types:check
bun run types:build
```

Dry-run the published package:

```bash
bun run types:pack
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

4. Re-check and pack the type package before publishing:

```bash
bun run types:check
bun run types:build
bun run types:pack
```

If you need the official browser, Node, or .NET wrapper assets while maintaining typings or examples, download them separately from the Netwrix Password Secure KIS portal: `https://license.passwordsafe.de/kis`. Do not commit those downloaded wrapper files back into this public repository.

## Repo Layout

- `skills/pws-api`
  Public installable skill.
- `packages/pws-types`
  Publishable TypeScript declarations.
- `docs/passwordsafe`
  Created locally by `bun run docs:mirror` as a cache for the official HTML docs when rebuilding the bundled handbook set.
- `scripts`
  Docs mirror and handbook build helpers.

## License

MIT. See `LICENSE`.
