# Node Runtime

This handbook covers the Node/CommonJS entry point that mirrors the browser runtime surface.

- Node runtime: use the CommonJS bundle or package supplied by the target environment.
- CommonJS exports: `PsrApi`, `PsrApiEnums`, `PsrApiTypes`
- Use the browser, authentication, managers, data, and enums handbooks for the API surface details because the published SDK docs are not Node-specific.

```js
const { PsrApi, PsrApiEnums, PsrApiTypes } = require('path-or-package-provided-by-your-environment')
const api = new PsrApi(baseUrl)
```
