# Workflow

## Primary Steps

1. Identify the target runtime: browser JavaScript, Node or TypeScript, C#/.NET, PowerShell, or type-package maintenance.
2. For browser JavaScript, start with `window.PsrApi`, `window.PsrApiEnums`, and `window.PsrApiTypes` if the host environment injects them.
3. For C#/.NET, start with the official SDK assemblies available in the target environment.
4. Read `references/api-docs/index.md` for the bundled handbook set.
5. Read `references/examples.md` if the user needs concrete implementation patterns instead of raw API reference.
6. Use `@kmuip/pws-types` for exact compile-time shapes when TypeScript is in scope.
7. Confirm manager and method names from the runtime actually used by the target environment.
8. Validate any live probing with read-only calls only unless the user explicitly asks for write operations.

## Runtime Naming Rules

- Prefer runtime-exposed JavaScript names over renamed C# variants for browser or Node work.
- Keep odd runtime spellings unchanged, including `progressToken`, `SearchContainersBrowserSsoList`, and `getTriggerObjektConfigList`.
- Treat runtime-only managers as valid public surface for JavaScript and TypeScript even if the docs omit them.
- For C#/.NET code, do the opposite: use the official C# SDK member names from the docs and assembly surface.

## Build Order

1. For browser work, confirm whether the task should use `window.PsrApi`, `window.PsrApiEnums`, and `window.PsrApiTypes`.
2. For C#/.NET work, confirm whether the task should reference locally available SDK assemblies directly.
3. Find the manager, type, or method in the runtime surface used by the target environment or in the C# docs surface.
4. If available, find the existing declaration in `@kmuip/pws-types`.
5. Check the bundled handbooks under `references/api-docs` for descriptions, signatures, and linked type names.
6. Write app code or type updates using the runtime-appropriate names.
7. Widen uncertain payload sections instead of fabricating exact fields.
