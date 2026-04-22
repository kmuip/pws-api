import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

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

if (typeof claims.dbn !== 'string' || typeof claims.usrn !== 'string') {
  throw new Error('API key does not contain dbn/usrn claims')
}

const { PsrApi } = await import('../dist/index.js')

const api = new PsrApi('https://pass.kmupartnergroup.ch/api/')

try {
  await api.authenticationManagerV2.startLogin(claims.dbn, claims.usrn)
  const requirementSet = await api.authenticationManagerV2.getNextRequirement()
  console.log(
    JSON.stringify(
      {
        database: claims.dbn,
        username: claims.usrn,
        isConfiguration: requirementSet.IsConfiguration,
        authTypes: requirementSet.PossibleRequirements.map((requirement) => requirement.AuthType),
      },
      null,
      2,
    ),
  )
} catch (error) {
  console.error('Live auth flow smoke failed')
  console.error(error)
  process.exitCode = 1
}
