# Examples

This file bundles practical Netwrix Password Secure integration patterns in a framework-agnostic form.

## Bun Or Node Runtime Package

For server-side integrations, prefer the published SDK package when it is available.

```ts
import { PsrApiEnums } from '@kmuip/pws-api'
import { createPwsSdk } from '@kmuip/pws-sdk'

const sdk = await createPwsSdk({
  url: 'https://pass.example.com/api/',
  auth: {
    type: 'apiKey',
    apiKey: process.env.API_KEY!,
  },
})

const tag = await sdk.tags.create({ name: 'shared' })

const password = await sdk.passwords.create({
  organisationUnitId: '00000000-0000-0000-0000-000000000001',
  name: 'Example Account',
  username: 'demo',
  password: 'correct horse battery staple',
  tagIds: [tag.id],
})

const document = await sdk.documents.create({
  organisationUnitId: '00000000-0000-0000-0000-000000000001',
  name: 'Runbook',
  filePath: './runbook.docx',
  isLink: false,
})

const recentLogins = await sdk.logbook.list({
  datePreset: 'last7d',
  onlyWithInfo: true,
  pageSize: 10,
  sortBy: 'timestampUtc',
  sortDirection: 'desc',
})

const generated = await sdk.passwordGeneration.generate({
  mode: 'phonetic',
  length: 20,
  syllableCount: 4,
})

const allowedDocumentTypes = await sdk.optionValues.getAllowedDocumentTypes()
const smtpConfigured = await sdk.mailing.isSmtpConfigured()
const bindings = await sdk.dataBindingsSdk.listByData(password.id)
const adProfiles = await sdk.activeDirectorySync.listProfiles()

const subscription = sdk.subscriptions.onSessionClosed(() => {})
subscription.unsubscribe()

const nextRoleChange = await sdk.subscriptions.onceRoleChanged({
  timeoutMs: 30_000,
})

console.log(nextRoleChange.role.Id)

const role = await sdk.roles.getByName('Administrator')

if (role) {
  await sdk.rights.grant({
    dataId: password.id,
    legitimateId: role.id,
    rights: PsrApiEnums.PsrRights.RightRead,
  })

  const formTarget = await sdk.predefinedRights.findTarget('<ou-id>', {
    dataType: PsrApiEnums.PsrEntityObjectType.EntityObjectTypePassword,
    name: 'A1',
  })

  await sdk.predefinedRights.set({
    dataId: '<ou-id>',
    legitimateId: role.id,
    rights: PsrApiEnums.PsrRights.RightRead,
    dataType: formTarget?.dataType ?? null,
    targetId: formTarget?.targetId ?? null,
  })
}

const [testUser] = await sdk.users.list({
  username: 'test',
  pageSize: 1,
})

if (testUser) {
  const legitimates = [
    {
      legitimateId: sdk.raw.currentUser!.Id,
      type: 'user' as const,
      canRelease: true,
      obligatory: true,
    },
    {
      legitimateId: testUser.id,
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
}

await sdk.logout()
```

Use `sdk.raw` only when you need exact parity objects or session internals. Most manager surfaces are available directly on the SDK now, for example:

```ts
const smtpConfigured = await sdk.mailing.isSmtpConfigured()
const policies = await sdk.policies.getPolicies()
const accessRights = sdk.apiKeys.getAccessRights(process.env.API_KEY!)
```

## Session Sharing

Use a forked session bundle when another SDK client or browser-side helper should reuse an existing authenticated session.

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

## Microsoft / OIDC Login

For OIDC-backed users, first ask the server for the provider login URL, then hand the callback fragment back to the SDK.

```ts
import { beginPwsOidcLogin } from '@kmuip/pws-sdk'

const login = await beginPwsOidcLogin('https://pass.example.com/api/', {
  database: 'pg',
  username: 'lukas.zbinden@example.com',
  redirectUrl: 'https://app.example.com/auth/callback',
})

// Open login.loginUrl in a browser and wait for the redirect back to your callback URL.
const callbackUrl =
  'https://app.example.com/auth/callback#code=...&state=...&session_state=...'

const sdk = await login.complete(callbackUrl)
```

