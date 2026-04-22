const knownTypeMatchers = [
    ['OrganisationUnitUser', 'PsrOrganisationUnitUser'],
    ['OrganisationUnitGroup', 'PsrOrganisationUnitGroup'],
    ['Role', 'PsrRole'],
    ['ContainerItem', 'PsrContainerItem'],
    ['Container', 'PsrContainer'],
    ['ActiveDirectoryProfile', 'PsrActiveDirectoryProfile'],
];
function hydrateSingle(value, typeConstructors) {
    if (!value || typeof value !== 'object') {
        return value;
    }
    if (Array.isArray(value)) {
        return value.map((item) => hydrateSingle(item, typeConstructors));
    }
    const hydratedObject = value;
    for (const [key, nestedValue] of Object.entries(hydratedObject)) {
        hydratedObject[key] = hydrateSingle(nestedValue, typeConstructors);
    }
    const runtimeType = typeof hydratedObject.$type === 'string' ? hydratedObject.$type : '';
    for (const [matcher, constructorName] of knownTypeMatchers) {
        if (runtimeType.includes(matcher)) {
            const ctor = typeConstructors[constructorName];
            if (ctor) {
                return Object.setPrototypeOf(hydratedObject, new ctor());
            }
        }
    }
    return hydratedObject;
}
export function hydrateResponse(value, typeConstructors) {
    return hydrateSingle(value, typeConstructors);
}
