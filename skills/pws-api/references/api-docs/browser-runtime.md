# Browser Runtime

This is the primary JavaScript runtime handbook for browser integrations.

- Browser runtime: use the Netwrix Password Secure browser bundle provided by the target environment.
- Injected globals: `window.PsrApi`, `window.PsrApiEnums`, `window.PsrApiTypes`
- Instantiate the SDK through `new window.PsrApi(apiUrl, options?)`.
- Use this handbook for the root API surface, the top-level namespace, and core runtime exceptions.
- Included official SDK pages: `55` across `4` grouped sections.

```html
<script src="path/to/psrApi.js"></script>
<script>
  const api = new window.PsrApi(baseUrl)
</script>
```

## Contents

- [PsrApi](#group-psrapi)
- [PsrApi](#group-psrapi-psrapi)
- [PsrApiException](#group-psrapi-psrapiexception)
- [PsrServiceException](#group-psrapi-psrserviceexception)

<a id="group-psrapi"></a>
## PsrApi

### PsrApi Namespace

#### Classes

| Class | Description |
| --- | --- |
| [PsrApi](#group-psrapi-psrapi) | Each instance of [PsrApi](#group-psrapi-psrapi) is responsible for one session at the server. |
| [PsrApiException](#group-psrapi-psrapiexception) | Netwrix Password Secure specific exception. Contains a [PsrApiExceptionCode](enums-and-constants.md#group-psrapi-psrapiexceptioncode) that describes the error in more detail |
| [PsrServiceException](#group-psrapi-psrserviceexception) | Exceptions that are thrown by Netwrix Password Secure Server |

#### Enumerations

| Enumeration | Description |
| --- | --- |
| [PsrApiExceptionCode](enums-and-constants.md#group-psrapi-psrapiexceptioncode) | Errors that happen in Netwrix Password Secure are marked with an exception code. |
| [PsrSessionState](authentication-and-sessions.md#group-psrapi-psrsessionstate) | The state the session is currently in |


<a id="group-psrapi-psrapi"></a>
## PsrApi

### PsrApi Class

Each instance of PsrApi is responsible for one session at the server.

#### Inheritance Hierarchy

SystemObject
PsrApiPsrApi

#### Syntax

C#

```csharp
public class PsrApi
```

#### Constructors

| Name | Description |
| --- | --- |
| [PsrApi](#group-psrapi-psrapi) | Creates a new instance of PsrApi with a specific endpoint address. |

#### Properties

| Name | Description |
| --- | --- |
| [CurrentUser](#group-psrapi-psrapi) | The [PsrOrganisationUnitUser](data-models.md#group-psrapi-data-psrorganisationunituser) of the current session. Only set if a session is active. |
| [SessionExpirationUtc](#group-psrapi-psrapi) | Determinates when the Session is closed |
| [SessionState](#group-psrapi-psrapi) | The session state the connection currently is in |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GetActiveDatabaseNames](#group-psrapi-psrapi) | Gibt eine Liste der bekannten Datenbanken zurück |
| [GetEncryptionVersion](#group-psrapi-psrapi) | Returns the encryption version for the connected database |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [GetVersion](#group-psrapi-psrapi) | Returns the current SDK Version |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### Events

| Name | Description |
| --- | --- |
| [ServerStatusChanged](#group-psrapi-psrapi) | Event, which gets triggered, when the Server comes online or gets offline |
| [SessionExpired](#group-psrapi-psrapi) | Event, which gets triggered, when the Session has expired and another login has to be done |

#### Fields

| Name | Description |
| --- | --- |
| [ActiveDirectoryManager](#group-psrapi-psrapi) | Contains methods regarding Active Directory profiles and imports. |
| [ApiKeyManager](#group-psrapi-psrapi) | Contains methods to retreive information from API keys |
| [ApplicationManager](#group-psrapi-psrapi) | Contains methods to manipulate applications. |
| [AuthenticationManagerV2](#group-psrapi-psrapi) | Use the [AuthenticationManagerV2](#group-psrapi-psrapi) to authenticate at the Netwrix Password Secure Server with the new authentication flow |
| [ContainerManager](#group-psrapi-psrapi) | Contains methods to manipulate containers. Containers are passwords, forms and documents |
| [DataBindingManager](#group-psrapi-psrapi) | Contains methods to manipulate data bindings. Data bindings describe relationsships between objects of type [PsrData](data-models.md#group-psrapi-data-psrdata) |
| [DataImageManager](#group-psrapi-psrapi) | Contains methods to manipulate and load DataImages, which for example contain /> |
| [EncryptionManager](#group-psrapi-psrapi) | Contains methods for cryptographic operations like encryption, decryption, signatures etc. |
| [ExternalLinkManager](#group-psrapi-psrapi) | Contains methods to create external links |
| [ForwardingRuleManager](#group-psrapi-psrapi) | Contains methods regarding forwarding rules. |
| [GenericRightManager](#group-psrapi-psrapi) | Contains a method to manipulate the data rights for any [PsrData](data-models.md#group-psrapi-data-psrdata) objects. |
| [LicenseManager](#group-psrapi-psrapi) | Contains methods regarding licensing |
| [LogbookManager](#group-psrapi-psrapi) | Contains methods regarding logbooks. Logbooks are single logbook entries. |
| [MailingManager](#group-psrapi-psrapi) | Contains methods regarding mailing |
| [OptionManager](#group-psrapi-psrapi) | Contains methods to manipulate options. Options are rights or settings that are typically applied to<br>objects of type [PsrOrganisationUnit](data-models.md#group-psrapi-data-psrorganisationunit), [PsrRole](data-models.md#group-psrapi-data-psrrole) or [PsrContainer](data-models.md#group-psrapi-data-psrcontainer) |
| [OrganisationUnitManager](#group-psrapi-psrapi) | Contains methods to manipulate organisation units. |
| [PasswordManager](#group-psrapi-psrapi) | Contains methods regarding passwords. |
| [PendingRightManager](#group-psrapi-psrapi) | Contains methods to manipulate pending data rights. |
| [PolicyManager](#group-psrapi-psrapi) | Contains methods to manipulate policies. Policies are validation rules to validate passwords against. |
| [RealtimeEventManager](#group-psrapi-psrapi) | Contains realtime events. |
| [RightManager](#group-psrapi-psrapi) | Contains methods to manipulate data rights. |
| [RoleManager](#group-psrapi-psrapi) | Contains methods to manipulate roles. |
| [SealManager](#group-psrapi-psrapi) | Contains methods to manipulate seals. |
| [SynchronizationManager](#group-psrapi-psrapi) | Exposes Methods to synchronize with a psrserver using transactions. |
| [TagManager](#group-psrapi-psrapi) | Contains methods to manipulate tags. Tags can be applied to almost every object of type [PsrData](data-models.md#group-psrapi-data-psrdata) |
| [TemplateManager](#group-psrapi-psrapi) | Contains methods to manipulate templates. |
| [TriggerManager](#group-psrapi-psrapi) | Contains methods to manipulate triggers. |
| [UserKeyManager](#group-psrapi-psrapi) | Contains information about the keys of the user |

#### See Also

###### Reference

[PsrApi Namespace](#group-psrapi)

### PsrApi Constructor

Creates a new instance of [PsrApi](#group-psrapi-psrapi) with a specific endpoint address.

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public PsrApi(
	string endpoint,
	PsrApiOptions options = null
)
```

###### Parameters

endpointType: SystemString

IP address or hostname of the Netwrix Password Secure Server. The web services have to be running on that Netwrix Password Secure Server instance.
options (Optional)Type: [PsrApi.DataPsrApiOptions](data-models.md#group-psrapi-data-psrapioptions)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi Properties

The [PsrApi](#group-psrapi-psrapi) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [CurrentUser](#group-psrapi-psrapi) | The [PsrOrganisationUnitUser](data-models.md#group-psrapi-data-psrorganisationunituser) of the current session. Only set if a session is active. |
| [SessionExpirationUtc](#group-psrapi-psrapi) | Determinates when the Session is closed |
| [SessionState](#group-psrapi-psrapi) | The session state the connection currently is in |

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.CurrentUser Property

The [PsrOrganisationUnitUser](data-models.md#group-psrapi-data-psrorganisationunituser) of the current session. Only set if a session is active.

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public PsrOrganisationUnitUser CurrentUser { get; }
```

###### Property Value

Type: [PsrOrganisationUnitUser](data-models.md#group-psrapi-data-psrorganisationunituser)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.SessionExpirationUtc Property

Determinates when the Session is closed

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public Nullable<DateTime> SessionExpirationUtc { get; }
```

###### Property Value

Type: NullableDateTime

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.SessionState Property

The session state the connection currently is in

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public PsrSessionState SessionState { get; }
```

###### Property Value

Type: [PsrSessionState](authentication-and-sessions.md#group-psrapi-psrsessionstate)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi Methods

The [PsrApi](#group-psrapi-psrapi) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GetActiveDatabaseNames](#group-psrapi-psrapi) | Gibt eine Liste der bekannten Datenbanken zurück |
| [GetEncryptionVersion](#group-psrapi-psrapi) | Returns the encryption version for the connected database |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [GetVersion](#group-psrapi-psrapi) | Returns the current SDK Version |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.GetActiveDatabaseNames Method

Gibt eine Liste der bekannten Datenbanken zurück

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public Task<List<string>> GetActiveDatabaseNames()
```

###### Return Value

Type: TaskListString

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.GetEncryptionVersion Method

Returns the encryption version for the connected database

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public Task<int> GetEncryptionVersion()
```

###### Return Value

Type: TaskInt32

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.GetVersion Method

Returns the current SDK Version

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public static string GetVersion()
```

###### Return Value

Type: String

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi Events

The [PsrApi](#group-psrapi-psrapi) type exposes the following members.

#### Events

| Name | Description |
| --- | --- |
| [ServerStatusChanged](#group-psrapi-psrapi) | Event, which gets triggered, when the Server comes online or gets offline |
| [SessionExpired](#group-psrapi-psrapi) | Event, which gets triggered, when the Session has expired and another login has to be done |

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.ServerStatusChanged Event

Event, which gets triggered, when the Server comes online or gets offline

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public event EventHandler<PsrServerStatus> ServerStatusChanged
```

###### Value

Type: SystemEventHandler[PsrServerStatus](enums-and-constants.md#group-psrapi-data-enums-psrserverstatus)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.SessionExpired Event

Event, which gets triggered, when the Session has expired and another login has to be done

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public event EventHandler SessionExpired
```

###### Value

Type: SystemEventHandler

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi Fields

The [PsrApi](#group-psrapi-psrapi) type exposes the following members.

#### Fields

| Name | Description |
| --- | --- |
| [ActiveDirectoryManager](#group-psrapi-psrapi) | Contains methods regarding Active Directory profiles and imports. |
| [ApiKeyManager](#group-psrapi-psrapi) | Contains methods to retreive information from API keys |
| [ApplicationManager](#group-psrapi-psrapi) | Contains methods to manipulate applications. |
| [AuthenticationManagerV2](#group-psrapi-psrapi) | Use the [AuthenticationManagerV2](#group-psrapi-psrapi) to authenticate at the Netwrix Password Secure Server with the new authentication flow |
| [ContainerManager](#group-psrapi-psrapi) | Contains methods to manipulate containers. Containers are passwords, forms and documents |
| [DataBindingManager](#group-psrapi-psrapi) | Contains methods to manipulate data bindings. Data bindings describe relationsships between objects of type [PsrData](data-models.md#group-psrapi-data-psrdata) |
| [DataImageManager](#group-psrapi-psrapi) | Contains methods to manipulate and load DataImages, which for example contain /> |
| [EncryptionManager](#group-psrapi-psrapi) | Contains methods for cryptographic operations like encryption, decryption, signatures etc. |
| [ExternalLinkManager](#group-psrapi-psrapi) | Contains methods to create external links |
| [ForwardingRuleManager](#group-psrapi-psrapi) | Contains methods regarding forwarding rules. |
| [GenericRightManager](#group-psrapi-psrapi) | Contains a method to manipulate the data rights for any [PsrData](data-models.md#group-psrapi-data-psrdata) objects. |
| [LicenseManager](#group-psrapi-psrapi) | Contains methods regarding licensing |
| [LogbookManager](#group-psrapi-psrapi) | Contains methods regarding logbooks. Logbooks are single logbook entries. |
| [MailingManager](#group-psrapi-psrapi) | Contains methods regarding mailing |
| [OptionManager](#group-psrapi-psrapi) | Contains methods to manipulate options. Options are rights or settings that are typically applied to<br>objects of type [PsrOrganisationUnit](data-models.md#group-psrapi-data-psrorganisationunit), [PsrRole](data-models.md#group-psrapi-data-psrrole) or [PsrContainer](data-models.md#group-psrapi-data-psrcontainer) |
| [OrganisationUnitManager](#group-psrapi-psrapi) | Contains methods to manipulate organisation units. |
| [PasswordManager](#group-psrapi-psrapi) | Contains methods regarding passwords. |
| [PendingRightManager](#group-psrapi-psrapi) | Contains methods to manipulate pending data rights. |
| [PolicyManager](#group-psrapi-psrapi) | Contains methods to manipulate policies. Policies are validation rules to validate passwords against. |
| [RealtimeEventManager](#group-psrapi-psrapi) | Contains realtime events. |
| [RightManager](#group-psrapi-psrapi) | Contains methods to manipulate data rights. |
| [RoleManager](#group-psrapi-psrapi) | Contains methods to manipulate roles. |
| [SealManager](#group-psrapi-psrapi) | Contains methods to manipulate seals. |
| [SynchronizationManager](#group-psrapi-psrapi) | Exposes Methods to synchronize with a psrserver using transactions. |
| [TagManager](#group-psrapi-psrapi) | Contains methods to manipulate tags. Tags can be applied to almost every object of type [PsrData](data-models.md#group-psrapi-data-psrdata) |
| [TemplateManager](#group-psrapi-psrapi) | Contains methods to manipulate templates. |
| [TriggerManager](#group-psrapi-psrapi) | Contains methods to manipulate triggers. |
| [UserKeyManager](#group-psrapi-psrapi) | Contains information about the keys of the user |

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.ActiveDirectoryManager Field

Contains methods regarding Active Directory profiles and imports.

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public readonly ActiveDirectoryManager ActiveDirectoryManager
```

###### Field Value

Type: [ActiveDirectoryManager](managers.md#group-psrapi-managers-activedirectorymanager)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.ApiKeyManager Field

Contains methods to retreive information from API keys

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public readonly ApiKeyManager ApiKeyManager
```

###### Field Value

Type: [ApiKeyManager](authentication-and-sessions.md#group-psrapi-managers-apikeymanager)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.ApplicationManager Field

Contains methods to manipulate applications.

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public readonly ApplicationManager ApplicationManager
```

###### Field Value

Type: [ApplicationManager](managers.md#group-psrapi-managers-applicationmanager)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.AuthenticationManagerV2 Field

Use the AuthenticationManagerV2 to authenticate at the Netwrix Password Secure Server with the new authentication flow

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public readonly AuthenticationManagerV2 AuthenticationManagerV2
```

###### Field Value

Type: [AuthenticationManagerV2](authentication-and-sessions.md#group-psrapi-managers-authenticationmanagerv2)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.ContainerManager Field

Contains methods to manipulate containers. Containers are passwords, forms and documents

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public readonly ContainerManager ContainerManager
```

###### Field Value

Type: [ContainerManager](managers.md#group-psrapi-managers-containermanager)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.DataBindingManager Field

Contains methods to manipulate data bindings. Data bindings describe relationsships between objects of type [PsrData](data-models.md#group-psrapi-data-psrdata)

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public readonly DataBindingManager DataBindingManager
```

###### Field Value

Type: [DataBindingManager](managers.md#group-psrapi-managers-databindingmanager)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.DataImageManager Field

Contains methods to manipulate and load DataImages, which for example contain />

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public readonly DataImageManager DataImageManager
```

###### Field Value

Type: [DataImageManager](managers.md#group-psrapi-managers-dataimagemanager)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.EncryptionManager Field

Contains methods for cryptographic operations like encryption, decryption, signatures etc.

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public readonly EncryptionManager EncryptionManager
```

###### Field Value

Type: [EncryptionManager](managers.md#group-psrapi-managers-encryptionmanager)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.ExternalLinkManager Field

Contains methods to create external links

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public readonly ExternalLinkManager ExternalLinkManager
```

###### Field Value

Type: [ExternalLinkManager](managers.md#group-psrapi-managers-externallinkmanager)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.ForwardingRuleManager Field

Contains methods regarding forwarding rules.

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public readonly ForwardingRuleManager ForwardingRuleManager
```

###### Field Value

Type: [ForwardingRuleManager](managers.md#group-psrapi-managers-forwardingrulemanager)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.GenericRightManager Field

Contains a method to manipulate the data rights for any [PsrData](data-models.md#group-psrapi-data-psrdata) objects.

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public readonly GenericRightManager GenericRightManager
```

###### Field Value

Type: [GenericRightManager](managers.md#group-psrapi-managers-genericrightmanager)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.LicenseManager Field

Contains methods regarding licensing

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public readonly LicenseManager LicenseManager
```

###### Field Value

Type: [LicenseManager](managers.md#group-psrapi-managers-licensemanager)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.LogbookManager Field

Contains methods regarding logbooks. Logbooks are single logbook entries.

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public readonly LogbookManager LogbookManager
```

###### Field Value

Type: [LogbookManager](managers.md#group-psrapi-managers-logbookmanager)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.MailingManager Field

Contains methods regarding mailing

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public readonly MailingManager MailingManager
```

###### Field Value

Type: [MailingManager](managers.md#group-psrapi-managers-mailingmanager)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.OptionManager Field

Contains methods to manipulate options. Options are rights or settings that are typically applied to
objects of type [PsrOrganisationUnit](data-models.md#group-psrapi-data-psrorganisationunit), [PsrRole](data-models.md#group-psrapi-data-psrrole) or [PsrContainer](data-models.md#group-psrapi-data-psrcontainer)

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public readonly OptionManager OptionManager
```

###### Field Value

Type: [OptionManager](managers.md#group-psrapi-managers-optionmanager)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.OrganisationUnitManager Field

Contains methods to manipulate organisation units.

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public readonly OrganisationUnitManager OrganisationUnitManager
```

###### Field Value

Type: [OrganisationUnitManager](managers.md#group-psrapi-managers-organisationunitmanager)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.PasswordManager Field

Contains methods regarding passwords.

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public readonly PasswordManager PasswordManager
```

###### Field Value

Type: [PasswordManager](managers.md#group-psrapi-managers-passwordmanager)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.PendingRightManager Field

Contains methods to manipulate pending data rights.

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public readonly PendingRightManager PendingRightManager
```

###### Field Value

Type: [PendingRightManager](managers.md#group-psrapi-managers-pendingrightmanager)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.PolicyManager Field

Contains methods to manipulate policies. Policies are validation rules to validate passwords against.

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public readonly PolicyManager PolicyManager
```

###### Field Value

Type: [PolicyManager](managers.md#group-psrapi-managers-policymanager)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.RealtimeEventManager Field

Contains realtime events.

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public readonly RealtimeEventManager RealtimeEventManager
```

###### Field Value

Type: [RealtimeEventManager](realtime-and-sync.md#group-psrapi-managers-realtimeeventmanager)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.RightManager Field

Contains methods to manipulate data rights.

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public readonly RightManager RightManager
```

###### Field Value

Type: [RightManager](managers.md#group-psrapi-managers-rightmanager)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.RoleManager Field

Contains methods to manipulate roles.

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public readonly RoleManager RoleManager
```

###### Field Value

Type: [RoleManager](managers.md#group-psrapi-managers-rolemanager)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.SealManager Field

Contains methods to manipulate seals.

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public readonly SealManager SealManager
```

###### Field Value

Type: [SealManager](managers.md#group-psrapi-managers-sealmanager)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.SynchronizationManager Field

Exposes Methods to synchronize with a psrserver using transactions.

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public readonly SynchronizationManager SynchronizationManager
```

###### Field Value

Type: [SynchronizationManager](managers.md#group-psrapi-managers-synchronizationmanager)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.TagManager Field

Contains methods to manipulate tags. Tags can be applied to almost every object of type [PsrData](data-models.md#group-psrapi-data-psrdata)

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public readonly TagManager TagManager
```

###### Field Value

Type: [TagManager](managers.md#group-psrapi-managers-tagmanager)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.TemplateManager Field

Contains methods to manipulate templates.

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public readonly TemplateManager TemplateManager
```

###### Field Value

Type: [TemplateManager](managers.md#group-psrapi-managers-templatemanager)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.TriggerManager Field

Contains methods to manipulate triggers.

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public readonly TriggerManager TriggerManager
```

###### Field Value

Type: [TriggerManager](managers.md#group-psrapi-managers-triggermanager)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)

### PsrApi.UserKeyManager Field

Contains information about the keys of the user

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public readonly UserKeyManager UserKeyManager
```

###### Field Value

Type: [UserKeyManager](internals.md#group-psrapi-internals-userkeymanager)

#### See Also

###### Reference

[PsrApi Class](#group-psrapi-psrapi)

[PsrApi Namespace](#group-psrapi)


<a id="group-psrapi-psrapiexception"></a>
## PsrApiException

### PsrApiException Class

Netwrix Password Secure specific exception. Contains a [PsrApiExceptionCode](enums-and-constants.md#group-psrapi-psrapiexceptioncode) that describes the error in more detail

#### Inheritance Hierarchy

SystemObject
SystemException
PsrApiPsrApiException

#### Syntax

C#

```csharp
public class PsrApiException : Exception
```

#### Properties

| Name | Description |
| --- | --- |
| Data | Gets a collection of key/value pairs that provide additional user-defined information about the exception.<br><br>(Inherited from Exception.) |
| [ExceptionCode](#group-psrapi-psrapiexception) | The error code that describes the error in more detail |
| HelpLink | Gets or sets a link to the help file associated with this exception.<br><br>(Inherited from Exception.) |
| HResult | Gets or sets HRESULT, a coded numerical value that is assigned to a specific exception.<br><br>(Inherited from Exception.) |
| InnerException | Gets the Exception instance that caused the current exception.<br><br>(Inherited from Exception.) |
| Message | Gets a message that describes the current exception.<br><br>(Inherited from Exception.) |
| Source | Gets or sets the name of the application or the object that causes the error.<br><br>(Inherited from Exception.) |
| StackTrace | Gets a string representation of the immediate frames on the call stack.<br><br>(Inherited from Exception.) |
| TargetSite | Gets the method that throws the current exception.<br><br>(Inherited from Exception.) |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetBaseException | When overridden in a derived class, returns the Exception that is the root cause of one or more subsequent exceptions.<br><br>(Inherited from Exception.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetObjectData | When overridden in a derived class, sets the SerializationInfo with information about the exception.<br><br>(Inherited from Exception.) |
| GetType | Gets the runtime type of the current instance.<br><br>(Inherited from Exception.) |
| ToString | Creates and returns a string representation of the current exception.<br><br>(Inherited from Exception.) |

#### See Also

###### Reference

[PsrApi Namespace](#group-psrapi)

### PsrApiException Properties

The [PsrApiException](#group-psrapi-psrapiexception) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| Data | Gets a collection of key/value pairs that provide additional user-defined information about the exception.<br><br>(Inherited from Exception.) |
| [ExceptionCode](#group-psrapi-psrapiexception) | The error code that describes the error in more detail |
| HelpLink | Gets or sets a link to the help file associated with this exception.<br><br>(Inherited from Exception.) |
| HResult | Gets or sets HRESULT, a coded numerical value that is assigned to a specific exception.<br><br>(Inherited from Exception.) |
| InnerException | Gets the Exception instance that caused the current exception.<br><br>(Inherited from Exception.) |
| Message | Gets a message that describes the current exception.<br><br>(Inherited from Exception.) |
| Source | Gets or sets the name of the application or the object that causes the error.<br><br>(Inherited from Exception.) |
| StackTrace | Gets a string representation of the immediate frames on the call stack.<br><br>(Inherited from Exception.) |
| TargetSite | Gets the method that throws the current exception.<br><br>(Inherited from Exception.) |

#### See Also

###### Reference

[PsrApiException Class](#group-psrapi-psrapiexception)

[PsrApi Namespace](#group-psrapi)

### PsrApiException.ExceptionCode Property

The error code that describes the error in more detail

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public PsrApiExceptionCode ExceptionCode { get; set; }
```

###### Property Value

Type: [PsrApiExceptionCode](enums-and-constants.md#group-psrapi-psrapiexceptioncode)

#### See Also

###### Reference

[PsrApiException Class](#group-psrapi-psrapiexception)

[PsrApi Namespace](#group-psrapi)

### PsrApiException Methods

The [PsrApiException](#group-psrapi-psrapiexception) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetBaseException | When overridden in a derived class, returns the Exception that is the root cause of one or more subsequent exceptions.<br><br>(Inherited from Exception.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetObjectData | When overridden in a derived class, sets the SerializationInfo with information about the exception.<br><br>(Inherited from Exception.) |
| GetType | Gets the runtime type of the current instance.<br><br>(Inherited from Exception.) |
| ToString | Creates and returns a string representation of the current exception.<br><br>(Inherited from Exception.) |

#### See Also

###### Reference

[PsrApiException Class](#group-psrapi-psrapiexception)

[PsrApi Namespace](#group-psrapi)


<a id="group-psrapi-psrserviceexception"></a>
## PsrServiceException

### PsrServiceException Class

Exceptions that are thrown by Netwrix Password Secure Server

#### Inheritance Hierarchy

SystemObject
SystemException
PsrApiPsrServiceException

#### Syntax

C#

```csharp
public class PsrServiceException : Exception
```

#### Constructors

| Name | Description |
| --- | --- |
| [PsrServiceException](#group-psrapi-psrserviceexception) | Creates a new instance of PsrServiceException. |

#### Properties

| Name | Description |
| --- | --- |
| [AdditionalData](#group-psrapi-psrserviceexception) | JSON serialized additional data |
| Data | Gets a collection of key/value pairs that provide additional user-defined information about the exception.<br><br>(Inherited from Exception.) |
| [ExceptionCode](#group-psrapi-psrserviceexception) | ExceptionCode |
| [FaultCode](#group-psrapi-psrserviceexception) | FaultCode |
| [FaultNameSpace](#group-psrapi-psrserviceexception) | FaultNameSpace is filled with additional information if [FaultCode](#group-psrapi-psrserviceexception) is filled |
| HelpLink | Gets or sets a link to the help file associated with this exception.<br><br>(Inherited from Exception.) |
| HResult | Gets or sets HRESULT, a coded numerical value that is assigned to a specific exception.<br><br>(Inherited from Exception.) |
| InnerException | Gets the Exception instance that caused the current exception.<br><br>(Inherited from Exception.) |
| Message | Gets a message that describes the current exception.<br><br>(Inherited from Exception.) |
| Source | Gets or sets the name of the application or the object that causes the error.<br><br>(Inherited from Exception.) |
| StackTrace | Gets a string representation of the immediate frames on the call stack.<br><br>(Inherited from Exception.) |
| TargetSite | Gets the method that throws the current exception.<br><br>(Inherited from Exception.) |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetBaseException | When overridden in a derived class, returns the Exception that is the root cause of one or more subsequent exceptions.<br><br>(Inherited from Exception.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetObjectData | When overridden in a derived class, sets the SerializationInfo with information about the exception.<br><br>(Inherited from Exception.) |
| GetType | Gets the runtime type of the current instance.<br><br>(Inherited from Exception.) |
| ToString | Creates and returns a string representation of the current exception.<br><br>(Inherited from Exception.) |

#### See Also

###### Reference

[PsrApi Namespace](#group-psrapi)

### PsrServiceException Constructor

Creates a new instance of [PsrServiceException](#group-psrapi-psrserviceexception).

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public PsrServiceException(
	string message
)
```

###### Parameters

messageType: SystemString

#### See Also

###### Reference

[PsrServiceException Class](#group-psrapi-psrserviceexception)

[PsrApi Namespace](#group-psrapi)

### PsrServiceException Properties

The [PsrServiceException](#group-psrapi-psrserviceexception) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [AdditionalData](#group-psrapi-psrserviceexception) | JSON serialized additional data |
| Data | Gets a collection of key/value pairs that provide additional user-defined information about the exception.<br><br>(Inherited from Exception.) |
| [ExceptionCode](#group-psrapi-psrserviceexception) | ExceptionCode |
| [FaultCode](#group-psrapi-psrserviceexception) | FaultCode |
| [FaultNameSpace](#group-psrapi-psrserviceexception) | FaultNameSpace is filled with additional information if [FaultCode](#group-psrapi-psrserviceexception) is filled |
| HelpLink | Gets or sets a link to the help file associated with this exception.<br><br>(Inherited from Exception.) |
| HResult | Gets or sets HRESULT, a coded numerical value that is assigned to a specific exception.<br><br>(Inherited from Exception.) |
| InnerException | Gets the Exception instance that caused the current exception.<br><br>(Inherited from Exception.) |
| Message | Gets a message that describes the current exception.<br><br>(Inherited from Exception.) |
| Source | Gets or sets the name of the application or the object that causes the error.<br><br>(Inherited from Exception.) |
| StackTrace | Gets a string representation of the immediate frames on the call stack.<br><br>(Inherited from Exception.) |
| TargetSite | Gets the method that throws the current exception.<br><br>(Inherited from Exception.) |

#### See Also

###### Reference

[PsrServiceException Class](#group-psrapi-psrserviceexception)

[PsrApi Namespace](#group-psrapi)

### PsrServiceException.AdditionalData Property

JSON serialized additional data

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public string AdditionalData { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[PsrServiceException Class](#group-psrapi-psrserviceexception)

[PsrApi Namespace](#group-psrapi)

### PsrServiceException.ExceptionCode Property

ExceptionCode

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public PsrApiExceptionCode ExceptionCode { get; set; }
```

###### Property Value

Type: [PsrApiExceptionCode](enums-and-constants.md#group-psrapi-psrapiexceptioncode)

#### See Also

###### Reference

[PsrServiceException Class](#group-psrapi-psrserviceexception)

[PsrApi Namespace](#group-psrapi)

### PsrServiceException.FaultCode Property

FaultCode

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public string FaultCode { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[PsrServiceException Class](#group-psrapi-psrserviceexception)

[PsrApi Namespace](#group-psrapi)

### PsrServiceException.FaultNameSpace Property

FaultNameSpace is filled with additional information if [FaultCode](#group-psrapi-psrserviceexception) is filled

Namespace:
[PsrApi](#group-psrapi)

#### Syntax

C#

```csharp
public string FaultNameSpace { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[PsrServiceException Class](#group-psrapi-psrserviceexception)

[PsrApi Namespace](#group-psrapi)

### PsrServiceException Methods

The [PsrServiceException](#group-psrapi-psrserviceexception) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetBaseException | When overridden in a derived class, returns the Exception that is the root cause of one or more subsequent exceptions.<br><br>(Inherited from Exception.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetObjectData | When overridden in a derived class, sets the SerializationInfo with information about the exception.<br><br>(Inherited from Exception.) |
| GetType | Gets the runtime type of the current instance.<br><br>(Inherited from Exception.) |
| ToString | Creates and returns a string representation of the current exception.<br><br>(Inherited from Exception.) |

#### See Also

###### Reference

[PsrServiceException Class](#group-psrapi-psrserviceexception)

[PsrApi Namespace](#group-psrapi)