## Bun Or Node Runtime Layer

When you need the raw parity-oriented manager surface, use `@kmuip/pws-api` directly.

```ts
import { PsrApi } from '@kmuip/pws-api'

const api = new PsrApi('https://pass.example.com/api/')
await api.authenticationManagerV2.loginWithApiKey(process.env.API_KEY!)

const currentUser = await api.organisationUnitManager.getCurrentOrganisationUnit()

await api.authenticationManagerV2.logout()
```

## Browser SDK Bootstrap

Use the browser runtime through the injected globals and wrap it in a small factory that your app can call from any framework.

```ts
export function createBrowserPsrApi(apiUrl: string) {
  const psrApi = new (window as any).PsrApi(apiUrl)
  const psrApiEnums = (window as any).PsrApiEnums
  const psrApiTypes = (window as any).PsrApiTypes

  return {
    psrApi,
    psrApiEnums,
    psrApiTypes,
  }
}
```

## Browser API Key Login

Keep login thin. Authenticate through `authenticationManagerV2`, then persist only what the app needs.

```ts
async function login(api: any, apiKey: string) {
  await api.authenticationManagerV2.loginWithApiKey(apiKey)
  localStorage.setItem('pws_api_key', apiKey)
}

async function logout(api: any) {
  try {
    await api.authenticationManagerV2.logout()
  } finally {
    localStorage.removeItem('pws_api_key')
  }
}
```

## Browser Or Node Runtime Facade

Not every app uses the browser global directly. Another valid pattern is to pass in the runtime constructor and enums from your deployment environment and build a thin app-specific facade around them.

```ts
type PsrRuntime = {
  PsrApi: new (url: string) => any
  PsrApiEnums: unknown
}

export const createPsrApiClient = (runtime: PsrRuntime, url: string, db: string) => {
  const psrApi = new runtime.PsrApi(url)

  const login = async (username: string, password: string) => {
    await psrApi.authenticationManager.login(db, username, password)
  }

  return { psrApi, login, enums: runtime.PsrApiEnums }
}
```

Use this pattern when:
- you want one reusable facade for app code
- you need to run Netwrix Password Secure calls behind a server endpoint instead of exposing direct browser login everywhere
- you provide the runtime bundle through app configuration instead of relying on `window.PsrApi`

## Browser Write Parity Warning

For browser write operations, do not assume the package runtime and the web app are using the same endpoints.

Current observed examples:
- password container create in the web app uses `AddContainerV2`
- user create in the web app uses `AddOrganisationUnitUser2`
- OU create in the web app uses `AddOrganisationUnitGroup`

If a write flow fails in the runtime package but works in the browser UI, compare against `references/live-ui-payloads.md` before widening types or changing app code.

## Browser Session Restore

Some apps persist the authenticated connection payload and restore it with `setSession()` instead of logging in on every route load.

```ts
async function restoreSessionFromStorage(api: any) {
  const raw = localStorage.getItem('pws_data')
  if (!raw) return false

  const parsed = JSON.parse(raw)
  await api.authenticationManagerV2.setSession(
    parsed.connection,
    parsed.Keys,
  )

  return true
}
```

Representative payload shape:

```ts
const pwsData = {
  connection: {
    Database: '<database>',
    SessionId: '<session-id>',
    SessionKey: '<session-key>',
  },
  Keys: [
    { id: '<legitimate-id>', privateKey: '<xml-or-string-key>' },
  ],
}
```

## Browser OU Tree Loading

`getOrganisationUnitStructure()` returns a flat structure list with nested child references. Build a map by `OrganisationUnit.Id`, then resolve children by ID.

```ts
async function fetchOrganisationUnits(api: any) {
  const structures = Array.from(
    await api.organisationUnitManager.getOrganisationUnitStructure({}),
  )

  const map = new Map(structures.map((s) => [s.OrganisationUnit.Id, s]))
  const roots = structures.filter((s) => {
    const parentId = s.OrganisationUnit.ParentDataBindings?.[0]?.ParentDataId
    return !parentId || !map.has(parentId)
  })

  return { structures, roots, map }
}
```

