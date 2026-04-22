# Source Of Truth

## Use These Inputs In Order

1. `references/api-docs`
   Self-contained bundled markdown handbooks generated from the published docs.
2. `@kmuip/pws-sdk`
   Preferred Bun and Node package for common application and automation flows when it is available in the workspace.
3. `@kmuip/pws-api`
   Low-level Bun and Node runtime package when you need the raw manager surface or parity-oriented behavior.
4. `@kmuip/pws-types`
   Declaration package for compile-time shapes when it is available.
5. Browser runtime globals
   `window.PsrApi`, `window.PsrApiEnums`, and `window.PsrApiTypes` when the host environment injects them.
6. Node/CommonJS runtime package or vendored bundle
   Use this when the target environment exposes Netwrix Password Secure outside the browser.
7. Official .NET SDK assemblies
   Use `PsrApi.dll` and its sibling assemblies from the target environment for C# integrations.
8. Optional official wrapper downloads
   If you need local browser, Node, or .NET runtime artifacts for verification, obtain them from `https://license.passwordsafe.de/kis`.
9. `references/live-ui-payloads.md`
   Use this for browser-observed write payloads when the live web app is the clearest source of truth.

## Do Not Assume

- Do not assume the public docs are complete.
- Do not rename JavaScript runtime methods to match C# casing.
- Do not invent payload shapes when the runtime only guarantees `Record<string, unknown>`.
- Do not collapse runtime-level distinctions between authentication flows, progress tokens, realtime events, and container operations.
- Do not force JavaScript naming into C#/.NET code that consumes `PsrApi.dll`.
- Do not assume the current runtime package is browser-parity complete for write operations just because the method names exist.

## For Application Work

- Use `@kmuip/pws-sdk` first for common Bun or Node application work.
- Use the declaration package to discover available types and manager names.
- Use the actual runtime exposed by the target environment to confirm the callable surface.
- Use the live web app payload reference for browser-side create and update flows.
- Use `PsrApi.dll` plus the bundled docs for C#/.NET surface confirmation.
- Use the bundled handbooks to recover descriptions and grouped model names.

## Typical Requests This Skill Should Handle

- “Build a TypeScript script that authenticates with an API key and lists containers.”
- “Build a C# console app that references `PsrApi.dll` and authenticates against Netwrix Password Secure.”
- “Add missing typings for a new Netwrix Password Secure runtime manager.”
- “Generate PowerShell payload examples from the current type package.”
- “Check whether a docs page and the runtime disagree.”
