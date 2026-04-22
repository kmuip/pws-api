import type { PsrAuthenticationFieldValue, PsrAuthenticationRequirement } from '@kmuip/pws-types'
import { fromBase64, toBase64 } from '../utils.js'
import { matchesAuthType } from './requirements.js'
import type { AuthState, RuntimeApiLike } from './types.js'

type BuildRequestContext = {
  api: RuntimeApiLike
  state: AuthState
  customRedirectUrl?: string
}

function toBinaryString(value: string | Uint8Array) {
  return typeof value === 'string' ? value : Buffer.from(value).toString('binary')
}

export function createAuthRequest<T extends Record<string, unknown>>(
  state: AuthState,
  request: T,
): T & {
  Database: string | null
  Username: string | null
  OperationMode: number
  SessionId?: string
  ClientInformation: Record<string, unknown>
} {
  return {
    ...request,
    Database: state.database ?? null,
    Username: state.username ?? null,
    OperationMode: state.operationMode,
    ...(state.sessionId ? { SessionId: state.sessionId } : {}),
    ClientInformation: state.clientInformation,
  }
}

function createRequiredFieldsContainer() {
  return { AuthenticationFields: {} as Record<string, any> }
}

function createCredentialRequest(rawRequirement: Record<string, any>) {
  const requirementType = String(rawRequirement.$type)
  let request: Record<string, any>

  if (requirementType.includes('AdPasswordCredentialRequirement')) {
    request = {
      $type:
        'PsrAuthenticationObjectLib.Authentication.AuthData.AdPasswordCredential, PsrAuthenticationObjectLib',
      AuthType: 10,
    }
  } else if (requirementType.includes('GoogleAuthCredentialRequirement')) {
    request = {
      $type:
        'PsrAuthenticationObjectLib.Authentication.AuthData.GoogleAuthCredential, PsrAuthenticationObjectLib',
      AuthType: 1,
    }
  } else if (requirementType.includes('PasswordHashCredentialRequirement')) {
    request = {
      $type:
        'PsrAuthenticationObjectLib.Authentication.AuthData.PasswordHashCredential, PsrAuthenticationObjectLib',
      AuthType: 10,
      PasswordHash: '',
    }
  } else if (requirementType.includes('PkiCredentialRequirement')) {
    request = {
      $type:
        'PsrAuthenticationObjectLib.Authentication.AuthData.PkiCredential, PsrAuthenticationObjectLib',
      AuthType: 4,
      Challenge: '',
      ChallengeDbSignature: '',
      ChallengeCertSignature: '',
      CertificateThumbprint: '',
    }
  } else if (requirementType.includes('RsaSecurIdTokenCredentialRequirement')) {
    request = {
      $type:
        'PsrAuthenticationObjectLib.Authentication.AuthData.RsaSecurIdTokenCredential, PsrAuthenticationObjectLib',
      AuthType: 2,
    }
  } else if (requirementType.includes('SafeNetOneTimePasswordCredentialRequirement')) {
    request = {
      $type:
        'PsrAuthenticationObjectLib.Authentication.AuthData.SafeNetOneTimePasswordCredential, PsrAuthenticationObjectLib',
      AuthType: 3,
    }
  } else if (requirementType.includes('SmartCardCredentialRequirement')) {
    request = {
      $type:
        'PsrAuthenticationObjectLib.Authentication.AuthData.SmartCardCredential, PsrAuthenticationObjectLib',
      AuthType: 7,
      UserCertificateRawData: '',
      Challenge: '',
      ChallengeCertSignature: '',
      ChallengeDbSignature: '',
    }
  } else if (requirementType.includes('YubicoOneTimePasswordCredentialRequirement')) {
    request = {
      $type:
        'PsrAuthenticationObjectLib.Authentication.AuthData.YubicoOneTimePasswordCredential, PsrAuthenticationObjectLib',
      AuthType: 5,
    }
  } else if (requirementType.includes('RadiusTokenCredentialRequirement')) {
    request = {
      $type:
        'PsrAuthenticationObjectLib.Authentication.AuthData.RadiusTokenCredential, PsrAuthenticationObjectLib',
      AuthType: 6,
    }
  } else if (requirementType.includes('EmailConfirmationCredentialRequirement')) {
    request = {
      $type:
        'PsrAuthenticationObjectLib.Authentication.AuthData.EmailConfirmationCredential, PsrAuthenticationObjectLib',
      AuthType: 13,
    }
  } else if (requirementType.includes('OidcCredentialRequirement')) {
    request = {
      $type:
        'PsrAuthenticationObjectLib.Authentication.AuthData.OidcCredential, PsrAuthenticationObjectLib',
      AuthType: 10,
    }
  } else {
    throw new Error(`Requirement is not supported: ${requirementType}`)
  }

  request.RequiredFieldsFromUser = createRequiredFieldsContainer()
  return request
}

