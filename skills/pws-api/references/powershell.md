# PowerShell

## Goal

Build PowerShell scripts and modules that call Netwrix Password Secure endpoints or SDK-equivalent flows without inventing a second schema system.

## Approach

- Use `@kmuip/pws-types` as the canonical shape reference when TypeScript declarations are available.
- Fall back to `references/api-docs` when the type package is not available in the current workspace.
- Use `references/examples.md` for SDK login, OU export, and typed filter construction patterns.
- Translate TS object shapes directly into hashtables or `PSCustomObject` values.
- Preserve original API field names and casing.
- Prefer read-only inspection calls before writing functions that mutate server state.

## Mapping Rules

- TS object type -> hashtable or `PSCustomObject`
- TS union of literals or enum constant set -> validate with `ValidateSet` only when the allowed values are known with confidence
- `Record<string, unknown>` -> hashtable with permissive shape
- ISO date strings -> plain strings unless the API consumer explicitly needs `[datetime]`

## Typical Flow

1. Identify the manager and method from the bundled handbooks or the runtime surface exposed by the target environment.
2. Inspect the corresponding data type in `@kmuip/pws-types` when building request bodies.
3. Build a small wrapper function around `Invoke-RestMethod` or your HTTP client of choice.
4. Serialize only fields confirmed by the runtime or docs.
5. Keep optional fields absent instead of sending guessed nulls.

## Output Style

- Show one concrete request object.
- Show one representative response object.
- Note which fields are confirmed and which remain open-ended.
