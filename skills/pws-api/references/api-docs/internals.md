# Internals

This handbook groups Netwrix Password Secure SDK internal helper namespaces and types that support higher-level runtime flows.

- Use this for internal helper objects such as key-management and decryption-chain support types.
- Auth-flow internals stay in the authentication handbook because they are directly tied to login and session bootstrap behavior.
- Included official SDK pages: `14` across `5` grouped sections.

## Contents

- [PsrApi.Internals](#group-psrapi-internals)
- [PsrApi.Internals.InternalObjects](#group-psrapi-internals-internalobjects)
- [PsrDecryptionInstruction](#group-psrapi-internals-internalobjects-psrdecryptioninstruction)
- [UserKeyManager](#group-psrapi-internals-userkeymanager)
- [UserKeyManager.Key](#group-psrapi-internals-userkeymanager-key)

<a id="group-psrapi-internals"></a>
## PsrApi.Internals

### PsrApi.Internals Namespace

#### Classes

| Class | Description |
| --- | --- |
| [UserKeyManager](#group-psrapi-internals-userkeymanager) |  |
| [UserKeyManagerKey](#group-psrapi-internals-userkeymanager-key) |  |


<a id="group-psrapi-internals-internalobjects"></a>
## PsrApi.Internals.InternalObjects

### PsrApi.Internals.InternalObjects Namespace

#### Classes

| Class | Description |
| --- | --- |
| [PsrDecryptionInstruction](#group-psrapi-internals-internalobjects-psrdecryptioninstruction) | Describes a decryption over a certain chain |


<a id="group-psrapi-internals-internalobjects-psrdecryptioninstruction"></a>
## PsrDecryptionInstruction

### PsrDecryptionInstruction Class

Describes a decryption over a certain chain

#### Inheritance Hierarchy

SystemObject
PsrApi.Internals.InternalObjectsPsrDecryptionInstruction

#### Syntax

C#

```csharp
public class PsrDecryptionInstruction
```

#### Constructors

| Name | Description |
| --- | --- |
| [PsrDecryptionInstruction](#group-psrapi-internals-internalobjects-psrdecryptioninstruction) | Initializes a new instance of the PsrDecryptionInstruction class |

#### Properties

| Name | Description |
| --- | --- |
| [LegitimateDecryptionChain](#group-psrapi-internals-internalobjects-psrdecryptioninstruction) | A decrypted chain, whose first entry can be decrypted with the private key of the LegitimateId.<br>After decrypting the encryption chain a certain plain value will be accessible |
| [LegitimateId](#group-psrapi-internals-internalobjects-psrdecryptioninstruction) | The Id of the legitimate whose private key is required to decrypt the decryption chain |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Internals.InternalObjects Namespace](#group-psrapi-internals-internalobjects)

### PsrDecryptionInstruction Constructor

Initializes a new instance of the [PsrDecryptionInstruction](#group-psrapi-internals-internalobjects-psrdecryptioninstruction) class

Namespace:
[PsrApi.Internals.InternalObjects](#group-psrapi-internals-internalobjects)

#### Syntax

C#

```csharp
public PsrDecryptionInstruction()
```

#### See Also

###### Reference

[PsrDecryptionInstruction Class](#group-psrapi-internals-internalobjects-psrdecryptioninstruction)

[PsrApi.Internals.InternalObjects Namespace](#group-psrapi-internals-internalobjects)

### PsrDecryptionInstruction Properties

The [PsrDecryptionInstruction](#group-psrapi-internals-internalobjects-psrdecryptioninstruction) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [LegitimateDecryptionChain](#group-psrapi-internals-internalobjects-psrdecryptioninstruction) | A decrypted chain, whose first entry can be decrypted with the private key of the LegitimateId.<br>After decrypting the encryption chain a certain plain value will be accessible |
| [LegitimateId](#group-psrapi-internals-internalobjects-psrdecryptioninstruction) | The Id of the legitimate whose private key is required to decrypt the decryption chain |

#### See Also

###### Reference

[PsrDecryptionInstruction Class](#group-psrapi-internals-internalobjects-psrdecryptioninstruction)

[PsrApi.Internals.InternalObjects Namespace](#group-psrapi-internals-internalobjects)

### PsrDecryptionInstruction.LegitimateDecryptionChain Property

A decrypted chain, whose first entry can be decrypted with the private key of the LegitimateId.
After decrypting the encryption chain a certain plain value will be accessible

Namespace:
[PsrApi.Internals.InternalObjects](#group-psrapi-internals-internalobjects)

#### Syntax

C#

```csharp
public List<byte[]> LegitimateDecryptionChain { get; set; }
```

###### Property Value

Type: ListByte

#### See Also

###### Reference

[PsrDecryptionInstruction Class](#group-psrapi-internals-internalobjects-psrdecryptioninstruction)

[PsrApi.Internals.InternalObjects Namespace](#group-psrapi-internals-internalobjects)

### PsrDecryptionInstruction.LegitimateId Property

The Id of the legitimate whose private key is required to decrypt the decryption chain

Namespace:
[PsrApi.Internals.InternalObjects](#group-psrapi-internals-internalobjects)

#### Syntax

C#

```csharp
public Guid LegitimateId { get; set; }
```

###### Property Value

Type: Guid

#### See Also

###### Reference

[PsrDecryptionInstruction Class](#group-psrapi-internals-internalobjects-psrdecryptioninstruction)

[PsrApi.Internals.InternalObjects Namespace](#group-psrapi-internals-internalobjects)

### PsrDecryptionInstruction Methods

The [PsrDecryptionInstruction](#group-psrapi-internals-internalobjects-psrdecryptioninstruction) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrDecryptionInstruction Class](#group-psrapi-internals-internalobjects-psrdecryptioninstruction)

[PsrApi.Internals.InternalObjects Namespace](#group-psrapi-internals-internalobjects)


<a id="group-psrapi-internals-userkeymanager"></a>
## UserKeyManager

### UserKeyManager Class

#### Inheritance Hierarchy

SystemObject
PsrApi.InternalsUserKeyManager

#### Syntax

C#

```csharp
public class UserKeyManager
```

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [GetUserPrivateKey](#group-psrapi-internals-userkeymanager) | Returns the private key of the current user. |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Internals Namespace](#group-psrapi-internals)

### UserKeyManager Methods

The [UserKeyManager](#group-psrapi-internals-userkeymanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| [GetUserPrivateKey](#group-psrapi-internals-userkeymanager) | Returns the private key of the current user. |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[UserKeyManager Class](#group-psrapi-internals-userkeymanager)

[PsrApi.Internals Namespace](#group-psrapi-internals)

### UserKeyManager.GetUserPrivateKey Method

Returns the private key of the current user.

Namespace:
[PsrApi.Internals](#group-psrapi-internals)

#### Syntax

C#

```csharp
public byte[] GetUserPrivateKey()
```

###### Return Value

Type: Byte

#### See Also

###### Reference

[UserKeyManager Class](#group-psrapi-internals-userkeymanager)

[PsrApi.Internals Namespace](#group-psrapi-internals)


<a id="group-psrapi-internals-userkeymanager-key"></a>
## UserKeyManager.Key

### UserKeyManager.Key Class

#### Inheritance Hierarchy

SystemObject
PsrApi.InternalsUserKeyManagerKey

#### Syntax

C#

```csharp
public class Key
```

#### Constructors

| Name | Description |
| --- | --- |
| [UserKeyManagerKey](#group-psrapi-internals-userkeymanager-key) | Initializes a new instance of the UserKeyManagerKey class |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Internals Namespace](#group-psrapi-internals)

### UserKeyManager.Key Constructor

Initializes a new instance of the [UserKeyManagerKey](#group-psrapi-internals-userkeymanager-key) class

Namespace:
[PsrApi.Internals](#group-psrapi-internals)

#### Syntax

C#

```csharp
public Key()
```

#### See Also

###### Reference

[UserKeyManagerKey Class](#group-psrapi-internals-userkeymanager-key)

[PsrApi.Internals Namespace](#group-psrapi-internals)

### Key Methods

The [UserKeyManagerKey](#group-psrapi-internals-userkeymanager-key) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[UserKeyManagerKey Class](#group-psrapi-internals-userkeymanager-key)

[PsrApi.Internals Namespace](#group-psrapi-internals)