function createConfigurationRequest(rawRequirement: Record<string, any>) {
  const requirementType = String(rawRequirement.$type)
  let request: Record<string, any>

  if (requirementType.includes('GoogleAuthConfigurationRequirement')) {
    request = {
      $type:
        'PsrAuthenticationObjectLib.Authentication.AuthConfiguration.GoogleAuthConfiguration, PsrAuthenticationObjectLib',
      Secret: rawRequirement.Secret,
      UserIdentity: rawRequirement.UserIdentity,
      AuthType: 1,
    }
  } else if (requirementType.includes('PasswordHashAuthConfigurationRequirement')) {
    request = {
      $type:
        'PsrAuthenticationObjectLib.Authentication.AuthConfiguration.PasswordHashAuthConfiguration, PsrAuthenticationObjectLib',
      UserKey: '',
      PasswordHash: '',
      PasswordSalt: '',
      ClientHashAlgorithm: undefined,
      AuthType: 10,
    }
  } else if (requirementType.includes('PkiConfigurationRequirement')) {
    request = {
      $type:
        'PsrAuthenticationObjectLib.Authentication.AuthConfiguration.PkiConfiguration, PsrAuthenticationObjectLib',
      UserCertificateRawData: '',
      Challenge: rawRequirement.Challenge,
      ChallengeDbSignature: rawRequirement.ChallengeDbSignature,
      ChallengeCertSignature: '',
      HashAlgorithm: rawRequirement.HashAlgorithm,
      AuthType: 4,
    }
  } else if (requirementType.includes('RsaSecurIdTokenConfigurationRequirement')) {
    request = {
      $type:
        'PsrAuthenticationObjectLib.Authentication.AuthConfiguration.RsaSecurIdTokenConfiguration, PsrAuthenticationObjectLib',
      AuthType: 2,
    }
  } else if (requirementType.includes('SafeNetOneTimePasswordConfigurationRequirement')) {
    request = {
      $type:
        'PsrAuthenticationObjectLib.Authentication.AuthConfiguration.SafeNetOneTimePasswordConfiguration, PsrAuthenticationObjectLib',
      AuthType: 3,
    }
  } else if (requirementType.includes('SmartCardConfigurationRequirement')) {
    request = {
      $type:
        'PsrAuthenticationObjectLib.Authentication.AuthConfiguration.SmartCardConfiguration, PsrAuthenticationObjectLib',
      AuthType: 7,
      UserCertificateRawData: rawRequirement.UserCertificateRawData,
      Challenge: rawRequirement.Challenge,
      ChallengeCertSignature: rawRequirement.ChallengeCertSignature,
      ChallengeDbSignature: rawRequirement.ChallengeDbSignature,
    }
  } else if (requirementType.includes('YubicoOneTimePasswordConfigurationRequirement')) {
    request = {
      $type:
        'PsrAuthenticationObjectLib.Authentication.AuthConfiguration.YubicoOneTimePasswordConfiguration, PsrAuthenticationObjectLib',
      AuthType: 5,
    }
  } else if (requirementType.includes('DeleteFactorConfigurationRequirement')) {
    request = {
      $type:
        'PsrAuthenticationObjectLib.Authentication.AuthConfiguration.DeleteFactorConfiguration, PsrAuthenticationObjectLib',
      AuthType: 9991,
    }
  } else {
    throw new Error(`Configuration Requirement is not supported: ${requirementType}`)
  }

  request.RequiredFieldsFromUser = createRequiredFieldsContainer()
  return request
}

