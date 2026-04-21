# CSharp

## Goal

Build .NET applications and tools that reference the official Netwrix Password Secure SDK assemblies supplied by the target environment.

## Use These Inputs

1. `references/api-docs`
2. `references/examples.md`
3. The official Netwrix Password Secure SDK assemblies available in the target environment
4. Optional SDK downloads from `https://license.passwordsafe.de/kis`

## Typical Flow

1. Reference the official `PsrApi.dll` provided by your Netwrix Password Secure installation or SDK bundle, and keep its sibling assemblies available for runtime resolution.
2. Use the bundled handbooks under `references/api-docs` because the published docs are C#-shaped and map naturally to the DLL surface.
3. Build against the official C# class and member names from the docs and assembly surface.
4. Use JavaScript-oriented guidance only when you need to compare browser or Node behavior against the underlying SDK concepts.
5. Prefer read-only inspection calls before writing code that mutates server state.
6. Reuse the PowerShell DLL examples in `references/examples.md` as SDK usage patterns, then translate `task.Wait()` to `await`.

## Mapping Rules

- For C# work, use the official SDK naming from the docs and `PsrApi.dll`.
- Do not force JS-oriented spellings like `authenticationManagerV2` or `progressToken` into C# code.
- Keep DTO field names aligned with the published API contracts.
- When a type is ambiguous, prefer the bundled docs over inferred JavaScript shapes because the docs are authored around the .NET SDK.

## Project Notes

- Keep the SDK DLL set together so runtime resolution works the same way it does in the Netwrix Password Secure installation.
- Prefer the DLLs that match the target Netwrix Password Secure deployment rather than restoring an unrelated NuGet package.
- Treat the published docs and the target environment's DLL set as the canonical source for C# integrations.
