import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { TOTP } from 'otpauth'

const envPath = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '.env')

if (!existsSync(envPath)) {
  throw new Error(`Missing .env file at ${envPath}`)
}

const env = Object.fromEntries(
  readFileSync(envPath, 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#') && line.includes('='))
    .map((line) => {
      const [key, ...rest] = line.split('=')
      return [key, rest.join('=')]
    }),
)

if (!env.API_KEY) {
  throw new Error('Missing API_KEY in .env')
}

const [jsonWebToken] = env.API_KEY.split(':', 2)
const [, payload] = jsonWebToken.split('.', 3)
if (!payload) {
  throw new Error('Malformed API key JSON Web Token')
}

const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/')
const paddedPayload = `${normalizedPayload}${'='.repeat((4 - (normalizedPayload.length % 4)) % 4)}`
const claims = JSON.parse(Buffer.from(paddedPayload, 'base64').toString('utf8'))

if (typeof claims.dbn !== 'string') {
  throw new Error('API key does not contain dbn claim')
}

const { PsrApi } = await import('../dist/index.js')

async function probeAuthentication({ username, password, otpSecret }) {
  const api = new PsrApi('https://pass.kmupartnergroup.ch/api/')
  const result = {
    database: claims.dbn,
    username,
    ok: false,
    step1: [],
    step2: [],
    error: null,
  }

  try {
    await api.authenticationManagerV2.startLogin(claims.dbn, username)

    let requirementSet = await api.authenticationManagerV2.getNextRequirement()
    result.step1 = requirementSet.PossibleRequirements.map((requirement) => requirement.AuthType)

    const passwordRequirement = requirementSet.PossibleRequirements.find((requirement) =>
      requirement.AuthType.includes('PasswordHashCredentialRequirement'),
    )
    if (!passwordRequirement?.Fields) {
      throw new Error('Password requirement missing')
    }

    const passwordField = passwordRequirement.Fields.find((field) => field.Key === 'password')
    if (!passwordField) {
      throw new Error('Password field missing')
    }

    passwordField.Value = password
    await api.authenticationManagerV2.authenticate(passwordRequirement)

    if (api.authenticationManagerV2.isAuthenticated) {
      result.ok = true
      await api.authenticationManagerV2.logout().catch(() => {})
      return result
    }

    requirementSet = await api.authenticationManagerV2.getNextRequirement()
    result.step2 = requirementSet.PossibleRequirements.map((requirement) => requirement.AuthType)

    if (otpSecret) {
      const otpRequirement = requirementSet.PossibleRequirements.find((requirement) =>
        /GoogleAuthCredentialRequirement|SafeNetOneTimePasswordCredentialRequirement|YubicoOneTimePasswordCredentialRequirement|RadiusTokenCredentialRequirement|RsaSecurIdTokenCredentialRequirement/.test(
          requirement.AuthType,
        ),
      )
      if (!otpRequirement?.Fields?.length) {
        throw new Error('OTP requirement missing')
      }

      const otpField =
        otpRequirement.Fields.find((field) =>
          ['code', 'token', 'password', 'otp', 'oneTimePassword'].includes(field.Key),
        ) ?? otpRequirement.Fields[0]
      if (!otpField) {
        throw new Error('OTP field missing')
      }

      const totp = new TOTP({ secret: otpSecret.replace(/\s+/g, '') })
      otpField.Value = totp.generate()
      await api.authenticationManagerV2.authenticate(otpRequirement)

      if (!api.authenticationManagerV2.isAuthenticated) {
        throw new Error('Authentication did not complete after OTP step')
      }
    }

    result.ok = true
    await api.authenticationManagerV2.logout().catch(() => {})
  } catch (error) {
    result.error = error instanceof Error ? error.message : String(error)
    try {
      await api.authenticationManagerV2.logout()
    } catch {}
  }

  return result
}

const results = []

if (env.ADMIN_USERNAME && env.ADMIN_PASSWORD) {
  results.push(
    await probeAuthentication({
      username: env.ADMIN_USERNAME,
      password: env.ADMIN_PASSWORD,
      otpSecret: null,
    }),
  )
}

if (env.TEST_USERNAME && env.TEST_PASSWORD && env.TEST_OTP_SECRET) {
  results.push(
    await probeAuthentication({
      username: env.TEST_USERNAME,
      password: env.TEST_PASSWORD,
      otpSecret: env.TEST_OTP_SECRET,
    }),
  )
}

console.log(JSON.stringify(results, null, 2))
