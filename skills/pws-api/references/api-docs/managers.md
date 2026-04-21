# Managers

This handbook groups the manager classes that perform most application work against Netwrix Password Secure.

- Manager names should follow the JavaScript runtime surface, not renamed C# variants.
- Browser and Node runtimes expose these managers from the root `PsrApi` instance.
- Included official SDK pages: `280` across `29` grouped sections.

## Contents

- [PsrApi.Managers](#group-psrapi-managers)
- [ActiveDirectoryManager](#group-psrapi-managers-activedirectorymanager)
- [ApplicationManager](#group-psrapi-managers-applicationmanager)
- [BaseManager](#group-psrapi-managers-basemanager)
- [ContainerManager](#group-psrapi-managers-containermanager)
- [DataBindingManager](#group-psrapi-managers-databindingmanager)
- [DataImageManager](#group-psrapi-managers-dataimagemanager)
- [EncryptionManager](#group-psrapi-managers-encryptionmanager)
- [ExternalLinkManager](#group-psrapi-managers-externallinkmanager)
- [ForwardingRuleManager](#group-psrapi-managers-forwardingrulemanager)
- [GenericRightManager](#group-psrapi-managers-genericrightmanager)
- [LicenseManager](#group-psrapi-managers-licensemanager)
- [LogbookManager](#group-psrapi-managers-logbookmanager)
- [MailingManager](#group-psrapi-managers-mailingmanager)
- [OneTimePasswordManager](#group-psrapi-managers-onetimepasswordmanager)
- [OptionManager](#group-psrapi-managers-optionmanager)
- [OrganisationUnitManager](#group-psrapi-managers-organisationunitmanager)
- [PasswordGeneratorSeparator](#group-psrapi-managers-passwordgeneratorseparator)
- [PasswordManager](#group-psrapi-managers-passwordmanager)
- [PendingRightManager](#group-psrapi-managers-pendingrightmanager)
- [PolicyManager](#group-psrapi-managers-policymanager)
- [PolicyPasswordValidationResult](#group-psrapi-managers-policypasswordvalidationresult)
- [RightManager](#group-psrapi-managers-rightmanager)
- [RoleManager](#group-psrapi-managers-rolemanager)
- [SealManager](#group-psrapi-managers-sealmanager)
- [SynchronizationManager](#group-psrapi-managers-synchronizationmanager)
- [TagManager](#group-psrapi-managers-tagmanager)
- [TemplateManager](#group-psrapi-managers-templatemanager)
- [TriggerManager](#group-psrapi-managers-triggermanager)

<a id="group-psrapi-managers"></a>
## PsrApi.Managers

### PsrApi.Managers Namespace

#### Classes

| Class | Description |
| --- | --- |
| [ActiveDirectoryManager](#group-psrapi-managers-activedirectorymanager) | Contains methods regarding Active Directory profiles and imports. |
| [ApiKeyManager](authentication-and-sessions.md#group-psrapi-managers-apikeymanager) |  |
| [ApplicationManager](#group-psrapi-managers-applicationmanager) | Contains methods to manipulate applications. |
| [AuthenticationManagerV2](authentication-and-sessions.md#group-psrapi-managers-authenticationmanagerv2) |  |
| [BaseManager](#group-psrapi-managers-basemanager) | Base class for all managers |
| [ContainerManager](#group-psrapi-managers-containermanager) | Contains methods to manipulate containers. Containers are passwords, forms and documents |
| [DataBindingManager](#group-psrapi-managers-databindingmanager) | Contains methods to manipulate data bindings. Data bindings describe relationsships between objects of type [PsrData](data-models.md#group-psrapi-data-psrdata) |
| [DataImageManager](#group-psrapi-managers-dataimagemanager) | Contains methods to manipulate and load DataImages, which for example contain /> |
| [EncryptionManager](#group-psrapi-managers-encryptionmanager) | Contains methods for cryptographic operations like encryption, decryption, signatures etc. |
| [ExternalLinkManager](#group-psrapi-managers-externallinkmanager) | Manager for creating external links |
| [ForwardingRuleManager](#group-psrapi-managers-forwardingrulemanager) | Contains methods regarding forwarding rules. |
| [GenericRightManager](#group-psrapi-managers-genericrightmanager) | Contains a method to manipulate the data rights for any [PsrData](data-models.md#group-psrapi-data-psrdata) objects. |
| [LicenseManager](#group-psrapi-managers-licensemanager) | Contains methods regarding licensing |
| [LogbookManager](#group-psrapi-managers-logbookmanager) | Contains methods regarding logbooks. Logbooks are single logbook entries. |
| [MailingManager](#group-psrapi-managers-mailingmanager) | E-mails. |
| [OneTimePasswordManager](#group-psrapi-managers-onetimepasswordmanager) | Contains methods to generate one-time passwords |
| [OptionManager](#group-psrapi-managers-optionmanager) | Contains methods to manipulate options. Options are rights or settings that are typically applied to<br>objects of type [PsrOrganisationUnit](data-models.md#group-psrapi-data-psrorganisationunit), [PsrRole](data-models.md#group-psrapi-data-psrrole) or [PsrContainer](data-models.md#group-psrapi-data-psrcontainer) |
| [OrganisationUnitManager](#group-psrapi-managers-organisationunitmanager) | Contains methods to manipulate organisation units. |
| [PasswordManager](#group-psrapi-managers-passwordmanager) | Contains methods regarding passwords. |
| [PendingRightManager](#group-psrapi-managers-pendingrightmanager) | Contains methods to manipulate pending data rights. |
| [PolicyManager](#group-psrapi-managers-policymanager) | Contains methods to manipulate policies. Policies are validation rules to validate passwords against. |
| [PolicyPasswordValidationResult](#group-psrapi-managers-policypasswordvalidationresult) | Result of a password validation. |
| [RealtimeEventManager](realtime-and-sync.md#group-psrapi-managers-realtimeeventmanager) | Contains realtime events. |
| [RightManager](#group-psrapi-managers-rightmanager) | Contains methods to manipulate data rights. |
| [RoleManager](#group-psrapi-managers-rolemanager) | Contains methods to manipulate roles. |
| [SealManager](#group-psrapi-managers-sealmanager) | Contains methods to manipulate seals. |
| [SynchronizationManager](#group-psrapi-managers-synchronizationmanager) | Manager for synchronization with the app |
| [TagManager](#group-psrapi-managers-tagmanager) | Contains methods to manipulate tags. Tags can be applied to almost every object of type [PsrData](data-models.md#group-psrapi-data-psrdata) |
| [TemplateManager](#group-psrapi-managers-templatemanager) | Contains methods to manipulate templates. |
| [TriggerManager](#group-psrapi-managers-triggermanager) | Contains methods to manipulate triggers. |

#### Enumerations

| Enumeration | Description |
| --- | --- |
| [PasswordGeneratorSeparator](#group-psrapi-managers-passwordgeneratorseparator) | Possible separators for the phonetic password generator. |


<a id="group-psrapi-managers-activedirectorymanager"></a>
## ActiveDirectoryManager

### ActiveDirectoryManager Class

Contains methods regarding Active Directory profiles and imports.

#### Inheritance Hierarchy

SystemObject
[PsrApi.ManagersBaseManager](#group-psrapi-managers-basemanager)
PsrApi.ManagersActiveDirectoryManager

#### Syntax

C#

```csharp
public class ActiveDirectoryManager : BaseManager
```

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GetActiveDirectoryProfileList](#group-psrapi-managers-activedirectorymanager) | Returns a list of Active Directory profiles matching the given filter. |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ActiveDirectoryManager Methods

The [ActiveDirectoryManager](#group-psrapi-managers-activedirectorymanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GetActiveDirectoryProfileList](#group-psrapi-managers-activedirectorymanager) | Returns a list of Active Directory profiles matching the given filter. |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[ActiveDirectoryManager Class](#group-psrapi-managers-activedirectorymanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ActiveDirectoryManager.GetActiveDirectoryProfileList Method

Returns a list of Active Directory profiles matching the given filter.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrActiveDirectoryProfile>> GetActiveDirectoryProfileList(
	PsrListFilter filter
)
```

###### Parameters

filterType: [PsrApi.DataPsrListFilter](data-models.md#group-psrapi-data-psrlistfilter)

###### Return Value

Type: TaskIEnumerable[PsrActiveDirectoryProfile](data-models.md#group-psrapi-data-psractivedirectoryprofile)

#### See Also

###### Reference

[ActiveDirectoryManager Class](#group-psrapi-managers-activedirectorymanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)


<a id="group-psrapi-managers-applicationmanager"></a>
## ApplicationManager

### ApplicationManager Class

Contains methods to manipulate applications.

#### Inheritance Hierarchy

SystemObject
[PsrApi.ManagersBaseManager](#group-psrapi-managers-basemanager)
PsrApi.ManagersApplicationManager

#### Syntax

C#

```csharp
public class ApplicationManager : BaseManager
```

#### Methods

| Name | Description |
| --- | --- |
| [AddApplication](#group-psrapi-managers-applicationmanager) | Adds a new application. |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GetApplication](#group-psrapi-managers-applicationmanager) | Returns the application matching the given ID. |
| [GetApplicationList](#group-psrapi-managers-applicationmanager) | Returns a list of applications that match the filter. |
| [GetApplicationListFilter](#group-psrapi-managers-applicationmanager) | Return a filter object to filter applications. |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |
| [UpdateApplication](#group-psrapi-managers-applicationmanager) | Updates an existing application. |

#### See Also

###### Reference

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ApplicationManager Methods

The [ApplicationManager](#group-psrapi-managers-applicationmanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| [AddApplication](#group-psrapi-managers-applicationmanager) | Adds a new application. |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GetApplication](#group-psrapi-managers-applicationmanager) | Returns the application matching the given ID. |
| [GetApplicationList](#group-psrapi-managers-applicationmanager) | Returns a list of applications that match the filter. |
| [GetApplicationListFilter](#group-psrapi-managers-applicationmanager) | Return a filter object to filter applications. |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |
| [UpdateApplication](#group-psrapi-managers-applicationmanager) | Updates an existing application. |

#### See Also

###### Reference

[ApplicationManager Class](#group-psrapi-managers-applicationmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ApplicationManager.AddApplication Method

Adds a new application.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrApplication> AddApplication(
	PsrApplication application
)
```

###### Parameters

applicationType: [PsrApi.DataPsrApplication](data-models.md#group-psrapi-data-psrapplication)
The application that should be added.

###### Return Value

Type: Task[PsrApplication](data-models.md#group-psrapi-data-psrapplication)

#### See Also

###### Reference

[ApplicationManager Class](#group-psrapi-managers-applicationmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ApplicationManager.GetApplication Method

Returns the application matching the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrApplication> GetApplication(
	Guid id
)
```

###### Parameters

idType: SystemGuid
ID of the desired application.

###### Return Value

Type: Task[PsrApplication](data-models.md#group-psrapi-data-psrapplication)

#### See Also

###### Reference

[ApplicationManager Class](#group-psrapi-managers-applicationmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ApplicationManager.GetApplicationList Method

Returns a list of applications that match the filter.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrApplication>> GetApplicationList(
	PsrListFilter filter
)
```

###### Parameters

filterType: [PsrApi.DataPsrListFilter](data-models.md#group-psrapi-data-psrlistfilter)

###### Return Value

Type: TaskIEnumerable[PsrApplication](data-models.md#group-psrapi-data-psrapplication)

#### See Also

###### Reference

[ApplicationManager Class](#group-psrapi-managers-applicationmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ApplicationManager.GetApplicationListFilter Method

Return a filter object to filter applications.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrListFilter> GetApplicationListFilter(
	bool defaultFilter
)
```

###### Parameters

defaultFilterType: SystemBoolean
If the default filter for applications should returned.

###### Return Value

Type: Task[PsrListFilter](data-models.md#group-psrapi-data-psrlistfilter)

#### See Also

###### Reference

[ApplicationManager Class](#group-psrapi-managers-applicationmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ApplicationManager.UpdateApplication Method

Updates an existing application.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrApplication> UpdateApplication(
	PsrApplication application
)
```

###### Parameters

applicationType: [PsrApi.DataPsrApplication](data-models.md#group-psrapi-data-psrapplication)
The application that should be updated.

###### Return Value

Type: Task[PsrApplication](data-models.md#group-psrapi-data-psrapplication)

#### See Also

###### Reference

[ApplicationManager Class](#group-psrapi-managers-applicationmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)


<a id="group-psrapi-managers-basemanager"></a>
## BaseManager

### BaseManager Class

Base class for all managers

#### Inheritance Hierarchy

SystemObject
PsrApi.ManagersBaseManager
[More...](#group-psrapi-managers-basemanager)

#### Syntax

C#

```csharp
public abstract class BaseManager
```

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Managers Namespace](#group-psrapi-managers)

#### Inheritance Hierarchy

SystemObject
PsrApi.ManagersBaseManager
[PsrApi.ManagersActiveDirectoryManager](#group-psrapi-managers-activedirectorymanager)
[PsrApi.ManagersApiKeyManager](authentication-and-sessions.md#group-psrapi-managers-apikeymanager)
[PsrApi.ManagersApplicationManager](#group-psrapi-managers-applicationmanager)
[PsrApi.ManagersAuthenticationManagerV2](authentication-and-sessions.md#group-psrapi-managers-authenticationmanagerv2)
[PsrApi.ManagersContainerManager](#group-psrapi-managers-containermanager)
[PsrApi.ManagersDataBindingManager](#group-psrapi-managers-databindingmanager)
[PsrApi.ManagersDataImageManager](#group-psrapi-managers-dataimagemanager)
[PsrApi.ManagersEncryptionManager](#group-psrapi-managers-encryptionmanager)
[PsrApi.ManagersExternalLinkManager](#group-psrapi-managers-externallinkmanager)
[PsrApi.ManagersForwardingRuleManager](#group-psrapi-managers-forwardingrulemanager)
[PsrApi.ManagersGenericRightManager](#group-psrapi-managers-genericrightmanager)
[PsrApi.ManagersLicenseManager](#group-psrapi-managers-licensemanager)
[PsrApi.ManagersLogbookManager](#group-psrapi-managers-logbookmanager)
[PsrApi.ManagersMailingManager](#group-psrapi-managers-mailingmanager)
[PsrApi.ManagersOptionManager](#group-psrapi-managers-optionmanager)
[PsrApi.ManagersOrganisationUnitManager](#group-psrapi-managers-organisationunitmanager)
[PsrApi.ManagersPendingRightManager](#group-psrapi-managers-pendingrightmanager)
[PsrApi.ManagersPolicyManager](#group-psrapi-managers-policymanager)
[PsrApi.ManagersRealtimeEventManager](realtime-and-sync.md#group-psrapi-managers-realtimeeventmanager)
[PsrApi.ManagersRightManager](#group-psrapi-managers-rightmanager)
[PsrApi.ManagersRoleManager](#group-psrapi-managers-rolemanager)
[PsrApi.ManagersSealManager](#group-psrapi-managers-sealmanager)
[PsrApi.ManagersSynchronizationManager](#group-psrapi-managers-synchronizationmanager)
[PsrApi.ManagersTagManager](#group-psrapi-managers-tagmanager)
[PsrApi.ManagersTemplateManager](#group-psrapi-managers-templatemanager)
[PsrApi.ManagersTriggerManager](#group-psrapi-managers-triggermanager)

### BaseManager Methods

The [BaseManager](#group-psrapi-managers-basemanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[BaseManager Class](#group-psrapi-managers-basemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)


<a id="group-psrapi-managers-containermanager"></a>
## ContainerManager

### ContainerManager Class

Contains methods to manipulate containers. Containers are passwords, forms and documents

#### Inheritance Hierarchy

SystemObject
[PsrApi.ManagersBaseManager](#group-psrapi-managers-basemanager)
PsrApi.ManagersContainerManager

#### Syntax

C#

```csharp
public class ContainerManager : BaseManager
```

#### Methods

| Name | Description |
| --- | --- |
| [AddContainer](#group-psrapi-managers-containermanager) | Adds the given container and all of its container items.<br>All container items of type [ContainerItemPassword](enums-and-constants.md#group-psrapi-data-enums-psrcontaineritemtype) and [ContainerItemPasswordMemo](enums-and-constants.md#group-psrapi-data-enums-psrcontaineritemtype)<br>are encrypted in the process.<br>If neither a template group ID nor right templates are provided, the rights of the organisation unit are applied to the password. |
| [CloneContainer](#group-psrapi-managers-containermanager) | Clones the container object with the given ID.<br>The cloned container is NOT persisted in the database. |
| [CreateContainerFromBaseContainer](#group-psrapi-managers-containermanager) | Creates a new container from a base container.<br>Use this method if you want to create a new password from a form for example. |
| [DecryptContainerItem](#group-psrapi-managers-containermanager) | Returns the decrypted value of a container item with type [ContainerItemPassword](enums-and-constants.md#group-psrapi-data-enums-psrcontaineritemtype)<br>or [ContainerItemPasswordMemo](enums-and-constants.md#group-psrapi-data-enums-psrcontaineritemtype).<br>A logbook entry containing the reason why you obtained the value is created. |
| [DeleteContainer](#group-psrapi-managers-containermanager) | Deletes a container and all of its container items if possible. |
| [EncryptContainerItem](#group-psrapi-managers-containermanager) | Encrypts the plaintext, stores the encrypted value and the public key<br>in the container item and returns the data key that can be used to decrypt the value if a new data key was created. |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GetContainer](#group-psrapi-managers-containermanager) | Returns the container (including container items) that matches the given ID. |
| [GetContainerCount](#group-psrapi-managers-containermanager) | Returns the number of containers that match the given filter. |
| [GetContainerHistoryList](#group-psrapi-managers-containermanager) | Returns a history of the matching container. |
| [GetContainerInvolvedOrganisationUnit](#group-psrapi-managers-containermanager) | Returns a list of IDs of involved organisation units. |
| [GetContainerItem](#group-psrapi-managers-containermanager) | Returns a single container item matching the ID. |
| [GetContainerItemWithSecretValue](#group-psrapi-managers-containermanager) | Returns the container item with its encrypted value.<br>Can be used with container items of type [ContainerItemPassword](enums-and-constants.md#group-psrapi-data-enums-psrcontaineritemtype) or [ContainerItemPasswordMemo](enums-and-constants.md#group-psrapi-data-enums-psrcontaineritemtype).<br>A logbook entry containing the reason why you obtained the value is created. |
| [GetContainerList](#group-psrapi-managers-containermanager) | Returns a list of containers that match the given filter. |
| [GetContainerListFilter](#group-psrapi-managers-containermanager) | Returns the container list filter that was at last saved for the user or the default filter for<br>the [PsrContainerType](enums-and-constants.md#group-psrapi-data-enums-psrcontainertype) if defaultFilter is set to true. |
| [GetCredentialCheck](#group-psrapi-managers-containermanager) | Returns credential check information for the container with the given ID. |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [InitContainer](#group-psrapi-managers-containermanager) | Initializes a new container of the given type. |
| [InitContainerItem](#group-psrapi-managers-containermanager) | Initializes a new [PsrContainerItem](data-models.md#group-psrapi-data-psrcontaineritem).<br>Use this method if you want to add new container items to an existing container. |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |
| [UpdateContainer](#group-psrapi-managers-containermanager) | Updates the given container and all of its container items if possible. |

#### See Also

###### Reference

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ContainerManager Methods

The [ContainerManager](#group-psrapi-managers-containermanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| [AddContainer](#group-psrapi-managers-containermanager) | Adds the given container and all of its container items.<br>All container items of type [ContainerItemPassword](enums-and-constants.md#group-psrapi-data-enums-psrcontaineritemtype) and [ContainerItemPasswordMemo](enums-and-constants.md#group-psrapi-data-enums-psrcontaineritemtype)<br>are encrypted in the process.<br>If neither a template group ID nor right templates are provided, the rights of the organisation unit are applied to the password. |
| [CloneContainer](#group-psrapi-managers-containermanager) | Clones the container object with the given ID.<br>The cloned container is NOT persisted in the database. |
| [CreateContainerFromBaseContainer](#group-psrapi-managers-containermanager) | Creates a new container from a base container.<br>Use this method if you want to create a new password from a form for example. |
| [DecryptContainerItem](#group-psrapi-managers-containermanager) | Returns the decrypted value of a container item with type [ContainerItemPassword](enums-and-constants.md#group-psrapi-data-enums-psrcontaineritemtype)<br>or [ContainerItemPasswordMemo](enums-and-constants.md#group-psrapi-data-enums-psrcontaineritemtype).<br>A logbook entry containing the reason why you obtained the value is created. |
| [DeleteContainer](#group-psrapi-managers-containermanager) | Deletes a container and all of its container items if possible. |
| [EncryptContainerItem](#group-psrapi-managers-containermanager) | Encrypts the plaintext, stores the encrypted value and the public key<br>in the container item and returns the data key that can be used to decrypt the value if a new data key was created. |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GetContainer](#group-psrapi-managers-containermanager) | Returns the container (including container items) that matches the given ID. |
| [GetContainerCount](#group-psrapi-managers-containermanager) | Returns the number of containers that match the given filter. |
| [GetContainerHistoryList](#group-psrapi-managers-containermanager) | Returns a history of the matching container. |
| [GetContainerInvolvedOrganisationUnit](#group-psrapi-managers-containermanager) | Returns a list of IDs of involved organisation units. |
| [GetContainerItem](#group-psrapi-managers-containermanager) | Returns a single container item matching the ID. |
| [GetContainerItemWithSecretValue](#group-psrapi-managers-containermanager) | Returns the container item with its encrypted value.<br>Can be used with container items of type [ContainerItemPassword](enums-and-constants.md#group-psrapi-data-enums-psrcontaineritemtype) or [ContainerItemPasswordMemo](enums-and-constants.md#group-psrapi-data-enums-psrcontaineritemtype).<br>A logbook entry containing the reason why you obtained the value is created. |
| [GetContainerList](#group-psrapi-managers-containermanager) | Returns a list of containers that match the given filter. |
| [GetContainerListFilter](#group-psrapi-managers-containermanager) | Returns the container list filter that was at last saved for the user or the default filter for<br>the [PsrContainerType](enums-and-constants.md#group-psrapi-data-enums-psrcontainertype) if defaultFilter is set to true. |
| [GetCredentialCheck](#group-psrapi-managers-containermanager) | Returns credential check information for the container with the given ID. |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [InitContainer](#group-psrapi-managers-containermanager) | Initializes a new container of the given type. |
| [InitContainerItem](#group-psrapi-managers-containermanager) | Initializes a new [PsrContainerItem](data-models.md#group-psrapi-data-psrcontaineritem).<br>Use this method if you want to add new container items to an existing container. |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |
| [UpdateContainer](#group-psrapi-managers-containermanager) | Updates the given container and all of its container items if possible. |

#### See Also

###### Reference

[ContainerManager Class](#group-psrapi-managers-containermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ContainerManager.AddContainer Method

Adds the given container and all of its container items.
All container items of type [ContainerItemPassword](enums-and-constants.md#group-psrapi-data-enums-psrcontaineritemtype) and [ContainerItemPasswordMemo](enums-and-constants.md#group-psrapi-data-enums-psrcontaineritemtype)
are encrypted in the process.
If neither a template group ID nor right templates are provided, the rights of the organisation unit are applied to the password.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrContainer> AddContainer(
	PsrContainer container,
	Nullable<Guid> parentOrganisationUnitId,
	List<PsrDataRightTemplate> rightTemplates = null,
	Nullable<Guid> templateGroupId = null
)
```

###### Parameters

containerType: [PsrApi.DataPsrContainer](data-models.md#group-psrapi-data-psrcontainer)
parentOrganisationUnitIdType: SystemNullableGuid
ID of the organisation unit the new container should belong torightTemplates (Optional)Type: System.Collections.GenericList[PsrDataRightTemplate](data-models.md#group-psrapi-data-psrdatarighttemplate)
templateGroupId (Optional)Type: SystemNullableGuid
ID of a [PsrTemplateGroup](data-models.md#group-psrapi-data-psrtemplategroup)

###### Return Value

Type: Task[PsrContainer](data-models.md#group-psrapi-data-psrcontainer)

#### See Also

###### Reference

[ContainerManager Class](#group-psrapi-managers-containermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ContainerManager.CloneContainer Method

Clones the container object with the given ID.
The cloned container is NOT persisted in the database.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrContainer> CloneContainer(
	Guid baseContainerId
)
```

###### Parameters

baseContainerIdType: SystemGuid
ID of the container that should be cloned.

###### Return Value

Type: Task[PsrContainer](data-models.md#group-psrapi-data-psrcontainer)

#### See Also

###### Reference

[ContainerManager Class](#group-psrapi-managers-containermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ContainerManager.CreateContainerFromBaseContainer Method

Creates a new container from a base container.
Use this method if you want to create a new password from a form for example.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public PsrContainer CreateContainerFromBaseContainer(
	PsrContainer baseContainer,
	PsrContainerType newContainerType
)
```

###### Parameters

baseContainerType: [PsrApi.DataPsrContainer](data-models.md#group-psrapi-data-psrcontainer)
newContainerTypeType: [PsrApi.Data.EnumsPsrContainerType](enums-and-constants.md#group-psrapi-data-enums-psrcontainertype)
The type of the newly created container

###### Return Value

Type: [PsrContainer](data-models.md#group-psrapi-data-psrcontainer)

#### See Also

###### Reference

[ContainerManager Class](#group-psrapi-managers-containermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ContainerManager.DecryptContainerItem Method

Returns the decrypted value of a container item with type [ContainerItemPassword](enums-and-constants.md#group-psrapi-data-enums-psrcontaineritemtype)
or [ContainerItemPasswordMemo](enums-and-constants.md#group-psrapi-data-enums-psrcontaineritemtype).
A logbook entry containing the reason why you obtained the value is created.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<string> DecryptContainerItem(
	PsrContainerItem item,
	string reason = ""
)
```

###### Parameters

itemType: [PsrApi.DataPsrContainerItem](data-models.md#group-psrapi-data-psrcontaineritem)
reason (Optional)Type: SystemString

###### Return Value

Type: TaskString

#### See Also

###### Reference

[ContainerManager Class](#group-psrapi-managers-containermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ContainerManager.DeleteContainer Method

Deletes a container and all of its container items if possible.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task DeleteContainer(
	PsrContainer container
)
```

###### Parameters

containerType: [PsrApi.DataPsrContainer](data-models.md#group-psrapi-data-psrcontainer)

###### Return Value

Type: Task

#### See Also

###### Reference

[ContainerManager Class](#group-psrapi-managers-containermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ContainerManager.EncryptContainerItem Method

Encrypts the plaintext, stores the encrypted value and the public key
in the container item and returns the data key that can be used to decrypt the value if a new data key was created.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public byte[] EncryptContainerItem(
	PsrContainerItem item,
	string plaintext
)
```

###### Parameters

itemType: [PsrApi.DataPsrContainerItem](data-models.md#group-psrapi-data-psrcontaineritem)
plaintextType: SystemString

###### Return Value

Type: Byte

#### See Also

###### Reference

[ContainerManager Class](#group-psrapi-managers-containermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ContainerManager.GetContainer Method

Returns the container (including container items) that matches the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrContainer> GetContainer(
	Guid containerId
)
```

###### Parameters

containerIdType: SystemGuid

###### Return Value

Type: Task[PsrContainer](data-models.md#group-psrapi-data-psrcontainer)

#### See Also

###### Reference

[ContainerManager Class](#group-psrapi-managers-containermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ContainerManager.GetContainerCount Method

Returns the number of containers that match the given filter.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<int> GetContainerCount(
	PsrContainerType containerType,
	PsrContainerListFilter containerListFilter
)
```

###### Parameters

containerTypeType: [PsrApi.Data.EnumsPsrContainerType](enums-and-constants.md#group-psrapi-data-enums-psrcontainertype)
containerListFilterType: [PsrApi.DataPsrContainerListFilter](data-models.md#group-psrapi-data-psrcontainerlistfilter)

###### Return Value

Type: TaskInt32

#### See Also

###### Reference

[ContainerManager Class](#group-psrapi-managers-containermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ContainerManager.GetContainerHistoryList Method

Returns a history of the matching container.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrContainerHistory>> GetContainerHistoryList(
	PsrContainerType containerType,
	Guid id
)
```

###### Parameters

containerTypeType: [PsrApi.Data.EnumsPsrContainerType](enums-and-constants.md#group-psrapi-data-enums-psrcontainertype)
Container type of the desired container.idType: SystemGuid
ID of the desired container.

###### Return Value

Type: TaskIEnumerable[PsrContainerHistory](data-models.md#group-psrapi-data-psrcontainerhistory)

#### See Also

###### Reference

[ContainerManager Class](#group-psrapi-managers-containermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ContainerManager.GetContainerInvolvedOrganisationUnit Method

Returns a list of IDs of involved organisation units.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IList<Guid>> GetContainerInvolvedOrganisationUnit(
	Guid dataId
)
```

###### Parameters

dataIdType: SystemGuid
ID of the container.

###### Return Value

Type: TaskIListGuid

#### See Also

###### Reference

[ContainerManager Class](#group-psrapi-managers-containermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ContainerManager.GetContainerItem Method

Returns a single container item matching the ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrContainerItem> GetContainerItem(
	Guid itemId
)
```

###### Parameters

itemIdType: SystemGuid

###### Return Value

Type: Task[PsrContainerItem](data-models.md#group-psrapi-data-psrcontaineritem)

#### See Also

###### Reference

[ContainerManager Class](#group-psrapi-managers-containermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ContainerManager.GetContainerItemWithSecretValue Method

Returns the container item with its encrypted value.
Can be used with container items of type [ContainerItemPassword](enums-and-constants.md#group-psrapi-data-enums-psrcontaineritemtype) or [ContainerItemPasswordMemo](enums-and-constants.md#group-psrapi-data-enums-psrcontaineritemtype).
A logbook entry containing the reason why you obtained the value is created.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrContainerItem> GetContainerItemWithSecretValue(
	Guid itemId,
	string reason = ""
)
```

###### Parameters

itemIdType: SystemGuid
reason (Optional)Type: SystemString

###### Return Value

Type: Task[PsrContainerItem](data-models.md#group-psrapi-data-psrcontaineritem)

#### See Also

###### Reference

[ContainerManager Class](#group-psrapi-managers-containermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ContainerManager.GetContainerList Method

Returns a list of containers that match the given filter.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrContainer>> GetContainerList(
	PsrContainerType containerType,
	PsrContainerListFilter containerListFilter,
	PsrBehaviours behaviours = null
)
```

###### Parameters

containerTypeType: [PsrApi.Data.EnumsPsrContainerType](enums-and-constants.md#group-psrapi-data-enums-psrcontainertype)
containerListFilterType: [PsrApi.DataPsrContainerListFilter](data-models.md#group-psrapi-data-psrcontainerlistfilter)
behaviours (Optional)Type: [PsrApi.Data.BehavioursPsrBehaviours](data-models.md#group-psrapi-data-behaviours-psrbehaviours)

###### Return Value

Type: TaskIEnumerable[PsrContainer](data-models.md#group-psrapi-data-psrcontainer)

#### See Also

###### Reference

[ContainerManager Class](#group-psrapi-managers-containermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ContainerManager.GetContainerListFilter Method

Returns the container list filter that was at last saved for the user or the default filter for
the [PsrContainerType](enums-and-constants.md#group-psrapi-data-enums-psrcontainertype) if defaultFilter is set to true.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrContainerListFilter> GetContainerListFilter(
	PsrContainerType type,
	bool defaultFilter
)
```

###### Parameters

typeType: [PsrApi.Data.EnumsPsrContainerType](enums-and-constants.md#group-psrapi-data-enums-psrcontainertype)
defaultFilterType: SystemBoolean

###### Return Value

Type: Task[PsrContainerListFilter](data-models.md#group-psrapi-data-psrcontainerlistfilter)

#### See Also

###### Reference

[ContainerManager Class](#group-psrapi-managers-containermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ContainerManager.GetCredentialCheck Method

Returns credential check information for the container with the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrCredentialCheck> GetCredentialCheck(
	Guid containerId
)
```

###### Parameters

containerIdType: SystemGuid
ID of the container whose credential check information should be retrieved.

###### Return Value

Type: Task[PsrCredentialCheck](data-models.md#group-psrapi-data-psrcredentialcheck)

#### See Also

###### Reference

[ContainerManager Class](#group-psrapi-managers-containermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ContainerManager.InitContainer Method

Initializes a new container of the given type.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrContainer> InitContainer(
	PsrContainerType containerType
)
```

###### Parameters

containerTypeType: [PsrApi.Data.EnumsPsrContainerType](enums-and-constants.md#group-psrapi-data-enums-psrcontainertype)
Type of the container.

###### Return Value

Type: Task[PsrContainer](data-models.md#group-psrapi-data-psrcontainer)

#### See Also

###### Reference

[ContainerManager Class](#group-psrapi-managers-containermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ContainerManager.InitContainerItem Method

Initializes a new [PsrContainerItem](data-models.md#group-psrapi-data-psrcontaineritem).
Use this method if you want to add new container items to an existing container.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrContainerItem> InitContainerItem(
	PsrContainerItemType containerItemType
)
```

###### Parameters

containerItemTypeType: [PsrApi.Data.EnumsPsrContainerItemType](enums-and-constants.md#group-psrapi-data-enums-psrcontaineritemtype)

###### Return Value

Type: Task[PsrContainerItem](data-models.md#group-psrapi-data-psrcontaineritem)

#### See Also

###### Reference

[ContainerManager Class](#group-psrapi-managers-containermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ContainerManager.UpdateContainer Method

Updates the given container and all of its container items if possible.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrContainer> UpdateContainer(
	PsrContainer container,
	PsrBehaviours behaviours = null
)
```

###### Parameters

containerType: [PsrApi.DataPsrContainer](data-models.md#group-psrapi-data-psrcontainer)
behaviours (Optional)Type: [PsrApi.Data.BehavioursPsrBehaviours](data-models.md#group-psrapi-data-behaviours-psrbehaviours)

###### Return Value

Type: Task[PsrContainer](data-models.md#group-psrapi-data-psrcontainer)

#### See Also

###### Reference

[ContainerManager Class](#group-psrapi-managers-containermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)


<a id="group-psrapi-managers-databindingmanager"></a>
## DataBindingManager

### DataBindingManager Class

Contains methods to manipulate data bindings. Data bindings describe relationsships between objects of type [PsrData](data-models.md#group-psrapi-data-psrdata)

#### Inheritance Hierarchy

SystemObject
[PsrApi.ManagersBaseManager](#group-psrapi-managers-basemanager)
PsrApi.ManagersDataBindingManager

#### Syntax

C#

```csharp
public class DataBindingManager : BaseManager
```

#### Methods

| Name | Description |
| --- | --- |
| [AddDataBinding](#group-psrapi-managers-databindingmanager) | Adds a new data binding. |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GetDataBindingsByData](#group-psrapi-managers-databindingmanager) | Returns all data bindings of the object with the given ID where the object is not the parent.<br>If you provide a parent object type, only data bindings where the parent is of the given object type are returned. |
| [GetDataBindingsByParent](#group-psrapi-managers-databindingmanager) | Returns all data bindings that match the given parent. |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [RemoveAllDataBinding](#group-psrapi-managers-databindingmanager) | Removes all data bindings from the object with the given ID. |
| [RemoveDataBinding](#group-psrapi-managers-databindingmanager) | Removes a data binding. |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Managers Namespace](#group-psrapi-managers)

### DataBindingManager Methods

The [DataBindingManager](#group-psrapi-managers-databindingmanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| [AddDataBinding](#group-psrapi-managers-databindingmanager) | Adds a new data binding. |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GetDataBindingsByData](#group-psrapi-managers-databindingmanager) | Returns all data bindings of the object with the given ID where the object is not the parent.<br>If you provide a parent object type, only data bindings where the parent is of the given object type are returned. |
| [GetDataBindingsByParent](#group-psrapi-managers-databindingmanager) | Returns all data bindings that match the given parent. |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [RemoveAllDataBinding](#group-psrapi-managers-databindingmanager) | Removes all data bindings from the object with the given ID. |
| [RemoveDataBinding](#group-psrapi-managers-databindingmanager) | Removes a data binding. |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[DataBindingManager Class](#group-psrapi-managers-databindingmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### DataBindingManager.AddDataBinding Method

Adds a new data binding.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task AddDataBinding(
	Guid dataId,
	PsrEntityObjectType dataType,
	Guid parentId,
	PsrEntityObjectType parentType
)
```

###### Parameters

dataIdType: SystemGuid
dataTypeType: [PsrApi.Data.EnumsPsrEntityObjectType](enums-and-constants.md#group-psrapi-data-enums-psrentityobjecttype)
parentIdType: SystemGuid
parentTypeType: [PsrApi.Data.EnumsPsrEntityObjectType](enums-and-constants.md#group-psrapi-data-enums-psrentityobjecttype)

###### Return Value

Type: Task

#### See Also

###### Reference

[DataBindingManager Class](#group-psrapi-managers-databindingmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### DataBindingManager.GetDataBindingsByData Method

Returns all data bindings of the object with the given ID where the object is not the parent.
If you provide a parent object type, only data bindings where the parent is of the given object type are returned.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrDataBinding>> GetDataBindingsByData(
	Guid dataId,
	Nullable<PsrEntityObjectType> parentType
)
```

###### Parameters

dataIdType: SystemGuid
parentTypeType: SystemNullable[PsrEntityObjectType](enums-and-constants.md#group-psrapi-data-enums-psrentityobjecttype)

###### Return Value

Type: TaskIEnumerable[PsrDataBinding](data-models.md#group-psrapi-data-psrdatabinding)

#### See Also

###### Reference

[DataBindingManager Class](#group-psrapi-managers-databindingmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### DataBindingManager.GetDataBindingsByParent Method

Returns all data bindings that match the given parent.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrDataBinding>> GetDataBindingsByParent(
	Guid parentId,
	Nullable<PsrEntityObjectType> dataType = null
)
```

###### Parameters

parentIdType: SystemGuid
ID of the parent.dataType (Optional)Type: SystemNullable[PsrEntityObjectType](enums-and-constants.md#group-psrapi-data-enums-psrentityobjecttype)
Optional data type of the object.

###### Return Value

Type: TaskIEnumerable[PsrDataBinding](data-models.md#group-psrapi-data-psrdatabinding)

#### See Also

###### Reference

[DataBindingManager Class](#group-psrapi-managers-databindingmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### DataBindingManager.RemoveAllDataBinding Method

Removes all data bindings from the object with the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task RemoveAllDataBinding(
	Guid dataId,
	Nullable<PsrEntityObjectType> parentType = null
)
```

###### Parameters

dataIdType: SystemGuid
parentType (Optional)Type: SystemNullable[PsrEntityObjectType](enums-and-constants.md#group-psrapi-data-enums-psrentityobjecttype)

###### Return Value

Type: Task

#### See Also

###### Reference

[DataBindingManager Class](#group-psrapi-managers-databindingmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### DataBindingManager.RemoveDataBinding Method

Removes a data binding.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task RemoveDataBinding(
	Guid id,
	Guid parentId
)
```

###### Parameters

idType: SystemGuid
ID of the object.parentIdType: SystemGuid
ID of the parent.

###### Return Value

Type: Task

#### See Also

###### Reference

[DataBindingManager Class](#group-psrapi-managers-databindingmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)


<a id="group-psrapi-managers-dataimagemanager"></a>
## DataImageManager

### DataImageManager Class

Contains methods to manipulate and load DataImages, which for example contain />

#### Inheritance Hierarchy

SystemObject
[PsrApi.ManagersBaseManager](#group-psrapi-managers-basemanager)
PsrApi.ManagersDataImageManager

#### Syntax

C#

```csharp
public class DataImageManager : BaseManager
```

#### Constructors

| Name | Description |
| --- | --- |
| [DataImageManager](#group-psrapi-managers-dataimagemanager) | Creates a new instance of DataImageManager and uses the instance of [PsrApi](browser-runtime.md#group-psrapi-psrapi) for all its operations. |

#### Methods

| Name | Description |
| --- | --- |
| [AddDataImage](#group-psrapi-managers-dataimagemanager) | Adds a new [PsrDataImage](data-models.md#group-psrapi-data-psrdataimage) to the database |
| [DeleteDataImage](#group-psrapi-managers-dataimagemanager) | Deletes the given [PsrDataImage](data-models.md#group-psrapi-data-psrdataimage) from the database |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GetChangedImageIdsSinceDate](#group-psrapi-managers-dataimagemanager) | Returns the ids of the images, which changed since date |
| [GetChangedImagesSinceDate](#group-psrapi-managers-dataimagemanager) | Returns images, which have changed since date |
| [GetDataImage](#group-psrapi-managers-dataimagemanager) | Returns a single DataImage by Id |
| [GetDataImageIcon](#group-psrapi-managers-dataimagemanager) | Returns the Icon for [PsrDataImage](data-models.md#group-psrapi-data-psrdataimage) |
| [GetDataImageList](#group-psrapi-managers-dataimagemanager) | Returns all DataImages |
| [GetDataImageListFilter](#group-psrapi-managers-dataimagemanager) | Returns a matching empty ListFilter for DataImages |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |
| [UpdateDataImage](#group-psrapi-managers-dataimagemanager) | Updates a new DataImage in the database |

#### See Also

###### Reference

[PsrApi.Managers Namespace](#group-psrapi-managers)

### DataImageManager Constructor

Creates a new instance of [DataImageManager](#group-psrapi-managers-dataimagemanager) and uses the instance of [PsrApi](browser-runtime.md#group-psrapi-psrapi) for all its operations.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public DataImageManager(
	PsrApi psrApi
)
```

###### Parameters

psrApiType: [PsrApiPsrApi](browser-runtime.md#group-psrapi-psrapi)

#### See Also

###### Reference

[DataImageManager Class](#group-psrapi-managers-dataimagemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### DataImageManager Methods

The [DataImageManager](#group-psrapi-managers-dataimagemanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| [AddDataImage](#group-psrapi-managers-dataimagemanager) | Adds a new [PsrDataImage](data-models.md#group-psrapi-data-psrdataimage) to the database |
| [DeleteDataImage](#group-psrapi-managers-dataimagemanager) | Deletes the given [PsrDataImage](data-models.md#group-psrapi-data-psrdataimage) from the database |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GetChangedImageIdsSinceDate](#group-psrapi-managers-dataimagemanager) | Returns the ids of the images, which changed since date |
| [GetChangedImagesSinceDate](#group-psrapi-managers-dataimagemanager) | Returns images, which have changed since date |
| [GetDataImage](#group-psrapi-managers-dataimagemanager) | Returns a single DataImage by Id |
| [GetDataImageIcon](#group-psrapi-managers-dataimagemanager) | Returns the Icon for [PsrDataImage](data-models.md#group-psrapi-data-psrdataimage) |
| [GetDataImageList](#group-psrapi-managers-dataimagemanager) | Returns all DataImages |
| [GetDataImageListFilter](#group-psrapi-managers-dataimagemanager) | Returns a matching empty ListFilter for DataImages |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |
| [UpdateDataImage](#group-psrapi-managers-dataimagemanager) | Updates a new DataImage in the database |

#### See Also

###### Reference

[DataImageManager Class](#group-psrapi-managers-dataimagemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### DataImageManager.AddDataImage Method

Adds a new [PsrDataImage](data-models.md#group-psrapi-data-psrdataimage) to the database

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrDataImage> AddDataImage(
	PsrDataImage dataImage
)
```

###### Parameters

dataImageType: [PsrApi.DataPsrDataImage](data-models.md#group-psrapi-data-psrdataimage)
[PsrDataImage](data-models.md#group-psrapi-data-psrdataimage), which should be added

###### Return Value

Type: Task[PsrDataImage](data-models.md#group-psrapi-data-psrdataimage)
New [PsrDataImage](data-models.md#group-psrapi-data-psrdataimage) mit correct Id

#### See Also

###### Reference

[DataImageManager Class](#group-psrapi-managers-dataimagemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### DataImageManager.DeleteDataImage Method

Deletes the given [PsrDataImage](data-models.md#group-psrapi-data-psrdataimage) from the database

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task DeleteDataImage(
	PsrDataImage dataImage
)
```

###### Parameters

dataImageType: [PsrApi.DataPsrDataImage](data-models.md#group-psrapi-data-psrdataimage)
[PsrDataImage](data-models.md#group-psrapi-data-psrdataimage), which should be deleted

###### Return Value

Type: Task

#### See Also

###### Reference

[DataImageManager Class](#group-psrapi-managers-dataimagemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### DataImageManager.GetChangedImageIdsSinceDate Method

Returns the ids of the images, which changed since date

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IList<Guid>> GetChangedImageIdsSinceDate(
	DateTime date
)
```

###### Parameters

dateType: SystemDateTime
date, since when image changes should be returned

###### Return Value

Type: TaskIListGuid
List of Ids of Images, which have changed since date

#### See Also

###### Reference

[DataImageManager Class](#group-psrapi-managers-dataimagemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### DataImageManager.GetChangedImagesSinceDate Method

Returns images, which have changed since date

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IList<PsrDataImage>> GetChangedImagesSinceDate(
	DateTime date
)
```

###### Parameters

dateType: SystemDateTime
Date, since when image changes should be returned

###### Return Value

Type: TaskIList[PsrDataImage](data-models.md#group-psrapi-data-psrdataimage)
Liste der Bilder, die sich seit dem in date angegebenen Datum geändert haben

###### Return Value

Type: TaskIList[PsrDataImage](data-models.md#group-psrapi-data-psrdataimage)
List of Images, which have changed since date

#### See Also

###### Reference

[DataImageManager Class](#group-psrapi-managers-dataimagemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### DataImageManager.GetDataImage Method

Returns a single DataImage by Id

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrDataImage> GetDataImage(
	Guid id
)
```

###### Parameters

idType: SystemGuid
Id of the requested DataImage

###### Return Value

Type: Task[PsrDataImage](data-models.md#group-psrapi-data-psrdataimage)
DataImage with the given Id. Null if it doesnt exist

#### See Also

###### Reference

[DataImageManager Class](#group-psrapi-managers-dataimagemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### DataImageManager.GetDataImageIcon Method

Returns the Icon for [PsrDataImage](data-models.md#group-psrapi-data-psrdataimage)

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<byte[]> GetDataImageIcon(
	Guid id
)
```

###### Parameters

idType: SystemGuid
Id of the [PsrDataImage](data-models.md#group-psrapi-data-psrdataimage), which icon is requested

###### Return Value

Type: TaskByte
Icon as stream

#### See Also

###### Reference

[DataImageManager Class](#group-psrapi-managers-dataimagemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### DataImageManager.GetDataImageList Method

Returns all DataImages

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IList<PsrDataImage>> GetDataImageList(
	PsrListFilter filter
)
```

###### Parameters

filterType: [PsrApi.DataPsrListFilter](data-models.md#group-psrapi-data-psrlistfilter)
Filter, which should be used for loading

###### Return Value

Type: TaskIList[PsrDataImage](data-models.md#group-psrapi-data-psrdataimage)
List of DataImages matching to the given filter

#### See Also

###### Reference

[DataImageManager Class](#group-psrapi-managers-dataimagemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### DataImageManager.GetDataImageListFilter Method

Returns a matching empty ListFilter for DataImages

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrListFilter> GetDataImageListFilter(
	bool defaultFilter
)
```

###### Parameters

defaultFilterType: SystemBoolean
Should the last used filter be returned

###### Return Value

Type: Task[PsrListFilter](data-models.md#group-psrapi-data-psrlistfilter)
Filterobjekt for DataImages

#### See Also

###### Reference

[DataImageManager Class](#group-psrapi-managers-dataimagemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### DataImageManager.UpdateDataImage Method

Updates a new DataImage in the database

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrDataImage> UpdateDataImage(
	PsrDataImage dataImage
)
```

###### Parameters

dataImageType: [PsrApi.DataPsrDataImage](data-models.md#group-psrapi-data-psrdataimage)
The [PsrDataImage](data-models.md#group-psrapi-data-psrdataimage) to update

###### Return Value

Type: Task[PsrDataImage](data-models.md#group-psrapi-data-psrdataimage)
[PsrDataImage](data-models.md#group-psrapi-data-psrdataimage), which was changed

#### See Also

###### Reference

[DataImageManager Class](#group-psrapi-managers-dataimagemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)


<a id="group-psrapi-managers-encryptionmanager"></a>
## EncryptionManager

### EncryptionManager Class

Contains methods for cryptographic operations like encryption, decryption, signatures etc.

#### Inheritance Hierarchy

SystemObject
[PsrApi.ManagersBaseManager](#group-psrapi-managers-basemanager)
PsrApi.ManagersEncryptionManager

#### Syntax

C#

```csharp
public class EncryptionManager : BaseManager
```

#### Constructors

| Name | Description |
| --- | --- |
| [EncryptionManager](#group-psrapi-managers-encryptionmanager) | Creates a new instance of EncryptionManager and uses the instance of [PsrApi](browser-runtime.md#group-psrapi-psrapi) for all its operations. |

#### Methods

| Name | Description |
| --- | --- |
| [AreDataKeysAsymmetric](#group-psrapi-managers-encryptionmanager) | Returns if data keys are asymmetric |
| [CalculateClientUserAuthenticationHash](#group-psrapi-managers-encryptionmanager) | Calculates the hash for the user to authenticate to the server. |
| [Decrypt](#group-psrapi-managers-encryptionmanager) | Decrypts the encryptedValue with a key |
| [DecryptFile](#group-psrapi-managers-encryptionmanager) | Decrypts a file |
| [EncryptContainerItem](#group-psrapi-managers-encryptionmanager) | Encrypts a MtoContainerItem over the a aes key or a rsa key depending on the EncryptionVersion and sets its encrypted value. Also sets the Public key in the data correctly.<br>If a new key was created, its key to decrypt the data will be returned. |
| [EncryptDocument](#group-psrapi-managers-encryptionmanager) | Encrypts a file and automatically creates a new key or reuses the existing key.<br>If a new key was created, its key to decrypt the data will be returned. |
| [EncryptFile](#group-psrapi-managers-encryptionmanager) | Encrypts a file |
| [EncryptWithKey](#group-psrapi-managers-encryptionmanager) | Encrypts the plainValue with a key |
| [EncryptWithPassword](#group-psrapi-managers-encryptionmanager) | Encrypts the plainValue with a password |
| [EncryptWithPublicKey](#group-psrapi-managers-encryptionmanager) | Encrypts the plainValue with a public key |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GenerateDataKey](#group-psrapi-managers-encryptionmanager) | Generates a new data key |
| [GenerateKeyPair](#group-psrapi-managers-encryptionmanager) | Generates a new asymmetric key pair |
| [GenerateSymmetricKey](#group-psrapi-managers-encryptionmanager) | Generates a new symmetric key |
| [GetEncryptionVersion](#group-psrapi-managers-encryptionmanager) | Returns the encryption version which is in use |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [SignData](#group-psrapi-managers-encryptionmanager) | Signs the data with the private key |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |
| [VerifyData](#group-psrapi-managers-encryptionmanager) | Checks if a data was signed with a signature |

#### See Also

###### Reference

[PsrApi.Managers Namespace](#group-psrapi-managers)

### EncryptionManager Constructor

Creates a new instance of [EncryptionManager](#group-psrapi-managers-encryptionmanager) and uses the instance of [PsrApi](browser-runtime.md#group-psrapi-psrapi) for all its operations.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public EncryptionManager(
	PsrApi psrApi
)
```

###### Parameters

psrApiType: [PsrApiPsrApi](browser-runtime.md#group-psrapi-psrapi)

#### See Also

###### Reference

[EncryptionManager Class](#group-psrapi-managers-encryptionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### EncryptionManager Methods

The [EncryptionManager](#group-psrapi-managers-encryptionmanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| [AreDataKeysAsymmetric](#group-psrapi-managers-encryptionmanager) | Returns if data keys are asymmetric |
| [CalculateClientUserAuthenticationHash](#group-psrapi-managers-encryptionmanager) | Calculates the hash for the user to authenticate to the server. |
| [Decrypt](#group-psrapi-managers-encryptionmanager) | Decrypts the encryptedValue with a key |
| [DecryptFile](#group-psrapi-managers-encryptionmanager) | Decrypts a file |
| [EncryptContainerItem](#group-psrapi-managers-encryptionmanager) | Encrypts a MtoContainerItem over the a aes key or a rsa key depending on the EncryptionVersion and sets its encrypted value. Also sets the Public key in the data correctly.<br>If a new key was created, its key to decrypt the data will be returned. |
| [EncryptDocument](#group-psrapi-managers-encryptionmanager) | Encrypts a file and automatically creates a new key or reuses the existing key.<br>If a new key was created, its key to decrypt the data will be returned. |
| [EncryptFile](#group-psrapi-managers-encryptionmanager) | Encrypts a file |
| [EncryptWithKey](#group-psrapi-managers-encryptionmanager) | Encrypts the plainValue with a key |
| [EncryptWithPassword](#group-psrapi-managers-encryptionmanager) | Encrypts the plainValue with a password |
| [EncryptWithPublicKey](#group-psrapi-managers-encryptionmanager) | Encrypts the plainValue with a public key |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GenerateDataKey](#group-psrapi-managers-encryptionmanager) | Generates a new data key |
| [GenerateKeyPair](#group-psrapi-managers-encryptionmanager) | Generates a new asymmetric key pair |
| [GenerateSymmetricKey](#group-psrapi-managers-encryptionmanager) | Generates a new symmetric key |
| [GetEncryptionVersion](#group-psrapi-managers-encryptionmanager) | Returns the encryption version which is in use |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [SignData](#group-psrapi-managers-encryptionmanager) | Signs the data with the private key |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |
| [VerifyData](#group-psrapi-managers-encryptionmanager) | Checks if a data was signed with a signature |

#### See Also

###### Reference

[EncryptionManager Class](#group-psrapi-managers-encryptionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### EncryptionManager.AreDataKeysAsymmetric Method

Returns if data keys are asymmetric

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public bool AreDataKeysAsymmetric()
```

###### Return Value

Type: Boolean

#### See Also

###### Reference

[EncryptionManager Class](#group-psrapi-managers-encryptionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### EncryptionManager.CalculateClientUserAuthenticationHash Method

Calculates the hash for the user to authenticate to the server.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public MtoHashResult CalculateClientUserAuthenticationHash(
	byte[] password,
	byte[] salt = null,
	Nullable<MtoHashAlgorithm> hashAlgorithm = null
)
```

###### Parameters

passwordType: SystemByte
The user passwordsalt (Optional)Type: SystemByte
The salt of the user. null if a new salt should be created.hashAlgorithm (Optional)Type: SystemNullableMtoHashAlgorithm
The hash algorithm which should be used (null = most current hash version)

###### Return Value

Type: MtoHashResult

#### See Also

###### Reference

[EncryptionManager Class](#group-psrapi-managers-encryptionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### EncryptionManager.Decrypt Method

Decrypts the encryptedValue with a key

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public byte[] Decrypt(
	byte[] key,
	byte[] encryptedValue
)
```

###### Parameters

keyType: SystemByte
The keyencryptedValueType: SystemByte

###### Return Value

Type: Byte

#### See Also

###### Reference

[EncryptionManager Class](#group-psrapi-managers-encryptionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### EncryptionManager.DecryptFile Method

Decrypts a file

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public void DecryptFile(
	byte[] key,
	string plainFilePath,
	string encryptedFilePath
)
```

###### Parameters

keyType: SystemByte
The key to decrypt the fileplainFilePathType: SystemString
The path to the file where the decrypted file gets createdencryptedFilePathType: SystemString
The encrypted source file

#### See Also

###### Reference

[EncryptionManager Class](#group-psrapi-managers-encryptionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### EncryptionManager.EncryptContainerItem Method

Encrypts a MtoContainerItem over the a aes key or a rsa key depending on the EncryptionVersion and sets its encrypted value. Also sets the Public key in the data correctly.
If a new key was created, its key to decrypt the data will be returned.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public byte[] EncryptContainerItem(
	PsrContainerItem item,
	byte[] plainValue,
	Func<byte[]> getCurrentSymmetricKey = null
)
```

###### Parameters

itemType: [PsrApi.DataPsrContainerItem](data-models.md#group-psrapi-data-psrcontaineritem)
The data to encryptplainValueType: SystemByte
The value to encryptgetCurrentSymmetricKey (Optional)Type: SystemFuncByte
Null if its a new data. If the data existed before - a function to get the current symmetric key (This will only be used if the datakeys of the encryption collection are symmetric

###### Return Value

Type: Byte
If a new key was created, it will be returned, else null

#### Exceptions

| Exception | Condition |
| --- | --- |
| ArgumentOutOfRangeException |  |

#### See Also

###### Reference

[EncryptionManager Class](#group-psrapi-managers-encryptionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### EncryptionManager.EncryptDocument Method

Encrypts a file and automatically creates a new key or reuses the existing key.
If a new key was created, its key to decrypt the data will be returned.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public byte[] EncryptDocument(
	PsrContainerItem container,
	string plainFilePath,
	string encryptedFilePath,
	Func<byte[]> getCurrentSymmetricKey = null
)
```

###### Parameters

containerType: [PsrApi.DataPsrContainerItem](data-models.md#group-psrapi-data-psrcontaineritem)
The container to encryptplainFilePathType: SystemString
The plain source fileencryptedFilePathType: SystemString
The path to the file where the encrypted file gets createdgetCurrentSymmetricKey (Optional)Type: SystemFuncByte
Null if its a new data. If the data existed before - a function to get the current symmetric key (This will only be used if the datakeys of the encryption collection are symmetric

###### Return Value

Type: Byte
If a new key was created, it will be returned, else null

#### See Also

###### Reference

[EncryptionManager Class](#group-psrapi-managers-encryptionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### EncryptionManager.EncryptFile Method

Encrypts a file

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public void EncryptFile(
	byte[] key,
	string plainFilePath,
	string encryptedFilePath
)
```

###### Parameters

keyType: SystemByte
The key to encrypt the fileplainFilePathType: SystemString
The plain source fileencryptedFilePathType: SystemString
The path to the file where the encrypted file gets created

#### See Also

###### Reference

[EncryptionManager Class](#group-psrapi-managers-encryptionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### EncryptionManager.EncryptWithKey Method

Encrypts the plainValue with a key

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public byte[] EncryptWithKey(
	byte[] key,
	byte[] plainValue
)
```

###### Parameters

keyType: SystemByte
The key (usually 256 bit)plainValueType: SystemByte
The plain value

###### Return Value

Type: Byte

#### See Also

###### Reference

[EncryptionManager Class](#group-psrapi-managers-encryptionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### EncryptionManager.EncryptWithPassword Method

Encrypts the plainValue with a password

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public byte[] EncryptWithPassword(
	byte[] password,
	byte[] plainValue
)
```

###### Parameters

passwordType: SystemByte
The passwordplainValueType: SystemByte
The value to encrypt

###### Return Value

Type: Byte

#### See Also

###### Reference

[EncryptionManager Class](#group-psrapi-managers-encryptionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### EncryptionManager.EncryptWithPublicKey Method

Encrypts the plainValue with a public key

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public byte[] EncryptWithPublicKey(
	byte[] publicKey,
	byte[] plainValue
)
```

###### Parameters

publicKeyType: SystemByte
The public keyplainValueType: SystemByte
The value to encrypt

###### Return Value

Type: Byte

#### See Also

###### Reference

[EncryptionManager Class](#group-psrapi-managers-encryptionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### EncryptionManager.GenerateDataKey Method

Generates a new data key

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public IMtoKey GenerateDataKey()
```

###### Return Value

Type: IMtoKey

#### See Also

###### Reference

[EncryptionManager Class](#group-psrapi-managers-encryptionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### EncryptionManager.GenerateKeyPair Method

Generates a new asymmetric key pair

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public IAsymmetricKeyPair GenerateKeyPair()
```

###### Return Value

Type: IAsymmetricKeyPair

#### See Also

###### Reference

[EncryptionManager Class](#group-psrapi-managers-encryptionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### EncryptionManager.GenerateSymmetricKey Method

Generates a new symmetric key

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public byte[] GenerateSymmetricKey()
```

###### Return Value

Type: Byte

#### See Also

###### Reference

[EncryptionManager Class](#group-psrapi-managers-encryptionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### EncryptionManager.GetEncryptionVersion Method

Returns the encryption version which is in use

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public MtoEncryptionVersion GetEncryptionVersion()
```

###### Return Value

Type: MtoEncryptionVersion

#### See Also

###### Reference

[EncryptionManager Class](#group-psrapi-managers-encryptionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### EncryptionManager.SignData Method

Signs the data with the private key

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public byte[] SignData(
	byte[] privateKey,
	byte[] data
)
```

###### Parameters

privateKeyType: SystemByte
The private keydataType: SystemByte
The data to sign

###### Return Value

Type: Byte
The signature

#### See Also

###### Reference

[EncryptionManager Class](#group-psrapi-managers-encryptionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### EncryptionManager.VerifyData Method

Checks if a data was signed with a signature

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public bool VerifyData(
	byte[] publicKey,
	byte[] data,
	byte[] signature
)
```

###### Parameters

publicKeyType: SystemByte
The public keydataType: SystemByte
The data which from which a signature was created fromsignatureType: SystemByte
The signature

###### Return Value

Type: Boolean

#### See Also

###### Reference

[EncryptionManager Class](#group-psrapi-managers-encryptionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)


<a id="group-psrapi-managers-externallinkmanager"></a>
## ExternalLinkManager

### ExternalLinkManager Class

Manager for creating external links

#### Inheritance Hierarchy

SystemObject
[PsrApi.ManagersBaseManager](#group-psrapi-managers-basemanager)
PsrApi.ManagersExternalLinkManager

#### Syntax

C#

```csharp
public class ExternalLinkManager : BaseManager
```

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GetExternalLink](#group-psrapi-managers-externallinkmanager) | Returns the external link for the entered information |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ExternalLinkManager Methods

The [ExternalLinkManager](#group-psrapi-managers-externallinkmanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GetExternalLink](#group-psrapi-managers-externallinkmanager) | Returns the external link for the entered information |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[ExternalLinkManager Class](#group-psrapi-managers-externallinkmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ExternalLinkManager.GetExternalLink Method

Returns the external link for the entered information

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public string GetExternalLink(
	PsrExternalLinkType type,
	Guid id,
	Nullable<PsrExternalLinkType> type2 = null,
	Nullable<Guid> id2 = null
)
```

###### Parameters

typeType: [PsrApi.Data.EnumsPsrExternalLinkType](enums-and-constants.md#group-psrapi-data-enums-psrexternallinktype)
Type of the data that should be created as external linkidType: SystemGuid
Id of the data for external linktype2 (Optional)Type: SystemNullable[PsrExternalLinkType](enums-and-constants.md#group-psrapi-data-enums-psrexternallinktype)
Type of the second dataid2 (Optional)Type: SystemNullableGuid
Id of the second data

###### Return Value

Type: String

#### Examples

// Creates a link for copying the value of an item to the clipboard
var externalLink = ExternalLinkManager.GetExternalLink(PsrExternalLinkType.CopyPassword, containerItem.Id, PsrExternalLinkType.Password, container.Id);

#### See Also

###### Reference

[ExternalLinkManager Class](#group-psrapi-managers-externallinkmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)


<a id="group-psrapi-managers-forwardingrulemanager"></a>
## ForwardingRuleManager

### ForwardingRuleManager Class

Contains methods regarding forwarding rules.

#### Inheritance Hierarchy

SystemObject
[PsrApi.ManagersBaseManager](#group-psrapi-managers-basemanager)
PsrApi.ManagersForwardingRuleManager

#### Syntax

C#

```csharp
public class ForwardingRuleManager : BaseManager
```

#### Methods

| Name | Description |
| --- | --- |
| [AddForwardingRule](#group-psrapi-managers-forwardingrulemanager) | Adds the given forwarding rule. |
| [DeleteForwardingRule](#group-psrapi-managers-forwardingrulemanager) | Deletes the given forwarding rule. |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GetForwardingRuleList](#group-psrapi-managers-forwardingrulemanager) | Returns all forwarding rules for the current user. |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |
| [UpdateForwardingRule](#group-psrapi-managers-forwardingrulemanager) | Updates the given forwarding rule. |

#### See Also

###### Reference

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ForwardingRuleManager Methods

The [ForwardingRuleManager](#group-psrapi-managers-forwardingrulemanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| [AddForwardingRule](#group-psrapi-managers-forwardingrulemanager) | Adds the given forwarding rule. |
| [DeleteForwardingRule](#group-psrapi-managers-forwardingrulemanager) | Deletes the given forwarding rule. |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GetForwardingRuleList](#group-psrapi-managers-forwardingrulemanager) | Returns all forwarding rules for the current user. |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |
| [UpdateForwardingRule](#group-psrapi-managers-forwardingrulemanager) | Updates the given forwarding rule. |

#### See Also

###### Reference

[ForwardingRuleManager Class](#group-psrapi-managers-forwardingrulemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ForwardingRuleManager.AddForwardingRule Method

Adds the given forwarding rule.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrForwardingRule> AddForwardingRule(
	PsrForwardingRule rule
)
```

###### Parameters

ruleType: [PsrApi.DataPsrForwardingRule](data-models.md#group-psrapi-data-psrforwardingrule)

###### Return Value

Type: Task[PsrForwardingRule](data-models.md#group-psrapi-data-psrforwardingrule)

#### See Also

###### Reference

[ForwardingRuleManager Class](#group-psrapi-managers-forwardingrulemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ForwardingRuleManager.DeleteForwardingRule Method

Deletes the given forwarding rule.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task DeleteForwardingRule(
	PsrForwardingRule rule
)
```

###### Parameters

ruleType: [PsrApi.DataPsrForwardingRule](data-models.md#group-psrapi-data-psrforwardingrule)

###### Return Value

Type: Task

#### See Also

###### Reference

[ForwardingRuleManager Class](#group-psrapi-managers-forwardingrulemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ForwardingRuleManager.GetForwardingRuleList Method

Returns all forwarding rules for the current user.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrForwardingRule>> GetForwardingRuleList()
```

###### Return Value

Type: TaskIEnumerable[PsrForwardingRule](data-models.md#group-psrapi-data-psrforwardingrule)

#### See Also

###### Reference

[ForwardingRuleManager Class](#group-psrapi-managers-forwardingrulemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### ForwardingRuleManager.UpdateForwardingRule Method

Updates the given forwarding rule.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrForwardingRule> UpdateForwardingRule(
	PsrForwardingRule rule
)
```

###### Parameters

ruleType: [PsrApi.DataPsrForwardingRule](data-models.md#group-psrapi-data-psrforwardingrule)

###### Return Value

Type: Task[PsrForwardingRule](data-models.md#group-psrapi-data-psrforwardingrule)

#### See Also

###### Reference

[ForwardingRuleManager Class](#group-psrapi-managers-forwardingrulemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)


<a id="group-psrapi-managers-genericrightmanager"></a>
## GenericRightManager

### GenericRightManager Class

Contains a method to manipulate the data rights for any [PsrData](data-models.md#group-psrapi-data-psrdata) objects.

#### Inheritance Hierarchy

SystemObject
[PsrApi.ManagersBaseManager](#group-psrapi-managers-basemanager)
PsrApi.ManagersGenericRightManager

#### Syntax

C#

```csharp
public class GenericRightManager : BaseManager
```

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [SaveRights](#group-psrapi-managers-genericrightmanager) | Applies the data rights to all the given datas.<br>If inherit is set to true, the data rights are also inherited to container items, if the data is of type [PsrContainer](data-models.md#group-psrapi-data-psrcontainer).<br>If overwrite is set to true, all existing data rights on the object are cleared before the new ones are applied. If set to false,<br>the method only applies the changes in data rights. |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Managers Namespace](#group-psrapi-managers)

### GenericRightManager Methods

The [GenericRightManager](#group-psrapi-managers-genericrightmanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [SaveRights](#group-psrapi-managers-genericrightmanager) | Applies the data rights to all the given datas.<br>If inherit is set to true, the data rights are also inherited to container items, if the data is of type [PsrContainer](data-models.md#group-psrapi-data-psrcontainer).<br>If overwrite is set to true, all existing data rights on the object are cleared before the new ones are applied. If set to false,<br>the method only applies the changes in data rights. |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[GenericRightManager Class](#group-psrapi-managers-genericrightmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### GenericRightManager.SaveRights Method

Applies the data rights to all the given datas.
If inherit is set to true, the data rights are also inherited to container items, if the data is of type [PsrContainer](data-models.md#group-psrapi-data-psrcontainer).
If overwrite is set to true, all existing data rights on the object are cleared before the new ones are applied. If set to false,
the method only applies the changes in data rights.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task SaveRights(
	List<PsrData> datas,
	List<PsrDataRight> rights,
	bool inherit,
	bool overwrite,
	bool ignoreDatabaseAdmins = false
)
```

###### Parameters

datasType: System.Collections.GenericList[PsrData](data-models.md#group-psrapi-data-psrdata)
rightsType: System.Collections.GenericList[PsrDataRight](data-models.md#group-psrapi-data-psrdataright)
inheritType: SystemBoolean
overwriteType: SystemBoolean
ignoreDatabaseAdmins (Optional)Type: SystemBoolean
Should be set to true when moving objects to another OU. Only takes effect when overwrite is set to true

###### Return Value

Type: Task

#### See Also

###### Reference

[GenericRightManager Class](#group-psrapi-managers-genericrightmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)


<a id="group-psrapi-managers-licensemanager"></a>
## LicenseManager

### LicenseManager Class

Contains methods regarding licensing

#### Inheritance Hierarchy

SystemObject
[PsrApi.ManagersBaseManager](#group-psrapi-managers-basemanager)
PsrApi.ManagersLicenseManager

#### Syntax

C#

```csharp
public class LicenseManager : BaseManager
```

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| [GetServerLicenseModuleList](#group-psrapi-managers-licensemanager) | Returns a list of modules that the server has a license for. |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Managers Namespace](#group-psrapi-managers)

### LicenseManager Methods

The [LicenseManager](#group-psrapi-managers-licensemanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| [GetServerLicenseModuleList](#group-psrapi-managers-licensemanager) | Returns a list of modules that the server has a license for. |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[LicenseManager Class](#group-psrapi-managers-licensemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### LicenseManager.GetServerLicenseModuleList Method

Returns a list of modules that the server has a license for.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<List<PsrLicenseModule>> GetServerLicenseModuleList()
```

###### Return Value

Type: TaskList[PsrLicenseModule](enums-and-constants.md#group-psrapi-data-enums-psrlicensemodule)

#### See Also

###### Reference

[LicenseManager Class](#group-psrapi-managers-licensemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)


<a id="group-psrapi-managers-logbookmanager"></a>
## LogbookManager

### LogbookManager Class

Contains methods regarding logbooks. Logbooks are single logbook entries.

#### Inheritance Hierarchy

SystemObject
[PsrApi.ManagersBaseManager](#group-psrapi-managers-basemanager)
PsrApi.ManagersLogbookManager

#### Syntax

C#

```csharp
public class LogbookManager : BaseManager
```

#### Methods

| Name | Description |
| --- | --- |
| [AddLogbookEntries](#group-psrapi-managers-logbookmanager) | Adds a logbook entry for each given data ID.<br>The dataType must be the same for all data IDs. |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| [GetLogbookCount](#group-psrapi-managers-logbookmanager) | Returns the number of logbook entries that match the given filter. |
| [GetLogbookEntries](#group-psrapi-managers-logbookmanager) | Returns all logbook entries that correspond to the given filter. |
| [GetLogbookListFilter](#group-psrapi-managers-logbookmanager) | Returns the logbook list filter that was at last saved for the user or the default filter<br>if defaultFilter is set to true. |
| [GetSingleLogbookEntry](#group-psrapi-managers-logbookmanager) | Returns the logbook entry by the given ID. |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Managers Namespace](#group-psrapi-managers)

### LogbookManager Methods

The [LogbookManager](#group-psrapi-managers-logbookmanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| [AddLogbookEntries](#group-psrapi-managers-logbookmanager) | Adds a logbook entry for each given data ID.<br>The dataType must be the same for all data IDs. |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| [GetLogbookCount](#group-psrapi-managers-logbookmanager) | Returns the number of logbook entries that match the given filter. |
| [GetLogbookEntries](#group-psrapi-managers-logbookmanager) | Returns all logbook entries that correspond to the given filter. |
| [GetLogbookListFilter](#group-psrapi-managers-logbookmanager) | Returns the logbook list filter that was at last saved for the user or the default filter<br>if defaultFilter is set to true. |
| [GetSingleLogbookEntry](#group-psrapi-managers-logbookmanager) | Returns the logbook entry by the given ID. |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[LogbookManager Class](#group-psrapi-managers-logbookmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### LogbookManager.AddLogbookEntries Method

Adds a logbook entry for each given data ID.
The dataType must be the same for all data IDs.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task AddLogbookEntries(
	PsrLogbookEvent logbookEvent,
	List<Guid> dataIds,
	PsrEntityObjectType dataType,
	string info = ""
)
```

###### Parameters

logbookEventType: [PsrApi.Data.EnumsPsrLogbookEvent](enums-and-constants.md#group-psrapi-data-enums-psrlogbookevent)
dataIdsType: System.Collections.GenericListGuid
dataTypeType: [PsrApi.Data.EnumsPsrEntityObjectType](enums-and-constants.md#group-psrapi-data-enums-psrentityobjecttype)
Type of the datas.info (Optional)Type: SystemString

###### Return Value

Type: Task

#### See Also

###### Reference

[LogbookManager Class](#group-psrapi-managers-logbookmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### LogbookManager.GetLogbookCount Method

Returns the number of logbook entries that match the given filter.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<int> GetLogbookCount(
	PsrListFilter filter
)
```

###### Parameters

filterType: [PsrApi.DataPsrListFilter](data-models.md#group-psrapi-data-psrlistfilter)

###### Return Value

Type: TaskInt32

#### See Also

###### Reference

[LogbookManager Class](#group-psrapi-managers-logbookmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### LogbookManager.GetLogbookEntries Method

Returns all logbook entries that correspond to the given filter.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrLogbook>> GetLogbookEntries(
	PsrListFilter filter
)
```

###### Parameters

filterType: [PsrApi.DataPsrListFilter](data-models.md#group-psrapi-data-psrlistfilter)

###### Return Value

Type: TaskIEnumerable[PsrLogbook](data-models.md#group-psrapi-data-psrlogbook)

#### See Also

###### Reference

[LogbookManager Class](#group-psrapi-managers-logbookmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### LogbookManager.GetLogbookListFilter Method

Returns the logbook list filter that was at last saved for the user or the default filter
if defaultFilter is set to true.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrListFilter> GetLogbookListFilter(
	bool defaultFilter
)
```

###### Parameters

defaultFilterType: SystemBoolean

###### Return Value

Type: Task[PsrListFilter](data-models.md#group-psrapi-data-psrlistfilter)

#### See Also

###### Reference

[LogbookManager Class](#group-psrapi-managers-logbookmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### LogbookManager.GetSingleLogbookEntry Method

Returns the logbook entry by the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrLogbook> GetSingleLogbookEntry(
	Guid logbookEntryId
)
```

###### Parameters

logbookEntryIdType: SystemGuid

###### Return Value

Type: Task[PsrLogbook](data-models.md#group-psrapi-data-psrlogbook)

#### See Also

###### Reference

[LogbookManager Class](#group-psrapi-managers-logbookmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)


<a id="group-psrapi-managers-mailingmanager"></a>
## MailingManager

### MailingManager Class

E-mails.

#### Inheritance Hierarchy

SystemObject
[PsrApi.ManagersBaseManager](#group-psrapi-managers-basemanager)
PsrApi.ManagersMailingManager

#### Syntax

C#

```csharp
public class MailingManager : BaseManager
```

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [IsSmtpConfigured](#group-psrapi-managers-mailingmanager) | Returns if a valid SMTP configuration exists. |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Managers Namespace](#group-psrapi-managers)

### MailingManager Methods

The [MailingManager](#group-psrapi-managers-mailingmanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [IsSmtpConfigured](#group-psrapi-managers-mailingmanager) | Returns if a valid SMTP configuration exists. |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[MailingManager Class](#group-psrapi-managers-mailingmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### MailingManager.IsSmtpConfigured Method

Returns if a valid SMTP configuration exists.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<bool> IsSmtpConfigured()
```

###### Return Value

Type: TaskBoolean

#### See Also

###### Reference

[MailingManager Class](#group-psrapi-managers-mailingmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)


<a id="group-psrapi-managers-onetimepasswordmanager"></a>
## OneTimePasswordManager

### OneTimePasswordManager Class

Contains methods to generate one-time passwords

#### Inheritance Hierarchy

SystemObject
PsrApi.ManagersOneTimePasswordManager

#### Syntax

C#

```csharp
public static class OneTimePasswordManager
```

#### Methods

| Name | Description |
| --- | --- |
| [GenerateGoogleAuthenticatorOtp](#group-psrapi-managers-onetimepasswordmanager) | Generates a one-time password using the Google Authenticator algorithm.<br>The current system time is fed to the algorithm. |

#### See Also

###### Reference

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OneTimePasswordManager Methods

The [OneTimePasswordManager](#group-psrapi-managers-onetimepasswordmanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| [GenerateGoogleAuthenticatorOtp](#group-psrapi-managers-onetimepasswordmanager) | Generates a one-time password using the Google Authenticator algorithm.<br>The current system time is fed to the algorithm. |

#### See Also

###### Reference

[OneTimePasswordManager Class](#group-psrapi-managers-onetimepasswordmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OneTimePasswordManager.GenerateGoogleAuthenticatorOtp Method

Generates a one-time password using the Google Authenticator algorithm.
The current system time is fed to the algorithm.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public static PsrGoogleAuthenticatorResult GenerateGoogleAuthenticatorOtp(
	string secret
)
```

###### Parameters

secretType: SystemString
The secret in base32 encoding

###### Return Value

Type: [PsrGoogleAuthenticatorResult](data-models.md#group-psrapi-data-psrgoogleauthenticatorresult)

#### See Also

###### Reference

[OneTimePasswordManager Class](#group-psrapi-managers-onetimepasswordmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)


<a id="group-psrapi-managers-optionmanager"></a>
## OptionManager

### OptionManager Class

Contains methods to manipulate options. Options are rights or settings that are typically applied to
objects of type [PsrOrganisationUnit](data-models.md#group-psrapi-data-psrorganisationunit), [PsrRole](data-models.md#group-psrapi-data-psrrole) or [PsrContainer](data-models.md#group-psrapi-data-psrcontainer)

#### Inheritance Hierarchy

SystemObject
[PsrApi.ManagersBaseManager](#group-psrapi-managers-basemanager)
PsrApi.ManagersOptionManager

#### Syntax

C#

```csharp
public class OptionManager : BaseManager
```

#### Methods

| Name | Description |
| --- | --- |
| [DeleteCollectionOption](#group-psrapi-managers-optionmanager) | Deletes an option. |
| [DeleteDataOptions](#group-psrapi-managers-optionmanager) | Deletes all options that are connected to a PsrData object. |
| [DeleteOption](#group-psrapi-managers-optionmanager) | Deletes an options that matches the name and ID. |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| [GetOptionTOption](#group-psrapi-managers-optionmanager) | Returns an option that applies to the given data and [Name](data-models.md#group-psrapi-data-psroption) |
| [GetOptions](#group-psrapi-managers-optionmanager) | Returns a list of options of the given option groups that apply to the given data. |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [GetUserOptionTOption](#group-psrapi-managers-optionmanager) | Returns an option that applies to the current session user and [Name](data-models.md#group-psrapi-data-psroption) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |
| [UpdateBooleanOption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionBoolean](data-models.md#group-psrapi-data-psroptionboolean) |
| [UpdateCollectionOption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionString](data-models.md#group-psrapi-data-psroptionstring) |
| [UpdateDateTimeOption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionDateTime](data-models.md#group-psrapi-data-psroptiondatetime) |
| [UpdateDoubleExtOption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionDoubleExt](data-models.md#group-psrapi-data-psroptiondoubleext) |
| [UpdateDoubleoption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionDouble](data-models.md#group-psrapi-data-psroptiondouble) |
| [UpdateFileOption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionFile](data-models.md#group-psrapi-data-psroptionfile) |
| [UpdateFolderOption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionFolder](data-models.md#group-psrapi-data-psroptionfolder) |
| [UpdateGlobalEncryptedOption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionGlobalEncrypted](data-models.md#group-psrapi-data-psroptionglobalencrypted) |
| [UpdateIntegerExtOption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionIntegerExt](data-models.md#group-psrapi-data-psroptionintegerext) |
| [UpdateIntegerOption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionInteger](data-models.md#group-psrapi-data-psroptioninteger) |
| [UpdateListOption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionList](data-models.md#group-psrapi-data-psroptionlist) |
| [UpdatePasswordOption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionPassword](data-models.md#group-psrapi-data-psroptionpassword) |
| [UpdateSignedOption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionSigned](data-models.md#group-psrapi-data-psroptionsigned) |
| [UpdateStringOption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionString](data-models.md#group-psrapi-data-psroptionstring) |
| [UpdateTimeOption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionTime](data-models.md#group-psrapi-data-psroptiontime) |

#### See Also

###### Reference

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OptionManager Methods

The [OptionManager](#group-psrapi-managers-optionmanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| [DeleteCollectionOption](#group-psrapi-managers-optionmanager) | Deletes an option. |
| [DeleteDataOptions](#group-psrapi-managers-optionmanager) | Deletes all options that are connected to a PsrData object. |
| [DeleteOption](#group-psrapi-managers-optionmanager) | Deletes an options that matches the name and ID. |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| [GetOptionTOption](#group-psrapi-managers-optionmanager) | Returns an option that applies to the given data and [Name](data-models.md#group-psrapi-data-psroption) |
| [GetOptions](#group-psrapi-managers-optionmanager) | Returns a list of options of the given option groups that apply to the given data. |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [GetUserOptionTOption](#group-psrapi-managers-optionmanager) | Returns an option that applies to the current session user and [Name](data-models.md#group-psrapi-data-psroption) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |
| [UpdateBooleanOption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionBoolean](data-models.md#group-psrapi-data-psroptionboolean) |
| [UpdateCollectionOption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionString](data-models.md#group-psrapi-data-psroptionstring) |
| [UpdateDateTimeOption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionDateTime](data-models.md#group-psrapi-data-psroptiondatetime) |
| [UpdateDoubleExtOption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionDoubleExt](data-models.md#group-psrapi-data-psroptiondoubleext) |
| [UpdateDoubleoption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionDouble](data-models.md#group-psrapi-data-psroptiondouble) |
| [UpdateFileOption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionFile](data-models.md#group-psrapi-data-psroptionfile) |
| [UpdateFolderOption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionFolder](data-models.md#group-psrapi-data-psroptionfolder) |
| [UpdateGlobalEncryptedOption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionGlobalEncrypted](data-models.md#group-psrapi-data-psroptionglobalencrypted) |
| [UpdateIntegerExtOption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionIntegerExt](data-models.md#group-psrapi-data-psroptionintegerext) |
| [UpdateIntegerOption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionInteger](data-models.md#group-psrapi-data-psroptioninteger) |
| [UpdateListOption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionList](data-models.md#group-psrapi-data-psroptionlist) |
| [UpdatePasswordOption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionPassword](data-models.md#group-psrapi-data-psroptionpassword) |
| [UpdateSignedOption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionSigned](data-models.md#group-psrapi-data-psroptionsigned) |
| [UpdateStringOption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionString](data-models.md#group-psrapi-data-psroptionstring) |
| [UpdateTimeOption](#group-psrapi-managers-optionmanager) | Updates an option of type [PsrOptionTime](data-models.md#group-psrapi-data-psroptiontime) |

#### See Also

###### Reference

[OptionManager Class](#group-psrapi-managers-optionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OptionManager.DeleteCollectionOption Method

Deletes an option.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task DeleteCollectionOption(
	string name,
	string collection,
	Nullable<Guid> dataId
)
```

###### Parameters

nameType: SystemString
Name of the options.collectionType: SystemString
Name of the collection.dataIdType: SystemNullableGuid
Optional ID of the data the option belongs to.

###### Return Value

Type: Task

#### See Also

###### Reference

[OptionManager Class](#group-psrapi-managers-optionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OptionManager.DeleteDataOptions Method

Deletes all options that are connected to a PsrData object.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task DeleteDataOptions(
	List<PsrOptionGroup> groups,
	Guid dataId
)
```

###### Parameters

groupsType: System.Collections.GenericList[PsrOptionGroup](enums-and-constants.md#group-psrapi-data-enums-psroptiongroup)
Option groups of options that should be deleted.dataIdType: SystemGuid
ID of the PsrData object whose options should be deleted.

###### Return Value

Type: Task

#### See Also

###### Reference

[OptionManager Class](#group-psrapi-managers-optionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OptionManager.DeleteOption Method

Deletes an options that matches the name and ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task DeleteOption(
	string name,
	Nullable<Guid> dataId
)
```

###### Parameters

nameType: SystemString
Name of the option.dataIdType: SystemNullableGuid
Optional ID of the data the option belongs to.

###### Return Value

Type: Task

#### See Also

###### Reference

[OptionManager Class](#group-psrapi-managers-optionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OptionManager.GetOption(TOption) Method

Returns an option that applies to the given data and [Name](data-models.md#group-psrapi-data-psroption)

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<TOption> GetOption<TOption>(
	string name,
	PsrData data
)
where TOption : PsrOption
```

###### Parameters

nameType: SystemString
dataType: [PsrApi.DataPsrData](data-models.md#group-psrapi-data-psrdata)

###### Type Parameters

TOption

###### Return Value

Type: TaskTOption

#### See Also

###### Reference

[OptionManager Class](#group-psrapi-managers-optionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OptionManager.GetOptions Method

Returns a list of options of the given option groups that apply to the given data.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<List<PsrOption>> GetOptions(
	List<PsrOptionGroup> groups,
	PsrData data
)
```

###### Parameters

groupsType: System.Collections.GenericList[PsrOptionGroup](enums-and-constants.md#group-psrapi-data-enums-psroptiongroup)
dataType: [PsrApi.DataPsrData](data-models.md#group-psrapi-data-psrdata)

###### Return Value

Type: TaskList[PsrOption](data-models.md#group-psrapi-data-psroption)

#### See Also

###### Reference

[OptionManager Class](#group-psrapi-managers-optionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OptionManager.GetUserOption(TOption) Method

Returns an option that applies to the current session user and [Name](data-models.md#group-psrapi-data-psroption)

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<TOption> GetUserOption<TOption>(
	string name
)
where TOption : PsrOption
```

###### Parameters

nameType: SystemString

###### Type Parameters

TOption

###### Return Value

Type: TaskTOption

#### See Also

###### Reference

[OptionManager Class](#group-psrapi-managers-optionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OptionManager.UpdateBooleanOption Method

Updates an option of type [PsrOptionBoolean](data-models.md#group-psrapi-data-psroptionboolean)

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task UpdateBooleanOption(
	string name,
	string category,
	PsrOptionGroup group,
	bool value,
	Nullable<Guid> dataId
)
```

###### Parameters

nameType: SystemString
categoryType: SystemString
groupType: [PsrApi.Data.EnumsPsrOptionGroup](enums-and-constants.md#group-psrapi-data-enums-psroptiongroup)
valueType: SystemBoolean
dataIdType: SystemNullableGuid

###### Return Value

Type: Task

#### See Also

###### Reference

[OptionManager Class](#group-psrapi-managers-optionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OptionManager.UpdateCollectionOption Method

Updates an option of type [PsrOptionString](data-models.md#group-psrapi-data-psroptionstring)

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task UpdateCollectionOption(
	string name,
	string collection,
	string value,
	Nullable<Guid> dataId
)
```

###### Parameters

nameType: SystemString
collectionType: SystemString
valueType: SystemString
dataIdType: SystemNullableGuid

###### Return Value

Type: Task

#### See Also

###### Reference

[OptionManager Class](#group-psrapi-managers-optionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OptionManager.UpdateDateTimeOption Method

Updates an option of type [PsrOptionDateTime](data-models.md#group-psrapi-data-psroptiondatetime)

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task UpdateDateTimeOption(
	string name,
	string category,
	PsrOptionGroup group,
	DateTime value,
	Nullable<Guid> dataId
)
```

###### Parameters

nameType: SystemString
categoryType: SystemString
groupType: [PsrApi.Data.EnumsPsrOptionGroup](enums-and-constants.md#group-psrapi-data-enums-psroptiongroup)
valueType: SystemDateTime
dataIdType: SystemNullableGuid

###### Return Value

Type: Task

#### See Also

###### Reference

[OptionManager Class](#group-psrapi-managers-optionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OptionManager.UpdateDoubleExtOption Method

Updates an option of type [PsrOptionDoubleExt](data-models.md#group-psrapi-data-psroptiondoubleext)

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task UpdateDoubleExtOption(
	string name,
	string category,
	PsrOptionGroup group,
	double value,
	Nullable<Guid> dataId
)
```

###### Parameters

nameType: SystemString
categoryType: SystemString
groupType: [PsrApi.Data.EnumsPsrOptionGroup](enums-and-constants.md#group-psrapi-data-enums-psroptiongroup)
valueType: SystemDouble
dataIdType: SystemNullableGuid

###### Return Value

Type: Task

#### See Also

###### Reference

[OptionManager Class](#group-psrapi-managers-optionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OptionManager.UpdateDoubleoption Method

Updates an option of type [PsrOptionDouble](data-models.md#group-psrapi-data-psroptiondouble)

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task UpdateDoubleoption(
	string name,
	string category,
	PsrOptionGroup group,
	double value,
	Nullable<Guid> dataId
)
```

###### Parameters

nameType: SystemString
categoryType: SystemString
groupType: [PsrApi.Data.EnumsPsrOptionGroup](enums-and-constants.md#group-psrapi-data-enums-psroptiongroup)
valueType: SystemDouble
dataIdType: SystemNullableGuid

###### Return Value

Type: Task

#### See Also

###### Reference

[OptionManager Class](#group-psrapi-managers-optionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OptionManager.UpdateFileOption Method

Updates an option of type [PsrOptionFile](data-models.md#group-psrapi-data-psroptionfile)

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task UpdateFileOption(
	string name,
	string category,
	PsrOptionGroup group,
	string value,
	Nullable<Guid> dataId
)
```

###### Parameters

nameType: SystemString
categoryType: SystemString
groupType: [PsrApi.Data.EnumsPsrOptionGroup](enums-and-constants.md#group-psrapi-data-enums-psroptiongroup)
valueType: SystemString
dataIdType: SystemNullableGuid

###### Return Value

Type: Task

#### See Also

###### Reference

[OptionManager Class](#group-psrapi-managers-optionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OptionManager.UpdateFolderOption Method

Updates an option of type [PsrOptionFolder](data-models.md#group-psrapi-data-psroptionfolder)

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task UpdateFolderOption(
	string name,
	string category,
	PsrOptionGroup group,
	string value,
	Nullable<Guid> dataId
)
```

###### Parameters

nameType: SystemString
categoryType: SystemString
groupType: [PsrApi.Data.EnumsPsrOptionGroup](enums-and-constants.md#group-psrapi-data-enums-psroptiongroup)
valueType: SystemString
dataIdType: SystemNullableGuid

###### Return Value

Type: Task

#### See Also

###### Reference

[OptionManager Class](#group-psrapi-managers-optionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OptionManager.UpdateGlobalEncryptedOption Method

Updates an option of type [PsrOptionGlobalEncrypted](data-models.md#group-psrapi-data-psroptionglobalencrypted)

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task UpdateGlobalEncryptedOption(
	string name,
	string category,
	PsrOptionGroup group,
	byte[] value,
	Nullable<Guid> dataId
)
```

###### Parameters

nameType: SystemString
categoryType: SystemString
groupType: [PsrApi.Data.EnumsPsrOptionGroup](enums-and-constants.md#group-psrapi-data-enums-psroptiongroup)
valueType: SystemByte
dataIdType: SystemNullableGuid

###### Return Value

Type: Task

#### See Also

###### Reference

[OptionManager Class](#group-psrapi-managers-optionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OptionManager.UpdateIntegerExtOption Method

Updates an option of type [PsrOptionIntegerExt](data-models.md#group-psrapi-data-psroptionintegerext)

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task UpdateIntegerExtOption(
	string name,
	string category,
	PsrOptionGroup group,
	int value,
	Nullable<Guid> dataId
)
```

###### Parameters

nameType: SystemString
categoryType: SystemString
groupType: [PsrApi.Data.EnumsPsrOptionGroup](enums-and-constants.md#group-psrapi-data-enums-psroptiongroup)
valueType: SystemInt32
dataIdType: SystemNullableGuid

###### Return Value

Type: Task

#### See Also

###### Reference

[OptionManager Class](#group-psrapi-managers-optionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OptionManager.UpdateIntegerOption Method

Updates an option of type [PsrOptionInteger](data-models.md#group-psrapi-data-psroptioninteger)

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task UpdateIntegerOption(
	string name,
	string category,
	PsrOptionGroup group,
	int value,
	Nullable<Guid> dataId
)
```

###### Parameters

nameType: SystemString
categoryType: SystemString
groupType: [PsrApi.Data.EnumsPsrOptionGroup](enums-and-constants.md#group-psrapi-data-enums-psroptiongroup)
valueType: SystemInt32
dataIdType: SystemNullableGuid

###### Return Value

Type: Task

#### See Also

###### Reference

[OptionManager Class](#group-psrapi-managers-optionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OptionManager.UpdateListOption Method

Updates an option of type [PsrOptionList](data-models.md#group-psrapi-data-psroptionlist)

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task UpdateListOption(
	string name,
	string category,
	PsrOptionGroup group,
	string value,
	Nullable<Guid> dataId
)
```

###### Parameters

nameType: SystemString
categoryType: SystemString
groupType: [PsrApi.Data.EnumsPsrOptionGroup](enums-and-constants.md#group-psrapi-data-enums-psroptiongroup)
valueType: SystemString
dataIdType: SystemNullableGuid

###### Return Value

Type: Task

#### See Also

###### Reference

[OptionManager Class](#group-psrapi-managers-optionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OptionManager.UpdatePasswordOption Method

Updates an option of type [PsrOptionPassword](data-models.md#group-psrapi-data-psroptionpassword)

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task UpdatePasswordOption(
	string name,
	string category,
	PsrOptionGroup group,
	string value,
	Nullable<Guid> dataId
)
```

###### Parameters

nameType: SystemString
categoryType: SystemString
groupType: [PsrApi.Data.EnumsPsrOptionGroup](enums-and-constants.md#group-psrapi-data-enums-psroptiongroup)
valueType: SystemString
dataIdType: SystemNullableGuid

###### Return Value

Type: Task

#### See Also

###### Reference

[OptionManager Class](#group-psrapi-managers-optionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OptionManager.UpdateSignedOption Method

Updates an option of type [PsrOptionSigned](data-models.md#group-psrapi-data-psroptionsigned)

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task UpdateSignedOption(
	string name,
	string category,
	PsrOptionGroup group,
	Object value,
	Nullable<Guid> dataId
)
```

###### Parameters

nameType: SystemString
Name of the optioncategoryType: SystemString
Category of the optiongroupType: [PsrApi.Data.EnumsPsrOptionGroup](enums-and-constants.md#group-psrapi-data-enums-psroptiongroup)
Group of the optionvalueType: SystemObject
Value the option should havedataIdType: SystemNullableGuid
Optional: ID of the data, the option should be relevant to. NULL if global option

###### Return Value

Type: Task

#### See Also

###### Reference

[OptionManager Class](#group-psrapi-managers-optionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OptionManager.UpdateStringOption Method

Updates an option of type [PsrOptionString](data-models.md#group-psrapi-data-psroptionstring)

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task UpdateStringOption(
	string name,
	string category,
	PsrOptionGroup group,
	string value,
	Nullable<Guid> dataId
)
```

###### Parameters

nameType: SystemString
categoryType: SystemString
groupType: [PsrApi.Data.EnumsPsrOptionGroup](enums-and-constants.md#group-psrapi-data-enums-psroptiongroup)
valueType: SystemString
dataIdType: SystemNullableGuid

###### Return Value

Type: Task

#### See Also

###### Reference

[OptionManager Class](#group-psrapi-managers-optionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OptionManager.UpdateTimeOption Method

Updates an option of type [PsrOptionTime](data-models.md#group-psrapi-data-psroptiontime)

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task UpdateTimeOption(
	string name,
	string category,
	PsrOptionGroup group,
	int value,
	Nullable<Guid> dataId
)
```

###### Parameters

nameType: SystemString
categoryType: SystemString
groupType: [PsrApi.Data.EnumsPsrOptionGroup](enums-and-constants.md#group-psrapi-data-enums-psroptiongroup)
valueType: SystemInt32
dataIdType: SystemNullableGuid

###### Return Value

Type: Task

#### See Also

###### Reference

[OptionManager Class](#group-psrapi-managers-optionmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)


<a id="group-psrapi-managers-organisationunitmanager"></a>
## OrganisationUnitManager

### OrganisationUnitManager Class

Contains methods to manipulate organisation units.

#### Inheritance Hierarchy

SystemObject
[PsrApi.ManagersBaseManager](#group-psrapi-managers-basemanager)
PsrApi.ManagersOrganisationUnitManager

#### Syntax

C#

```csharp
public class OrganisationUnitManager : BaseManager
```

#### Methods

| Name | Description |
| --- | --- |
| [AddOrganisationUnitGroup](#group-psrapi-managers-organisationunitmanager) | Adds the new organisation unit group and adds a data right for the current user. |
| [AddOrganisationUnitUser(PsrOrganisationUnitUser, String, NullableGuid)](#group-psrapi-managers-organisationunitmanager) | Adds the organisation unit user |
| [AddOrganisationUnitUser(PsrOrganisationUnitUser, Byte, Byte, Byte, Byte, Byte, NullableGuid, NullableMtoHashAlgorithm)](#group-psrapi-managers-organisationunitmanager) | Adds the new organisation unit user and adds data rights for themself and current user. |
| [ChangeCurrentOrganisationUnitUserPassword](#group-psrapi-managers-organisationunitmanager) | Changes the password of the current user |
| [ChangeOrganisationUnitPassword](#group-psrapi-managers-organisationunitmanager) | Changes the password of the user with the given ID. |
| [DeleteOrganisationUnitGroup](#group-psrapi-managers-organisationunitmanager) | Deletes the given organisation unit group. |
| [DeleteOrganisationUnitUser](#group-psrapi-managers-organisationunitmanager) | Deletes the given organisation unit user. |
| [DoesCurrentUserNeedToChangePassword](#group-psrapi-managers-organisationunitmanager) | Returns, if the current user need to change his password. |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GetGroupInvolvedOrganisationUnit](#group-psrapi-managers-organisationunitmanager) | Returns a list of IDs of organisation units that are involved in the group with the given ID. |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| [GetOrganisationUnitGroup](#group-psrapi-managers-organisationunitmanager) | Returns the organisation unit group matching the given ID. |
| [GetOrganisationUnitImageSource](#group-psrapi-managers-organisationunitmanager) | Returns the base64 encoded image of the organisation unit. |
| [GetOrganisationUnitList](#group-psrapi-managers-organisationunitmanager) | Returns a list of organisation units that match the given filter. |
| [GetOrganisationUnitListFilter](#group-psrapi-managers-organisationunitmanager) | Returns the organisation unit list filter that was at last saved for the user or the default filter<br>if defaultFilter is set to true. |
| [GetOrganisationUnitStructure](#group-psrapi-managers-organisationunitmanager) | Returns the organisation unit structure that matches the given filter. |
| [GetOrganisationUnitUser](#group-psrapi-managers-organisationunitmanager) | Returns the organisation unit user matching the given ID. |
| [GetOrganisationUnitUserList](#group-psrapi-managers-organisationunitmanager) | Returns a list of organisation unit users matching the given filter. |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [GetUserInvolvedOrganisationUnit](#group-psrapi-managers-organisationunitmanager) | Returns a list of IDs of organisation units that are involved in the user with the given ID. |
| [HasGroupMasterKeyMode](#group-psrapi-managers-organisationunitmanager) | Returns if the group is secured with master key. |
| [HasUserMasterKeyMode](#group-psrapi-managers-organisationunitmanager) | Returns if the user is secured with master key. |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |
| [UpdateOrganisationUnitGroup](#group-psrapi-managers-organisationunitmanager) | Updates the given organisation unit group. |
| [UpdateOrganisationUnitUser](#group-psrapi-managers-organisationunitmanager) | Updates the given organisation unit user. |

#### See Also

###### Reference

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OrganisationUnitManager Methods

The [OrganisationUnitManager](#group-psrapi-managers-organisationunitmanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| [AddOrganisationUnitGroup](#group-psrapi-managers-organisationunitmanager) | Adds the new organisation unit group and adds a data right for the current user. |
| [AddOrganisationUnitUser(PsrOrganisationUnitUser, String, NullableGuid)](#group-psrapi-managers-organisationunitmanager) | Adds the organisation unit user |
| [AddOrganisationUnitUser(PsrOrganisationUnitUser, Byte, Byte, Byte, Byte, Byte, NullableGuid, NullableMtoHashAlgorithm)](#group-psrapi-managers-organisationunitmanager) | Adds the new organisation unit user and adds data rights for themself and current user. |
| [ChangeCurrentOrganisationUnitUserPassword](#group-psrapi-managers-organisationunitmanager) | Changes the password of the current user |
| [ChangeOrganisationUnitPassword](#group-psrapi-managers-organisationunitmanager) | Changes the password of the user with the given ID. |
| [DeleteOrganisationUnitGroup](#group-psrapi-managers-organisationunitmanager) | Deletes the given organisation unit group. |
| [DeleteOrganisationUnitUser](#group-psrapi-managers-organisationunitmanager) | Deletes the given organisation unit user. |
| [DoesCurrentUserNeedToChangePassword](#group-psrapi-managers-organisationunitmanager) | Returns, if the current user need to change his password. |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GetGroupInvolvedOrganisationUnit](#group-psrapi-managers-organisationunitmanager) | Returns a list of IDs of organisation units that are involved in the group with the given ID. |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| [GetOrganisationUnitGroup](#group-psrapi-managers-organisationunitmanager) | Returns the organisation unit group matching the given ID. |
| [GetOrganisationUnitImageSource](#group-psrapi-managers-organisationunitmanager) | Returns the base64 encoded image of the organisation unit. |
| [GetOrganisationUnitList](#group-psrapi-managers-organisationunitmanager) | Returns a list of organisation units that match the given filter. |
| [GetOrganisationUnitListFilter](#group-psrapi-managers-organisationunitmanager) | Returns the organisation unit list filter that was at last saved for the user or the default filter<br>if defaultFilter is set to true. |
| [GetOrganisationUnitStructure](#group-psrapi-managers-organisationunitmanager) | Returns the organisation unit structure that matches the given filter. |
| [GetOrganisationUnitUser](#group-psrapi-managers-organisationunitmanager) | Returns the organisation unit user matching the given ID. |
| [GetOrganisationUnitUserList](#group-psrapi-managers-organisationunitmanager) | Returns a list of organisation unit users matching the given filter. |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [GetUserInvolvedOrganisationUnit](#group-psrapi-managers-organisationunitmanager) | Returns a list of IDs of organisation units that are involved in the user with the given ID. |
| [HasGroupMasterKeyMode](#group-psrapi-managers-organisationunitmanager) | Returns if the group is secured with master key. |
| [HasUserMasterKeyMode](#group-psrapi-managers-organisationunitmanager) | Returns if the user is secured with master key. |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |
| [UpdateOrganisationUnitGroup](#group-psrapi-managers-organisationunitmanager) | Updates the given organisation unit group. |
| [UpdateOrganisationUnitUser](#group-psrapi-managers-organisationunitmanager) | Updates the given organisation unit user. |

#### See Also

###### Reference

[OrganisationUnitManager Class](#group-psrapi-managers-organisationunitmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OrganisationUnitManager.AddOrganisationUnitUser Method

#### Overload List

| Name | Description |
| --- | --- |
| [AddOrganisationUnitUser(PsrOrganisationUnitUser, String, NullableGuid)](#group-psrapi-managers-organisationunitmanager) | Adds the organisation unit user |
| [AddOrganisationUnitUser(PsrOrganisationUnitUser, Byte, Byte, Byte, Byte, Byte, NullableGuid, NullableMtoHashAlgorithm)](#group-psrapi-managers-organisationunitmanager) | Adds the new organisation unit user and adds data rights for themself and current user. |

#### See Also

###### Reference

[OrganisationUnitManager Class](#group-psrapi-managers-organisationunitmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OrganisationUnitManager.AddOrganisationUnitGroup Method

Adds the new organisation unit group and adds a data right for the current user.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrOrganisationUnitGroup> AddOrganisationUnitGroup(
	PsrOrganisationUnitGroup group,
	byte[] publicKey,
	byte[] encryptedGroupPrivateKey,
	Nullable<Guid> parentOrganisationUnitId = null
)
```

###### Parameters

groupType: [PsrApi.DataPsrOrganisationUnitGroup](data-models.md#group-psrapi-data-psrorganisationunitgroup)
Group that should be added.publicKeyType: SystemByte
Public key of the key pair of the group.encryptedGroupPrivateKeyType: SystemByte
Encrypted private key of the key pair of the group.parentOrganisationUnitId (Optional)Type: SystemNullableGuid
(optional) ID of the parent organisation unit.

###### Return Value

Type: Task[PsrOrganisationUnitGroup](data-models.md#group-psrapi-data-psrorganisationunitgroup)

#### See Also

###### Reference

[OrganisationUnitManager Class](#group-psrapi-managers-organisationunitmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OrganisationUnitManager.AddOrganisationUnitUser Method (PsrOrganisationUnitUser, Byte[], Byte[], Byte[], Byte[], Byte[], Nullable(Guid), Nullable(MtoHashAlgorithm))

Adds the new organisation unit user and adds data rights for themself and current user.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrOrganisationUnitUser> AddOrganisationUnitUser(
	PsrOrganisationUnitUser user,
	byte[] userPasswordHash,
	byte[] userPasswordSalt,
	byte[] publicKey,
	byte[] encryptedUserPrivateKey,
	byte[] encryptedCurrentUserPrivateKey,
	Nullable<Guid> parentOrganisationUnitId = null,
	Nullable<MtoHashAlgorithm> clientHashAlgorithm = null
)
```

###### Parameters

userType: [PsrApi.DataPsrOrganisationUnitUser](data-models.md#group-psrapi-data-psrorganisationunituser)
User that should be added.userPasswordHashType: SystemByte
Hash of the user's password.userPasswordSaltType: SystemByte
Salt used to hash the password.publicKeyType: SystemByte
Public key of the users key pair.encryptedUserPrivateKeyType: SystemByte
Encrypted (with the user's password) private key of the user's key pair.encryptedCurrentUserPrivateKeyType: SystemByte
Encrypted (with the current user's right key) private key of the user's key pair.parentOrganisationUnitId (Optional)Type: SystemNullableGuid
(optional) ID of the parent organisation unit.clientHashAlgorithm (Optional)Type: SystemNullableMtoHashAlgorithm
The hash algorithm which was used by the client to calculate the password hash

###### Return Value

Type: Task[PsrOrganisationUnitUser](data-models.md#group-psrapi-data-psrorganisationunituser)

#### See Also

###### Reference

[OrganisationUnitManager Class](#group-psrapi-managers-organisationunitmanager)

[AddOrganisationUnitUser Overload](#group-psrapi-managers-organisationunitmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OrganisationUnitManager.AddOrganisationUnitUser Method (PsrOrganisationUnitUser, String, Nullable(Guid))

Adds the organisation unit user

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrOrganisationUnitUser> AddOrganisationUnitUser(
	PsrOrganisationUnitUser user,
	string password,
	Nullable<Guid> parentOrganisationUnitId = null
)
```

###### Parameters

userType: [PsrApi.DataPsrOrganisationUnitUser](data-models.md#group-psrapi-data-psrorganisationunituser)
User that should be addedpasswordType: SystemString
The password of the user which is used to authenticateparentOrganisationUnitId (Optional)Type: SystemNullableGuid
(optional) ID of the parent organisation unit.

###### Return Value

Type: Task[PsrOrganisationUnitUser](data-models.md#group-psrapi-data-psrorganisationunituser)

#### See Also

###### Reference

[OrganisationUnitManager Class](#group-psrapi-managers-organisationunitmanager)

[AddOrganisationUnitUser Overload](#group-psrapi-managers-organisationunitmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OrganisationUnitManager.ChangeCurrentOrganisationUnitUserPassword Method

Changes the password of the current user

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task ChangeCurrentOrganisationUnitUserPassword(
	string oldPassword,
	string newPassword
)
```

###### Parameters

oldPasswordType: SystemString
The old password of the usernewPasswordType: SystemString
The new password for the user

###### Return Value

Type: Task

#### See Also

###### Reference

[OrganisationUnitManager Class](#group-psrapi-managers-organisationunitmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OrganisationUnitManager.ChangeOrganisationUnitPassword Method

Changes the password of the user with the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task ChangeOrganisationUnitPassword(
	Guid userId,
	byte[] oldHash,
	byte[] newHash,
	byte[] newSalt,
	byte[] newEncryptedPrivateKey,
	Nullable<MtoHashAlgorithm> hashAlgorithm
)
```

###### Parameters

userIdType: SystemGuid
oldHashType: SystemByte
newHashType: SystemByte
newSaltType: SystemByte
newEncryptedPrivateKeyType: SystemByte
hashAlgorithmType: SystemNullableMtoHashAlgorithm

###### Return Value

Type: Task

#### See Also

###### Reference

[OrganisationUnitManager Class](#group-psrapi-managers-organisationunitmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OrganisationUnitManager.DeleteOrganisationUnitGroup Method

Deletes the given organisation unit group.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task DeleteOrganisationUnitGroup(
	PsrOrganisationUnitGroup organisationUnitGroup
)
```

###### Parameters

organisationUnitGroupType: [PsrApi.DataPsrOrganisationUnitGroup](data-models.md#group-psrapi-data-psrorganisationunitgroup)
Group that should be deleted.

###### Return Value

Type: Task

#### See Also

###### Reference

[OrganisationUnitManager Class](#group-psrapi-managers-organisationunitmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OrganisationUnitManager.DeleteOrganisationUnitUser Method

Deletes the given organisation unit user.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task DeleteOrganisationUnitUser(
	PsrOrganisationUnitUser organisationUnitUser
)
```

###### Parameters

organisationUnitUserType: [PsrApi.DataPsrOrganisationUnitUser](data-models.md#group-psrapi-data-psrorganisationunituser)
User that should be deleted.

###### Return Value

Type: Task

#### See Also

###### Reference

[OrganisationUnitManager Class](#group-psrapi-managers-organisationunitmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OrganisationUnitManager.DoesCurrentUserNeedToChangePassword Method

Returns, if the current user need to change his password.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<bool> DoesCurrentUserNeedToChangePassword()
```

###### Return Value

Type: TaskBoolean

#### See Also

###### Reference

[OrganisationUnitManager Class](#group-psrapi-managers-organisationunitmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OrganisationUnitManager.GetGroupInvolvedOrganisationUnit Method

Returns a list of IDs of organisation units that are involved in the group with the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IList<Guid>> GetGroupInvolvedOrganisationUnit(
	Guid dataId
)
```

###### Parameters

dataIdType: SystemGuid
ID of the group.

###### Return Value

Type: TaskIListGuid

#### See Also

###### Reference

[OrganisationUnitManager Class](#group-psrapi-managers-organisationunitmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OrganisationUnitManager.GetOrganisationUnitGroup Method

Returns the organisation unit group matching the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrOrganisationUnitGroup> GetOrganisationUnitGroup(
	Guid groupId
)
```

###### Parameters

groupIdType: SystemGuid

###### Return Value

Type: Task[PsrOrganisationUnitGroup](data-models.md#group-psrapi-data-psrorganisationunitgroup)

#### See Also

###### Reference

[OrganisationUnitManager Class](#group-psrapi-managers-organisationunitmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OrganisationUnitManager.GetOrganisationUnitImageSource Method

Returns the base64 encoded image of the organisation unit.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<string> GetOrganisationUnitImageSource(
	Guid organisationId
)
```

###### Parameters

organisationIdType: SystemGuid
ID of the organisation unit.

###### Return Value

Type: TaskString

#### See Also

###### Reference

[OrganisationUnitManager Class](#group-psrapi-managers-organisationunitmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OrganisationUnitManager.GetOrganisationUnitList Method

Returns a list of organisation units that match the given filter.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrOrganisationUnit>> GetOrganisationUnitList(
	PsrListFilter listFilter
)
```

###### Parameters

listFilterType: [PsrApi.DataPsrListFilter](data-models.md#group-psrapi-data-psrlistfilter)

###### Return Value

Type: TaskIEnumerable[PsrOrganisationUnit](data-models.md#group-psrapi-data-psrorganisationunit)

#### See Also

###### Reference

[OrganisationUnitManager Class](#group-psrapi-managers-organisationunitmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OrganisationUnitManager.GetOrganisationUnitListFilter Method

Returns the organisation unit list filter that was at last saved for the user or the default filter
if defaultFilter is set to true.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrListFilter> GetOrganisationUnitListFilter(
	bool defaultFilter
)
```

###### Parameters

defaultFilterType: SystemBoolean

###### Return Value

Type: Task[PsrListFilter](data-models.md#group-psrapi-data-psrlistfilter)

#### See Also

###### Reference

[OrganisationUnitManager Class](#group-psrapi-managers-organisationunitmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OrganisationUnitManager.GetOrganisationUnitStructure Method

Returns the organisation unit structure that matches the given filter.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrOrganisationUnitStructure>> GetOrganisationUnitStructure(
	PsrListFilter listFilter
)
```

###### Parameters

listFilterType: [PsrApi.DataPsrListFilter](data-models.md#group-psrapi-data-psrlistfilter)

###### Return Value

Type: TaskIEnumerable[PsrOrganisationUnitStructure](data-models.md#group-psrapi-data-psrorganisationunitstructure)

#### See Also

###### Reference

[OrganisationUnitManager Class](#group-psrapi-managers-organisationunitmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OrganisationUnitManager.GetOrganisationUnitUser Method

Returns the organisation unit user matching the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrOrganisationUnitUser> GetOrganisationUnitUser(
	Guid userId
)
```

###### Parameters

userIdType: SystemGuid

###### Return Value

Type: Task[PsrOrganisationUnitUser](data-models.md#group-psrapi-data-psrorganisationunituser)

#### See Also

###### Reference

[OrganisationUnitManager Class](#group-psrapi-managers-organisationunitmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OrganisationUnitManager.GetOrganisationUnitUserList Method

Returns a list of organisation unit users matching the given filter.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrOrganisationUnitUser>> GetOrganisationUnitUserList(
	PsrListFilter filter
)
```

###### Parameters

filterType: [PsrApi.DataPsrListFilter](data-models.md#group-psrapi-data-psrlistfilter)

###### Return Value

Type: TaskIEnumerable[PsrOrganisationUnitUser](data-models.md#group-psrapi-data-psrorganisationunituser)

#### See Also

###### Reference

[OrganisationUnitManager Class](#group-psrapi-managers-organisationunitmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OrganisationUnitManager.GetUserInvolvedOrganisationUnit Method

Returns a list of IDs of organisation units that are involved in the user with the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IList<Guid>> GetUserInvolvedOrganisationUnit(
	Guid dataId
)
```

###### Parameters

dataIdType: SystemGuid
ID of the user.

###### Return Value

Type: TaskIListGuid

#### See Also

###### Reference

[OrganisationUnitManager Class](#group-psrapi-managers-organisationunitmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OrganisationUnitManager.HasGroupMasterKeyMode Method

Returns if the group is secured with master key.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<bool> HasGroupMasterKeyMode(
	Guid id
)
```

###### Parameters

idType: SystemGuid
ID of the group.

###### Return Value

Type: TaskBoolean

#### See Also

###### Reference

[OrganisationUnitManager Class](#group-psrapi-managers-organisationunitmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OrganisationUnitManager.HasUserMasterKeyMode Method

Returns if the user is secured with master key.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<bool> HasUserMasterKeyMode(
	Guid id
)
```

###### Parameters

idType: SystemGuid
ID of the user.

###### Return Value

Type: TaskBoolean

#### See Also

###### Reference

[OrganisationUnitManager Class](#group-psrapi-managers-organisationunitmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OrganisationUnitManager.UpdateOrganisationUnitGroup Method

Updates the given organisation unit group.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task UpdateOrganisationUnitGroup(
	PsrOrganisationUnitGroup organisationUnitGroup
)
```

###### Parameters

organisationUnitGroupType: [PsrApi.DataPsrOrganisationUnitGroup](data-models.md#group-psrapi-data-psrorganisationunitgroup)
Group that should be updated.

###### Return Value

Type: Task

#### See Also

###### Reference

[OrganisationUnitManager Class](#group-psrapi-managers-organisationunitmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### OrganisationUnitManager.UpdateOrganisationUnitUser Method

Updates the given organisation unit user.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task UpdateOrganisationUnitUser(
	PsrOrganisationUnitUser organisationUnitUser
)
```

###### Parameters

organisationUnitUserType: [PsrApi.DataPsrOrganisationUnitUser](data-models.md#group-psrapi-data-psrorganisationunituser)
User that should be updated.

###### Return Value

Type: Task

#### See Also

###### Reference

[OrganisationUnitManager Class](#group-psrapi-managers-organisationunitmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)


<a id="group-psrapi-managers-passwordgeneratorseparator"></a>
## PasswordGeneratorSeparator

### PasswordGeneratorSeparator Enumeration

Possible separators for the phonetic password generator.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public enum PasswordGeneratorSeparator
```

#### See Also

###### Reference

[PsrApi.Managers Namespace](#group-psrapi-managers)


<a id="group-psrapi-managers-passwordmanager"></a>
## PasswordManager

### PasswordManager Class

Contains methods regarding passwords.

#### Inheritance Hierarchy

SystemObject
PsrApi.ManagersPasswordManager

#### Syntax

C#

```csharp
public class PasswordManager
```

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GeneratePhoneticPassword](#group-psrapi-managers-passwordmanager) | Generates a phonetic password. |
| [GeneratePhoneticPasswordStatic](#group-psrapi-managers-passwordmanager) | Generates a phonetic password. |
| [GeneratePolicyPassword](#group-psrapi-managers-passwordmanager) | Generates a password that matches the given policy. |
| [GeneratePolicyPasswordStatic](#group-psrapi-managers-passwordmanager) | Generates a password that matches the given policy. |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| [GetPasswordStrength](#group-psrapi-managers-passwordmanager) | Gets the strength of a given plaintext passwords between 0 and 100. |
| [GetPasswordStrengthStatic](#group-psrapi-managers-passwordmanager) | Static method to get the strength of a password between 0 and 100. |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |
| [ValidatePassword](#group-psrapi-managers-passwordmanager) | Validates a password against a given password policy. |

#### See Also

###### Reference

[PsrApi.Managers Namespace](#group-psrapi-managers)

### PasswordManager Methods

The [PasswordManager](#group-psrapi-managers-passwordmanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GeneratePhoneticPassword](#group-psrapi-managers-passwordmanager) | Generates a phonetic password. |
| [GeneratePhoneticPasswordStatic](#group-psrapi-managers-passwordmanager) | Generates a phonetic password. |
| [GeneratePolicyPassword](#group-psrapi-managers-passwordmanager) | Generates a password that matches the given policy. |
| [GeneratePolicyPasswordStatic](#group-psrapi-managers-passwordmanager) | Generates a password that matches the given policy. |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| [GetPasswordStrength](#group-psrapi-managers-passwordmanager) | Gets the strength of a given plaintext passwords between 0 and 100. |
| [GetPasswordStrengthStatic](#group-psrapi-managers-passwordmanager) | Static method to get the strength of a password between 0 and 100. |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |
| [ValidatePassword](#group-psrapi-managers-passwordmanager) | Validates a password against a given password policy. |

#### See Also

###### Reference

[PasswordManager Class](#group-psrapi-managers-passwordmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### PasswordManager.GeneratePhoneticPassword Method

Generates a phonetic password.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public string GeneratePhoneticPassword(
	int length = 8,
	int syllableCount = 1,
	PasswordGeneratorSeparator separator = PasswordGeneratorSeparator.None,
	bool useLeetSpeak = false
)
```

###### Parameters

length (Optional)Type: SystemInt32
syllableCount (Optional)Type: SystemInt32
separator (Optional)Type: [PsrApi.ManagersPasswordGeneratorSeparator](#group-psrapi-managers-passwordgeneratorseparator)
useLeetSpeak (Optional)Type: SystemBoolean

###### Return Value

Type: String

#### See Also

###### Reference

[PasswordManager Class](#group-psrapi-managers-passwordmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### PasswordManager.GeneratePhoneticPasswordStatic Method

Generates a phonetic password.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public static string GeneratePhoneticPasswordStatic(
	int length = 8,
	int syllableCount = 1,
	PasswordGeneratorSeparator separator = PasswordGeneratorSeparator.None,
	bool useLeetSpeak = false
)
```

###### Parameters

length (Optional)Type: SystemInt32
syllableCount (Optional)Type: SystemInt32
separator (Optional)Type: [PsrApi.ManagersPasswordGeneratorSeparator](#group-psrapi-managers-passwordgeneratorseparator)
useLeetSpeak (Optional)Type: SystemBoolean

###### Return Value

Type: String

#### See Also

###### Reference

[PasswordManager Class](#group-psrapi-managers-passwordmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### PasswordManager.GeneratePolicyPassword Method

Generates a password that matches the given policy.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public string GeneratePolicyPassword(
	PsrPolicy policy,
	List<string> usernames = null
)
```

###### Parameters

policyType: [PsrApi.DataPsrPolicy](data-models.md#group-psrapi-data-psrpolicy)
usernames (Optional)Type: System.Collections.GenericListString
(optional) list of usernames that should be taken into account when [NotAllowedPasswordUsername](data-models.md#group-psrapi-data-psrpolicy) is true.

###### Return Value

Type: String

#### See Also

###### Reference

[PasswordManager Class](#group-psrapi-managers-passwordmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### PasswordManager.GeneratePolicyPasswordStatic Method

Generates a password that matches the given policy.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public static string GeneratePolicyPasswordStatic(
	PsrPolicy policy,
	List<string> usernames = null
)
```

###### Parameters

policyType: [PsrApi.DataPsrPolicy](data-models.md#group-psrapi-data-psrpolicy)
usernames (Optional)Type: System.Collections.GenericListString
(optional) list of usernames that should be taken into account when [NotAllowedPasswordUsername](data-models.md#group-psrapi-data-psrpolicy) is true.

###### Return Value

Type: String

#### See Also

###### Reference

[PasswordManager Class](#group-psrapi-managers-passwordmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### PasswordManager.GetPasswordStrength Method

Gets the strength of a given plaintext passwords between 0 and 100.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public int GetPasswordStrength(
	string password
)
```

###### Parameters

passwordType: SystemString

###### Return Value

Type: Int32

#### See Also

###### Reference

[PasswordManager Class](#group-psrapi-managers-passwordmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### PasswordManager.GetPasswordStrengthStatic Method

Static method to get the strength of a password between 0 and 100.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public static int GetPasswordStrengthStatic(
	string password
)
```

###### Parameters

passwordType: SystemString
Password that should be checked

###### Return Value

Type: Int32

#### See Also

###### Reference

[PasswordManager Class](#group-psrapi-managers-passwordmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### PasswordManager.ValidatePassword Method

Validates a password against a given password policy.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public static PolicyPasswordValidationResult ValidatePassword(
	PsrPolicy policy,
	string password,
	List<string> usernames = null
)
```

###### Parameters

policyType: [PsrApi.DataPsrPolicy](data-models.md#group-psrapi-data-psrpolicy)
The policy to validate against.passwordType: SystemString
The password that should be validated against the policy.usernames (Optional)Type: System.Collections.GenericListString
(optional) list of usernames that should be taken into account when [NotAllowedPasswordUsername](data-models.md#group-psrapi-data-psrpolicy) is true.

###### Return Value

Type: [PolicyPasswordValidationResult](#group-psrapi-managers-policypasswordvalidationresult)

#### See Also

###### Reference

[PasswordManager Class](#group-psrapi-managers-passwordmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)


<a id="group-psrapi-managers-pendingrightmanager"></a>
## PendingRightManager

### PendingRightManager Class

Contains methods to manipulate pending data rights.

#### Inheritance Hierarchy

SystemObject
[PsrApi.ManagersBaseManager](#group-psrapi-managers-basemanager)
PsrApi.ManagersPendingRightManager

#### Syntax

C#

```csharp
public class PendingRightManager : BaseManager
```

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [ResolvePendingDataRightTasksByDataId](#group-psrapi-managers-pendingrightmanager) | Tries to resolve all pending data right tasks<br>of the object with the given ID. |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Managers Namespace](#group-psrapi-managers)

### PendingRightManager Methods

The [PendingRightManager](#group-psrapi-managers-pendingrightmanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [ResolvePendingDataRightTasksByDataId](#group-psrapi-managers-pendingrightmanager) | Tries to resolve all pending data right tasks<br>of the object with the given ID. |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PendingRightManager Class](#group-psrapi-managers-pendingrightmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### PendingRightManager.ResolvePendingDataRightTasksByDataId Method

Tries to resolve all pending data right tasks
of the object with the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task ResolvePendingDataRightTasksByDataId(
	Guid dataId
)
```

###### Parameters

dataIdType: SystemGuid

###### Return Value

Type: Task

#### See Also

###### Reference

[PendingRightManager Class](#group-psrapi-managers-pendingrightmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)


<a id="group-psrapi-managers-policymanager"></a>
## PolicyManager

### PolicyManager Class

Contains methods to manipulate policies. Policies are validation rules to validate passwords against.

#### Inheritance Hierarchy

SystemObject
[PsrApi.ManagersBaseManager](#group-psrapi-managers-basemanager)
PsrApi.ManagersPolicyManager

#### Syntax

C#

```csharp
public class PolicyManager : BaseManager
```

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GetCategoryPolicy](#group-psrapi-managers-policymanager) | Returns a policy that matches the given category. |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| [GetPolicies](#group-psrapi-managers-policymanager) | Returns a list of all available policies. |
| [GetPolicy](#group-psrapi-managers-policymanager) | Returns the policy that matches the given ID. |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Managers Namespace](#group-psrapi-managers)

### PolicyManager Methods

The [PolicyManager](#group-psrapi-managers-policymanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GetCategoryPolicy](#group-psrapi-managers-policymanager) | Returns a policy that matches the given category. |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| [GetPolicies](#group-psrapi-managers-policymanager) | Returns a list of all available policies. |
| [GetPolicy](#group-psrapi-managers-policymanager) | Returns the policy that matches the given ID. |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PolicyManager Class](#group-psrapi-managers-policymanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### PolicyManager.GetCategoryPolicy Method

Returns a policy that matches the given category.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrPolicy> GetCategoryPolicy(
	PsrPolicyCategory category
)
```

###### Parameters

categoryType: [PsrApi.Data.EnumsPsrPolicyCategory](enums-and-constants.md#group-psrapi-data-enums-psrpolicycategory)

###### Return Value

Type: Task[PsrPolicy](data-models.md#group-psrapi-data-psrpolicy)

#### See Also

###### Reference

[PolicyManager Class](#group-psrapi-managers-policymanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### PolicyManager.GetPolicies Method

Returns a list of all available policies.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IList<PsrPolicy>> GetPolicies()
```

###### Return Value

Type: TaskIList[PsrPolicy](data-models.md#group-psrapi-data-psrpolicy)

#### See Also

###### Reference

[PolicyManager Class](#group-psrapi-managers-policymanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### PolicyManager.GetPolicy Method

Returns the policy that matches the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrPolicy> GetPolicy(
	Guid policyId
)
```

###### Parameters

policyIdType: SystemGuid

###### Return Value

Type: Task[PsrPolicy](data-models.md#group-psrapi-data-psrpolicy)

#### See Also

###### Reference

[PolicyManager Class](#group-psrapi-managers-policymanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)


<a id="group-psrapi-managers-policypasswordvalidationresult"></a>
## PolicyPasswordValidationResult

### PolicyPasswordValidationResult Class

Result of a password validation.

#### Inheritance Hierarchy

SystemObject
PsrApi.ManagersPolicyPasswordValidationResult

#### Syntax

C#

```csharp
public class PolicyPasswordValidationResult
```

#### Constructors

| Name | Description |
| --- | --- |
| [PolicyPasswordValidationResult](#group-psrapi-managers-policypasswordvalidationresult) | Initializes a new instance of the PolicyPasswordValidationResult class |

#### Properties

| Name | Description |
| --- | --- |
| [Errors](#group-psrapi-managers-policypasswordvalidationresult) | Validation errors. |
| [IsValid](#group-psrapi-managers-policypasswordvalidationresult) | If the password matches the policy. |
| [MissingCategoryCount](#group-psrapi-managers-policypasswordvalidationresult) | Missing categories until [RequiredCategories](data-models.md#group-psrapi-data-psrpolicy) is fulfilled. |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Managers Namespace](#group-psrapi-managers)

### PolicyPasswordValidationResult Constructor

Initializes a new instance of the [PolicyPasswordValidationResult](#group-psrapi-managers-policypasswordvalidationresult) class

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public PolicyPasswordValidationResult()
```

#### See Also

###### Reference

[PolicyPasswordValidationResult Class](#group-psrapi-managers-policypasswordvalidationresult)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### PolicyPasswordValidationResult Properties

The [PolicyPasswordValidationResult](#group-psrapi-managers-policypasswordvalidationresult) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [Errors](#group-psrapi-managers-policypasswordvalidationresult) | Validation errors. |
| [IsValid](#group-psrapi-managers-policypasswordvalidationresult) | If the password matches the policy. |
| [MissingCategoryCount](#group-psrapi-managers-policypasswordvalidationresult) | Missing categories until [RequiredCategories](data-models.md#group-psrapi-data-psrpolicy) is fulfilled. |

#### See Also

###### Reference

[PolicyPasswordValidationResult Class](#group-psrapi-managers-policypasswordvalidationresult)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### PolicyPasswordValidationResult.Errors Property

Validation errors.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public List<PsrApiExceptionCode> Errors { get; set; }
```

###### Property Value

Type: List[PsrApiExceptionCode](enums-and-constants.md#group-psrapi-psrapiexceptioncode)

#### See Also

###### Reference

[PolicyPasswordValidationResult Class](#group-psrapi-managers-policypasswordvalidationresult)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### PolicyPasswordValidationResult.IsValid Property

If the password matches the policy.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public bool IsValid { get; set; }
```

###### Property Value

Type: Boolean

#### See Also

###### Reference

[PolicyPasswordValidationResult Class](#group-psrapi-managers-policypasswordvalidationresult)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### PolicyPasswordValidationResult.MissingCategoryCount Property

Missing categories until [RequiredCategories](data-models.md#group-psrapi-data-psrpolicy) is fulfilled.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public int MissingCategoryCount { get; set; }
```

###### Property Value

Type: Int32

#### See Also

###### Reference

[PolicyPasswordValidationResult Class](#group-psrapi-managers-policypasswordvalidationresult)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### PolicyPasswordValidationResult Methods

The [PolicyPasswordValidationResult](#group-psrapi-managers-policypasswordvalidationresult) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PolicyPasswordValidationResult Class](#group-psrapi-managers-policypasswordvalidationresult)

[PsrApi.Managers Namespace](#group-psrapi-managers)


<a id="group-psrapi-managers-rightmanager"></a>
## RightManager

### RightManager Class

Contains methods to manipulate data rights.

#### Inheritance Hierarchy

SystemObject
[PsrApi.ManagersBaseManager](#group-psrapi-managers-basemanager)
PsrApi.ManagersRightManager

#### Syntax

C#

```csharp
public class RightManager : BaseManager
```

#### Methods

| Name | Description |
| --- | --- |
| [AddLegitimateDataRight](#group-psrapi-managers-rightmanager) | Adds a new data right that corresponds to the given ID, legitimate ID and rights. |
| [BatchUpdateRights](#group-psrapi-managers-rightmanager) | Performs all data right updates that are determined by the batch right items. |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GetCurrentConnectionDataRightList](#group-psrapi-managers-rightmanager) | Returns a list of rights that the current session user has on the objects with the given IDs. |
| [GetCurrentConnectionDataRights](#group-psrapi-managers-rightmanager) | Returns the rights that the current session user has on the object with the given ID. |
| [GetDatabaseAdministratorDataRights](#group-psrapi-managers-rightmanager) | Returns the data rights with the given dataId which are database administrator. Does not include the rightkey in the datarights |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| [GetLegitimateDataRight](#group-psrapi-managers-rightmanager) | Returns the data right that matches the given ID, legitimate ID and rights. |
| [GetLegitimateDataRightCheckRoles](#group-psrapi-managers-rightmanager) | Returns the data right to the given object, the roles are taken into account. |
| [GetLegitimateDataRights](#group-psrapi-managers-rightmanager) | Returns a list of data rights that apply to the given ID. |
| [GetLegitimateDataRightsWithoutDeleted](#group-psrapi-managers-rightmanager) | Returns all data rights of the given data ID without deleted ones. |
| [GetLegitimateDataRightsWithTemporalRights](#group-psrapi-managers-rightmanager) | Returns a list of data rights that match the given ID and validity dates. |
| [GetMultiLegitimateDataRights](#group-psrapi-managers-rightmanager) | Returns a list of rights of the provided data IDs. |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [RemoveAllLegitimateDataRights](#group-psrapi-managers-rightmanager) | Removes all the data rights that match the given ID.<br>WARNING: If allRights is set to true, even the current session user's data right on<br>the object is deleted. |
| [RemoveAllLegitimateDataRightsExcept](#group-psrapi-managers-rightmanager) | Removes all rights from an object |
| [RemoveCurrentOrganisationUnitFromRights](#group-psrapi-managers-rightmanager) | Deletes the data right that matches the given ID and the current user. |
| [RemoveLegitimateDataRight](#group-psrapi-managers-rightmanager) | Removes the data right that matches the given ID, legitimate ID and rights. |
| [RequestDataRight](#group-psrapi-managers-rightmanager) | Requests permissions on the data with the given ID and type for the current user. |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |
| [UpdateLegitimateDataRight](#group-psrapi-managers-rightmanager) | Updates the rights of a data right that matches the given ID and legitimate ID. |
| [UpdateLegitimateDataRightKey](#group-psrapi-managers-rightmanager) | Updates the right key of the data right that matches the given ID and legitimate ID. |
| [UpdateLegitimateDataRightOwnerRight](#group-psrapi-managers-rightmanager) | Updates the owner right of the data right that matches the given ID and legitimate ID. |
| [UpdateLegitimateDataRightSecuredData](#group-psrapi-managers-rightmanager) | Updates the secured data state of the data right that matches the given ID and legitimate ID. |
| [UpdateLegitimateDataRightValidDate](#group-psrapi-managers-rightmanager) | Updates the validity dates of the data right that matches the given ID and legitimate ID. |
| [UpdateLegitimateSealId](#group-psrapi-managers-rightmanager) | Updates the seal ID of the data right that matches the given ID and legitimate ID. |

#### See Also

###### Reference

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RightManager Methods

The [RightManager](#group-psrapi-managers-rightmanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| [AddLegitimateDataRight](#group-psrapi-managers-rightmanager) | Adds a new data right that corresponds to the given ID, legitimate ID and rights. |
| [BatchUpdateRights](#group-psrapi-managers-rightmanager) | Performs all data right updates that are determined by the batch right items. |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GetCurrentConnectionDataRightList](#group-psrapi-managers-rightmanager) | Returns a list of rights that the current session user has on the objects with the given IDs. |
| [GetCurrentConnectionDataRights](#group-psrapi-managers-rightmanager) | Returns the rights that the current session user has on the object with the given ID. |
| [GetDatabaseAdministratorDataRights](#group-psrapi-managers-rightmanager) | Returns the data rights with the given dataId which are database administrator. Does not include the rightkey in the datarights |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| [GetLegitimateDataRight](#group-psrapi-managers-rightmanager) | Returns the data right that matches the given ID, legitimate ID and rights. |
| [GetLegitimateDataRightCheckRoles](#group-psrapi-managers-rightmanager) | Returns the data right to the given object, the roles are taken into account. |
| [GetLegitimateDataRights](#group-psrapi-managers-rightmanager) | Returns a list of data rights that apply to the given ID. |
| [GetLegitimateDataRightsWithoutDeleted](#group-psrapi-managers-rightmanager) | Returns all data rights of the given data ID without deleted ones. |
| [GetLegitimateDataRightsWithTemporalRights](#group-psrapi-managers-rightmanager) | Returns a list of data rights that match the given ID and validity dates. |
| [GetMultiLegitimateDataRights](#group-psrapi-managers-rightmanager) | Returns a list of rights of the provided data IDs. |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [RemoveAllLegitimateDataRights](#group-psrapi-managers-rightmanager) | Removes all the data rights that match the given ID.<br>WARNING: If allRights is set to true, even the current session user's data right on<br>the object is deleted. |
| [RemoveAllLegitimateDataRightsExcept](#group-psrapi-managers-rightmanager) | Removes all rights from an object |
| [RemoveCurrentOrganisationUnitFromRights](#group-psrapi-managers-rightmanager) | Deletes the data right that matches the given ID and the current user. |
| [RemoveLegitimateDataRight](#group-psrapi-managers-rightmanager) | Removes the data right that matches the given ID, legitimate ID and rights. |
| [RequestDataRight](#group-psrapi-managers-rightmanager) | Requests permissions on the data with the given ID and type for the current user. |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |
| [UpdateLegitimateDataRight](#group-psrapi-managers-rightmanager) | Updates the rights of a data right that matches the given ID and legitimate ID. |
| [UpdateLegitimateDataRightKey](#group-psrapi-managers-rightmanager) | Updates the right key of the data right that matches the given ID and legitimate ID. |
| [UpdateLegitimateDataRightOwnerRight](#group-psrapi-managers-rightmanager) | Updates the owner right of the data right that matches the given ID and legitimate ID. |
| [UpdateLegitimateDataRightSecuredData](#group-psrapi-managers-rightmanager) | Updates the secured data state of the data right that matches the given ID and legitimate ID. |
| [UpdateLegitimateDataRightValidDate](#group-psrapi-managers-rightmanager) | Updates the validity dates of the data right that matches the given ID and legitimate ID. |
| [UpdateLegitimateSealId](#group-psrapi-managers-rightmanager) | Updates the seal ID of the data right that matches the given ID and legitimate ID. |

#### See Also

###### Reference

[RightManager Class](#group-psrapi-managers-rightmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RightManager.AddLegitimateDataRight Method

Adds a new data right that corresponds to the given ID, legitimate ID and rights.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task AddLegitimateDataRight(
	Guid dataId,
	Guid legitimateId,
	PsrRights rights
)
```

###### Parameters

dataIdType: SystemGuid
legitimateIdType: SystemGuid
rightsType: [PsrApi.Data.EnumsPsrRights](enums-and-constants.md#group-psrapi-data-enums-psrrights)

###### Return Value

Type: Task

#### See Also

###### Reference

[RightManager Class](#group-psrapi-managers-rightmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RightManager.BatchUpdateRights Method

Performs all data right updates that are determined by the batch right items.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task BatchUpdateRights(
	List<PsrBatchRightItem> items
)
```

###### Parameters

itemsType: System.Collections.GenericList[PsrBatchRightItem](data-models.md#group-psrapi-data-psrbatchrightitem)

###### Return Value

Type: Task

#### See Also

###### Reference

[RightManager Class](#group-psrapi-managers-rightmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RightManager.GetCurrentConnectionDataRightList Method

Returns a list of rights that the current session user has on the objects with the given IDs.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<List<Nullable<PsrRights>>> GetCurrentConnectionDataRightList(
	List<Guid> dataIds
)
```

###### Parameters

dataIdsType: System.Collections.GenericListGuid

###### Return Value

Type: TaskListNullable[PsrRights](enums-and-constants.md#group-psrapi-data-enums-psrrights)

#### See Also

###### Reference

[RightManager Class](#group-psrapi-managers-rightmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RightManager.GetCurrentConnectionDataRights Method

Returns the rights that the current session user has on the object with the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<Nullable<PsrRights>> GetCurrentConnectionDataRights(
	Guid dataId
)
```

###### Parameters

dataIdType: SystemGuid

###### Return Value

Type: TaskNullable[PsrRights](enums-and-constants.md#group-psrapi-data-enums-psrrights)

#### See Also

###### Reference

[RightManager Class](#group-psrapi-managers-rightmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RightManager.GetDatabaseAdministratorDataRights Method

Returns the data rights with the given dataId which are database administrator. Does not include the rightkey in the datarights

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<List<PsrDataRight>> GetDatabaseAdministratorDataRights(
	Guid dataId
)
```

###### Parameters

dataIdType: SystemGuid
The id of the data

###### Return Value

Type: TaskList[PsrDataRight](data-models.md#group-psrapi-data-psrdataright)
List of datarights for the database admins which have right to the data. rightkey will be set to null

#### See Also

###### Reference

[RightManager Class](#group-psrapi-managers-rightmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RightManager.GetLegitimateDataRight Method

Returns the data right that matches the given ID, legitimate ID and rights.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrDataRight> GetLegitimateDataRight(
	Guid dataId,
	Guid legitimateId,
	PsrRights rights
)
```

###### Parameters

dataIdType: SystemGuid
legitimateIdType: SystemGuid
rightsType: [PsrApi.Data.EnumsPsrRights](enums-and-constants.md#group-psrapi-data-enums-psrrights)

###### Return Value

Type: Task[PsrDataRight](data-models.md#group-psrapi-data-psrdataright)

#### See Also

###### Reference

[RightManager Class](#group-psrapi-managers-rightmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RightManager.GetLegitimateDataRightCheckRoles Method

Returns the data right to the given object, the roles are taken into account.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrDataRight> GetLegitimateDataRightCheckRoles(
	Guid dataId,
	Guid legitimateId,
	PsrRights rights
)
```

###### Parameters

dataIdType: SystemGuid
ID of the object.legitimateIdType: SystemGuid
ID of the object.rightsType: [PsrApi.Data.EnumsPsrRights](enums-and-constants.md#group-psrapi-data-enums-psrrights)
Rights that should be checked.

###### Return Value

Type: Task[PsrDataRight](data-models.md#group-psrapi-data-psrdataright)

#### See Also

###### Reference

[RightManager Class](#group-psrapi-managers-rightmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RightManager.GetLegitimateDataRights Method

Returns a list of data rights that apply to the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrDataRight>> GetLegitimateDataRights(
	Guid dataId,
	bool checkRights = false,
	bool showDeletedNames = false
)
```

###### Parameters

dataIdType: SystemGuid
checkRights (Optional)Type: SystemBoolean
showDeletedNames (Optional)Type: SystemBoolean

###### Return Value

Type: TaskIEnumerable[PsrDataRight](data-models.md#group-psrapi-data-psrdataright)

#### See Also

###### Reference

[RightManager Class](#group-psrapi-managers-rightmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RightManager.GetLegitimateDataRightsWithTemporalRights Method

Returns a list of data rights that match the given ID and validity dates.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrDataRight>> GetLegitimateDataRightsWithTemporalRights(
	Guid dataId,
	DateTime validFrom,
	DateTime validTo
)
```

###### Parameters

dataIdType: SystemGuid
validFromType: SystemDateTime
validToType: SystemDateTime

###### Return Value

Type: TaskIEnumerable[PsrDataRight](data-models.md#group-psrapi-data-psrdataright)

#### See Also

###### Reference

[RightManager Class](#group-psrapi-managers-rightmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RightManager.GetLegitimateDataRightsWithoutDeleted Method

Returns all data rights of the given data ID without deleted ones.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrDataRight>> GetLegitimateDataRightsWithoutDeleted(
	Guid dataId
)
```

###### Parameters

dataIdType: SystemGuid
ID of the object.

###### Return Value

Type: TaskIEnumerable[PsrDataRight](data-models.md#group-psrapi-data-psrdataright)

#### See Also

###### Reference

[RightManager Class](#group-psrapi-managers-rightmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RightManager.GetMultiLegitimateDataRights Method

Returns a list of rights of the provided data IDs.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrDataRight>> GetMultiLegitimateDataRights(
	List<Guid> dataIds,
	bool checkRights = false,
	bool showDeletedNames = false
)
```

###### Parameters

dataIdsType: System.Collections.GenericListGuid
List of IDs of objects.checkRights (Optional)Type: SystemBoolean
If data rights to the legitimate should be checked.showDeletedNames (Optional)Type: SystemBoolean
If deleted users/roles should be resolved correctly.

###### Return Value

Type: TaskIEnumerable[PsrDataRight](data-models.md#group-psrapi-data-psrdataright)

#### See Also

###### Reference

[RightManager Class](#group-psrapi-managers-rightmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RightManager.RemoveAllLegitimateDataRights Method

Removes all the data rights that match the given ID.
WARNING: If allRights is set to true, even the current session user's data right on
the object is deleted.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<Nullable<Guid>> RemoveAllLegitimateDataRights(
	Guid dataId,
	bool allRights = false
)
```

###### Parameters

dataIdType: SystemGuid
allRights (Optional)Type: SystemBoolean

###### Return Value

Type: TaskNullableGuid

#### See Also

###### Reference

[RightManager Class](#group-psrapi-managers-rightmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RightManager.RemoveAllLegitimateDataRightsExcept Method

Removes all rights from an object

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<Nullable<Guid>> RemoveAllLegitimateDataRightsExcept(
	Guid dataId,
	List<Guid> excludedLegitimateIds,
	bool excludeCurrentUserOrRoleRight
)
```

###### Parameters

dataIdType: SystemGuid
DataId of the object whose rights should be deletedexcludedLegitimateIdsType: System.Collections.GenericListGuid
List of legitimates whose rights should not be deletedexcludeCurrentUserOrRoleRightType: SystemBoolean
Should at least one right for the current user stay in the database

###### Return Value

Type: TaskNullableGuid
The id of the not deleted right from the current user or users role

#### See Also

###### Reference

[RightManager Class](#group-psrapi-managers-rightmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RightManager.RemoveCurrentOrganisationUnitFromRights Method

Deletes the data right that matches the given ID and the current user.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task RemoveCurrentOrganisationUnitFromRights(
	Guid dataId
)
```

###### Parameters

dataIdType: SystemGuid

###### Return Value

Type: Task

#### See Also

###### Reference

[RightManager Class](#group-psrapi-managers-rightmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RightManager.RemoveLegitimateDataRight Method

Removes the data right that matches the given ID, legitimate ID and rights.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task RemoveLegitimateDataRight(
	Guid dataId,
	Guid legitimateId,
	PsrRights rights
)
```

###### Parameters

dataIdType: SystemGuid
legitimateIdType: SystemGuid
rightsType: [PsrApi.Data.EnumsPsrRights](enums-and-constants.md#group-psrapi-data-enums-psrrights)

###### Return Value

Type: Task

#### See Also

###### Reference

[RightManager Class](#group-psrapi-managers-rightmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RightManager.RequestDataRight Method

Requests permissions on the data with the given ID and type for the current user.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task RequestDataRight(
	Guid dataId,
	PsrEntityObjectType type
)
```

###### Parameters

dataIdType: SystemGuid
ID of the object.typeType: [PsrApi.Data.EnumsPsrEntityObjectType](enums-and-constants.md#group-psrapi-data-enums-psrentityobjecttype)
Type of the object.

###### Return Value

Type: Task

#### See Also

###### Reference

[RightManager Class](#group-psrapi-managers-rightmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RightManager.UpdateLegitimateDataRight Method

Updates the rights of a data right that matches the given ID and legitimate ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task UpdateLegitimateDataRight(
	Guid dataId,
	Guid legitimateId,
	PsrRights rights
)
```

###### Parameters

dataIdType: SystemGuid
legitimateIdType: SystemGuid
rightsType: [PsrApi.Data.EnumsPsrRights](enums-and-constants.md#group-psrapi-data-enums-psrrights)

###### Return Value

Type: Task

#### See Also

###### Reference

[RightManager Class](#group-psrapi-managers-rightmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RightManager.UpdateLegitimateDataRightKey Method

Updates the right key of the data right that matches the given ID and legitimate ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task UpdateLegitimateDataRightKey(
	Guid dataId,
	Guid legitimateId,
	byte[] rightKey
)
```

###### Parameters

dataIdType: SystemGuid
legitimateIdType: SystemGuid
rightKeyType: SystemByte

###### Return Value

Type: Task

#### See Also

###### Reference

[RightManager Class](#group-psrapi-managers-rightmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RightManager.UpdateLegitimateDataRightOwnerRight Method

Updates the owner right of the data right that matches the given ID and legitimate ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task UpdateLegitimateDataRightOwnerRight(
	Guid dataId,
	Guid legitimateId,
	bool ownerRight
)
```

###### Parameters

dataIdType: SystemGuid
legitimateIdType: SystemGuid
ownerRightType: SystemBoolean

###### Return Value

Type: Task

#### See Also

###### Reference

[RightManager Class](#group-psrapi-managers-rightmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RightManager.UpdateLegitimateDataRightSecuredData Method

Updates the secured data state of the data right that matches the given ID and legitimate ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task UpdateLegitimateDataRightSecuredData(
	Guid dataId,
	Guid legitimateId,
	bool secured
)
```

###### Parameters

dataIdType: SystemGuid
legitimateIdType: SystemGuid
securedType: SystemBoolean

###### Return Value

Type: Task

#### See Also

###### Reference

[RightManager Class](#group-psrapi-managers-rightmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RightManager.UpdateLegitimateDataRightValidDate Method

Updates the validity dates of the data right that matches the given ID and legitimate ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task UpdateLegitimateDataRightValidDate(
	Guid dataId,
	Guid legitimateId,
	Nullable<DateTime> validFrom,
	Nullable<DateTime> validTo
)
```

###### Parameters

dataIdType: SystemGuid
legitimateIdType: SystemGuid
validFromType: SystemNullableDateTime
validToType: SystemNullableDateTime

###### Return Value

Type: Task

#### See Also

###### Reference

[RightManager Class](#group-psrapi-managers-rightmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RightManager.UpdateLegitimateSealId Method

Updates the seal ID of the data right that matches the given ID and legitimate ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task UpdateLegitimateSealId(
	Guid dataId,
	Guid legitimateId,
	Nullable<Guid> sealId
)
```

###### Parameters

dataIdType: SystemGuid
legitimateIdType: SystemGuid
sealIdType: SystemNullableGuid

###### Return Value

Type: Task

#### See Also

###### Reference

[RightManager Class](#group-psrapi-managers-rightmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)


<a id="group-psrapi-managers-rolemanager"></a>
## RoleManager

### RoleManager Class

Contains methods to manipulate roles.

#### Inheritance Hierarchy

SystemObject
[PsrApi.ManagersBaseManager](#group-psrapi-managers-basemanager)
PsrApi.ManagersRoleManager

#### Syntax

C#

```csharp
public class RoleManager : BaseManager
```

#### Methods

| Name | Description |
| --- | --- |
| [AddRole](#group-psrapi-managers-rolemanager) | Adds a new role. |
| [DeleteRole](#group-psrapi-managers-rolemanager) | Deletes a role. |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| [GetRole](#group-psrapi-managers-rolemanager) | Returns the role that matches the given ID. |
| [GetRoleInvolvedOrganisationUnit](#group-psrapi-managers-rolemanager) | Returns a list of IDs of involved organisation units of a historic entry. |
| [GetRoleList](#group-psrapi-managers-rolemanager) | Returns a list of roles that match the given filter. |
| [GetRoleListFilter](#group-psrapi-managers-rolemanager) | Returns the container list filter that was at last saved for the user or the default filter<br>if defaultFilter is set to true. |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [GetUserRoles](#group-psrapi-managers-rolemanager) | Returns a list of roles that the user with the given ID is member of. |
| [GetUsersInRole](#group-psrapi-managers-rolemanager) | Returns a list of organisation unit users that are members of the role with the given ID. |
| [HasRoleMasterKeyMode](#group-psrapi-managers-rolemanager) | Determines if the role with the given ID is in Master Key mode. |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |
| [UpdateRole](#group-psrapi-managers-rolemanager) | Updates the given role. |

#### See Also

###### Reference

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RoleManager Methods

The [RoleManager](#group-psrapi-managers-rolemanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| [AddRole](#group-psrapi-managers-rolemanager) | Adds a new role. |
| [DeleteRole](#group-psrapi-managers-rolemanager) | Deletes a role. |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| [GetRole](#group-psrapi-managers-rolemanager) | Returns the role that matches the given ID. |
| [GetRoleInvolvedOrganisationUnit](#group-psrapi-managers-rolemanager) | Returns a list of IDs of involved organisation units of a historic entry. |
| [GetRoleList](#group-psrapi-managers-rolemanager) | Returns a list of roles that match the given filter. |
| [GetRoleListFilter](#group-psrapi-managers-rolemanager) | Returns the container list filter that was at last saved for the user or the default filter<br>if defaultFilter is set to true. |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [GetUserRoles](#group-psrapi-managers-rolemanager) | Returns a list of roles that the user with the given ID is member of. |
| [GetUsersInRole](#group-psrapi-managers-rolemanager) | Returns a list of organisation unit users that are members of the role with the given ID. |
| [HasRoleMasterKeyMode](#group-psrapi-managers-rolemanager) | Determines if the role with the given ID is in Master Key mode. |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |
| [UpdateRole](#group-psrapi-managers-rolemanager) | Updates the given role. |

#### See Also

###### Reference

[RoleManager Class](#group-psrapi-managers-rolemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RoleManager.AddRole Method

Adds a new role.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrRole> AddRole(
	PsrRole role,
	byte[] publicKey,
	byte[] encryptedRolePrivateKey
)
```

###### Parameters

roleType: [PsrApi.DataPsrRole](data-models.md#group-psrapi-data-psrrole)
publicKeyType: SystemByte
encryptedRolePrivateKeyType: SystemByte

###### Return Value

Type: Task[PsrRole](data-models.md#group-psrapi-data-psrrole)

#### See Also

###### Reference

[RoleManager Class](#group-psrapi-managers-rolemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RoleManager.DeleteRole Method

Deletes a role.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task DeleteRole(
	PsrRole role
)
```

###### Parameters

roleType: [PsrApi.DataPsrRole](data-models.md#group-psrapi-data-psrrole)

###### Return Value

Type: Task

#### See Also

###### Reference

[RoleManager Class](#group-psrapi-managers-rolemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RoleManager.GetRole Method

Returns the role that matches the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrRole> GetRole(
	Guid roleId
)
```

###### Parameters

roleIdType: SystemGuid

###### Return Value

Type: Task[PsrRole](data-models.md#group-psrapi-data-psrrole)

#### See Also

###### Reference

[RoleManager Class](#group-psrapi-managers-rolemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RoleManager.GetRoleInvolvedOrganisationUnit Method

Returns a list of IDs of involved organisation units of a historic entry.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IList<Guid>> GetRoleInvolvedOrganisationUnit(
	Guid dataId
)
```

###### Parameters

dataIdType: SystemGuid
ID of the object.

###### Return Value

Type: TaskIListGuid

#### See Also

###### Reference

[RoleManager Class](#group-psrapi-managers-rolemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RoleManager.GetRoleList Method

Returns a list of roles that match the given filter.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrRole>> GetRoleList(
	PsrListFilter filter
)
```

###### Parameters

filterType: [PsrApi.DataPsrListFilter](data-models.md#group-psrapi-data-psrlistfilter)

###### Return Value

Type: TaskIEnumerable[PsrRole](data-models.md#group-psrapi-data-psrrole)

#### See Also

###### Reference

[RoleManager Class](#group-psrapi-managers-rolemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RoleManager.GetRoleListFilter Method

Returns the container list filter that was at last saved for the user or the default filter
if defaultFilter is set to true.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrListFilter> GetRoleListFilter(
	bool defaultFilter
)
```

###### Parameters

defaultFilterType: SystemBoolean

###### Return Value

Type: Task[PsrListFilter](data-models.md#group-psrapi-data-psrlistfilter)

#### See Also

###### Reference

[RoleManager Class](#group-psrapi-managers-rolemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RoleManager.GetUserRoles Method

Returns a list of roles that the user with the given ID is member of.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IList<PsrRole>> GetUserRoles(
	Guid userId
)
```

###### Parameters

userIdType: SystemGuid

###### Return Value

Type: TaskIList[PsrRole](data-models.md#group-psrapi-data-psrrole)

#### See Also

###### Reference

[RoleManager Class](#group-psrapi-managers-rolemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RoleManager.GetUsersInRole Method

Returns a list of organisation unit users that are members of the role with the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IList<PsrOrganisationUnitUser>> GetUsersInRole(
	Guid roleId
)
```

###### Parameters

roleIdType: SystemGuid

###### Return Value

Type: TaskIList[PsrOrganisationUnitUser](data-models.md#group-psrapi-data-psrorganisationunituser)

#### See Also

###### Reference

[RoleManager Class](#group-psrapi-managers-rolemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RoleManager.HasRoleMasterKeyMode Method

Determines if the role with the given ID is in Master Key mode.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<bool> HasRoleMasterKeyMode(
	Guid id
)
```

###### Parameters

idType: SystemGuid

###### Return Value

Type: TaskBoolean

#### See Also

###### Reference

[RoleManager Class](#group-psrapi-managers-rolemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### RoleManager.UpdateRole Method

Updates the given role.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task UpdateRole(
	PsrRole role
)
```

###### Parameters

roleType: [PsrApi.DataPsrRole](data-models.md#group-psrapi-data-psrrole)

###### Return Value

Type: Task

#### See Also

###### Reference

[RoleManager Class](#group-psrapi-managers-rolemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)


<a id="group-psrapi-managers-sealmanager"></a>
## SealManager

### SealManager Class

Contains methods to manipulate seals.

#### Inheritance Hierarchy

SystemObject
[PsrApi.ManagersBaseManager](#group-psrapi-managers-basemanager)
PsrApi.ManagersSealManager

#### Syntax

C#

```csharp
public class SealManager : BaseManager
```

#### Methods

| Name | Description |
| --- | --- |
| [AddSeal](#group-psrapi-managers-sealmanager) | Adds a new seal. |
| [BreakSeal](#group-psrapi-managers-sealmanager) | Breaks the seal with the given ID if possible. |
| [DeleteKeyReleasesForUser](#group-psrapi-managers-sealmanager) | Delets all seal key releases for the keys of the given seal for the legitimate with the given ID. |
| [DeleteSeal](#group-psrapi-managers-sealmanager) | Deletes the seal with the given ID. |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| [GetSeal](#group-psrapi-managers-sealmanager) | Returns the seal that matches the given ID. |
| [GetSealKey](#group-psrapi-managers-sealmanager) | Returns a encrypted seal key. |
| [GetSealOpenType](#group-psrapi-managers-sealmanager) | Obsolete.<br><br>Gets the open type of the seal. |
| [GetSealOpenTypeBySealId](#group-psrapi-managers-sealmanager) | Gets the open type of the seal. |
| [GetSealTemplateInvolvedOrganisationUnit](#group-psrapi-managers-sealmanager) | Returns a list of IDs of involved organisation units of a seal template. |
| [GetSealTemplateList](#group-psrapi-managers-sealmanager) | Returns a list of seal templates that match the given filter. |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [HasRelease](#group-psrapi-managers-sealmanager) | Determines if the seal has a release for the legitimate with the given ID. |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |
| [UpdateSeal](#group-psrapi-managers-sealmanager) | Updates a seal. All releases are resetted. |
| [UpdateSealKeyRelease](#group-psrapi-managers-sealmanager) | Updates or adds a seal key release. |

#### See Also

###### Reference

[PsrApi.Managers Namespace](#group-psrapi-managers)

### SealManager Methods

The [SealManager](#group-psrapi-managers-sealmanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| [AddSeal](#group-psrapi-managers-sealmanager) | Adds a new seal. |
| [BreakSeal](#group-psrapi-managers-sealmanager) | Breaks the seal with the given ID if possible. |
| [DeleteKeyReleasesForUser](#group-psrapi-managers-sealmanager) | Delets all seal key releases for the keys of the given seal for the legitimate with the given ID. |
| [DeleteSeal](#group-psrapi-managers-sealmanager) | Deletes the seal with the given ID. |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| [GetSeal](#group-psrapi-managers-sealmanager) | Returns the seal that matches the given ID. |
| [GetSealKey](#group-psrapi-managers-sealmanager) | Returns a encrypted seal key. |
| [GetSealOpenType](#group-psrapi-managers-sealmanager) | Obsolete.<br><br>Gets the open type of the seal. |
| [GetSealOpenTypeBySealId](#group-psrapi-managers-sealmanager) | Gets the open type of the seal. |
| [GetSealTemplateInvolvedOrganisationUnit](#group-psrapi-managers-sealmanager) | Returns a list of IDs of involved organisation units of a seal template. |
| [GetSealTemplateList](#group-psrapi-managers-sealmanager) | Returns a list of seal templates that match the given filter. |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [HasRelease](#group-psrapi-managers-sealmanager) | Determines if the seal has a release for the legitimate with the given ID. |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |
| [UpdateSeal](#group-psrapi-managers-sealmanager) | Updates a seal. All releases are resetted. |
| [UpdateSealKeyRelease](#group-psrapi-managers-sealmanager) | Updates or adds a seal key release. |

#### See Also

###### Reference

[SealManager Class](#group-psrapi-managers-sealmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### SealManager.AddSeal Method

Adds a new seal.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrSeal> AddSeal(
	PsrSeal seal,
	Guid dataId,
	PsrEntityObjectType dataType
)
```

###### Parameters

sealType: [PsrApi.DataPsrSeal](data-models.md#group-psrapi-data-psrseal)
The new seal that should be added.dataIdType: SystemGuid
ID of the object that the seal belongs to.dataTypeType: [PsrApi.Data.EnumsPsrEntityObjectType](enums-and-constants.md#group-psrapi-data-enums-psrentityobjecttype)
Type of the object that the seal belongs to.

###### Return Value

Type: Task[PsrSeal](data-models.md#group-psrapi-data-psrseal)

#### See Also

###### Reference

[SealManager Class](#group-psrapi-managers-sealmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### SealManager.BreakSeal Method

Breaks the seal with the given ID if possible.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrSeal> BreakSeal(
	Guid sealId
)
```

###### Parameters

sealIdType: SystemGuid

###### Return Value

Type: Task[PsrSeal](data-models.md#group-psrapi-data-psrseal)

#### See Also

###### Reference

[SealManager Class](#group-psrapi-managers-sealmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### SealManager.DeleteKeyReleasesForUser Method

Delets all seal key releases for the keys of the given seal for the legitimate with the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task DeleteKeyReleasesForUser(
	PsrSeal seal,
	Guid legitimateId
)
```

###### Parameters

sealType: [PsrApi.DataPsrSeal](data-models.md#group-psrapi-data-psrseal)
Seal.legitimateIdType: SystemGuid
ID of the legitimate.

###### Return Value

Type: Task

#### See Also

###### Reference

[SealManager Class](#group-psrapi-managers-sealmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### SealManager.DeleteSeal Method

Deletes the seal with the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task DeleteSeal(
	Guid sealId
)
```

###### Parameters

sealIdType: SystemGuid
ID of the seal that should be deleted.

###### Return Value

Type: Task

#### See Also

###### Reference

[SealManager Class](#group-psrapi-managers-sealmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### SealManager.GetSeal Method

Returns the seal that matches the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrSeal> GetSeal(
	Guid sealId
)
```

###### Parameters

sealIdType: SystemGuid

###### Return Value

Type: Task[PsrSeal](data-models.md#group-psrapi-data-psrseal)

#### See Also

###### Reference

[SealManager Class](#group-psrapi-managers-sealmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### SealManager.GetSealKey Method

Returns a encrypted seal key.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrSealKey> GetSealKey(
	Guid sealKeyId,
	Guid legitimateId
)
```

###### Parameters

sealKeyIdType: SystemGuid
ID of the seal key.legitimateIdType: SystemGuid
ID of the legitimate.

###### Return Value

Type: Task[PsrSealKey](data-models.md#group-psrapi-data-psrsealkey)

#### See Also

###### Reference

[SealManager Class](#group-psrapi-managers-sealmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### SealManager.GetSealOpenType Method

Note: This API is now obsolete.

Gets the open type of the seal.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
[ObsoleteAttribute("This call is obsolete. Please use GetSealOpenTypeBySealId instead")]
public Task<PsrSealOpenType> GetSealOpenType(
	PsrSeal seal,
	Guid dataId,
	Guid userId,
	bool ignoreSealKey = false
)
```

###### Parameters

sealType: [PsrApi.DataPsrSeal](data-models.md#group-psrapi-data-psrseal)
dataIdType: SystemGuid
userIdType: SystemGuid
ignoreSealKey (Optional)Type: SystemBoolean

###### Return Value

Type: Task[PsrSealOpenType](enums-and-constants.md#group-psrapi-data-enums-psrsealopentype)

#### See Also

###### Reference

[SealManager Class](#group-psrapi-managers-sealmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### SealManager.GetSealOpenTypeBySealId Method

Gets the open type of the seal.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrSealOpenType> GetSealOpenTypeBySealId(
	Guid sealId,
	Guid dataId,
	Guid userId,
	bool ignoreSealKey = false
)
```

###### Parameters

sealIdType: SystemGuid
dataIdType: SystemGuid
userIdType: SystemGuid
ignoreSealKey (Optional)Type: SystemBoolean

###### Return Value

Type: Task[PsrSealOpenType](enums-and-constants.md#group-psrapi-data-enums-psrsealopentype)

#### See Also

###### Reference

[SealManager Class](#group-psrapi-managers-sealmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### SealManager.GetSealTemplateInvolvedOrganisationUnit Method

Returns a list of IDs of involved organisation units of a seal template.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IList<Guid>> GetSealTemplateInvolvedOrganisationUnit(
	Guid dataId
)
```

###### Parameters

dataIdType: SystemGuid
ID of the seal template.

###### Return Value

Type: TaskIListGuid

#### See Also

###### Reference

[SealManager Class](#group-psrapi-managers-sealmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### SealManager.GetSealTemplateList Method

Returns a list of seal templates that match the given filter.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrSealTemplate>> GetSealTemplateList(
	PsrListFilter filter
)
```

###### Parameters

filterType: [PsrApi.DataPsrListFilter](data-models.md#group-psrapi-data-psrlistfilter)
Filter.

###### Return Value

Type: TaskIEnumerable[PsrSealTemplate](data-models.md#group-psrapi-data-psrsealtemplate)

#### See Also

###### Reference

[SealManager Class](#group-psrapi-managers-sealmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### SealManager.HasRelease Method

Determines if the seal has a release for the legitimate with the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<bool> HasRelease(
	PsrSeal seal,
	Guid legitimateId
)
```

###### Parameters

sealType: [PsrApi.DataPsrSeal](data-models.md#group-psrapi-data-psrseal)
legitimateIdType: SystemGuid

###### Return Value

Type: TaskBoolean

#### See Also

###### Reference

[SealManager Class](#group-psrapi-managers-sealmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### SealManager.UpdateSeal Method

Updates a seal. All releases are resetted.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrSeal> UpdateSeal(
	PsrSeal seal,
	Guid dataId,
	PsrEntityObjectType dataType
)
```

###### Parameters

sealType: [PsrApi.DataPsrSeal](data-models.md#group-psrapi-data-psrseal)
Seal that should be updated.dataIdType: SystemGuid
ID of the object that the seal belongs to.dataTypeType: [PsrApi.Data.EnumsPsrEntityObjectType](enums-and-constants.md#group-psrapi-data-enums-psrentityobjecttype)
Type of the object that the seal belongs to.

###### Return Value

Type: Task[PsrSeal](data-models.md#group-psrapi-data-psrseal)

#### See Also

###### Reference

[SealManager Class](#group-psrapi-managers-sealmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### SealManager.UpdateSealKeyRelease Method

Updates or adds a seal key release.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task UpdateSealKeyRelease(
	PsrSealKeyRelease release,
	Guid dataId,
	PsrEntityObjectType dataType
)
```

###### Parameters

releaseType: [PsrApi.DataPsrSealKeyRelease](data-models.md#group-psrapi-data-psrsealkeyrelease)
Key release.dataIdType: SystemGuid
ID of the object that the release applies to.dataTypeType: [PsrApi.Data.EnumsPsrEntityObjectType](enums-and-constants.md#group-psrapi-data-enums-psrentityobjecttype)
Type of the object that the release applies to.

###### Return Value

Type: Task

#### See Also

###### Reference

[SealManager Class](#group-psrapi-managers-sealmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)


<a id="group-psrapi-managers-synchronizationmanager"></a>
## SynchronizationManager

### SynchronizationManager Class

Manager for synchronization with the app

#### Inheritance Hierarchy

SystemObject
[PsrApi.ManagersBaseManager](#group-psrapi-managers-basemanager)
PsrApi.ManagersSynchronizationManager

#### Syntax

C#

```csharp
public class SynchronizationManager : BaseManager
```

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GetChangesFromServer](#group-psrapi-managers-synchronizationmanager) | Receives the changes at the server since the given date |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| [GetMigratedKeys](#group-psrapi-managers-synchronizationmanager) | Returns all encrypted keys which have been migrated. |
| [GetNextChanges](#group-psrapi-managers-synchronizationmanager) | Receives the next SyncServerChanges from the server for the given changesId |
| [GetNextMigratedKeys](#group-psrapi-managers-synchronizationmanager) | Returns the next GetMigratedKeysResult from the server for a specific migratedKeysId |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [SyncToServer](#group-psrapi-managers-synchronizationmanager) | Synchronizes the data to the server |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Managers Namespace](#group-psrapi-managers)

### SynchronizationManager Methods

The [SynchronizationManager](#group-psrapi-managers-synchronizationmanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GetChangesFromServer](#group-psrapi-managers-synchronizationmanager) | Receives the changes at the server since the given date |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| [GetMigratedKeys](#group-psrapi-managers-synchronizationmanager) | Returns all encrypted keys which have been migrated. |
| [GetNextChanges](#group-psrapi-managers-synchronizationmanager) | Receives the next SyncServerChanges from the server for the given changesId |
| [GetNextMigratedKeys](#group-psrapi-managers-synchronizationmanager) | Returns the next GetMigratedKeysResult from the server for a specific migratedKeysId |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [SyncToServer](#group-psrapi-managers-synchronizationmanager) | Synchronizes the data to the server |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[SynchronizationManager Class](#group-psrapi-managers-synchronizationmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### SynchronizationManager.GetChangesFromServer Method

Receives the changes at the server since the given date

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public ConfiguredTaskAwaitable<PsrSyncServerChanges> GetChangesFromServer(
	List<PsrKey> allClientKeys,
	List<PsrKey> requiredResyncKeys
)
```

###### Parameters

allClientKeysType: System.Collections.GenericList[PsrKey](data-models.md#group-psrapi-data-datakeys-psrkey)
requiredResyncKeysType: System.Collections.GenericList[PsrKey](data-models.md#group-psrapi-data-datakeys-psrkey)

###### Return Value

Type: ConfiguredTaskAwaitable[PsrSyncServerChanges](realtime-and-sync.md#group-psrapi-synchronization-psrsyncserverchanges)

#### See Also

###### Reference

[SynchronizationManager Class](#group-psrapi-managers-synchronizationmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### SynchronizationManager.GetMigratedKeys Method

Returns all encrypted keys which have been migrated.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public ConfiguredTaskAwaitable<PsrGetMigratedKeysResult> GetMigratedKeys(
	PsrGetMigratedKeysArgs args
)
```

###### Parameters

argsType: [PsrApi.SynchronizationPsrGetMigratedKeysArgs](realtime-and-sync.md#group-psrapi-synchronization-psrgetmigratedkeysargs)
The ids of migrated keys to check

###### Return Value

Type: ConfiguredTaskAwaitable[PsrGetMigratedKeysResult](realtime-and-sync.md#group-psrapi-synchronization-psrgetmigratedkeysresult)
Decryption Instructions foreach key which has been migrated

#### See Also

###### Reference

[SynchronizationManager Class](#group-psrapi-managers-synchronizationmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### SynchronizationManager.GetNextChanges Method

Receives the next SyncServerChanges from the server for the given changesId

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public ConfiguredTaskAwaitable<PsrSyncServerChanges> GetNextChanges(
	Guid changesId
)
```

###### Parameters

changesIdType: SystemGuid

###### Return Value

Type: ConfiguredTaskAwaitable[PsrSyncServerChanges](realtime-and-sync.md#group-psrapi-synchronization-psrsyncserverchanges)

#### See Also

###### Reference

[SynchronizationManager Class](#group-psrapi-managers-synchronizationmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### SynchronizationManager.GetNextMigratedKeys Method

Returns the next GetMigratedKeysResult from the server for a specific migratedKeysId

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public ConfiguredTaskAwaitable<PsrGetMigratedKeysResult> GetNextMigratedKeys(
	Guid migratedKeysId
)
```

###### Parameters

migratedKeysIdType: SystemGuid

###### Return Value

Type: ConfiguredTaskAwaitable[PsrGetMigratedKeysResult](realtime-and-sync.md#group-psrapi-synchronization-psrgetmigratedkeysresult)

#### See Also

###### Reference

[SynchronizationManager Class](#group-psrapi-managers-synchronizationmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### SynchronizationManager.SyncToServer Method

Synchronizes the data to the server

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public ConfiguredTaskAwaitable<PsrSyncToServerResult> SyncToServer(
	PsrSyncToServerArgs clientChanges
)
```

###### Parameters

clientChangesType: [PsrApi.SynchronizationPsrSyncToServerArgs](realtime-and-sync.md#group-psrapi-synchronization-psrsynctoserverargs)
Changes from the client

###### Return Value

Type: ConfiguredTaskAwaitable[PsrSyncToServerResult](realtime-and-sync.md#group-psrapi-synchronization-psrsynctoserverresult)

#### See Also

###### Reference

[SynchronizationManager Class](#group-psrapi-managers-synchronizationmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)


<a id="group-psrapi-managers-tagmanager"></a>
## TagManager

### TagManager Class

Contains methods to manipulate tags. Tags can be applied to almost every object of type [PsrData](data-models.md#group-psrapi-data-psrdata)

#### Inheritance Hierarchy

SystemObject
[PsrApi.ManagersBaseManager](#group-psrapi-managers-basemanager)
PsrApi.ManagersTagManager

#### Syntax

C#

```csharp
public class TagManager : BaseManager
```

#### Methods

| Name | Description |
| --- | --- |
| [AddDataFavorite](#group-psrapi-managers-tagmanager) | Marks the object with the given ID as favorite of the current session user. |
| [AddTag](#group-psrapi-managers-tagmanager) | Adds the given tag with the color in hexadecimal representation. |
| [DeleteTag](#group-psrapi-managers-tagmanager) | Deletes the given tag. |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| [GetTagGlobalUsageInfos](#group-psrapi-managers-tagmanager) | Returns usage information for all the tags. |
| [GetTagListFilter](#group-psrapi-managers-tagmanager) | Returns the container list filter that was at last saved for the user or the default filter<br>if defaultFilter is set to true. |
| [GetTags](#group-psrapi-managers-tagmanager) | Returns a list of tags that match the given filter. |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [RemoveDataFavorite](#group-psrapi-managers-tagmanager) | Removes the favorite tag from the object with the given ID. |
| [SetDataTags](#group-psrapi-managers-tagmanager) | Handles the data tags for a data. Adds, updates or deletes them. |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |
| [UpdateTag](#group-psrapi-managers-tagmanager) | Updates the given tag with the color in hexadecimal representation. |

#### See Also

###### Reference

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TagManager Methods

The [TagManager](#group-psrapi-managers-tagmanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| [AddDataFavorite](#group-psrapi-managers-tagmanager) | Marks the object with the given ID as favorite of the current session user. |
| [AddTag](#group-psrapi-managers-tagmanager) | Adds the given tag with the color in hexadecimal representation. |
| [DeleteTag](#group-psrapi-managers-tagmanager) | Deletes the given tag. |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| [GetTagGlobalUsageInfos](#group-psrapi-managers-tagmanager) | Returns usage information for all the tags. |
| [GetTagListFilter](#group-psrapi-managers-tagmanager) | Returns the container list filter that was at last saved for the user or the default filter<br>if defaultFilter is set to true. |
| [GetTags](#group-psrapi-managers-tagmanager) | Returns a list of tags that match the given filter. |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [RemoveDataFavorite](#group-psrapi-managers-tagmanager) | Removes the favorite tag from the object with the given ID. |
| [SetDataTags](#group-psrapi-managers-tagmanager) | Handles the data tags for a data. Adds, updates or deletes them. |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |
| [UpdateTag](#group-psrapi-managers-tagmanager) | Updates the given tag with the color in hexadecimal representation. |

#### See Also

###### Reference

[TagManager Class](#group-psrapi-managers-tagmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TagManager.AddDataFavorite Method

Marks the object with the given ID as favorite of the current session user.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task AddDataFavorite(
	Guid dataId
)
```

###### Parameters

dataIdType: SystemGuid

###### Return Value

Type: Task

#### See Also

###### Reference

[TagManager Class](#group-psrapi-managers-tagmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TagManager.AddTag Method

Adds the given tag with the color in hexadecimal representation.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrTag> AddTag(
	PsrTag tag,
	string hexColor
)
```

###### Parameters

tagType: [PsrApi.DataPsrTag](data-models.md#group-psrapi-data-psrtag)
hexColorType: SystemString

###### Return Value

Type: Task[PsrTag](data-models.md#group-psrapi-data-psrtag)

#### See Also

###### Reference

[TagManager Class](#group-psrapi-managers-tagmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TagManager.DeleteTag Method

Deletes the given tag.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task DeleteTag(
	PsrTag tag
)
```

###### Parameters

tagType: [PsrApi.DataPsrTag](data-models.md#group-psrapi-data-psrtag)

###### Return Value

Type: Task

#### See Also

###### Reference

[TagManager Class](#group-psrapi-managers-tagmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TagManager.GetTagGlobalUsageInfos Method

Returns usage information for all the tags.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IList<PsrTagGlobalUsageInfo>> GetTagGlobalUsageInfos(
	int take = 0
)
```

###### Parameters

take (Optional)Type: SystemInt32

###### Return Value

Type: TaskIList[PsrTagGlobalUsageInfo](data-models.md#group-psrapi-data-psrtagglobalusageinfo)

#### See Also

###### Reference

[TagManager Class](#group-psrapi-managers-tagmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TagManager.GetTagListFilter Method

Returns the container list filter that was at last saved for the user or the default filter
if defaultFilter is set to true.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrListFilter> GetTagListFilter(
	bool defaultFilter
)
```

###### Parameters

defaultFilterType: SystemBoolean

###### Return Value

Type: Task[PsrListFilter](data-models.md#group-psrapi-data-psrlistfilter)

#### See Also

###### Reference

[TagManager Class](#group-psrapi-managers-tagmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TagManager.GetTags Method

Returns a list of tags that match the given filter.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrTag>> GetTags(
	PsrListFilter filter
)
```

###### Parameters

filterType: [PsrApi.DataPsrListFilter](data-models.md#group-psrapi-data-psrlistfilter)

###### Return Value

Type: TaskIEnumerable[PsrTag](data-models.md#group-psrapi-data-psrtag)

#### See Also

###### Reference

[TagManager Class](#group-psrapi-managers-tagmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TagManager.RemoveDataFavorite Method

Removes the favorite tag from the object with the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task RemoveDataFavorite(
	Guid dataId
)
```

###### Parameters

dataIdType: SystemGuid

###### Return Value

Type: Task

#### See Also

###### Reference

[TagManager Class](#group-psrapi-managers-tagmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TagManager.SetDataTags Method

Handles the data tags for a data. Adds, updates or deletes them.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task SetDataTags(
	List<PsrDataTag> dataTags,
	Guid dataId
)
```

###### Parameters

dataTagsType: System.Collections.GenericList[PsrDataTag](data-models.md#group-psrapi-data-psrdatatag)
List of data tags that should be on the object.dataIdType: SystemGuid
ID of the object the data tags should be set on.

###### Return Value

Type: Task

#### See Also

###### Reference

[TagManager Class](#group-psrapi-managers-tagmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TagManager.UpdateTag Method

Updates the given tag with the color in hexadecimal representation.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrTag> UpdateTag(
	PsrTag tag,
	string hexColor
)
```

###### Parameters

tagType: [PsrApi.DataPsrTag](data-models.md#group-psrapi-data-psrtag)
hexColorType: SystemString

###### Return Value

Type: Task[PsrTag](data-models.md#group-psrapi-data-psrtag)

#### See Also

###### Reference

[TagManager Class](#group-psrapi-managers-tagmanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)


<a id="group-psrapi-managers-templatemanager"></a>
## TemplateManager

### TemplateManager Class

Contains methods to manipulate templates.

#### Inheritance Hierarchy

SystemObject
[PsrApi.ManagersBaseManager](#group-psrapi-managers-basemanager)
PsrApi.ManagersTemplateManager

#### Syntax

C#

```csharp
public class TemplateManager : BaseManager
```

#### Methods

| Name | Description |
| --- | --- |
| [AddDataTagTemplate](#group-psrapi-managers-templatemanager) | Adds a new tag template or extends an existing template. |
| [AddLegitimateDataRightTemplate](#group-psrapi-managers-templatemanager) | Adds a new right template or extends an existing template. |
| [AddTemplateGroup](#group-psrapi-managers-templatemanager) | Adds a new template group. |
| [DeleteTemplateGroup](#group-psrapi-managers-templatemanager) | Deletes the group with the given ID. |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GetDataRightTemplate](#group-psrapi-managers-templatemanager) | Returns a template that matches the given object and legitimate. |
| [GetDataRightTemplates](#group-psrapi-managers-templatemanager) | Returns all templates matching the given ID. |
| [GetDataRightTemplateTargets](#group-psrapi-managers-templatemanager) | Returns a list of data right template targets. |
| [GetDataTagTemplate](#group-psrapi-managers-templatemanager) | Returns a template that matches the given data ID and target ID. |
| [GetDataTagTemplates](#group-psrapi-managers-templatemanager) | Returns a list of tag templates matching the given ID. |
| [GetDefaultOrganisationUnitTemplateGroupId](#group-psrapi-managers-templatemanager) | Returns the ID of the default template group matching the given organisation unit. |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| [GetHierarchyDataRightTemplate](#group-psrapi-managers-templatemanager) | Returns all templates that match the given ID and target ID. |
| [GetHierarchyDataTagTemplate](#group-psrapi-managers-templatemanager) | Returns all templates that match the given ID and target ID. |
| [GetRootTemplateGroupList](#group-psrapi-managers-templatemanager) | Returns a list of template groups that match the root organisation unit. |
| [GetTemplateGroupById](#group-psrapi-managers-templatemanager) | Returns the template group matching the given ID. |
| [GetTemplateGroupCount](#group-psrapi-managers-templatemanager) | Returns the number of template groups with optional filtering on an organisation unit. |
| [GetTemplateGroupList](#group-psrapi-managers-templatemanager) | Returns a list of template group with optional filtering on an organisation unit. |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [RemoveAllDataTagTemplate](#group-psrapi-managers-templatemanager) | Removes all templates from the object with the given ID. |
| [RemoveAllLegitimateDataRightTemplate](#group-psrapi-managers-templatemanager) | Removes all templates from the object with the given ID. |
| [RemoveDataTagTemplate](#group-psrapi-managers-templatemanager) | Removes a tag from a template. When all tags are removed, the whole template is removed. |
| [RemoveLegitimateDataRightTemplate](#group-psrapi-managers-templatemanager) | Removes a right from a template. When all rights are removed, the whole template is removed. |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |
| [UpdateDataTagTemplate](#group-psrapi-managers-templatemanager) | Updates an existing tag template. |
| [UpdateLegitimateDataRightTemplate](#group-psrapi-managers-templatemanager) | Updates an existing right template. |
| [UpdateLegitimateDataRightTemplateOwnerRight](#group-psrapi-managers-templatemanager) | Updates the owner right of a right template. |
| [UpdateTemplateGroup](#group-psrapi-managers-templatemanager) | Updates the group. |

#### See Also

###### Reference

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TemplateManager Methods

The [TemplateManager](#group-psrapi-managers-templatemanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| [AddDataTagTemplate](#group-psrapi-managers-templatemanager) | Adds a new tag template or extends an existing template. |
| [AddLegitimateDataRightTemplate](#group-psrapi-managers-templatemanager) | Adds a new right template or extends an existing template. |
| [AddTemplateGroup](#group-psrapi-managers-templatemanager) | Adds a new template group. |
| [DeleteTemplateGroup](#group-psrapi-managers-templatemanager) | Deletes the group with the given ID. |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GetDataRightTemplate](#group-psrapi-managers-templatemanager) | Returns a template that matches the given object and legitimate. |
| [GetDataRightTemplates](#group-psrapi-managers-templatemanager) | Returns all templates matching the given ID. |
| [GetDataRightTemplateTargets](#group-psrapi-managers-templatemanager) | Returns a list of data right template targets. |
| [GetDataTagTemplate](#group-psrapi-managers-templatemanager) | Returns a template that matches the given data ID and target ID. |
| [GetDataTagTemplates](#group-psrapi-managers-templatemanager) | Returns a list of tag templates matching the given ID. |
| [GetDefaultOrganisationUnitTemplateGroupId](#group-psrapi-managers-templatemanager) | Returns the ID of the default template group matching the given organisation unit. |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| [GetHierarchyDataRightTemplate](#group-psrapi-managers-templatemanager) | Returns all templates that match the given ID and target ID. |
| [GetHierarchyDataTagTemplate](#group-psrapi-managers-templatemanager) | Returns all templates that match the given ID and target ID. |
| [GetRootTemplateGroupList](#group-psrapi-managers-templatemanager) | Returns a list of template groups that match the root organisation unit. |
| [GetTemplateGroupById](#group-psrapi-managers-templatemanager) | Returns the template group matching the given ID. |
| [GetTemplateGroupCount](#group-psrapi-managers-templatemanager) | Returns the number of template groups with optional filtering on an organisation unit. |
| [GetTemplateGroupList](#group-psrapi-managers-templatemanager) | Returns a list of template group with optional filtering on an organisation unit. |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [RemoveAllDataTagTemplate](#group-psrapi-managers-templatemanager) | Removes all templates from the object with the given ID. |
| [RemoveAllLegitimateDataRightTemplate](#group-psrapi-managers-templatemanager) | Removes all templates from the object with the given ID. |
| [RemoveDataTagTemplate](#group-psrapi-managers-templatemanager) | Removes a tag from a template. When all tags are removed, the whole template is removed. |
| [RemoveLegitimateDataRightTemplate](#group-psrapi-managers-templatemanager) | Removes a right from a template. When all rights are removed, the whole template is removed. |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |
| [UpdateDataTagTemplate](#group-psrapi-managers-templatemanager) | Updates an existing tag template. |
| [UpdateLegitimateDataRightTemplate](#group-psrapi-managers-templatemanager) | Updates an existing right template. |
| [UpdateLegitimateDataRightTemplateOwnerRight](#group-psrapi-managers-templatemanager) | Updates the owner right of a right template. |
| [UpdateTemplateGroup](#group-psrapi-managers-templatemanager) | Updates the group. |

#### See Also

###### Reference

[TemplateManager Class](#group-psrapi-managers-templatemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TemplateManager.AddDataTagTemplate Method

Adds a new tag template or extends an existing template.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task AddDataTagTemplate(
	Guid dataId,
	List<Guid> tagIds,
	Nullable<PsrEntityObjectType> dataType,
	Guid targetId,
	Guid templateGroupId
)
```

###### Parameters

dataIdType: SystemGuid
tagIdsType: System.Collections.GenericListGuid
dataTypeType: SystemNullable[PsrEntityObjectType](enums-and-constants.md#group-psrapi-data-enums-psrentityobjecttype)
targetIdType: SystemGuid
templateGroupIdType: SystemGuid

###### Return Value

Type: Task

#### See Also

###### Reference

[TemplateManager Class](#group-psrapi-managers-templatemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TemplateManager.AddLegitimateDataRightTemplate Method

Adds a new right template or extends an existing template.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task AddLegitimateDataRightTemplate(
	Guid dataId,
	Guid legitimateId,
	PsrRights rights,
	Nullable<PsrEntityObjectType> dataType,
	Guid targetId,
	Guid templateGroupId
)
```

###### Parameters

dataIdType: SystemGuid
legitimateIdType: SystemGuid
rightsType: [PsrApi.Data.EnumsPsrRights](enums-and-constants.md#group-psrapi-data-enums-psrrights)
dataTypeType: SystemNullable[PsrEntityObjectType](enums-and-constants.md#group-psrapi-data-enums-psrentityobjecttype)
targetIdType: SystemGuid
templateGroupIdType: SystemGuid

###### Return Value

Type: Task

#### See Also

###### Reference

[TemplateManager Class](#group-psrapi-managers-templatemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TemplateManager.AddTemplateGroup Method

Adds a new template group.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrTemplateGroup> AddTemplateGroup(
	PsrTemplateGroup group
)
```

###### Parameters

groupType: [PsrApi.DataPsrTemplateGroup](data-models.md#group-psrapi-data-psrtemplategroup)

###### Return Value

Type: Task[PsrTemplateGroup](data-models.md#group-psrapi-data-psrtemplategroup)

#### See Also

###### Reference

[TemplateManager Class](#group-psrapi-managers-templatemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TemplateManager.DeleteTemplateGroup Method

Deletes the group with the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task DeleteTemplateGroup(
	Guid id
)
```

###### Parameters

idType: SystemGuid

###### Return Value

Type: Task

#### See Also

###### Reference

[TemplateManager Class](#group-psrapi-managers-templatemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TemplateManager.GetDataRightTemplate Method

Returns a template that matches the given object and legitimate.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrDataRightTemplate> GetDataRightTemplate(
	Guid dataId,
	Guid legitimateId,
	Nullable<PsrEntityObjectType> dataType,
	Guid targetId,
	Guid templateGroupId
)
```

###### Parameters

dataIdType: SystemGuid
legitimateIdType: SystemGuid
dataTypeType: SystemNullable[PsrEntityObjectType](enums-and-constants.md#group-psrapi-data-enums-psrentityobjecttype)
targetIdType: SystemGuid
templateGroupIdType: SystemGuid

###### Return Value

Type: Task[PsrDataRightTemplate](data-models.md#group-psrapi-data-psrdatarighttemplate)

#### See Also

###### Reference

[TemplateManager Class](#group-psrapi-managers-templatemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TemplateManager.GetDataRightTemplateTargets Method

Returns a list of data right template targets.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrDataRightTemplateTarget>> GetDataRightTemplateTargets(
	Nullable<Guid> dataId
)
```

###### Parameters

dataIdType: SystemNullableGuid

###### Return Value

Type: TaskIEnumerable[PsrDataRightTemplateTarget](data-models.md#group-psrapi-data-psrdatarighttemplatetarget)

#### See Also

###### Reference

[TemplateManager Class](#group-psrapi-managers-templatemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TemplateManager.GetDataRightTemplates Method

Returns all templates matching the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrDataRightTemplate>> GetDataRightTemplates(
	Guid dataId,
	Nullable<PsrEntityObjectType> dataType,
	Nullable<Guid> targetId,
	Guid templateGroupId
)
```

###### Parameters

dataIdType: SystemGuid
dataTypeType: SystemNullable[PsrEntityObjectType](enums-and-constants.md#group-psrapi-data-enums-psrentityobjecttype)
targetIdType: SystemNullableGuid
templateGroupIdType: SystemGuid

###### Return Value

Type: TaskIEnumerable[PsrDataRightTemplate](data-models.md#group-psrapi-data-psrdatarighttemplate)

#### See Also

###### Reference

[TemplateManager Class](#group-psrapi-managers-templatemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TemplateManager.GetDataTagTemplate Method

Returns a template that matches the given data ID and target ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrDataTagTemplate> GetDataTagTemplate(
	Guid dataId,
	Nullable<PsrEntityObjectType> dataType,
	Nullable<Guid> targetId,
	Guid templateGroupId
)
```

###### Parameters

dataIdType: SystemGuid
dataTypeType: SystemNullable[PsrEntityObjectType](enums-and-constants.md#group-psrapi-data-enums-psrentityobjecttype)
targetIdType: SystemNullableGuid
templateGroupIdType: SystemGuid

###### Return Value

Type: Task[PsrDataTagTemplate](data-models.md#group-psrapi-data-psrdatatagtemplate)

#### See Also

###### Reference

[TemplateManager Class](#group-psrapi-managers-templatemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TemplateManager.GetDataTagTemplates Method

Returns a list of tag templates matching the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrDataTagTemplate>> GetDataTagTemplates(
	Guid dataId,
	Nullable<PsrEntityObjectType> dataType,
	Nullable<Guid> targetId,
	Guid templateGroupId
)
```

###### Parameters

dataIdType: SystemGuid
dataTypeType: SystemNullable[PsrEntityObjectType](enums-and-constants.md#group-psrapi-data-enums-psrentityobjecttype)
targetIdType: SystemNullableGuid
templateGroupIdType: SystemGuid

###### Return Value

Type: TaskIEnumerable[PsrDataTagTemplate](data-models.md#group-psrapi-data-psrdatatagtemplate)

#### See Also

###### Reference

[TemplateManager Class](#group-psrapi-managers-templatemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TemplateManager.GetDefaultOrganisationUnitTemplateGroupId Method

Returns the ID of the default template group matching the given organisation unit.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<Guid> GetDefaultOrganisationUnitTemplateGroupId(
	Guid organisationUnitId,
	bool ignoreParents
)
```

###### Parameters

organisationUnitIdType: SystemGuid
ignoreParentsType: SystemBoolean

###### Return Value

Type: TaskGuid

#### See Also

###### Reference

[TemplateManager Class](#group-psrapi-managers-templatemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TemplateManager.GetHierarchyDataRightTemplate Method

Returns all templates that match the given ID and target ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrDataRightTemplate>> GetHierarchyDataRightTemplate(
	Guid dataId,
	Nullable<PsrEntityObjectType> dataType,
	Guid targetId,
	Guid templateGroupId
)
```

###### Parameters

dataIdType: SystemGuid
dataTypeType: SystemNullable[PsrEntityObjectType](enums-and-constants.md#group-psrapi-data-enums-psrentityobjecttype)
targetIdType: SystemGuid
templateGroupIdType: SystemGuid

###### Return Value

Type: TaskIEnumerable[PsrDataRightTemplate](data-models.md#group-psrapi-data-psrdatarighttemplate)

#### See Also

###### Reference

[TemplateManager Class](#group-psrapi-managers-templatemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TemplateManager.GetHierarchyDataTagTemplate Method

Returns all templates that match the given ID and target ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrDataTagTemplate>> GetHierarchyDataTagTemplate(
	Guid dataId,
	Nullable<PsrEntityObjectType> dataType,
	Nullable<Guid> targetId,
	Guid templateGroupId
)
```

###### Parameters

dataIdType: SystemGuid
dataTypeType: SystemNullable[PsrEntityObjectType](enums-and-constants.md#group-psrapi-data-enums-psrentityobjecttype)
targetIdType: SystemNullableGuid
templateGroupIdType: SystemGuid

###### Return Value

Type: TaskIEnumerable[PsrDataTagTemplate](data-models.md#group-psrapi-data-psrdatatagtemplate)

#### See Also

###### Reference

[TemplateManager Class](#group-psrapi-managers-templatemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TemplateManager.GetRootTemplateGroupList Method

Returns a list of template groups that match the root organisation unit.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrTemplateGroup>> GetRootTemplateGroupList(
	Nullable<Guid> organisationUnitId
)
```

###### Parameters

organisationUnitIdType: SystemNullableGuid

###### Return Value

Type: TaskIEnumerable[PsrTemplateGroup](data-models.md#group-psrapi-data-psrtemplategroup)

#### See Also

###### Reference

[TemplateManager Class](#group-psrapi-managers-templatemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TemplateManager.GetTemplateGroupById Method

Returns the template group matching the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrTemplateGroup> GetTemplateGroupById(
	Guid templateGroupId
)
```

###### Parameters

templateGroupIdType: SystemGuid

###### Return Value

Type: Task[PsrTemplateGroup](data-models.md#group-psrapi-data-psrtemplategroup)

#### See Also

###### Reference

[TemplateManager Class](#group-psrapi-managers-templatemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TemplateManager.GetTemplateGroupCount Method

Returns the number of template groups with optional filtering on an organisation unit.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<int> GetTemplateGroupCount(
	Guid organisationUnitId
)
```

###### Parameters

organisationUnitIdType: SystemGuid

###### Return Value

Type: TaskInt32

#### See Also

###### Reference

[TemplateManager Class](#group-psrapi-managers-templatemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TemplateManager.GetTemplateGroupList Method

Returns a list of template group with optional filtering on an organisation unit.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrTemplateGroup>> GetTemplateGroupList(
	Nullable<Guid> organisationUnitId,
	bool ignoreOrganisationUnitPath = false
)
```

###### Parameters

organisationUnitIdType: SystemNullableGuid
ignoreOrganisationUnitPath (Optional)Type: SystemBoolean

###### Return Value

Type: TaskIEnumerable[PsrTemplateGroup](data-models.md#group-psrapi-data-psrtemplategroup)

#### See Also

###### Reference

[TemplateManager Class](#group-psrapi-managers-templatemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TemplateManager.RemoveAllDataTagTemplate Method

Removes all templates from the object with the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task RemoveAllDataTagTemplate(
	Guid dataId
)
```

###### Parameters

dataIdType: SystemGuid
Guid des Objekts

###### Return Value

Type: Task

#### See Also

###### Reference

[TemplateManager Class](#group-psrapi-managers-templatemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TemplateManager.RemoveAllLegitimateDataRightTemplate Method

Removes all templates from the object with the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task RemoveAllLegitimateDataRightTemplate(
	Guid dataId
)
```

###### Parameters

dataIdType: SystemGuid
Guid des Objekts

###### Return Value

Type: Task

#### See Also

###### Reference

[TemplateManager Class](#group-psrapi-managers-templatemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TemplateManager.RemoveDataTagTemplate Method

Removes a tag from a template. When all tags are removed, the whole template is removed.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task RemoveDataTagTemplate(
	Guid dataId,
	Guid tagId,
	Nullable<PsrEntityObjectType> dataType,
	Nullable<Guid> targetId,
	Guid templateGroupId
)
```

###### Parameters

dataIdType: SystemGuid
tagIdType: SystemGuid
dataTypeType: SystemNullable[PsrEntityObjectType](enums-and-constants.md#group-psrapi-data-enums-psrentityobjecttype)
targetIdType: SystemNullableGuid
templateGroupIdType: SystemGuid

###### Return Value

Type: Task

#### See Also

###### Reference

[TemplateManager Class](#group-psrapi-managers-templatemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TemplateManager.RemoveLegitimateDataRightTemplate Method

Removes a right from a template. When all rights are removed, the whole template is removed.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task RemoveLegitimateDataRightTemplate(
	Guid dataId,
	Guid legitimateId,
	PsrRights rights,
	Nullable<PsrEntityObjectType> dataType,
	Guid targetId,
	Guid templateGroupId
)
```

###### Parameters

dataIdType: SystemGuid
legitimateIdType: SystemGuid
rightsType: [PsrApi.Data.EnumsPsrRights](enums-and-constants.md#group-psrapi-data-enums-psrrights)
dataTypeType: SystemNullable[PsrEntityObjectType](enums-and-constants.md#group-psrapi-data-enums-psrentityobjecttype)
targetIdType: SystemGuid
templateGroupIdType: SystemGuid

###### Return Value

Type: Task

#### See Also

###### Reference

[TemplateManager Class](#group-psrapi-managers-templatemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TemplateManager.UpdateDataTagTemplate Method

Updates an existing tag template.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task UpdateDataTagTemplate(
	Guid dataId,
	Guid tagId,
	Nullable<PsrEntityObjectType> dataType,
	Guid targetId,
	Guid templateGroupId
)
```

###### Parameters

dataIdType: SystemGuid
tagIdType: SystemGuid
dataTypeType: SystemNullable[PsrEntityObjectType](enums-and-constants.md#group-psrapi-data-enums-psrentityobjecttype)
targetIdType: SystemGuid
templateGroupIdType: SystemGuid

###### Return Value

Type: Task

#### See Also

###### Reference

[TemplateManager Class](#group-psrapi-managers-templatemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TemplateManager.UpdateLegitimateDataRightTemplate Method

Updates an existing right template.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task UpdateLegitimateDataRightTemplate(
	Guid dataId,
	Guid legitimateId,
	PsrRights rights,
	Nullable<PsrEntityObjectType> dataType,
	Guid targetId,
	Guid templateGroupId
)
```

###### Parameters

dataIdType: SystemGuid
legitimateIdType: SystemGuid
rightsType: [PsrApi.Data.EnumsPsrRights](enums-and-constants.md#group-psrapi-data-enums-psrrights)
dataTypeType: SystemNullable[PsrEntityObjectType](enums-and-constants.md#group-psrapi-data-enums-psrentityobjecttype)
targetIdType: SystemGuid
templateGroupIdType: SystemGuid

###### Return Value

Type: Task

#### See Also

###### Reference

[TemplateManager Class](#group-psrapi-managers-templatemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TemplateManager.UpdateLegitimateDataRightTemplateOwnerRight Method

Updates the owner right of a right template.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task UpdateLegitimateDataRightTemplateOwnerRight(
	Guid dataId,
	Guid legitimateId,
	Nullable<PsrEntityObjectType> dataType,
	Guid targetId,
	Guid templateGroupId,
	bool ownerRight
)
```

###### Parameters

dataIdType: SystemGuid
legitimateIdType: SystemGuid
dataTypeType: SystemNullable[PsrEntityObjectType](enums-and-constants.md#group-psrapi-data-enums-psrentityobjecttype)
targetIdType: SystemGuid
templateGroupIdType: SystemGuid
ownerRightType: SystemBoolean

###### Return Value

Type: Task

#### See Also

###### Reference

[TemplateManager Class](#group-psrapi-managers-templatemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TemplateManager.UpdateTemplateGroup Method

Updates the group.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrTemplateGroup> UpdateTemplateGroup(
	PsrTemplateGroup group
)
```

###### Parameters

groupType: [PsrApi.DataPsrTemplateGroup](data-models.md#group-psrapi-data-psrtemplategroup)

###### Return Value

Type: Task[PsrTemplateGroup](data-models.md#group-psrapi-data-psrtemplategroup)

#### See Also

###### Reference

[TemplateManager Class](#group-psrapi-managers-templatemanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)


<a id="group-psrapi-managers-triggermanager"></a>
## TriggerManager

### TriggerManager Class

Contains methods to manipulate triggers.

#### Inheritance Hierarchy

SystemObject
[PsrApi.ManagersBaseManager](#group-psrapi-managers-basemanager)
PsrApi.ManagersTriggerManager

#### Syntax

C#

```csharp
public class TriggerManager : BaseManager
```

#### Methods

| Name | Description |
| --- | --- |
| [DataHasTriggerConfig](#group-psrapi-managers-triggermanager) | Returns trigger configuration information for the object with the given ID. |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| [GetTriggerAlertAdditionalDatas](#group-psrapi-managers-triggermanager) | Returns a list of additional datas that could be connected to the alert with the given ID. |
| [GetTriggerAlerts](#group-psrapi-managers-triggermanager) | Returns a list of trigger alerts that match the given filter. |
| [GetTriggerConfigList](#group-psrapi-managers-triggermanager) | Returns the trigger configuration for the object with the given ID. |
| [GetTriggerCount](#group-psrapi-managers-triggermanager) | Returns the number of triggers that match the given filter. |
| [GetTriggerListFilter](#group-psrapi-managers-triggermanager) | Returns the list filter to filter triggers. |
| [GetTriggerObjektConfiglist](#group-psrapi-managers-triggermanager) | Returns the trigger configurations for the objects in the organisation unit with the given ID. |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [RemoveNotifyDataTriggerConfig](#group-psrapi-managers-triggermanager) | Deletes the trigger on the object with the given ID for the current user. |
| [RemoveNotifyOuTriggerConfig](#group-psrapi-managers-triggermanager) | Deletes the trigger on the objects of the given type in the organisation unit with the given ID. |
| [SetNotifyDataTriggerConfig](#group-psrapi-managers-triggermanager) | Sets a trigger on the object with the given ID for the current user. |
| [SetNotifyOuTriggerConfig](#group-psrapi-managers-triggermanager) | Sets a trigger on the objects of the given type in the organisation unit with the given ID. |
| [SetNotifyTriggerAlertsRead](#group-psrapi-managers-triggermanager) | Set the read flag of the notifications with the given IDs. |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TriggerManager Methods

The [TriggerManager](#group-psrapi-managers-triggermanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| [DataHasTriggerConfig](#group-psrapi-managers-triggermanager) | Returns trigger configuration information for the object with the given ID. |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| [GetTriggerAlertAdditionalDatas](#group-psrapi-managers-triggermanager) | Returns a list of additional datas that could be connected to the alert with the given ID. |
| [GetTriggerAlerts](#group-psrapi-managers-triggermanager) | Returns a list of trigger alerts that match the given filter. |
| [GetTriggerConfigList](#group-psrapi-managers-triggermanager) | Returns the trigger configuration for the object with the given ID. |
| [GetTriggerCount](#group-psrapi-managers-triggermanager) | Returns the number of triggers that match the given filter. |
| [GetTriggerListFilter](#group-psrapi-managers-triggermanager) | Returns the list filter to filter triggers. |
| [GetTriggerObjektConfiglist](#group-psrapi-managers-triggermanager) | Returns the trigger configurations for the objects in the organisation unit with the given ID. |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [RemoveNotifyDataTriggerConfig](#group-psrapi-managers-triggermanager) | Deletes the trigger on the object with the given ID for the current user. |
| [RemoveNotifyOuTriggerConfig](#group-psrapi-managers-triggermanager) | Deletes the trigger on the objects of the given type in the organisation unit with the given ID. |
| [SetNotifyDataTriggerConfig](#group-psrapi-managers-triggermanager) | Sets a trigger on the object with the given ID for the current user. |
| [SetNotifyOuTriggerConfig](#group-psrapi-managers-triggermanager) | Sets a trigger on the objects of the given type in the organisation unit with the given ID. |
| [SetNotifyTriggerAlertsRead](#group-psrapi-managers-triggermanager) | Set the read flag of the notifications with the given IDs. |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[TriggerManager Class](#group-psrapi-managers-triggermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TriggerManager.DataHasTriggerConfig Method

Returns trigger configuration information for the object with the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrTriggerConfigResult> DataHasTriggerConfig(
	Guid dataId,
	PsrEntityObjectType dataType
)
```

###### Parameters

dataIdType: SystemGuid
dataTypeType: [PsrApi.Data.EnumsPsrEntityObjectType](enums-and-constants.md#group-psrapi-data-enums-psrentityobjecttype)

###### Return Value

Type: Task[PsrTriggerConfigResult](enums-and-constants.md#group-psrapi-data-enums-psrtriggerconfigresult)

#### See Also

###### Reference

[TriggerManager Class](#group-psrapi-managers-triggermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TriggerManager.GetTriggerAlertAdditionalDatas Method

Returns a list of additional datas that could be connected to the alert with the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrNotifyTriggerAlertAdditionalData>> GetTriggerAlertAdditionalDatas(
	Guid alertId
)
```

###### Parameters

alertIdType: SystemGuid
ID of the trigger alert.

###### Return Value

Type: TaskIEnumerable[PsrNotifyTriggerAlertAdditionalData](data-models.md#group-psrapi-data-psrnotifytriggeralertadditionaldata)

#### See Also

###### Reference

[TriggerManager Class](#group-psrapi-managers-triggermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TriggerManager.GetTriggerAlerts Method

Returns a list of trigger alerts that match the given filter.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrNotifyTriggerAlert>> GetTriggerAlerts(
	PsrListFilter listFilter
)
```

###### Parameters

listFilterType: [PsrApi.DataPsrListFilter](data-models.md#group-psrapi-data-psrlistfilter)

###### Return Value

Type: TaskIEnumerable[PsrNotifyTriggerAlert](data-models.md#group-psrapi-data-psrnotifytriggeralert)

#### See Also

###### Reference

[TriggerManager Class](#group-psrapi-managers-triggermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TriggerManager.GetTriggerConfigList Method

Returns the trigger configuration for the object with the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrNotifyTriggerConfig>> GetTriggerConfigList(
	Guid dataId
)
```

###### Parameters

dataIdType: SystemGuid

###### Return Value

Type: TaskIEnumerable[PsrNotifyTriggerConfig](data-models.md#group-psrapi-data-psrnotifytriggerconfig)

#### See Also

###### Reference

[TriggerManager Class](#group-psrapi-managers-triggermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TriggerManager.GetTriggerCount Method

Returns the number of triggers that match the given filter.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<int> GetTriggerCount(
	PsrListFilter filter
)
```

###### Parameters

filterType: [PsrApi.DataPsrListFilter](data-models.md#group-psrapi-data-psrlistfilter)
Filter.

###### Return Value

Type: TaskInt32

#### See Also

###### Reference

[TriggerManager Class](#group-psrapi-managers-triggermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TriggerManager.GetTriggerListFilter Method

Returns the list filter to filter triggers.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<PsrListFilter> GetTriggerListFilter(
	bool defaultFilter
)
```

###### Parameters

defaultFilterType: SystemBoolean
If the default filter should be returned.

###### Return Value

Type: Task[PsrListFilter](data-models.md#group-psrapi-data-psrlistfilter)

#### See Also

###### Reference

[TriggerManager Class](#group-psrapi-managers-triggermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TriggerManager.GetTriggerObjektConfiglist Method

Returns the trigger configurations for the objects in the organisation unit with the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task<IEnumerable<PsrNotifyTriggerConfig>> GetTriggerObjektConfiglist(
	Guid triggerOrganisationUnitId,
	PsrEntityObjectType triggerObjectType
)
```

###### Parameters

triggerOrganisationUnitIdType: SystemGuid
triggerObjectTypeType: [PsrApi.Data.EnumsPsrEntityObjectType](enums-and-constants.md#group-psrapi-data-enums-psrentityobjecttype)

###### Return Value

Type: TaskIEnumerable[PsrNotifyTriggerConfig](data-models.md#group-psrapi-data-psrnotifytriggerconfig)

#### See Also

###### Reference

[TriggerManager Class](#group-psrapi-managers-triggermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TriggerManager.RemoveNotifyDataTriggerConfig Method

Deletes the trigger on the object with the given ID for the current user.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task RemoveNotifyDataTriggerConfig(
	PsrNotifyTriggerReasons reason,
	Guid dataId
)
```

###### Parameters

reasonType: [PsrApi.Data.EnumsPsrNotifyTriggerReasons](enums-and-constants.md#group-psrapi-data-enums-psrnotifytriggerreasons)
dataIdType: SystemGuid

###### Return Value

Type: Task

#### See Also

###### Reference

[TriggerManager Class](#group-psrapi-managers-triggermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TriggerManager.RemoveNotifyOuTriggerConfig Method

Deletes the trigger on the objects of the given type in the organisation unit with the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task RemoveNotifyOuTriggerConfig(
	PsrNotifyTriggerReasons reason,
	Guid organisationUnitId,
	PsrEntityObjectType objectType
)
```

###### Parameters

reasonType: [PsrApi.Data.EnumsPsrNotifyTriggerReasons](enums-and-constants.md#group-psrapi-data-enums-psrnotifytriggerreasons)
organisationUnitIdType: SystemGuid
objectTypeType: [PsrApi.Data.EnumsPsrEntityObjectType](enums-and-constants.md#group-psrapi-data-enums-psrentityobjecttype)

###### Return Value

Type: Task

#### See Also

###### Reference

[TriggerManager Class](#group-psrapi-managers-triggermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TriggerManager.SetNotifyDataTriggerConfig Method

Sets a trigger on the object with the given ID for the current user.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task SetNotifyDataTriggerConfig(
	PsrNotifyTriggerReasons reason,
	Guid dataId,
	Nullable<PsrNotifyTriggerType> overrideType,
	bool checkRights,
	List<PsrNotifyTriggerConfigFilterObject> filterObjects = null
)
```

###### Parameters

reasonType: [PsrApi.Data.EnumsPsrNotifyTriggerReasons](enums-and-constants.md#group-psrapi-data-enums-psrnotifytriggerreasons)
dataIdType: SystemGuid
overrideTypeType: SystemNullable[PsrNotifyTriggerType](enums-and-constants.md#group-psrapi-data-enums-psrnotifytriggertype)
checkRightsType: SystemBoolean
filterObjects (Optional)Type: System.Collections.GenericList[PsrNotifyTriggerConfigFilterObject](data-models.md#group-psrapi-data-psrnotifytriggerconfigfilterobject)

###### Return Value

Type: Task

#### See Also

###### Reference

[TriggerManager Class](#group-psrapi-managers-triggermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TriggerManager.SetNotifyOuTriggerConfig Method

Sets a trigger on the objects of the given type in the organisation unit with the given ID.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task SetNotifyOuTriggerConfig(
	PsrNotifyTriggerReasons reason,
	Guid organisationUnitId,
	PsrEntityObjectType objectType,
	Nullable<PsrNotifyTriggerType> overrideType,
	bool checkRights,
	List<PsrNotifyTriggerConfigFilterObject> filterObjects = null
)
```

###### Parameters

reasonType: [PsrApi.Data.EnumsPsrNotifyTriggerReasons](enums-and-constants.md#group-psrapi-data-enums-psrnotifytriggerreasons)
organisationUnitIdType: SystemGuid
objectTypeType: [PsrApi.Data.EnumsPsrEntityObjectType](enums-and-constants.md#group-psrapi-data-enums-psrentityobjecttype)
overrideTypeType: SystemNullable[PsrNotifyTriggerType](enums-and-constants.md#group-psrapi-data-enums-psrnotifytriggertype)
checkRightsType: SystemBoolean
filterObjects (Optional)Type: System.Collections.GenericList[PsrNotifyTriggerConfigFilterObject](data-models.md#group-psrapi-data-psrnotifytriggerconfigfilterobject)

###### Return Value

Type: Task

#### See Also

###### Reference

[TriggerManager Class](#group-psrapi-managers-triggermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)

### TriggerManager.SetNotifyTriggerAlertsRead Method

Set the read flag of the notifications with the given IDs.

Namespace:
[PsrApi.Managers](#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task SetNotifyTriggerAlertsRead(
	List<Guid> alertIds,
	bool read
)
```

###### Parameters

alertIdsType: System.Collections.GenericListGuid
readType: SystemBoolean

###### Return Value

Type: Task

#### See Also

###### Reference

[TriggerManager Class](#group-psrapi-managers-triggermanager)

[PsrApi.Managers Namespace](#group-psrapi-managers)
