import type { PsrSessionToken } from '@kmuip/pws-types'
import { managerManifest, serviceManifest } from '../generated/forward-manifests.js'
import { hydrateResponse } from './hydration.js'
import { PsrHttpClient, type RuntimeSession } from './http.js'

type TouchCallback = ((methodName: string) => void) | null

type ServiceMethodName = keyof typeof serviceManifest

type ForwardServiceClient = Record<string, (...args: unknown[]) => Promise<unknown>> & {
  setTokens(
    authToken?: PsrSessionToken | null,
    csrfToken?: string | null,
    onTouched?: TouchCallback,
    apiKeyToken?: string | null,
  ): void
  addContainerV2(
    container: unknown,
    parentOrganisationUnitId?: string | null,
    rightInheritanceOptions?: unknown,
  ): Promise<unknown>
  getContainerItemWithSecretValue(itemId: string, reason: string): Promise<unknown>
  openSession(): Promise<unknown>
  closeSession(): Promise<unknown>
  forkSession(clientInstanceId: string, clientType: string, clientVersion: string): Promise<unknown>
}

function createPayload(
  payloadEntries: readonly (readonly [string, string])[],
  args: unknown[],
  argNames: readonly string[],
) {
  const byName = new Map(argNames.map((name, index) => [name, args[index]]))
  return Object.fromEntries(
    payloadEntries.map(([payloadKey, argumentName]) => [payloadKey, byName.get(argumentName)]),
  )
}

function createServiceMethod(
  httpClient: PsrHttpClient,
  runtimeSession: RuntimeSession,
  methodName: ServiceMethodName,
  onTouchedRef: { current: TouchCallback },
) {
  void runtimeSession
  const definition = serviceManifest[methodName]

  return async (...args: unknown[]) => {
    if (definition.payload.length === 0) {
      const value =
        definition.transport === 'getData'
          ? await httpClient.get('WebService', definition.endpoint, undefined, true)
          : await httpClient.post('WebService', definition.endpoint, {}, true)

      onTouchedRef.current?.(methodName)
      return value
    }

    const payload = createPayload(definition.payload, args, definition.args)
    const value =
      definition.transport === 'getData'
        ? await httpClient.get('WebService', definition.endpoint, payload, true)
        : await httpClient.post('WebService', definition.endpoint, payload, true)

    onTouchedRef.current?.(methodName)
    return value
  }
}

export function createWebServiceClient(
  httpClient: PsrHttpClient,
  runtimeSession: RuntimeSession,
  typeConstructors: Record<string, new () => object>,
): ForwardServiceClient {
  const onTouchedRef: { current: TouchCallback } = { current: null }
  const client = {} as ForwardServiceClient

  for (const methodName of Object.keys(serviceManifest) as ServiceMethodName[]) {
    const baseMethod = createServiceMethod(httpClient, runtimeSession, methodName, onTouchedRef)
    client[methodName] = async (...args: unknown[]) =>
      hydrateResponse(await baseMethod(...args), typeConstructors)
  }

  client.addContainerV2 = async (
    container: unknown,
    parentOrganisationUnitId?: string | null,
    rightInheritanceOptions?: unknown,
  ) =>
    hydrateResponse(
      await httpClient.post(
        'WebService',
        'AddContainerV2',
        {
          container,
          parentOrganisationUnitId: parentOrganisationUnitId ?? null,
          rightInheritanceOptions: rightInheritanceOptions ?? null,
        },
        true,
      ),
      typeConstructors,
    )

  client.getContainerItemWithSecretValue = async (itemId: string, reason: string) =>
    hydrateResponse(
      await httpClient.post(
        'WebService',
        'GetContainerItemWithSecretValue',
        { itemId, reason },
        true,
      ),
      typeConstructors,
    )

  client.setTokens = (authToken, csrfToken, onTouched, apiKeyToken) => {
    runtimeSession.authToken = authToken ?? null
    runtimeSession.csrfToken = csrfToken ?? null
    runtimeSession.apiKeyToken = apiKeyToken ?? null
    onTouchedRef.current = onTouched ?? null
  }

  return client
}

export function createMaintenanceServiceClient(
  httpClient: PsrHttpClient,
  runtimeSession: RuntimeSession,
) {
  return {
    setToken(authToken?: PsrSessionToken | null) {
      runtimeSession.authToken = authToken ?? null
    },
    getEncryptionVersion: () =>
      httpClient.get('WebMaintenanceService', 'GetEncryptionVersion', undefined, true),
    getOrganisationUnitUserSalt: () =>
      httpClient.get('WebMaintenanceService', 'GetOrganisationUnitUserSalt', undefined, true),
    getOrganisationUnitServerPublicKey: () =>
      httpClient.get(
        'WebMaintenanceService',
        'GetOrganisationUnitServerPublicKey',
        undefined,
        true,
      ),
    getOrganisationUnitUserGuid: (username: string) =>
      httpClient.post('WebMaintenanceService', 'GetOrganisationUnitUserGuid', { username }, true),
  }
}

export function createMultiFactorServiceClient(
  httpClient: PsrHttpClient,
  runtimeSession: RuntimeSession,
) {
  return {
    setToken(authToken?: PsrSessionToken | null) {
      runtimeSession.authToken = authToken ?? null
    },
    getCurrentUserRightKey: () =>
      httpClient.get('WebServiceMultiFactorAuth', 'GetCurrentUserRightKey', undefined, true),
    getClientAuthOptions: () =>
      httpClient.get('WebServiceMultiFactorAuth', 'GetClientAuthOptions', undefined, true),
    checkAuthentication: (jsonAuthOptions: string) =>
      httpClient.post(
        'WebServiceMultiFactorAuth',
        'CheckAuthentication',
        { jsonAuthOptions },
        true,
      ),
  }
}

export function createAuthServiceClient(httpClient: PsrHttpClient) {
  return {
    getFirstAuthentication: (request: unknown) =>
      httpClient.post('Auth', 'GetFirstAuthentication', { request }, false),
    initializeFirstFactorReset: (request: unknown) =>
      httpClient.post('Auth', 'InitializeFirstFactorReset', { request }, false),
    configureAuthentication: (config: unknown) =>
      httpClient.post('Auth', 'ConfigureAuthentication', { config }, false),
    authenticateUserKeySignatureCredential: (credential: unknown) =>
      httpClient.post('Auth', 'AuthenticateUserKeySignatureCredential', { credential }, false),
    authenticate: (credential: unknown) =>
      httpClient.post('Auth', 'Authenticate', { credential }, false),
    authenticateApiKey: (credential: unknown) =>
      httpClient.post('Auth', 'AuthenticateApiKey', { credential }, false),
  }
}

export function createDirectManager<T>(
  managerName: keyof typeof managerManifest,
  serviceClient: ForwardServiceClient,
): T {
  const manager = {} as Record<string, (...args: unknown[]) => Promise<unknown>>

  for (const [methodName, definition] of Object.entries(managerManifest[managerName])) {
    manager[methodName] = (...args: unknown[]) => serviceClient[definition.serviceMethod](...args)
  }

  return manager as T
}
