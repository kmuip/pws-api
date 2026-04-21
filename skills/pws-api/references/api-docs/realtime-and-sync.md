# Realtime and Sync

This handbook groups realtime event APIs, progress-token-related pages, and synchronization types.

- Use this for event payloads, session-close notifications, synchronization protocol types, and result objects.
- Included official SDK pages: `213` across `28` grouped sections.

## Contents

- [PsrProgressTokenArgs](#group-psrapi-data-psrprogresstokenargs)
- [PsrProgressTokenErrorArgs](#group-psrapi-data-psrprogresstokenerrorargs)
- [PsrRealtimeEventArgs](#group-psrapi-data-psrrealtimeeventargs)
- [PsrRealtimeEventContainerChangedArgs](#group-psrapi-data-psrrealtimeeventcontainerchangedargs)
- [PsrRealtimeEventDataBindingChangedArgs](#group-psrapi-data-psrrealtimeeventdatabindingchangedargs)
- [PsrRealtimeEventGroupChangedArgs](#group-psrapi-data-psrrealtimeeventgroupchangedargs)
- [PsrRealtimeEventProgressExceptionArgs](#group-psrapi-data-psrrealtimeeventprogressexceptionargs)
- [PsrRealtimeEventProgressFinishedArgs](#group-psrapi-data-psrrealtimeeventprogressfinishedargs)
- [PsrRealtimeEventProgressStepArgs](#group-psrapi-data-psrrealtimeeventprogressstepargs)
- [PsrRealtimeEventRoleChangedArgs](#group-psrapi-data-psrrealtimeeventrolechangedargs)
- [PsrRealtimeEventServerMessageArgs](#group-psrapi-data-psrrealtimeeventservermessageargs)
- [PsrRealtimeEventUserChangedArgs](#group-psrapi-data-psrrealtimeeventuserchangedargs)
- [RealtimeEventManager](#group-psrapi-managers-realtimeeventmanager)
- [PsrApi.Synchronization](#group-psrapi-synchronization)
- [PsrGetMigratedDataKeyInstruction](#group-psrapi-synchronization-psrgetmigrateddatakeyinstruction)
- [PsrGetMigratedKeysArgs](#group-psrapi-synchronization-psrgetmigratedkeysargs)
- [PsrGetMigratedKeysResult](#group-psrapi-synchronization-psrgetmigratedkeysresult)
- [PsrIdMap](#group-psrapi-synchronization-psridmap)
- [PsrSyncProtocol](#group-psrapi-synchronization-psrsyncprotocol)
- [PsrSyncServerChanges](#group-psrapi-synchronization-psrsyncserverchanges)
- [PsrSyncToServerArgs](#group-psrapi-synchronization-psrsynctoserverargs)
- [PsrSyncToServerResult](#group-psrapi-synchronization-psrsynctoserverresult)
- [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult)
- [PsrTransactionResultDependencyError](#group-psrapi-synchronization-psrtransactionresultdependencyerror)
- [PsrTransactionResultError](#group-psrapi-synchronization-psrtransactionresulterror)
- [PsrTransactionResultException](#group-psrapi-synchronization-psrtransactionresultexception)
- [PsrTransactionResultSuccess](#group-psrapi-synchronization-psrtransactionresultsuccess)
- [PsrTransactionResultSuccessRequireResync](#group-psrapi-synchronization-psrtransactionresultsuccessrequireresync)

<a id="group-psrapi-data-psrprogresstokenargs"></a>
## PsrProgressTokenArgs

### PsrProgressTokenArgs Class

Arguments of a server side processing progress.

#### Inheritance Hierarchy

SystemObject
PsrApi.DataPsrProgressTokenArgs

#### Syntax

C#

```csharp
public class PsrProgressTokenArgs
```

#### Constructors

| Name | Description |
| --- | --- |
| [PsrProgressTokenArgs](#group-psrapi-data-psrprogresstokenargs) | Initializes a new instance of the PsrProgressTokenArgs class |

#### Properties

| Name | Description |
| --- | --- |
| [GroupMax](#group-psrapi-data-psrprogresstokenargs) | Number of groups in the process. |
| [GroupPosition](#group-psrapi-data-psrprogresstokenargs) | Current group position. |
| [Max](#group-psrapi-data-psrprogresstokenargs) | Number of progress steps in the group. |
| [Position](#group-psrapi-data-psrprogresstokenargs) | Current progress position in the group. |
| [ProgressCode](#group-psrapi-data-psrprogresstokenargs) | Code of the progress. |
| [ProgressFieldValue](#group-psrapi-data-psrprogresstokenargs) | Value of an object, e.g. the DataName of a PsrData object. |
| [TokenIdentity](#group-psrapi-data-psrprogresstokenargs) | ID of the process. |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrProgressTokenArgs Constructor

Initializes a new instance of the [PsrProgressTokenArgs](#group-psrapi-data-psrprogresstokenargs) class

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public PsrProgressTokenArgs()
```

#### See Also

###### Reference

[PsrProgressTokenArgs Class](#group-psrapi-data-psrprogresstokenargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrProgressTokenArgs Properties

The [PsrProgressTokenArgs](#group-psrapi-data-psrprogresstokenargs) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [GroupMax](#group-psrapi-data-psrprogresstokenargs) | Number of groups in the process. |
| [GroupPosition](#group-psrapi-data-psrprogresstokenargs) | Current group position. |
| [Max](#group-psrapi-data-psrprogresstokenargs) | Number of progress steps in the group. |
| [Position](#group-psrapi-data-psrprogresstokenargs) | Current progress position in the group. |
| [ProgressCode](#group-psrapi-data-psrprogresstokenargs) | Code of the progress. |
| [ProgressFieldValue](#group-psrapi-data-psrprogresstokenargs) | Value of an object, e.g. the DataName of a PsrData object. |
| [TokenIdentity](#group-psrapi-data-psrprogresstokenargs) | ID of the process. |

#### See Also

###### Reference

[PsrProgressTokenArgs Class](#group-psrapi-data-psrprogresstokenargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrProgressTokenArgs.GroupMax Property

Number of groups in the process.

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public int GroupMax { get; set; }
```

###### Property Value

Type: Int32

#### See Also

###### Reference

[PsrProgressTokenArgs Class](#group-psrapi-data-psrprogresstokenargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrProgressTokenArgs.GroupPosition Property

Current group position.

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public int GroupPosition { get; set; }
```

###### Property Value

Type: Int32

#### See Also

###### Reference

[PsrProgressTokenArgs Class](#group-psrapi-data-psrprogresstokenargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrProgressTokenArgs.Max Property

Number of progress steps in the group.

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public int Max { get; set; }
```

###### Property Value

Type: Int32

#### See Also

###### Reference

[PsrProgressTokenArgs Class](#group-psrapi-data-psrprogresstokenargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrProgressTokenArgs.Position Property

Current progress position in the group.

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public int Position { get; set; }
```

###### Property Value

Type: Int32

#### See Also

###### Reference

[PsrProgressTokenArgs Class](#group-psrapi-data-psrprogresstokenargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrProgressTokenArgs.ProgressCode Property

Code of the progress.

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public PsrProgressCode ProgressCode { get; set; }
```

###### Property Value

Type: [PsrProgressCode](enums-and-constants.md#group-psrapi-data-enums-psrprogresscode)

#### See Also

###### Reference

[PsrProgressTokenArgs Class](#group-psrapi-data-psrprogresstokenargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrProgressTokenArgs.ProgressFieldValue Property

Value of an object, e.g. the DataName of a PsrData object.

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public string ProgressFieldValue { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[PsrProgressTokenArgs Class](#group-psrapi-data-psrprogresstokenargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrProgressTokenArgs.TokenIdentity Property

ID of the process.

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public int TokenIdentity { get; set; }
```

###### Property Value

Type: Int32

#### See Also

###### Reference

[PsrProgressTokenArgs Class](#group-psrapi-data-psrprogresstokenargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrProgressTokenArgs Methods

The [PsrProgressTokenArgs](#group-psrapi-data-psrprogresstokenargs) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrProgressTokenArgs Class](#group-psrapi-data-psrprogresstokenargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)


<a id="group-psrapi-data-psrprogresstokenerrorargs"></a>
## PsrProgressTokenErrorArgs

### PsrProgressTokenErrorArgs Class

Arguments of an error that happened during
a server side processing.

#### Inheritance Hierarchy

SystemObject
PsrApi.DataPsrProgressTokenErrorArgs

#### Syntax

C#

```csharp
public class PsrProgressTokenErrorArgs
```

#### Constructors

| Name | Description |
| --- | --- |
| [PsrProgressTokenErrorArgs](#group-psrapi-data-psrprogresstokenerrorargs) | Initializes a new instance of the PsrProgressTokenErrorArgs class |

#### Properties

| Name | Description |
| --- | --- |
| [ErrorCode](#group-psrapi-data-psrprogresstokenerrorargs) | Exception code. |
| [Message](#group-psrapi-data-psrprogresstokenerrorargs) | Exeption message. |
| [PlausibilityField](#group-psrapi-data-psrprogresstokenerrorargs) | Field that caused the exception. |
| [PlausibilityFieldValue](#group-psrapi-data-psrprogresstokenerrorargs) | Optional value of the [PlausibilityField](#group-psrapi-data-psrprogresstokenerrorargs). |
| [TokenIdentity](#group-psrapi-data-psrprogresstokenerrorargs) | ID of the process. |
| [TokenInfo](#group-psrapi-data-psrprogresstokenerrorargs) | Token information. |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrProgressTokenErrorArgs Constructor

Initializes a new instance of the [PsrProgressTokenErrorArgs](#group-psrapi-data-psrprogresstokenerrorargs) class

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public PsrProgressTokenErrorArgs()
```

#### See Also

###### Reference

[PsrProgressTokenErrorArgs Class](#group-psrapi-data-psrprogresstokenerrorargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrProgressTokenErrorArgs Properties

The [PsrProgressTokenErrorArgs](#group-psrapi-data-psrprogresstokenerrorargs) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [ErrorCode](#group-psrapi-data-psrprogresstokenerrorargs) | Exception code. |
| [Message](#group-psrapi-data-psrprogresstokenerrorargs) | Exeption message. |
| [PlausibilityField](#group-psrapi-data-psrprogresstokenerrorargs) | Field that caused the exception. |
| [PlausibilityFieldValue](#group-psrapi-data-psrprogresstokenerrorargs) | Optional value of the [PlausibilityField](#group-psrapi-data-psrprogresstokenerrorargs). |
| [TokenIdentity](#group-psrapi-data-psrprogresstokenerrorargs) | ID of the process. |
| [TokenInfo](#group-psrapi-data-psrprogresstokenerrorargs) | Token information. |

#### See Also

###### Reference

[PsrProgressTokenErrorArgs Class](#group-psrapi-data-psrprogresstokenerrorargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrProgressTokenErrorArgs.ErrorCode Property

Exception code.

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public PsrApiExceptionCode ErrorCode { get; set; }
```

###### Property Value

Type: [PsrApiExceptionCode](enums-and-constants.md#group-psrapi-psrapiexceptioncode)

#### See Also

###### Reference

[PsrProgressTokenErrorArgs Class](#group-psrapi-data-psrprogresstokenerrorargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrProgressTokenErrorArgs.Message Property

Exeption message.

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public string Message { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[PsrProgressTokenErrorArgs Class](#group-psrapi-data-psrprogresstokenerrorargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrProgressTokenErrorArgs.PlausibilityField Property

Field that caused the exception.

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public string PlausibilityField { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[PsrProgressTokenErrorArgs Class](#group-psrapi-data-psrprogresstokenerrorargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrProgressTokenErrorArgs.PlausibilityFieldValue Property

Optional value of the [PlausibilityField](#group-psrapi-data-psrprogresstokenerrorargs).

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public string PlausibilityFieldValue { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[PsrProgressTokenErrorArgs Class](#group-psrapi-data-psrprogresstokenerrorargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrProgressTokenErrorArgs.TokenIdentity Property

ID of the process.

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public int TokenIdentity { get; set; }
```

###### Property Value

Type: Int32

#### See Also

###### Reference

[PsrProgressTokenErrorArgs Class](#group-psrapi-data-psrprogresstokenerrorargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrProgressTokenErrorArgs.TokenInfo Property

Token information.

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public string TokenInfo { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[PsrProgressTokenErrorArgs Class](#group-psrapi-data-psrprogresstokenerrorargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrProgressTokenErrorArgs Methods

The [PsrProgressTokenErrorArgs](#group-psrapi-data-psrprogresstokenerrorargs) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrProgressTokenErrorArgs Class](#group-psrapi-data-psrprogresstokenerrorargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)


<a id="group-psrapi-data-psrrealtimeeventargs"></a>
## PsrRealtimeEventArgs

### PsrRealtimeEventArgs Class

Event args for a object changed realtime event.

#### Inheritance Hierarchy

SystemObject
PsrApi.DataPsrRealtimeEventArgs
[More...](#group-psrapi-data-psrrealtimeeventargs)

#### Syntax

C#

```csharp
public abstract class PsrRealtimeEventArgs
```

#### Properties

| Name | Description |
| --- | --- |
| [EventType](#group-psrapi-data-psrrealtimeeventargs) | Type of the changes. |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

#### Inheritance Hierarchy

SystemObject
PsrApi.DataPsrRealtimeEventArgs
[PsrApi.DataPsrRealtimeEventContainerChangedArgs](#group-psrapi-data-psrrealtimeeventcontainerchangedargs)
[PsrApi.DataPsrRealtimeEventDataBindingChangedArgs](#group-psrapi-data-psrrealtimeeventdatabindingchangedargs)
[PsrApi.DataPsrRealtimeEventGroupChangedArgs](#group-psrapi-data-psrrealtimeeventgroupchangedargs)
[PsrApi.DataPsrRealtimeEventProgressExceptionArgs](#group-psrapi-data-psrrealtimeeventprogressexceptionargs)
[PsrApi.DataPsrRealtimeEventProgressFinishedArgs](#group-psrapi-data-psrrealtimeeventprogressfinishedargs)
[PsrApi.DataPsrRealtimeEventProgressStepArgs](#group-psrapi-data-psrrealtimeeventprogressstepargs)
[PsrApi.DataPsrRealtimeEventRoleChangedArgs](#group-psrapi-data-psrrealtimeeventrolechangedargs)
[PsrApi.DataPsrRealtimeEventUserChangedArgs](#group-psrapi-data-psrrealtimeeventuserchangedargs)

### PsrRealtimeEventArgs Properties

The [PsrRealtimeEventArgs](#group-psrapi-data-psrrealtimeeventargs) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [EventType](#group-psrapi-data-psrrealtimeeventargs) | Type of the changes. |

#### See Also

###### Reference

[PsrRealtimeEventArgs Class](#group-psrapi-data-psrrealtimeeventargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventArgs.EventType Property

Type of the changes.

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public Nullable<PsrRealtimeEventType> EventType { get; set; }
```

###### Property Value

Type: Nullable[PsrRealtimeEventType](enums-and-constants.md#group-psrapi-data-enums-psrrealtimeeventtype)

#### See Also

###### Reference

[PsrRealtimeEventArgs Class](#group-psrapi-data-psrrealtimeeventargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventArgs Methods

The [PsrRealtimeEventArgs](#group-psrapi-data-psrrealtimeeventargs) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrRealtimeEventArgs Class](#group-psrapi-data-psrrealtimeeventargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)


<a id="group-psrapi-data-psrrealtimeeventcontainerchangedargs"></a>
## PsrRealtimeEventContainerChangedArgs

### PsrRealtimeEventContainerChangedArgs Class

Event args for a container changed realtime event.

#### Inheritance Hierarchy

SystemObject
[PsrApi.DataPsrRealtimeEventArgs](#group-psrapi-data-psrrealtimeeventargs)
PsrApi.DataPsrRealtimeEventContainerChangedArgs

#### Syntax

C#

```csharp
public class PsrRealtimeEventContainerChangedArgs : PsrRealtimeEventArgs
```

#### Constructors

| Name | Description |
| --- | --- |
| [PsrRealtimeEventContainerChangedArgs](#group-psrapi-data-psrrealtimeeventcontainerchangedargs) | Initializes a new instance of the PsrRealtimeEventContainerChangedArgs class |

#### Properties

| Name | Description |
| --- | --- |
| [Container](#group-psrapi-data-psrrealtimeeventcontainerchangedargs) | Role already containing the changes. |
| [EventType](#group-psrapi-data-psrrealtimeeventargs) | Type of the changes.<br><br>(Inherited from [PsrRealtimeEventArgs](#group-psrapi-data-psrrealtimeeventargs).) |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventContainerChangedArgs Constructor

Initializes a new instance of the [PsrRealtimeEventContainerChangedArgs](#group-psrapi-data-psrrealtimeeventcontainerchangedargs) class

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public PsrRealtimeEventContainerChangedArgs()
```

#### See Also

###### Reference

[PsrRealtimeEventContainerChangedArgs Class](#group-psrapi-data-psrrealtimeeventcontainerchangedargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventContainerChangedArgs Properties

The [PsrRealtimeEventContainerChangedArgs](#group-psrapi-data-psrrealtimeeventcontainerchangedargs) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [Container](#group-psrapi-data-psrrealtimeeventcontainerchangedargs) | Role already containing the changes. |
| [EventType](#group-psrapi-data-psrrealtimeeventargs) | Type of the changes.<br><br>(Inherited from [PsrRealtimeEventArgs](#group-psrapi-data-psrrealtimeeventargs).) |

#### See Also

###### Reference

[PsrRealtimeEventContainerChangedArgs Class](#group-psrapi-data-psrrealtimeeventcontainerchangedargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventContainerChangedArgs.Container Property

Role already containing the changes.

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public PsrContainer Container { get; set; }
```

###### Property Value

Type: [PsrContainer](data-models.md#group-psrapi-data-psrcontainer)

#### See Also

###### Reference

[PsrRealtimeEventContainerChangedArgs Class](#group-psrapi-data-psrrealtimeeventcontainerchangedargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventContainerChangedArgs Methods

The [PsrRealtimeEventContainerChangedArgs](#group-psrapi-data-psrrealtimeeventcontainerchangedargs) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrRealtimeEventContainerChangedArgs Class](#group-psrapi-data-psrrealtimeeventcontainerchangedargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)


<a id="group-psrapi-data-psrrealtimeeventdatabindingchangedargs"></a>
## PsrRealtimeEventDataBindingChangedArgs

### PsrRealtimeEventDataBindingChangedArgs Class

Event args for a data binding changed realtime event.

#### Inheritance Hierarchy

SystemObject
[PsrApi.DataPsrRealtimeEventArgs](#group-psrapi-data-psrrealtimeeventargs)
PsrApi.DataPsrRealtimeEventDataBindingChangedArgs

#### Syntax

C#

```csharp
public class PsrRealtimeEventDataBindingChangedArgs : PsrRealtimeEventArgs
```

#### Constructors

| Name | Description |
| --- | --- |
| [PsrRealtimeEventDataBindingChangedArgs](#group-psrapi-data-psrrealtimeeventdatabindingchangedargs) | Initializes a new instance of the PsrRealtimeEventDataBindingChangedArgs class |

#### Properties

| Name | Description |
| --- | --- |
| [DataBinding](#group-psrapi-data-psrrealtimeeventdatabindingchangedargs) | Data binding already containing the changes. |
| [EventType](#group-psrapi-data-psrrealtimeeventargs) | Type of the changes.<br><br>(Inherited from [PsrRealtimeEventArgs](#group-psrapi-data-psrrealtimeeventargs).) |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventDataBindingChangedArgs Constructor

Initializes a new instance of the [PsrRealtimeEventDataBindingChangedArgs](#group-psrapi-data-psrrealtimeeventdatabindingchangedargs) class

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public PsrRealtimeEventDataBindingChangedArgs()
```

#### See Also

###### Reference

[PsrRealtimeEventDataBindingChangedArgs Class](#group-psrapi-data-psrrealtimeeventdatabindingchangedargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventDataBindingChangedArgs Properties

The [PsrRealtimeEventDataBindingChangedArgs](#group-psrapi-data-psrrealtimeeventdatabindingchangedargs) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [DataBinding](#group-psrapi-data-psrrealtimeeventdatabindingchangedargs) | Data binding already containing the changes. |
| [EventType](#group-psrapi-data-psrrealtimeeventargs) | Type of the changes.<br><br>(Inherited from [PsrRealtimeEventArgs](#group-psrapi-data-psrrealtimeeventargs).) |

#### See Also

###### Reference

[PsrRealtimeEventDataBindingChangedArgs Class](#group-psrapi-data-psrrealtimeeventdatabindingchangedargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventDataBindingChangedArgs.DataBinding Property

Data binding already containing the changes.

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public PsrDataBinding DataBinding { get; set; }
```

###### Property Value

Type: [PsrDataBinding](data-models.md#group-psrapi-data-psrdatabinding)

#### See Also

###### Reference

[PsrRealtimeEventDataBindingChangedArgs Class](#group-psrapi-data-psrrealtimeeventdatabindingchangedargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventDataBindingChangedArgs Methods

The [PsrRealtimeEventDataBindingChangedArgs](#group-psrapi-data-psrrealtimeeventdatabindingchangedargs) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrRealtimeEventDataBindingChangedArgs Class](#group-psrapi-data-psrrealtimeeventdatabindingchangedargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)


<a id="group-psrapi-data-psrrealtimeeventgroupchangedargs"></a>
## PsrRealtimeEventGroupChangedArgs

### PsrRealtimeEventGroupChangedArgs Class

Event args for a group changed realtime event.

#### Inheritance Hierarchy

SystemObject
[PsrApi.DataPsrRealtimeEventArgs](#group-psrapi-data-psrrealtimeeventargs)
PsrApi.DataPsrRealtimeEventGroupChangedArgs

#### Syntax

C#

```csharp
public class PsrRealtimeEventGroupChangedArgs : PsrRealtimeEventArgs
```

#### Constructors

| Name | Description |
| --- | --- |
| [PsrRealtimeEventGroupChangedArgs](#group-psrapi-data-psrrealtimeeventgroupchangedargs) | Initializes a new instance of the PsrRealtimeEventGroupChangedArgs class |

#### Properties

| Name | Description |
| --- | --- |
| [EventType](#group-psrapi-data-psrrealtimeeventargs) | Type of the changes.<br><br>(Inherited from [PsrRealtimeEventArgs](#group-psrapi-data-psrrealtimeeventargs).) |
| [Group](#group-psrapi-data-psrrealtimeeventgroupchangedargs) | Group already containing the changes. |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventGroupChangedArgs Constructor

Initializes a new instance of the [PsrRealtimeEventGroupChangedArgs](#group-psrapi-data-psrrealtimeeventgroupchangedargs) class

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public PsrRealtimeEventGroupChangedArgs()
```

#### See Also

###### Reference

[PsrRealtimeEventGroupChangedArgs Class](#group-psrapi-data-psrrealtimeeventgroupchangedargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventGroupChangedArgs Properties

The [PsrRealtimeEventGroupChangedArgs](#group-psrapi-data-psrrealtimeeventgroupchangedargs) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [EventType](#group-psrapi-data-psrrealtimeeventargs) | Type of the changes.<br><br>(Inherited from [PsrRealtimeEventArgs](#group-psrapi-data-psrrealtimeeventargs).) |
| [Group](#group-psrapi-data-psrrealtimeeventgroupchangedargs) | Group already containing the changes. |

#### See Also

###### Reference

[PsrRealtimeEventGroupChangedArgs Class](#group-psrapi-data-psrrealtimeeventgroupchangedargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventGroupChangedArgs.Group Property

Group already containing the changes.

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public PsrOrganisationUnitGroup Group { get; set; }
```

###### Property Value

Type: [PsrOrganisationUnitGroup](data-models.md#group-psrapi-data-psrorganisationunitgroup)

#### See Also

###### Reference

[PsrRealtimeEventGroupChangedArgs Class](#group-psrapi-data-psrrealtimeeventgroupchangedargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventGroupChangedArgs Methods

The [PsrRealtimeEventGroupChangedArgs](#group-psrapi-data-psrrealtimeeventgroupchangedargs) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrRealtimeEventGroupChangedArgs Class](#group-psrapi-data-psrrealtimeeventgroupchangedargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)


<a id="group-psrapi-data-psrrealtimeeventprogressexceptionargs"></a>
## PsrRealtimeEventProgressExceptionArgs

### PsrRealtimeEventProgressExceptionArgs Class

Event args for a progress exception realtime event.

#### Inheritance Hierarchy

SystemObject
[PsrApi.DataPsrRealtimeEventArgs](#group-psrapi-data-psrrealtimeeventargs)
PsrApi.DataPsrRealtimeEventProgressExceptionArgs

#### Syntax

C#

```csharp
public class PsrRealtimeEventProgressExceptionArgs : PsrRealtimeEventArgs
```

#### Constructors

| Name | Description |
| --- | --- |
| [PsrRealtimeEventProgressExceptionArgs](#group-psrapi-data-psrrealtimeeventprogressexceptionargs) | Initializes a new instance of the PsrRealtimeEventProgressExceptionArgs class |

#### Properties

| Name | Description |
| --- | --- |
| [Error](#group-psrapi-data-psrrealtimeeventprogressexceptionargs) | Error. |
| [EventType](#group-psrapi-data-psrrealtimeeventargs) | Type of the changes.<br><br>(Inherited from [PsrRealtimeEventArgs](#group-psrapi-data-psrrealtimeeventargs).) |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventProgressExceptionArgs Constructor

Initializes a new instance of the [PsrRealtimeEventProgressExceptionArgs](#group-psrapi-data-psrrealtimeeventprogressexceptionargs) class

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public PsrRealtimeEventProgressExceptionArgs()
```

#### See Also

###### Reference

[PsrRealtimeEventProgressExceptionArgs Class](#group-psrapi-data-psrrealtimeeventprogressexceptionargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventProgressExceptionArgs Properties

The [PsrRealtimeEventProgressExceptionArgs](#group-psrapi-data-psrrealtimeeventprogressexceptionargs) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [Error](#group-psrapi-data-psrrealtimeeventprogressexceptionargs) | Error. |
| [EventType](#group-psrapi-data-psrrealtimeeventargs) | Type of the changes.<br><br>(Inherited from [PsrRealtimeEventArgs](#group-psrapi-data-psrrealtimeeventargs).) |

#### See Also

###### Reference

[PsrRealtimeEventProgressExceptionArgs Class](#group-psrapi-data-psrrealtimeeventprogressexceptionargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventProgressExceptionArgs.Error Property

Error.

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public PsrProgressTokenErrorArgs Error { get; set; }
```

###### Property Value

Type: [PsrProgressTokenErrorArgs](#group-psrapi-data-psrprogresstokenerrorargs)

#### See Also

###### Reference

[PsrRealtimeEventProgressExceptionArgs Class](#group-psrapi-data-psrrealtimeeventprogressexceptionargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventProgressExceptionArgs Methods

The [PsrRealtimeEventProgressExceptionArgs](#group-psrapi-data-psrrealtimeeventprogressexceptionargs) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrRealtimeEventProgressExceptionArgs Class](#group-psrapi-data-psrrealtimeeventprogressexceptionargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)


<a id="group-psrapi-data-psrrealtimeeventprogressfinishedargs"></a>
## PsrRealtimeEventProgressFinishedArgs

### PsrRealtimeEventProgressFinishedArgs Class

Event args for a progress finished realtime event.

#### Inheritance Hierarchy

SystemObject
[PsrApi.DataPsrRealtimeEventArgs](#group-psrapi-data-psrrealtimeeventargs)
PsrApi.DataPsrRealtimeEventProgressFinishedArgs

#### Syntax

C#

```csharp
public class PsrRealtimeEventProgressFinishedArgs : PsrRealtimeEventArgs
```

#### Constructors

| Name | Description |
| --- | --- |
| [PsrRealtimeEventProgressFinishedArgs](#group-psrapi-data-psrrealtimeeventprogressfinishedargs) | Initializes a new instance of the PsrRealtimeEventProgressFinishedArgs class |

#### Properties

| Name | Description |
| --- | --- |
| [EventType](#group-psrapi-data-psrrealtimeeventargs) | Type of the changes.<br><br>(Inherited from [PsrRealtimeEventArgs](#group-psrapi-data-psrrealtimeeventargs).) |
| [TokenIdentity](#group-psrapi-data-psrrealtimeeventprogressfinishedargs) | ID of the process that finished. |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventProgressFinishedArgs Constructor

Initializes a new instance of the [PsrRealtimeEventProgressFinishedArgs](#group-psrapi-data-psrrealtimeeventprogressfinishedargs) class

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public PsrRealtimeEventProgressFinishedArgs()
```

#### See Also

###### Reference

[PsrRealtimeEventProgressFinishedArgs Class](#group-psrapi-data-psrrealtimeeventprogressfinishedargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventProgressFinishedArgs Properties

The [PsrRealtimeEventProgressFinishedArgs](#group-psrapi-data-psrrealtimeeventprogressfinishedargs) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [EventType](#group-psrapi-data-psrrealtimeeventargs) | Type of the changes.<br><br>(Inherited from [PsrRealtimeEventArgs](#group-psrapi-data-psrrealtimeeventargs).) |
| [TokenIdentity](#group-psrapi-data-psrrealtimeeventprogressfinishedargs) | ID of the process that finished. |

#### See Also

###### Reference

[PsrRealtimeEventProgressFinishedArgs Class](#group-psrapi-data-psrrealtimeeventprogressfinishedargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventProgressFinishedArgs.TokenIdentity Property

ID of the process that finished.

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public int TokenIdentity { get; set; }
```

###### Property Value

Type: Int32

#### See Also

###### Reference

[PsrRealtimeEventProgressFinishedArgs Class](#group-psrapi-data-psrrealtimeeventprogressfinishedargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventProgressFinishedArgs Methods

The [PsrRealtimeEventProgressFinishedArgs](#group-psrapi-data-psrrealtimeeventprogressfinishedargs) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrRealtimeEventProgressFinishedArgs Class](#group-psrapi-data-psrrealtimeeventprogressfinishedargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)


<a id="group-psrapi-data-psrrealtimeeventprogressstepargs"></a>
## PsrRealtimeEventProgressStepArgs

### PsrRealtimeEventProgressStepArgs Class

Event args for a progress step realtime event.

#### Inheritance Hierarchy

SystemObject
[PsrApi.DataPsrRealtimeEventArgs](#group-psrapi-data-psrrealtimeeventargs)
PsrApi.DataPsrRealtimeEventProgressStepArgs

#### Syntax

C#

```csharp
public class PsrRealtimeEventProgressStepArgs : PsrRealtimeEventArgs
```

#### Constructors

| Name | Description |
| --- | --- |
| [PsrRealtimeEventProgressStepArgs](#group-psrapi-data-psrrealtimeeventprogressstepargs) | Initializes a new instance of the PsrRealtimeEventProgressStepArgs class |

#### Properties

| Name | Description |
| --- | --- |
| [EventType](#group-psrapi-data-psrrealtimeeventargs) | Type of the changes.<br><br>(Inherited from [PsrRealtimeEventArgs](#group-psrapi-data-psrrealtimeeventargs).) |
| [ProgressToken](#group-psrapi-data-psrrealtimeeventprogressstepargs) | Progress token. |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventProgressStepArgs Constructor

Initializes a new instance of the [PsrRealtimeEventProgressStepArgs](#group-psrapi-data-psrrealtimeeventprogressstepargs) class

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public PsrRealtimeEventProgressStepArgs()
```

#### See Also

###### Reference

[PsrRealtimeEventProgressStepArgs Class](#group-psrapi-data-psrrealtimeeventprogressstepargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventProgressStepArgs Properties

The [PsrRealtimeEventProgressStepArgs](#group-psrapi-data-psrrealtimeeventprogressstepargs) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [EventType](#group-psrapi-data-psrrealtimeeventargs) | Type of the changes.<br><br>(Inherited from [PsrRealtimeEventArgs](#group-psrapi-data-psrrealtimeeventargs).) |
| [ProgressToken](#group-psrapi-data-psrrealtimeeventprogressstepargs) | Progress token. |

#### See Also

###### Reference

[PsrRealtimeEventProgressStepArgs Class](#group-psrapi-data-psrrealtimeeventprogressstepargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventProgressStepArgs.ProgressToken Property

Progress token.

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public PsrProgressTokenArgs ProgressToken { get; set; }
```

###### Property Value

Type: [PsrProgressTokenArgs](#group-psrapi-data-psrprogresstokenargs)

#### See Also

###### Reference

[PsrRealtimeEventProgressStepArgs Class](#group-psrapi-data-psrrealtimeeventprogressstepargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventProgressStepArgs Methods

The [PsrRealtimeEventProgressStepArgs](#group-psrapi-data-psrrealtimeeventprogressstepargs) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrRealtimeEventProgressStepArgs Class](#group-psrapi-data-psrrealtimeeventprogressstepargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)


<a id="group-psrapi-data-psrrealtimeeventrolechangedargs"></a>
## PsrRealtimeEventRoleChangedArgs

### PsrRealtimeEventRoleChangedArgs Class

Event args for a role changed realtime event.

#### Inheritance Hierarchy

SystemObject
[PsrApi.DataPsrRealtimeEventArgs](#group-psrapi-data-psrrealtimeeventargs)
PsrApi.DataPsrRealtimeEventRoleChangedArgs

#### Syntax

C#

```csharp
public class PsrRealtimeEventRoleChangedArgs : PsrRealtimeEventArgs
```

#### Constructors

| Name | Description |
| --- | --- |
| [PsrRealtimeEventRoleChangedArgs](#group-psrapi-data-psrrealtimeeventrolechangedargs) | Initializes a new instance of the PsrRealtimeEventRoleChangedArgs class |

#### Properties

| Name | Description |
| --- | --- |
| [EventType](#group-psrapi-data-psrrealtimeeventargs) | Type of the changes.<br><br>(Inherited from [PsrRealtimeEventArgs](#group-psrapi-data-psrrealtimeeventargs).) |
| [Role](#group-psrapi-data-psrrealtimeeventrolechangedargs) | Role already containing the changes. |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventRoleChangedArgs Constructor

Initializes a new instance of the [PsrRealtimeEventRoleChangedArgs](#group-psrapi-data-psrrealtimeeventrolechangedargs) class

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public PsrRealtimeEventRoleChangedArgs()
```

#### See Also

###### Reference

[PsrRealtimeEventRoleChangedArgs Class](#group-psrapi-data-psrrealtimeeventrolechangedargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventRoleChangedArgs Properties

The [PsrRealtimeEventRoleChangedArgs](#group-psrapi-data-psrrealtimeeventrolechangedargs) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [EventType](#group-psrapi-data-psrrealtimeeventargs) | Type of the changes.<br><br>(Inherited from [PsrRealtimeEventArgs](#group-psrapi-data-psrrealtimeeventargs).) |
| [Role](#group-psrapi-data-psrrealtimeeventrolechangedargs) | Role already containing the changes. |

#### See Also

###### Reference

[PsrRealtimeEventRoleChangedArgs Class](#group-psrapi-data-psrrealtimeeventrolechangedargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventRoleChangedArgs.Role Property

Role already containing the changes.

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public PsrRole Role { get; set; }
```

###### Property Value

Type: [PsrRole](data-models.md#group-psrapi-data-psrrole)

#### See Also

###### Reference

[PsrRealtimeEventRoleChangedArgs Class](#group-psrapi-data-psrrealtimeeventrolechangedargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventRoleChangedArgs Methods

The [PsrRealtimeEventRoleChangedArgs](#group-psrapi-data-psrrealtimeeventrolechangedargs) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrRealtimeEventRoleChangedArgs Class](#group-psrapi-data-psrrealtimeeventrolechangedargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)


<a id="group-psrapi-data-psrrealtimeeventservermessageargs"></a>
## PsrRealtimeEventServerMessageArgs

### PsrRealtimeEventServerMessageArgs Class

Event args for a server message realtime event.

#### Inheritance Hierarchy

SystemObject
PsrApi.DataPsrRealtimeEventServerMessageArgs

#### Syntax

C#

```csharp
public class PsrRealtimeEventServerMessageArgs
```

#### Constructors

| Name | Description |
| --- | --- |
| [PsrRealtimeEventServerMessageArgs](#group-psrapi-data-psrrealtimeeventservermessageargs) | Initializes a new instance of the PsrRealtimeEventServerMessageArgs class |

#### Properties

| Name | Description |
| --- | --- |
| [ServerMessage](#group-psrapi-data-psrrealtimeeventservermessageargs) | Server message. |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventServerMessageArgs Constructor

Initializes a new instance of the [PsrRealtimeEventServerMessageArgs](#group-psrapi-data-psrrealtimeeventservermessageargs) class

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public PsrRealtimeEventServerMessageArgs()
```

#### See Also

###### Reference

[PsrRealtimeEventServerMessageArgs Class](#group-psrapi-data-psrrealtimeeventservermessageargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventServerMessageArgs Properties

The [PsrRealtimeEventServerMessageArgs](#group-psrapi-data-psrrealtimeeventservermessageargs) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [ServerMessage](#group-psrapi-data-psrrealtimeeventservermessageargs) | Server message. |

#### See Also

###### Reference

[PsrRealtimeEventServerMessageArgs Class](#group-psrapi-data-psrrealtimeeventservermessageargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventServerMessageArgs.ServerMessage Property

Server message.

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public PsrServerMessage ServerMessage { get; set; }
```

###### Property Value

Type: [PsrServerMessage](data-models.md#group-psrapi-data-psrservermessage)

#### See Also

###### Reference

[PsrRealtimeEventServerMessageArgs Class](#group-psrapi-data-psrrealtimeeventservermessageargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventServerMessageArgs Methods

The [PsrRealtimeEventServerMessageArgs](#group-psrapi-data-psrrealtimeeventservermessageargs) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrRealtimeEventServerMessageArgs Class](#group-psrapi-data-psrrealtimeeventservermessageargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)


<a id="group-psrapi-data-psrrealtimeeventuserchangedargs"></a>
## PsrRealtimeEventUserChangedArgs

### PsrRealtimeEventUserChangedArgs Class

Event args for a user changed realtime event.

#### Inheritance Hierarchy

SystemObject
[PsrApi.DataPsrRealtimeEventArgs](#group-psrapi-data-psrrealtimeeventargs)
PsrApi.DataPsrRealtimeEventUserChangedArgs

#### Syntax

C#

```csharp
public class PsrRealtimeEventUserChangedArgs : PsrRealtimeEventArgs
```

#### Constructors

| Name | Description |
| --- | --- |
| [PsrRealtimeEventUserChangedArgs](#group-psrapi-data-psrrealtimeeventuserchangedargs) | Initializes a new instance of the PsrRealtimeEventUserChangedArgs class |

#### Properties

| Name | Description |
| --- | --- |
| [EventType](#group-psrapi-data-psrrealtimeeventargs) | Type of the changes.<br><br>(Inherited from [PsrRealtimeEventArgs](#group-psrapi-data-psrrealtimeeventargs).) |
| [User](#group-psrapi-data-psrrealtimeeventuserchangedargs) | User already containing the changes. |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventUserChangedArgs Constructor

Initializes a new instance of the [PsrRealtimeEventUserChangedArgs](#group-psrapi-data-psrrealtimeeventuserchangedargs) class

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public PsrRealtimeEventUserChangedArgs()
```

#### See Also

###### Reference

[PsrRealtimeEventUserChangedArgs Class](#group-psrapi-data-psrrealtimeeventuserchangedargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventUserChangedArgs Properties

The [PsrRealtimeEventUserChangedArgs](#group-psrapi-data-psrrealtimeeventuserchangedargs) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [EventType](#group-psrapi-data-psrrealtimeeventargs) | Type of the changes.<br><br>(Inherited from [PsrRealtimeEventArgs](#group-psrapi-data-psrrealtimeeventargs).) |
| [User](#group-psrapi-data-psrrealtimeeventuserchangedargs) | User already containing the changes. |

#### See Also

###### Reference

[PsrRealtimeEventUserChangedArgs Class](#group-psrapi-data-psrrealtimeeventuserchangedargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventUserChangedArgs.User Property

User already containing the changes.

Namespace:
[PsrApi.Data](data-models.md#group-psrapi-data)

#### Syntax

C#

```csharp
public PsrOrganisationUnitUser User { get; set; }
```

###### Property Value

Type: [PsrOrganisationUnitUser](data-models.md#group-psrapi-data-psrorganisationunituser)

#### See Also

###### Reference

[PsrRealtimeEventUserChangedArgs Class](#group-psrapi-data-psrrealtimeeventuserchangedargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)

### PsrRealtimeEventUserChangedArgs Methods

The [PsrRealtimeEventUserChangedArgs](#group-psrapi-data-psrrealtimeeventuserchangedargs) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrRealtimeEventUserChangedArgs Class](#group-psrapi-data-psrrealtimeeventuserchangedargs)

[PsrApi.Data Namespace](data-models.md#group-psrapi-data)


<a id="group-psrapi-managers-realtimeeventmanager"></a>
## RealtimeEventManager

### RealtimeEventManager Class

Contains realtime events.

#### Inheritance Hierarchy

SystemObject
[PsrApi.ManagersBaseManager](managers.md#group-psrapi-managers-basemanager)
PsrApi.ManagersRealtimeEventManager

#### Syntax

C#

```csharp
public class RealtimeEventManager : BaseManager
```

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### Events

| Name | Description |
| --- | --- |
| [ContainerChanged](#group-psrapi-managers-realtimeeventmanager) | Event fired when a container has changed.<br>Only invoked when license module realtime is available and realtime updates are enabled. |
| [DataBindingChanged](#group-psrapi-managers-realtimeeventmanager) | Event fired when a data binding has changed.<br>Only invoked when license module realtime is available and realtime updates are enabled. |
| [GroupChanged](#group-psrapi-managers-realtimeeventmanager) | Event fired when a group has changed.<br>Only invoked when license module realtime is available and realtime updates are enabled. |
| [RoleChanged](#group-psrapi-managers-realtimeeventmanager) | Event fired when a role has changed.<br>Only invoked when license module realtime is available and realtime updates are enabled. |
| [ServerMessageReceived](#group-psrapi-managers-realtimeeventmanager) | Event fired when a server message was received. |
| [UserChanged](#group-psrapi-managers-realtimeeventmanager) | Event fired when a user has changed.<br>Only invoked when license module realtime is available and realtime updates are enabled. |

#### See Also

###### Reference

[PsrApi.Managers Namespace](managers.md#group-psrapi-managers)

### RealtimeEventManager Methods

The [RealtimeEventManager](#group-psrapi-managers-realtimeeventmanager) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[RealtimeEventManager Class](#group-psrapi-managers-realtimeeventmanager)

[PsrApi.Managers Namespace](managers.md#group-psrapi-managers)

### RealtimeEventManager Events

The [RealtimeEventManager](#group-psrapi-managers-realtimeeventmanager) type exposes the following members.

#### Events

| Name | Description |
| --- | --- |
| [ContainerChanged](#group-psrapi-managers-realtimeeventmanager) | Event fired when a container has changed.<br>Only invoked when license module realtime is available and realtime updates are enabled. |
| [DataBindingChanged](#group-psrapi-managers-realtimeeventmanager) | Event fired when a data binding has changed.<br>Only invoked when license module realtime is available and realtime updates are enabled. |
| [GroupChanged](#group-psrapi-managers-realtimeeventmanager) | Event fired when a group has changed.<br>Only invoked when license module realtime is available and realtime updates are enabled. |
| [RoleChanged](#group-psrapi-managers-realtimeeventmanager) | Event fired when a role has changed.<br>Only invoked when license module realtime is available and realtime updates are enabled. |
| [ServerMessageReceived](#group-psrapi-managers-realtimeeventmanager) | Event fired when a server message was received. |
| [UserChanged](#group-psrapi-managers-realtimeeventmanager) | Event fired when a user has changed.<br>Only invoked when license module realtime is available and realtime updates are enabled. |

#### See Also

###### Reference

[RealtimeEventManager Class](#group-psrapi-managers-realtimeeventmanager)

[PsrApi.Managers Namespace](managers.md#group-psrapi-managers)

### RealtimeEventManager.ContainerChanged Event

Event fired when a container has changed.
Only invoked when license module realtime is available and realtime updates are enabled.

Namespace:
[PsrApi.Managers](managers.md#group-psrapi-managers)

#### Syntax

C#

```csharp
public event EventHandler<PsrRealtimeEventContainerChangedArgs> ContainerChanged
```

###### Value

Type: SystemEventHandler[PsrRealtimeEventContainerChangedArgs](#group-psrapi-data-psrrealtimeeventcontainerchangedargs)

#### See Also

###### Reference

[RealtimeEventManager Class](#group-psrapi-managers-realtimeeventmanager)

[PsrApi.Managers Namespace](managers.md#group-psrapi-managers)

### RealtimeEventManager.DataBindingChanged Event

Event fired when a data binding has changed.
Only invoked when license module realtime is available and realtime updates are enabled.

Namespace:
[PsrApi.Managers](managers.md#group-psrapi-managers)

#### Syntax

C#

```csharp
public event EventHandler<PsrRealtimeEventDataBindingChangedArgs> DataBindingChanged
```

###### Value

Type: SystemEventHandler[PsrRealtimeEventDataBindingChangedArgs](#group-psrapi-data-psrrealtimeeventdatabindingchangedargs)

#### See Also

###### Reference

[RealtimeEventManager Class](#group-psrapi-managers-realtimeeventmanager)

[PsrApi.Managers Namespace](managers.md#group-psrapi-managers)

### RealtimeEventManager.GroupChanged Event

Event fired when a group has changed.
Only invoked when license module realtime is available and realtime updates are enabled.

Namespace:
[PsrApi.Managers](managers.md#group-psrapi-managers)

#### Syntax

C#

```csharp
public event EventHandler<PsrRealtimeEventGroupChangedArgs> GroupChanged
```

###### Value

Type: SystemEventHandler[PsrRealtimeEventGroupChangedArgs](#group-psrapi-data-psrrealtimeeventgroupchangedargs)

#### See Also

###### Reference

[RealtimeEventManager Class](#group-psrapi-managers-realtimeeventmanager)

[PsrApi.Managers Namespace](managers.md#group-psrapi-managers)

### RealtimeEventManager.RoleChanged Event

Event fired when a role has changed.
Only invoked when license module realtime is available and realtime updates are enabled.

Namespace:
[PsrApi.Managers](managers.md#group-psrapi-managers)

#### Syntax

C#

```csharp
public event EventHandler<PsrRealtimeEventRoleChangedArgs> RoleChanged
```

###### Value

Type: SystemEventHandler[PsrRealtimeEventRoleChangedArgs](#group-psrapi-data-psrrealtimeeventrolechangedargs)

#### See Also

###### Reference

[RealtimeEventManager Class](#group-psrapi-managers-realtimeeventmanager)

[PsrApi.Managers Namespace](managers.md#group-psrapi-managers)

### RealtimeEventManager.ServerMessageReceived Event

Event fired when a server message was received.

Namespace:
[PsrApi.Managers](managers.md#group-psrapi-managers)

#### Syntax

C#

```csharp
public event EventHandler<PsrRealtimeEventServerMessageArgs> ServerMessageReceived
```

###### Value

Type: SystemEventHandler[PsrRealtimeEventServerMessageArgs](#group-psrapi-data-psrrealtimeeventservermessageargs)

#### See Also

###### Reference

[RealtimeEventManager Class](#group-psrapi-managers-realtimeeventmanager)

[PsrApi.Managers Namespace](managers.md#group-psrapi-managers)

### RealtimeEventManager.UserChanged Event

Event fired when a user has changed.
Only invoked when license module realtime is available and realtime updates are enabled.

Namespace:
[PsrApi.Managers](managers.md#group-psrapi-managers)

#### Syntax

C#

```csharp
public event EventHandler<PsrRealtimeEventUserChangedArgs> UserChanged
```

###### Value

Type: SystemEventHandler[PsrRealtimeEventUserChangedArgs](#group-psrapi-data-psrrealtimeeventuserchangedargs)

#### See Also

###### Reference

[RealtimeEventManager Class](#group-psrapi-managers-realtimeeventmanager)

[PsrApi.Managers Namespace](managers.md#group-psrapi-managers)


<a id="group-psrapi-synchronization"></a>
## PsrApi.Synchronization

### PsrApi.Synchronization Namespace

#### Classes

| Class | Description |
| --- | --- |
| [PsrGetMigratedDataKeyInstruction](#group-psrapi-synchronization-psrgetmigrateddatakeyinstruction) |  |
| [PsrGetMigratedKeysArgs](#group-psrapi-synchronization-psrgetmigratedkeysargs) | Arguments to fix the migrated keys |
| [PsrGetMigratedKeysResult](#group-psrapi-synchronization-psrgetmigratedkeysresult) | Result of the fix migrated keys call |
| [PsrIdMap](#group-psrapi-synchronization-psridmap) | Maps IDs from server to client (used by the Netwrix Password Secure App) |
| [PsrSyncProtocol](#group-psrapi-synchronization-psrsyncprotocol) |  |
| [PsrSyncServerChanges](#group-psrapi-synchronization-psrsyncserverchanges) | Describes the differences from client and server data |
| [PsrSyncToServerArgs](#group-psrapi-synchronization-psrsynctoserverargs) | Arguments for the synchronisation to the server |
| [PsrSyncToServerResult](#group-psrapi-synchronization-psrsynctoserverresult) | All required information for the synchronization process |
| [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult) |  |
| [PsrTransactionResultDependencyError](#group-psrapi-synchronization-psrtransactionresultdependencyerror) |  |
| [PsrTransactionResultError](#group-psrapi-synchronization-psrtransactionresulterror) |  |
| [PsrTransactionResultException](#group-psrapi-synchronization-psrtransactionresultexception) | Result with exception which happened during a transaction |
| [PsrTransactionResultSuccess](#group-psrapi-synchronization-psrtransactionresultsuccess) |  |
| [PsrTransactionResultSuccessRequireResync](#group-psrapi-synchronization-psrtransactionresultsuccessrequireresync) |  |


<a id="group-psrapi-synchronization-psrgetmigrateddatakeyinstruction"></a>
## PsrGetMigratedDataKeyInstruction

### PsrGetMigratedDataKeyInstruction Class

#### Inheritance Hierarchy

SystemObject
PsrApi.SynchronizationPsrGetMigratedDataKeyInstruction

#### Syntax

C#

```csharp
public class PsrGetMigratedDataKeyInstruction
```

#### Constructors

| Name | Description |
| --- | --- |
| [PsrGetMigratedDataKeyInstruction](#group-psrapi-synchronization-psrgetmigrateddatakeyinstruction) | Initializes a new instance of the PsrGetMigratedDataKeyInstruction class |

#### Properties

| Name | Description |
| --- | --- |
| [DataId](#group-psrapi-synchronization-psrgetmigrateddatakeyinstruction) | The id of the data which has been migrated |
| [DecryptionInstruction](#group-psrapi-synchronization-psrgetmigrateddatakeyinstruction) | Instruction, to decrypt the key of the data |
| [PublicKey](#group-psrapi-synchronization-psrgetmigrateddatakeyinstruction) | The public key of the data (null for symmetric key) |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrGetMigratedDataKeyInstruction Constructor

Initializes a new instance of the [PsrGetMigratedDataKeyInstruction](#group-psrapi-synchronization-psrgetmigrateddatakeyinstruction) class

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public PsrGetMigratedDataKeyInstruction()
```

#### See Also

###### Reference

[PsrGetMigratedDataKeyInstruction Class](#group-psrapi-synchronization-psrgetmigrateddatakeyinstruction)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrGetMigratedDataKeyInstruction Properties

The [PsrGetMigratedDataKeyInstruction](#group-psrapi-synchronization-psrgetmigrateddatakeyinstruction) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [DataId](#group-psrapi-synchronization-psrgetmigrateddatakeyinstruction) | The id of the data which has been migrated |
| [DecryptionInstruction](#group-psrapi-synchronization-psrgetmigrateddatakeyinstruction) | Instruction, to decrypt the key of the data |
| [PublicKey](#group-psrapi-synchronization-psrgetmigrateddatakeyinstruction) | The public key of the data (null for symmetric key) |

#### See Also

###### Reference

[PsrGetMigratedDataKeyInstruction Class](#group-psrapi-synchronization-psrgetmigrateddatakeyinstruction)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrGetMigratedDataKeyInstruction.DataId Property

The id of the data which has been migrated

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public Guid DataId { get; set; }
```

###### Property Value

Type: Guid

#### See Also

###### Reference

[PsrGetMigratedDataKeyInstruction Class](#group-psrapi-synchronization-psrgetmigrateddatakeyinstruction)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrGetMigratedDataKeyInstruction.DecryptionInstruction Property

Instruction, to decrypt the key of the data

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public PsrDecryptionInstruction DecryptionInstruction { get; set; }
```

###### Property Value

Type: [PsrDecryptionInstruction](internals.md#group-psrapi-internals-internalobjects-psrdecryptioninstruction)

#### See Also

###### Reference

[PsrGetMigratedDataKeyInstruction Class](#group-psrapi-synchronization-psrgetmigrateddatakeyinstruction)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrGetMigratedDataKeyInstruction.PublicKey Property

The public key of the data (null for symmetric key)

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public byte[] PublicKey { get; set; }
```

###### Property Value

Type: Byte

#### See Also

###### Reference

[PsrGetMigratedDataKeyInstruction Class](#group-psrapi-synchronization-psrgetmigrateddatakeyinstruction)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrGetMigratedDataKeyInstruction Methods

The [PsrGetMigratedDataKeyInstruction](#group-psrapi-synchronization-psrgetmigrateddatakeyinstruction) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrGetMigratedDataKeyInstruction Class](#group-psrapi-synchronization-psrgetmigrateddatakeyinstruction)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)


<a id="group-psrapi-synchronization-psrgetmigratedkeysargs"></a>
## PsrGetMigratedKeysArgs

### PsrGetMigratedKeysArgs Class

Arguments to fix the migrated keys

#### Inheritance Hierarchy

SystemObject
PsrApi.SynchronizationPsrGetMigratedKeysArgs

#### Syntax

C#

```csharp
public class PsrGetMigratedKeysArgs
```

#### Constructors

| Name | Description |
| --- | --- |
| [PsrGetMigratedKeysArgs](#group-psrapi-synchronization-psrgetmigratedkeysargs) | Initializes a new instance of the PsrGetMigratedKeysArgs class |

#### Properties

| Name | Description |
| --- | --- |
| [ContainerItemIdsWithOldKey](#group-psrapi-synchronization-psrgetmigratedkeysargs) | Ids of container items which still use old RSA keys |
| [GroupIdsWithOldKey](#group-psrapi-synchronization-psrgetmigratedkeysargs) | Ids of groups which still use old RSA keys |
| [RoleIdsWithOldKey](#group-psrapi-synchronization-psrgetmigratedkeysargs) | Ids of roles which still use old RSA keys |
| [UserIdsWithOldKey](#group-psrapi-synchronization-psrgetmigratedkeysargs) | Ids of users which still use old RSA keys |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrGetMigratedKeysArgs Constructor

Initializes a new instance of the [PsrGetMigratedKeysArgs](#group-psrapi-synchronization-psrgetmigratedkeysargs) class

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public PsrGetMigratedKeysArgs()
```

#### See Also

###### Reference

[PsrGetMigratedKeysArgs Class](#group-psrapi-synchronization-psrgetmigratedkeysargs)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrGetMigratedKeysArgs Properties

The [PsrGetMigratedKeysArgs](#group-psrapi-synchronization-psrgetmigratedkeysargs) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [ContainerItemIdsWithOldKey](#group-psrapi-synchronization-psrgetmigratedkeysargs) | Ids of container items which still use old RSA keys |
| [GroupIdsWithOldKey](#group-psrapi-synchronization-psrgetmigratedkeysargs) | Ids of groups which still use old RSA keys |
| [RoleIdsWithOldKey](#group-psrapi-synchronization-psrgetmigratedkeysargs) | Ids of roles which still use old RSA keys |
| [UserIdsWithOldKey](#group-psrapi-synchronization-psrgetmigratedkeysargs) | Ids of users which still use old RSA keys |

#### See Also

###### Reference

[PsrGetMigratedKeysArgs Class](#group-psrapi-synchronization-psrgetmigratedkeysargs)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrGetMigratedKeysArgs.ContainerItemIdsWithOldKey Property

Ids of container items which still use old RSA keys

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<Guid> ContainerItemIdsWithOldKey { get; set; }
```

###### Property Value

Type: ListGuid

#### See Also

###### Reference

[PsrGetMigratedKeysArgs Class](#group-psrapi-synchronization-psrgetmigratedkeysargs)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrGetMigratedKeysArgs.GroupIdsWithOldKey Property

Ids of groups which still use old RSA keys

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<Guid> GroupIdsWithOldKey { get; set; }
```

###### Property Value

Type: ListGuid

#### See Also

###### Reference

[PsrGetMigratedKeysArgs Class](#group-psrapi-synchronization-psrgetmigratedkeysargs)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrGetMigratedKeysArgs.RoleIdsWithOldKey Property

Ids of roles which still use old RSA keys

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<Guid> RoleIdsWithOldKey { get; set; }
```

###### Property Value

Type: ListGuid

#### See Also

###### Reference

[PsrGetMigratedKeysArgs Class](#group-psrapi-synchronization-psrgetmigratedkeysargs)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrGetMigratedKeysArgs.UserIdsWithOldKey Property

Ids of users which still use old RSA keys

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<Guid> UserIdsWithOldKey { get; set; }
```

###### Property Value

Type: ListGuid

#### See Also

###### Reference

[PsrGetMigratedKeysArgs Class](#group-psrapi-synchronization-psrgetmigratedkeysargs)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrGetMigratedKeysArgs Methods

The [PsrGetMigratedKeysArgs](#group-psrapi-synchronization-psrgetmigratedkeysargs) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrGetMigratedKeysArgs Class](#group-psrapi-synchronization-psrgetmigratedkeysargs)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)


<a id="group-psrapi-synchronization-psrgetmigratedkeysresult"></a>
## PsrGetMigratedKeysResult

### PsrGetMigratedKeysResult Class

Result of the fix migrated keys call

#### Inheritance Hierarchy

SystemObject
PsrApi.SynchronizationPsrGetMigratedKeysResult

#### Syntax

C#

```csharp
public class PsrGetMigratedKeysResult
```

#### Constructors

| Name | Description |
| --- | --- |
| [PsrGetMigratedKeysResult](#group-psrapi-synchronization-psrgetmigratedkeysresult) | Initializes a new instance of the PsrGetMigratedKeysResult class |

#### Properties

| Name | Description |
| --- | --- |
| [ContainerItemKeyInstructions](#group-psrapi-synchronization-psrgetmigratedkeysresult) | Instructions to decrypt keys for container items |
| [GroupKeyInstructions](#group-psrapi-synchronization-psrgetmigratedkeysresult) | Instructions to decrypt keys for groups |
| [HasMoreResults](#group-psrapi-synchronization-psrgetmigratedkeysresult) | Returns if there are more results which need to be requested |
| [MigratedKeysId](#group-psrapi-synchronization-psrgetmigratedkeysresult) | The id this result<br>This is required to get load the complete result if HasMoreResults is true. |
| [RoleKeyInstructions](#group-psrapi-synchronization-psrgetmigratedkeysresult) | Instructions to decrypt keys for roles |
| [UserKeyInstructions](#group-psrapi-synchronization-psrgetmigratedkeysresult) | Instructions to decrypt keys for users |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrGetMigratedKeysResult Constructor

Initializes a new instance of the [PsrGetMigratedKeysResult](#group-psrapi-synchronization-psrgetmigratedkeysresult) class

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public PsrGetMigratedKeysResult()
```

#### See Also

###### Reference

[PsrGetMigratedKeysResult Class](#group-psrapi-synchronization-psrgetmigratedkeysresult)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrGetMigratedKeysResult Properties

The [PsrGetMigratedKeysResult](#group-psrapi-synchronization-psrgetmigratedkeysresult) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [ContainerItemKeyInstructions](#group-psrapi-synchronization-psrgetmigratedkeysresult) | Instructions to decrypt keys for container items |
| [GroupKeyInstructions](#group-psrapi-synchronization-psrgetmigratedkeysresult) | Instructions to decrypt keys for groups |
| [HasMoreResults](#group-psrapi-synchronization-psrgetmigratedkeysresult) | Returns if there are more results which need to be requested |
| [MigratedKeysId](#group-psrapi-synchronization-psrgetmigratedkeysresult) | The id this result<br>This is required to get load the complete result if HasMoreResults is true. |
| [RoleKeyInstructions](#group-psrapi-synchronization-psrgetmigratedkeysresult) | Instructions to decrypt keys for roles |
| [UserKeyInstructions](#group-psrapi-synchronization-psrgetmigratedkeysresult) | Instructions to decrypt keys for users |

#### See Also

###### Reference

[PsrGetMigratedKeysResult Class](#group-psrapi-synchronization-psrgetmigratedkeysresult)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrGetMigratedKeysResult.ContainerItemKeyInstructions Property

Instructions to decrypt keys for container items

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrGetMigratedDataKeyInstruction> ContainerItemKeyInstructions { get; set; }
```

###### Property Value

Type: List[PsrGetMigratedDataKeyInstruction](#group-psrapi-synchronization-psrgetmigrateddatakeyinstruction)

#### See Also

###### Reference

[PsrGetMigratedKeysResult Class](#group-psrapi-synchronization-psrgetmigratedkeysresult)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrGetMigratedKeysResult.GroupKeyInstructions Property

Instructions to decrypt keys for groups

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrGetMigratedDataKeyInstruction> GroupKeyInstructions { get; set; }
```

###### Property Value

Type: List[PsrGetMigratedDataKeyInstruction](#group-psrapi-synchronization-psrgetmigrateddatakeyinstruction)

#### See Also

###### Reference

[PsrGetMigratedKeysResult Class](#group-psrapi-synchronization-psrgetmigratedkeysresult)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrGetMigratedKeysResult.HasMoreResults Property

Returns if there are more results which need to be requested

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public bool HasMoreResults { get; set; }
```

###### Property Value

Type: Boolean

#### See Also

###### Reference

[PsrGetMigratedKeysResult Class](#group-psrapi-synchronization-psrgetmigratedkeysresult)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrGetMigratedKeysResult.MigratedKeysId Property

The id this result
This is required to get load the complete result if HasMoreResults is true.

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public Guid MigratedKeysId { get; set; }
```

###### Property Value

Type: Guid

#### See Also

###### Reference

[PsrGetMigratedKeysResult Class](#group-psrapi-synchronization-psrgetmigratedkeysresult)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrGetMigratedKeysResult.RoleKeyInstructions Property

Instructions to decrypt keys for roles

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrGetMigratedDataKeyInstruction> RoleKeyInstructions { get; set; }
```

###### Property Value

Type: List[PsrGetMigratedDataKeyInstruction](#group-psrapi-synchronization-psrgetmigrateddatakeyinstruction)

#### See Also

###### Reference

[PsrGetMigratedKeysResult Class](#group-psrapi-synchronization-psrgetmigratedkeysresult)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrGetMigratedKeysResult.UserKeyInstructions Property

Instructions to decrypt keys for users

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrGetMigratedDataKeyInstruction> UserKeyInstructions { get; set; }
```

###### Property Value

Type: List[PsrGetMigratedDataKeyInstruction](#group-psrapi-synchronization-psrgetmigrateddatakeyinstruction)

#### See Also

###### Reference

[PsrGetMigratedKeysResult Class](#group-psrapi-synchronization-psrgetmigratedkeysresult)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrGetMigratedKeysResult Methods

The [PsrGetMigratedKeysResult](#group-psrapi-synchronization-psrgetmigratedkeysresult) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrGetMigratedKeysResult Class](#group-psrapi-synchronization-psrgetmigratedkeysresult)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)


<a id="group-psrapi-synchronization-psridmap"></a>
## PsrIdMap

### PsrIdMap Class

Maps IDs from server to client (used by the Netwrix Password Secure App)

#### Inheritance Hierarchy

SystemObject
PsrApi.SynchronizationPsrIdMap

#### Syntax

C#

```csharp
public class PsrIdMap
```

#### Constructors

| Name | Description |
| --- | --- |
| [PsrIdMap](#group-psrapi-synchronization-psridmap) | Initializes a new instance of the PsrIdMap class |

#### Properties

| Name | Description |
| --- | --- |
| [__type](#group-psrapi-synchronization-psridmap) | Internally used, never change this value. |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### Fields

| Name | Description |
| --- | --- |
| [IdMap](#group-psrapi-synchronization-psridmap) | ID mapping |

#### See Also

###### Reference

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrIdMap Constructor

Initializes a new instance of the [PsrIdMap](#group-psrapi-synchronization-psridmap) class

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public PsrIdMap()
```

#### See Also

###### Reference

[PsrIdMap Class](#group-psrapi-synchronization-psridmap)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrIdMap Properties

The [PsrIdMap](#group-psrapi-synchronization-psridmap) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [__type](#group-psrapi-synchronization-psridmap) | Internally used, never change this value. |

#### See Also

###### Reference

[PsrIdMap Class](#group-psrapi-synchronization-psridmap)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrIdMap.__type Property

Internally used, never change this value.

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public string __type { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[PsrIdMap Class](#group-psrapi-synchronization-psridmap)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrIdMap Methods

The [PsrIdMap](#group-psrapi-synchronization-psridmap) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrIdMap Class](#group-psrapi-synchronization-psridmap)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrIdMap Fields

The [PsrIdMap](#group-psrapi-synchronization-psridmap) type exposes the following members.

#### Fields

| Name | Description |
| --- | --- |
| [IdMap](#group-psrapi-synchronization-psridmap) | ID mapping |

#### See Also

###### Reference

[PsrIdMap Class](#group-psrapi-synchronization-psridmap)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrIdMap.IdMap Field

ID mapping

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public Dictionary<PsrEntityClass, Dictionary<Guid, Guid>> IdMap
```

###### Field Value

Type: Dictionary[PsrEntityClass](enums-and-constants.md#group-psrapi-data-enums-psrentityclass), DictionaryGuid, Guid

#### See Also

###### Reference

[PsrIdMap Class](#group-psrapi-synchronization-psridmap)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)


<a id="group-psrapi-synchronization-psrsyncprotocol"></a>
## PsrSyncProtocol

### PsrSyncProtocol Class

#### Inheritance Hierarchy

SystemObject
PsrApi.SynchronizationPsrSyncProtocol

#### Syntax

C#

```csharp
public class PsrSyncProtocol
```

#### Constructors

| Name | Description |
| --- | --- |
| [PsrSyncProtocol](#group-psrapi-synchronization-psrsyncprotocol) | Initializes a new instance of the PsrSyncProtocol class |

#### Properties

| Name | Description |
| --- | --- |
| [__type](#group-psrapi-synchronization-psrsyncprotocol) | Internally used, never change this value. |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### Fields

| Name | Description |
| --- | --- |
| [Protocol](#group-psrapi-synchronization-psrsyncprotocol) |  |

#### See Also

###### Reference

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncProtocol Constructor

Initializes a new instance of the [PsrSyncProtocol](#group-psrapi-synchronization-psrsyncprotocol) class

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public PsrSyncProtocol()
```

#### See Also

###### Reference

[PsrSyncProtocol Class](#group-psrapi-synchronization-psrsyncprotocol)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncProtocol Properties

The [PsrSyncProtocol](#group-psrapi-synchronization-psrsyncprotocol) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [__type](#group-psrapi-synchronization-psrsyncprotocol) | Internally used, never change this value. |

#### See Also

###### Reference

[PsrSyncProtocol Class](#group-psrapi-synchronization-psrsyncprotocol)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncProtocol.__type Property

Internally used, never change this value.

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public string __type { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[PsrSyncProtocol Class](#group-psrapi-synchronization-psrsyncprotocol)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncProtocol Methods

The [PsrSyncProtocol](#group-psrapi-synchronization-psrsyncprotocol) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrSyncProtocol Class](#group-psrapi-synchronization-psrsyncprotocol)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncProtocol Fields

The [PsrSyncProtocol](#group-psrapi-synchronization-psrsyncprotocol) type exposes the following members.

#### Fields

| Name | Description |
| --- | --- |
| [Protocol](#group-psrapi-synchronization-psrsyncprotocol) |  |

#### See Also

###### Reference

[PsrSyncProtocol Class](#group-psrapi-synchronization-psrsyncprotocol)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncProtocol.Protocol Field

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public Dictionary<Guid, PsrTransactionResult> Protocol
```

###### Field Value

Type: DictionaryGuid, [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult)

#### See Also

###### Reference

[PsrSyncProtocol Class](#group-psrapi-synchronization-psrsyncprotocol)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)


<a id="group-psrapi-synchronization-psrsyncserverchanges"></a>
## PsrSyncServerChanges

### PsrSyncServerChanges Class

Describes the differences from client and server data

#### Inheritance Hierarchy

SystemObject
PsrApi.SynchronizationPsrSyncServerChanges

#### Syntax

C#

```csharp
public class PsrSyncServerChanges
```

#### Constructors

| Name | Description |
| --- | --- |
| [PsrSyncServerChanges](#group-psrapi-synchronization-psrsyncserverchanges) | Initializes a new instance of the PsrSyncServerChanges class |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### Fields

| Name | Description |
| --- | --- |
| [ApplicationsToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | Applications which have to be added |
| [ApplicationsToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | Applications which have to be updated |
| [ChangesId](#group-psrapi-synchronization-psrsyncserverchanges) | The id for requesting additional change results |
| [ContainerItemsToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | Containeritems which have to be added |
| [ContainerItemsToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | ContainerItems which have to be updated |
| [ContainersToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | Container which have to be added |
| [ContainersToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | Container which have to be updated |
| [CredentialChecksToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | CredentialChecks which have to be added |
| [CredentialChecksToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | CredentialChecks which have to be updated |
| [DataBindingsToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | Databindings which have to be added |
| [DataBindingsToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | Databindings which have to be updated |
| [DataImagesToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | DataImages which have to be added. Logo and icon will be empty (just for determining which dataimage used) |
| [DataImagesToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | DataImages which have to be updated. Logo and icon will be empty (just for determining which dataimage used) |
| [DataRightsToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | DataRights which have to be added |
| [DataRightsToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | DataRights which have to be updated |
| [DataTagsToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | Datatags which have to be added |
| [DataTagsToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | Datatags which have to be updated |
| [DataToDelete](#group-psrapi-synchronization-psrsyncserverchanges) | All data which has to be deleted |
| [GroupsToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | Groups which have to be added |
| [GroupsToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | Groups which have to be updated |
| [HasMoreResults](#group-psrapi-synchronization-psrsyncserverchanges) | Are there more results from the server which have to be requested? |
| [OptionsToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | Optionen which have to be added |
| [OptionsToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | Optionen which have to be updated |
| [PoliciesToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | Policies which have to be added |
| [PoliciesToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | Policies which have to be updated |
| [RolesToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | Rolls which have to be added |
| [RolesToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | Rolls which have to be updated |
| [TagsToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | Tags which have to be added |
| [TagsToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | Tags which have to be updated |
| [TemplateGroupsToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | Right template groups which have to be added |
| [TemplateGroupsToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | Right template groups which have to be updated |
| [UsersToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | Users which have to be added |
| [UsersToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | Users which have to be updated |

#### See Also

###### Reference

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges Constructor

Initializes a new instance of the [PsrSyncServerChanges](#group-psrapi-synchronization-psrsyncserverchanges) class

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public PsrSyncServerChanges()
```

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges Methods

The [PsrSyncServerChanges](#group-psrapi-synchronization-psrsyncserverchanges) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges Fields

The [PsrSyncServerChanges](#group-psrapi-synchronization-psrsyncserverchanges) type exposes the following members.

#### Fields

| Name | Description |
| --- | --- |
| [ApplicationsToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | Applications which have to be added |
| [ApplicationsToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | Applications which have to be updated |
| [ChangesId](#group-psrapi-synchronization-psrsyncserverchanges) | The id for requesting additional change results |
| [ContainerItemsToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | Containeritems which have to be added |
| [ContainerItemsToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | ContainerItems which have to be updated |
| [ContainersToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | Container which have to be added |
| [ContainersToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | Container which have to be updated |
| [CredentialChecksToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | CredentialChecks which have to be added |
| [CredentialChecksToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | CredentialChecks which have to be updated |
| [DataBindingsToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | Databindings which have to be added |
| [DataBindingsToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | Databindings which have to be updated |
| [DataImagesToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | DataImages which have to be added. Logo and icon will be empty (just for determining which dataimage used) |
| [DataImagesToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | DataImages which have to be updated. Logo and icon will be empty (just for determining which dataimage used) |
| [DataRightsToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | DataRights which have to be added |
| [DataRightsToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | DataRights which have to be updated |
| [DataTagsToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | Datatags which have to be added |
| [DataTagsToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | Datatags which have to be updated |
| [DataToDelete](#group-psrapi-synchronization-psrsyncserverchanges) | All data which has to be deleted |
| [GroupsToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | Groups which have to be added |
| [GroupsToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | Groups which have to be updated |
| [HasMoreResults](#group-psrapi-synchronization-psrsyncserverchanges) | Are there more results from the server which have to be requested? |
| [OptionsToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | Optionen which have to be added |
| [OptionsToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | Optionen which have to be updated |
| [PoliciesToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | Policies which have to be added |
| [PoliciesToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | Policies which have to be updated |
| [RolesToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | Rolls which have to be added |
| [RolesToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | Rolls which have to be updated |
| [TagsToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | Tags which have to be added |
| [TagsToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | Tags which have to be updated |
| [TemplateGroupsToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | Right template groups which have to be added |
| [TemplateGroupsToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | Right template groups which have to be updated |
| [UsersToAdd](#group-psrapi-synchronization-psrsyncserverchanges) | Users which have to be added |
| [UsersToUpdate](#group-psrapi-synchronization-psrsyncserverchanges) | Users which have to be updated |

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.ApplicationsToAdd Field

Applications which have to be added

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrApplication> ApplicationsToAdd
```

###### Field Value

Type: List[PsrApplication](data-models.md#group-psrapi-data-psrapplication)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.ApplicationsToUpdate Field

Applications which have to be updated

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrApplication> ApplicationsToUpdate
```

###### Field Value

Type: List[PsrApplication](data-models.md#group-psrapi-data-psrapplication)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.ChangesId Field

The id for requesting additional change results

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public Guid ChangesId
```

###### Field Value

Type: Guid

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.ContainerItemsToAdd Field

Containeritems which have to be added

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrContainerItem> ContainerItemsToAdd
```

###### Field Value

Type: List[PsrContainerItem](data-models.md#group-psrapi-data-psrcontaineritem)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.ContainerItemsToUpdate Field

ContainerItems which have to be updated

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrContainerItem> ContainerItemsToUpdate
```

###### Field Value

Type: List[PsrContainerItem](data-models.md#group-psrapi-data-psrcontaineritem)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.ContainersToAdd Field

Container which have to be added

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrContainer> ContainersToAdd
```

###### Field Value

Type: List[PsrContainer](data-models.md#group-psrapi-data-psrcontainer)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.ContainersToUpdate Field

Container which have to be updated

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrContainer> ContainersToUpdate
```

###### Field Value

Type: List[PsrContainer](data-models.md#group-psrapi-data-psrcontainer)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.CredentialChecksToAdd Field

CredentialChecks which have to be added

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrCredentialCheck> CredentialChecksToAdd
```

###### Field Value

Type: List[PsrCredentialCheck](data-models.md#group-psrapi-data-psrcredentialcheck)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.CredentialChecksToUpdate Field

CredentialChecks which have to be updated

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrCredentialCheck> CredentialChecksToUpdate
```

###### Field Value

Type: List[PsrCredentialCheck](data-models.md#group-psrapi-data-psrcredentialcheck)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.DataBindingsToAdd Field

Databindings which have to be added

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrDataBinding> DataBindingsToAdd
```

###### Field Value

Type: List[PsrDataBinding](data-models.md#group-psrapi-data-psrdatabinding)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.DataBindingsToUpdate Field

Databindings which have to be updated

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrDataBinding> DataBindingsToUpdate
```

###### Field Value

Type: List[PsrDataBinding](data-models.md#group-psrapi-data-psrdatabinding)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.DataImagesToAdd Field

DataImages which have to be added. Logo and icon will be empty (just for determining which dataimage used)

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrDataImage> DataImagesToAdd
```

###### Field Value

Type: List[PsrDataImage](data-models.md#group-psrapi-data-psrdataimage)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.DataImagesToUpdate Field

DataImages which have to be updated. Logo and icon will be empty (just for determining which dataimage used)

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrDataImage> DataImagesToUpdate
```

###### Field Value

Type: List[PsrDataImage](data-models.md#group-psrapi-data-psrdataimage)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.DataRightsToAdd Field

DataRights which have to be added

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrDataRight> DataRightsToAdd
```

###### Field Value

Type: List[PsrDataRight](data-models.md#group-psrapi-data-psrdataright)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.DataRightsToUpdate Field

DataRights which have to be updated

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrDataRight> DataRightsToUpdate
```

###### Field Value

Type: List[PsrDataRight](data-models.md#group-psrapi-data-psrdataright)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.DataTagsToAdd Field

Datatags which have to be added

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrDataTag> DataTagsToAdd
```

###### Field Value

Type: List[PsrDataTag](data-models.md#group-psrapi-data-psrdatatag)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.DataTagsToUpdate Field

Datatags which have to be updated

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrDataTag> DataTagsToUpdate
```

###### Field Value

Type: List[PsrDataTag](data-models.md#group-psrapi-data-psrdatatag)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.DataToDelete Field

All data which has to be deleted

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrKey> DataToDelete
```

###### Field Value

Type: List[PsrKey](data-models.md#group-psrapi-data-datakeys-psrkey)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.GroupsToAdd Field

Groups which have to be added

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrOrganisationUnitGroup> GroupsToAdd
```

###### Field Value

Type: List[PsrOrganisationUnitGroup](data-models.md#group-psrapi-data-psrorganisationunitgroup)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.GroupsToUpdate Field

Groups which have to be updated

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrOrganisationUnitGroup> GroupsToUpdate
```

###### Field Value

Type: List[PsrOrganisationUnitGroup](data-models.md#group-psrapi-data-psrorganisationunitgroup)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.HasMoreResults Field

Are there more results from the server which have to be requested?

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public bool HasMoreResults
```

###### Field Value

Type: Boolean

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.OptionsToAdd Field

Optionen which have to be added

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrOption> OptionsToAdd
```

###### Field Value

Type: List[PsrOption](data-models.md#group-psrapi-data-psroption)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.OptionsToUpdate Field

Optionen which have to be updated

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrOption> OptionsToUpdate
```

###### Field Value

Type: List[PsrOption](data-models.md#group-psrapi-data-psroption)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.PoliciesToAdd Field

Policies which have to be added

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrPolicy> PoliciesToAdd
```

###### Field Value

Type: List[PsrPolicy](data-models.md#group-psrapi-data-psrpolicy)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.PoliciesToUpdate Field

Policies which have to be updated

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrPolicy> PoliciesToUpdate
```

###### Field Value

Type: List[PsrPolicy](data-models.md#group-psrapi-data-psrpolicy)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.RolesToAdd Field

Rolls which have to be added

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrRole> RolesToAdd
```

###### Field Value

Type: List[PsrRole](data-models.md#group-psrapi-data-psrrole)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.RolesToUpdate Field

Rolls which have to be updated

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrRole> RolesToUpdate
```

###### Field Value

Type: List[PsrRole](data-models.md#group-psrapi-data-psrrole)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.TagsToAdd Field

Tags which have to be added

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrTag> TagsToAdd
```

###### Field Value

Type: List[PsrTag](data-models.md#group-psrapi-data-psrtag)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.TagsToUpdate Field

Tags which have to be updated

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrTag> TagsToUpdate
```

###### Field Value

Type: List[PsrTag](data-models.md#group-psrapi-data-psrtag)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.TemplateGroupsToAdd Field

Right template groups which have to be added

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrTemplateGroup> TemplateGroupsToAdd
```

###### Field Value

Type: List[PsrTemplateGroup](data-models.md#group-psrapi-data-psrtemplategroup)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.TemplateGroupsToUpdate Field

Right template groups which have to be updated

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrTemplateGroup> TemplateGroupsToUpdate
```

###### Field Value

Type: List[PsrTemplateGroup](data-models.md#group-psrapi-data-psrtemplategroup)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.UsersToAdd Field

Users which have to be added

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrOrganisationUnitUser> UsersToAdd
```

###### Field Value

Type: List[PsrOrganisationUnitUser](data-models.md#group-psrapi-data-psrorganisationunituser)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncServerChanges.UsersToUpdate Field

Users which have to be updated

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrOrganisationUnitUser> UsersToUpdate
```

###### Field Value

Type: List[PsrOrganisationUnitUser](data-models.md#group-psrapi-data-psrorganisationunituser)

#### See Also

###### Reference

[PsrSyncServerChanges Class](#group-psrapi-synchronization-psrsyncserverchanges)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)


<a id="group-psrapi-synchronization-psrsynctoserverargs"></a>
## PsrSyncToServerArgs

### PsrSyncToServerArgs Class

Arguments for the synchronisation to the server

#### Inheritance Hierarchy

SystemObject
PsrApi.SynchronizationPsrSyncToServerArgs

#### Syntax

C#

```csharp
public class PsrSyncToServerArgs
```

#### Constructors

| Name | Description |
| --- | --- |
| [PsrSyncToServerArgs](#group-psrapi-synchronization-psrsynctoserverargs) | Initializes a new instance of the PsrSyncToServerArgs class |

#### Properties

| Name | Description |
| --- | --- |
| [Containers](#group-psrapi-synchronization-psrsynctoserverargs) | All containers with subobjects which should be synchronized |
| [LogbookEntries](#group-psrapi-synchronization-psrsynctoserverargs) | All Logbookentries, which should be synchroniszed. (Currently only Add is allowed) |
| [Tags](#group-psrapi-synchronization-psrsynctoserverargs) | All tags, which should be synchronized |
| [TemplateGroupsForNewData](#group-psrapi-synchronization-psrsynctoserverargs) | The ids for the PsrTemplateGroup's which should be used for right inheritance for ids of new data (key = id of the new data, value = id of the PsrTemplateGroup which should be used) |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncToServerArgs Constructor

Initializes a new instance of the [PsrSyncToServerArgs](#group-psrapi-synchronization-psrsynctoserverargs) class

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public PsrSyncToServerArgs()
```

#### See Also

###### Reference

[PsrSyncToServerArgs Class](#group-psrapi-synchronization-psrsynctoserverargs)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncToServerArgs Properties

The [PsrSyncToServerArgs](#group-psrapi-synchronization-psrsynctoserverargs) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [Containers](#group-psrapi-synchronization-psrsynctoserverargs) | All containers with subobjects which should be synchronized |
| [LogbookEntries](#group-psrapi-synchronization-psrsynctoserverargs) | All Logbookentries, which should be synchroniszed. (Currently only Add is allowed) |
| [Tags](#group-psrapi-synchronization-psrsynctoserverargs) | All tags, which should be synchronized |
| [TemplateGroupsForNewData](#group-psrapi-synchronization-psrsynctoserverargs) | The ids for the PsrTemplateGroup's which should be used for right inheritance for ids of new data (key = id of the new data, value = id of the PsrTemplateGroup which should be used) |

#### See Also

###### Reference

[PsrSyncToServerArgs Class](#group-psrapi-synchronization-psrsynctoserverargs)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncToServerArgs.Containers Property

All containers with subobjects which should be synchronized

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrContainer> Containers { get; set; }
```

###### Property Value

Type: List[PsrContainer](data-models.md#group-psrapi-data-psrcontainer)

#### See Also

###### Reference

[PsrSyncToServerArgs Class](#group-psrapi-synchronization-psrsynctoserverargs)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncToServerArgs.LogbookEntries Property

All Logbookentries, which should be synchroniszed. (Currently only Add is allowed)

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrLogbook> LogbookEntries { get; set; }
```

###### Property Value

Type: List[PsrLogbook](data-models.md#group-psrapi-data-psrlogbook)

#### See Also

###### Reference

[PsrSyncToServerArgs Class](#group-psrapi-synchronization-psrsynctoserverargs)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncToServerArgs.Tags Property

All tags, which should be synchronized

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public List<PsrTag> Tags { get; set; }
```

###### Property Value

Type: List[PsrTag](data-models.md#group-psrapi-data-psrtag)

#### See Also

###### Reference

[PsrSyncToServerArgs Class](#group-psrapi-synchronization-psrsynctoserverargs)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncToServerArgs.TemplateGroupsForNewData Property

The ids for the PsrTemplateGroup's which should be used for right inheritance for ids of new data (key = id of the new data, value = id of the PsrTemplateGroup which should be used)

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public Dictionary<Guid, Guid> TemplateGroupsForNewData { get; set; }
```

###### Property Value

Type: DictionaryGuid, Guid

#### See Also

###### Reference

[PsrSyncToServerArgs Class](#group-psrapi-synchronization-psrsynctoserverargs)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncToServerArgs Methods

The [PsrSyncToServerArgs](#group-psrapi-synchronization-psrsynctoserverargs) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrSyncToServerArgs Class](#group-psrapi-synchronization-psrsynctoserverargs)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)


<a id="group-psrapi-synchronization-psrsynctoserverresult"></a>
## PsrSyncToServerResult

### PsrSyncToServerResult Class

All required information for the synchronization process

#### Inheritance Hierarchy

SystemObject
PsrApi.SynchronizationPsrSyncToServerResult

#### Syntax

C#

```csharp
public class PsrSyncToServerResult
```

#### Constructors

| Name | Description |
| --- | --- |
| [PsrSyncToServerResult](#group-psrapi-synchronization-psrsynctoserverresult) | Initializes a new instance of the PsrSyncToServerResult class |

#### Properties

| Name | Description |
| --- | --- |
| [__type](#group-psrapi-synchronization-psrsynctoserverresult) |  |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### Fields

| Name | Description |
| --- | --- |
| [IdMap](#group-psrapi-synchronization-psrsynctoserverresult) | A map from old ids to new ids. When a Data gets inserted on the server, it gets a new id. |
| [Protocol](#group-psrapi-synchronization-psrsynctoserverresult) | Contains all information about what happened on the server while synchronizing. (What was added, updated, what could not be updated and why) |

#### See Also

###### Reference

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncToServerResult Constructor

Initializes a new instance of the [PsrSyncToServerResult](#group-psrapi-synchronization-psrsynctoserverresult) class

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public PsrSyncToServerResult()
```

#### See Also

###### Reference

[PsrSyncToServerResult Class](#group-psrapi-synchronization-psrsynctoserverresult)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncToServerResult Properties

The [PsrSyncToServerResult](#group-psrapi-synchronization-psrsynctoserverresult) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [__type](#group-psrapi-synchronization-psrsynctoserverresult) |  |

#### See Also

###### Reference

[PsrSyncToServerResult Class](#group-psrapi-synchronization-psrsynctoserverresult)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncToServerResult.__type Property

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public string __type { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[PsrSyncToServerResult Class](#group-psrapi-synchronization-psrsynctoserverresult)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncToServerResult Methods

The [PsrSyncToServerResult](#group-psrapi-synchronization-psrsynctoserverresult) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrSyncToServerResult Class](#group-psrapi-synchronization-psrsynctoserverresult)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncToServerResult Fields

The [PsrSyncToServerResult](#group-psrapi-synchronization-psrsynctoserverresult) type exposes the following members.

#### Fields

| Name | Description |
| --- | --- |
| [IdMap](#group-psrapi-synchronization-psrsynctoserverresult) | A map from old ids to new ids. When a Data gets inserted on the server, it gets a new id. |
| [Protocol](#group-psrapi-synchronization-psrsynctoserverresult) | Contains all information about what happened on the server while synchronizing. (What was added, updated, what could not be updated and why) |

#### See Also

###### Reference

[PsrSyncToServerResult Class](#group-psrapi-synchronization-psrsynctoserverresult)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncToServerResult.IdMap Field

A map from old ids to new ids. When a Data gets inserted on the server, it gets a new id.

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public PsrIdMap IdMap
```

###### Field Value

Type: [PsrIdMap](#group-psrapi-synchronization-psridmap)

#### See Also

###### Reference

[PsrSyncToServerResult Class](#group-psrapi-synchronization-psrsynctoserverresult)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrSyncToServerResult.Protocol Field

Contains all information about what happened on the server while synchronizing. (What was added, updated, what could not be updated and why)

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public PsrSyncProtocol Protocol
```

###### Field Value

Type: [PsrSyncProtocol](#group-psrapi-synchronization-psrsyncprotocol)

#### See Also

###### Reference

[PsrSyncToServerResult Class](#group-psrapi-synchronization-psrsynctoserverresult)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)


<a id="group-psrapi-synchronization-psrtransactionresult"></a>
## PsrTransactionResult

### PsrTransactionResult Class

#### Inheritance Hierarchy

SystemObject
PsrApi.SynchronizationPsrTransactionResult
[PsrApi.SynchronizationPsrTransactionResultError](#group-psrapi-synchronization-psrtransactionresulterror)
[PsrApi.SynchronizationPsrTransactionResultSuccess](#group-psrapi-synchronization-psrtransactionresultsuccess)

#### Syntax

C#

```csharp
public abstract class PsrTransactionResult
```

#### Properties

| Name | Description |
| --- | --- |
| [__type](#group-psrapi-synchronization-psrtransactionresult) |  |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### Fields

| Name | Description |
| --- | --- |
| [DateTimeUtc](#group-psrapi-synchronization-psrtransactionresult) | Gibt an, wann die Transaktion durchgeführt worden ist. |
| [ExecutedSyncOperation](#group-psrapi-synchronization-psrtransactionresult) | Die Operation die vom Server ausgeführt wurde |
| [SyncOperation](#group-psrapi-synchronization-psrtransactionresult) | Die Operation, die vom Client ausgeführt werden sollte |

#### See Also

###### Reference

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResult Properties

The [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [__type](#group-psrapi-synchronization-psrtransactionresult) |  |

#### See Also

###### Reference

[PsrTransactionResult Class](#group-psrapi-synchronization-psrtransactionresult)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResult.__type Property

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public string __type { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[PsrTransactionResult Class](#group-psrapi-synchronization-psrtransactionresult)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResult Methods

The [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrTransactionResult Class](#group-psrapi-synchronization-psrtransactionresult)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResult Fields

The [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult) type exposes the following members.

#### Fields

| Name | Description |
| --- | --- |
| [DateTimeUtc](#group-psrapi-synchronization-psrtransactionresult) | Gibt an, wann die Transaktion durchgeführt worden ist. |
| [ExecutedSyncOperation](#group-psrapi-synchronization-psrtransactionresult) | Die Operation die vom Server ausgeführt wurde |
| [SyncOperation](#group-psrapi-synchronization-psrtransactionresult) | Die Operation, die vom Client ausgeführt werden sollte |

#### See Also

###### Reference

[PsrTransactionResult Class](#group-psrapi-synchronization-psrtransactionresult)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResult.DateTimeUtc Field

Gibt an, wann die Transaktion durchgeführt worden ist.

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public DateTime DateTimeUtc
```

###### Field Value

Type: DateTime

#### See Also

###### Reference

[PsrTransactionResult Class](#group-psrapi-synchronization-psrtransactionresult)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResult.ExecutedSyncOperation Field

Die Operation die vom Server ausgeführt wurde

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public PsrSyncOperation ExecutedSyncOperation
```

###### Field Value

Type: [PsrSyncOperation](enums-and-constants.md#group-psrapi-data-enums-psrsyncoperation)

#### See Also

###### Reference

[PsrTransactionResult Class](#group-psrapi-synchronization-psrtransactionresult)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResult.SyncOperation Field

Die Operation, die vom Client ausgeführt werden sollte

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public PsrSyncOperation SyncOperation
```

###### Field Value

Type: [PsrSyncOperation](enums-and-constants.md#group-psrapi-data-enums-psrsyncoperation)

#### See Also

###### Reference

[PsrTransactionResult Class](#group-psrapi-synchronization-psrtransactionresult)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)


<a id="group-psrapi-synchronization-psrtransactionresultdependencyerror"></a>
## PsrTransactionResultDependencyError

### PsrTransactionResultDependencyError Class

#### Inheritance Hierarchy

SystemObject
[PsrApi.SynchronizationPsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult)
[PsrApi.SynchronizationPsrTransactionResultError](#group-psrapi-synchronization-psrtransactionresulterror)
PsrApi.SynchronizationPsrTransactionResultDependencyError

#### Syntax

C#

```csharp
public class PsrTransactionResultDependencyError : PsrTransactionResultError
```

#### Constructors

| Name | Description |
| --- | --- |
| [PsrTransactionResultDependencyError](#group-psrapi-synchronization-psrtransactionresultdependencyerror) | Initializes a new instance of the PsrTransactionResultDependencyError class |

#### Properties

| Name | Description |
| --- | --- |
| [__type](#group-psrapi-synchronization-psrtransactionresultdependencyerror) |  |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### Fields

| Name | Description |
| --- | --- |
| [DateTimeUtc](#group-psrapi-synchronization-psrtransactionresult) | Gibt an, wann die Transaktion durchgeführt worden ist.<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |
| [ExecutedSyncOperation](#group-psrapi-synchronization-psrtransactionresult) | Die Operation die vom Server ausgeführt wurde<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |
| [SyncOperation](#group-psrapi-synchronization-psrtransactionresult) | Die Operation, die vom Client ausgeführt werden sollte<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |

#### See Also

###### Reference

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResultDependencyError Constructor

Initializes a new instance of the [PsrTransactionResultDependencyError](#group-psrapi-synchronization-psrtransactionresultdependencyerror) class

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public PsrTransactionResultDependencyError()
```

#### See Also

###### Reference

[PsrTransactionResultDependencyError Class](#group-psrapi-synchronization-psrtransactionresultdependencyerror)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResultDependencyError Properties

The [PsrTransactionResultDependencyError](#group-psrapi-synchronization-psrtransactionresultdependencyerror) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [__type](#group-psrapi-synchronization-psrtransactionresultdependencyerror) |  |

#### See Also

###### Reference

[PsrTransactionResultDependencyError Class](#group-psrapi-synchronization-psrtransactionresultdependencyerror)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResultDependencyError.__type Property

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public string __type { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[PsrTransactionResultDependencyError Class](#group-psrapi-synchronization-psrtransactionresultdependencyerror)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResultDependencyError Methods

The [PsrTransactionResultDependencyError](#group-psrapi-synchronization-psrtransactionresultdependencyerror) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrTransactionResultDependencyError Class](#group-psrapi-synchronization-psrtransactionresultdependencyerror)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResultDependencyError Fields

The [PsrTransactionResultDependencyError](#group-psrapi-synchronization-psrtransactionresultdependencyerror) type exposes the following members.

#### Fields

| Name | Description |
| --- | --- |
| [DateTimeUtc](#group-psrapi-synchronization-psrtransactionresult) | Gibt an, wann die Transaktion durchgeführt worden ist.<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |
| [ExecutedSyncOperation](#group-psrapi-synchronization-psrtransactionresult) | Die Operation die vom Server ausgeführt wurde<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |
| [SyncOperation](#group-psrapi-synchronization-psrtransactionresult) | Die Operation, die vom Client ausgeführt werden sollte<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |

#### See Also

###### Reference

[PsrTransactionResultDependencyError Class](#group-psrapi-synchronization-psrtransactionresultdependencyerror)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)


<a id="group-psrapi-synchronization-psrtransactionresulterror"></a>
## PsrTransactionResultError

### PsrTransactionResultError Class

#### Inheritance Hierarchy

SystemObject
[PsrApi.SynchronizationPsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult)
PsrApi.SynchronizationPsrTransactionResultError
[PsrApi.SynchronizationPsrTransactionResultDependencyError](#group-psrapi-synchronization-psrtransactionresultdependencyerror)
[PsrApi.SynchronizationPsrTransactionResultException](#group-psrapi-synchronization-psrtransactionresultexception)

#### Syntax

C#

```csharp
public abstract class PsrTransactionResultError : PsrTransactionResult
```

#### Properties

| Name | Description |
| --- | --- |
| [__type](#group-psrapi-synchronization-psrtransactionresulterror) |  |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### Fields

| Name | Description |
| --- | --- |
| [DateTimeUtc](#group-psrapi-synchronization-psrtransactionresult) | Gibt an, wann die Transaktion durchgeführt worden ist.<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |
| [ExecutedSyncOperation](#group-psrapi-synchronization-psrtransactionresult) | Die Operation die vom Server ausgeführt wurde<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |
| [SyncOperation](#group-psrapi-synchronization-psrtransactionresult) | Die Operation, die vom Client ausgeführt werden sollte<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |

#### See Also

###### Reference

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResultError Properties

The [PsrTransactionResultError](#group-psrapi-synchronization-psrtransactionresulterror) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [__type](#group-psrapi-synchronization-psrtransactionresulterror) |  |

#### See Also

###### Reference

[PsrTransactionResultError Class](#group-psrapi-synchronization-psrtransactionresulterror)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResultError.__type Property

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public string __type { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[PsrTransactionResultError Class](#group-psrapi-synchronization-psrtransactionresulterror)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResultError Methods

The [PsrTransactionResultError](#group-psrapi-synchronization-psrtransactionresulterror) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrTransactionResultError Class](#group-psrapi-synchronization-psrtransactionresulterror)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResultError Fields

The [PsrTransactionResultError](#group-psrapi-synchronization-psrtransactionresulterror) type exposes the following members.

#### Fields

| Name | Description |
| --- | --- |
| [DateTimeUtc](#group-psrapi-synchronization-psrtransactionresult) | Gibt an, wann die Transaktion durchgeführt worden ist.<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |
| [ExecutedSyncOperation](#group-psrapi-synchronization-psrtransactionresult) | Die Operation die vom Server ausgeführt wurde<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |
| [SyncOperation](#group-psrapi-synchronization-psrtransactionresult) | Die Operation, die vom Client ausgeführt werden sollte<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |

#### See Also

###### Reference

[PsrTransactionResultError Class](#group-psrapi-synchronization-psrtransactionresulterror)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)


<a id="group-psrapi-synchronization-psrtransactionresultexception"></a>
## PsrTransactionResultException

### PsrTransactionResultException Class

Result with exception which happened during a transaction

#### Inheritance Hierarchy

SystemObject
[PsrApi.SynchronizationPsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult)
[PsrApi.SynchronizationPsrTransactionResultError](#group-psrapi-synchronization-psrtransactionresulterror)
PsrApi.SynchronizationPsrTransactionResultException

#### Syntax

C#

```csharp
public class PsrTransactionResultException : PsrTransactionResultError
```

#### Constructors

| Name | Description |
| --- | --- |
| [PsrTransactionResultException](#group-psrapi-synchronization-psrtransactionresultexception) | Initializes a new instance of the PsrTransactionResultException class |

#### Properties

| Name | Description |
| --- | --- |
| [__type](#group-psrapi-synchronization-psrtransactionresultexception) |  |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### Fields

| Name | Description |
| --- | --- |
| [DateTimeUtc](#group-psrapi-synchronization-psrtransactionresult) | Gibt an, wann die Transaktion durchgeführt worden ist.<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |
| [ExceptionCode](#group-psrapi-synchronization-psrtransactionresultexception) | ExceptionCode (if exception was a MtoException) |
| [ExecutedSyncOperation](#group-psrapi-synchronization-psrtransactionresult) | Die Operation die vom Server ausgeführt wurde<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |
| [InnerException](#group-psrapi-synchronization-psrtransactionresultexception) | Inner Exception |
| [Message](#group-psrapi-synchronization-psrtransactionresultexception) | Message |
| [Stacktrace](#group-psrapi-synchronization-psrtransactionresultexception) | Stacktrace |
| [SyncOperation](#group-psrapi-synchronization-psrtransactionresult) | Die Operation, die vom Client ausgeführt werden sollte<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |

#### See Also

###### Reference

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResultException Constructor

Initializes a new instance of the [PsrTransactionResultException](#group-psrapi-synchronization-psrtransactionresultexception) class

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public PsrTransactionResultException()
```

#### See Also

###### Reference

[PsrTransactionResultException Class](#group-psrapi-synchronization-psrtransactionresultexception)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResultException Properties

The [PsrTransactionResultException](#group-psrapi-synchronization-psrtransactionresultexception) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [__type](#group-psrapi-synchronization-psrtransactionresultexception) |  |

#### See Also

###### Reference

[PsrTransactionResultException Class](#group-psrapi-synchronization-psrtransactionresultexception)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResultException.__type Property

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public string __type { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[PsrTransactionResultException Class](#group-psrapi-synchronization-psrtransactionresultexception)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResultException Methods

The [PsrTransactionResultException](#group-psrapi-synchronization-psrtransactionresultexception) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrTransactionResultException Class](#group-psrapi-synchronization-psrtransactionresultexception)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResultException Fields

The [PsrTransactionResultException](#group-psrapi-synchronization-psrtransactionresultexception) type exposes the following members.

#### Fields

| Name | Description |
| --- | --- |
| [DateTimeUtc](#group-psrapi-synchronization-psrtransactionresult) | Gibt an, wann die Transaktion durchgeführt worden ist.<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |
| [ExceptionCode](#group-psrapi-synchronization-psrtransactionresultexception) | ExceptionCode (if exception was a MtoException) |
| [ExecutedSyncOperation](#group-psrapi-synchronization-psrtransactionresult) | Die Operation die vom Server ausgeführt wurde<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |
| [InnerException](#group-psrapi-synchronization-psrtransactionresultexception) | Inner Exception |
| [Message](#group-psrapi-synchronization-psrtransactionresultexception) | Message |
| [Stacktrace](#group-psrapi-synchronization-psrtransactionresultexception) | Stacktrace |
| [SyncOperation](#group-psrapi-synchronization-psrtransactionresult) | Die Operation, die vom Client ausgeführt werden sollte<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |

#### See Also

###### Reference

[PsrTransactionResultException Class](#group-psrapi-synchronization-psrtransactionresultexception)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResultException.ExceptionCode Field

ExceptionCode (if exception was a MtoException)

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public Nullable<PsrApiExceptionCode> ExceptionCode
```

###### Field Value

Type: Nullable[PsrApiExceptionCode](enums-and-constants.md#group-psrapi-psrapiexceptioncode)

#### See Also

###### Reference

[PsrTransactionResultException Class](#group-psrapi-synchronization-psrtransactionresultexception)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResultException.InnerException Field

Inner Exception

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public PsrTransactionResultException InnerException
```

###### Field Value

Type: [PsrTransactionResultException](#group-psrapi-synchronization-psrtransactionresultexception)

#### See Also

###### Reference

[PsrTransactionResultException Class](#group-psrapi-synchronization-psrtransactionresultexception)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResultException.Message Field

Message

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public string Message
```

###### Field Value

Type: String

#### See Also

###### Reference

[PsrTransactionResultException Class](#group-psrapi-synchronization-psrtransactionresultexception)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResultException.Stacktrace Field

Stacktrace

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public string Stacktrace
```

###### Field Value

Type: String

#### See Also

###### Reference

[PsrTransactionResultException Class](#group-psrapi-synchronization-psrtransactionresultexception)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)


<a id="group-psrapi-synchronization-psrtransactionresultsuccess"></a>
## PsrTransactionResultSuccess

### PsrTransactionResultSuccess Class

#### Inheritance Hierarchy

SystemObject
[PsrApi.SynchronizationPsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult)
PsrApi.SynchronizationPsrTransactionResultSuccess
[PsrApi.SynchronizationPsrTransactionResultSuccessRequireResync](#group-psrapi-synchronization-psrtransactionresultsuccessrequireresync)

#### Syntax

C#

```csharp
public class PsrTransactionResultSuccess : PsrTransactionResult
```

#### Constructors

| Name | Description |
| --- | --- |
| [PsrTransactionResultSuccess](#group-psrapi-synchronization-psrtransactionresultsuccess) | Initializes a new instance of the PsrTransactionResultSuccess class |

#### Properties

| Name | Description |
| --- | --- |
| [__type](#group-psrapi-synchronization-psrtransactionresultsuccess) |  |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### Fields

| Name | Description |
| --- | --- |
| [DateTimeUtc](#group-psrapi-synchronization-psrtransactionresult) | Gibt an, wann die Transaktion durchgeführt worden ist.<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |
| [ExecutedSyncOperation](#group-psrapi-synchronization-psrtransactionresult) | Die Operation die vom Server ausgeführt wurde<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |
| [SyncOperation](#group-psrapi-synchronization-psrtransactionresult) | Die Operation, die vom Client ausgeführt werden sollte<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |

#### See Also

###### Reference

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResultSuccess Constructor

Initializes a new instance of the [PsrTransactionResultSuccess](#group-psrapi-synchronization-psrtransactionresultsuccess) class

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public PsrTransactionResultSuccess()
```

#### See Also

###### Reference

[PsrTransactionResultSuccess Class](#group-psrapi-synchronization-psrtransactionresultsuccess)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResultSuccess Properties

The [PsrTransactionResultSuccess](#group-psrapi-synchronization-psrtransactionresultsuccess) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [__type](#group-psrapi-synchronization-psrtransactionresultsuccess) |  |

#### See Also

###### Reference

[PsrTransactionResultSuccess Class](#group-psrapi-synchronization-psrtransactionresultsuccess)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResultSuccess.__type Property

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public string __type { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[PsrTransactionResultSuccess Class](#group-psrapi-synchronization-psrtransactionresultsuccess)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResultSuccess Methods

The [PsrTransactionResultSuccess](#group-psrapi-synchronization-psrtransactionresultsuccess) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrTransactionResultSuccess Class](#group-psrapi-synchronization-psrtransactionresultsuccess)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResultSuccess Fields

The [PsrTransactionResultSuccess](#group-psrapi-synchronization-psrtransactionresultsuccess) type exposes the following members.

#### Fields

| Name | Description |
| --- | --- |
| [DateTimeUtc](#group-psrapi-synchronization-psrtransactionresult) | Gibt an, wann die Transaktion durchgeführt worden ist.<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |
| [ExecutedSyncOperation](#group-psrapi-synchronization-psrtransactionresult) | Die Operation die vom Server ausgeführt wurde<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |
| [SyncOperation](#group-psrapi-synchronization-psrtransactionresult) | Die Operation, die vom Client ausgeführt werden sollte<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |

#### See Also

###### Reference

[PsrTransactionResultSuccess Class](#group-psrapi-synchronization-psrtransactionresultsuccess)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)


<a id="group-psrapi-synchronization-psrtransactionresultsuccessrequireresync"></a>
## PsrTransactionResultSuccessRequireResync

### PsrTransactionResultSuccessRequireResync Class

#### Inheritance Hierarchy

SystemObject
[PsrApi.SynchronizationPsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult)
[PsrApi.SynchronizationPsrTransactionResultSuccess](#group-psrapi-synchronization-psrtransactionresultsuccess)
PsrApi.SynchronizationPsrTransactionResultSuccessRequireResync

#### Syntax

C#

```csharp
public class PsrTransactionResultSuccessRequireResync : PsrTransactionResultSuccess
```

#### Constructors

| Name | Description |
| --- | --- |
| [PsrTransactionResultSuccessRequireResync](#group-psrapi-synchronization-psrtransactionresultsuccessrequireresync) | Initializes a new instance of the PsrTransactionResultSuccessRequireResync class |

#### Properties

| Name | Description |
| --- | --- |
| [__type](#group-psrapi-synchronization-psrtransactionresultsuccessrequireresync) |  |

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### Fields

| Name | Description |
| --- | --- |
| [DateTimeUtc](#group-psrapi-synchronization-psrtransactionresult) | Gibt an, wann die Transaktion durchgeführt worden ist.<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |
| [ExecutedSyncOperation](#group-psrapi-synchronization-psrtransactionresult) | Die Operation die vom Server ausgeführt wurde<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |
| [SyncOperation](#group-psrapi-synchronization-psrtransactionresult) | Die Operation, die vom Client ausgeführt werden sollte<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |

#### See Also

###### Reference

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResultSuccessRequireResync Constructor

Initializes a new instance of the [PsrTransactionResultSuccessRequireResync](#group-psrapi-synchronization-psrtransactionresultsuccessrequireresync) class

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public PsrTransactionResultSuccessRequireResync()
```

#### See Also

###### Reference

[PsrTransactionResultSuccessRequireResync Class](#group-psrapi-synchronization-psrtransactionresultsuccessrequireresync)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResultSuccessRequireResync Properties

The [PsrTransactionResultSuccessRequireResync](#group-psrapi-synchronization-psrtransactionresultsuccessrequireresync) type exposes the following members.

#### Properties

| Name | Description |
| --- | --- |
| [__type](#group-psrapi-synchronization-psrtransactionresultsuccessrequireresync) |  |

#### See Also

###### Reference

[PsrTransactionResultSuccessRequireResync Class](#group-psrapi-synchronization-psrtransactionresultsuccessrequireresync)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResultSuccessRequireResync.__type Property

Namespace:
[PsrApi.Synchronization](#group-psrapi-synchronization)

#### Syntax

C#

```csharp
public string __type { get; set; }
```

###### Property Value

Type: String

#### See Also

###### Reference

[PsrTransactionResultSuccessRequireResync Class](#group-psrapi-synchronization-psrtransactionresultsuccessrequireresync)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResultSuccessRequireResync Methods

The [PsrTransactionResultSuccessRequireResync](#group-psrapi-synchronization-psrtransactionresultsuccessrequireresync) type exposes the following members.

#### Methods

| Name | Description |
| --- | --- |
| Equals | Determines whether the specified object is equal to the current object.<br><br>(Inherited from Object.) |
| GetHashCode | Serves as the default hash function.<br><br>(Inherited from Object.) |
| GetType | Gets the Type of the current instance.<br><br>(Inherited from Object.) |
| ToString | Returns a string that represents the current object.<br><br>(Inherited from Object.) |

#### See Also

###### Reference

[PsrTransactionResultSuccessRequireResync Class](#group-psrapi-synchronization-psrtransactionresultsuccessrequireresync)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)

### PsrTransactionResultSuccessRequireResync Fields

The [PsrTransactionResultSuccessRequireResync](#group-psrapi-synchronization-psrtransactionresultsuccessrequireresync) type exposes the following members.

#### Fields

| Name | Description |
| --- | --- |
| [DateTimeUtc](#group-psrapi-synchronization-psrtransactionresult) | Gibt an, wann die Transaktion durchgeführt worden ist.<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |
| [ExecutedSyncOperation](#group-psrapi-synchronization-psrtransactionresult) | Die Operation die vom Server ausgeführt wurde<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |
| [SyncOperation](#group-psrapi-synchronization-psrtransactionresult) | Die Operation, die vom Client ausgeführt werden sollte<br><br>(Inherited from [PsrTransactionResult](#group-psrapi-synchronization-psrtransactionresult).) |

#### See Also

###### Reference

[PsrTransactionResultSuccessRequireResync Class](#group-psrapi-synchronization-psrtransactionresultsuccessrequireresync)

[PsrApi.Synchronization Namespace](#group-psrapi-synchronization)
