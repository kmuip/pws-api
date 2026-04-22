# `@kmuip/pws-sdk`

High-level Bun and Node SDK for Netwrix Password Secure.

This package sits on top of `@kmuip/pws-api` and turns verbose manager-level interactions into simpler resource clients for:

- password containers
- form-based container creation
- document containers and uploads
- tags
- organisation units
- roles
- rights
- predefined rights
- seals
- users
- logbook
- template groups and template operations
- trigger alerts and trigger config reads

It also exposes first-class SDK access to the broader manager surface for:

- options and policies
- Active Directory
- data bindings
- forwarding rules
- license and SMTP checks
- progress tokens and realtime events
- API key inspection
- password and OTP helper utilities
- generic rights and external links

It also keeps the underlying parity client available as `sdk.raw`.

## Install

```bash
bun add @kmuip/pws-sdk
```

```bash
npm install @kmuip/pws-sdk
```

## Authenticate

API key:

```ts
import { createPwsSdk } from '@kmuip/pws-sdk'

const sdk = await createPwsSdk({
  url: 'https://pass.example.com/api/',
  auth: {
    type: 'apiKey',
    apiKey: process.env.API_KEY!,
  },
})
```

Username and password:

```ts
const sdk = await createPwsSdk({
  url: 'https://pass.example.com/api/',
  auth: {
    type: 'password',
    database: 'testapi2',
    username: process.env.ADMIN_USERNAME!,
    password: process.env.ADMIN_PASSWORD!,
  },
})
```

Username, password, and OTP:

```ts
import * as OTPAuth from 'otpauth'

const totp = new OTPAuth.TOTP({
  secret: process.env.TEST_OTP_SECRET!,
})

const sdk = await createPwsSdk({
  url: 'https://pass.example.com/api/',
  auth: {
    type: 'password',
    database: 'testapi2',
    username: process.env.TEST_USERNAME!,
    password: process.env.TEST_PASSWORD!,
    otp: () => totp.generate(),
  },
})
```

Microsoft / OIDC login:

```ts
import { beginPwsOidcLogin } from '@kmuip/pws-sdk'

const login = await beginPwsOidcLogin('https://pass.example.com/api/', {
  database: 'pg',
  username: 'lukas.zbinden@example.com',
  redirectUrl: 'https://app.example.com/auth/callback',
})

// Open login.loginUrl in a browser and capture the final callback URL in the
// same process that started the flow. Netwrix Password Secure uses
// response_mode=fragment, so the authorization code comes back in the URL
// fragment.
const callbackUrl =
  'https://app.example.com/auth/callback#code=...&state=...&session_state=...'

const sdk = await login.complete(callbackUrl)
```

Fork and adopt an existing session:

```ts
import { createPwsSdk, createPwsSdkFromSession } from '@kmuip/pws-sdk'

const source = await createPwsSdk({
  url: 'https://pass.example.com/api/',
  auth: {
    type: 'password',
    database: 'testapi2',
    username: process.env.ADMIN_USERNAME!,
    password: process.env.ADMIN_PASSWORD!,
  },
})

const bundle = await source.sessions.fork()

const adopted = await createPwsSdkFromSession('https://pass.example.com/api/', bundle)
```

Export and adopt extension-style credential data:

```ts
import { createPwsSdk, createPwsSdkFromCredentialData } from '@kmuip/pws-sdk'

const source = await createPwsSdk({ url: 'https://pass.example.com/api/', auth: /* ... */ })
const credentialData = await source.sessions.exportCredentialData()

const adopted = await createPwsSdkFromCredentialData(
  'https://pass.example.com/api/',
  credentialData,
)
```

## Common Usage

Create a password:

```ts
const tags = await sdk.tags.ensure(['production', 'shared'])

const password = await sdk.passwords.create({
  organisationUnitId: '00000000-0000-0000-0000-000000000001',
  name: 'Example Account',
  username: 'demo',
  password: 'correct horse battery staple',
  url: 'https://example.com',
  notes: 'Created through the SDK',
  tagIds: tags.map((tag) => tag.id),
})
```

