export declare const serviceManifest: {
    readonly openSession: {
        readonly args: readonly [];
        readonly endpoint: "OpenSession";
        readonly payload: readonly [];
        readonly transport: "getData";
    };
    readonly forkSession: {
        readonly args: readonly ["t", "e", "a"];
        readonly endpoint: "ForkSession";
        readonly payload: readonly [readonly ["clientInstanceId", "t"], readonly ["clientType", "e"], readonly ["clientVersion", "a"]];
        readonly transport: "postData";
    };
    readonly closeSession: {
        readonly args: readonly [];
        readonly endpoint: "CloseSession";
        readonly payload: readonly [];
        readonly transport: "getData";
    };
    readonly getServerLicenseModuleList: {
        readonly args: readonly [];
        readonly endpoint: "GetServerLicenseModuleList";
        readonly payload: readonly [];
        readonly transport: "getData";
    };
    readonly getActiveDirectoryProfileList: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetActiveDirectoryProfileList";
        readonly payload: readonly [readonly ["filter", "t"]];
        readonly transport: "postData";
    };
    readonly getActiveDirectoryProfileListFilter: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetActiveDirectoryProfileListFilter";
        readonly payload: readonly [readonly ["defaultFilter", "t"]];
        readonly transport: "postData";
    };
    readonly getActiveDirectoryProfileInvolvedOrganisationUnit: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetActiveDirectoryProfileInvolvedOrganisationUnit";
        readonly payload: readonly [readonly ["dataId", "t"]];
        readonly transport: "postData";
    };
    readonly deleteActiveDirectoryProfile: {
        readonly args: readonly ["t"];
        readonly endpoint: "DeleteActiveDirectoryProfile";
        readonly payload: readonly [readonly ["profile", "t"]];
        readonly transport: "postData";
    };
    readonly updateActiveDirectoryProfile: {
        readonly args: readonly ["t"];
        readonly endpoint: "UpdateActiveDirectoryProfile";
        readonly payload: readonly [readonly ["profile", "t"]];
        readonly transport: "postData";
    };
    readonly addActiveDirectoryProfile: {
        readonly args: readonly ["t"];
        readonly endpoint: "AddActiveDirectoryProfile";
        readonly payload: readonly [readonly ["profile", "t"]];
        readonly transport: "postData";
    };
    readonly getActiveDirectoryRootElements: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "GetActiveDirectoryRootElements";
        readonly payload: readonly [readonly ["profileId", "t"], readonly ["cnFilter", "e"]];
        readonly transport: "postData";
    };
    readonly getActiveDirectoryMembersOfGroup: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "GetActiveDirectoryMembersOfGroup";
        readonly payload: readonly [readonly ["profileId", "t"], readonly ["objectGuid", "e"]];
        readonly transport: "postData";
    };
    readonly getActiveDirectoryElementList: {
        readonly args: readonly ["t", "e", "a", "o"];
        readonly endpoint: "GetActiveDirectoryElementList";
        readonly payload: readonly [readonly ["profileId", "t"], readonly ["elementName", "e"], readonly ["search", "a"], readonly ["fullSearch", "o"]];
        readonly transport: "postData";
    };
    readonly getSpecificActiveDirectoryElements: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "GetSpecificActiveDirectoryElements";
        readonly payload: readonly [readonly ["profileId", "t"], readonly ["objectGuids", "e"]];
        readonly transport: "postData";
    };
    readonly importActiveDirectory: {
        readonly args: readonly ["t", "e", "a", "o", "i"];
        readonly endpoint: "ImportActiveDirectory";
        readonly payload: readonly [readonly ["profileId", "t"], readonly ["newActiveDirectoryObjects", "e"], readonly ["excludeItems", "a"], readonly ["parentOrganisationUnitId", "o"], readonly ["tokenIdentity", "i"]];
        readonly transport: "postData";
    };
    readonly syncActiveDirectory: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "SyncActiveDirectory";
        readonly payload: readonly [readonly ["profileId", "t"], readonly ["tokenIdentity", "e"]];
        readonly transport: "postData";
    };
    readonly generateActiveDirectorySummaryDetails: {
        readonly args: readonly ["t", "e", "a", "o", "i", "r"];
        readonly endpoint: "GenerateActiveDirectorySummaryDetails";
        readonly payload: readonly [readonly ["profileId", "t"], readonly ["newActiveDirectoryObjects", "e"], readonly ["excludeItems", "a"], readonly ["parentOrganisationUnitId", "o"], readonly ["tokenIdentity", "i"], readonly ["withSyncInfo", "r"]];
        readonly transport: "postData";
    };
    readonly getActiveDirectorySummaryDetails: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetActiveDirectorySummaryDetails";
        readonly payload: readonly [readonly ["tokenIdentity", "t"]];
        readonly transport: "postData";
    };
    readonly getApplication: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetApplication";
        readonly payload: readonly [readonly ["id", "t"]];
        readonly transport: "postData";
    };
    readonly getApplicationListFilter: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetApplicationListFilter";
        readonly payload: readonly [readonly ["defaultFilter", "t"]];
        readonly transport: "postData";
    };
    readonly getApplicationList: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetApplicationList";
        readonly payload: readonly [readonly ["filter", "t"]];
        readonly transport: "postData";
    };
    readonly addApplication: {
        readonly args: readonly ["t"];
        readonly endpoint: "AddApplication";
        readonly payload: readonly [readonly ["application", "t"]];
        readonly transport: "postData";
    };
    readonly updateApplication: {
        readonly args: readonly ["t"];
        readonly endpoint: "UpdateApplication";
        readonly payload: readonly [readonly ["application", "t"]];
        readonly transport: "postData";
    };
    readonly addDataBinding: {
        readonly args: readonly ["t", "e", "a", "o"];
        readonly endpoint: "AddDataBinding";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["dataType", "e"], readonly ["parentId", "a"], readonly ["parentType", "o"]];
        readonly transport: "postData";
    };
    readonly removeAllDataBinding: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "RemoveAllDataBinding";
        readonly payload: readonly [readonly ["id", "t"], readonly ["parentType", "e"]];
        readonly transport: "postData";
    };
    readonly getDataBindingsByData: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "GetDataBindingByData";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["parentType", "e"]];
        readonly transport: "postData";
    };
    readonly getDataBindingsByParent: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "GetDataBindingsByParent";
        readonly payload: readonly [readonly ["parentId", "t"], readonly ["dataType", "e"]];
        readonly transport: "postData";
    };
    readonly removeDataBinding: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "RemoveDataBinding";
        readonly payload: readonly [readonly ["id", "t"], readonly ["parentId", "e"]];
        readonly transport: "postData";
    };
    readonly getContainerListFilter: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "GetContainerListFilter";
        readonly payload: readonly [readonly ["containerType", "t"], readonly ["defaultFilter", "e"]];
        readonly transport: "postData";
    };
    readonly getContainerList: {
        readonly args: readonly ["t", "e", "a"];
        readonly endpoint: "GetContainerList";
        readonly payload: readonly [readonly ["containerType", "t"], readonly ["filter", "e"], readonly ["behaviours", "a"]];
        readonly transport: "postData";
    };
    readonly getContainerCount: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "GetContainerCount";
        readonly payload: readonly [readonly ["containerType", "t"], readonly ["filter", "e"]];
        readonly transport: "postData";
    };
    readonly getContainer: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetContainer";
        readonly payload: readonly [readonly ["id", "t"]];
        readonly transport: "postData";
    };
    readonly updateContainer: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "UpdateContainer";
        readonly payload: readonly [readonly ["container", "t"]];
        readonly transport: "postData";
    };
    readonly addContainer: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "AddContainer";
        readonly payload: readonly [readonly ["container", "t"], readonly ["parentOrganisationUnitId", "e"]];
        readonly transport: "postData";
    };
    readonly addContainerV2: {
        readonly args: readonly ["t"];
        readonly endpoint: "AddContainerV2";
        readonly payload: readonly [readonly ["container", "t"]];
        readonly transport: "postData";
    };
    readonly initContainerItem: {
        readonly args: readonly ["t"];
        readonly endpoint: "InitContainerItem";
        readonly payload: readonly [readonly ["containerItemType", "t"]];
        readonly transport: "postData";
    };
    readonly deleteContainer: {
        readonly args: readonly ["t"];
        readonly endpoint: "DeleteContainer";
        readonly payload: readonly [readonly ["container", "t"]];
        readonly transport: "postData";
    };
    readonly getContainerItem: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetContainerItem";
        readonly payload: readonly [readonly ["itemId", "t"]];
        readonly transport: "postData";
    };
    readonly getContainerInvolvedOrganisationUnit: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetContainerInvolvedOrganisationUnit";
        readonly payload: readonly [readonly ["dataId", "t"]];
        readonly transport: "postData";
    };
    readonly getContainerHistoryList: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "GetContainerHistoryList";
        readonly payload: readonly [readonly ["containerType", "t"], readonly ["id", "e"]];
        readonly transport: "postData";
    };
    readonly cloneContainer: {
        readonly args: readonly ["t"];
        readonly endpoint: "CloneContainer";
        readonly payload: readonly [readonly ["baseContainerId", "t"]];
        readonly transport: "postData";
    };
    readonly initContainer: {
        readonly args: readonly ["t"];
        readonly endpoint: "InitContainer";
        readonly payload: readonly [readonly ["containerType", "t"]];
        readonly transport: "postData";
    };
    readonly getContainerBrowserSsoList: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetContainerBrowserSsoList";
        readonly payload: readonly [readonly ["getContainersWithoutUrl", "t"]];
        readonly transport: "postData";
    };
    readonly SearchContainersBrowserSsoList: {
        readonly args: readonly ["t"];
        readonly endpoint: "SearchContainersBrowserSsoList";
        readonly payload: readonly [readonly ["searchValue", "t"]];
        readonly transport: "postData";
    };
    readonly getCredentialCheck: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetCredentialCheck";
        readonly payload: readonly [readonly ["containerId", "t"]];
        readonly transport: "postData";
    };
    readonly checkEmailVerification: {
        readonly args: readonly ["t"];
        readonly endpoint: "CheckEmailVerification";
        readonly payload: readonly [readonly ["userId", "t"]];
        readonly transport: "getData";
    };
    readonly addForwardingRule: {
        readonly args: readonly ["t"];
        readonly endpoint: "AddForwardingRule";
        readonly payload: readonly [readonly ["rule", "t"]];
        readonly transport: "postData";
    };
    readonly updateForwardingRule: {
        readonly args: readonly ["t"];
        readonly endpoint: "UpdateForwardingRule";
        readonly payload: readonly [readonly ["rule", "t"]];
        readonly transport: "postData";
    };
    readonly deleteForwardingRule: {
        readonly args: readonly ["t"];
        readonly endpoint: "DeleteForwardingRule";
        readonly payload: readonly [readonly ["rule", "t"]];
        readonly transport: "postData";
    };
    readonly getForwardingRuleList: {
        readonly args: readonly [];
        readonly endpoint: "GetForwardingRuleList";
        readonly payload: readonly [];
        readonly transport: "postData";
    };
    readonly getLogbookEntrys: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetLogbookEntrys";
        readonly payload: readonly [readonly ["filter", "t"]];
        readonly transport: "postData";
    };
    readonly addLogbookEntries: {
        readonly args: readonly ["t", "e", "a", "o"];
        readonly endpoint: "AddLogbookEntries";
        readonly payload: readonly [readonly ["logbookEvent", "t"], readonly ["dataIds", "e"], readonly ["dataType", "a"], readonly ["info", "o"]];
        readonly transport: "postData";
    };
    readonly getSingleLogbookEntry: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetSingleLogbookEntry";
        readonly payload: readonly [readonly ["logbookEntryId", "t"]];
        readonly transport: "postData";
    };
    readonly getLogbookListFilter: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetLogbookListFilter";
        readonly payload: readonly [readonly ["defaultFilter", "t"]];
        readonly transport: "postData";
    };
    readonly getLogbookCount: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetLogbookCount";
        readonly payload: readonly [readonly ["filter", "t"]];
        readonly transport: "postData";
    };
    readonly isSmtpConfigured: {
        readonly args: readonly [];
        readonly endpoint: "IsSmtpConfigured";
        readonly payload: readonly [];
        readonly transport: "postData";
    };
    readonly getOption: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "GetOption";
        readonly payload: readonly [readonly ["name", "t"], readonly ["data", "e"]];
        readonly transport: "postData";
    };
    readonly getOptions: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "GetOptions";
        readonly payload: readonly [readonly ["groups", "t"], readonly ["data", "e"]];
        readonly transport: "postData";
    };
    readonly updateStringOption: {
        readonly args: readonly ["t", "e", "a", "o", "i"];
        readonly endpoint: "UpdateStringOption";
        readonly payload: readonly [readonly ["name", "t"], readonly ["category", "e"], readonly ["group", "a"], readonly ["value", "o"], readonly ["dataId", "i"]];
        readonly transport: "postData";
    };
    readonly updatePasswordOption: {
        readonly args: readonly ["t", "e", "a", "o", "i"];
        readonly endpoint: "UpdatePasswordOption";
        readonly payload: readonly [readonly ["name", "t"], readonly ["category", "e"], readonly ["group", "a"], readonly ["value", "o"], readonly ["dataId", "i"]];
        readonly transport: "postData";
    };
    readonly updateGlobalEncryptedOption: {
        readonly args: readonly ["t", "e", "a", "o", "i"];
        readonly endpoint: "UpdateGlobalEncryptedOption";
        readonly payload: readonly [readonly ["name", "t"], readonly ["category", "e"], readonly ["group", "a"], readonly ["value", "o"], readonly ["dataId", "i"]];
        readonly transport: "postData";
    };
    readonly updateIntegerOption: {
        readonly args: readonly ["t", "e", "a", "o", "i"];
        readonly endpoint: "UpdateIntegerOption";
        readonly payload: readonly [readonly ["name", "t"], readonly ["category", "e"], readonly ["group", "a"], readonly ["value", "o"], readonly ["dataId", "i"]];
        readonly transport: "postData";
    };
    readonly updateDoubleoption: {
        readonly args: readonly ["t", "e", "a", "o", "i"];
        readonly endpoint: "UpdateDoubleoption";
        readonly payload: readonly [readonly ["name", "t"], readonly ["category", "e"], readonly ["group", "a"], readonly ["value", "o"], readonly ["dataId", "i"]];
        readonly transport: "postData";
    };
    readonly updateDateTimeOption: {
        readonly args: readonly ["t", "e", "a", "o", "i"];
        readonly endpoint: "UpdateDateTimeOption";
        readonly payload: readonly [readonly ["name", "t"], readonly ["category", "e"], readonly ["group", "a"], readonly ["value", "o"], readonly ["dataId", "i"]];
        readonly transport: "postData";
    };
    readonly updateBooleanOption: {
        readonly args: readonly ["t", "e", "a", "o", "i"];
        readonly endpoint: "UpdateBooleanOption";
        readonly payload: readonly [readonly ["name", "t"], readonly ["category", "e"], readonly ["group", "a"], readonly ["value", "o"], readonly ["dataId", "i"]];
        readonly transport: "postData";
    };
    readonly updateListOption: {
        readonly args: readonly ["t", "e", "a", "o", "i"];
        readonly endpoint: "UpdateListOption";
        readonly payload: readonly [readonly ["name", "t"], readonly ["category", "e"], readonly ["group", "a"], readonly ["value", "o"], readonly ["dataId", "i"]];
        readonly transport: "postData";
    };
    readonly updateFileOption: {
        readonly args: readonly ["t", "e", "a", "o", "i"];
        readonly endpoint: "UpdateFileOption";
        readonly payload: readonly [readonly ["name", "t"], readonly ["category", "e"], readonly ["group", "a"], readonly ["value", "o"], readonly ["dataId", "i"]];
        readonly transport: "postData";
    };
    readonly updateFolderOption: {
        readonly args: readonly ["t", "e", "a", "o", "i"];
        readonly endpoint: "UpdateFolderOption";
        readonly payload: readonly [readonly ["name", "t"], readonly ["category", "e"], readonly ["group", "a"], readonly ["value", "o"], readonly ["dataId", "i"]];
        readonly transport: "postData";
    };
    readonly updateTimeOption: {
        readonly args: readonly ["t", "e", "a", "o", "i"];
        readonly endpoint: "UpdateTimeOption";
        readonly payload: readonly [readonly ["name", "t"], readonly ["category", "e"], readonly ["group", "a"], readonly ["value", "o"], readonly ["dataId", "i"]];
        readonly transport: "postData";
    };
    readonly updateIntegerExtOption: {
        readonly args: readonly ["t", "e", "a", "o", "i"];
        readonly endpoint: "UpdateIntegerExtOption";
        readonly payload: readonly [readonly ["name", "t"], readonly ["category", "e"], readonly ["group", "a"], readonly ["value", "o"], readonly ["dataId", "i"]];
        readonly transport: "postData";
    };
    readonly updateDoubleExtOption: {
        readonly args: readonly ["t", "e", "a", "o", "i"];
        readonly endpoint: "UpdateDoubleExtOption";
        readonly payload: readonly [readonly ["name", "t"], readonly ["category", "e"], readonly ["group", "a"], readonly ["value", "o"], readonly ["dataId", "i"]];
        readonly transport: "postData";
    };
    readonly updateCollectionOption: {
        readonly args: readonly ["t", "e", "a", "o"];
        readonly endpoint: "UpdateCollectionOption";
        readonly payload: readonly [readonly ["name", "t"], readonly ["collection", "e"], readonly ["value", "a"], readonly ["dataId", "o"]];
        readonly transport: "postData";
    };
    readonly deleteOption: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "DeleteOption";
        readonly payload: readonly [readonly ["name", "t"], readonly ["dataId", "e"]];
        readonly transport: "postData";
    };
    readonly deleteCollectionOption: {
        readonly args: readonly ["t", "e", "a"];
        readonly endpoint: "DeleteCollectionOption";
        readonly payload: readonly [readonly ["name", "t"], readonly ["collection", "e"], readonly ["dataId", "a"]];
        readonly transport: "postData";
    };
    readonly deleteDataOptions: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "DeleteDataOptions";
        readonly payload: readonly [readonly ["groups", "t"], readonly ["dataId", "e"]];
        readonly transport: "postData";
    };
    readonly getOrganisationUnitList: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetOrganisationUnitList";
        readonly payload: readonly [readonly ["filter", "t"]];
        readonly transport: "postData";
    };
    readonly getOrganisationUnitListFilter: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetOrganisationUnitListFilter";
        readonly payload: readonly [readonly ["defaultFilter", "t"]];
        readonly transport: "postData";
    };
    readonly getOrganisationUnitStructure: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetOrganisationUnitStructure";
        readonly payload: readonly [readonly ["listFilter", "t"]];
        readonly transport: "postData";
    };
    readonly getOrganisationUnitUser: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetOrganisationUnitUser";
        readonly payload: readonly [readonly ["userId", "t"]];
        readonly transport: "postData";
    };
    readonly getOrganisationUnitGroup: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetOrganisationUnitGroup";
        readonly payload: readonly [readonly ["groupId", "t"]];
        readonly transport: "postData";
    };
    readonly getOrganisationUnitUserList: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetOrganisationUnitUserList";
        readonly payload: readonly [readonly ["filter", "t"]];
        readonly transport: "postData";
    };
    readonly changeOrganisationUnitPassword: {
        readonly args: readonly ["t", "e", "a", "o", "i"];
        readonly endpoint: "ChangeOrganisationUnitPassword";
        readonly payload: readonly [readonly ["userId", "t"], readonly ["oldHash", "e"], readonly ["newHash", "a"], readonly ["newSalt", "o"], readonly ["newEncryptedPrivateKey", "i"]];
        readonly transport: "postData";
    };
    readonly getUserInvolvedOrganisationUnit: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetUserInvolvedOrganisationUnit";
        readonly payload: readonly [readonly ["dataId", "t"]];
        readonly transport: "postData";
    };
    readonly getGroupInvolvedOrganisationUnit: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetGroupInvolvedOrganisationUnit";
        readonly payload: readonly [readonly ["dataId", "t"]];
        readonly transport: "postData";
    };
    readonly getOrganisationUnitImageSource: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetOrganisationUnitImageSource";
        readonly payload: readonly [readonly ["organisationId", "t"]];
        readonly transport: "postData";
    };
    readonly hasUserMasterKeyMode: {
        readonly args: readonly ["t"];
        readonly endpoint: "HasUserMasterKeyMode";
        readonly payload: readonly [readonly ["id", "t"]];
        readonly transport: "postData";
    };
    readonly hasGroupMasterKeyMode: {
        readonly args: readonly ["t"];
        readonly endpoint: "HasGroupMasterKeyMode";
        readonly payload: readonly [readonly ["id", "t"]];
        readonly transport: "postData";
    };
    readonly addOrganisationUnitGroup: {
        readonly args: readonly ["t", "e", "a", "o"];
        readonly endpoint: "AddOrganisationUnitGroup";
        readonly payload: readonly [readonly ["group", "t"], readonly ["publicKey", "e"], readonly ["encryptedGroupPrivateKey", "a"], readonly ["parentOrganisationUnitId", "o"]];
        readonly transport: "postData";
    };
    readonly updateOrganisationUnitGroup: {
        readonly args: readonly ["t"];
        readonly endpoint: "UpdateOrganisationUnitGroup";
        readonly payload: readonly [readonly ["organisationUnitGroup", "t"]];
        readonly transport: "postData";
    };
    readonly deleteOrganisationUnitGroup: {
        readonly args: readonly ["t"];
        readonly endpoint: "DeleteOrganisationUnitGroup";
        readonly payload: readonly [readonly ["organisationUnitGroup", "t"]];
        readonly transport: "postData";
    };
    readonly addOrganisationUnitUser: {
        readonly args: readonly ["t", "e", "a", "o", "i", "r", "n"];
        readonly endpoint: "AddOrganisationUnitUser";
        readonly payload: readonly [readonly ["user", "t"], readonly ["userPasswordHash", "e"], readonly ["userPasswordSalt", "a"], readonly ["publicKey", "o"], readonly ["encryptedUserPrivateKey", "i"], readonly ["encryptedCurrentUserPrivateKey", "r"], readonly ["parentOrganisationUnitId", "n"]];
        readonly transport: "postData";
    };
    readonly addOrganisationUnitUser2: {
        readonly args: readonly ["t", "e", "a", "o", "i", "r", "n", "p"];
        readonly endpoint: "AddOrganisationUnitUser2";
        readonly payload: readonly [readonly ["user", "t"], readonly ["userPasswordHash", "e"], readonly ["userPasswordSalt", "a"], readonly ["publicKey", "o"], readonly ["encryptedUserPrivateKey", "i"], readonly ["encryptedCurrentUserPrivateKey", "r"], readonly ["clientHashAlgorithm", "n"], readonly ["parentOrganisationUnitId", "p"]];
        readonly transport: "postData";
    };
    readonly updateOrganisationUnitUser: {
        readonly args: readonly ["t"];
        readonly endpoint: "UpdateOrganisationUnitUser";
        readonly payload: readonly [readonly ["organisationUnitUser", "t"]];
        readonly transport: "postData";
    };
    readonly deleteOrganisationUnitUser: {
        readonly args: readonly ["t"];
        readonly endpoint: "DeleteOrganisationUnitUser";
        readonly payload: readonly [readonly ["organisationUnitUser", "t"]];
        readonly transport: "postData";
    };
    readonly getCurrentOrganisationUnit: {
        readonly args: readonly [];
        readonly endpoint: "GetCurrentOrganisationUnit";
        readonly payload: readonly [];
        readonly transport: "getData";
    };
    readonly getPolicy: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetPolicy";
        readonly payload: readonly [readonly ["policyId", "t"]];
        readonly transport: "postData";
    };
    readonly getPolicies: {
        readonly args: readonly [];
        readonly endpoint: "GetPolicies";
        readonly payload: readonly [readonly ["take", "0"]];
        readonly transport: "postData";
    };
    readonly getCategoryPolicy: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetCategoryPolicy";
        readonly payload: readonly [readonly ["category", "t"]];
        readonly transport: "postData";
    };
    readonly registerProgressToken: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "RegisterProgressToken";
        readonly payload: readonly [readonly ["tokenInfo", "t"], readonly ["tokenName", "e"]];
        readonly transport: "postData";
    };
    readonly unregisterProgressToken: {
        readonly args: readonly ["t"];
        readonly endpoint: "UnregisterProgressToken";
        readonly payload: readonly [readonly ["tokenIdentity", "t"]];
        readonly transport: "postData";
    };
    readonly getCurrentUserProgressTokens: {
        readonly args: readonly [];
        readonly endpoint: "GetCurrentUserProgressTokens";
        readonly payload: readonly [];
        readonly transport: "getData";
    };
    readonly getLegitimateDataRight: {
        readonly args: readonly ["t", "e", "a"];
        readonly endpoint: "GetLegitimateDataRight";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["legitimateId", "e"], readonly ["rights", "a"]];
        readonly transport: "postData";
    };
    readonly getLegitimateDataRights: {
        readonly args: readonly ["t", "e", "a"];
        readonly endpoint: "GetLegitimateDataRights";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["checkRights", "e"], readonly ["showDeletedNames", "a"]];
        readonly transport: "postData";
    };
    readonly getMultiLegitimateDataRights: {
        readonly args: readonly ["t", "e", "a"];
        readonly endpoint: "GetMultiLegitimateDataRights";
        readonly payload: readonly [readonly ["dataIds", "t"], readonly ["checkRights", "e"], readonly ["showDeletedNames", "a"]];
        readonly transport: "postData";
    };
    readonly updateLegitimateDataRightKey: {
        readonly args: readonly ["t", "e", "a"];
        readonly endpoint: "UpdateLegitimateDataRightKey";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["legitimateId", "e"], readonly ["rightKey", "a"]];
        readonly transport: "postData";
    };
    readonly removeCurrentOrganisationUnitFromRights: {
        readonly args: readonly ["t"];
        readonly endpoint: "RemoveCurrentOrganisationUnitFromRights";
        readonly payload: readonly [readonly ["dataId", "t"]];
        readonly transport: "postData";
    };
    readonly addLegitimateDataRight: {
        readonly args: readonly ["t", "e", "a"];
        readonly endpoint: "AddLegitimateDataRight";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["legitimateId", "e"], readonly ["rights", "a"]];
        readonly transport: "postData";
    };
    readonly updateLegitimateDataRight: {
        readonly args: readonly ["t", "e", "a"];
        readonly endpoint: "UpdateLegitimateDataRight";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["legitimateId", "e"], readonly ["rights", "a"]];
        readonly transport: "postData";
    };
    readonly removeAllLegitimateDataRights: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "RemoveAllLegitimateDataRights";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["allRights", "e"]];
        readonly transport: "postData";
    };
    readonly updateLegitimateDataRightOwnerRight: {
        readonly args: readonly ["t", "e", "a"];
        readonly endpoint: "UpdateLegitimateDataRightOwnerRight";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["legitimateId", "e"], readonly ["ownerRight", "a"]];
        readonly transport: "postData";
    };
    readonly updateLegitimateDataRightSecuredData: {
        readonly args: readonly ["t", "e", "a"];
        readonly endpoint: "UpdateLegitimateDataRightSecuredData";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["legitimateId", "e"], readonly ["secured", "a"]];
        readonly transport: "postData";
    };
    readonly removeLegitimateDataRight: {
        readonly args: readonly ["t", "e", "a"];
        readonly endpoint: "RemoveLegitimateDataRight";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["legitimateId", "e"], readonly ["rights", "a"]];
        readonly transport: "postData";
    };
    readonly updateLegitimateDataRightValidDate: {
        readonly args: readonly ["t", "e", "a", "o"];
        readonly endpoint: "UpdateLegitimateDataRightValidDate";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["legitimateId", "e"], readonly ["validFrom", "a"], readonly ["validTo", "o"]];
        readonly transport: "postData";
    };
    readonly updateLegitimateSealId: {
        readonly args: readonly ["t", "e", "a"];
        readonly endpoint: "UpdateLegitimateSealId";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["legitimateId", "e"], readonly ["sealId", "a"]];
        readonly transport: "postData";
    };
    readonly batchUpdateRights: {
        readonly args: readonly ["t"];
        readonly endpoint: "BatchUpdateRights";
        readonly payload: readonly [readonly ["items", "t"]];
        readonly transport: "postData";
    };
    readonly getCurrentConnectionDataRights: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetCurrentConnectionDataRights";
        readonly payload: readonly [readonly ["dataId", "t"]];
        readonly transport: "postData";
    };
    readonly getCurrentConnectionDataRightList: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetCurrentConnectionDataRightList";
        readonly payload: readonly [readonly ["dataIds", "t"]];
        readonly transport: "postData";
    };
    readonly getLegitimateDataRightsWithTemporalRights: {
        readonly args: readonly ["t", "e", "a"];
        readonly endpoint: "GetLegitimateDataRightsWithTemporalRights";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["validFrom", "e"], readonly ["validTo", "a"]];
        readonly transport: "postData";
    };
    readonly getLegitimateDataRightsWithoutDeleted: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetLegitimateDataRightsWithoutDeleted";
        readonly payload: readonly [readonly ["dataId", "t"]];
        readonly transport: "postData";
    };
    readonly getLegitimateDataRightCheckRoles: {
        readonly args: readonly ["t", "e", "a"];
        readonly endpoint: "GetLegitimateDataRightCheckRoles";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["legitimateId", "e"], readonly ["rights", "a"]];
        readonly transport: "postData";
    };
    readonly requestDataRight: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "RequestDataRight";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["type", "e"]];
        readonly transport: "postData";
    };
    readonly getDatabaseAdministratorDataRights: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetDatabaseAdministratorDataRights";
        readonly payload: readonly [readonly ["dataId", "t"]];
        readonly transport: "postData";
    };
    readonly removeAllLegitimateDataRightsExcept: {
        readonly args: readonly ["t", "e", "a"];
        readonly endpoint: "RemoveAllLegitimateDataRightsExcept";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["excludedLegitimateIds", "e"], readonly ["excludeCurrentUserOrRoleRight", "a"]];
        readonly transport: "postData";
    };
    readonly getRoleList: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetRoleList";
        readonly payload: readonly [readonly ["filter", "t"]];
        readonly transport: "postData";
    };
    readonly getRoleListFilter: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetRoleListFilter";
        readonly payload: readonly [readonly ["defaultFilter", "t"]];
        readonly transport: "postData";
    };
    readonly getUsersInRole: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetUsersInRole";
        readonly payload: readonly [readonly ["roleId", "t"]];
        readonly transport: "postData";
    };
    readonly getRole: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetRole";
        readonly payload: readonly [readonly ["roleId", "t"]];
        readonly transport: "postData";
    };
    readonly getUserRoles: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetUserRoles";
        readonly payload: readonly [readonly ["userId", "t"]];
        readonly transport: "postData";
    };
    readonly deleteRole: {
        readonly args: readonly ["t"];
        readonly endpoint: "DeleteRole";
        readonly payload: readonly [readonly ["role", "t"]];
        readonly transport: "postData";
    };
    readonly addRole: {
        readonly args: readonly ["t", "e", "a"];
        readonly endpoint: "AddRole";
        readonly payload: readonly [readonly ["role", "t"], readonly ["publicKey", "e"], readonly ["encryptedRolePrivateKey", "a"]];
        readonly transport: "postData";
    };
    readonly updateRole: {
        readonly args: readonly ["t"];
        readonly endpoint: "UpdateRole";
        readonly payload: readonly [readonly ["role", "t"]];
        readonly transport: "postData";
    };
    readonly hasRoleMasterKeyMode: {
        readonly args: readonly ["t"];
        readonly endpoint: "HasRoleMasterKeyMode";
        readonly payload: readonly [readonly ["id", "t"]];
        readonly transport: "postData";
    };
    readonly getRoleInvolvedOrganisationUnit: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetRoleInvolvedOrganisationUnit";
        readonly payload: readonly [readonly ["dataId", "t"]];
        readonly transport: "postData";
    };
    readonly addSeal: {
        readonly args: readonly ["t", "e", "a"];
        readonly endpoint: "AddSeal";
        readonly payload: readonly [readonly ["seal", "t"], readonly ["dataId", "e"], readonly ["dataType", "a"]];
        readonly transport: "postData";
    };
    readonly updateSeal: {
        readonly args: readonly ["t", "e", "a"];
        readonly endpoint: "UpdateSeal";
        readonly payload: readonly [readonly ["seal", "t"], readonly ["dataId", "e"], readonly ["dataType", "a"]];
        readonly transport: "postData";
    };
    readonly getSeal: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetSeal";
        readonly payload: readonly [readonly ["sealId", "t"]];
        readonly transport: "postData";
    };
    readonly breakSeal: {
        readonly args: readonly ["t"];
        readonly endpoint: "BreakSeal";
        readonly payload: readonly [readonly ["sealId", "t"]];
        readonly transport: "postData";
    };
    readonly deleteKeyReleasesForUser: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "DeleteKeyReleasesForUser";
        readonly payload: readonly [readonly ["seal", "t"], readonly ["legitimateId", "e"]];
        readonly transport: "postData";
    };
    readonly updateSealKeyRelease: {
        readonly args: readonly ["t", "e", "a"];
        readonly endpoint: "UpdateSealKeyRelease";
        readonly payload: readonly [readonly ["release", "t"], readonly ["dataId", "e"], readonly ["dataType", "a"]];
        readonly transport: "postData";
    };
    readonly getSealKey: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "GetSealKey";
        readonly payload: readonly [readonly ["sealKeyId", "t"], readonly ["legitimateId", "e"]];
        readonly transport: "postData";
    };
    readonly deleteSeal: {
        readonly args: readonly ["t"];
        readonly endpoint: "DeleteSeal";
        readonly payload: readonly [readonly ["sealId", "t"]];
        readonly transport: "postData";
    };
    readonly getSealTemplateList: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetSealTemplateList";
        readonly payload: readonly [readonly ["filter", "t"]];
        readonly transport: "postData";
    };
    readonly getSealTemplateInvolvedOrganisationUnits: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetSealTemplateInvolvedOrganisationUnit";
        readonly payload: readonly [readonly ["dataId", "t"]];
        readonly transport: "postData";
    };
    readonly getSealOpenType: {
        readonly args: readonly ["t", "e", "a", "o"];
        readonly endpoint: "GetSealOpenType";
        readonly payload: readonly [readonly ["seal", "t"], readonly ["dataId", "e"], readonly ["userId", "a"], readonly ["ignoreSealKey", "o"]];
        readonly transport: "postData";
    };
    readonly getSealOpenTypeBySealId: {
        readonly args: readonly ["t", "e", "a", "o"];
        readonly endpoint: "GetSealOpenTypeBySealId";
        readonly payload: readonly [readonly ["sealId", "t"], readonly ["dataId", "e"], readonly ["userId", "a"], readonly ["ignoreSealKey", "o"]];
        readonly transport: "postData";
    };
    readonly hasRelease: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "HasRelease";
        readonly payload: readonly [readonly ["seal", "t"], readonly ["legitimateId", "e"]];
        readonly transport: "postData";
    };
    readonly getTags: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetTags";
        readonly payload: readonly [readonly ["filter", "t"]];
        readonly transport: "postData";
    };
    readonly addDataFavorite: {
        readonly args: readonly ["t"];
        readonly endpoint: "AddDataFavorite";
        readonly payload: readonly [readonly ["dataId", "t"]];
        readonly transport: "postData";
    };
    readonly removeDataFavorite: {
        readonly args: readonly ["t"];
        readonly endpoint: "RemoveDataFavorite";
        readonly payload: readonly [readonly ["dataId", "t"]];
        readonly transport: "postData";
    };
    readonly getTagListFilter: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetTagListFilter";
        readonly payload: readonly [readonly ["defaultFilter", "t"]];
        readonly transport: "postData";
    };
    readonly getTagGlobalUsageInfos: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetTagGlobalUsageInfos";
        readonly payload: readonly [readonly ["take", "t"]];
        readonly transport: "postData";
    };
    readonly addTag: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "AddTag";
        readonly payload: readonly [readonly ["tag", "t"], readonly ["hexColor", "e"]];
        readonly transport: "postData";
    };
    readonly updateTag: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "UpdateTag";
        readonly payload: readonly [readonly ["tag", "t"], readonly ["hexColor", "e"]];
        readonly transport: "postData";
    };
    readonly deleteTag: {
        readonly args: readonly ["t"];
        readonly endpoint: "DeleteTag";
        readonly payload: readonly [readonly ["tag", "t"]];
        readonly transport: "postData";
    };
    readonly setDataTags: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "SetDataTags";
        readonly payload: readonly [readonly ["dataTags", "t"], readonly ["dataId", "e"]];
        readonly transport: "postData";
    };
    readonly getDataRightTemplates: {
        readonly args: readonly ["t", "e", "a", "o"];
        readonly endpoint: "GetDataRightTemplates";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["dataType", "e"], readonly ["targetId", "a"], readonly ["templateGroupId", "o"]];
        readonly transport: "postData";
    };
    readonly getHierarchyDataRightTemplate: {
        readonly args: readonly ["t", "e", "a", "o"];
        readonly endpoint: "GetHierarchyDataRightTemplate";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["dataType", "e"], readonly ["targetId", "a"], readonly ["templateGroupId", "o"]];
        readonly transport: "postData";
    };
    readonly getTemplateGroupList: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "GetTemplateGroupList";
        readonly payload: readonly [readonly ["organisationUnitId", "t"], readonly ["ignoreOrganisationUnitPath", "e"]];
        readonly transport: "postData";
    };
    readonly getDefaultOrganisationUnitTemplateGroupId: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "GetDefaultOrganisationUnitTemplateGroupId";
        readonly payload: readonly [readonly ["organisationUnitId", "t"], readonly ["ignoreParents", "e"]];
        readonly transport: "postData";
    };
    readonly getDataTagTemplates: {
        readonly args: readonly ["t", "e", "a", "o"];
        readonly endpoint: "GetDataTagTemplates";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["dataType", "e"], readonly ["targetId", "a"], readonly ["templateGroupId", "o"]];
        readonly transport: "postData";
    };
    readonly getTemplateGroupCount: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetTemplateGroupCount";
        readonly payload: readonly [readonly ["organisationUnitId", "t"]];
        readonly transport: "postData";
    };
    readonly getTemplateGroupById: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetTemplateGroupById";
        readonly payload: readonly [readonly ["templateGroupId", "t"]];
        readonly transport: "postData";
    };
    readonly getHierarchyDataTagTemplate: {
        readonly args: readonly ["t", "e", "a", "o"];
        readonly endpoint: "GetHierarchyDataTagTemplate";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["dataType", "e"], readonly ["targetId", "a"], readonly ["templateGroupId", "o"]];
        readonly transport: "postData";
    };
    readonly getDataRightTemplateTargets: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetDataRightTemplateTargets";
        readonly payload: readonly [readonly ["dataId", "t"]];
        readonly transport: "postData";
    };
    readonly getDataRightTemplateTargetNode: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetDataRightTemplateTargetNode";
        readonly payload: readonly [readonly ["dataId", "t"]];
        readonly transport: "postData";
    };
    readonly addTemplateGroup: {
        readonly args: readonly ["t"];
        readonly endpoint: "AddTemplateGroup";
        readonly payload: readonly [readonly ["group", "t"]];
        readonly transport: "postData";
    };
    readonly updateTemplateGroup: {
        readonly args: readonly ["t"];
        readonly endpoint: "UpdateTemplateGroup";
        readonly payload: readonly [readonly ["group", "t"]];
        readonly transport: "postData";
    };
    readonly deleteTemplateGroup: {
        readonly args: readonly ["t"];
        readonly endpoint: "DeleteTemplateGroup";
        readonly payload: readonly [readonly ["id", "t"]];
        readonly transport: "postData";
    };
    readonly getRootTemplateGroupList: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetRootTemplateGroupList";
        readonly payload: readonly [readonly ["organisationUnitId", "t"]];
        readonly transport: "postData";
    };
    readonly addLegitimateDataRightTemplate: {
        readonly args: readonly ["t", "e", "a", "o", "i", "r"];
        readonly endpoint: "AddLegitimateDataRightTemplate";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["legitimateId", "e"], readonly ["rights", "a"], readonly ["dataType", "o"], readonly ["targetId", "i"], readonly ["templateGroupId", "r"]];
        readonly transport: "postData";
    };
    readonly updateLegitimateDataRightTemplate: {
        readonly args: readonly ["t", "e", "a", "o", "i", "r"];
        readonly endpoint: "UpdateLegitimateDataRightTemplate";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["legitimateId", "e"], readonly ["rights", "a"], readonly ["dataType", "o"], readonly ["targetId", "i"], readonly ["templateGroupId", "r"]];
        readonly transport: "postData";
    };
    readonly updateLegitimateDataRightTemplateOwnerRight: {
        readonly args: readonly ["t", "e", "a", "o", "i", "r"];
        readonly endpoint: "UpdateLegitimateDataRightTemplateOwnerRight";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["legitimateId", "e"], readonly ["dataType", "a"], readonly ["targetId", "o"], readonly ["templateGroupId", "i"], readonly ["ownerRight", "r"]];
        readonly transport: "postData";
    };
    readonly removeLegitimateDataRightTemplate: {
        readonly args: readonly ["t", "e", "a", "o", "i", "r"];
        readonly endpoint: "RemoveLegitimateDataRightTemplate";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["legitimateId", "e"], readonly ["rights", "a"], readonly ["dataType", "o"], readonly ["targetId", "i"], readonly ["templateGroupId", "r"]];
        readonly transport: "postData";
    };
    readonly removeAllLegitimateDataRightTemplate: {
        readonly args: readonly ["t"];
        readonly endpoint: "RemoveAllLegitimateDataRightTemplate";
        readonly payload: readonly [readonly ["dataId", "t"]];
        readonly transport: "postData";
    };
    readonly addDataTagTemplate: {
        readonly args: readonly ["t", "e", "a", "o", "i"];
        readonly endpoint: "AddDataTagTemplate";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["tagIds", "e"], readonly ["dataType", "a"], readonly ["targetId", "o"], readonly ["templateGroupId", "i"]];
        readonly transport: "postData";
    };
    readonly updateDataTagTemplate: {
        readonly args: readonly ["t", "e", "a", "o", "i"];
        readonly endpoint: "UpdateDataTagTemplate";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["tagId", "e"], readonly ["dataType", "a"], readonly ["targetId", "o"], readonly ["templateGroupId", "i"]];
        readonly transport: "postData";
    };
    readonly removeDataTagTemplate: {
        readonly args: readonly ["t", "e", "a", "o", "i"];
        readonly endpoint: "RemoveDataTagTemplate";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["tagId", "e"], readonly ["dataType", "a"], readonly ["targetId", "o"], readonly ["templateGroupId", "i"]];
        readonly transport: "postData";
    };
    readonly removeAllDataTagTemplate: {
        readonly args: readonly ["t"];
        readonly endpoint: "RemoveAllDataTagTemplate";
        readonly payload: readonly [readonly ["dataId", "t"]];
        readonly transport: "postData";
    };
    readonly getDataRightTemplate: {
        readonly args: readonly ["t", "e", "a", "o", "i"];
        readonly endpoint: "GetDataRightTemplate";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["legitimateId", "e"], readonly ["dataType", "a"], readonly ["targetId", "o"], readonly ["templateGroupId", "i"]];
        readonly transport: "postData";
    };
    readonly getDataTagTemplate: {
        readonly args: readonly ["t", "e", "a", "o"];
        readonly endpoint: "GetDataTagTemplate";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["dataType", "e"], readonly ["targetId", "a"], readonly ["templateGroupId", "o"]];
        readonly transport: "postData";
    };
    readonly getTriggerCount: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetTriggerCount";
        readonly payload: readonly [readonly ["filter", "t"]];
        readonly transport: "postData";
    };
    readonly getTriggerListFilter: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetTriggerListFilter";
        readonly payload: readonly [readonly ["defaultFilter", "t"]];
        readonly transport: "postData";
    };
    readonly getTriggerAlerts: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetTriggerAlerts";
        readonly payload: readonly [readonly ["listFilter", "t"]];
        readonly transport: "postData";
    };
    readonly getTriggerAlertAdditionalDatas: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetTriggerAlertAdditionalDatas";
        readonly payload: readonly [readonly ["alertId", "t"]];
        readonly transport: "postData";
    };
    readonly setNotifyTriggerAlertsRead: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "SetNotifyTriggerAlertsRead";
        readonly payload: readonly [readonly ["alertIds", "t"], readonly ["read", "e"]];
        readonly transport: "postData";
    };
    readonly dataHasTriggerConfig: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "DataHasTriggerConfig";
        readonly payload: readonly [readonly ["dataId", "t"], readonly ["dataType", "e"]];
        readonly transport: "postData";
    };
    readonly getTriggerConfigList: {
        readonly args: readonly ["t"];
        readonly endpoint: "GetTriggerConfigList";
        readonly payload: readonly [readonly ["dataId", "t"]];
        readonly transport: "postData";
    };
    readonly getTriggerObjektConfigList: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "GetTriggerObjektConfigList";
        readonly payload: readonly [readonly ["triggerOrganisationUnitId", "t"], readonly ["triggerObjectType", "e"]];
        readonly transport: "postData";
    };
    readonly setNotifyDataTriggerConfig: {
        readonly args: readonly ["t", "e", "a", "o", "i"];
        readonly endpoint: "SetNotifyDataTriggerConfig";
        readonly payload: readonly [readonly ["reason", "t"], readonly ["dataId", "e"], readonly ["overrideType", "a"], readonly ["checkRights", "o"], readonly ["filterObjects", "i"]];
        readonly transport: "postData";
    };
    readonly setNotifyOuTriggerConfig: {
        readonly args: readonly ["t", "e", "a", "o", "i", "r"];
        readonly endpoint: "SetNotifyOuTriggerConfig";
        readonly payload: readonly [readonly ["reason", "t"], readonly ["organisationUnitId", "e"], readonly ["objectType", "a"], readonly ["overrideType", "o"], readonly ["checkRights", "i"], readonly ["filterObjects", "r"]];
        readonly transport: "postData";
    };
    readonly removeNotifyDataTriggerConfig: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "RemoveNotifyDataTriggerConfig";
        readonly payload: readonly [readonly ["reason", "t"], readonly ["dataId", "e"]];
        readonly transport: "postData";
    };
    readonly removeNotifyOuTriggerConfig: {
        readonly args: readonly ["t", "e", "a"];
        readonly endpoint: "RemoveNotifyOuTriggerConfig";
        readonly payload: readonly [readonly ["reason", "t"], readonly ["organisationUnitId", "e"], readonly ["objectType", "a"]];
        readonly transport: "postData";
    };
    readonly getServerLicenseIsMsp: {
        readonly args: readonly [];
        readonly endpoint: "GetServerLicenseIsMsp";
        readonly payload: readonly [];
        readonly transport: "getData";
    };
    readonly getCurrentCustomersIsBilled: {
        readonly args: readonly [];
        readonly endpoint: "GetCurrentCustomersIsBilled";
        readonly payload: readonly [];
        readonly transport: "getData";
    };
    readonly getCurrentCustomersExpirationDateUtc: {
        readonly args: readonly [];
        readonly endpoint: "GetCurrentCustomersExpirationDateUtc";
        readonly payload: readonly [];
        readonly transport: "getData";
    };
    readonly getNotifyTriggerAlertsRead: {
        readonly args: readonly ["t", "e"];
        readonly endpoint: "SetNotifyTriggerAlertsRead";
        readonly payload: readonly [readonly ["alertIds", "t"], readonly ["read", "e"]];
        readonly transport: "postData";
    };
};
export declare const managerManifest: {
    readonly activeDirectory: {
        readonly getActiveDirectoryProfileList: {
            readonly args: readonly ["e"];
            readonly serviceMethod: "getActiveDirectoryProfileList";
        };
        readonly getActiveDirectoryProfileListFilter: {
            readonly args: readonly ["e"];
            readonly serviceMethod: "getActiveDirectoryProfileListFilter";
        };
        readonly getActiveDirecotryProfileInvolvedOrganisationUnit: {
            readonly args: readonly ["e"];
            readonly serviceMethod: "getActiveDirectoryProfileInvolvedOrganisationUnit";
        };
        readonly deleteActiveDirectoryProfile: {
            readonly args: readonly ["e"];
            readonly serviceMethod: "deleteActiveDirectoryProfile";
        };
        readonly updateActiveDirectoryProfile: {
            readonly args: readonly ["e"];
            readonly serviceMethod: "updateActiveDirectoryProfile";
        };
        readonly addActiveDirectoryProfile: {
            readonly args: readonly ["e"];
            readonly serviceMethod: "addActiveDirectoryProfile";
        };
        readonly checkActiveDirectoryConnection: {
            readonly args: readonly ["e", "t", "i", "r", "o"];
            readonly serviceMethod: "checkActiveDirectoryConnection";
        };
        readonly getActiveDirectoryRootElements: {
            readonly args: readonly ["e", "t"];
            readonly serviceMethod: "getActiveDirectoryRootElements";
        };
        readonly getActiveDirectoryMembersOfGroup: {
            readonly args: readonly ["e", "t"];
            readonly serviceMethod: "getActiveDirectoryMembersOfGroup";
        };
        readonly getActiveDirectoryElementList: {
            readonly args: readonly ["e", "t", "i", "r"];
            readonly serviceMethod: "getActiveDirectoryElementList";
        };
        readonly getSpecificActiveDirectoryElements: {
            readonly args: readonly ["e", "t"];
            readonly serviceMethod: "getSpecificActiveDirectoryElements";
        };
        readonly importActiveDirectory: {
            readonly args: readonly ["e", "t", "i", "r", "o"];
            readonly serviceMethod: "importActiveDirectory";
        };
        readonly syncActiveDirectory: {
            readonly args: readonly ["e", "t"];
            readonly serviceMethod: "syncActiveDirectory";
        };
        readonly generateActiveDirectorySummaryDetails: {
            readonly args: readonly ["e", "t", "i", "r", "o", "c"];
            readonly serviceMethod: "generateActiveDirectorySummaryDetails";
        };
        readonly getActiveDirectorySummaryDetails: {
            readonly args: readonly ["e"];
            readonly serviceMethod: "getActiveDirectorySummaryDetails";
        };
    };
    readonly application: {
        readonly getApplication: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getApplication";
        };
        readonly getApplicationListFilter: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getApplicationListFilter";
        };
        readonly getApplicationList: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getApplicationList";
        };
        readonly addApplication: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "addApplication";
        };
        readonly updateApplication: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "updateApplication";
        };
    };
    readonly dataBinding: {
        readonly addDataBinding: {
            readonly args: readonly ["t", "e", "n", "i"];
            readonly serviceMethod: "addDataBinding";
        };
        readonly removeAllDataBinding: {
            readonly args: readonly ["t", "e"];
            readonly serviceMethod: "removeAllDataBinding";
        };
        readonly getDataBindingsByData: {
            readonly args: readonly ["t", "e"];
            readonly serviceMethod: "getDataBindingsByData";
        };
        readonly getDataBindingsByParent: {
            readonly args: readonly ["t", "e"];
            readonly serviceMethod: "getDataBindingsByParent";
        };
        readonly removeDataBinding: {
            readonly args: readonly ["t", "e"];
            readonly serviceMethod: "removeDataBinding";
        };
    };
    readonly emailVerification: {
        readonly checkEmailVerification: {
            readonly args: readonly ["e"];
            readonly serviceMethod: "checkEmailVerification";
        };
    };
    readonly forwardingRule: {
        readonly addForwardingRule: {
            readonly args: readonly ["e"];
            readonly serviceMethod: "addForwardingRule";
        };
        readonly updateForwardingRule: {
            readonly args: readonly ["e"];
            readonly serviceMethod: "updateForwardingRule";
        };
        readonly deleteForwardingRule: {
            readonly args: readonly ["e"];
            readonly serviceMethod: "deleteForwardingRule";
        };
        readonly getForwardingRuleList: {
            readonly args: readonly [];
            readonly serviceMethod: "getForwardingRuleList";
        };
    };
    readonly license: {
        readonly getServerLicenseModuleList: {
            readonly args: readonly [];
            readonly serviceMethod: "getServerLicenseModuleList";
        };
        readonly getServerLicenseIsMsp: {
            readonly args: readonly [];
            readonly serviceMethod: "getServerLicenseIsMsp";
        };
        readonly getCurrentCustomersIsBilled: {
            readonly args: readonly [];
            readonly serviceMethod: "getCurrentCustomersIsBilled";
        };
        readonly getCurrentCustomersExpirationDateUtc: {
            readonly args: readonly [];
            readonly serviceMethod: "getCurrentCustomersExpirationDateUtc";
        };
    };
    readonly logbook: {
        readonly getLogbookEntries: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getLogbookEntrys";
        };
        readonly addLogbookEntries: {
            readonly args: readonly ["t", "o", "e", "i"];
            readonly serviceMethod: "addLogbookEntries";
        };
        readonly getSingleLogbookEntry: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getSingleLogbookEntry";
        };
        readonly getLogbookListFilter: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getLogbookListFilter";
        };
        readonly getLogbookCount: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getLogbookCount";
        };
    };
    readonly mailing: {
        readonly isSmtpConfigured: {
            readonly args: readonly [];
            readonly serviceMethod: "isSmtpConfigured";
        };
    };
    readonly option: {
        readonly getOption: {
            readonly args: readonly ["t", "e"];
            readonly serviceMethod: "getOption";
        };
        readonly getOptions: {
            readonly args: readonly ["t", "e"];
            readonly serviceMethod: "getOptions";
        };
        readonly updateStringOption: {
            readonly args: readonly ["t", "e", "i", "n", "o"];
            readonly serviceMethod: "updateStringOption";
        };
        readonly updatePasswordOption: {
            readonly args: readonly ["t", "e", "i", "n", "o"];
            readonly serviceMethod: "updatePasswordOption";
        };
        readonly updateGlobalEncryptedOption: {
            readonly args: readonly ["t", "e", "i", "n", "o"];
            readonly serviceMethod: "updateGlobalEncryptedOption";
        };
        readonly updateIntegerOption: {
            readonly args: readonly ["t", "e", "i", "n", "o"];
            readonly serviceMethod: "updateIntegerOption";
        };
        readonly updateDoubleoption: {
            readonly args: readonly ["t", "e", "i", "n", "o"];
            readonly serviceMethod: "updateDoubleoption";
        };
        readonly updateDateTimeOption: {
            readonly args: readonly ["t", "e", "i", "n", "o"];
            readonly serviceMethod: "updateDateTimeOption";
        };
        readonly updateBooleanOption: {
            readonly args: readonly ["t", "e", "i", "n", "o"];
            readonly serviceMethod: "updateBooleanOption";
        };
        readonly updateListOption: {
            readonly args: readonly ["t", "e", "i", "n", "o"];
            readonly serviceMethod: "updateListOption";
        };
        readonly updateFileOption: {
            readonly args: readonly ["t", "e", "i", "n", "o"];
            readonly serviceMethod: "updateFileOption";
        };
        readonly updateFolderOption: {
            readonly args: readonly ["t", "e", "i", "n", "o"];
            readonly serviceMethod: "updateFolderOption";
        };
        readonly updateTimeOption: {
            readonly args: readonly ["t", "e", "i", "n", "o"];
            readonly serviceMethod: "updateTimeOption";
        };
        readonly updateIntegerExtOption: {
            readonly args: readonly ["t", "e", "i", "n", "o"];
            readonly serviceMethod: "updateIntegerExtOption";
        };
        readonly updateDoubleExtOption: {
            readonly args: readonly ["t", "e", "i", "n", "o"];
            readonly serviceMethod: "updateDoubleExtOption";
        };
        readonly updateCollectionOption: {
            readonly args: readonly ["t", "e", "i", "n"];
            readonly serviceMethod: "updateCollectionOption";
        };
        readonly deleteOption: {
            readonly args: readonly ["t", "e"];
            readonly serviceMethod: "deleteOption";
        };
        readonly deleteCollectionOption: {
            readonly args: readonly ["t", "e", "i"];
            readonly serviceMethod: "deleteCollectionOption";
        };
        readonly deleteDataOptions: {
            readonly args: readonly ["t", "e"];
            readonly serviceMethod: "deleteDataOptions";
        };
    };
    readonly organisationUnit: {
        readonly getOrganisationUnitList: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getOrganisationUnitList";
        };
        readonly getOrganisationUnitListFilter: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getOrganisationUnitListFilter";
        };
        readonly getOrganisationUnitStructure: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getOrganisationUnitStructure";
        };
        readonly getOrganisationUnitUser: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getOrganisationUnitUser";
        };
        readonly getOrganisationUnitGroup: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getOrganisationUnitGroup";
        };
        readonly getOrganisationUnitUserList: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getOrganisationUnitUserList";
        };
        readonly changeOrganisationUnitPassword: {
            readonly args: readonly ["t", "i", "n", "e", "r"];
            readonly serviceMethod: "changeOrganisationUnitPassword";
        };
        readonly getUserInvolvedOrganisationUnit: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getUserInvolvedOrganisationUnit";
        };
        readonly getGroupInvolvedOrganisationUnit: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getGroupInvolvedOrganisationUnit";
        };
        readonly getOrganisationUnitImageSource: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getOrganisationUnitImageSource";
        };
        readonly hasUserMasterKeyMode: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "hasUserMasterKeyMode";
        };
        readonly hasGroupMasterKeyMode: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "hasGroupMasterKeyMode";
        };
        readonly addOrganisationUnitGroup: {
            readonly args: readonly ["t", "i", "n", "e"];
            readonly serviceMethod: "addOrganisationUnitGroup";
        };
        readonly addOrganisationUnitUser: {
            readonly args: readonly ["t", "e", "a", "o", "i", "r", "n", "p"];
            readonly serviceMethod: "addOrganisationUnitUser2";
        };
        readonly updateOrganisationUnitGroup: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "updateOrganisationUnitGroup";
        };
        readonly deleteOrganisationUnitGroup: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "deleteOrganisationUnitGroup";
        };
        readonly updateOrganisationUnitUser: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "updateOrganisationUnitUser";
        };
        readonly deleteOrganisationUnitUser: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "deleteOrganisationUnitUser";
        };
        readonly getCurrentOrganisationUnit: {
            readonly args: readonly [];
            readonly serviceMethod: "getCurrentOrganisationUnit";
        };
    };
    readonly policy: {
        readonly getPolicy: {
            readonly args: readonly ["e"];
            readonly serviceMethod: "getPolicy";
        };
        readonly getPolicies: {
            readonly args: readonly [];
            readonly serviceMethod: "getPolicies";
        };
        readonly getCategoryPolicy: {
            readonly args: readonly ["e"];
            readonly serviceMethod: "getCategoryPolicy";
        };
    };
    readonly progressToken: {
        readonly registerProgressToken: {
            readonly args: readonly ["e", "r"];
            readonly serviceMethod: "registerProgressToken";
        };
        readonly unregisterProgressToken: {
            readonly args: readonly ["e"];
            readonly serviceMethod: "unregisterProgressToken";
        };
        readonly getCurrentUserProgressTokens: {
            readonly args: readonly [];
            readonly serviceMethod: "getCurrentUserProgressTokens";
        };
    };
    readonly right: {
        readonly getLegitimateDataRight: {
            readonly args: readonly ["t", "e", "i"];
            readonly serviceMethod: "getLegitimateDataRight";
        };
        readonly getLegitimateDataRights: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getLegitimateDataRights";
        };
        readonly getMultiLegitimateDataRights: {
            readonly args: readonly ["t", "e", "i"];
            readonly serviceMethod: "getMultiLegitimateDataRights";
        };
        readonly updateLegitimateDataRightKey: {
            readonly args: readonly ["t", "e", "i"];
            readonly serviceMethod: "updateLegitimateDataRightKey";
        };
        readonly removeCurrentOrganisationUnitFromRights: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "removeCurrentOrganisationUnitFromRights";
        };
        readonly addLegitimateDataRight: {
            readonly args: readonly ["t", "e", "i"];
            readonly serviceMethod: "addLegitimateDataRight";
        };
        readonly updateLegitimateDataRight: {
            readonly args: readonly ["t", "e", "i"];
            readonly serviceMethod: "updateLegitimateDataRight";
        };
        readonly removeAllLegitimateDataRights: {
            readonly args: readonly ["t", "e"];
            readonly serviceMethod: "removeAllLegitimateDataRights";
        };
        readonly updateLegitimateDataRightOwnerRight: {
            readonly args: readonly ["t", "e", "i"];
            readonly serviceMethod: "updateLegitimateDataRightOwnerRight";
        };
        readonly updateLegitimateDataRightSecuredData: {
            readonly args: readonly ["t", "e", "i"];
            readonly serviceMethod: "updateLegitimateDataRightSecuredData";
        };
        readonly removeLegitimateDataRight: {
            readonly args: readonly ["t", "e", "i"];
            readonly serviceMethod: "removeLegitimateDataRight";
        };
        readonly updateLegitimateDataRightValidDate: {
            readonly args: readonly ["t", "e", "i", "a"];
            readonly serviceMethod: "updateLegitimateDataRightValidDate";
        };
        readonly updateLegitimateSealId: {
            readonly args: readonly ["t", "e", "i"];
            readonly serviceMethod: "updateLegitimateSealId";
        };
        readonly batchUpdateRights: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "batchUpdateRights";
        };
        readonly getCurrentConnectionDataRights: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getCurrentConnectionDataRights";
        };
        readonly getCurrentConnectionDataRightList: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getCurrentConnectionDataRightList";
        };
        readonly getLegitimateDataRightsWithTemporalRights: {
            readonly args: readonly ["t", "e", "i"];
            readonly serviceMethod: "getLegitimateDataRightsWithTemporalRights";
        };
        readonly getLegitimateDataRightsWithoutDeleted: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getLegitimateDataRightsWithoutDeleted";
        };
        readonly getLegitimateDataRightCheckRoles: {
            readonly args: readonly ["t", "e", "i"];
            readonly serviceMethod: "getLegitimateDataRightCheckRoles";
        };
        readonly requestDataRight: {
            readonly args: readonly ["t", "e"];
            readonly serviceMethod: "requestDataRight";
        };
        readonly getDatabaseAdministratorDataRights: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getDatabaseAdministratorDataRights";
        };
        readonly removeAllLegitimateDataRightsExcept: {
            readonly args: readonly ["t", "e", "i"];
            readonly serviceMethod: "removeAllLegitimateDataRightsExcept";
        };
    };
    readonly role: {
        readonly getRoleList: {
            readonly args: readonly ["e"];
            readonly serviceMethod: "getRoleList";
        };
        readonly getRoleListFilter: {
            readonly args: readonly ["e"];
            readonly serviceMethod: "getRoleListFilter";
        };
        readonly getUsersInRole: {
            readonly args: readonly ["e"];
            readonly serviceMethod: "getUsersInRole";
        };
        readonly getRole: {
            readonly args: readonly ["e"];
            readonly serviceMethod: "getRole";
        };
        readonly getUserRoles: {
            readonly args: readonly ["e"];
            readonly serviceMethod: "getUserRoles";
        };
        readonly deleteRole: {
            readonly args: readonly ["e"];
            readonly serviceMethod: "deleteRole";
        };
        readonly addRole: {
            readonly args: readonly ["e", "t", "o"];
            readonly serviceMethod: "addRole";
        };
        readonly updateRole: {
            readonly args: readonly ["e"];
            readonly serviceMethod: "updateRole";
        };
        readonly hasRoleMasterKeyMode: {
            readonly args: readonly ["e"];
            readonly serviceMethod: "hasRoleMasterKeyMode";
        };
        readonly getRoleInvolvedOrganisationUnit: {
            readonly args: readonly ["e"];
            readonly serviceMethod: "getRoleInvolvedOrganisationUnit";
        };
    };
    readonly seal: {
        readonly addSeal: {
            readonly args: readonly ["e", "t", "n"];
            readonly serviceMethod: "addSeal";
        };
        readonly updateSeal: {
            readonly args: readonly ["e", "t", "n"];
            readonly serviceMethod: "updateSeal";
        };
        readonly getSeal: {
            readonly args: readonly ["e"];
            readonly serviceMethod: "getSeal";
        };
        readonly breakSeal: {
            readonly args: readonly ["e"];
            readonly serviceMethod: "breakSeal";
        };
        readonly deleteKeyReleasesForUser: {
            readonly args: readonly ["e", "t"];
            readonly serviceMethod: "deleteKeyReleasesForUser";
        };
        readonly updateSealKeyRelease: {
            readonly args: readonly ["e", "t", "n"];
            readonly serviceMethod: "updateSealKeyRelease";
        };
        readonly getSealKey: {
            readonly args: readonly ["e", "t"];
            readonly serviceMethod: "getSealKey";
        };
        readonly deleteSeal: {
            readonly args: readonly ["e"];
            readonly serviceMethod: "deleteSeal";
        };
        readonly getSealTemplateList: {
            readonly args: readonly ["e"];
            readonly serviceMethod: "getSealTemplateList";
        };
        readonly getSealTemplateInvolvedOrganisationUnits: {
            readonly args: readonly ["e"];
            readonly serviceMethod: "getSealTemplateInvolvedOrganisationUnit";
        };
        readonly hasRelease: {
            readonly args: readonly ["e", "t"];
            readonly serviceMethod: "hasRelease";
        };
        readonly getSealOpenTypeBySealId: {
            readonly args: readonly ["e", "t", "n"];
            readonly serviceMethod: "getSealOpenTypeBySealId";
        };
    };
    readonly tag: {
        readonly getTags: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getTags";
        };
        readonly addDataFavorite: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "addDataFavorite";
        };
        readonly removeDataFavorite: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "removeDataFavorite";
        };
        readonly getTagListFilter: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getTagListFilter";
        };
        readonly addTag: {
            readonly args: readonly ["t", "e"];
            readonly serviceMethod: "addTag";
        };
        readonly updateTag: {
            readonly args: readonly ["t", "e"];
            readonly serviceMethod: "updateTag";
        };
        readonly deleteTag: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "deleteTag";
        };
        readonly getTagGlobalUsageInfos: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getTagGlobalUsageInfos";
        };
        readonly setDataTags: {
            readonly args: readonly ["t", "e"];
            readonly serviceMethod: "setDataTags";
        };
    };
    readonly template: {
        readonly getDataRightTemplates: {
            readonly args: readonly ["t", "e", "a", "i"];
            readonly serviceMethod: "getDataRightTemplates";
        };
        readonly getHierarchyDataRightTemplate: {
            readonly args: readonly ["t", "e", "a", "i"];
            readonly serviceMethod: "getHierarchyDataRightTemplate";
        };
        readonly getTemplateGroupList: {
            readonly args: readonly ["t", "e"];
            readonly serviceMethod: "getTemplateGroupList";
        };
        readonly getDefaultOrganisationUnitTemplateGroupId: {
            readonly args: readonly ["t", "e"];
            readonly serviceMethod: "getDefaultOrganisationUnitTemplateGroupId";
        };
        readonly getDataTagTemplates: {
            readonly args: readonly ["t", "e", "a", "i"];
            readonly serviceMethod: "getDataTagTemplates";
        };
        readonly getTemplateGroupCount: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getTemplateGroupCount";
        };
        readonly getTemplateGroupById: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getTemplateGroupById";
        };
        readonly getHierarchyDataTagTemplate: {
            readonly args: readonly ["t", "e", "a", "i"];
            readonly serviceMethod: "getHierarchyDataTagTemplate";
        };
        readonly getDataRightTemplateTargets: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getDataRightTemplateTargets";
        };
        readonly getDataRightTemplateTargetNode: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getDataRightTemplateTargetNode";
        };
        readonly addTemplateGroup: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "addTemplateGroup";
        };
        readonly updateTemplateGroup: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "updateTemplateGroup";
        };
        readonly deleteTemplateGroup: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "deleteTemplateGroup";
        };
        readonly getRootTemplateGroupList: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getRootTemplateGroupList";
        };
        readonly addLegitimateDataRightTemplate: {
            readonly args: readonly ["t", "e", "a", "i", "r", "p"];
            readonly serviceMethod: "addLegitimateDataRightTemplate";
        };
        readonly updateLegitimateDataRightTemplate: {
            readonly args: readonly ["t", "e", "a", "i", "r", "p"];
            readonly serviceMethod: "updateLegitimateDataRightTemplate";
        };
        readonly updateLegitimateDataRightTemplateOwnerRight: {
            readonly args: readonly ["t", "e", "a", "i", "r", "p"];
            readonly serviceMethod: "updateLegitimateDataRightTemplateOwnerRight";
        };
        readonly removeLegitimateDataRightTemplate: {
            readonly args: readonly ["t", "e", "a", "i", "r", "p"];
            readonly serviceMethod: "removeLegitimateDataRightTemplate";
        };
        readonly removeAllLegitimateDataRightTemplate: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "removeAllLegitimateDataRightTemplate";
        };
        readonly addDataTagTemplate: {
            readonly args: readonly ["t", "e", "a", "i", "r"];
            readonly serviceMethod: "addDataTagTemplate";
        };
        readonly updateDataTagTemplate: {
            readonly args: readonly ["t", "e", "a", "i", "r"];
            readonly serviceMethod: "updateDataTagTemplate";
        };
        readonly removeDataTagTemplate: {
            readonly args: readonly ["t", "e", "a", "i", "r"];
            readonly serviceMethod: "removeDataTagTemplate";
        };
        readonly removeAllDataTagTemplate: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "removeAllDataTagTemplate";
        };
        readonly getDataRightTemplate: {
            readonly args: readonly ["t", "e", "a", "i", "r"];
            readonly serviceMethod: "getDataRightTemplate";
        };
        readonly getDataTagTemplate: {
            readonly args: readonly ["t", "e", "a", "i"];
            readonly serviceMethod: "getDataTagTemplate";
        };
    };
    readonly trigger: {
        readonly getTriggerCount: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getTriggerCount";
        };
        readonly getTriggerListFilter: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getTriggerListFilter";
        };
        readonly getTriggerAlerts: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getTriggerAlerts";
        };
        readonly getTriggerAlertAdditionalDatas: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getTriggerAlertAdditionalDatas";
        };
        readonly setNotifyTriggerAlertsRead: {
            readonly args: readonly ["t", "e"];
            readonly serviceMethod: "setNotifyTriggerAlertsRead";
        };
        readonly dataHasTriggerConfig: {
            readonly args: readonly ["t", "e"];
            readonly serviceMethod: "dataHasTriggerConfig";
        };
        readonly getTriggerConfigList: {
            readonly args: readonly ["t"];
            readonly serviceMethod: "getTriggerConfigList";
        };
        readonly getTriggerObjektConfigList: {
            readonly args: readonly ["t", "e"];
            readonly serviceMethod: "getTriggerObjektConfigList";
        };
        readonly setNotifyDataTriggerConfig: {
            readonly args: readonly ["t", "e", "i", "r", "g"];
            readonly serviceMethod: "setNotifyDataTriggerConfig";
        };
        readonly setNotifyOuTriggerConfig: {
            readonly args: readonly ["t", "e", "i", "r", "g", "o"];
            readonly serviceMethod: "setNotifyOuTriggerConfig";
        };
        readonly removeNotifyDataTriggerConfig: {
            readonly args: readonly ["t", "e"];
            readonly serviceMethod: "removeNotifyDataTriggerConfig";
        };
        readonly removeNotifyOuTriggerConfig: {
            readonly args: readonly ["t", "e", "i"];
            readonly serviceMethod: "removeNotifyOuTriggerConfig";
        };
    };
};
