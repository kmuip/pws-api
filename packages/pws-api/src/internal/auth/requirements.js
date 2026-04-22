export function isObject(value) {
    return typeof value === 'object' && value !== null;
}
export function isUserKeySignatureRequirement(value) {
    return (isObject(value) &&
        typeof value.$type === 'string' &&
        value.$type.includes('AuthenticationUserKeySignatureRequirement'));
}
export function isCompletedAuthentication(value) {
    return (isObject(value) &&
        typeof value.$type === 'string' &&
        value.$type.includes('AuthenticationResultCompleted'));
}
export function throwOnFailedLogin(step) {
    if (typeof step.$type === 'string' && step.$type.includes('AuthenticationResultLoginFailed')) {
        throw new Error(JSON.stringify(step.LoginLock));
    }
}
export function getLatestAuthStep(state) {
    return [...state.authenticationSteps]
        .reverse()
        .find((step) => !(isObject(step) &&
        typeof step.$type === 'string' &&
        step.$type.includes('AuthenticationResultLoginFailed')));
}
export function matchesAuthType(value, authType) {
    return isObject(value) && typeof value.$type === 'string' && value.$type.includes(authType);
}
function buildFieldValue(key, field, requirement) {
    return {
        Key: key,
        Name: key,
        FieldType: field.Type,
        Value: field.Value ?? '',
        Requirement: requirement,
    };
}
function fillInteractiveFields(target, rawRequirement) {
    const fields = rawRequirement.RequiredFieldsFromUser?.AuthenticationFields;
    if (!fields || typeof fields !== 'object') {
        throw new Error('FillableAuth or fields of authReq is not defined');
    }
    target.Fields = Object.keys(fields)
        .filter((key) => key !== '$type')
        .map((key) => buildFieldValue(key, fields[key], rawRequirement));
}
export function parsePossibleRequirements(requirements, state) {
    return (requirements ?? [])
        .filter((requirement) => isObject(requirement))
        .map((requirement) => {
        if (String(requirement.$type).includes('PkiConfigurationRequirement')) {
            return {
                Name: requirement.Name,
                AuthType: 'PkiConfigurationRequirement',
                OnlyShowPkiValidCertificates: !!requirement.AllowOnlyValidCertificates,
                RequireKeyEnciphermentFlag: !!requirement.RequireKeyEnciphermentFlag,
            };
        }
        if (String(requirement.$type).includes('PkiCredentialRequirement')) {
            return {
                Name: requirement.Name,
                AuthType: 'PkiCredentialRequirement',
                HashAlgorithm: requirement.HashAlgorithm,
                RequireKeyEnciphermentFlag: !!requirement.RequireKeyEnciphermentFlag,
            };
        }
        if (String(requirement.$type).includes('PasswordHashAuthConfigurationRequirement')) {
            const parsedRequirement = {
                Name: requirement.Name,
                AuthType: 'PasswordHashAuthConfigurationRequirement',
                QualityLevel1: requirement.PasswordQualityLevel1Percentage,
                QualityLevel2: requirement.PasswordQualityLevel2Percentage,
                Username: state.username,
                NewPassword: '',
            };
            if (requirement.PasswordPolicy) {
                parsedRequirement.Policy = JSON.parse(requirement.PasswordPolicy);
            }
            return parsedRequirement;
        }
        if (String(requirement.$type).includes('GoogleAuthConfigurationRequirement')) {
            const parsedRequirement = {
                Name: requirement.Name,
                AuthType: 'GoogleAuthConfigurationRequirement',
                Secret: requirement.Secret,
            };
            fillInteractiveFields(parsedRequirement, requirement);
            return parsedRequirement;
        }
        if (String(requirement.$type).includes('OidcCredentialRequirement')) {
            return {
                Name: requirement.Name,
                AuthType: 'OidcCredentialRequirement',
                ProviderId: requirement.ProviderId,
                LoginUrl: requirement.LoginUrl,
                RedirectUrl: requirement.RedirectUrl,
                AuthorizationCode: '',
            };
        }
        const authTypeSegments = String(requirement.$type).split('.');
        const parsedRequirement = {
            Name: requirement.Name,
            AuthType: authTypeSegments[authTypeSegments.length - 1],
        };
        fillInteractiveFields(parsedRequirement, requirement);
        return parsedRequirement;
    });
}
export function parseRequirementSet(step, state) {
    if (!isObject(step)) {
        throw new Error('No authentication step available');
    }
    if (typeof step.$type === 'string' &&
        step.$type.includes('AuthenticationUserKeySignatureRequirement')) {
        throw new Error('Received type AuthenticationUserKeySignatureRequirement is expected to be handled before and not to be parsed');
    }
    throwOnFailedLogin(step);
    if (step.SessionId) {
        state.sessionId = step.SessionId;
    }
    if (typeof step.$type === 'string' && step.$type.includes('PossibleAuthCredentialRequirements')) {
        return {
            IsConfiguration: false,
            PossibleRequirements: parsePossibleRequirements(step.PossibleAuthenticationCredentialRequirements, state),
        };
    }
    if (typeof step.$type === 'string' &&
        step.$type.includes('PossibleAuthConfigurationRequirements')) {
        return {
            IsConfiguration: true,
            PossibleRequirements: parsePossibleRequirements(step.PossibleAuthenticationConfigurationRequirements, state),
        };
    }
    throw new Error(`Unsupported requirement received: ${String(step.$type)} (Unknown)`);
}
export function trackAuthStep(state, step) {
    if (step.UserImage) {
        state.userImage = step.UserImage;
    }
    if (step.UserName) {
        state.nameOfUser = step.UserName;
    }
    if (step.SessionId) {
        state.sessionId = step.SessionId;
    }
    state.authenticationSteps.push(step);
}
