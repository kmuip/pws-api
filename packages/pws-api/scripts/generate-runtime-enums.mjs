import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const legacyEnumsPath = resolve(packageRoot, 'legacy', 'node', 'psrApiEnums.js')
const outputPath = resolve(packageRoot, 'src', 'generated', 'runtime-enums.ts')

if (!existsSync(legacyEnumsPath)) {
  if (!existsSync(outputPath)) {
    throw new Error(
      `Missing legacy enum input at ${legacyEnumsPath} and no generated fallback at ${outputPath}`,
    )
  }

  console.log(
    `Skipping runtime enum generation; legacy reference input not present at ${legacyEnumsPath}`,
  )
  process.exit(0)
}

const require = createRequire(import.meta.url)
const legacyEnums = require(legacyEnumsPath)

mkdirSync(dirname(outputPath), { recursive: true })

writeFileSync(
  outputPath,
  [
    '// Generated from legacy/node/psrApiEnums.js',
    '// Do not edit manually.',
    '',
    `export const runtimeEnums = ${JSON.stringify(legacyEnums, null, 2)} as const`,
    '',
  ].join('\n'),
)
