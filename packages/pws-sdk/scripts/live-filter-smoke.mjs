import { PsrApiEnums } from '@kmuip/pws-api'
import { createPwsSdk } from '../dist/index.js'
import { loadEnv, requireEnv } from './_env.mjs'

const env = loadEnv()
requireEnv(env, ['API_KEY'])

const sdk = await createPwsSdk({
  url: 'https://pass.kmupartnergroup.ch/api/',
  auth: {
    type: 'apiKey',
    apiKey: env.API_KEY,
  },
})

const tags = await sdk.tags.list({
  search: 'prod',
  sortBy: 'name',
  sortDirection: 'asc',
})

const organisationUnits = await sdk.organisationUnits.list({
  search: 'customer',
  pageSize: 5,
  sortBy: 'name',
})

const passwords = await sdk.passwords.list({
  organisationUnitId: organisationUnits[0]?.id ?? null,
  search: 'sample',
  pageSize: 5,
  includeSubOrganisationUnits: true,
  sortBy: 'name',
})

const users = await sdk.users.list({
  search: 'admin',
  pageSize: 5,
  sortBy: 'username',
})

const logbook = await sdk.logbook.list({
  datePreset: 'last30d',
  events: [
    PsrApiEnums.PsrLogbookEvent.PsrLogbookEventLogin,
    PsrApiEnums.PsrLogbookEvent.PsrLogbookEventLogout,
  ],
  pageSize: 5,
  sortBy: 'timestampUtc',
  sortDirection: 'desc',
})

await sdk.logout()

console.log(
  JSON.stringify(
    {
      ok: true,
      tagCount: tags.length,
      organisationUnitCount: organisationUnits.length,
      passwordCount: passwords.length,
      userCount: users.length,
      logbookCount: logbook.length,
    },
    null,
    2,
  ),
)
