---
name: pws-api
description: Build applications, scripts, SDK integrations, and typings that communicate with the Netwrix Password Secure API. Use when Codex needs to create or update browser apps, Node/TypeScript apps, C#/.NET tools, PowerShell automations, API clients, payload mappers, or declaration files against Netwrix Password Secure.
---

# Netwrix Password Secure API

## Overview

Use this skill to build working integrations, not just maintain typings. Start from the bundled handbook set in this skill. For JavaScript work, prefer the browser runtime and injected globals first, then use a Node/CommonJS runtime only when the task is explicitly server-side. For .NET work, use the official SDK names and assemblies available in the target environment.

## Start Here

1. Read [`references/workflow.md`](references/workflow.md).
2. Read [`references/api-docs/index.md`](references/api-docs/index.md).
3. If the target is Node or TypeScript, read [`references/typescript.md`](references/typescript.md).
4. If the target is C# or .NET, read [`references/csharp.md`](references/csharp.md).
5. If the target is PowerShell, read [`references/powershell.md`](references/powershell.md).
6. Read [`references/examples.md`](references/examples.md) when you need concrete implementation patterns.
7. Read [`references/source-of-truth.md`](references/source-of-truth.md) when runtime behavior, docs, and existing types disagree.

## Rules

- Use public runtime names exactly as they are exposed by the target environment.
- Keep public spellings unchanged, including `progressToken`, `SearchContainersBrowserSsoList`, and `getTriggerObjektConfigList`.
- Prefer `window.PsrApi`, `window.PsrApiEnums`, and `window.PsrApiTypes` for browser-facing JavaScript work when the browser runtime is injected by the host environment.
- Use a Node/CommonJS runtime only when the target environment actually provides one.
- Use `@kmuip/pws-types` for TS compile-time shapes when available.
- For C#/.NET code, use the official SDK names from the docs and assembly surface rather than JS-oriented spellings.
- Start from the bundled handbook docs when no runtime assets or type package are available locally.
- Treat the published HTML docs as incomplete unless runtime behavior confirms the same surface.
- Keep undocumented payloads broad instead of inventing false precision.
- Prefer read-only validation when a live endpoint and credentials are available.

## Key Paths

- Bundled docs index: `references/api-docs/index.md`
- Browser runtime handbook: `references/api-docs/browser-runtime.md`
- Node runtime handbook: `references/api-docs/node-runtime.md`
- Implementation examples: `references/examples.md`
- TypeScript package: `@kmuip/pws-types`