function applyFilledFields(
  submittedFields: PsrAuthenticationFieldValue[],
  rawRequirement: Record<string, any>,
  request: Record<string, any>,
) {
  for (const key of Object.keys(
    rawRequirement.RequiredFieldsFromUser?.AuthenticationFields ?? {},
  ).filter((candidate) => candidate !== '$type')) {
    const sourceField = rawRequirement.RequiredFieldsFromUser.AuthenticationFields[key]
    if (!sourceField) {
      continue
    }

    if (sourceField.Type !== 4 && sourceField.ResendField) {
      const providedField = submittedFields.find((candidate) => candidate.Key === key)
      if (providedField) {
        const copiedField = { ...sourceField, Value: providedField.Value }
        delete copiedField.$type
        request.RequiredFieldsFromUser.AuthenticationFields[key] = copiedField
      }
    }
  }
}

function copyResendFields(rawRequirement: Record<string, any>, request: Record<string, any>) {
  for (const key of Object.keys(
    rawRequirement.RequiredFieldsFromUser?.AuthenticationFields ?? {},
  ).filter((candidate) => candidate !== '$type')) {
    const sourceField = rawRequirement.RequiredFieldsFromUser.AuthenticationFields[key]
    if (sourceField?.ResendField) {
      const copiedField = { ...sourceField }
      delete copiedField.$type
      request.RequiredFieldsFromUser.AuthenticationFields[key] = copiedField
    }
  }
}

export async function buildCredentialRequest(
  context: BuildRequestContext,
  rawRequirement: unknown,
  requirement: PsrAuthenticationRequirement,
) {
  if (!rawRequirement || typeof rawRequirement !== 'object') {
    throw new Error('Request Type is not supported.')
  }

  if (requirement.AuthorizationCode != null) {
    if (
      String((rawRequirement as Record<string, any>).$type).includes('OidcCredentialRequirement')
    ) {
      const request = createCredentialRequest(rawRequirement as Record<string, any>)
      request.AuthorizationCode = requirement.AuthorizationCode
      request.CustomRedirectUrl = context.customRedirectUrl
      return createAuthRequest(context.state, request)
    }

    throw new Error('Expected requirement to be of type OidcCredentialRequirement')
  }

  if (!requirement.Fields) {
    throw new Error('Request Type is not supported.')
  }

  if (!requirement.AuthType.includes('PasswordHashCredentialRequirement')) {
    if (
      String((rawRequirement as Record<string, any>).$type).includes(
        'AdPasswordCredentialRequirement',
      ) &&
      !requirement.Fields.find((field) => field.Key === 'password')
    ) {
      let encryptedPasswordField = requirement.Fields.find(
        (field) => field.Key === 'password-encrypted',
      )
      encryptedPasswordField =
        encryptedPasswordField ??
        (rawRequirement as Record<string, any>).RequiredFieldsFromUser?.AuthenticationFields?.[
          'password-encrypted'
        ]
      const request = createCredentialRequest(rawRequirement as Record<string, any>)
      applyFilledFields(requirement.Fields, rawRequirement as Record<string, any>, request)
      request.RequiredFieldsFromUser.AuthenticationFields.password = {
        Value: encryptedPasswordField?.Value ?? '',
        Type: 0,
        ResendField: true,
        IsUserInput: true,
      }
      return createAuthRequest(context.state, request)
    }

    const request = createCredentialRequest(rawRequirement as Record<string, any>)
    applyFilledFields(requirement.Fields, rawRequirement as Record<string, any>, request)
    if (
      String((rawRequirement as Record<string, any>).$type).includes('OidcCredentialRequirement')
    ) {
      request.CustomRedirectUrl = context.customRedirectUrl
    }
    return createAuthRequest(context.state, request)
  }

  const request = createCredentialRequest(rawRequirement as Record<string, any>)
  const passwordField = requirement.Fields.find((field) => field.Key === 'password')
  if (passwordField) {
    const hashAlgorithm = (rawRequirement as Record<string, any>).HashAlgorithm ?? 0
    request.PasswordHash = (
      await context.api.encryptionManager.mtoPbkdf2(
        passwordField.Value,
        (rawRequirement as Record<string, any>).PasswordSalt,
        hashAlgorithm,
      )
    ).Hash
  } else {
    const passwordHashField = requirement.Fields.find((field) => field.Key === 'password-hash')
    request.PasswordHash = passwordHashField ? fromBase64(passwordHashField.Value) : ''
  }

  return createAuthRequest(context.state, request)
}

