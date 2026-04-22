import { createPwsSdk } from '../dist/index.js'
import { loadEnv, requireEnv } from './_env.mjs'

const env = loadEnv()
requireEnv(env, ['ADMIN_USERNAME', 'ADMIN_PASSWORD'])

const sdk = await createPwsSdk({
  url: 'https://pass.kmupartnergroup.ch/api/',
  auth: {
    type: 'password',
    database: 'testapi2',
    username: env.ADMIN_USERNAME,
    password: env.ADMIN_PASSWORD,
  },
})

const organisationUnits = await sdk.organisationUnits.list({
  search: 'customer1',
  pageSize: 3,
  sortBy: 'name',
})
const organisationUnit = organisationUnits[0] ?? null
const organisationUnitDetail = organisationUnit
  ? await sdk.organisationUnits.get(organisationUnit.id)
  : null

const roles = await sdk.roles.list({
  search: 'admin',
  pageSize: 5,
  sortBy: 'name',
})

const forms = await sdk.passwords.listForms({
  pageSize: 5,
  sortBy: 'name',
})

const templates = organisationUnit
  ? await sdk.templates.listGroups({
      organisationUnitId: organisationUnit.id,
      pageSize: 5,
      sortBy: 'name',
    })
  : []

const templateTargets = await sdk.templates.getTargets(organisationUnit?.id ?? null)
const predefinedRightTree = organisationUnit
  ? await sdk.predefinedRights.getTargetTree(organisationUnit.id)
  : null
const passwordTarget = organisationUnit
  ? await sdk.predefinedRights.findTarget(organisationUnit.id, {
      dataType: 1,
      name: 'A1',
    })
  : null
const predefinedRights = organisationUnit
  ? await sdk.predefinedRights.list({
      dataId: organisationUnit.id,
      dataType: 1,
      targetId: passwordTarget?.targetId ?? null,
    })
  : []
const rights = organisationUnit ? await sdk.rights.list(organisationUnit.id) : []
const passwords = organisationUnit
  ? await sdk.passwords.list({
      organisationUnitId: organisationUnit.id,
      includeSubOrganisationUnits: true,
      pageSize: 3,
      sortBy: 'name',
    })
  : []

let revealedPasswordLength = 0
let revealError = null
for (const password of passwords) {
  try {
    const revealed = await sdk.passwords.reveal(password.id, 'SDK atomic validation')
    revealedPasswordLength = revealed?.length ?? 0
    if (revealedPasswordLength > 0) {
      break
    }
  } catch (error) {
    revealError = error instanceof Error ? error.message : String(error)
  }
}

await sdk.logout()

console.log(
  JSON.stringify(
    {
      ok: true,
      organisationUnit: organisationUnitDetail
        ? {
            id: organisationUnitDetail.id,
            name: organisationUnitDetail.name,
          }
        : null,
      roleCount: roles.length,
      formCount: forms.length,
      firstForm: forms[0]
        ? {
            id: forms[0].id,
            name: forms[0].name,
          }
        : null,
      templateCount: templates.length,
      templateTargetCount: templateTargets.length,
      predefinedRightRootChildren: predefinedRightTree?.children.length ?? 0,
      predefinedRightCount: predefinedRights.length,
      passwordTarget: passwordTarget
        ? {
            id: passwordTarget.targetId,
            dataType: passwordTarget.dataType,
            name: passwordTarget.name,
          }
        : null,
      rightCount: rights.length,
      passwordCount: passwords.length,
      revealedPasswordLength,
      revealError,
    },
    null,
    2,
  ),
)
