import type {
  PsrAuthenticationFieldValue,
  PsrAuthenticationRequirement,
  PsrAuthenticationRequirementSet,
} from '@kmuip/pws-types'
import type {
  AuthenticationResultCompleted,
  AuthenticationUserKeySignatureRequirement,
  AuthState,
} from './types.js'

export function isObject(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null
}

export function isUserKeySignatureRequirement(
  value: unknown,
): value is AuthenticationUserKeySignatureRequirement {
  return (
    isObject(value) &&
    typeof value.$type === 'string' &&
    value.$type.includes('AuthenticationUserKeySignatureRequirement')
  )
}

export function isCompletedAuthentication(value: unknown): value is AuthenticationResultCompleted {
  return (
    isObject(value) &&
    typeof value.$type === 'string' &&
    value.$type.includes('AuthenticationResultCompleted')
  )
}

export function throwOnFailedLogin(step: Record<string, any>) {
  if (typeof step.$type === 'string' && step.$type.includes('AuthenticationResultLoginFailed')) {
    throw new Error(JSON.stringify(step.LoginLock))
  }
}

export function getLatestAuthStep(state: AuthState) {
  return [...state.authenticationSteps]
    .reverse()
    .find(
      (step) =>
        !(
          isObject(step) &&
          typeof step.$type === 'string' &&
          step.$type.includes('AuthenticationResultLoginFailed')
        ),
    )
}

export function matchesAuthType(value: unknown, authType: string) {
  return isObject(value) && typeof value.$type === 'string' && value.$type.includes(authType)
}

function buildFieldValue(
  key: string,
  field: Record<string, any>,
  requirement: Record<string, any>,
): PsrAuthenticationFieldValue {
  return {
    Key: key,
    Name: key,
    FieldType: field.Type,
    Value: field.Value ?? '',
    Requirement: requirement,
  }
}

function fillInteractiveFields(target: Record<string, any>, rawRequirement: Record<string, any>) {
  const fields = rawRequirement.RequiredFieldsFromUser?.AuthenticationFields
  if (!fields || typeof fields !== 'object') {
    throw new Error('FillableAuth or fields of authReq is not defined')
  }

  target.Fields = Object.keys(fields)
    .filter((key) => key !== '$type')
    .map((key) => buildFieldValue(key, fields[key], rawRequirement))
}

export function parsePossibleRequirements(
  requirements: unknown[],
  state: Pick<AuthState, 'username'>,
): PsrAuthenticationRequirement[] {
  return (requirements ?? [])
    .filter((requirement): requirement is Record<string, any> => isObject(requirement))
    .map((requirement) => {
      if (String(requirement.$type).includes('PkiConfigurationRequirement')) {
        return {
          Name: requirement.Name,
          AuthType: 'PkiConfigurationRequirement',
          OnlyShowPkiValidCertificates: !!requirement.AllowOnlyValidCertificates,
          RequireKeyEnciphermentFlag: !!requirement.RequireKeyEnciphermentFlag,
        }
      }

      if (String(requirement.$type).includes('PkiCredentialRequirement')) {
        return {
          Name: requirement.Name,
          AuthType: 'PkiCredentialRequirement',
          HashAlgorithm: requirement.HashAlgorithm,
          RequireKeyEnciphermentFlag: !!requirement.RequireKeyEnciphermentFlag,
        }
      }

      if (String(requirement.$type).includes('PasswordHashAuthConfigurationRequirement')) {
        const parsedRequirement: PsrAuthenticationRequirement = {
          Name: requirement.Name,
          AuthType: 'PasswordHashAuthConfigurationRequirement',
          QualityLevel1: requirement.PasswordQualityLevel1Percentage,
          QualityLevel2: requirement.PasswordQualityLevel2Percentage,
          Username: state.username,
          NewPassword: '',
        }
        if (requirement.PasswordPolicy) {
          parsedRequirement.Policy = JSON.parse(requirement.PasswordPolicy)
        }
        return parsedRequirement
      }

      if (String(requirement.$type).includes('GoogleAuthConfigurationRequirement')) {
        const parsedRequirement: PsrAuthenticationRequirement = {
          Name: requirement.Name,
          AuthType: 'GoogleAuthConfigurationRequirement',
          Secret: requirement.Secret,
        }
        fillInteractiveFields(parsedRequirement as Record<string, any>, requirement)
        return parsedRequirement
      }

      if (String(requirement.$type).includes('OidcCredentialRequirement')) {
        return {
          Name: requirement.Name,
          AuthType: 'OidcCredentialRequirement',
          ProviderId: requirement.ProviderId,
          LoginUrl: requirement.LoginUrl,
          RedirectUrl: requirement.RedirectUrl,
          AuthorizationCode: '',
        }
      }

      const authTypeSegments = String(requirement.$type).split('.')
      const parsedRequirement: PsrAuthenticationRequirement = {
        Name: requirement.Name,
        AuthType: authTypeSegments[authTypeSegments.length - 1],
      }
      fillInteractiveFields(parsedRequirement as Record<string, any>, requirement)
      return parsedRequirement
    })
}

export function parseRequirementSet(
  step: unknown,
  state: Pick<AuthState, 'sessionId' | 'username'>,
): PsrAuthenticationRequirementSet {
  if (!isObject(step)) {
    throw new Error('No authentication step available')
  }

  if (
    typeof step.$type === 'string' &&
    step.$type.includes('AuthenticationUserKeySignatureRequirement')
  ) {
    throw new Error(
      'Received type AuthenticationUserKeySignatureRequirement is expected to be handled before and not to be parsed',
    )
  }

  throwOnFailedLogin(step)
  if (step.SessionId) {
    state.sessionId = step.SessionId
  }

  if (typeof step.$type === 'string' && step.$type.includes('PossibleAuthCredentialRequirements')) {
    return {
      IsConfiguration: false,
      PossibleRequirements: parsePossibleRequirements(
        step.PossibleAuthenticationCredentialRequirements,
        state,
      ),
    }
  }

  if (
    typeof step.$type === 'string' &&
    step.$type.includes('PossibleAuthConfigurationRequirements')
  ) {
    return {
      IsConfiguration: true,
      PossibleRequirements: parsePossibleRequirements(
        step.PossibleAuthenticationConfigurationRequirements,
        state,
      ),
    }
  }

  throw new Error(`Unsupported requirement received: ${String(step.$type)} (Unknown)`)
}

export function trackAuthStep(state: AuthState, step: Record<string, any>) {
  if (step.UserImage) {
    state.userImage = step.UserImage
  }
  if (step.UserName) {
    state.nameOfUser = step.UserName
  }
  if (step.SessionId) {
    state.sessionId = step.SessionId
  }

  state.authenticationSteps.push(step)
}
