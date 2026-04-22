const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SIMILAR = 'iIl1O0';
const KEYBOARD = "^1234567890ß´qwertzuiopü+asdfghjklöä#<yxcvbnm,.-°!\"§$%&/()=?`QWERTZUIOPÜ*ASDFGHJKLÖÄ''>YXCVBNM;:_";
function characterEntropy(values) {
    if (values.length === 0) {
        return 0;
    }
    const counts = new Map();
    for (const value of values) {
        counts.set(value, (counts.get(value) ?? 0) + 1);
    }
    let entropy = 0;
    for (const count of counts.values()) {
        const probability = count / values.length;
        entropy -= probability * (Math.log(probability) / Math.log(2));
    }
    return entropy;
}
function bufferEntropy(password) {
    const bytes = Array.from(Buffer.from(password, 'utf8'));
    return characterEntropy(bytes);
}
function motionEntropy(password) {
    if (!password || password.length <= 1) {
        return 0;
    }
    const keyboardIndexes = Array.from(password).map((char) => {
        const keyboardIndex = KEYBOARD.indexOf(char);
        return keyboardIndex > 0 ? keyboardIndex : char.charCodeAt(0);
    });
    const deltas = keyboardIndexes.slice(1).map((value, index) => keyboardIndexes[index] - value);
    return characterEntropy(deltas);
}
function passwordQuality(password) {
    if (!password) {
        return 0;
    }
    let entropy = bufferEntropy(password);
    if (Math.abs(entropy) > 0) {
        entropy *= Math.log(password.length) / Math.log(16);
        let movementScore = motionEntropy(password) + motionEntropy([...password].reverse().join(''));
        if (Math.abs(movementScore) > 0) {
            movementScore /= 32;
        }
        let normalized = Math.abs(entropy * movementScore);
        if (normalized > 1) {
            normalized = 1;
        }
        entropy *= normalized;
    }
    return Math.round(entropy * 100);
}
function includesAny(source, candidates) {
    return [...candidates].some((char) => source.includes(char));
}
function randomChar(source) {
    return source.charAt(Math.floor(Math.random() * source.length));
}
function separatorValue(separator) {
    switch (separator) {
        case 3:
            return '-';
        case 2:
            return ' ';
        case 4:
            return '_';
        default:
            return '';
    }
}
export class RuntimePasswordManager {
    errors;
    constructor(errors) {
        this.errors = errors;
    }
    getPasswordStrength(password) {
        return passwordQuality(password);
    }
    validatePassword(policy, password, usernames = []) {
        if (!policy) {
            return { errors: [], isValid: true, missingCategoryCount: 0 };
        }
        const candidate = password ?? '';
        const errors = [];
        const categoryErrors = [];
        let matchingCategories = 0;
        if ((policy.PasswordLenght ?? 0) > candidate.length) {
            errors.push(this.errors.passwordLengthTooShort);
        }
        if (policy.LowerCase) {
            if (includesAny(candidate, LOWER)) {
                matchingCategories += 1;
            }
            else {
                categoryErrors.push(this.errors.lowerCaseRequired);
            }
        }
        if (policy.UpperCase) {
            if (includesAny(candidate, UPPER)) {
                matchingCategories += 1;
            }
            else {
                categoryErrors.push(this.errors.upperCaseRequired);
            }
        }
        if (policy.Numbers) {
            if (includesAny(candidate, NUMBERS)) {
                matchingCategories += 1;
            }
            else {
                categoryErrors.push(this.errors.numbersRequired);
            }
        }
        if (policy.SpecialChars) {
            const specialChars = policy.SpecialCharList ?? '';
            if (includesAny(candidate, specialChars)) {
                matchingCategories += 1;
            }
            else {
                categoryErrors.push(this.errors.specialCharsRequired);
            }
        }
        if ((policy.RequiredCategories ?? 0) !== 0 &&
            matchingCategories >= (policy.RequiredCategories ?? 0)) {
            categoryErrors.length = 0;
        }
        let missingCategoryCount = 0;
        if ((policy.RequiredCategories ?? 0) > 0) {
            missingCategoryCount = Math.max((policy.RequiredCategories ?? 0) - matchingCategories, 0);
            if (missingCategoryCount === 1) {
                categoryErrors.unshift(this.errors.remainingCategoryRequired);
            }
            else if (missingCategoryCount > 1) {
                categoryErrors.unshift(this.errors.remainingCategoriesRequired);
            }
        }
        if (policy.NotAllowedPasswordUsername &&
            usernames.filter(Boolean).some((username) => candidate.includes(username))) {
            errors.push(this.errors.notAllowedUsername);
        }
        if (!policy.SimilarChars && includesAny(candidate, SIMILAR)) {
            errors.push(this.errors.similarCharsNotAllowed);
        }
        if (policy.NotAllowedChars && includesAny(candidate, policy.NotAllowedChars)) {
            errors.push(this.errors.notAllowedChars);
        }
        const forbiddenPasswords = policy.NotAllowedPasswords ?? [];
        if (forbiddenPasswords.some((forbidden) => forbidden === candidate)) {
            errors.push(this.errors.notAllowedPassword);
        }
        if (this.getPasswordStrength(candidate) < (policy.MinimumPasswordQuality ?? 0)) {
            errors.push(this.errors.minimumQuality);
        }
        const allErrors = [...categoryErrors, ...errors];
        return {
            errors: allErrors,
            isValid: allErrors.length === 0 && missingCategoryCount === 0,
            missingCategoryCount,
        };
    }
    generatePhoneticPassword(length, syllableCount, separator = 0, useLeetSpeak = false) {
        let password = '';
        const syllableLength = Math.floor(length / syllableCount);
        let segmentIndex = 0;
        let alternate = 0;
        while (password.length < length) {
            let segment = '';
            while (segment.length < syllableLength &&
                password.length + segment.length + (separator !== 0 && separator !== 1 ? 1 : 0) < length) {
                const isConsonant = alternate % 2 === 0;
                const alphabet = isConsonant
                    ? useLeetSpeak
                        ? 'bdfghjklmnprstwz865'
                        : 'bdfghjklmnprstwz'
                    : useLeetSpeak
                        ? 'aeiou1304'
                        : 'aeiou';
                segment += randomChar(alphabet);
                alternate += 1;
            }
            if (separator === 0) {
                password += segment;
            }
            else if (separator === 1) {
                password += segment.charAt(0).toUpperCase() + segment.slice(1);
            }
            else {
                password += `${segmentIndex === 0 ? '' : separatorValue(separator)}${segment}`;
            }
            segmentIndex += 1;
        }
        return password;
    }
    generatePolicyPassword(policy, usernames = []) {
        if (!policy) {
            return '';
        }
        const pools = [
            policy.Numbers ? NUMBERS : '',
            policy.UpperCase ? UPPER : '',
            policy.LowerCase ? LOWER : '',
            policy.SpecialChars ? (policy.SpecialCharList ?? '') : '',
        ]
            .map((pool) => {
            let filtered = pool;
            if (policy.NotAllowedChars?.length) {
                filtered = [...filtered]
                    .filter((char) => !policy.NotAllowedChars?.includes(char))
                    .join('');
            }
            if (!policy.SimilarChars) {
                filtered = [...filtered].filter((char) => !SIMILAR.includes(char)).join('');
            }
            return filtered;
        })
            .filter(Boolean);
        if (pools.length === 0) {
            return '';
        }
        for (let attempt = 0; attempt < 100; attempt += 1) {
            let candidate = '';
            for (let index = 0; index < (policy.PasswordLenght ?? 0); index += 1) {
                candidate += randomChar(pools[Math.floor(Math.random() * pools.length)]);
            }
            if (this.validatePassword(policy, candidate, usernames).errors.length === 0) {
                return candidate;
            }
        }
        return '';
    }
}
