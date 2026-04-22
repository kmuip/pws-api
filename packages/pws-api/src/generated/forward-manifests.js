export const serviceManifest = {
    "openSession": {
        "args": [],
        "endpoint": "OpenSession",
        "payload": [],
        "transport": "getData"
    },
    "forkSession": {
        "args": [
            "t",
            "e",
            "a"
        ],
        "endpoint": "ForkSession",
        "payload": [
            [
                "clientInstanceId",
                "t"
            ],
            [
                "clientType",
                "e"
            ],
            [
                "clientVersion",
                "a"
            ]
        ],
        "transport": "postData"
    },
    "closeSession": {
        "args": [],
        "endpoint": "CloseSession",
        "payload": [],
        "transport": "getData"
    },
    "getServerLicenseModuleList": {
        "args": [],
        "endpoint": "GetServerLicenseModuleList",
        "payload": [],
        "transport": "getData"
    },
    "getActiveDirectoryProfileList": {
        "args": [
            "t"
        ],
        "endpoint": "GetActiveDirectoryProfileList",
        "payload": [
            [
                "filter",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getActiveDirectoryProfileListFilter": {
        "args": [
            "t"
        ],
        "endpoint": "GetActiveDirectoryProfileListFilter",
        "payload": [
            [
                "defaultFilter",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getActiveDirectoryProfileInvolvedOrganisationUnit": {
        "args": [
            "t"
        ],
        "endpoint": "GetActiveDirectoryProfileInvolvedOrganisationUnit",
        "payload": [
            [
                "dataId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "deleteActiveDirectoryProfile": {
        "args": [
            "t"
        ],
        "endpoint": "DeleteActiveDirectoryProfile",
        "payload": [
            [
                "profile",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "updateActiveDirectoryProfile": {
        "args": [
            "t"
        ],
        "endpoint": "UpdateActiveDirectoryProfile",
        "payload": [
            [
                "profile",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "addActiveDirectoryProfile": {
        "args": [
            "t"
        ],
        "endpoint": "AddActiveDirectoryProfile",
        "payload": [
            [
                "profile",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getActiveDirectoryRootElements": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "GetActiveDirectoryRootElements",
        "payload": [
            [
                "profileId",
                "t"
            ],
            [
                "cnFilter",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "getActiveDirectoryMembersOfGroup": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "GetActiveDirectoryMembersOfGroup",
        "payload": [
            [
                "profileId",
                "t"
            ],
            [
                "objectGuid",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "getActiveDirectoryElementList": {
        "args": [
            "t",
            "e",
            "a",
            "o"
        ],
        "endpoint": "GetActiveDirectoryElementList",
        "payload": [
            [
                "profileId",
                "t"
            ],
            [
                "elementName",
                "e"
            ],
            [
                "search",
                "a"
            ],
            [
                "fullSearch",
                "o"
            ]
        ],
        "transport": "postData"
    },
    "getSpecificActiveDirectoryElements": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "GetSpecificActiveDirectoryElements",
        "payload": [
            [
                "profileId",
                "t"
            ],
            [
                "objectGuids",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "importActiveDirectory": {
        "args": [
            "t",
            "e",
            "a",
            "o",
            "i"
        ],
        "endpoint": "ImportActiveDirectory",
        "payload": [
            [
                "profileId",
                "t"
            ],
            [
                "newActiveDirectoryObjects",
                "e"
            ],
            [
                "excludeItems",
                "a"
            ],
            [
                "parentOrganisationUnitId",
                "o"
            ],
            [
                "tokenIdentity",
                "i"
            ]
        ],
        "transport": "postData"
    },
    "syncActiveDirectory": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "SyncActiveDirectory",
        "payload": [
            [
                "profileId",
                "t"
            ],
            [
                "tokenIdentity",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "generateActiveDirectorySummaryDetails": {
        "args": [
            "t",
            "e",
            "a",
            "o",
            "i",
            "r"
        ],
        "endpoint": "GenerateActiveDirectorySummaryDetails",
        "payload": [
            [
                "profileId",
                "t"
            ],
            [
                "newActiveDirectoryObjects",
                "e"
            ],
            [
                "excludeItems",
                "a"
            ],
            [
                "parentOrganisationUnitId",
                "o"
            ],
            [
                "tokenIdentity",
                "i"
            ],
            [
                "withSyncInfo",
                "r"
            ]
        ],
        "transport": "postData"
    },
    "getActiveDirectorySummaryDetails": {
        "args": [
            "t"
        ],
        "endpoint": "GetActiveDirectorySummaryDetails",
        "payload": [
            [
                "tokenIdentity",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getApplication": {
        "args": [
            "t"
        ],
        "endpoint": "GetApplication",
        "payload": [
            [
                "id",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getApplicationListFilter": {
        "args": [
            "t"
        ],
        "endpoint": "GetApplicationListFilter",
        "payload": [
            [
                "defaultFilter",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getApplicationList": {
        "args": [
            "t"
        ],
        "endpoint": "GetApplicationList",
        "payload": [
            [
                "filter",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "addApplication": {
        "args": [
            "t"
        ],
        "endpoint": "AddApplication",
        "payload": [
            [
                "application",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "updateApplication": {
        "args": [
            "t"
        ],
        "endpoint": "UpdateApplication",
        "payload": [
            [
                "application",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "addDataBinding": {
        "args": [
            "t",
            "e",
            "a",
            "o"
        ],
        "endpoint": "AddDataBinding",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "dataType",
                "e"
            ],
            [
                "parentId",
                "a"
            ],
            [
                "parentType",
                "o"
            ]
        ],
        "transport": "postData"
    },
    "removeAllDataBinding": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "RemoveAllDataBinding",
        "payload": [
            [
                "id",
                "t"
            ],
            [
                "parentType",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "getDataBindingsByData": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "GetDataBindingByData",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "parentType",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "getDataBindingsByParent": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "GetDataBindingsByParent",
        "payload": [
            [
                "parentId",
                "t"
            ],
            [
                "dataType",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "removeDataBinding": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "RemoveDataBinding",
        "payload": [
            [
                "id",
                "t"
            ],
            [
                "parentId",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "getContainerListFilter": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "GetContainerListFilter",
        "payload": [
            [
                "containerType",
                "t"
            ],
            [
                "defaultFilter",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "getContainerList": {
        "args": [
            "t",
            "e",
            "a"
        ],
        "endpoint": "GetContainerList",
        "payload": [
            [
                "containerType",
                "t"
            ],
            [
                "filter",
                "e"
            ],
            [
                "behaviours",
                "a"
            ]
        ],
        "transport": "postData"
    },
    "getContainerCount": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "GetContainerCount",
        "payload": [
            [
                "containerType",
                "t"
            ],
            [
                "filter",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "getContainer": {
        "args": [
            "t"
        ],
        "endpoint": "GetContainer",
        "payload": [
            [
                "id",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "updateContainer": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "UpdateContainer",
        "payload": [
            [
                "container",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "addContainer": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "AddContainer",
        "payload": [
            [
                "container",
                "t"
            ],
            [
                "parentOrganisationUnitId",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "addContainerV2": {
        "args": [
            "t"
        ],
        "endpoint": "AddContainerV2",
        "payload": [
            [
                "container",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "initContainerItem": {
        "args": [
            "t"
        ],
        "endpoint": "InitContainerItem",
        "payload": [
            [
                "containerItemType",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "deleteContainer": {
        "args": [
            "t"
        ],
        "endpoint": "DeleteContainer",
        "payload": [
            [
                "container",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getContainerItem": {
        "args": [
            "t"
        ],
        "endpoint": "GetContainerItem",
        "payload": [
            [
                "itemId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getContainerInvolvedOrganisationUnit": {
        "args": [
            "t"
        ],
        "endpoint": "GetContainerInvolvedOrganisationUnit",
        "payload": [
            [
                "dataId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getContainerHistoryList": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "GetContainerHistoryList",
        "payload": [
            [
                "containerType",
                "t"
            ],
            [
                "id",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "cloneContainer": {
        "args": [
            "t"
        ],
        "endpoint": "CloneContainer",
        "payload": [
            [
                "baseContainerId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "initContainer": {
        "args": [
            "t"
        ],
        "endpoint": "InitContainer",
        "payload": [
            [
                "containerType",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getContainerBrowserSsoList": {
        "args": [
            "t"
        ],
        "endpoint": "GetContainerBrowserSsoList",
        "payload": [
            [
                "getContainersWithoutUrl",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "SearchContainersBrowserSsoList": {
        "args": [
            "t"
        ],
        "endpoint": "SearchContainersBrowserSsoList",
        "payload": [
            [
                "searchValue",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getCredentialCheck": {
        "args": [
            "t"
        ],
        "endpoint": "GetCredentialCheck",
        "payload": [
            [
                "containerId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "checkEmailVerification": {
        "args": [
            "t"
        ],
        "endpoint": "CheckEmailVerification",
        "payload": [
            [
                "userId",
                "t"
            ]
        ],
        "transport": "getData"
    },
    "addForwardingRule": {
        "args": [
            "t"
        ],
        "endpoint": "AddForwardingRule",
        "payload": [
            [
                "rule",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "updateForwardingRule": {
        "args": [
            "t"
        ],
        "endpoint": "UpdateForwardingRule",
        "payload": [
            [
                "rule",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "deleteForwardingRule": {
        "args": [
            "t"
        ],
        "endpoint": "DeleteForwardingRule",
        "payload": [
            [
                "rule",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getForwardingRuleList": {
        "args": [],
        "endpoint": "GetForwardingRuleList",
        "payload": [],
        "transport": "postData"
    },
    "getLogbookEntrys": {
        "args": [
            "t"
        ],
        "endpoint": "GetLogbookEntrys",
        "payload": [
            [
                "filter",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "addLogbookEntries": {
        "args": [
            "t",
            "e",
            "a",
            "o"
        ],
        "endpoint": "AddLogbookEntries",
        "payload": [
            [
                "logbookEvent",
                "t"
            ],
            [
                "dataIds",
                "e"
            ],
            [
                "dataType",
                "a"
            ],
            [
                "info",
                "o"
            ]
        ],
        "transport": "postData"
    },
    "getSingleLogbookEntry": {
        "args": [
            "t"
        ],
        "endpoint": "GetSingleLogbookEntry",
        "payload": [
            [
                "logbookEntryId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getLogbookListFilter": {
        "args": [
            "t"
        ],
        "endpoint": "GetLogbookListFilter",
        "payload": [
            [
                "defaultFilter",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getLogbookCount": {
        "args": [
            "t"
        ],
        "endpoint": "GetLogbookCount",
        "payload": [
            [
                "filter",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "isSmtpConfigured": {
        "args": [],
        "endpoint": "IsSmtpConfigured",
        "payload": [],
        "transport": "postData"
    },
    "getOption": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "GetOption",
        "payload": [
            [
                "name",
                "t"
            ],
            [
                "data",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "getOptions": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "GetOptions",
        "payload": [
            [
                "groups",
                "t"
            ],
            [
                "data",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "updateStringOption": {
        "args": [
            "t",
            "e",
            "a",
            "o",
            "i"
        ],
        "endpoint": "UpdateStringOption",
        "payload": [
            [
                "name",
                "t"
            ],
            [
                "category",
                "e"
            ],
            [
                "group",
                "a"
            ],
            [
                "value",
                "o"
            ],
            [
                "dataId",
                "i"
            ]
        ],
        "transport": "postData"
    },
    "updatePasswordOption": {
        "args": [
            "t",
            "e",
            "a",
            "o",
            "i"
        ],
        "endpoint": "UpdatePasswordOption",
        "payload": [
            [
                "name",
                "t"
            ],
            [
                "category",
                "e"
            ],
            [
                "group",
                "a"
            ],
            [
                "value",
                "o"
            ],
            [
                "dataId",
                "i"
            ]
        ],
        "transport": "postData"
    },
    "updateGlobalEncryptedOption": {
        "args": [
            "t",
            "e",
            "a",
            "o",
            "i"
        ],
        "endpoint": "UpdateGlobalEncryptedOption",
        "payload": [
            [
                "name",
                "t"
            ],
            [
                "category",
                "e"
            ],
            [
                "group",
                "a"
            ],
            [
                "value",
                "o"
            ],
            [
                "dataId",
                "i"
            ]
        ],
        "transport": "postData"
    },
    "updateIntegerOption": {
        "args": [
            "t",
            "e",
            "a",
            "o",
            "i"
        ],
        "endpoint": "UpdateIntegerOption",
        "payload": [
            [
                "name",
                "t"
            ],
            [
                "category",
                "e"
            ],
            [
                "group",
                "a"
            ],
            [
                "value",
                "o"
            ],
            [
                "dataId",
                "i"
            ]
        ],
        "transport": "postData"
    },
    "updateDoubleoption": {
        "args": [
            "t",
            "e",
            "a",
            "o",
            "i"
        ],
        "endpoint": "UpdateDoubleoption",
        "payload": [
            [
                "name",
                "t"
            ],
            [
                "category",
                "e"
            ],
            [
                "group",
                "a"
            ],
            [
                "value",
                "o"
            ],
            [
                "dataId",
                "i"
            ]
        ],
        "transport": "postData"
    },
    "updateDateTimeOption": {
        "args": [
            "t",
            "e",
            "a",
            "o",
            "i"
        ],
        "endpoint": "UpdateDateTimeOption",
        "payload": [
            [
                "name",
                "t"
            ],
            [
                "category",
                "e"
            ],
            [
                "group",
                "a"
            ],
            [
                "value",
                "o"
            ],
            [
                "dataId",
                "i"
            ]
        ],
        "transport": "postData"
    },
    "updateBooleanOption": {
        "args": [
            "t",
            "e",
            "a",
            "o",
            "i"
        ],
        "endpoint": "UpdateBooleanOption",
        "payload": [
            [
                "name",
                "t"
            ],
            [
                "category",
                "e"
            ],
            [
                "group",
                "a"
            ],
            [
                "value",
                "o"
            ],
            [
                "dataId",
                "i"
            ]
        ],
        "transport": "postData"
    },
    "updateListOption": {
        "args": [
            "t",
            "e",
            "a",
            "o",
            "i"
        ],
        "endpoint": "UpdateListOption",
        "payload": [
            [
                "name",
                "t"
            ],
            [
                "category",
                "e"
            ],
            [
                "group",
                "a"
            ],
            [
                "value",
                "o"
            ],
            [
                "dataId",
                "i"
            ]
        ],
        "transport": "postData"
    },
    "updateFileOption": {
        "args": [
            "t",
            "e",
            "a",
            "o",
            "i"
        ],
        "endpoint": "UpdateFileOption",
        "payload": [
            [
                "name",
                "t"
            ],
            [
                "category",
                "e"
            ],
            [
                "group",
                "a"
            ],
            [
                "value",
                "o"
            ],
            [
                "dataId",
                "i"
            ]
        ],
        "transport": "postData"
    },
    "updateFolderOption": {
        "args": [
            "t",
            "e",
            "a",
            "o",
            "i"
        ],
        "endpoint": "UpdateFolderOption",
        "payload": [
            [
                "name",
                "t"
            ],
            [
                "category",
                "e"
            ],
            [
                "group",
                "a"
            ],
            [
                "value",
                "o"
            ],
            [
                "dataId",
                "i"
            ]
        ],
        "transport": "postData"
    },
    "updateTimeOption": {
        "args": [
            "t",
            "e",
            "a",
            "o",
            "i"
        ],
        "endpoint": "UpdateTimeOption",
        "payload": [
            [
                "name",
                "t"
            ],
            [
                "category",
                "e"
            ],
            [
                "group",
                "a"
            ],
            [
                "value",
                "o"
            ],
            [
                "dataId",
                "i"
            ]
        ],
        "transport": "postData"
    },
    "updateIntegerExtOption": {
        "args": [
            "t",
            "e",
            "a",
            "o",
            "i"
        ],
        "endpoint": "UpdateIntegerExtOption",
        "payload": [
            [
                "name",
                "t"
            ],
            [
                "category",
                "e"
            ],
            [
                "group",
                "a"
            ],
            [
                "value",
                "o"
            ],
            [
                "dataId",
                "i"
            ]
        ],
        "transport": "postData"
    },
    "updateDoubleExtOption": {
        "args": [
            "t",
            "e",
            "a",
            "o",
            "i"
        ],
        "endpoint": "UpdateDoubleExtOption",
        "payload": [
            [
                "name",
                "t"
            ],
            [
                "category",
                "e"
            ],
            [
                "group",
                "a"
            ],
            [
                "value",
                "o"
            ],
            [
                "dataId",
                "i"
            ]
        ],
        "transport": "postData"
    },
    "updateCollectionOption": {
        "args": [
            "t",
            "e",
            "a",
            "o"
        ],
        "endpoint": "UpdateCollectionOption",
        "payload": [
            [
                "name",
                "t"
            ],
            [
                "collection",
                "e"
            ],
            [
                "value",
                "a"
            ],
            [
                "dataId",
                "o"
            ]
        ],
        "transport": "postData"
    },
    "deleteOption": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "DeleteOption",
        "payload": [
            [
                "name",
                "t"
            ],
            [
                "dataId",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "deleteCollectionOption": {
        "args": [
            "t",
            "e",
            "a"
        ],
        "endpoint": "DeleteCollectionOption",
        "payload": [
            [
                "name",
                "t"
            ],
            [
                "collection",
                "e"
            ],
            [
                "dataId",
                "a"
            ]
        ],
        "transport": "postData"
    },
    "deleteDataOptions": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "DeleteDataOptions",
        "payload": [
            [
                "groups",
                "t"
            ],
            [
                "dataId",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "getOrganisationUnitList": {
        "args": [
            "t"
        ],
        "endpoint": "GetOrganisationUnitList",
        "payload": [
            [
                "filter",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getOrganisationUnitListFilter": {
        "args": [
            "t"
        ],
        "endpoint": "GetOrganisationUnitListFilter",
        "payload": [
            [
                "defaultFilter",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getOrganisationUnitStructure": {
        "args": [
            "t"
        ],
        "endpoint": "GetOrganisationUnitStructure",
        "payload": [
            [
                "listFilter",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getOrganisationUnitUser": {
        "args": [
            "t"
        ],
        "endpoint": "GetOrganisationUnitUser",
        "payload": [
            [
                "userId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getOrganisationUnitGroup": {
        "args": [
            "t"
        ],
        "endpoint": "GetOrganisationUnitGroup",
        "payload": [
            [
                "groupId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getOrganisationUnitUserList": {
        "args": [
            "t"
        ],
        "endpoint": "GetOrganisationUnitUserList",
        "payload": [
            [
                "filter",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "changeOrganisationUnitPassword": {
        "args": [
            "t",
            "e",
            "a",
            "o",
            "i"
        ],
        "endpoint": "ChangeOrganisationUnitPassword",
        "payload": [
            [
                "userId",
                "t"
            ],
            [
                "oldHash",
                "e"
            ],
            [
                "newHash",
                "a"
            ],
            [
                "newSalt",
                "o"
            ],
            [
                "newEncryptedPrivateKey",
                "i"
            ]
        ],
        "transport": "postData"
    },
    "getUserInvolvedOrganisationUnit": {
        "args": [
            "t"
        ],
        "endpoint": "GetUserInvolvedOrganisationUnit",
        "payload": [
            [
                "dataId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getGroupInvolvedOrganisationUnit": {
        "args": [
            "t"
        ],
        "endpoint": "GetGroupInvolvedOrganisationUnit",
        "payload": [
            [
                "dataId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getOrganisationUnitImageSource": {
        "args": [
            "t"
        ],
        "endpoint": "GetOrganisationUnitImageSource",
        "payload": [
            [
                "organisationId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "hasUserMasterKeyMode": {
        "args": [
            "t"
        ],
        "endpoint": "HasUserMasterKeyMode",
        "payload": [
            [
                "id",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "hasGroupMasterKeyMode": {
        "args": [
            "t"
        ],
        "endpoint": "HasGroupMasterKeyMode",
        "payload": [
            [
                "id",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "addOrganisationUnitGroup": {
        "args": [
            "t",
            "e",
            "a",
            "o"
        ],
        "endpoint": "AddOrganisationUnitGroup",
        "payload": [
            [
                "group",
                "t"
            ],
            [
                "publicKey",
                "e"
            ],
            [
                "encryptedGroupPrivateKey",
                "a"
            ],
            [
                "parentOrganisationUnitId",
                "o"
            ]
        ],
        "transport": "postData"
    },
    "updateOrganisationUnitGroup": {
        "args": [
            "t"
        ],
        "endpoint": "UpdateOrganisationUnitGroup",
        "payload": [
            [
                "organisationUnitGroup",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "deleteOrganisationUnitGroup": {
        "args": [
            "t"
        ],
        "endpoint": "DeleteOrganisationUnitGroup",
        "payload": [
            [
                "organisationUnitGroup",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "addOrganisationUnitUser": {
        "args": [
            "t",
            "e",
            "a",
            "o",
            "i",
            "r",
            "n"
        ],
        "endpoint": "AddOrganisationUnitUser",
        "payload": [
            [
                "user",
                "t"
            ],
            [
                "userPasswordHash",
                "e"
            ],
            [
                "userPasswordSalt",
                "a"
            ],
            [
                "publicKey",
                "o"
            ],
            [
                "encryptedUserPrivateKey",
                "i"
            ],
            [
                "encryptedCurrentUserPrivateKey",
                "r"
            ],
            [
                "parentOrganisationUnitId",
                "n"
            ]
        ],
        "transport": "postData"
    },
    "addOrganisationUnitUser2": {
        "args": [
            "t",
            "e",
            "a",
            "o",
            "i",
            "r",
            "n",
            "p"
        ],
        "endpoint": "AddOrganisationUnitUser2",
        "payload": [
            [
                "user",
                "t"
            ],
            [
                "userPasswordHash",
                "e"
            ],
            [
                "userPasswordSalt",
                "a"
            ],
            [
                "publicKey",
                "o"
            ],
            [
                "encryptedUserPrivateKey",
                "i"
            ],
            [
                "encryptedCurrentUserPrivateKey",
                "r"
            ],
            [
                "clientHashAlgorithm",
                "n"
            ],
            [
                "parentOrganisationUnitId",
                "p"
            ]
        ],
        "transport": "postData"
    },
    "updateOrganisationUnitUser": {
        "args": [
            "t"
        ],
        "endpoint": "UpdateOrganisationUnitUser",
        "payload": [
            [
                "organisationUnitUser",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "deleteOrganisationUnitUser": {
        "args": [
            "t"
        ],
        "endpoint": "DeleteOrganisationUnitUser",
        "payload": [
            [
                "organisationUnitUser",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getCurrentOrganisationUnit": {
        "args": [],
        "endpoint": "GetCurrentOrganisationUnit",
        "payload": [],
        "transport": "getData"
    },
    "getPolicy": {
        "args": [
            "t"
        ],
        "endpoint": "GetPolicy",
        "payload": [
            [
                "policyId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getPolicies": {
        "args": [],
        "endpoint": "GetPolicies",
        "payload": [
            [
                "take",
                "0"
            ]
        ],
        "transport": "postData"
    },
    "getCategoryPolicy": {
        "args": [
            "t"
        ],
        "endpoint": "GetCategoryPolicy",
        "payload": [
            [
                "category",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "registerProgressToken": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "RegisterProgressToken",
        "payload": [
            [
                "tokenInfo",
                "t"
            ],
            [
                "tokenName",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "unregisterProgressToken": {
        "args": [
            "t"
        ],
        "endpoint": "UnregisterProgressToken",
        "payload": [
            [
                "tokenIdentity",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getCurrentUserProgressTokens": {
        "args": [],
        "endpoint": "GetCurrentUserProgressTokens",
        "payload": [],
        "transport": "getData"
    },
    "getLegitimateDataRight": {
        "args": [
            "t",
            "e",
            "a"
        ],
        "endpoint": "GetLegitimateDataRight",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "legitimateId",
                "e"
            ],
            [
                "rights",
                "a"
            ]
        ],
        "transport": "postData"
    },
    "getLegitimateDataRights": {
        "args": [
            "t",
            "e",
            "a"
        ],
        "endpoint": "GetLegitimateDataRights",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "checkRights",
                "e"
            ],
            [
                "showDeletedNames",
                "a"
            ]
        ],
        "transport": "postData"
    },
    "getMultiLegitimateDataRights": {
        "args": [
            "t",
            "e",
            "a"
        ],
        "endpoint": "GetMultiLegitimateDataRights",
        "payload": [
            [
                "dataIds",
                "t"
            ],
            [
                "checkRights",
                "e"
            ],
            [
                "showDeletedNames",
                "a"
            ]
        ],
        "transport": "postData"
    },
    "updateLegitimateDataRightKey": {
        "args": [
            "t",
            "e",
            "a"
        ],
        "endpoint": "UpdateLegitimateDataRightKey",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "legitimateId",
                "e"
            ],
            [
                "rightKey",
                "a"
            ]
        ],
        "transport": "postData"
    },
    "removeCurrentOrganisationUnitFromRights": {
        "args": [
            "t"
        ],
        "endpoint": "RemoveCurrentOrganisationUnitFromRights",
        "payload": [
            [
                "dataId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "addLegitimateDataRight": {
        "args": [
            "t",
            "e",
            "a"
        ],
        "endpoint": "AddLegitimateDataRight",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "legitimateId",
                "e"
            ],
            [
                "rights",
                "a"
            ]
        ],
        "transport": "postData"
    },
    "updateLegitimateDataRight": {
        "args": [
            "t",
            "e",
            "a"
        ],
        "endpoint": "UpdateLegitimateDataRight",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "legitimateId",
                "e"
            ],
            [
                "rights",
                "a"
            ]
        ],
        "transport": "postData"
    },
    "removeAllLegitimateDataRights": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "RemoveAllLegitimateDataRights",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "allRights",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "updateLegitimateDataRightOwnerRight": {
        "args": [
            "t",
            "e",
            "a"
        ],
        "endpoint": "UpdateLegitimateDataRightOwnerRight",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "legitimateId",
                "e"
            ],
            [
                "ownerRight",
                "a"
            ]
        ],
        "transport": "postData"
    },
    "updateLegitimateDataRightSecuredData": {
        "args": [
            "t",
            "e",
            "a"
        ],
        "endpoint": "UpdateLegitimateDataRightSecuredData",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "legitimateId",
                "e"
            ],
            [
                "secured",
                "a"
            ]
        ],
        "transport": "postData"
    },
    "removeLegitimateDataRight": {
        "args": [
            "t",
            "e",
            "a"
        ],
        "endpoint": "RemoveLegitimateDataRight",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "legitimateId",
                "e"
            ],
            [
                "rights",
                "a"
            ]
        ],
        "transport": "postData"
    },
    "updateLegitimateDataRightValidDate": {
        "args": [
            "t",
            "e",
            "a",
            "o"
        ],
        "endpoint": "UpdateLegitimateDataRightValidDate",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "legitimateId",
                "e"
            ],
            [
                "validFrom",
                "a"
            ],
            [
                "validTo",
                "o"
            ]
        ],
        "transport": "postData"
    },
    "updateLegitimateSealId": {
        "args": [
            "t",
            "e",
            "a"
        ],
        "endpoint": "UpdateLegitimateSealId",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "legitimateId",
                "e"
            ],
            [
                "sealId",
                "a"
            ]
        ],
        "transport": "postData"
    },
    "batchUpdateRights": {
        "args": [
            "t"
        ],
        "endpoint": "BatchUpdateRights",
        "payload": [
            [
                "items",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getCurrentConnectionDataRights": {
        "args": [
            "t"
        ],
        "endpoint": "GetCurrentConnectionDataRights",
        "payload": [
            [
                "dataId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getCurrentConnectionDataRightList": {
        "args": [
            "t"
        ],
        "endpoint": "GetCurrentConnectionDataRightList",
        "payload": [
            [
                "dataIds",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getLegitimateDataRightsWithTemporalRights": {
        "args": [
            "t",
            "e",
            "a"
        ],
        "endpoint": "GetLegitimateDataRightsWithTemporalRights",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "validFrom",
                "e"
            ],
            [
                "validTo",
                "a"
            ]
        ],
        "transport": "postData"
    },
    "getLegitimateDataRightsWithoutDeleted": {
        "args": [
            "t"
        ],
        "endpoint": "GetLegitimateDataRightsWithoutDeleted",
        "payload": [
            [
                "dataId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getLegitimateDataRightCheckRoles": {
        "args": [
            "t",
            "e",
            "a"
        ],
        "endpoint": "GetLegitimateDataRightCheckRoles",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "legitimateId",
                "e"
            ],
            [
                "rights",
                "a"
            ]
        ],
        "transport": "postData"
    },
    "requestDataRight": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "RequestDataRight",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "type",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "getDatabaseAdministratorDataRights": {
        "args": [
            "t"
        ],
        "endpoint": "GetDatabaseAdministratorDataRights",
        "payload": [
            [
                "dataId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "removeAllLegitimateDataRightsExcept": {
        "args": [
            "t",
            "e",
            "a"
        ],
        "endpoint": "RemoveAllLegitimateDataRightsExcept",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "excludedLegitimateIds",
                "e"
            ],
            [
                "excludeCurrentUserOrRoleRight",
                "a"
            ]
        ],
        "transport": "postData"
    },
    "getRoleList": {
        "args": [
            "t"
        ],
        "endpoint": "GetRoleList",
        "payload": [
            [
                "filter",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getRoleListFilter": {
        "args": [
            "t"
        ],
        "endpoint": "GetRoleListFilter",
        "payload": [
            [
                "defaultFilter",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getUsersInRole": {
        "args": [
            "t"
        ],
        "endpoint": "GetUsersInRole",
        "payload": [
            [
                "roleId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getRole": {
        "args": [
            "t"
        ],
        "endpoint": "GetRole",
        "payload": [
            [
                "roleId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getUserRoles": {
        "args": [
            "t"
        ],
        "endpoint": "GetUserRoles",
        "payload": [
            [
                "userId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "deleteRole": {
        "args": [
            "t"
        ],
        "endpoint": "DeleteRole",
        "payload": [
            [
                "role",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "addRole": {
        "args": [
            "t",
            "e",
            "a"
        ],
        "endpoint": "AddRole",
        "payload": [
            [
                "role",
                "t"
            ],
            [
                "publicKey",
                "e"
            ],
            [
                "encryptedRolePrivateKey",
                "a"
            ]
        ],
        "transport": "postData"
    },
    "updateRole": {
        "args": [
            "t"
        ],
        "endpoint": "UpdateRole",
        "payload": [
            [
                "role",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "hasRoleMasterKeyMode": {
        "args": [
            "t"
        ],
        "endpoint": "HasRoleMasterKeyMode",
        "payload": [
            [
                "id",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getRoleInvolvedOrganisationUnit": {
        "args": [
            "t"
        ],
        "endpoint": "GetRoleInvolvedOrganisationUnit",
        "payload": [
            [
                "dataId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "addSeal": {
        "args": [
            "t",
            "e",
            "a"
        ],
        "endpoint": "AddSeal",
        "payload": [
            [
                "seal",
                "t"
            ],
            [
                "dataId",
                "e"
            ],
            [
                "dataType",
                "a"
            ]
        ],
        "transport": "postData"
    },
    "updateSeal": {
        "args": [
            "t",
            "e",
            "a"
        ],
        "endpoint": "UpdateSeal",
        "payload": [
            [
                "seal",
                "t"
            ],
            [
                "dataId",
                "e"
            ],
            [
                "dataType",
                "a"
            ]
        ],
        "transport": "postData"
    },
    "getSeal": {
        "args": [
            "t"
        ],
        "endpoint": "GetSeal",
        "payload": [
            [
                "sealId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "breakSeal": {
        "args": [
            "t"
        ],
        "endpoint": "BreakSeal",
        "payload": [
            [
                "sealId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "deleteKeyReleasesForUser": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "DeleteKeyReleasesForUser",
        "payload": [
            [
                "seal",
                "t"
            ],
            [
                "legitimateId",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "updateSealKeyRelease": {
        "args": [
            "t",
            "e",
            "a"
        ],
        "endpoint": "UpdateSealKeyRelease",
        "payload": [
            [
                "release",
                "t"
            ],
            [
                "dataId",
                "e"
            ],
            [
                "dataType",
                "a"
            ]
        ],
        "transport": "postData"
    },
    "getSealKey": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "GetSealKey",
        "payload": [
            [
                "sealKeyId",
                "t"
            ],
            [
                "legitimateId",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "deleteSeal": {
        "args": [
            "t"
        ],
        "endpoint": "DeleteSeal",
        "payload": [
            [
                "sealId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getSealTemplateList": {
        "args": [
            "t"
        ],
        "endpoint": "GetSealTemplateList",
        "payload": [
            [
                "filter",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getSealTemplateInvolvedOrganisationUnits": {
        "args": [
            "t"
        ],
        "endpoint": "GetSealTemplateInvolvedOrganisationUnit",
        "payload": [
            [
                "dataId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getSealOpenType": {
        "args": [
            "t",
            "e",
            "a",
            "o"
        ],
        "endpoint": "GetSealOpenType",
        "payload": [
            [
                "seal",
                "t"
            ],
            [
                "dataId",
                "e"
            ],
            [
                "userId",
                "a"
            ],
            [
                "ignoreSealKey",
                "o"
            ]
        ],
        "transport": "postData"
    },
    "getSealOpenTypeBySealId": {
        "args": [
            "t",
            "e",
            "a",
            "o"
        ],
        "endpoint": "GetSealOpenTypeBySealId",
        "payload": [
            [
                "sealId",
                "t"
            ],
            [
                "dataId",
                "e"
            ],
            [
                "userId",
                "a"
            ],
            [
                "ignoreSealKey",
                "o"
            ]
        ],
        "transport": "postData"
    },
    "hasRelease": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "HasRelease",
        "payload": [
            [
                "seal",
                "t"
            ],
            [
                "legitimateId",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "getTags": {
        "args": [
            "t"
        ],
        "endpoint": "GetTags",
        "payload": [
            [
                "filter",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "addDataFavorite": {
        "args": [
            "t"
        ],
        "endpoint": "AddDataFavorite",
        "payload": [
            [
                "dataId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "removeDataFavorite": {
        "args": [
            "t"
        ],
        "endpoint": "RemoveDataFavorite",
        "payload": [
            [
                "dataId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getTagListFilter": {
        "args": [
            "t"
        ],
        "endpoint": "GetTagListFilter",
        "payload": [
            [
                "defaultFilter",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getTagGlobalUsageInfos": {
        "args": [
            "t"
        ],
        "endpoint": "GetTagGlobalUsageInfos",
        "payload": [
            [
                "take",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "addTag": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "AddTag",
        "payload": [
            [
                "tag",
                "t"
            ],
            [
                "hexColor",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "updateTag": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "UpdateTag",
        "payload": [
            [
                "tag",
                "t"
            ],
            [
                "hexColor",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "deleteTag": {
        "args": [
            "t"
        ],
        "endpoint": "DeleteTag",
        "payload": [
            [
                "tag",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "setDataTags": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "SetDataTags",
        "payload": [
            [
                "dataTags",
                "t"
            ],
            [
                "dataId",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "getDataRightTemplates": {
        "args": [
            "t",
            "e",
            "a",
            "o"
        ],
        "endpoint": "GetDataRightTemplates",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "dataType",
                "e"
            ],
            [
                "targetId",
                "a"
            ],
            [
                "templateGroupId",
                "o"
            ]
        ],
        "transport": "postData"
    },
    "getHierarchyDataRightTemplate": {
        "args": [
            "t",
            "e",
            "a",
            "o"
        ],
        "endpoint": "GetHierarchyDataRightTemplate",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "dataType",
                "e"
            ],
            [
                "targetId",
                "a"
            ],
            [
                "templateGroupId",
                "o"
            ]
        ],
        "transport": "postData"
    },
    "getTemplateGroupList": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "GetTemplateGroupList",
        "payload": [
            [
                "organisationUnitId",
                "t"
            ],
            [
                "ignoreOrganisationUnitPath",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "getDefaultOrganisationUnitTemplateGroupId": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "GetDefaultOrganisationUnitTemplateGroupId",
        "payload": [
            [
                "organisationUnitId",
                "t"
            ],
            [
                "ignoreParents",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "getDataTagTemplates": {
        "args": [
            "t",
            "e",
            "a",
            "o"
        ],
        "endpoint": "GetDataTagTemplates",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "dataType",
                "e"
            ],
            [
                "targetId",
                "a"
            ],
            [
                "templateGroupId",
                "o"
            ]
        ],
        "transport": "postData"
    },
    "getTemplateGroupCount": {
        "args": [
            "t"
        ],
        "endpoint": "GetTemplateGroupCount",
        "payload": [
            [
                "organisationUnitId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getTemplateGroupById": {
        "args": [
            "t"
        ],
        "endpoint": "GetTemplateGroupById",
        "payload": [
            [
                "templateGroupId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getHierarchyDataTagTemplate": {
        "args": [
            "t",
            "e",
            "a",
            "o"
        ],
        "endpoint": "GetHierarchyDataTagTemplate",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "dataType",
                "e"
            ],
            [
                "targetId",
                "a"
            ],
            [
                "templateGroupId",
                "o"
            ]
        ],
        "transport": "postData"
    },
    "getDataRightTemplateTargets": {
        "args": [
            "t"
        ],
        "endpoint": "GetDataRightTemplateTargets",
        "payload": [
            [
                "dataId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getDataRightTemplateTargetNode": {
        "args": [
            "t"
        ],
        "endpoint": "GetDataRightTemplateTargetNode",
        "payload": [
            [
                "dataId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "addTemplateGroup": {
        "args": [
            "t"
        ],
        "endpoint": "AddTemplateGroup",
        "payload": [
            [
                "group",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "updateTemplateGroup": {
        "args": [
            "t"
        ],
        "endpoint": "UpdateTemplateGroup",
        "payload": [
            [
                "group",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "deleteTemplateGroup": {
        "args": [
            "t"
        ],
        "endpoint": "DeleteTemplateGroup",
        "payload": [
            [
                "id",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getRootTemplateGroupList": {
        "args": [
            "t"
        ],
        "endpoint": "GetRootTemplateGroupList",
        "payload": [
            [
                "organisationUnitId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "addLegitimateDataRightTemplate": {
        "args": [
            "t",
            "e",
            "a",
            "o",
            "i",
            "r"
        ],
        "endpoint": "AddLegitimateDataRightTemplate",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "legitimateId",
                "e"
            ],
            [
                "rights",
                "a"
            ],
            [
                "dataType",
                "o"
            ],
            [
                "targetId",
                "i"
            ],
            [
                "templateGroupId",
                "r"
            ]
        ],
        "transport": "postData"
    },
    "updateLegitimateDataRightTemplate": {
        "args": [
            "t",
            "e",
            "a",
            "o",
            "i",
            "r"
        ],
        "endpoint": "UpdateLegitimateDataRightTemplate",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "legitimateId",
                "e"
            ],
            [
                "rights",
                "a"
            ],
            [
                "dataType",
                "o"
            ],
            [
                "targetId",
                "i"
            ],
            [
                "templateGroupId",
                "r"
            ]
        ],
        "transport": "postData"
    },
    "updateLegitimateDataRightTemplateOwnerRight": {
        "args": [
            "t",
            "e",
            "a",
            "o",
            "i",
            "r"
        ],
        "endpoint": "UpdateLegitimateDataRightTemplateOwnerRight",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "legitimateId",
                "e"
            ],
            [
                "dataType",
                "a"
            ],
            [
                "targetId",
                "o"
            ],
            [
                "templateGroupId",
                "i"
            ],
            [
                "ownerRight",
                "r"
            ]
        ],
        "transport": "postData"
    },
    "removeLegitimateDataRightTemplate": {
        "args": [
            "t",
            "e",
            "a",
            "o",
            "i",
            "r"
        ],
        "endpoint": "RemoveLegitimateDataRightTemplate",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "legitimateId",
                "e"
            ],
            [
                "rights",
                "a"
            ],
            [
                "dataType",
                "o"
            ],
            [
                "targetId",
                "i"
            ],
            [
                "templateGroupId",
                "r"
            ]
        ],
        "transport": "postData"
    },
    "removeAllLegitimateDataRightTemplate": {
        "args": [
            "t"
        ],
        "endpoint": "RemoveAllLegitimateDataRightTemplate",
        "payload": [
            [
                "dataId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "addDataTagTemplate": {
        "args": [
            "t",
            "e",
            "a",
            "o",
            "i"
        ],
        "endpoint": "AddDataTagTemplate",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "tagIds",
                "e"
            ],
            [
                "dataType",
                "a"
            ],
            [
                "targetId",
                "o"
            ],
            [
                "templateGroupId",
                "i"
            ]
        ],
        "transport": "postData"
    },
    "updateDataTagTemplate": {
        "args": [
            "t",
            "e",
            "a",
            "o",
            "i"
        ],
        "endpoint": "UpdateDataTagTemplate",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "tagId",
                "e"
            ],
            [
                "dataType",
                "a"
            ],
            [
                "targetId",
                "o"
            ],
            [
                "templateGroupId",
                "i"
            ]
        ],
        "transport": "postData"
    },
    "removeDataTagTemplate": {
        "args": [
            "t",
            "e",
            "a",
            "o",
            "i"
        ],
        "endpoint": "RemoveDataTagTemplate",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "tagId",
                "e"
            ],
            [
                "dataType",
                "a"
            ],
            [
                "targetId",
                "o"
            ],
            [
                "templateGroupId",
                "i"
            ]
        ],
        "transport": "postData"
    },
    "removeAllDataTagTemplate": {
        "args": [
            "t"
        ],
        "endpoint": "RemoveAllDataTagTemplate",
        "payload": [
            [
                "dataId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getDataRightTemplate": {
        "args": [
            "t",
            "e",
            "a",
            "o",
            "i"
        ],
        "endpoint": "GetDataRightTemplate",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "legitimateId",
                "e"
            ],
            [
                "dataType",
                "a"
            ],
            [
                "targetId",
                "o"
            ],
            [
                "templateGroupId",
                "i"
            ]
        ],
        "transport": "postData"
    },
    "getDataTagTemplate": {
        "args": [
            "t",
            "e",
            "a",
            "o"
        ],
        "endpoint": "GetDataTagTemplate",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "dataType",
                "e"
            ],
            [
                "targetId",
                "a"
            ],
            [
                "templateGroupId",
                "o"
            ]
        ],
        "transport": "postData"
    },
    "getTriggerCount": {
        "args": [
            "t"
        ],
        "endpoint": "GetTriggerCount",
        "payload": [
            [
                "filter",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getTriggerListFilter": {
        "args": [
            "t"
        ],
        "endpoint": "GetTriggerListFilter",
        "payload": [
            [
                "defaultFilter",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getTriggerAlerts": {
        "args": [
            "t"
        ],
        "endpoint": "GetTriggerAlerts",
        "payload": [
            [
                "listFilter",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getTriggerAlertAdditionalDatas": {
        "args": [
            "t"
        ],
        "endpoint": "GetTriggerAlertAdditionalDatas",
        "payload": [
            [
                "alertId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "setNotifyTriggerAlertsRead": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "SetNotifyTriggerAlertsRead",
        "payload": [
            [
                "alertIds",
                "t"
            ],
            [
                "read",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "dataHasTriggerConfig": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "DataHasTriggerConfig",
        "payload": [
            [
                "dataId",
                "t"
            ],
            [
                "dataType",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "getTriggerConfigList": {
        "args": [
            "t"
        ],
        "endpoint": "GetTriggerConfigList",
        "payload": [
            [
                "dataId",
                "t"
            ]
        ],
        "transport": "postData"
    },
    "getTriggerObjektConfigList": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "GetTriggerObjektConfigList",
        "payload": [
            [
                "triggerOrganisationUnitId",
                "t"
            ],
            [
                "triggerObjectType",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "setNotifyDataTriggerConfig": {
        "args": [
            "t",
            "e",
            "a",
            "o",
            "i"
        ],
        "endpoint": "SetNotifyDataTriggerConfig",
        "payload": [
            [
                "reason",
                "t"
            ],
            [
                "dataId",
                "e"
            ],
            [
                "overrideType",
                "a"
            ],
            [
                "checkRights",
                "o"
            ],
            [
                "filterObjects",
                "i"
            ]
        ],
        "transport": "postData"
    },
    "setNotifyOuTriggerConfig": {
        "args": [
            "t",
            "e",
            "a",
            "o",
            "i",
            "r"
        ],
        "endpoint": "SetNotifyOuTriggerConfig",
        "payload": [
            [
                "reason",
                "t"
            ],
            [
                "organisationUnitId",
                "e"
            ],
            [
                "objectType",
                "a"
            ],
            [
                "overrideType",
                "o"
            ],
            [
                "checkRights",
                "i"
            ],
            [
                "filterObjects",
                "r"
            ]
        ],
        "transport": "postData"
    },
    "removeNotifyDataTriggerConfig": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "RemoveNotifyDataTriggerConfig",
        "payload": [
            [
                "reason",
                "t"
            ],
            [
                "dataId",
                "e"
            ]
        ],
        "transport": "postData"
    },
    "removeNotifyOuTriggerConfig": {
        "args": [
            "t",
            "e",
            "a"
        ],
        "endpoint": "RemoveNotifyOuTriggerConfig",
        "payload": [
            [
                "reason",
                "t"
            ],
            [
                "organisationUnitId",
                "e"
            ],
            [
                "objectType",
                "a"
            ]
        ],
        "transport": "postData"
    },
    "getServerLicenseIsMsp": {
        "args": [],
        "endpoint": "GetServerLicenseIsMsp",
        "payload": [],
        "transport": "getData"
    },
    "getCurrentCustomersIsBilled": {
        "args": [],
        "endpoint": "GetCurrentCustomersIsBilled",
        "payload": [],
        "transport": "getData"
    },
    "getCurrentCustomersExpirationDateUtc": {
        "args": [],
        "endpoint": "GetCurrentCustomersExpirationDateUtc",
        "payload": [],
        "transport": "getData"
    },
    "getNotifyTriggerAlertsRead": {
        "args": [
            "t",
            "e"
        ],
        "endpoint": "SetNotifyTriggerAlertsRead",
        "payload": [
            [
                "alertIds",
                "t"
            ],
            [
                "read",
                "e"
            ]
        ],
        "transport": "postData"
    }
};
export const managerManifest = {
    "activeDirectory": {
        "getActiveDirectoryProfileList": {
            "args": [
                "e"
            ],
            "serviceMethod": "getActiveDirectoryProfileList"
        },
        "getActiveDirectoryProfileListFilter": {
            "args": [
                "e"
            ],
            "serviceMethod": "getActiveDirectoryProfileListFilter"
        },
        "getActiveDirecotryProfileInvolvedOrganisationUnit": {
            "args": [
                "e"
            ],
            "serviceMethod": "getActiveDirectoryProfileInvolvedOrganisationUnit"
        },
        "deleteActiveDirectoryProfile": {
            "args": [
                "e"
            ],
            "serviceMethod": "deleteActiveDirectoryProfile"
        },
        "updateActiveDirectoryProfile": {
            "args": [
                "e"
            ],
            "serviceMethod": "updateActiveDirectoryProfile"
        },
        "addActiveDirectoryProfile": {
            "args": [
                "e"
            ],
            "serviceMethod": "addActiveDirectoryProfile"
        },
        "checkActiveDirectoryConnection": {
            "args": [
                "e",
                "t",
                "i",
                "r",
                "o"
            ],
            "serviceMethod": "checkActiveDirectoryConnection"
        },
        "getActiveDirectoryRootElements": {
            "args": [
                "e",
                "t"
            ],
            "serviceMethod": "getActiveDirectoryRootElements"
        },
        "getActiveDirectoryMembersOfGroup": {
            "args": [
                "e",
                "t"
            ],
            "serviceMethod": "getActiveDirectoryMembersOfGroup"
        },
        "getActiveDirectoryElementList": {
            "args": [
                "e",
                "t",
                "i",
                "r"
            ],
            "serviceMethod": "getActiveDirectoryElementList"
        },
        "getSpecificActiveDirectoryElements": {
            "args": [
                "e",
                "t"
            ],
            "serviceMethod": "getSpecificActiveDirectoryElements"
        },
        "importActiveDirectory": {
            "args": [
                "e",
                "t",
                "i",
                "r",
                "o"
            ],
            "serviceMethod": "importActiveDirectory"
        },
        "syncActiveDirectory": {
            "args": [
                "e",
                "t"
            ],
            "serviceMethod": "syncActiveDirectory"
        },
        "generateActiveDirectorySummaryDetails": {
            "args": [
                "e",
                "t",
                "i",
                "r",
                "o",
                "c"
            ],
            "serviceMethod": "generateActiveDirectorySummaryDetails"
        },
        "getActiveDirectorySummaryDetails": {
            "args": [
                "e"
            ],
            "serviceMethod": "getActiveDirectorySummaryDetails"
        }
    },
    "application": {
        "getApplication": {
            "args": [
                "t"
            ],
            "serviceMethod": "getApplication"
        },
        "getApplicationListFilter": {
            "args": [
                "t"
            ],
            "serviceMethod": "getApplicationListFilter"
        },
        "getApplicationList": {
            "args": [
                "t"
            ],
            "serviceMethod": "getApplicationList"
        },
        "addApplication": {
            "args": [
                "t"
            ],
            "serviceMethod": "addApplication"
        },
        "updateApplication": {
            "args": [
                "t"
            ],
            "serviceMethod": "updateApplication"
        }
    },
    "dataBinding": {
        "addDataBinding": {
            "args": [
                "t",
                "e",
                "n",
                "i"
            ],
            "serviceMethod": "addDataBinding"
        },
        "removeAllDataBinding": {
            "args": [
                "t",
                "e"
            ],
            "serviceMethod": "removeAllDataBinding"
        },
        "getDataBindingsByData": {
            "args": [
                "t",
                "e"
            ],
            "serviceMethod": "getDataBindingsByData"
        },
        "getDataBindingsByParent": {
            "args": [
                "t",
                "e"
            ],
            "serviceMethod": "getDataBindingsByParent"
        },
        "removeDataBinding": {
            "args": [
                "t",
                "e"
            ],
            "serviceMethod": "removeDataBinding"
        }
    },
    "emailVerification": {
        "checkEmailVerification": {
            "args": [
                "e"
            ],
            "serviceMethod": "checkEmailVerification"
        }
    },
    "forwardingRule": {
        "addForwardingRule": {
            "args": [
                "e"
            ],
            "serviceMethod": "addForwardingRule"
        },
        "updateForwardingRule": {
            "args": [
                "e"
            ],
            "serviceMethod": "updateForwardingRule"
        },
        "deleteForwardingRule": {
            "args": [
                "e"
            ],
            "serviceMethod": "deleteForwardingRule"
        },
        "getForwardingRuleList": {
            "args": [],
            "serviceMethod": "getForwardingRuleList"
        }
    },
    "license": {
        "getServerLicenseModuleList": {
            "args": [],
            "serviceMethod": "getServerLicenseModuleList"
        },
        "getServerLicenseIsMsp": {
            "args": [],
            "serviceMethod": "getServerLicenseIsMsp"
        },
        "getCurrentCustomersIsBilled": {
            "args": [],
            "serviceMethod": "getCurrentCustomersIsBilled"
        },
        "getCurrentCustomersExpirationDateUtc": {
            "args": [],
            "serviceMethod": "getCurrentCustomersExpirationDateUtc"
        }
    },
    "logbook": {
        "getLogbookEntries": {
            "args": [
                "t"
            ],
            "serviceMethod": "getLogbookEntrys"
        },
        "addLogbookEntries": {
            "args": [
                "t",
                "o",
                "e",
                "i"
            ],
            "serviceMethod": "addLogbookEntries"
        },
        "getSingleLogbookEntry": {
            "args": [
                "t"
            ],
            "serviceMethod": "getSingleLogbookEntry"
        },
        "getLogbookListFilter": {
            "args": [
                "t"
            ],
            "serviceMethod": "getLogbookListFilter"
        },
        "getLogbookCount": {
            "args": [
                "t"
            ],
            "serviceMethod": "getLogbookCount"
        }
    },
    "mailing": {
        "isSmtpConfigured": {
            "args": [],
            "serviceMethod": "isSmtpConfigured"
        }
    },
    "option": {
        "getOption": {
            "args": [
                "t",
                "e"
            ],
            "serviceMethod": "getOption"
        },
        "getOptions": {
            "args": [
                "t",
                "e"
            ],
            "serviceMethod": "getOptions"
        },
        "updateStringOption": {
            "args": [
                "t",
                "e",
                "i",
                "n",
                "o"
            ],
            "serviceMethod": "updateStringOption"
        },
        "updatePasswordOption": {
            "args": [
                "t",
                "e",
                "i",
                "n",
                "o"
            ],
            "serviceMethod": "updatePasswordOption"
        },
        "updateGlobalEncryptedOption": {
            "args": [
                "t",
                "e",
                "i",
                "n",
                "o"
            ],
            "serviceMethod": "updateGlobalEncryptedOption"
        },
        "updateIntegerOption": {
            "args": [
                "t",
                "e",
                "i",
                "n",
                "o"
            ],
            "serviceMethod": "updateIntegerOption"
        },
        "updateDoubleoption": {
            "args": [
                "t",
                "e",
                "i",
                "n",
                "o"
            ],
            "serviceMethod": "updateDoubleoption"
        },
        "updateDateTimeOption": {
            "args": [
                "t",
                "e",
                "i",
                "n",
                "o"
            ],
            "serviceMethod": "updateDateTimeOption"
        },
        "updateBooleanOption": {
            "args": [
                "t",
                "e",
                "i",
                "n",
                "o"
            ],
            "serviceMethod": "updateBooleanOption"
        },
        "updateListOption": {
            "args": [
                "t",
                "e",
                "i",
                "n",
                "o"
            ],
            "serviceMethod": "updateListOption"
        },
        "updateFileOption": {
            "args": [
                "t",
                "e",
                "i",
                "n",
                "o"
            ],
            "serviceMethod": "updateFileOption"
        },
        "updateFolderOption": {
            "args": [
                "t",
                "e",
                "i",
                "n",
                "o"
            ],
            "serviceMethod": "updateFolderOption"
        },
        "updateTimeOption": {
            "args": [
                "t",
                "e",
                "i",
                "n",
                "o"
            ],
            "serviceMethod": "updateTimeOption"
        },
        "updateIntegerExtOption": {
            "args": [
                "t",
                "e",
                "i",
                "n",
                "o"
            ],
            "serviceMethod": "updateIntegerExtOption"
        },
        "updateDoubleExtOption": {
            "args": [
                "t",
                "e",
                "i",
                "n",
                "o"
            ],
            "serviceMethod": "updateDoubleExtOption"
        },
        "updateCollectionOption": {
            "args": [
                "t",
                "e",
                "i",
                "n"
            ],
            "serviceMethod": "updateCollectionOption"
        },
        "deleteOption": {
            "args": [
                "t",
                "e"
            ],
            "serviceMethod": "deleteOption"
        },
        "deleteCollectionOption": {
            "args": [
                "t",
                "e",
                "i"
            ],
            "serviceMethod": "deleteCollectionOption"
        },
        "deleteDataOptions": {
            "args": [
                "t",
                "e"
            ],
            "serviceMethod": "deleteDataOptions"
        }
    },
    "organisationUnit": {
        "getOrganisationUnitList": {
            "args": [
                "t"
            ],
            "serviceMethod": "getOrganisationUnitList"
        },
        "getOrganisationUnitListFilter": {
            "args": [
                "t"
            ],
            "serviceMethod": "getOrganisationUnitListFilter"
        },
        "getOrganisationUnitStructure": {
            "args": [
                "t"
            ],
            "serviceMethod": "getOrganisationUnitStructure"
        },
        "getOrganisationUnitUser": {
            "args": [
                "t"
            ],
            "serviceMethod": "getOrganisationUnitUser"
        },
        "getOrganisationUnitGroup": {
            "args": [
                "t"
            ],
            "serviceMethod": "getOrganisationUnitGroup"
        },
        "getOrganisationUnitUserList": {
            "args": [
                "t"
            ],
            "serviceMethod": "getOrganisationUnitUserList"
        },
        "changeOrganisationUnitPassword": {
            "args": [
                "t",
                "i",
                "n",
                "e",
                "r"
            ],
            "serviceMethod": "changeOrganisationUnitPassword"
        },
        "getUserInvolvedOrganisationUnit": {
            "args": [
                "t"
            ],
            "serviceMethod": "getUserInvolvedOrganisationUnit"
        },
        "getGroupInvolvedOrganisationUnit": {
            "args": [
                "t"
            ],
            "serviceMethod": "getGroupInvolvedOrganisationUnit"
        },
        "getOrganisationUnitImageSource": {
            "args": [
                "t"
            ],
            "serviceMethod": "getOrganisationUnitImageSource"
        },
        "hasUserMasterKeyMode": {
            "args": [
                "t"
            ],
            "serviceMethod": "hasUserMasterKeyMode"
        },
        "hasGroupMasterKeyMode": {
            "args": [
                "t"
            ],
            "serviceMethod": "hasGroupMasterKeyMode"
        },
        "addOrganisationUnitGroup": {
            "args": [
                "t",
                "i",
                "n",
                "e"
            ],
            "serviceMethod": "addOrganisationUnitGroup"
        },
        "addOrganisationUnitUser": {
            "args": [
                "t",
                "e",
                "a",
                "o",
                "i",
                "r",
                "n",
                "p"
            ],
            "serviceMethod": "addOrganisationUnitUser2"
        },
        "updateOrganisationUnitGroup": {
            "args": [
                "t"
            ],
            "serviceMethod": "updateOrganisationUnitGroup"
        },
        "deleteOrganisationUnitGroup": {
            "args": [
                "t"
            ],
            "serviceMethod": "deleteOrganisationUnitGroup"
        },
        "updateOrganisationUnitUser": {
            "args": [
                "t"
            ],
            "serviceMethod": "updateOrganisationUnitUser"
        },
        "deleteOrganisationUnitUser": {
            "args": [
                "t"
            ],
            "serviceMethod": "deleteOrganisationUnitUser"
        },
        "getCurrentOrganisationUnit": {
            "args": [],
            "serviceMethod": "getCurrentOrganisationUnit"
        }
    },
    "policy": {
        "getPolicy": {
            "args": [
                "e"
            ],
            "serviceMethod": "getPolicy"
        },
        "getPolicies": {
            "args": [],
            "serviceMethod": "getPolicies"
        },
        "getCategoryPolicy": {
            "args": [
                "e"
            ],
            "serviceMethod": "getCategoryPolicy"
        }
    },
    "progressToken": {
        "registerProgressToken": {
            "args": [
                "e",
                "r"
            ],
            "serviceMethod": "registerProgressToken"
        },
        "unregisterProgressToken": {
            "args": [
                "e"
            ],
            "serviceMethod": "unregisterProgressToken"
        },
        "getCurrentUserProgressTokens": {
            "args": [],
            "serviceMethod": "getCurrentUserProgressTokens"
        }
    },
    "right": {
        "getLegitimateDataRight": {
            "args": [
                "t",
                "e",
                "i"
            ],
            "serviceMethod": "getLegitimateDataRight"
        },
        "getLegitimateDataRights": {
            "args": [
                "t"
            ],
            "serviceMethod": "getLegitimateDataRights"
        },
        "getMultiLegitimateDataRights": {
            "args": [
                "t",
                "e",
                "i"
            ],
            "serviceMethod": "getMultiLegitimateDataRights"
        },
        "updateLegitimateDataRightKey": {
            "args": [
                "t",
                "e",
                "i"
            ],
            "serviceMethod": "updateLegitimateDataRightKey"
        },
        "removeCurrentOrganisationUnitFromRights": {
            "args": [
                "t"
            ],
            "serviceMethod": "removeCurrentOrganisationUnitFromRights"
        },
        "addLegitimateDataRight": {
            "args": [
                "t",
                "e",
                "i"
            ],
            "serviceMethod": "addLegitimateDataRight"
        },
        "updateLegitimateDataRight": {
            "args": [
                "t",
                "e",
                "i"
            ],
            "serviceMethod": "updateLegitimateDataRight"
        },
        "removeAllLegitimateDataRights": {
            "args": [
                "t",
                "e"
            ],
            "serviceMethod": "removeAllLegitimateDataRights"
        },
        "updateLegitimateDataRightOwnerRight": {
            "args": [
                "t",
                "e",
                "i"
            ],
            "serviceMethod": "updateLegitimateDataRightOwnerRight"
        },
        "updateLegitimateDataRightSecuredData": {
            "args": [
                "t",
                "e",
                "i"
            ],
            "serviceMethod": "updateLegitimateDataRightSecuredData"
        },
        "removeLegitimateDataRight": {
            "args": [
                "t",
                "e",
                "i"
            ],
            "serviceMethod": "removeLegitimateDataRight"
        },
        "updateLegitimateDataRightValidDate": {
            "args": [
                "t",
                "e",
                "i",
                "a"
            ],
            "serviceMethod": "updateLegitimateDataRightValidDate"
        },
        "updateLegitimateSealId": {
            "args": [
                "t",
                "e",
                "i"
            ],
            "serviceMethod": "updateLegitimateSealId"
        },
        "batchUpdateRights": {
            "args": [
                "t"
            ],
            "serviceMethod": "batchUpdateRights"
        },
        "getCurrentConnectionDataRights": {
            "args": [
                "t"
            ],
            "serviceMethod": "getCurrentConnectionDataRights"
        },
        "getCurrentConnectionDataRightList": {
            "args": [
                "t"
            ],
            "serviceMethod": "getCurrentConnectionDataRightList"
        },
        "getLegitimateDataRightsWithTemporalRights": {
            "args": [
                "t",
                "e",
                "i"
            ],
            "serviceMethod": "getLegitimateDataRightsWithTemporalRights"
        },
        "getLegitimateDataRightsWithoutDeleted": {
            "args": [
                "t"
            ],
            "serviceMethod": "getLegitimateDataRightsWithoutDeleted"
        },
        "getLegitimateDataRightCheckRoles": {
            "args": [
                "t",
                "e",
                "i"
            ],
            "serviceMethod": "getLegitimateDataRightCheckRoles"
        },
        "requestDataRight": {
            "args": [
                "t",
                "e"
            ],
            "serviceMethod": "requestDataRight"
        },
        "getDatabaseAdministratorDataRights": {
            "args": [
                "t"
            ],
            "serviceMethod": "getDatabaseAdministratorDataRights"
        },
        "removeAllLegitimateDataRightsExcept": {
            "args": [
                "t",
                "e",
                "i"
            ],
            "serviceMethod": "removeAllLegitimateDataRightsExcept"
        }
    },
    "role": {
        "getRoleList": {
            "args": [
                "e"
            ],
            "serviceMethod": "getRoleList"
        },
        "getRoleListFilter": {
            "args": [
                "e"
            ],
            "serviceMethod": "getRoleListFilter"
        },
        "getUsersInRole": {
            "args": [
                "e"
            ],
            "serviceMethod": "getUsersInRole"
        },
        "getRole": {
            "args": [
                "e"
            ],
            "serviceMethod": "getRole"
        },
        "getUserRoles": {
            "args": [
                "e"
            ],
            "serviceMethod": "getUserRoles"
        },
        "deleteRole": {
            "args": [
                "e"
            ],
            "serviceMethod": "deleteRole"
        },
        "addRole": {
            "args": [
                "e",
                "t",
                "o"
            ],
            "serviceMethod": "addRole"
        },
        "updateRole": {
            "args": [
                "e"
            ],
            "serviceMethod": "updateRole"
        },
        "hasRoleMasterKeyMode": {
            "args": [
                "e"
            ],
            "serviceMethod": "hasRoleMasterKeyMode"
        },
        "getRoleInvolvedOrganisationUnit": {
            "args": [
                "e"
            ],
            "serviceMethod": "getRoleInvolvedOrganisationUnit"
        }
    },
    "seal": {
        "addSeal": {
            "args": [
                "e",
                "t",
                "n"
            ],
            "serviceMethod": "addSeal"
        },
        "updateSeal": {
            "args": [
                "e",
                "t",
                "n"
            ],
            "serviceMethod": "updateSeal"
        },
        "getSeal": {
            "args": [
                "e"
            ],
            "serviceMethod": "getSeal"
        },
        "breakSeal": {
            "args": [
                "e"
            ],
            "serviceMethod": "breakSeal"
        },
        "deleteKeyReleasesForUser": {
            "args": [
                "e",
                "t"
            ],
            "serviceMethod": "deleteKeyReleasesForUser"
        },
        "updateSealKeyRelease": {
            "args": [
                "e",
                "t",
                "n"
            ],
            "serviceMethod": "updateSealKeyRelease"
        },
        "getSealKey": {
            "args": [
                "e",
                "t"
            ],
            "serviceMethod": "getSealKey"
        },
        "deleteSeal": {
            "args": [
                "e"
            ],
            "serviceMethod": "deleteSeal"
        },
        "getSealTemplateList": {
            "args": [
                "e"
            ],
            "serviceMethod": "getSealTemplateList"
        },
        "getSealTemplateInvolvedOrganisationUnits": {
            "args": [
                "e"
            ],
            "serviceMethod": "getSealTemplateInvolvedOrganisationUnit"
        },
        "hasRelease": {
            "args": [
                "e",
                "t"
            ],
            "serviceMethod": "hasRelease"
        },
        "getSealOpenTypeBySealId": {
            "args": [
                "e",
                "t",
                "n"
            ],
            "serviceMethod": "getSealOpenTypeBySealId"
        }
    },
    "tag": {
        "getTags": {
            "args": [
                "t"
            ],
            "serviceMethod": "getTags"
        },
        "addDataFavorite": {
            "args": [
                "t"
            ],
            "serviceMethod": "addDataFavorite"
        },
        "removeDataFavorite": {
            "args": [
                "t"
            ],
            "serviceMethod": "removeDataFavorite"
        },
        "getTagListFilter": {
            "args": [
                "t"
            ],
            "serviceMethod": "getTagListFilter"
        },
        "addTag": {
            "args": [
                "t",
                "e"
            ],
            "serviceMethod": "addTag"
        },
        "updateTag": {
            "args": [
                "t",
                "e"
            ],
            "serviceMethod": "updateTag"
        },
        "deleteTag": {
            "args": [
                "t"
            ],
            "serviceMethod": "deleteTag"
        },
        "getTagGlobalUsageInfos": {
            "args": [
                "t"
            ],
            "serviceMethod": "getTagGlobalUsageInfos"
        },
        "setDataTags": {
            "args": [
                "t",
                "e"
            ],
            "serviceMethod": "setDataTags"
        }
    },
    "template": {
        "getDataRightTemplates": {
            "args": [
                "t",
                "e",
                "a",
                "i"
            ],
            "serviceMethod": "getDataRightTemplates"
        },
        "getHierarchyDataRightTemplate": {
            "args": [
                "t",
                "e",
                "a",
                "i"
            ],
            "serviceMethod": "getHierarchyDataRightTemplate"
        },
        "getTemplateGroupList": {
            "args": [
                "t",
                "e"
            ],
            "serviceMethod": "getTemplateGroupList"
        },
        "getDefaultOrganisationUnitTemplateGroupId": {
            "args": [
                "t",
                "e"
            ],
            "serviceMethod": "getDefaultOrganisationUnitTemplateGroupId"
        },
        "getDataTagTemplates": {
            "args": [
                "t",
                "e",
                "a",
                "i"
            ],
            "serviceMethod": "getDataTagTemplates"
        },
        "getTemplateGroupCount": {
            "args": [
                "t"
            ],
            "serviceMethod": "getTemplateGroupCount"
        },
        "getTemplateGroupById": {
            "args": [
                "t"
            ],
            "serviceMethod": "getTemplateGroupById"
        },
        "getHierarchyDataTagTemplate": {
            "args": [
                "t",
                "e",
                "a",
                "i"
            ],
            "serviceMethod": "getHierarchyDataTagTemplate"
        },
        "getDataRightTemplateTargets": {
            "args": [
                "t"
            ],
            "serviceMethod": "getDataRightTemplateTargets"
        },
        "getDataRightTemplateTargetNode": {
            "args": [
                "t"
            ],
            "serviceMethod": "getDataRightTemplateTargetNode"
        },
        "addTemplateGroup": {
            "args": [
                "t"
            ],
            "serviceMethod": "addTemplateGroup"
        },
        "updateTemplateGroup": {
            "args": [
                "t"
            ],
            "serviceMethod": "updateTemplateGroup"
        },
        "deleteTemplateGroup": {
            "args": [
                "t"
            ],
            "serviceMethod": "deleteTemplateGroup"
        },
        "getRootTemplateGroupList": {
            "args": [
                "t"
            ],
            "serviceMethod": "getRootTemplateGroupList"
        },
        "addLegitimateDataRightTemplate": {
            "args": [
                "t",
                "e",
                "a",
                "i",
                "r",
                "p"
            ],
            "serviceMethod": "addLegitimateDataRightTemplate"
        },
        "updateLegitimateDataRightTemplate": {
            "args": [
                "t",
                "e",
                "a",
                "i",
                "r",
                "p"
            ],
            "serviceMethod": "updateLegitimateDataRightTemplate"
        },
        "updateLegitimateDataRightTemplateOwnerRight": {
            "args": [
                "t",
                "e",
                "a",
                "i",
                "r",
                "p"
            ],
            "serviceMethod": "updateLegitimateDataRightTemplateOwnerRight"
        },
        "removeLegitimateDataRightTemplate": {
            "args": [
                "t",
                "e",
                "a",
                "i",
                "r",
                "p"
            ],
            "serviceMethod": "removeLegitimateDataRightTemplate"
        },
        "removeAllLegitimateDataRightTemplate": {
            "args": [
                "t"
            ],
            "serviceMethod": "removeAllLegitimateDataRightTemplate"
        },
        "addDataTagTemplate": {
            "args": [
                "t",
                "e",
                "a",
                "i",
                "r"
            ],
            "serviceMethod": "addDataTagTemplate"
        },
        "updateDataTagTemplate": {
            "args": [
                "t",
                "e",
                "a",
                "i",
                "r"
            ],
            "serviceMethod": "updateDataTagTemplate"
        },
        "removeDataTagTemplate": {
            "args": [
                "t",
                "e",
                "a",
                "i",
                "r"
            ],
            "serviceMethod": "removeDataTagTemplate"
        },
        "removeAllDataTagTemplate": {
            "args": [
                "t"
            ],
            "serviceMethod": "removeAllDataTagTemplate"
        },
        "getDataRightTemplate": {
            "args": [
                "t",
                "e",
                "a",
                "i",
                "r"
            ],
            "serviceMethod": "getDataRightTemplate"
        },
        "getDataTagTemplate": {
            "args": [
                "t",
                "e",
                "a",
                "i"
            ],
            "serviceMethod": "getDataTagTemplate"
        }
    },
    "trigger": {
        "getTriggerCount": {
            "args": [
                "t"
            ],
            "serviceMethod": "getTriggerCount"
        },
        "getTriggerListFilter": {
            "args": [
                "t"
            ],
            "serviceMethod": "getTriggerListFilter"
        },
        "getTriggerAlerts": {
            "args": [
                "t"
            ],
            "serviceMethod": "getTriggerAlerts"
        },
        "getTriggerAlertAdditionalDatas": {
            "args": [
                "t"
            ],
            "serviceMethod": "getTriggerAlertAdditionalDatas"
        },
        "setNotifyTriggerAlertsRead": {
            "args": [
                "t",
                "e"
            ],
            "serviceMethod": "setNotifyTriggerAlertsRead"
        },
        "dataHasTriggerConfig": {
            "args": [
                "t",
                "e"
            ],
            "serviceMethod": "dataHasTriggerConfig"
        },
        "getTriggerConfigList": {
            "args": [
                "t"
            ],
            "serviceMethod": "getTriggerConfigList"
        },
        "getTriggerObjektConfigList": {
            "args": [
                "t",
                "e"
            ],
            "serviceMethod": "getTriggerObjektConfigList"
        },
        "setNotifyDataTriggerConfig": {
            "args": [
                "t",
                "e",
                "i",
                "r",
                "g"
            ],
            "serviceMethod": "setNotifyDataTriggerConfig"
        },
        "setNotifyOuTriggerConfig": {
            "args": [
                "t",
                "e",
                "i",
                "r",
                "g",
                "o"
            ],
            "serviceMethod": "setNotifyOuTriggerConfig"
        },
        "removeNotifyDataTriggerConfig": {
            "args": [
                "t",
                "e"
            ],
            "serviceMethod": "removeNotifyDataTriggerConfig"
        },
        "removeNotifyOuTriggerConfig": {
            "args": [
                "t",
                "e",
                "i"
            ],
            "serviceMethod": "removeNotifyOuTriggerConfig"
        }
    }
};
