import {
  createPwsSdk,
  createPwsSdkFromCredentialData,
  createPwsSdkFromSession,
} from '../dist/index.js'
import { loadEnv, requireEnv } from './_env.mjs'

const env = loadEnv()
requireEnv(env, ['ADMIN_USERNAME', 'ADMIN_PASSWORD'])

const source = await createPwsSdk({
  url: 'https://pass.kmupartnergroup.ch/api/',
  auth: {
    type: 'password',
    database: 'testapi2',
    username: env.ADMIN_USERNAME,
    password: env.ADMIN_PASSWORD,
  },
})

const bundle = await source.sessions.fork()
const credentialData = await source.sessions.exportCredentialData()

const adopted = await createPwsSdkFromSession('https://pass.kmupartnergroup.ch/api/', bundle)
const adoptedFromCredentialData = await createPwsSdkFromCredentialData(
  'https://pass.kmupartnergroup.ch/api/',
  credentialData,
)

const currentUser = adopted.raw.currentUser
const credentialCurrentUser = adoptedFromCredentialData.raw.currentUser
const tags = await adopted.tags.list({ pageSize: 5, sortBy: 'name', sortDirection: 'asc' })

await adoptedFromCredentialData.logout()
await adopted.logout()
await source.logout()

console.log(
  JSON.stringify(
    {
      ok: true,
      clientType: bundle.client.clientType,
      userKeyCount: bundle.userKeys.length,
      currentUserId: currentUser?.Id ?? null,
      credentialCurrentUserId: credentialCurrentUser?.Id ?? null,
      tagCount: tags.length,
    },
    null,
    2,
  ),
)