export async function buildConfigurationRequest(
  context: BuildRequestContext,
  rawRequirement: unknown,
  requirement: PsrAuthenticationRequirement,
) {
  if (!rawRequirement || typeof rawRequirement !== 'object') {
    throw new Error(`Configuration type is not supported: ${requirement.AuthType}`)
  }

  let request: Record<string, any>
  if (requirement.Fields) {
    request = createConfigurationRequest(rawRequirement as Record<string, any>)
    applyFilledFields(requirement.Fields, rawRequirement as Record<string, any>, request)
  } else {
    if (!requirement.AuthType.includes('PasswordHashAuthConfigurationRequirement')) {
      throw new Error(`Configuration type is not supported: ${requirement.AuthType}`)
    }

    if ((rawRequirement as Record<string, any>).PasswordPolicy) {
      const usernames = requirement.Username ? [requirement.Username] : []
      const validation = context.api.passwordManager.validatePassword(
        JSON.parse((rawRequirement as Record<string, any>).PasswordPolicy),
        requirement.NewPassword ?? '',
        usernames,
      )
      if (!validation.isValid) {
        throw new Error('The entered password is not valid')
      }
    }

    const clientHashAlgorithm = (rawRequirement as Record<string, any>).ClientHashAlgorithm ?? 0
    const encryptionChain =
      (rawRequirement as Record<string, any>).EncryptionChain ??
      (context.api.encryptionManager.getEncryptionVersion() === 0 ? 1 : 3)
    const passwordHash = await context.api.encryptionManager.mtoPbkdf2(
      requirement.NewPassword ?? '',
      undefined,
      clientHashAlgorithm,
    )

    request = {
      $type:
        'PsrAuthenticationObjectLib.Authentication.AuthConfiguration.PasswordHashAuthConfiguration, PsrAuthenticationObjectLib',
      AuthType: 10,
      UserKey: toBase64(
        toBinaryString(
          await context.api.encryptionManager.encrypt(
            encryptionChain,
            requirement.NewPassword ?? '',
            context.state.currentUserPrivateKey ?? '',
          ),
        ),
      ),
      PasswordHash: passwordHash.Hash,
      PasswordSalt: passwordHash.Salt,
      ClientHashAlgorithm: passwordHash.HashAlgorithm,
    }
  }

  if (!requirement.Fields) {
    copyResendFields(rawRequirement as Record<string, any>, request)
  }

  return createAuthRequest(context.state, request)
}

export function replaceFilledRequirement(
  state: AuthState,
  requirement: PsrAuthenticationRequirement,
) {
  const existingRequirementIndex = state.filledAuthentications.findIndex((candidate) =>
    candidate.AuthType.includes(requirement.AuthType),
  )
  if (existingRequirementIndex >= 0) {
    state.filledAuthentications.splice(existingRequirementIndex, 1)
  }
  state.filledAuthentications.push(requirement)
}

export function findRequirementByType(
  rawRequirements: unknown[] | undefined,
  requirement: PsrAuthenticationRequirement,
) {
  return rawRequirements?.find((candidate) => matchesAuthType(candidate, requirement.AuthType))
}
