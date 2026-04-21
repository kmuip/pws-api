# Authentication and Sessions

This handbook groups session lifecycle, authentication flow, API key inspection, and auth-flow support types.

- Primary JS managers: `authenticationManagerV2` and `apiKeyManager`
- Browser and Node runtimes both expose the same manager names on the root `PsrApi` instance.
- Included official SDK pages: `103` across `17` grouped sections.

## Contents

- [PsrApi.Internals.AuthFlow](#group-psrapi-internals-authflow)
- [PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)
- [AuthenticatedLoginData](#group-psrapi-internals-authflow-data-authenticatedlogindata)
- [AuthenticationField](#group-psrapi-internals-authflow-data-authenticationfield)
- [AuthenticationRequirements](#group-psrapi-internals-authflow-data-authenticationrequirements)
- [DynamicFillableAuthentication](#group-psrapi-internals-authflow-data-dynamicfillableauthentication)
- [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication)
- [FillableChangePasswordAuthentication](#group-psrapi-internals-authflow-data-fillablechangepasswordauthentication)
- [FillableGoogleAuthConfiguration](#group-psrapi-internals-authflow-data-fillablegoogleauthconfiguration)
- [FillableOdicCredential](#group-psrapi-internals-authflow-data-fillableodiccredential)
- [FillablePkiConfiguration](#group-psrapi-internals-authflow-data-fillablepkiconfiguration)
- [FillablePkiCredential](#group-psrapi-internals-authflow-data-fillablepkicredential)
- [FillableSmartCardCredential](#group-psrapi-internals-authflow-data-fillablesmartcardcredential)
- [IAuthenticationFlow](#group-psrapi-internals-authflow-iauthenticationflow)
- [ApiKeyManager](#group-psrapi-managers-apikeymanager)
- [AuthenticationManagerV2](#group-psrapi-managers-authenticationmanagerv2)
- [PsrSessionState](#group-psrapi-psrsessionstate)

<a id="group-psrapi-internals-authflow"></a>
## PsrApi.Internals.AuthFlow

### PsrApi.Internals.AuthFlow Namespace

#### Interfaces

| Interface | Description |
| --- | --- |
| [IAuthenticationFlow](#group-psrapi-internals-authflow-iauthenticationflow) |  |


<a id="group-psrapi-internals-authflow-data"></a>
## PsrApi.Internals.AuthFlow.Data

### PsrApi.Internals.AuthFlow.Data Namespace

#### Classes

| Class | Description |
| --- | --- |
| [AuthenticatedLoginData](#group-psrapi-internals-authflow-data-authenticatedlogindata) | Wrapper-Klasse mit Daten die nach dem erfolreichen Login über den AuthenticationFlow dem Client bereitgestellt werden |
| [AuthenticationField](#group-psrapi-internals-authflow-data-authenticationfield) |  |
| [AuthenticationRequirements](#group-psrapi-internals-authflow-data-authenticationrequirements) | Liste nächster möglicher Schritte, aus der der Benutzer entscheiden kann was er als nächstes macht für die Anmeldung |
| [DynamicFillableAuthentication](#group-psrapi-internals-authflow-data-dynamicfillableauthentication) |  |
| [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication) |  |
| [FillableChangePasswordAuthentication](#group-psrapi-internals-authflow-data-fillablechangepasswordauthentication) |  |
| [FillableGoogleAuthConfiguration](#group-psrapi-internals-authflow-data-fillablegoogleauthconfiguration) |  |
| [FillableOdicCredential](#group-psrapi-internals-authflow-data-fillableodiccredential) |  |
| [FillablePkiConfiguration](#group-psrapi-internals-authflow-data-fillablepkiconfiguration) |  |
| [FillablePkiCredential](#group-psrapi-internals-authflow-data-fillablepkicredential) |  |
| [FillableSmartCardCredential](#group-psrapi-internals-authflow-data-fillablesmartcardcredential) |  |


<a id="group-psrapi-internals-authflow-data-authenticatedlogindata"></a>
## AuthenticatedLoginData

### AuthenticatedLoginData Class

Wrapper-Klasse mit Daten die nach dem erfolreichen Login über den AuthenticationFlow dem Client bereitgestellt werden

#### Inheritance Hierarchy

SystemObject
PsrApi.Internals.AuthFlow.DataAuthenticatedLoginData

#### Syntax

C#

```csharp
public class AuthenticatedLoginData
```

#### Constructors

| Name | Description |
| --- | --- |
| [AuthenticatedLoginData](#group-psrapi-internals-authflow-data-authenticatedlogindata) | Initializes a new instance of the AuthenticatedLoginData class |

#### Properties

| Name | Description |
| --- | --- |
| [Keys](#group-psrapi-internals-authflow-data-authenticatedlogindata) | The Key from the user |
| [SessionId](#group-psrapi-internals-authflow-data-authenticatedlogindata) | Die SessionId, welcher für die Verbindung verwendet wird |
| [SessionKey](#group-psrapi-internals-authflow-data-authenticatedlogindata) | The session key |
| [UserId](#group-psrapi-internals-authflow-data-authenticatedlogindata) | Die Benutzer-ID des authentifizierten Benutzers |
| [UserName](#group-psrapi-internals-authflow-data-authenticatedlogindata) | Der Username des authentifizierten Benutzers |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [InitializeCurrentUserKeys](#group-psrapi-internals-authflow-data-authenticatedlogindata) |  |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### AuthenticatedLoginData Constructor

Initializes a new instance of the [AuthenticatedLoginData](#group-psrapi-internals-authflow-data-authenticatedlogindata) class

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public AuthenticatedLoginData()
```

#### See Also

###### Reference

[AuthenticatedLoginData Class](#group-psrapi-internals-authflow-data-authenticatedlogindata)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### AuthenticatedLoginData Properties

The [AuthenticatedLoginData](#group-psrapi-internals-authflow-data-authenticatedlogindata) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [Keys](#group-psrapi-internals-authflow-data-authenticatedlogindata) | The Key from the user |
| [SessionId](#group-psrapi-internals-authflow-data-authenticatedlogindata) | Die SessionId, welcher für die Verbindung verwendet wird |
| [SessionKey](#group-psrapi-internals-authflow-data-authenticatedlogindata) | The session key |
| [UserId](#group-psrapi-internals-authflow-data-authenticatedlogindata) | Die Benutzer-ID des authentifizierten Benutzers |
| [UserName](#group-psrapi-internals-authflow-data-authenticatedlogindata) | Der Username des authentifizierten Benutzers |

#### See Also

###### Reference

[AuthenticatedLoginData Class](#group-psrapi-internals-authflow-data-authenticatedlogindata)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### AuthenticatedLoginData.Keys Property

The Key from the user

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public List<UserKeyManagerKey> Keys { get; set; }
```

###### Property Value

Type: List[UserKeyManagerKey](internals.md#group-psrapi-internals-userkeymanager-key)

#### See Also

###### Reference

[AuthenticatedLoginData Class](#group-psrapi-internals-authflow-data-authenticatedlogindata)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### AuthenticatedLoginData.SessionId Property

Die SessionId, welcher für die Verbindung verwendet wird

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public string SessionId { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[AuthenticatedLoginData Class](#group-psrapi-internals-authflow-data-authenticatedlogindata)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### AuthenticatedLoginData.SessionKey Property

The session key

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public string SessionKey { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[AuthenticatedLoginData Class](#group-psrapi-internals-authflow-data-authenticatedlogindata)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### AuthenticatedLoginData.UserId Property

Die Benutzer-ID des authentifizierten Benutzers

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public Guid UserId { get; set; }
```

###### Property Value

Type: Guid

#### See Also

###### Reference

[AuthenticatedLoginData Class](#group-psrapi-internals-authflow-data-authenticatedlogindata)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### AuthenticatedLoginData.UserName Property

Der Username des authentifizierten Benutzers

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public string UserName { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[AuthenticatedLoginData Class](#group-psrapi-internals-authflow-data-authenticatedlogindata)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### AuthenticatedLoginData Methods

The [AuthenticatedLoginData](#group-psrapi-internals-authflow-data-authenticatedlogindata) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [InitializeCurrentUserKeys](#group-psrapi-internals-authflow-data-authenticatedlogindata) |  |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[AuthenticatedLoginData Class](#group-psrapi-internals-authflow-data-authenticatedlogindata)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### AuthenticatedLoginData.InitializeCurrentUserKeys Method

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public void InitializeCurrentUserKeys(
	Guid userId,
	byte[] userPrivateKey,
	Dictionary<Guid, byte[]> encryptedRoleRightKeys
)
```

###### Parameters

userIdType: SystemGuid
userPrivateKeyType: SystemByte
encryptedRoleRightKeysType: System.Collections.GenericDictionaryGuid, Byte

#### See Also

###### Reference

[AuthenticatedLoginData Class](#group-psrapi-internals-authflow-data-authenticatedlogindata)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)


<a id="group-psrapi-internals-authflow-data-authenticationfield"></a>
## AuthenticationField

### AuthenticationField Class

#### Inheritance Hierarchy

SystemObject
PsrApi.Internals.AuthFlow.DataAuthenticationField

#### Syntax

C#

```csharp
public class AuthenticationField
```

#### Constructors

| Name | Description |
| --- | --- |
| [AuthenticationField](#group-psrapi-internals-authflow-data-authenticationfield) | Initializes a new instance of the AuthenticationField class |

#### Properties

| Name | Description |
| --- | --- |
| [FieldType](#group-psrapi-internals-authflow-data-authenticationfield) |  |
| [Key](#group-psrapi-internals-authflow-data-authenticationfield) |  |
| [Value](#group-psrapi-internals-authflow-data-authenticationfield) |  |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### AuthenticationField Constructor

Initializes a new instance of the [AuthenticationField](#group-psrapi-internals-authflow-data-authenticationfield) class

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public AuthenticationField()
```

#### See Also

###### Reference

[AuthenticationField Class](#group-psrapi-internals-authflow-data-authenticationfield)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### AuthenticationField Properties

The [AuthenticationField](#group-psrapi-internals-authflow-data-authenticationfield) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [FieldType](#group-psrapi-internals-authflow-data-authenticationfield) |  |
| [Key](#group-psrapi-internals-authflow-data-authenticationfield) |  |
| [Value](#group-psrapi-internals-authflow-data-authenticationfield) |  |

#### See Also

###### Reference

[AuthenticationField Class](#group-psrapi-internals-authflow-data-authenticationfield)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### AuthenticationField.FieldType Property

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public AuthenticationFieldType FieldType { get; set; }
```

###### Property Value

Type: [AuthenticationFieldType](data-models.md#group-psrapi-data-authentication-enums-authenticationfieldtype)

#### See Also

###### Reference

[AuthenticationField Class](#group-psrapi-internals-authflow-data-authenticationfield)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### AuthenticationField.Key Property

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public string Key { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[AuthenticationField Class](#group-psrapi-internals-authflow-data-authenticationfield)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### AuthenticationField.Value Property

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public string Value { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[AuthenticationField Class](#group-psrapi-internals-authflow-data-authenticationfield)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### AuthenticationField Methods

The [AuthenticationField](#group-psrapi-internals-authflow-data-authenticationfield) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[AuthenticationField Class](#group-psrapi-internals-authflow-data-authenticationfield)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)


<a id="group-psrapi-internals-authflow-data-authenticationrequirements"></a>
## AuthenticationRequirements

### AuthenticationRequirements Class

Liste nächster möglicher Schritte, aus der der Benutzer entscheiden kann was er als nächstes macht für die Anmeldung

#### Inheritance Hierarchy

SystemObject
PsrApi.Internals.AuthFlow.DataAuthenticationRequirements

#### Syntax

C#

```csharp
public class AuthenticationRequirements
```

#### Constructors

| Name | Description |
| --- | --- |
| [AuthenticationRequirements](#group-psrapi-internals-authflow-data-authenticationrequirements) | Initializes a new instance of the AuthenticationRequirements class |

#### Properties

| Name | Description |
| --- | --- |
| [IsConfiguration](#group-psrapi-internals-authflow-data-authenticationrequirements) | Gibt zurück, ob es sich um eine Konfiguration handelt. |
| [PossibleRequirements](#group-psrapi-internals-authflow-data-authenticationrequirements) | Liste möglicher Authentifizierungen |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### AuthenticationRequirements Constructor

Initializes a new instance of the [AuthenticationRequirements](#group-psrapi-internals-authflow-data-authenticationrequirements) class

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public AuthenticationRequirements()
```

#### See Also

###### Reference

[AuthenticationRequirements Class](#group-psrapi-internals-authflow-data-authenticationrequirements)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### AuthenticationRequirements Properties

The [AuthenticationRequirements](#group-psrapi-internals-authflow-data-authenticationrequirements) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [IsConfiguration](#group-psrapi-internals-authflow-data-authenticationrequirements) | Gibt zurück, ob es sich um eine Konfiguration handelt. |
| [PossibleRequirements](#group-psrapi-internals-authflow-data-authenticationrequirements) | Liste möglicher Authentifizierungen |

#### See Also

###### Reference

[AuthenticationRequirements Class](#group-psrapi-internals-authflow-data-authenticationrequirements)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### AuthenticationRequirements.IsConfiguration Property

Gibt zurück, ob es sich um eine Konfiguration handelt.

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public bool IsConfiguration { get; set; }
```

###### Property Value

Type: Boolean

#### See Also

###### Reference

[AuthenticationRequirements Class](#group-psrapi-internals-authflow-data-authenticationrequirements)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### AuthenticationRequirements.PossibleRequirements Property

Liste möglicher Authentifizierungen

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public List<FillableAuthentication> PossibleRequirements { get; set; }
```

###### Property Value

Type: List[FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication)

#### See Also

###### Reference

[AuthenticationRequirements Class](#group-psrapi-internals-authflow-data-authenticationrequirements)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### AuthenticationRequirements Methods

The [AuthenticationRequirements](#group-psrapi-internals-authflow-data-authenticationrequirements) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[AuthenticationRequirements Class](#group-psrapi-internals-authflow-data-authenticationrequirements)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)


<a id="group-psrapi-internals-authflow-data-dynamicfillableauthentication"></a>
## DynamicFillableAuthentication

### DynamicFillableAuthentication Class

#### Inheritance Hierarchy

SystemObject
[PsrApi.Internals.AuthFlow.DataFillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication)
PsrApi.Internals.AuthFlow.DataDynamicFillableAuthentication
[PsrApi.Internals.AuthFlow.DataFillableGoogleAuthConfiguration](#group-psrapi-internals-authflow-data-fillablegoogleauthconfiguration)
[PsrApi.Internals.AuthFlow.DataFillableSmartCardCredential](#group-psrapi-internals-authflow-data-fillablesmartcardcredential)

#### Syntax

C#

```csharp
public class DynamicFillableAuthentication : FillableAuthentication
```

#### Constructors

| Name | Description |
| --- | --- |
| [DynamicFillableAuthentication](#group-psrapi-internals-authflow-data-dynamicfillableauthentication) | Initializes a new instance of the DynamicFillableAuthentication class |

#### Properties

| Name | Description |
| --- | --- |
| [AuthType](#group-psrapi-internals-authflow-data-fillableauthentication) | (Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| [Fields](#group-psrapi-internals-authflow-data-dynamicfillableauthentication) |  |
| [Name](#group-psrapi-internals-authflow-data-fillableauthentication) | The name of the authentication<br><br>(Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [IsPasswordAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication) | Returns if the authentication is a password authentication<br><br>(Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### DynamicFillableAuthentication Constructor

Initializes a new instance of the [DynamicFillableAuthentication](#group-psrapi-internals-authflow-data-dynamicfillableauthentication) class

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public DynamicFillableAuthentication()
```

#### See Also

###### Reference

[DynamicFillableAuthentication Class](#group-psrapi-internals-authflow-data-dynamicfillableauthentication)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### DynamicFillableAuthentication Properties

The [DynamicFillableAuthentication](#group-psrapi-internals-authflow-data-dynamicfillableauthentication) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [AuthType](#group-psrapi-internals-authflow-data-fillableauthentication) | (Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| [Fields](#group-psrapi-internals-authflow-data-dynamicfillableauthentication) |  |
| [Name](#group-psrapi-internals-authflow-data-fillableauthentication) | The name of the authentication<br><br>(Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |

#### See Also

###### Reference

[DynamicFillableAuthentication Class](#group-psrapi-internals-authflow-data-dynamicfillableauthentication)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### DynamicFillableAuthentication.Fields Property

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public List<AuthenticationField> Fields { get; set; }
```

###### Property Value

Type: List[AuthenticationField](#group-psrapi-internals-authflow-data-authenticationfield)

#### See Also

###### Reference

[DynamicFillableAuthentication Class](#group-psrapi-internals-authflow-data-dynamicfillableauthentication)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### DynamicFillableAuthentication Methods

The [DynamicFillableAuthentication](#group-psrapi-internals-authflow-data-dynamicfillableauthentication) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [IsPasswordAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication) | Returns if the authentication is a password authentication<br><br>(Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[DynamicFillableAuthentication Class](#group-psrapi-internals-authflow-data-dynamicfillableauthentication)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)


<a id="group-psrapi-internals-authflow-data-fillableauthentication"></a>
## FillableAuthentication

### FillableAuthentication Class

#### Inheritance Hierarchy

SystemObject
PsrApi.Internals.AuthFlow.DataFillableAuthentication
[PsrApi.Internals.AuthFlow.DataDynamicFillableAuthentication](#group-psrapi-internals-authflow-data-dynamicfillableauthentication)
[PsrApi.Internals.AuthFlow.DataFillableChangePasswordAuthentication](#group-psrapi-internals-authflow-data-fillablechangepasswordauthentication)
[PsrApi.Internals.AuthFlow.DataFillableOdicCredential](#group-psrapi-internals-authflow-data-fillableodiccredential)
[PsrApi.Internals.AuthFlow.DataFillablePkiConfiguration](#group-psrapi-internals-authflow-data-fillablepkiconfiguration)
[PsrApi.Internals.AuthFlow.DataFillablePkiCredential](#group-psrapi-internals-authflow-data-fillablepkicredential)

#### Syntax

C#

```csharp
public class FillableAuthentication
```

#### Constructors

| Name | Description |
| --- | --- |
| [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication) | Initializes a new instance of the FillableAuthentication class |

#### Properties

| Name | Description |
| --- | --- |
| [AuthType](#group-psrapi-internals-authflow-data-fillableauthentication) |  |
| [Name](#group-psrapi-internals-authflow-data-fillableauthentication) | The name of the authentication |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [IsPasswordAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication) | Returns if the authentication is a password authentication |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableAuthentication Constructor

Initializes a new instance of the [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication) class

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public FillableAuthentication()
```

#### See Also

###### Reference

[FillableAuthentication Class](#group-psrapi-internals-authflow-data-fillableauthentication)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableAuthentication Properties

The [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [AuthType](#group-psrapi-internals-authflow-data-fillableauthentication) |  |
| [Name](#group-psrapi-internals-authflow-data-fillableauthentication) | The name of the authentication |

#### See Also

###### Reference

[FillableAuthentication Class](#group-psrapi-internals-authflow-data-fillableauthentication)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableAuthentication.AuthType Property

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public string AuthType { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[FillableAuthentication Class](#group-psrapi-internals-authflow-data-fillableauthentication)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableAuthentication.Name Property

The name of the authentication

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public string Name { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[FillableAuthentication Class](#group-psrapi-internals-authflow-data-fillableauthentication)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableAuthentication Methods

The [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [IsPasswordAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication) | Returns if the authentication is a password authentication |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[FillableAuthentication Class](#group-psrapi-internals-authflow-data-fillableauthentication)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableAuthentication.IsPasswordAuthentication Method

Returns if the authentication is a password authentication

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public bool IsPasswordAuthentication()
```

###### Return Value

Type: Boolean

#### See Also

###### Reference

[FillableAuthentication Class](#group-psrapi-internals-authflow-data-fillableauthentication)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)


<a id="group-psrapi-internals-authflow-data-fillablechangepasswordauthentication"></a>
## FillableChangePasswordAuthentication

### FillableChangePasswordAuthentication Class

#### Inheritance Hierarchy

SystemObject
[PsrApi.Internals.AuthFlow.DataFillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication)
PsrApi.Internals.AuthFlow.DataFillableChangePasswordAuthentication

#### Syntax

C#

```csharp
public class FillableChangePasswordAuthentication : FillableAuthentication
```

#### Constructors

| Name | Description |
| --- | --- |
| [FillableChangePasswordAuthentication](#group-psrapi-internals-authflow-data-fillablechangepasswordauthentication) | Initializes a new instance of the FillableChangePasswordAuthentication class |

#### Properties

| Name | Description |
| --- | --- |
| [AuthType](#group-psrapi-internals-authflow-data-fillableauthentication) | (Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| [Name](#group-psrapi-internals-authflow-data-fillableauthentication) | The name of the authentication<br><br>(Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| [NewPassword](#group-psrapi-internals-authflow-data-fillablechangepasswordauthentication) |  |
| [Policy](#group-psrapi-internals-authflow-data-fillablechangepasswordauthentication) |  |
| [QualityLevel1](#group-psrapi-internals-authflow-data-fillablechangepasswordauthentication) |  |
| [QualityLevel2](#group-psrapi-internals-authflow-data-fillablechangepasswordauthentication) |  |

#### Methods

| Name | Description |
| --- | --- |
| [CheckPolicy](#group-psrapi-internals-authflow-data-fillablechangepasswordauthentication) |  |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [IsPasswordAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication) | Returns if the authentication is a password authentication<br><br>(Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableChangePasswordAuthentication Constructor

Initializes a new instance of the [FillableChangePasswordAuthentication](#group-psrapi-internals-authflow-data-fillablechangepasswordauthentication) class

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public FillableChangePasswordAuthentication()
```

#### See Also

###### Reference

[FillableChangePasswordAuthentication Class](#group-psrapi-internals-authflow-data-fillablechangepasswordauthentication)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableChangePasswordAuthentication Properties

The [FillableChangePasswordAuthentication](#group-psrapi-internals-authflow-data-fillablechangepasswordauthentication) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [AuthType](#group-psrapi-internals-authflow-data-fillableauthentication) | (Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| [Name](#group-psrapi-internals-authflow-data-fillableauthentication) | The name of the authentication<br><br>(Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| [NewPassword](#group-psrapi-internals-authflow-data-fillablechangepasswordauthentication) |  |
| [Policy](#group-psrapi-internals-authflow-data-fillablechangepasswordauthentication) |  |
| [QualityLevel1](#group-psrapi-internals-authflow-data-fillablechangepasswordauthentication) |  |
| [QualityLevel2](#group-psrapi-internals-authflow-data-fillablechangepasswordauthentication) |  |

#### See Also

###### Reference

[FillableChangePasswordAuthentication Class](#group-psrapi-internals-authflow-data-fillablechangepasswordauthentication)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableChangePasswordAuthentication.NewPassword Property

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public string NewPassword { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[FillableChangePasswordAuthentication Class](#group-psrapi-internals-authflow-data-fillablechangepasswordauthentication)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableChangePasswordAuthentication.Policy Property

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public PsrPolicy Policy { get; set; }
```

###### Property Value

Type: [PsrPolicy](data-models.md#group-psrapi-data-psrpolicy)

#### See Also

###### Reference

[FillableChangePasswordAuthentication Class](#group-psrapi-internals-authflow-data-fillablechangepasswordauthentication)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableChangePasswordAuthentication.QualityLevel1 Property

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public int QualityLevel1 { get; set; }
```

###### Property Value

Type: Int32

#### See Also

###### Reference

[FillableChangePasswordAuthentication Class](#group-psrapi-internals-authflow-data-fillablechangepasswordauthentication)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableChangePasswordAuthentication.QualityLevel2 Property

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public int QualityLevel2 { get; set; }
```

###### Property Value

Type: Int32

#### See Also

###### Reference

[FillableChangePasswordAuthentication Class](#group-psrapi-internals-authflow-data-fillablechangepasswordauthentication)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableChangePasswordAuthentication Methods

The [FillableChangePasswordAuthentication](#group-psrapi-internals-authflow-data-fillablechangepasswordauthentication) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| [CheckPolicy](#group-psrapi-internals-authflow-data-fillablechangepasswordauthentication) |  |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [IsPasswordAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication) | Returns if the authentication is a password authentication<br><br>(Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[FillableChangePasswordAuthentication Class](#group-psrapi-internals-authflow-data-fillablechangepasswordauthentication)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableChangePasswordAuthentication.CheckPolicy Method

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public PolicyPasswordValidationResult CheckPolicy()
```

###### Return Value

Type: [PolicyPasswordValidationResult](managers.md#group-psrapi-managers-policypasswordvalidationresult)

#### See Also

###### Reference

[FillableChangePasswordAuthentication Class](#group-psrapi-internals-authflow-data-fillablechangepasswordauthentication)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)


<a id="group-psrapi-internals-authflow-data-fillablegoogleauthconfiguration"></a>
## FillableGoogleAuthConfiguration

### FillableGoogleAuthConfiguration Class

#### Inheritance Hierarchy

SystemObject
[PsrApi.Internals.AuthFlow.DataFillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication)
[PsrApi.Internals.AuthFlow.DataDynamicFillableAuthentication](#group-psrapi-internals-authflow-data-dynamicfillableauthentication)
PsrApi.Internals.AuthFlow.DataFillableGoogleAuthConfiguration

#### Syntax

C#

```csharp
public class FillableGoogleAuthConfiguration : DynamicFillableAuthentication
```

#### Constructors

| Name | Description |
| --- | --- |
| [FillableGoogleAuthConfiguration](#group-psrapi-internals-authflow-data-fillablegoogleauthconfiguration) | Initializes a new instance of the FillableGoogleAuthConfiguration class |

#### Properties

| Name | Description |
| --- | --- |
| [AuthType](#group-psrapi-internals-authflow-data-fillableauthentication) | (Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| [Fields](#group-psrapi-internals-authflow-data-dynamicfillableauthentication) | (Inherited from [DynamicFillableAuthentication](#group-psrapi-internals-authflow-data-dynamicfillableauthentication).) |
| [Name](#group-psrapi-internals-authflow-data-fillableauthentication) | The name of the authentication<br><br>(Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| [Secret](#group-psrapi-internals-authflow-data-fillablegoogleauthconfiguration) |  |
| [SecretBase32](#group-psrapi-internals-authflow-data-fillablegoogleauthconfiguration) |  |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [IsPasswordAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication) | Returns if the authentication is a password authentication<br><br>(Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableGoogleAuthConfiguration Constructor

Initializes a new instance of the [FillableGoogleAuthConfiguration](#group-psrapi-internals-authflow-data-fillablegoogleauthconfiguration) class

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public FillableGoogleAuthConfiguration()
```

#### See Also

###### Reference

[FillableGoogleAuthConfiguration Class](#group-psrapi-internals-authflow-data-fillablegoogleauthconfiguration)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableGoogleAuthConfiguration Properties

The [FillableGoogleAuthConfiguration](#group-psrapi-internals-authflow-data-fillablegoogleauthconfiguration) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [AuthType](#group-psrapi-internals-authflow-data-fillableauthentication) | (Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| [Fields](#group-psrapi-internals-authflow-data-dynamicfillableauthentication) | (Inherited from [DynamicFillableAuthentication](#group-psrapi-internals-authflow-data-dynamicfillableauthentication).) |
| [Name](#group-psrapi-internals-authflow-data-fillableauthentication) | The name of the authentication<br><br>(Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| [Secret](#group-psrapi-internals-authflow-data-fillablegoogleauthconfiguration) |  |
| [SecretBase32](#group-psrapi-internals-authflow-data-fillablegoogleauthconfiguration) |  |

#### See Also

###### Reference

[FillableGoogleAuthConfiguration Class](#group-psrapi-internals-authflow-data-fillablegoogleauthconfiguration)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableGoogleAuthConfiguration.Secret Property

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public byte[] Secret { get; set; }
```

###### Property Value

Type: Byte

#### See Also

###### Reference

[FillableGoogleAuthConfiguration Class](#group-psrapi-internals-authflow-data-fillablegoogleauthconfiguration)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableGoogleAuthConfiguration.SecretBase32 Property

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public string SecretBase32 { get; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[FillableGoogleAuthConfiguration Class](#group-psrapi-internals-authflow-data-fillablegoogleauthconfiguration)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableGoogleAuthConfiguration Methods

The [FillableGoogleAuthConfiguration](#group-psrapi-internals-authflow-data-fillablegoogleauthconfiguration) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [IsPasswordAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication) | Returns if the authentication is a password authentication<br><br>(Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[FillableGoogleAuthConfiguration Class](#group-psrapi-internals-authflow-data-fillablegoogleauthconfiguration)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)


<a id="group-psrapi-internals-authflow-data-fillableodiccredential"></a>
## FillableOdicCredential

### FillableOdicCredential Class

#### Inheritance Hierarchy

SystemObject
[PsrApi.Internals.AuthFlow.DataFillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication)
PsrApi.Internals.AuthFlow.DataFillableOdicCredential

#### Syntax

C#

```csharp
public class FillableOdicCredential : FillableAuthentication
```

#### Constructors

| Name | Description |
| --- | --- |
| [FillableOdicCredential](#group-psrapi-internals-authflow-data-fillableodiccredential) | Initializes a new instance of the FillableOdicCredential class |

#### Properties

| Name | Description |
| --- | --- |
| [AuthorizationCode](#group-psrapi-internals-authflow-data-fillableodiccredential) | Contains the access code of the logged in user from the oauth server.<br>This will be filled through the client when oauthentication happend |
| [AuthType](#group-psrapi-internals-authflow-data-fillableauthentication) | (Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| [LoginUrl](#group-psrapi-internals-authflow-data-fillableodiccredential) | URL of that needs to be opened by the client to start the authentication process |
| [Name](#group-psrapi-internals-authflow-data-fillableauthentication) | The name of the authentication<br><br>(Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| [ProviderId](#group-psrapi-internals-authflow-data-fillableodiccredential) | Defines which Identity Provider is used in this case.<br>This can be used to determine specific translations for the client |
| [RedirectUrl](#group-psrapi-internals-authflow-data-fillableodiccredential) | Defines the redirect url that is set in the LoginUrl.<br>This can be used by the clients to determine if we reached our redirect url.<br>!This is set by the server per clientType! |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [IsPasswordAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication) | Returns if the authentication is a password authentication<br><br>(Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableOdicCredential Constructor

Initializes a new instance of the [FillableOdicCredential](#group-psrapi-internals-authflow-data-fillableodiccredential) class

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public FillableOdicCredential()
```

#### See Also

###### Reference

[FillableOdicCredential Class](#group-psrapi-internals-authflow-data-fillableodiccredential)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableOdicCredential Properties

The [FillableOdicCredential](#group-psrapi-internals-authflow-data-fillableodiccredential) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [AuthorizationCode](#group-psrapi-internals-authflow-data-fillableodiccredential) | Contains the access code of the logged in user from the oauth server.<br>This will be filled through the client when oauthentication happend |
| [AuthType](#group-psrapi-internals-authflow-data-fillableauthentication) | (Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| [LoginUrl](#group-psrapi-internals-authflow-data-fillableodiccredential) | URL of that needs to be opened by the client to start the authentication process |
| [Name](#group-psrapi-internals-authflow-data-fillableauthentication) | The name of the authentication<br><br>(Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| [ProviderId](#group-psrapi-internals-authflow-data-fillableodiccredential) | Defines which Identity Provider is used in this case.<br>This can be used to determine specific translations for the client |
| [RedirectUrl](#group-psrapi-internals-authflow-data-fillableodiccredential) | Defines the redirect url that is set in the LoginUrl.<br>This can be used by the clients to determine if we reached our redirect url.<br>!This is set by the server per clientType! |

#### See Also

###### Reference

[FillableOdicCredential Class](#group-psrapi-internals-authflow-data-fillableodiccredential)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableOdicCredential.AuthorizationCode Property

Contains the access code of the logged in user from the oauth server.
This will be filled through the client when oauthentication happend

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public string AuthorizationCode { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[FillableOdicCredential Class](#group-psrapi-internals-authflow-data-fillableodiccredential)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableOdicCredential.LoginUrl Property

URL of that needs to be opened by the client to start the authentication process

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public string LoginUrl { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[FillableOdicCredential Class](#group-psrapi-internals-authflow-data-fillableodiccredential)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableOdicCredential.ProviderId Property

Defines which Identity Provider is used in this case.
This can be used to determine specific translations for the client

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public string ProviderId { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[FillableOdicCredential Class](#group-psrapi-internals-authflow-data-fillableodiccredential)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableOdicCredential.RedirectUrl Property

Defines the redirect url that is set in the LoginUrl.
This can be used by the clients to determine if we reached our redirect url.
!This is set by the server per clientType!

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public string RedirectUrl { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[FillableOdicCredential Class](#group-psrapi-internals-authflow-data-fillableodiccredential)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableOdicCredential Methods

The [FillableOdicCredential](#group-psrapi-internals-authflow-data-fillableodiccredential) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [IsPasswordAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication) | Returns if the authentication is a password authentication<br><br>(Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[FillableOdicCredential Class](#group-psrapi-internals-authflow-data-fillableodiccredential)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)


<a id="group-psrapi-internals-authflow-data-fillablepkiconfiguration"></a>
## FillablePkiConfiguration

### FillablePkiConfiguration Class

#### Inheritance Hierarchy

SystemObject
[PsrApi.Internals.AuthFlow.DataFillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication)
PsrApi.Internals.AuthFlow.DataFillablePkiConfiguration

#### Syntax

C#

```csharp
public class FillablePkiConfiguration : FillableAuthentication
```

#### Constructors

| Name | Description |
| --- | --- |
| [FillablePkiConfiguration](#group-psrapi-internals-authflow-data-fillablepkiconfiguration) | Initializes a new instance of the FillablePkiConfiguration class |

#### Properties

| Name | Description |
| --- | --- |
| [AuthType](#group-psrapi-internals-authflow-data-fillableauthentication) | (Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| [Name](#group-psrapi-internals-authflow-data-fillableauthentication) | The name of the authentication<br><br>(Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| [OnlyShowPkiValidCertificates](#group-psrapi-internals-authflow-data-fillablepkiconfiguration) | Gibt an, ob nur gültige Zertifikate angezeigt werden sollen |
| [RequireKeyEnciphermentFlag](#group-psrapi-internals-authflow-data-fillablepkiconfiguration) | Defines if only certificates can be selected that have the KeyEncipherment flag |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [IsPasswordAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication) | Returns if the authentication is a password authentication<br><br>(Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### Fields

| Name | Description |
| --- | --- |
| [Certificate](#group-psrapi-internals-authflow-data-fillablepkiconfiguration) | Das vom Benutzer ausgewählte Zertifikat |

#### See Also

###### Reference

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillablePkiConfiguration Constructor

Initializes a new instance of the [FillablePkiConfiguration](#group-psrapi-internals-authflow-data-fillablepkiconfiguration) class

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public FillablePkiConfiguration()
```

#### See Also

###### Reference

[FillablePkiConfiguration Class](#group-psrapi-internals-authflow-data-fillablepkiconfiguration)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillablePkiConfiguration Properties

The [FillablePkiConfiguration](#group-psrapi-internals-authflow-data-fillablepkiconfiguration) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [AuthType](#group-psrapi-internals-authflow-data-fillableauthentication) | (Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| [Name](#group-psrapi-internals-authflow-data-fillableauthentication) | The name of the authentication<br><br>(Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| [OnlyShowPkiValidCertificates](#group-psrapi-internals-authflow-data-fillablepkiconfiguration) | Gibt an, ob nur gültige Zertifikate angezeigt werden sollen |
| [RequireKeyEnciphermentFlag](#group-psrapi-internals-authflow-data-fillablepkiconfiguration) | Defines if only certificates can be selected that have the KeyEncipherment flag |

#### See Also

###### Reference

[FillablePkiConfiguration Class](#group-psrapi-internals-authflow-data-fillablepkiconfiguration)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillablePkiConfiguration.OnlyShowPkiValidCertificates Property

Gibt an, ob nur gültige Zertifikate angezeigt werden sollen

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public bool OnlyShowPkiValidCertificates { get; set; }
```

###### Property Value

Type: Boolean

#### See Also

###### Reference

[FillablePkiConfiguration Class](#group-psrapi-internals-authflow-data-fillablepkiconfiguration)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillablePkiConfiguration.RequireKeyEnciphermentFlag Property

Defines if only certificates can be selected that have the KeyEncipherment flag

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public bool RequireKeyEnciphermentFlag { get; set; }
```

###### Property Value

Type: Boolean

#### See Also

###### Reference

[FillablePkiConfiguration Class](#group-psrapi-internals-authflow-data-fillablepkiconfiguration)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillablePkiConfiguration Methods

The [FillablePkiConfiguration](#group-psrapi-internals-authflow-data-fillablepkiconfiguration) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [IsPasswordAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication) | Returns if the authentication is a password authentication<br><br>(Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[FillablePkiConfiguration Class](#group-psrapi-internals-authflow-data-fillablepkiconfiguration)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillablePkiConfiguration Fields

The [FillablePkiConfiguration](#group-psrapi-internals-authflow-data-fillablepkiconfiguration) type exposes the following members.

#### Fields

| Name | Description |
| --- | --- |
| [Certificate](#group-psrapi-internals-authflow-data-fillablepkiconfiguration) | Das vom Benutzer ausgewählte Zertifikat |

#### See Also

###### Reference

[FillablePkiConfiguration Class](#group-psrapi-internals-authflow-data-fillablepkiconfiguration)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillablePkiConfiguration.Certificate Field

Das vom Benutzer ausgewählte Zertifikat

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public X509Certificate2 Certificate
```

###### Field Value

Type: X509Certificate2

#### See Also

###### Reference

[FillablePkiConfiguration Class](#group-psrapi-internals-authflow-data-fillablepkiconfiguration)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)


<a id="group-psrapi-internals-authflow-data-fillablepkicredential"></a>
## FillablePkiCredential

### FillablePkiCredential Class

#### Inheritance Hierarchy

SystemObject
[PsrApi.Internals.AuthFlow.DataFillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication)
PsrApi.Internals.AuthFlow.DataFillablePkiCredential

#### Syntax

C#

```csharp
public class FillablePkiCredential : FillableAuthentication
```

#### Constructors

| Name | Description |
| --- | --- |
| [FillablePkiCredential](#group-psrapi-internals-authflow-data-fillablepkicredential) | Initializes a new instance of the FillablePkiCredential class |

#### Properties

| Name | Description |
| --- | --- |
| [AuthType](#group-psrapi-internals-authflow-data-fillableauthentication) | (Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| [HashAlgorithm](#group-psrapi-internals-authflow-data-fillablepkicredential) | Gibt an, welcher Hashalgorithmus benutzt werden soll |
| [Name](#group-psrapi-internals-authflow-data-fillableauthentication) | The name of the authentication<br><br>(Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| [RequireKeyEnciphermentFlag](#group-psrapi-internals-authflow-data-fillablepkicredential) | Defines if only certificates can be selected that have the KeyEncipherment flag |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [IsPasswordAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication) | Returns if the authentication is a password authentication<br><br>(Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillablePkiCredential Constructor

Initializes a new instance of the [FillablePkiCredential](#group-psrapi-internals-authflow-data-fillablepkicredential) class

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public FillablePkiCredential()
```

#### See Also

###### Reference

[FillablePkiCredential Class](#group-psrapi-internals-authflow-data-fillablepkicredential)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillablePkiCredential Properties

The [FillablePkiCredential](#group-psrapi-internals-authflow-data-fillablepkicredential) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [AuthType](#group-psrapi-internals-authflow-data-fillableauthentication) | (Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| [HashAlgorithm](#group-psrapi-internals-authflow-data-fillablepkicredential) | Gibt an, welcher Hashalgorithmus benutzt werden soll |
| [Name](#group-psrapi-internals-authflow-data-fillableauthentication) | The name of the authentication<br><br>(Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| [RequireKeyEnciphermentFlag](#group-psrapi-internals-authflow-data-fillablepkicredential) | Defines if only certificates can be selected that have the KeyEncipherment flag |

#### See Also

###### Reference

[FillablePkiCredential Class](#group-psrapi-internals-authflow-data-fillablepkicredential)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillablePkiCredential.HashAlgorithm Property

Gibt an, welcher Hashalgorithmus benutzt werden soll

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public string HashAlgorithm { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[FillablePkiCredential Class](#group-psrapi-internals-authflow-data-fillablepkicredential)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillablePkiCredential.RequireKeyEnciphermentFlag Property

Defines if only certificates can be selected that have the KeyEncipherment flag

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public bool RequireKeyEnciphermentFlag { get; set; }
```

###### Property Value

Type: Boolean

#### See Also

###### Reference

[FillablePkiCredential Class](#group-psrapi-internals-authflow-data-fillablepkicredential)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillablePkiCredential Methods

The [FillablePkiCredential](#group-psrapi-internals-authflow-data-fillablepkicredential) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [IsPasswordAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication) | Returns if the authentication is a password authentication<br><br>(Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[FillablePkiCredential Class](#group-psrapi-internals-authflow-data-fillablepkicredential)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)


<a id="group-psrapi-internals-authflow-data-fillablesmartcardcredential"></a>
## FillableSmartCardCredential

### FillableSmartCardCredential Class

#### Inheritance Hierarchy

SystemObject
[PsrApi.Internals.AuthFlow.DataFillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication)
[PsrApi.Internals.AuthFlow.DataDynamicFillableAuthentication](#group-psrapi-internals-authflow-data-dynamicfillableauthentication)
PsrApi.Internals.AuthFlow.DataFillableSmartCardCredential

#### Syntax

C#

```csharp
public class FillableSmartCardCredential : DynamicFillableAuthentication
```

#### Constructors

| Name | Description |
| --- | --- |
| [FillableSmartCardCredential](#group-psrapi-internals-authflow-data-fillablesmartcardcredential) | Initializes a new instance of the FillableSmartCardCredential class |

#### Properties

| Name | Description |
| --- | --- |
| [AuthType](#group-psrapi-internals-authflow-data-fillableauthentication) | (Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| [Fields](#group-psrapi-internals-authflow-data-dynamicfillableauthentication) | (Inherited from [DynamicFillableAuthentication](#group-psrapi-internals-authflow-data-dynamicfillableauthentication).) |
| [Name](#group-psrapi-internals-authflow-data-fillableauthentication) | The name of the authentication<br><br>(Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| [SelectedCert](#group-psrapi-internals-authflow-data-fillablesmartcardcredential) |  |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [IsPasswordAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication) | Returns if the authentication is a password authentication<br><br>(Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableSmartCardCredential Constructor

Initializes a new instance of the [FillableSmartCardCredential](#group-psrapi-internals-authflow-data-fillablesmartcardcredential) class

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public FillableSmartCardCredential()
```

#### See Also

###### Reference

[FillableSmartCardCredential Class](#group-psrapi-internals-authflow-data-fillablesmartcardcredential)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableSmartCardCredential Properties

The [FillableSmartCardCredential](#group-psrapi-internals-authflow-data-fillablesmartcardcredential) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [AuthType](#group-psrapi-internals-authflow-data-fillableauthentication) | (Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| [Fields](#group-psrapi-internals-authflow-data-dynamicfillableauthentication) | (Inherited from [DynamicFillableAuthentication](#group-psrapi-internals-authflow-data-dynamicfillableauthentication).) |
| [Name](#group-psrapi-internals-authflow-data-fillableauthentication) | The name of the authentication<br><br>(Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| [SelectedCert](#group-psrapi-internals-authflow-data-fillablesmartcardcredential) |  |

#### See Also

###### Reference

[FillableSmartCardCredential Class](#group-psrapi-internals-authflow-data-fillablesmartcardcredential)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableSmartCardCredential.SelectedCert Property

Namespace:
[PsrApi.Internals.AuthFlow.Data](#group-psrapi-internals-authflow-data)

#### Syntax

C#

```csharp
public X509Certificate2 SelectedCert { get; set; }
```

###### Property Value

Type: X509Certificate2

#### See Also

###### Reference

[FillableSmartCardCredential Class](#group-psrapi-internals-authflow-data-fillablesmartcardcredential)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)

### FillableSmartCardCredential Methods

The [FillableSmartCardCredential](#group-psrapi-internals-authflow-data-fillablesmartcardcredential) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [IsPasswordAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication) | Returns if the authentication is a password authentication<br><br>(Inherited from [FillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication).) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[FillableSmartCardCredential Class](#group-psrapi-internals-authflow-data-fillablesmartcardcredential)

[PsrApi.Internals.AuthFlow.Data Namespace](#group-psrapi-internals-authflow-data)


<a id="group-psrapi-internals-authflow-iauthenticationflow"></a>
## IAuthenticationFlow

### IAuthenticationFlow Interface

Namespace:
[PsrApi.Internals.AuthFlow](#group-psrapi-internals-authflow)

#### Syntax

C#

```csharp
public interface IAuthenticationFlow
```

#### Properties

| Name | Description |
| --- | --- |
| [IsAuthenticated](#group-psrapi-internals-authflow-iauthenticationflow) |  |

#### Methods

| Name | Description |
| --- | --- |
| [Authenticate](#group-psrapi-internals-authflow-iauthenticationflow) |  |
| [GetNameOfUser](#group-psrapi-internals-authflow-iauthenticationflow) |  |
| [GetNextRequirement](#group-psrapi-internals-authflow-iauthenticationflow) |  |
| [StartLogin](#group-psrapi-internals-authflow-iauthenticationflow) |  |

#### See Also

###### Reference

[PsrApi.Internals.AuthFlow Namespace](#group-psrapi-internals-authflow)

### IAuthenticationFlow Properties

The [IAuthenticationFlow](#group-psrapi-internals-authflow-iauthenticationflow) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [IsAuthenticated](#group-psrapi-internals-authflow-iauthenticationflow) |  |

#### See Also

###### Reference

[IAuthenticationFlow Interface](#group-psrapi-internals-authflow-iauthenticationflow)

[PsrApi.Internals.AuthFlow Namespace](#group-psrapi-internals-authflow)

### IAuthenticationFlow.IsAuthenticated Property

Namespace:
[PsrApi.Internals.AuthFlow](#group-psrapi-internals-authflow)

#### Syntax

C#

```csharp
bool IsAuthenticated { get; }
```

###### Property Value

Type: Boolean

#### See Also

###### Reference

[IAuthenticationFlow Interface](#group-psrapi-internals-authflow-iauthenticationflow)

[PsrApi.Internals.AuthFlow Namespace](#group-psrapi-internals-authflow)

### IAuthenticationFlow Methods

The [IAuthenticationFlow](#group-psrapi-internals-authflow-iauthenticationflow) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| [Authenticate](#group-psrapi-internals-authflow-iauthenticationflow) |  |
| [GetNameOfUser](#group-psrapi-internals-authflow-iauthenticationflow) |  |
| [GetNextRequirement](#group-psrapi-internals-authflow-iauthenticationflow) |  |
| [StartLogin](#group-psrapi-internals-authflow-iauthenticationflow) |  |

#### See Also

###### Reference

[IAuthenticationFlow Interface](#group-psrapi-internals-authflow-iauthenticationflow)

[PsrApi.Internals.AuthFlow Namespace](#group-psrapi-internals-authflow)

### IAuthenticationFlow.Authenticate Method

Namespace:
[PsrApi.Internals.AuthFlow](#group-psrapi-internals-authflow)

#### Syntax

C#

```csharp
Task Authenticate(
	FillableAuthentication filledAuthentication
)
```

###### Parameters

filledAuthenticationType: [PsrApi.Internals.AuthFlow.DataFillableAuthentication](#group-psrapi-internals-authflow-data-fillableauthentication)

###### Return Value

Type: Task

#### See Also

###### Reference

[IAuthenticationFlow Interface](#group-psrapi-internals-authflow-iauthenticationflow)

[PsrApi.Internals.AuthFlow Namespace](#group-psrapi-internals-authflow)

### IAuthenticationFlow.GetNameOfUser Method

Namespace:
[PsrApi.Internals.AuthFlow](#group-psrapi-internals-authflow)

#### Syntax

C#

```csharp
string GetNameOfUser()
```

###### Return Value

Type: String

#### See Also

###### Reference

[IAuthenticationFlow Interface](#group-psrapi-internals-authflow-iauthenticationflow)

[PsrApi.Internals.AuthFlow Namespace](#group-psrapi-internals-authflow)

### IAuthenticationFlow.GetNextRequirement Method

Namespace:
[PsrApi.Internals.AuthFlow](#group-psrapi-internals-authflow)

#### Syntax

C#

```csharp
AuthenticationRequirements GetNextRequirement()
```

###### Return Value

Type: [AuthenticationRequirements](#group-psrapi-internals-authflow-data-authenticationrequirements)

#### See Also

###### Reference

[IAuthenticationFlow Interface](#group-psrapi-internals-authflow-iauthenticationflow)

[PsrApi.Internals.AuthFlow Namespace](#group-psrapi-internals-authflow)

### IAuthenticationFlow.StartLogin Method

Namespace:
[PsrApi.Internals.AuthFlow](#group-psrapi-internals-authflow)

#### Syntax

C#

```csharp
Task StartLogin()
```

###### Return Value

Type: Task

#### See Also

###### Reference

[IAuthenticationFlow Interface](#group-psrapi-internals-authflow-iauthenticationflow)

[PsrApi.Internals.AuthFlow Namespace](#group-psrapi-internals-authflow)


<a id="group-psrapi-managers-apikeymanager"></a>
## ApiKeyManager

### ApiKeyManager Class

#### Inheritance Hierarchy

SystemObject
[PsrApi.ManagersBaseManager](managers.md#group-psrapi-managers-basemanager)
PsrApi.ManagersApiKeyManager

#### Syntax

C#

```csharp
public class ApiKeyManager : BaseManager
```

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GetAccessRights](#group-psrapi-managers-apikeymanager) | Returns the access rights from an API key |
| [GetAccessScopes](#group-psrapi-managers-apikeymanager) | Returns the access scopes from an API key |
| [GetDatabaseName](#group-psrapi-managers-apikeymanager) | Returns the database name from an API key |
| [GetExpirationDateUtc](#group-psrapi-managers-apikeymanager) | Returns the expiration date from an API key |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| [GetIssueDateUtc](#group-psrapi-managers-apikeymanager) | Returns the issue date from an API key |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [GetUsername](#group-psrapi-managers-apikeymanager) | Returns the username from an API key |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Managers Namespace](managers.md#group-psrapi-managers)

### ApiKeyManager Methods

The [ApiKeyManager](#group-psrapi-managers-apikeymanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| [GetAccessRights](#group-psrapi-managers-apikeymanager) | Returns the access rights from an API key |
| [GetAccessScopes](#group-psrapi-managers-apikeymanager) | Returns the access scopes from an API key |
| [GetDatabaseName](#group-psrapi-managers-apikeymanager) | Returns the database name from an API key |
| [GetExpirationDateUtc](#group-psrapi-managers-apikeymanager) | Returns the expiration date from an API key |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| [GetIssueDateUtc](#group-psrapi-managers-apikeymanager) | Returns the issue date from an API key |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [GetUsername](#group-psrapi-managers-apikeymanager) | Returns the username from an API key |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[ApiKeyManager Class](#group-psrapi-managers-apikeymanager)

[PsrApi.Managers Namespace](managers.md#group-psrapi-managers)

### ApiKeyManager.GetAccessRights Method

Returns the access rights from an API key

Namespace:
[PsrApi.Managers](managers.md#group-psrapi-managers)

#### Syntax

C#

```csharp
public PsrApiKeyAccessRights GetAccessRights(
	string apiKey
)
```

###### Parameters

apiKeyType: SystemString

###### Return Value

Type: [PsrApiKeyAccessRights](enums-and-constants.md#group-psrapi-data-enums-psrapikeyaccessrights)

#### See Also

###### Reference

[ApiKeyManager Class](#group-psrapi-managers-apikeymanager)

[PsrApi.Managers Namespace](managers.md#group-psrapi-managers)

### ApiKeyManager.GetAccessScopes Method

Returns the access scopes from an API key

Namespace:
[PsrApi.Managers](managers.md#group-psrapi-managers)

#### Syntax

C#

```csharp
public PsrApiKeyAccessScopes GetAccessScopes(
	string apiKey
)
```

###### Parameters

apiKeyType: SystemString

###### Return Value

Type: [PsrApiKeyAccessScopes](enums-and-constants.md#group-psrapi-data-enums-psrapikeyaccessscopes)

#### See Also

###### Reference

[ApiKeyManager Class](#group-psrapi-managers-apikeymanager)

[PsrApi.Managers Namespace](managers.md#group-psrapi-managers)

### ApiKeyManager.GetDatabaseName Method

Returns the database name from an API key

Namespace:
[PsrApi.Managers](managers.md#group-psrapi-managers)

#### Syntax

C#

```csharp
public string GetDatabaseName(
	string apiKey
)
```

###### Parameters

apiKeyType: SystemString

###### Return Value

Type: String

#### See Also

###### Reference

[ApiKeyManager Class](#group-psrapi-managers-apikeymanager)

[PsrApi.Managers Namespace](managers.md#group-psrapi-managers)

### ApiKeyManager.GetExpirationDateUtc Method

Returns the expiration date from an API key

Namespace:
[PsrApi.Managers](managers.md#group-psrapi-managers)

#### Syntax

C#

```csharp
public DateTime GetExpirationDateUtc(
	string apiKey
)
```

###### Parameters

apiKeyType: SystemString

###### Return Value

Type: DateTime

#### See Also

###### Reference

[ApiKeyManager Class](#group-psrapi-managers-apikeymanager)

[PsrApi.Managers Namespace](managers.md#group-psrapi-managers)

### ApiKeyManager.GetIssueDateUtc Method

Returns the issue date from an API key

Namespace:
[PsrApi.Managers](managers.md#group-psrapi-managers)

#### Syntax

C#

```csharp
public DateTime GetIssueDateUtc(
	string apiKey
)
```

###### Parameters

apiKeyType: SystemString

###### Return Value

Type: DateTime

#### See Also

###### Reference

[ApiKeyManager Class](#group-psrapi-managers-apikeymanager)

[PsrApi.Managers Namespace](managers.md#group-psrapi-managers)

### ApiKeyManager.GetUsername Method

Returns the username from an API key

Namespace:
[PsrApi.Managers](managers.md#group-psrapi-managers)

#### Syntax

C#

```csharp
public string GetUsername(
	string apiKey
)
```

###### Parameters

apiKeyType: SystemString

###### Return Value

Type: String

#### See Also

###### Reference

[ApiKeyManager Class](#group-psrapi-managers-apikeymanager)

[PsrApi.Managers Namespace](managers.md#group-psrapi-managers)


<a id="group-psrapi-managers-authenticationmanagerv2"></a>
## AuthenticationManagerV2

### AuthenticationManagerV2 Class

#### Inheritance Hierarchy

SystemObject
[PsrApi.ManagersBaseManager](managers.md#group-psrapi-managers-basemanager)
PsrApi.ManagersAuthenticationManagerV2

#### Syntax

C#

```csharp
public class AuthenticationManagerV2 : BaseManager
```

#### Constructors

| Name | Description |
| --- | --- |
| [AuthenticationManagerV2](#group-psrapi-managers-authenticationmanagerv2) | Initializes a new instance of the AuthenticationManagerV2 class |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [IsRealtimeConnected](#group-psrapi-managers-authenticationmanagerv2) | Returns the information if a realtime connection is established |
| [LoginWithApiKey](#group-psrapi-managers-authenticationmanagerv2) |  |
| [Logout](#group-psrapi-managers-authenticationmanagerv2) | Closes the current session. |
| [StartNewAuthentication](#group-psrapi-managers-authenticationmanagerv2) |  |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Managers Namespace](managers.md#group-psrapi-managers)

### AuthenticationManagerV2 Constructor

Initializes a new instance of the [AuthenticationManagerV2](#group-psrapi-managers-authenticationmanagerv2) class

Namespace:
[PsrApi.Managers](managers.md#group-psrapi-managers)

#### Syntax

C#

```csharp
public AuthenticationManagerV2(
	PsrApi psrApi
)
```

###### Parameters

psrApiType: [PsrApiPsrApi](browser-runtime.md#group-psrapi-psrapi)

#### See Also

###### Reference

[AuthenticationManagerV2 Class](#group-psrapi-managers-authenticationmanagerv2)

[PsrApi.Managers Namespace](managers.md#group-psrapi-managers)

### AuthenticationManagerV2 Methods

The [AuthenticationManagerV2](#group-psrapi-managers-authenticationmanagerv2) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [IsRealtimeConnected](#group-psrapi-managers-authenticationmanagerv2) | Returns the information if a realtime connection is established |
| [LoginWithApiKey](#group-psrapi-managers-authenticationmanagerv2) |  |
| [Logout](#group-psrapi-managers-authenticationmanagerv2) | Closes the current session. |
| [StartNewAuthentication](#group-psrapi-managers-authenticationmanagerv2) |  |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[AuthenticationManagerV2 Class](#group-psrapi-managers-authenticationmanagerv2)

[PsrApi.Managers Namespace](managers.md#group-psrapi-managers)

### AuthenticationManagerV2.IsRealtimeConnected Method

Returns the information if a realtime connection is established

Namespace:
[PsrApi.Managers](managers.md#group-psrapi-managers)

#### Syntax

C#

```csharp
public bool IsRealtimeConnected()
```

###### Return Value

Type: Boolean

#### See Also

###### Reference

[AuthenticationManagerV2 Class](#group-psrapi-managers-authenticationmanagerv2)

[PsrApi.Managers Namespace](managers.md#group-psrapi-managers)

### AuthenticationManagerV2.LoginWithApiKey Method

Namespace:
[PsrApi.Managers](managers.md#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task LoginWithApiKey(
	string apiKey
)
```

###### Parameters

apiKeyType: SystemString

###### Return Value

Type: Task

#### See Also

###### Reference

[AuthenticationManagerV2 Class](#group-psrapi-managers-authenticationmanagerv2)

[PsrApi.Managers Namespace](managers.md#group-psrapi-managers)

### AuthenticationManagerV2.Logout Method

Closes the current session.

Namespace:
[PsrApi.Managers](managers.md#group-psrapi-managers)

#### Syntax

C#

```csharp
public Task Logout()
```

###### Return Value

Type: Task

#### See Also

###### Reference

[AuthenticationManagerV2 Class](#group-psrapi-managers-authenticationmanagerv2)

[PsrApi.Managers Namespace](managers.md#group-psrapi-managers)

### AuthenticationManagerV2.StartNewAuthentication Method

Namespace:
[PsrApi.Managers](managers.md#group-psrapi-managers)

#### Syntax

C#

```csharp
public IAuthenticationFlow StartNewAuthentication(
	string database,
	string username
)
```

###### Parameters

databaseType: SystemString
usernameType: SystemString

###### Return Value

Type: [IAuthenticationFlow](#group-psrapi-internals-authflow-iauthenticationflow)

#### See Also

###### Reference

[AuthenticationManagerV2 Class](#group-psrapi-managers-authenticationmanagerv2)

[PsrApi.Managers Namespace](managers.md#group-psrapi-managers)


<a id="group-psrapi-psrsessionstate"></a>
## PsrSessionState

### PsrSessionState Enumeration

The state the session is currently in

Namespace:
[PsrApi](browser-runtime.md#group-psrapi)

#### Syntax

C#

```csharp
public enum PsrSessionState
```

#### See Also

###### Reference

[PsrApi Namespace](browser-runtime.md#group-psrapi)
