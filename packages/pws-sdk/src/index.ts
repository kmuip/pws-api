import { PsrApi, type PsrApi as PsrApiShape } from '@kmuip/pws-api'
import { authenticate, normalizeOidcAuthorizationCode, prepareOidcLogin } from './auth/login.js'
import { ApplicationsResource } from './resources/applications.js'
import { ActiveDirectorySyncResource } from './resources/active-directory-sync.js'
import { BinResource } from './resources/bin.js'
import { ContainersSdkResource } from './resources/containers.js'
import { DataBindingsSdkResource } from './resources/data-bindings.js'
import { DocumentsResource } from './resources/documents.js'
import { FavoritesResource } from './resources/favorites.js'
import { LogbookResource } from './resources/logbook.js'
import { OptionValuesResource } from './resources/option-values.js'
import { OrganisationUnitsResource } from './resources/organisation-units.js'
import { PasswordGenerationResource } from './resources/password-generation.js'
import { PasswordsResource } from './resources/passwords.js'
import { PredefinedRightsResource } from './resources/predefined-rights.js'
import { RealtimeSubscriptionsResource } from './resources/realtime-subscriptions.js'
import { RightsResource } from './resources/rights.js'
import { RolesResource } from './resources/roles.js'
import { SessionsResource } from './resources/sessions.js'
import { SealsResource } from './resources/seals.js'
import { TagsResource } from './resources/tags.js'
import { TemplatesResource } from './resources/templates.js'
import { TriggersResource } from './resources/triggers.js'
import { UsersResource } from './resources/users.js'
import type {
  CreatePwsSdkOptions,
  CredentialDataRecord,
  OidcAuthConfig,
  PwsOidcFlow,
  PwsSdk,
  SessionBundle,
} from './types.js'

export type * from './types.js'

function buildSdk(raw: PsrApiShape): PwsSdk {
  return {
    raw,
    logout: async () => {
      await raw.authenticationManagerV2.logout()
    },
    sessions: new SessionsResource(raw),
    passwords: new PasswordsResource(raw),
    documents: new DocumentsResource(raw),
    applications: new ApplicationsResource(raw),
    tags: new TagsResource(raw),
    favorites: new FavoritesResource(raw),
    organisationUnits: new OrganisationUnitsResource(raw),
    roles: new RolesResource(raw),
    rights: new RightsResource(raw),
    templates: new TemplatesResource(raw),
    predefinedRights: new PredefinedRightsResource(raw),
    seals: new SealsResource(raw),
    triggers: new TriggersResource(raw),
    users: new UsersResource(raw),
    bin: new BinResource(raw),
    logbook: new LogbookResource(raw),
    containersSdk: new ContainersSdkResource(raw),
    optionValues: new OptionValuesResource(raw),
    activeDirectorySync: new ActiveDirectorySyncResource(raw),
    dataBindingsSdk: new DataBindingsSdkResource(raw),
    passwordGeneration: new PasswordGenerationResource(raw),
    subscriptions: new RealtimeSubscriptionsResource(raw),
    passwordTools: raw.passwordManager,
    oneTimePasswords: raw.oneTimePasswordManager,
    auth: raw.authenticationManagerV2,
    containers: raw.containerManager,
    encryption: raw.encryptionManager,
    activeDirectory: raw.activeDirectoryManager,
    apiKeys: raw.apiKeyManager,
    dataBindings: raw.dataBindingManager,
    emailVerification: raw.emailVerificationManager,
    externalLinks: raw.externalLinkManager,
    forwardingRules: raw.forwardingRuleManager,
    genericRights: raw.genericRightManager,
    licenses: raw.licenseManager,
    mailing: raw.mailingManager,
    options: raw.optionManager,
    policies: raw.policyManager,
    progressTokens: raw.progressToken,
    realtime: raw.realtimeEventManager,
  }
}

export async function createPwsSdk(options: CreatePwsSdkOptions): Promise<PwsSdk> {
  const clientOptions =
    options.auth.type === 'oidc'
      ? {
          ...(options.clientOptions ?? {}),
          customRedirectUrl:
            options.clientOptions?.customRedirectUrl ?? options.auth.redirectUrl,
        }
      : options.clientOptions

  const raw = new PsrApi(options.url, clientOptions) as PsrApiShape
  await authenticate(raw, options.auth)

  return buildSdk(raw)
}

export async function beginPwsOidcLogin(
  url: string,
  options: {
    database: string
    username: string
    redirectUrl: string
    clientOptions?: CreatePwsSdkOptions['clientOptions']
  },
): Promise<PwsOidcFlow> {
  const raw = new PsrApi(url, {
    ...(options.clientOptions ?? {}),
    customRedirectUrl: options.clientOptions?.customRedirectUrl ?? options.redirectUrl,
  }) as PsrApiShape

  const login = await prepareOidcLogin(raw, options)

  return {
    ...login,
    complete: async (authorizationCode: string) => {
      const auth: OidcAuthConfig = {
        type: 'oidc',
        database: options.database,
        username: options.username,
        redirectUrl: login.redirectUrl,
        authorizationCode,
      }

      await authenticate(raw, auth)
      return buildSdk(raw)
    },
  }
}

export async function preparePwsOidcLogin(
  url: string,
  options: {
    database: string
    username: string
    redirectUrl: string
    clientOptions?: CreatePwsSdkOptions['clientOptions']
  },
) {
  const raw = new PsrApi(url, {
    ...(options.clientOptions ?? {}),
    customRedirectUrl: options.clientOptions?.customRedirectUrl ?? options.redirectUrl,
  }) as PsrApiShape

  return prepareOidcLogin(raw, options)
}

export { normalizeOidcAuthorizationCode }

export async function createPwsSdkFromSession(
  url: string,
  session: SessionBundle,
  clientOptions?: CreatePwsSdkOptions['clientOptions'],
) {
  return createPwsSdk({
    url,
    clientOptions,
    auth: {
      type: 'session',
      session: session.session,
      userKeys: session.userKeys,
      apiKey: session.apiKey ?? undefined,
    },
  })
}

export async function createPwsSdkFromCredentialData(
  url: string,
  credentialData: CredentialDataRecord,
  clientOptions?: CreatePwsSdkOptions['clientOptions'],
) {
  return createPwsSdk({
    url,
    clientOptions,
    auth: {
      type: 'session',
      session: {
        Database: credentialData.DatabaseName,
        SessionId: credentialData.SessionId,
        SessionKey: credentialData.SessionKey,
        EncryptionVersion: credentialData.EncryptionVersion,
      },
      userKeys: credentialData.UserKey.Keys.map((key) => ({
        id: key.Id,
        privateKey: Buffer.from(key.PrivateKey, 'base64').toString('binary'),
      })),
    },
  })
}
