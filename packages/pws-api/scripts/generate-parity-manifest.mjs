import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const legacyRoot = join(packageRoot, 'legacy', 'node')
const managersRoot = join(legacyRoot, 'managers')
const outputPath = join(packageRoot, 'parity-manifest.json')

if (!existsSync(legacyRoot)) {
  if (!existsSync(outputPath)) {
    throw new Error(
      `Missing legacy reference input at ${legacyRoot} and no parity manifest fallback at ${outputPath}`,
    )
  }

  console.log(
    `Skipping parity manifest generation; legacy reference input not present at ${legacyRoot}`,
  )
  process.exit(0)
}

const psrApiSource = readFileSync(join(legacyRoot, 'psrApi.js'), 'utf8')
const rootProperties = Array.from(
  psrApiSource.matchAll(/this\.([A-Za-z0-9_]+)=new /g),
  (match) => match[1],
)

const publicManagers = rootProperties.filter(
  (name) => name.endsWith('Manager') || name === 'progressToken',
)

const managerMethods = {}

for (const entry of readdirSync(managersRoot).sort()) {
  if (!entry.endsWith('.js')) {
    continue
  }

  const managerSource = readFileSync(join(managersRoot, entry), 'utf8')
  const methods = Array.from(
    managerSource.matchAll(/\.prototype\.([A-Za-z0-9_]+)=function/g),
    (match) => match[1],
  )
  managerMethods[entry.replace(/\.js$/, '')] = methods
}

writeFileSync(
  outputPath,
  JSON.stringify(
    {
      exports: ['PsrApi', 'PsrApiEnums', 'PsrApiTypes'],
      rootProperties,
      publicManagers,
      managerMethods,
    },
    null,
    2,
  ),
)