Read secrets:

```ts
const secret = await sdk.passwords.getSecret(password.id, 'Maintenance task')
console.log(secret.password)
```

Reveal only the password value:

```ts
const passwordValue = await sdk.passwords.reveal(password.id, 'Ticket resolution')
```

Create a password from an existing form:

```ts
const forms = await sdk.passwords.listForms({ search: 'A1', pageSize: 10 })
const form = forms[0]

const created = await sdk.passwords.createFromForm({
  organisationUnitId: '<ou-id>',
  formId: form.id,
  name: 'Created From Form',
  username: 'demo',
  password: 'correct horse battery staple',
})
```

Get tags:

```ts
const tags = await sdk.tags.list({
  search: 'prod',
  sortBy: 'name',
  sortDirection: 'asc',
})
```

Upload a document:

```ts
const document = await sdk.documents.create({
  organisationUnitId: '<ou-id>',
  name: 'Runbook',
  filePath: './runbook.docx',
  isLink: false,
})
```

Inspect the allowed document types configured on the server:

```ts
const allowedTypes = await sdk.documents.getAllowedTypes()

console.log(allowedTypes.source) // 'server' or 'default'
console.log(allowedTypes.allowed) // ['png', 'pdf', 'docx', ...]
```

Create a link document:

```ts
const linkDocument = await sdk.documents.create({
  organisationUnitId: '<ou-id>',
  name: 'Operations Portal',
  path: 'https://example.com/runbook',
  documentType: '.url',
  isLink: true,
})
```

Document create/update calls now fail before upload if the requested extension is not allowed by the configured `AllowedDocumentTypes` option on the server.

Access the long-tail manager surface through first-class SDK properties when you need lower-level admin features without dropping to `sdk.raw`:

```ts
const smtpConfigured = await sdk.mailing.isSmtpConfigured()
const policies = await sdk.policies.getPolicies()
const currentRights = await sdk.rights.getCurrentConnection(password.id)
const otp = await sdk.oneTimePasswords.generateGoogleAuthenticatorOtpAsPromise('BASE32SECRET')
```

Session-sharing helpers are available through `sdk.sessions`. By default, the SDK forks sessions for a `WebClient` target so the adopted session works against the normal `WebService` endpoints. Use `exportCredentialData()` when you want a payload closer to the browser extension’s cross-client credential exchange.

For OIDC logins, always supply a redirect URL. The live `pass.kmupartnergroup.ch` flow rejects `GetFirstAuthentication` without one for users that authenticate through Microsoft.

Use `beginPwsOidcLogin()` for real logins. The OIDC callback must be completed in the same auth session that generated the provider login URL, so a detached `preparePwsOidcLogin()` call is only safe for preflight/introspection.

Create and update a seal:

```ts
import { PsrApiEnums } from '@kmuip/pws-api'

const testUser = await sdk.users.list({
  username: 'test',
  pageSize: 1,
})

const legitimates = [
  {
    legitimateId: sdk.raw.currentUser!.Id,
    type: 'user' as const,
    canRelease: true,
    obligatory: true,
  },
  {
    legitimateId: testUser[0].id,
    type: 'user' as const,
    sealedFor: true,
  },
]

const seal = await sdk.seals.create({
  dataId: password.id,
  dataType: PsrApiEnums.PsrEntityObjectType.EntityObjectTypePassword,
  name: `Seal for password "${password.name}"`,
  requiredReleases: 1,
  breakRunTime: 72,
  releaseRunTime: 72,
  legitimates,
})

await sdk.seals.update(seal.id, {
  dataId: password.id,
  dataType: PsrApiEnums.PsrEntityObjectType.EntityObjectTypePassword,
  name: `Seal for password "${password.name}"`,
  description: 'Updated through the SDK',
  requiredReleases: 1,
  breakRunTime: 48,
  releaseRunTime: 48,
  legitimates,
})
```

If you update a seal in a fresh SDK session, pass `legitimates` and `name` again so the SDK can regenerate the full seal payload the server expects.

