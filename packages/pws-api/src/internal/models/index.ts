import {
  RuntimePsrActiveDirectoryProfile,
  RuntimePsrOrganisationUnitGroup,
  RuntimePsrOrganisationUnitUser,
  RuntimePsrRole,
} from './identity.js'
import { RuntimePsrApiException } from './base.js'
import {
  RuntimePsrContainer,
  RuntimePsrContainerInfo,
  RuntimePsrContainerItem,
} from './containers.js'

export { GUID_EMPTY, RuntimeDataModel, RuntimePsrApiException } from './base.js'
export {
  RuntimePsrContainer,
  RuntimePsrContainerInfo,
  RuntimePsrContainerItem,
} from './containers.js'
export {
  RuntimePsrActiveDirectoryProfile,
  RuntimePsrOrganisationUnitGroup,
  RuntimePsrOrganisationUnitUser,
  RuntimePsrRole,
} from './identity.js'

export const PsrApiTypes = {
  PsrApiException: RuntimePsrApiException,
  PsrActiveDirectoryProfile: RuntimePsrActiveDirectoryProfile,
  PsrContainer: RuntimePsrContainer,
  PsrContainerInfo: RuntimePsrContainerInfo,
  PsrContainerItem: RuntimePsrContainerItem,
  PsrOrganisationUnitGroup: RuntimePsrOrganisationUnitGroup,
  PsrOrganisationUnitUser: RuntimePsrOrganisationUnitUser,
  PsrRole: RuntimePsrRole,
} as const

export type PsrApiTypesShape = typeof PsrApiTypes
