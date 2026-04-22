# Workflow

## Primary Steps

1. Identify the target runtime: browser JavaScript, Bun/Node TypeScript, C#/.NET, PowerShell, or low-level parity/package maintenance.
2. For browser JavaScript, start with `window.PsrApi`, `window.PsrApiEnums`, and `window.PsrApiTypes` if the host environment injects them.
3. For C#/.NET, start with the official SDK assemblies available in the target environment.
4. Read `references/api-docs/index.md` for the bundled handbook set.
5. Read `references/examples.md` if the user needs concrete implementation patterns instead of raw API reference.
6. For Bun or Node application work, start with `@kmuip/pws-sdk`.
7. Use `@kmuip/pws-api` only when the SDK does not cover the needed operation or you need manager-level parity behavior.
8. Use `@kmuip/pws-types` for exact compile-time shapes when TypeScript is in scope.
9. Confirm manager and method names from the runtime actually used by the target environment.
10. Validate any live probing with read-only calls only unless the user explicitly asks for write operations.
11. For browser write operations, check `references/live-ui-payloads.md` before assuming the current runtime package is browser-parity complete.

## Runtime Naming Rules

- Prefer runtime-exposed JavaScript names over renamed C# variants for browser or Node work.
- Keep odd runtime spellings unchanged, including `progressToken`, `SearchContainersBrowserSsoList`, and `getTriggerObjektConfigList`.
- Treat runtime-only managers as valid public surface for JavaScript and TypeScript even if the docs omit them.
- For C#/.NET code, do the opposite: use the official C# SDK member names from the docs and assembly surface.

## Build Order

1. For browser work, confirm whether the task should use `window.PsrApi`, `window.PsrApiEnums`, and `window.PsrApiTypes`.
2. For C#/.NET work, confirm whether the task should reference locally available SDK assemblies directly.
3. Find the manager, type, or method in the runtime surface used by the target environment or in the C# docs surface.
4. For Bun or Node application code, prefer the highest-level `@kmuip/pws-sdk` resource that fits the task.
5. If the SDK does not cover the task, drop down to `@kmuip/pws-api`.
6. If available, find the existing declaration in `@kmuip/pws-types`.
7. Check the bundled handbooks under `references/api-docs` for descriptions, signatures, and linked type names.
8. Write app code or type updates using the runtime-appropriate names.
9. Widen uncertain payload sections instead of fabricating exact fields.