Get logbook entries in a date range:

```ts
import { PsrApiEnums } from '@kmuip/pws-api'

const entries = await sdk.logbook.list({
  dateFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  dateTo: new Date(),
  events: [
    PsrApiEnums.PsrLogbookEvent.PsrLogbookEventLogin,
    PsrApiEnums.PsrLogbookEvent.PsrLogbookEventLogout,
  ],
  pageSize: 20,
  sortBy: 'timestampUtc',
  sortDirection: 'desc',
})
```

Use the additional ergonomic helpers for options, generation, data bindings, Active Directory, and realtime subscriptions:

```ts
const generated = await sdk.passwordGeneration.generate({
  mode: 'phonetic',
  length: 20,
  syllableCount: 4,
})

const allowedDocumentTypes = await sdk.optionValues.getAllowedDocumentTypes()
const smtpConfigured = await sdk.mailing.isSmtpConfigured()
const bindings = await sdk.dataBindingsSdk.listByData('<data-id>')
const adProfiles = await sdk.activeDirectorySync.listProfiles()

const subscription = sdk.subscriptions.onSessionClosed(() => {
  console.log('session closed')
})

const nextContainerChange = await sdk.subscriptions.onceContainerChanged({
  timeoutMs: 30_000,
})

console.log(nextContainerChange.container.Id)

subscription.unsubscribe()
```

Applications can be detached from all organisation units through the SDK:

```ts
await sdk.applications.detachEverywhere('<application-id>')
```

## Current API Limits

Some operations are still unavailable because the current Netwrix Password Secure API surface does not expose a supported method for them.

At the moment this includes:

- true application delete
- role membership writes such as add/remove user to role
- bin restore or recover operations

The SDK does not fake these operations. When the underlying API exposes them cleanly in a future version, they can be added as first-class SDK methods.

## Filtering

The SDK exposes app-focused filter DTOs instead of raw `PsrListFilter` objects.

### Passwords

```ts
const passwords = await sdk.passwords.list({
  organisationUnitId: '<ou-id>',
  includeSubOrganisationUnits: true,
  search: 'sample',
  username: 'admin',
  tagIds: ['<tag-a>', '<tag-b>'],
  matchAllTags: false,
  sortBy: 'name',
  sortDirection: 'asc',
  page: 0,
  pageSize: 25,
})
```

Supported fields:
- `ids`
- `organisationUnitId`
- `includeSubOrganisationUnits`
- `search`
- `name`
- `username`
- `url`
- `notes`
- `tagIds`
- `matchAllTags`
- `page`
- `pageSize`
- `sortBy`
- `sortDirection`

### Tags

```ts
const tags = await sdk.tags.list({
  ids: ['<tag-id>'],
  names: ['production'],
  search: 'prod',
  color: '#ff0000',
  systemTag: false,
  sortBy: 'name',
})
```

Tag usage:

```ts
const usage = await sdk.tags.getUsage({
  search: 'prod',
  minCount: 1,
  usedFrom: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
})
```

### Users

```ts
const users = await sdk.users.list({
  parentId: '<ou-id>',
  search: 'admin',
  username: 'admin',
  email: '@example.com',
  restrictiveUser: false,
  isDeactivated: false,
  sortBy: 'username',
  pageSize: 20,
})
```

### Organisation Units

```ts
const organisationUnits = await sdk.organisationUnits.list({
  search: 'customer',
  parentId: '<parent-ou-id>',
  sortBy: 'name',
  pageSize: 50,
})
```

Read and update a group:

```ts
const group = await sdk.organisationUnits.get('<ou-id>')

await sdk.organisationUnits.updateGroup(group.id, {
  name: 'Customer 1',
  description: 'Managed by SDK',
})
```

### Roles

```ts
const role = await sdk.roles.getByName('Administrator')
```

### Rights

