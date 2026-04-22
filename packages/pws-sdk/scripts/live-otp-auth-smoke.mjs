import * as OTPAuth from 'otpauth'
import { createPwsSdk } from '../dist/index.js'
import { loadEnv, requireEnv } from './_env.mjs'

const env = loadEnv()
requireEnv(env, ['TEST_USERNAME', 'TEST_PASSWORD', 'TEST_OTP_SECRET'])

const totp = new OTPAuth.TOTP({
  secret: env.TEST_OTP_SECRET,
})

const sdk = await createPwsSdk({
  url: 'https://pass.kmupartnergroup.ch/api/',
  auth: {
    type: 'password',
    database: 'testapi2',
    username: env.TEST_USERNAME,
    password: env.TEST_PASSWORD,
    otp: () => totp.generate(),
  },
})

const tags = await sdk.tags.list({ sortBy: 'name' })
await sdk.logout()

console.log(
  JSON.stringify(
    {
      ok: true,
      tagCount: tags.length,
    },
    null,
    2,
  ),
)
