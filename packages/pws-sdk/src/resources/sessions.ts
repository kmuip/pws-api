import { randomUUID } from 'node:crypto'
import { PsrApi } from '@kmuip/pws-api'
import type { PsrApi as PsrApiShape, PsrSessionToken } from '@kmuip/pws-api'
import type { CredentialDataRecord, SessionBundle, SessionClientInfo } from '../types.js'

const DEFAULT_CLIENT_TYPE = 'WebClient'

function createClientInfo(options?: Partial<SessionClientInfo> | null): SessionClientInfo {
  return {
    clientInstanceId: options?.clientInstanceId ?? randomUUID(),
    clientType: options?.clientType ?? DEFAULT_CLIENT_TYPE,
    clientVersion: options?.clientVersion ?? PsrApi.getVersion(),
  }
}

function getBaseSessionToken(session: SessionBundle['session']): PsrSessionToken {
  return ('Token' in session && session.Token ? session.Token : session) as PsrSessionToken
}

export class SessionsResource {
  constructor(private readonly raw: PsrApiShape) {}

  async fork(options?: Partial<SessionClientInfo> | null): Promise<SessionBundle> {
    const client = createClientInfo(options)
    const session = await this.raw.authenticationManagerV2.forkSession(
      client.clientInstanceId,
      client.clientType,
      client.clientVersion,
    )

    return {
      session: {
        ...session,
        ClientInstanceId: session.ClientInstanceId ?? client.clientInstanceId,
        ClientType: session.ClientType ?? client.clientType,
        ClientVersion: session.ClientVersion ?? client.clientVersion,
      },
      userKeys: this.raw.authenticationManagerV2.getUserKeys(),
      client,
    }
  }

  async exportCredentialData(
    options?: Partial<SessionClientInfo> | null,
  ): Promise<CredentialDataRecord> {
    const bundle = await this.fork(options)
    const token = getBaseSessionToken(bundle.session)

    return {
      SessionId: token.SessionId,
      SessionKey: token.SessionKey,
      UserKey: {
        Keys: bundle.userKeys.map((key) => ({
          Id: key.id,
          PrivateKey: Buffer.from(key.privateKey, 'binary').toString('base64'),
        })),
      },
      ClientType: bundle.client.clientType,
      ClientInstanceId: bundle.client.clientInstanceId,
      UserName:
        ('UserName' in bundle.session && typeof bundle.session.UserName === 'string'
          ? bundle.session.UserName
          : this.raw.currentUser?.UserName) ?? null,
      DatabaseName: token.Database,
      EncryptionVersion: token.EncryptionVersion ?? 0,
    }
  }
}