```ts
import { PsrApiEnums } from '@kmuip/pws-api'

const rights = await sdk.rights.list('<data-id>')

await sdk.rights.grant({
  dataId: '<data-id>',
  legitimateId: '<role-or-user-id>',
  rights: PsrApiEnums.PsrRights.RightRead,
})

await sdk.rights.batch([
  {
    itemType: 'update',
    dataId: '<data-id>',
    legitimateId: '<role-or-user-id>',
    rights: PsrApiEnums.PsrRights.RightRead,
  },
])
```

### Predefined Rights

Fetch the predefined-right target tree for an OU:

```ts
const tree = await sdk.predefinedRights.getTargetTree('<ou-id>')
```

Resolve a deeper target such as a specific password form and set a predefined right on it:

```ts
import { PsrApiEnums } from '@kmuip/pws-api'

const formTarget = await sdk.predefinedRights.findTarget('<ou-id>', {
  dataType: PsrApiEnums.PsrEntityObjectType.EntityObjectTypePassword,
  name: 'A1',
})

await sdk.predefinedRights.set({
  dataId: '<ou-id>',
  legitimateId: '<role-id>',
  rights: PsrApiEnums.PsrRights.RightRead,
  dataType: formTarget?.dataType ?? null,
  targetId: formTarget?.targetId ?? null,
})
```

List the predefined rights already configured for a target:

```ts
const entries = await sdk.predefinedRights.list({
  dataId: '<ou-id>',
  dataType: PsrApiEnums.PsrEntityObjectType.EntityObjectTypePassword,
  targetId: '<form-id>',
})
```

### Logbook

```ts
const logbook = await sdk.logbook.list({
  dataId: '<data-id>',
  organisationUnitId: '<ou-id>',
  search: 'admin',
  onlyWithInfo: true,
  datePreset: 'last7d',
  clientUser: 'DOMAIN\\\\user',
  clientIpAddress: '10.0.',
  sortBy: 'timestampUtc',
  sortDirection: 'desc',
  pageSize: 50,
})
```

Supported logbook date presets:
- `last24h`
- `last7d`
- `last30d`
- `today`
- `yesterday`
- `thisWeek`
- `thisMonth`

## Additional Resources

Password history:

```ts
const history = await sdk.passwords.history('<container-id>')
```

Template groups:

```ts
const groups = await sdk.templates.listGroups({
  organisationUnitId: '<ou-id>',
  search: 'default',
})
```

Default template group:

```ts
const templateGroupId = await sdk.templates.getDefaultGroupId('<ou-id>')
```

Create a template group and make it default:

```ts
const group = await sdk.templates.createGroup({
  name: 'Customer Default',
  organisationUnitId: '<ou-id>',
})

await sdk.templates.setDefaultGroup('<ou-id>', group.id)
```

Add predefined role rights and tags:

```ts
await sdk.templates.addRoleRights({
  dataId: '<data-id>',
  legitimateId: '<role-id>',
  rights: PsrApiEnums.PsrRights.RightRead,
  templateGroupId: '<template-group-id>',
})

await sdk.templates.addTags({
  dataId: '<data-id>',
  tagIds: ['<tag-id>'],
  templateGroupId: '<template-group-id>',
})
```

Trigger alerts:

```ts
const alerts = await sdk.triggers.listAlerts({
  read: false,
  datePreset: 'last7d',
  pageSize: 20,
})
```

Mark trigger alerts as read:

```ts
await sdk.triggers.markRead(alerts.map((alert) => alert.id), true)
```

## Escape Hatch

Use `sdk.raw` only when you need the exact parity object or session internals:

```ts
const filter = await sdk.raw.tagManager.getTagListFilter(true)
const tags = Array.from(await sdk.raw.tagManager.getTags(filter))
```

## Local Validation

Read-only live checks:

```bash
bun run live:smoke
bun run live:password-auth-smoke
bun run live:otp-auth-smoke
bun run live:filter-smoke
bun run live:atomic-smoke
```

For write validation in a disposable area, see [TESTING.md](./TESTING.md).

## Scope

- Bun and Node only in v1
- ESM only
- optimized for common app/admin flows
- keeps `sdk.raw` available for low-level parity work

## License

MIT
