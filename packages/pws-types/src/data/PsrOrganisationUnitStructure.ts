import type { PsrOrganisationUnit } from './PsrOrganisationUnit'

export type PsrOrganisationUnitStructure = {
  __type: string
  ChildrenOrganisationUnits: PsrOrganisationUnitStructure[]
  OrganisationUnit: PsrOrganisationUnit
}