## Browser Container Search And Decrypt

Fetch password containers either globally or per OU. Decrypt only the password-like items.

```ts
async function listPasswords(api: any, enums: any, filter = {}) {
  return api.containerManager.getContainerList(
    enums.PsrContainerType.Password,
    filter,
  )
}

async function readContainerSecrets(api: any, container: any) {
  const items = container.Items ?? []

  for (const item of items) {
    switch (item.ContainerItemType) {
      case 1:
        item.PlainTextValue = await api.containerManager.decryptContainerItem(
          item,
          'Skill example',
        )
        break
    }
  }

  return container
}
```

## Browser Form Clone And Add

A stable flow for creating new password containers:

1. Clone an existing form with `cloneContainer(formId)` or initialize a fresh password container with `initContainer()`.
2. Create missing items with `initContainerItem(containerItemType)`.
3. Assign `PlainTextValue`, `Value`, `ValueBool`, `ValueInt`, `ValueDecimal`, or `ValueDateUtc` based on the item type.
4. Persist the finished container with `addContainer(container, ouId, null, null)`.

Minimal example:

```ts
async function addPasswordFromTemplate(api: any, formId: string, ouId: string) {
  const container = await api.containerManager.cloneContainer(formId)
  const passwordItem = container.Items.find((item: any) => item.Name === 'Password')

  if (passwordItem) {
    passwordItem.PlainTextValue = 'example-secret'
  }

  return api.containerManager.addContainer(container, ouId, null, null)
}
```

## PowerShell DLL Login And Logout

Use the C# SDK from PowerShell rather than raw REST calls when the official SDK assemblies are available.

```powershell
Add-Type -Path ".\\PsrApi.dll"

function Connect-PsrApi {
    param(
        [string]$ApiKey,
        [string]$ServerUrl
    )

    $psrApi = New-Object PsrApi.PsrApi($ServerUrl)
    $authTask = $psrApi.AuthenticationManagerV2.LoginWithApiKey($ApiKey)
    $authTask.Wait()

    if ($authTask.IsFaulted) {
        throw $authTask.Exception
    }

    return $psrApi
}

function Disconnect-PsrApi {
    param([PsrApi.PsrApi]$PsrApi)

    $logoutTask = $PsrApi.AuthenticationManagerV2.Logout()
    $logoutTask.Wait()
}
```

## PowerShell Interactive V9 Authentication Flow

Use `AuthenticationManagerV2.StartNewAuthentication()` when API-key login is not the right fit and you need the v9 interactive auth flow.

```powershell
$authenticationFlow = $psrApi.AuthenticationManagerV2.StartNewAuthentication($db, $username)
$startLoginTask = $authenticationFlow.StartLogin()
$startLoginTask.Wait()

$requirement = $authenticationFlow.GetNextRequirement()
$selectedRequirement = $requirement.PossibleRequirements[0]

foreach ($field in $selectedRequirement.Fields) {
    $field.Value = $password
}

$authenticateTask = $authenticationFlow.Authenticate($selectedRequirement)
$authenticateTask.Wait()
```

Important notes:
- v8 uses `AuthenticationManager.Login(db, username, password)`.
- v9 uses `AuthenticationManagerV2`.
- MFA may require multiple `GetNextRequirement()` and `Authenticate()` rounds instead of a single password field assignment.
- If you load both v8 and v9 `PsrApi.dll` versions in the same PowerShell process, start a fresh shell before switching versions.

## PowerShell OU Hierarchy Export

```powershell
function Get-OUHierarchy {
    param([PsrApi.PsrApi]$PsrApi)

    $filter = New-Object PsrApi.Data.PsrListFilter
    $task = $PsrApi.OrganisationUnitManager.GetOrganisationUnitStructure($filter)
    $task.Wait()

    if ($task.IsFaulted) {
        throw $task.Exception
    }

    return $task.Result
}
```

Flatten the returned hierarchy into path strings like `Root/Child/SubChild` when you need CSV exports or OU-path-based matching.

## PowerShell Role And Template Filters

Repeatedly construct typed filter objects instead of sending plain hashtables.

