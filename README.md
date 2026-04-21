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
