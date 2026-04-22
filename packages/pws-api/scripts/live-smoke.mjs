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

const { PsrApi } = await import('../dist/index.js')

const api = new PsrApi('https://pass.kmupartnergroup.ch/api/')
api.onSessionExpired = async () => {}

try {
  await api.authenticationManagerV2.loginWithApiKey(env.API_KEY)
  const currentUser = await api.organisationUnitManager.getCurrentOrganisationUnit()
  console.log(JSON.stringify({ currentUserId: currentUser?.Id ?? null }, null, 2))
  await api.authenticationManagerV2.logout()
} catch (error) {
  console.error('Live smoke failed')
  console.error(error)
  process.exitCode = 1
}