```powershell
$search = New-Object PsrApi.Data.PsrListFilterObjectContent
$search.ExactSearch = $true
$search.FilterActive = $true
$search.Search = $Name

$group = New-Object PsrApi.Data.PsrListFilterGroupContent
$group.SearchList.Add($search)

$filter = New-Object PsrApi.Data.PsrListFilter
$filter.FilterGroups.Add($group)

$task = $PsrApi.RoleManager.GetRoleList($filter)
$task.Wait()
$roles = $task.Result
```

Use the same pattern for OU searches and other list endpoints that expect `PsrListFilter`-based arguments.

## PowerShell Trigger Config Read

This is the smallest useful example for password notification or trigger inspection work.

```powershell
$triggerTask = $psrApi.TriggerManager.GetTriggerConfigList($passwordId)
$triggerTask.Wait()
$triggerConfigList = $triggerTask.Result
```

Use this when you need:
- notification config inspection
- trigger migration scripts
- preflight checks before changing trigger-related settings

## PowerShell Password Containers In One OU

```powershell
$ouFilterObject = New-Object PsrApi.Data.PsrListFilterObjectOrganisationUnit
$ouFilterObject.FilterActive = $true
$ouFilterObject.IncludeSubOrganisationUnit = $false
$ouFilterObject.SelectedOrganisationUnitId = $OUId

$ouFilterGroup = New-Object PsrApi.Data.PsrListFilterGroupOrganisationUnit
$ouFilterGroup.OrganisationUnitFilter = $ouFilterObject

$containerFilter = New-Object PsrApi.Data.PsrContainerListFilter
$containerFilter.FilterGroups.Add($ouFilterGroup)

$task = $PsrApi.ContainerManager.GetContainerList(
    [PsrApi.Data.Enums.PsrContainerType]::Password,
    $containerFilter
)
$task.Wait()
$containers = $task.Result
```

## PowerShell Bulk Field Migration

This is a practical update pattern for form-based password containers:

1. Load the target form and all password containers based on that form.
2. Verify the expected old and new fields exist before changing anything.
3. Copy the old value into the new field via `PlainTextValue`.
4. Persist each changed container with `UpdateContainer()`.

Minimal shape:

```powershell
$passwordOldItem = $container.Items | Where-Object { $_.Name -eq $oldField }
$passwordItem = $container.Items | Where-Object { $_.Name -eq $newField }

if ($null -ne $passwordItem -and $null -ne $passwordOldItem) {
    $passwordItem.PlainTextValue = $passwordOldItem.Value
    $updateTask = $psrApi.ContainerManager.UpdateContainer($container)
    $updateTask.Wait()
}
```

Use `PlainTextValue` for password-like fields so the SDK re-encrypts correctly during update.

## Server-Side API In Between

A common architecture is to expose your own application endpoint, validate your caller, then perform Netwrix Password Secure operations behind that server endpoint.

Flow used there:

1. Validate an app-specific `Authorization` header.
2. Read local config for Netwrix Password Secure URL, database, credentials, target OU, and template.
3. Authenticate to Netwrix Password Secure inside the server handler.
4. Resolve OU and template.
5. Build container items from the incoming payload.
6. Add the container and apply tags.

Minimal shape:

```ts
const { login, findOu, findTemplate, addContainer, setTags } = usePsrApi(url, db)

const isLoggedIn = await login(username, password)
if (!isLoggedIn) {
  throw createError({ statusCode: 403, statusMessage: 'PWS login failed' })
}

const ou = await findOu(ouName)
const template = await findTemplate(templateName)
const container = await addContainer(ou.OrganisationUnit.Id, template.Id, containerItems)

if (tags?.length) {
  await setTags(tags, container.Id)
}
```

This pattern matters because many production apps should not expose raw Netwrix Password Secure credentials or unrestricted SDK access directly to the browser.

## Notes For CSharp

The PowerShell examples above are SDK examples in disguise because they directly consume `PsrApi.dll`. For C#:

- Keep the same SDK class names and method names as the PowerShell examples.
- Translate `task.Wait()` patterns into idiomatic `await`.
- Use the bundled handbooks for DTOs and signatures.
