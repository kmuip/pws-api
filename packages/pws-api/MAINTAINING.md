# Maintaining `@kmuip/pws-api`

## Reference Inputs

`packages/pws-api/legacy` is optional temporary reference input for:

- service and manager manifest extraction
- runtime enum extraction
- parity comparison against the official wrapper surface

It is not runtime code and it is not published to npm. It does not need to be present for normal builds as long as the generated artifacts are already checked in.

## Generated Artifacts

- `src/generated/forward-manifests.ts`
  Produced by `scripts/generate-forward-manifests.mjs`
- `src/generated/runtime-enums.ts`
  Produced by `scripts/generate-runtime-enums.mjs`
- `parity-manifest.json`
  Produced by `scripts/generate-parity-manifest.mjs`

## Refresh Workflow

When a newer official wrapper is available:

1. Paste the new official wrapper inputs under `legacy/`.
2. Regenerate the derived artifacts:

```bash
bun run check
bun run build
```

Or run the extractors directly:

```bash
node ./scripts/generate-forward-manifests.mjs
node ./scripts/generate-runtime-enums.mjs
node ./scripts/generate-parity-manifest.mjs
```

3. Compare the updated `parity-manifest.json`.
4. Update the native runtime where the new wrapper introduced surface changes.
5. Re-run:

```bash
bun run check
bun run build
bun publish --dry-run --access public
```

## Rules

- Do not import files from `legacy/` in `src/`.
- Do not add new runtime compatibility shims that depend on `legacy/`.
- Keep `legacy/` as a verification source only.
- Remove `legacy/` again after the parity work is done unless you intentionally want to keep it locally.
- If a generated file becomes stable and manually maintainable, prefer checking it in directly and reducing generator complexity.
- Keep `PARITY-NOTES.md` current when live browser behavior diverges from the runtime package.
