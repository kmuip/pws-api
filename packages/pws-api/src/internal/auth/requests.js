import { fromBase64, toBase64 } from '../utils.js';
import { matchesAuthType } from './requirements.js';
function toBinaryString(value) {
    return typeof value === 'string' ? value : Buffer.from(value).toString('binary');
}
export function createAuthRequest(state, request) {
    return {
        ...request,
        Database: state.database ?? null,
        Username: state.username ?? null,
        OperationMode: state.operationMode,
        ...(state.sessionId ? { SessionId: state.sessionId } : {}),
        ClientInformation: state.clientInformation,
    };
}
function createRequiredFieldsContainer() {
    return { AuthenticationFields: {} };
}
function createCredentialRequest(rawRequirement) {
    const requirementType = String(rawRequirement.$type);
    let request;
    if (requirementType.includes('AdPasswordCredentialRequirement')) {
        request = {
            $type: 'PsrAuthenticationObjectLib.Authentication.AuthData.AdPasswordCredential, PsrAuthenticationObjectLib',
            AuthType: 10,
        };
    }
    else if (requirementType.includes('GoogleAuthCredentialRequirement')) {
        request = {
            $type: 'PsrAuthenticationObjectLib.Authentication.AuthData.GoogleAuthCredential, PsrAuthenticationObjectLib',
            AuthType: 1,
        };
    }
    else if (requirementType.includes('PasswordHashCredentialRequirement')) {
        request = {
            $type: 'PsrAuthenticationObjectLib.Authentication.AuthData.PasswordHashCredential, PsrAuthenticationObjectLib',
            AuthType: 10,
            PasswordHash: '',
        };
    }
    else if (requirementType.includes('PkiCredentialRequirement')) {
        request = {
            $type: 'PsrAuthenticationObjectLib.Authentication.AuthData.PkiCredential, PsrAuthenticationObjectLib',
            AuthType: 4,
            Challenge: '',
            ChallengeDbSignature: '',
            ChallengeCertSignature: '',
            CertificateThumbprint: '',
        };
    }
    else if (requirementType.includes('RsaSecurIdTokenCredentialRequirement')) {
        request = {
            $type: 'PsrAuthenticationObjectLib.Authentication.AuthData.RsaSecurIdTokenCredential, PsrAuthenticationObjectLib',
            AuthType: 2,
        };
    }
    else if (requirementType.includes('SafeNetOneTimePasswordCredentialRequirement')) {
        request = {
            $type: 'PsrAuthenticationObjectLib.Authentication.AuthData.SafeNetOneTimePasswordCredential, PsrAuthenticationObjectLib',
            AuthType: 3,
        };
    }
    else if (requirementType.includes('SmartCardCredentialRequirement')) {
        request = {
            $type: 'PsrAuthenticationObjectLib.Authentication.AuthData.SmartCardCredential, PsrAuthenticationObjectLib',
            AuthType: 7,
            UserCertificateRawData: '',
            Challenge: '',
            ChallengeCertSignature: '',
            ChallengeDbSignature: '',
        };
    }
    else if (requirementType.includes('YubicoOneTimePasswordCredentialRequirement')) {
        request = {
            $type: 'PsrAuthenticationObjectLib.Authentication.AuthData.YubicoOneTimePasswordCredential, PsrAuthenticationObjectLib',
            AuthType: 5,
        };
    }
    else if (requirementType.includes('RadiusTokenCredentialRequirement')) {
        request = {
            $type: 'PsrAuthenticationObjectLib.Authentication.AuthData.RadiusTokenCredential, PsrAuthenticationObjectLib',
            AuthType: 6,
        };
    }
    else if (requirementType.includes('EmailConfirmationCredentialRequirement')) {
        request = {
            $type: 'PsrAuthenticationObjectLib.Authentication.AuthData.EmailConfirmationCredential, PsrAuthenticationObjectLib',
            AuthType: 13,
        };
    }
    else if (requirementType.includes('OidcCredentialRequirement')) {
        request = {
            $type: 'PsrAuthenticationObjectLib.Authentication.AuthData.OidcCredential, PsrAuthenticationObjectLib',
            AuthType: 10,
        };
    }
    else {
        throw new Error(`Requirement is not supported: ${requirementType}`);
    }
    request.RequiredFieldsFromUser = createRequiredFieldsContainer();
    return request;
}
function createConfigurationRequest(rawRequirement) {
    const requirementType = String(rawRequirement.$type);
    let request;
    if (requirementType.includes('GoogleAuthConfigurationRequirement')) {
        request = {
            $type: 'PsrAuthenticationObjectLib.Authentication.AuthConfiguration.GoogleAuthConfiguration, PsrAuthenticationObjectLib',
            Secret: rawRequirement.Secret,
            UserIdentity: rawRequirement.UserIdentity,
            AuthType: 1,
        };
    }
    else if (requirementType.includes('PasswordHashAuthConfigurationRequirement')) {
        request = {
            $type: 'PsrAuthenticationObjectLib.Authentication.AuthConfiguration.PasswordHashAuthConfiguration, PsrAuthenticationObjectLib',
            UserKey: '',
            PasswordHash: '',
            PasswordSalt: '',
            ClientHashAlgorithm: undefined,
            AuthType: 10,
        };
    }
    else if (requirementType.includes('PkiConfigurationRequirement')) {
        request = {
            $type: 'PsrAuthenticationObjectLib.Authentication.AuthConfiguration.PkiConfiguration, PsrAuthenticationObjectLib',
            UserCertificateRawData: '',
            Challenge: rawRequirement.Challenge,
            ChallengeDbSignature: rawRequirement.ChallengeDbSignature,
            ChallengeCertSignature: '',
            HashAlgorithm: rawRequirement.HashAlgorithm,
            AuthType: 4,
        };
    }
    else if (requirementType.includes('RsaSecurIdTokenConfigurationRequirement')) {
        request = {
            $type: 'PsrAuthenticationObjectLib.Authentication.AuthConfiguration.RsaSecurIdTokenConfiguration, PsrAuthenticationObjectLib',
            AuthType: 2,
        };
    }
    else if (requirementType.includes('SafeNetOneTimePasswordConfigurationRequirement')) {
        request = {
            $type: 'PsrAuthenticationObjectLib.Authentication.AuthConfiguration.SafeNetOneTimePasswordConfiguration, PsrAuthenticationObjectLib',
            AuthType: 3,
        };
    }
    else if (requirementType.includes('SmartCardConfigurationRequirement')) {
        request = {
            $type: 'PsrAuthenticationObjectLib.Authentication.AuthConfiguration.SmartCardConfiguration, PsrAuthenticationObjectLib',
            AuthType: 7,
            UserCertificateRawData: rawRequirement.UserCertificateRawData,
            Challenge: rawRequirement.Challenge,
            ChallengeCertSignature: rawRequirement.ChallengeCertSignature,
            ChallengeDbSignature: rawRequirement.ChallengeDbSignature,
        };
    }
    else if (requirementType.includes('YubicoOneTimePasswordConfigurationRequirement')) {
        request = {
            $type: 'PsrAuthenticationObjectLib.Authentication.AuthConfiguration.YubicoOneTimePasswordConfiguration, PsrAuthenticationObjectLib',
            AuthType: 5,
        };
    }
    else if (requirementType.includes('DeleteFactorConfigurationRequirement')) {
        request = {
            $type: 'PsrAuthenticationObjectLib.Authentication.AuthConfiguration.DeleteFactorConfiguration, PsrAuthenticationObjectLib',
            AuthType: 9991,
        };
    }
    else {
        throw new Error(`Configuration Requirement is not supported: ${requirementType}`);
    }
    request.RequiredFieldsFromUser = createRequiredFieldsContainer();
    return request;
}
function applyFilledFields(submittedFields, rawRequirement, request) {
    for (const key of Object.keys(rawRequirement.RequiredFieldsFromUser?.AuthenticationFields ?? {}).filter((candidate) => candidate !== '$type')) {
        const sourceField = rawRequirement.RequiredFieldsFromUser.AuthenticationFields[key];
        if (!sourceField) {
            continue;
        }
        if (sourceField.Type !== 4 && sourceField.ResendField) {
            const providedField = submittedFields.find((candidate) => candidate.Key === key);
            if (providedField) {
                const copiedField = { ...sourceField, Value: providedField.Value };
                delete copiedField.$type;
                request.RequiredFieldsFromUser.AuthenticationFields[key] = copiedField;
            }
        }
    }
}
function copyResendFields(rawRequirement, request) {
    for (const key of Object.keys(rawRequirement.RequiredFieldsFromUser?.AuthenticationFields ?? {}).filter((candidate) => candidate !== '$type')) {
        const sourceField = rawRequirement.RequiredFieldsFromUser.AuthenticationFields[key];
        if (sourceField?.ResendField) {
            const copiedField = { ...sourceField };
            delete copiedField.$type;
            request.RequiredFieldsFromUser.AuthenticationFields[key] = copiedField;
        }
    }
}
export async function buildCredentialRequest(context, rawRequirement, requirement) {
    if (!rawRequirement || typeof rawRequirement !== 'object') {
        throw new Error('Request Type is not supported.');
    }
    if (requirement.AuthorizationCode != null) {
        if (String(rawRequirement.$type).includes('OidcCredentialRequirement')) {
            const request = createCredentialRequest(rawRequirement);
            request.AuthorizationCode = requirement.AuthorizationCode;
            request.CustomRedirectUrl = context.customRedirectUrl;
            return createAuthRequest(context.state, request);
        }
        throw new Error('Expected requirement to be of type OidcCredentialRequirement');
    }
    if (!requirement.Fields) {
        throw new Error('Request Type is not supported.');
    }
    if (!requirement.AuthType.includes('PasswordHashCredentialRequirement')) {
        if (String(rawRequirement.$type).includes('AdPasswordCredentialRequirement') &&
            !requirement.Fields.find((field) => field.Key === 'password')) {
            let encryptedPasswordField = requirement.Fields.find((field) => field.Key === 'password-encrypted');
            encryptedPasswordField =
                encryptedPasswordField ??
                    rawRequirement.RequiredFieldsFromUser?.AuthenticationFields?.['password-encrypted'];
            const request = createCredentialRequest(rawRequirement);
            applyFilledFields(requirement.Fields, rawRequirement, request);
            request.RequiredFieldsFromUser.AuthenticationFields.password = {
                Value: encryptedPasswordField?.Value ?? '',
                Type: 0,
                ResendField: true,
                IsUserInput: true,
            };
            return createAuthRequest(context.state, request);
        }
        const request = createCredentialRequest(rawRequirement);
        applyFilledFields(requirement.Fields, rawRequirement, request);
        if (String(rawRequirement.$type).includes('OidcCredentialRequirement')) {
            request.CustomRedirectUrl = context.customRedirectUrl;
        }
        return createAuthRequest(context.state, request);
    }
    const request = createCredentialRequest(rawRequirement);
    const passwordField = requirement.Fields.find((field) => field.Key === 'password');
    if (passwordField) {
        const hashAlgorithm = rawRequirement.HashAlgorithm ?? 0;
        request.PasswordHash = (await context.api.encryptionManager.mtoPbkdf2(passwordField.Value, rawRequirement.PasswordSalt, hashAlgorithm)).Hash;
    }
    else {
        const passwordHashField = requirement.Fields.find((field) => field.Key === 'password-hash');
        request.PasswordHash = passwordHashField ? fromBase64(passwordHashField.Value) : '';
    }
    return createAuthRequest(context.state, request);
}
export async function buildConfigurationRequest(context, rawRequirement, requirement) {
    if (!rawRequirement || typeof rawRequirement !== 'object') {
        throw new Error(`Configuration type is not supported: ${requirement.AuthType}`);
    }
    let request;
    if (requirement.Fields) {
        request = createConfigurationRequest(rawRequirement);
        applyFilledFields(requirement.Fields, rawRequirement, request);
    }
    else {
        if (!requirement.AuthType.includes('PasswordHashAuthConfigurationRequirement')) {
            throw new Error(`Configuration type is not supported: ${requirement.AuthType}`);
        }
        if (rawRequirement.PasswordPolicy) {
            const usernames = requirement.Username ? [requirement.Username] : [];
            const validation = context.api.passwordManager.validatePassword(JSON.parse(rawRequirement.PasswordPolicy), requirement.NewPassword ?? '', usernames);
            if (!validation.isValid) {
                throw new Error('The entered password is not valid');
            }
        }
        const clientHashAlgorithm = rawRequirement.ClientHashAlgorithm ?? 0;
        const encryptionChain = rawRequirement.EncryptionChain ??
            (context.api.encryptionManager.getEncryptionVersion() === 0 ? 1 : 3);
        const passwordHash = await context.api.encryptionManager.mtoPbkdf2(requirement.NewPassword ?? '', undefined, clientHashAlgorithm);
        request = {
            $type: 'PsrAuthenticationObjectLib.Authentication.AuthConfiguration.PasswordHashAuthConfiguration, PsrAuthenticationObjectLib',
            AuthType: 10,
            UserKey: toBase64(toBinaryString(await context.api.encryptionManager.encrypt(encryptionChain, requirement.NewPassword ?? '', context.state.currentUserPrivateKey ?? ''))),
            PasswordHash: passwordHash.Hash,
            PasswordSalt: passwordHash.Salt,
            ClientHashAlgorithm: passwordHash.HashAlgorithm,
        };
    }
    if (!requirement.Fields) {
        copyResendFields(rawRequirement, request);
    }
    return createAuthRequest(context.state, request);
}
export function replaceFilledRequirement(state, requirement) {
    const existingRequirementIndex = state.filledAuthentications.findIndex((candidate) => candidate.AuthType.includes(requirement.AuthType));
    if (existingRequirementIndex >= 0) {
        state.filledAuthentications.splice(existingRequirementIndex, 1);
    }
    state.filledAuthentications.push(requirement);
}
export function findRequirementByType(rawRequirements, requirement) {
    return rawRequirements?.find((candidate) => matchesAuthType(candidate, requirement.AuthType));
}
