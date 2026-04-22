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

const tags = await sdk.tags.list()
const logbookCount = await sdk.logbook.count({ datePreset: 'last30d' })

await sdk.logout()

console.log(
  JSON.stringify(
    {
      ok: true,
      tagCount: tags.length,
      logbookCount,
    },
    null,
    2,
  ),
)
