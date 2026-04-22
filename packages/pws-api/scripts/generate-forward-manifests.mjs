import fs from 'node:fs'
import path from 'node:path'

const packageRoot = path.resolve(import.meta.dirname, '..')
const legacyRoot = path.join(packageRoot, 'legacy', 'node')
const outputFile = path.join(packageRoot, 'src', 'generated', 'forward-manifests.ts')

if (!fs.existsSync(legacyRoot)) {
  if (!fs.existsSync(outputFile)) {
    throw new Error(
      `Missing legacy reference input at ${legacyRoot} and no generated fallback at ${outputFile}`,
    )
  }

  console.log(
    `Skipping forward manifest generation; legacy reference input not present at ${legacyRoot}`,
  )
  process.exit(0)
}

const serviceSource = fs.readFileSync(path.join(legacyRoot, 'psrWebServiceClient.js'), 'utf8')
const managersDir = path.join(legacyRoot, 'managers')

const directManagerFiles = [
  'activeDirectory.js',
  'application.js',
  'dataBinding.js',
  'emailVerification.js',
  'forwardingRule.js',
  'license.js',
  'logbook.js',
  'mailing.js',
  'option.js',
  'organisationUnit.js',
  'policy.js',
  'progressToken.js',
  'right.js',
  'role.js',
  'seal.js',
  'tag.js',
  'template.js',
  'trigger.js',
]

function sanitizeArgName(name) {
  return name.trim().replace(/=.*/, '').trim()
}

function parseArgumentList(argumentSource) {
  return argumentSource
    .split(',')
    .map((arg) => sanitizeArgName(arg))
    .filter(Boolean)
}

function parsePayloadPairs(payloadSource) {
  if (!payloadSource.trim()) {
    return []
  }

  return payloadSource
    .split(',')
    .map((pair) => pair.trim())
    .filter(Boolean)
    .map((pair) => {
      const [payloadKey, argumentName] = pair.split(':')
      return [payloadKey.trim(), sanitizeArgName(argumentName)]
    })
}

const serviceManifest = {}
for (const match of serviceSource.matchAll(
  /t\.prototype\.(\w+)=function\(([^)]*)\)\{return this\._(postData|getData)\("([^"]+)"(?:,\{([^}]*)\})?/g,
)) {
  const [, methodName, argumentSource, transport, endpoint, payloadSource = ''] = match
  serviceManifest[methodName] = {
    args: parseArgumentList(argumentSource),
    endpoint,
    payload: parsePayloadPairs(payloadSource),
    transport,
  }
}

serviceManifest.getNotifyTriggerAlertsRead = serviceManifest.setNotifyTriggerAlertsRead

const managerManifest = {}
for (const fileName of directManagerFiles) {
  const managerName = path.basename(fileName, '.js')
  const source = fs.readFileSync(path.join(managersDir, fileName), 'utf8')
  const methodManifest = {}

  for (const match of source.matchAll(
    /\.prototype\.(\w+)=function\(([^)]*)\)\{return this\._serviceClient\.(\w+)\(([^)]*)\)\}/g,
  )) {
    const [, methodName, argumentSource, serviceMethod] = match
    methodManifest[methodName] = {
      args: parseArgumentList(argumentSource),
      serviceMethod,
    }
  }

  if (managerName === 'trigger' && methodManifest.setNotifyTriggerAlertsRead) {
    methodManifest.setNotifyTriggerAlertsRead.serviceMethod = 'setNotifyTriggerAlertsRead'
  }

  if (
    managerName === 'activeDirectory' &&
    methodManifest.getActiveDirecotryProfileInvolvedOrganisationUnit
  ) {
    methodManifest.getActiveDirecotryProfileInvolvedOrganisationUnit.serviceMethod =
      'getActiveDirectoryProfileInvolvedOrganisationUnit'
  }

  managerManifest[managerName] = methodManifest
}

const rendered = `export const serviceManifest = ${JSON.stringify(serviceManifest, null, 2)} as const\n\nexport const managerManifest = ${JSON.stringify(managerManifest, null, 2)} as const\n`

fs.mkdirSync(path.dirname(outputFile), { recursive: true })
fs.writeFileSync(outputFile, rendered)
