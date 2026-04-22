import { createPwsSdk } from '../dist/index.js'
import { loadEnv, requireEnv } from './_env.mjs'

const env = loadEnv()
requireEnv(env, ['ADMIN_USERNAME', 'ADMIN_PASSWORD'])

const sdk = await createPwsSdk({
  url: 'https://pass.kmupartnergroup.ch/api/',
  auth: {
    type: 'password',
    database: 'testapi2',
    username: env.ADMIN_USERNAME,
    password: env.ADMIN_PASSWORD,
  },
})

const roots = await sdk.organisationUnits.list({ pageSize: 10, sortBy: 'name' })
const passwords = await sdk.passwords.list({
  pageSize: 5,
  includeSubOrganisationUnits: true,
  sortBy: 'name',
})

await sdk.logout()

console.log(
  JSON.stringify(
    {
      ok: true,
      rootCount: roots.length,
      passwordCount: passwords.length,
    },
    null,
    2,
  ),
)
