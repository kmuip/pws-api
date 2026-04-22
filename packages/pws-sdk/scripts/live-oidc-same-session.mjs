import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { beginPwsOidcLogin } from '../dist/index.js'

const url = process.env.PWS_API_URL || 'https://pass.kmupartnergroup.ch/api/'
const database = process.env.OIDC_DATABASE || 'pg'
const username =
  process.env.OIDC_USERNAME || process.env.ADMIN_USERNAME || 'lukas.zbinden@kmupartnergroup.ch'
const redirectUrl =
  process.env.OIDC_REDIRECT_URL || 'https://pass.kmupartnergroup.ch/authentication/login-via-oidc'

const flow = await beginPwsOidcLogin(url, {
  database,
  username,
  redirectUrl,
})

console.log(
  JSON.stringify(
    {
      ok: true,
      providerId: flow.providerId,
      redirectUrl: flow.redirectUrl,
      loginUrl: flow.loginUrl,
    },
    null,
    2,
  ),
)

const rl = readline.createInterface({ input, output })
const callbackUrl = await rl.question('callback-url> ')
rl.close()

const sdk = await flow.complete(callbackUrl)

console.log(
  JSON.stringify(
    {
      ok: true,
      currentUserId: sdk.raw.currentUserId,
      currentUserName: sdk.raw.currentUser?.Username ?? null,
    },
    null,
    2,
  ),
)

await sdk.logout()
