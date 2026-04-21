# Enums and Constants

This handbook groups published enums and top-level constants referenced throughout the API.

- Browser runtime also exposes enum values via `window.PsrApiEnums`.
- Included official SDK pages: `39` across `39` grouped sections.

## Contents

- [PsrApi.Data.Enums](#group-psrapi-data-enums)
- [PsrActiveDirectoryAuthenticationTypes](#group-psrapi-data-enums-psractivedirectoryauthenticationtypes)
- [PsrApiKeyAccessRights](#group-psrapi-data-enums-psrapikeyaccessrights)
- [PsrApiKeyAccessScopes](#group-psrapi-data-enums-psrapikeyaccessscopes)
- [PsrApplicationType](#group-psrapi-data-enums-psrapplicationtype)
- [PsrBatchRightItemType](#group-psrapi-data-enums-psrbatchrightitemtype)
- [PsrContainerInfoFieldType](#group-psrapi-data-enums-psrcontainerinfofieldtype)
- [PsrContainerItemDescHighlight](#group-psrapi-data-enums-psrcontaineritemdeschighlight)
- [PsrContainerItemType](#group-psrapi-data-enums-psrcontaineritemtype)
- [PsrContainerType](#group-psrapi-data-enums-psrcontainertype)
- [PsrCredentialCheckResult](#group-psrapi-data-enums-psrcredentialcheckresult)
- [PsrDataStates](#group-psrapi-data-enums-psrdatastates)
- [PsrEntityClass](#group-psrapi-data-enums-psrentityclass)
- [PsrEntityObjectType](#group-psrapi-data-enums-psrentityobjecttype)
- [PsrEscalationLevels](#group-psrapi-data-enums-psrescalationlevels)
- [PsrEventSources](#group-psrapi-data-enums-psreventsources)
- [PsrExternalLinkType](#group-psrapi-data-enums-psrexternallinktype)
- [PsrForwardingTypes](#group-psrapi-data-enums-psrforwardingtypes)
- [PsrIncludeData](#group-psrapi-data-enums-psrincludedata)
- [PsrLicenseModule](#group-psrapi-data-enums-psrlicensemodule)
- [PsrLogbookEvent](#group-psrapi-data-enums-psrlogbookevent)
- [PsrMultiFactorAuthType](#group-psrapi-data-enums-psrmultifactorauthtype)
- [PsrMultiFactorField](#group-psrapi-data-enums-psrmultifactorfield)
- [PsrNotifyTriggerReasons](#group-psrapi-data-enums-psrnotifytriggerreasons)
- [PsrNotifyTriggerType](#group-psrapi-data-enums-psrnotifytriggertype)
- [PsrOptionGroup](#group-psrapi-data-enums-psroptiongroup)
- [PsrPolicyCategory](#group-psrapi-data-enums-psrpolicycategory)
- [PsrProgressCode](#group-psrapi-data-enums-psrprogresscode)
- [PsrRealtimeEventType](#group-psrapi-data-enums-psrrealtimeeventtype)
- [PsrRights](#group-psrapi-data-enums-psrrights)
- [PsrSealOpenType](#group-psrapi-data-enums-psrsealopentype)
- [PsrSealState](#group-psrapi-data-enums-psrsealstate)
- [PsrServerKeyType](#group-psrapi-data-enums-psrserverkeytype)
- [PsrServerMessageType](#group-psrapi-data-enums-psrservermessagetype)
- [PsrServerStatus](#group-psrapi-data-enums-psrserverstatus)
- [PsrSyncOperation](#group-psrapi-data-enums-psrsyncoperation)
- [PsrTraceCategories](#group-psrapi-data-enums-psrtracecategories)
- [PsrTriggerConfigResult](#group-psrapi-data-enums-psrtriggerconfigresult)
- [PsrApiExceptionCode](#group-psrapi-psrapiexceptioncode)

<a id="group-psrapi-data-enums"></a>
## PsrApi.Data.Enums

### PsrApi.Data.Enums Namespace

#### Enumerations

| Enumeration | Description |
| --- | --- |
| [PsrActiveDirectoryAuthenticationTypes](#group-psrapi-data-enums-psractivedirectoryauthenticationtypes) | Describes our set of Authentication Types for the Active Directory Connection. |
| [PsrApiKeyAccessRights](#group-psrapi-data-enums-psrapikeyaccessrights) | Access modifiers for the API Key |
| [PsrApiKeyAccessScopes](#group-psrapi-data-enums-psrapikeyaccessscopes) | Scope modifiers for the API Key |
| [PsrApplicationType](#group-psrapi-data-enums-psrapplicationtype) | Type of an application |
| [PsrBatchRightItemType](#group-psrapi-data-enums-psrbatchrightitemtype) | Type for data right batch processing |
| [PsrContainerInfoFieldType](#group-psrapi-data-enums-psrcontainerinfofieldtype) | Typ für das ContainerInfoField<br>Type of a [PsrContainerInfoField](data-models.md#group-psrapi-data-psrcontainerinfofield) |
| [PsrContainerItemDescHighlight](#group-psrapi-data-enums-psrcontaineritemdeschighlight) | Highlighting of the item description of a [PsrContainerItem](data-models.md#group-psrapi-data-psrcontaineritem) |
| [PsrContainerItemType](#group-psrapi-data-enums-psrcontaineritemtype) | Type of a [PsrContainerItem](data-models.md#group-psrapi-data-psrcontaineritem) |
| [PsrContainerType](#group-psrapi-data-enums-psrcontainertype) | Type of a [PsrContainer](data-models.md#group-psrapi-data-psrcontainer) |
| [PsrCredentialCheckResult](#group-psrapi-data-enums-psrcredentialcheckresult) | Result state of a credential check. |
| [PsrDataStates](#group-psrapi-data-enums-psrdatastates) | State of a [PsrData](data-models.md#group-psrapi-data-psrdata) object |
| [PsrEntityClass](#group-psrapi-data-enums-psrentityclass) | Die Klasse einer Tabelle in der Datenbank |
| [PsrEntityObjectType](#group-psrapi-data-enums-psrentityobjecttype) | Type of a [PsrData](data-models.md#group-psrapi-data-psrdata) |
| [PsrEscalationLevels](#group-psrapi-data-enums-psrescalationlevels) | The escalation level of a log message. |
| [PsrEventSources](#group-psrapi-data-enums-psreventsources) | Source that can trigger an event |
| [PsrExternalLinkType](#group-psrapi-data-enums-psrexternallinktype) | Types of supported external link types |
| [PsrForwardingTypes](#group-psrapi-data-enums-psrforwardingtypes) | Type of a forwarding. |
| [PsrIncludeData](#group-psrapi-data-enums-psrincludedata) | Includable data |
| [PsrLicenseModule](#group-psrapi-data-enums-psrlicensemodule) | License modules |
| [PsrLogbookEvent](#group-psrapi-data-enums-psrlogbookevent) | Type of [PsrLogbook](data-models.md#group-psrapi-data-psrlogbook) |
| [PsrMultiFactorAuthType](#group-psrapi-data-enums-psrmultifactorauthtype) | Available multi-factor authentication types. |
| [PsrMultiFactorField](#group-psrapi-data-enums-psrmultifactorfield) | Felder, die vom Clienten gefüllt werden sollen |
| [PsrNotifyTriggerReasons](#group-psrapi-data-enums-psrnotifytriggerreasons) | Notification trigger types |
| [PsrNotifyTriggerType](#group-psrapi-data-enums-psrnotifytriggertype) | Trigger types |
| [PsrOptionGroup](#group-psrapi-data-enums-psroptiongroup) | Option groups |
| [PsrPolicyCategory](#group-psrapi-data-enums-psrpolicycategory) | Policy category |
| [PsrProgressCode](#group-psrapi-data-enums-psrprogresscode) | Code that describes the current progress of<br>server side process. |
| [PsrRealtimeEventType](#group-psrapi-data-enums-psrrealtimeeventtype) | Type of a realtime event. |
| [PsrRights](#group-psrapi-data-enums-psrrights) | Data rights |
| [PsrSealOpenType](#group-psrapi-data-enums-psrsealopentype) | Der Typ der Ansicht eines Siegels welches geöffnet werden soll.<br>Je nach Siegellauf gibt es verschiedene Ansichten die für den Benutzer interessant sein könnten.<br>Muss der aktuelle Benutzer z.B. ein Siegel freigeben, ist der Freigabedialog interessant für ihn.<br>Kann er anfordern, dann ist es der Freigabe anfordern Dialog usw.<br><br>Type of the view that should be opened for a seal.<br>Example: [OpenRequestReaction](#group-psrapi-data-enums-psrsealopentype) if the user has to react to a seal request<br>[OpenRequestPermission](#group-psrapi-data-enums-psrsealopentype) if the user can request release |
| [PsrSealState](#group-psrapi-data-enums-psrsealstate) | State of a [PsrSeal](data-models.md#group-psrapi-data-psrseal) |
| [PsrServerKeyType](#group-psrapi-data-enums-psrserverkeytype) | Type of [PsrServerKey](data-models.md#group-psrapi-data-psrserverkey) |
| [PsrServerMessageType](#group-psrapi-data-enums-psrservermessagetype) | Type of server message. |
| [PsrServerStatus](#group-psrapi-data-enums-psrserverstatus) | Status of the server |
| [PsrSyncOperation](#group-psrapi-data-enums-psrsyncoperation) | Syncoperation, which should be executed on the server |
| [PsrTraceCategories](#group-psrapi-data-enums-psrtracecategories) | Log categories. |
| [PsrTriggerConfigResult](#group-psrapi-data-enums-psrtriggerconfigresult) | Result of which trigger configurations exist for an object. |


<a id="group-psrapi-data-enums-psractivedirectoryauthenticationtypes"></a>
## PsrActiveDirectoryAuthenticationTypes

### PsrActiveDirectoryAuthenticationTypes Enumeration

Describes our set of Authentication Types for the Active Directory Connection.

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
[FlagsAttribute]
public enum PsrActiveDirectoryAuthenticationTypes
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrapikeyaccessrights"></a>
## PsrApiKeyAccessRights

### PsrApiKeyAccessRights Enumeration

Access modifiers for the API Key

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
[FlagsAttribute]
public enum PsrApiKeyAccessRights
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrapikeyaccessscopes"></a>
## PsrApiKeyAccessScopes

### PsrApiKeyAccessScopes Enumeration

Scope modifiers for the API Key

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
[FlagsAttribute]
public enum PsrApiKeyAccessScopes
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrapplicationtype"></a>
## PsrApplicationType

### PsrApplicationType Enumeration

Type of an application

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrApplicationType
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrbatchrightitemtype"></a>
## PsrBatchRightItemType

### PsrBatchRightItemType Enumeration

Type for data right batch processing

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrBatchRightItemType
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrcontainerinfofieldtype"></a>
## PsrContainerInfoFieldType

### PsrContainerInfoFieldType Enumeration

Typ für das ContainerInfoField
Type of a [PsrContainerInfoField](data-models.md#group-psrapi-data-psrcontainerinfofield)

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrContainerInfoFieldType
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrcontaineritemdeschighlight"></a>
## PsrContainerItemDescHighlight

### PsrContainerItemDescHighlight Enumeration

Highlighting of the item description of a [PsrContainerItem](data-models.md#group-psrapi-data-psrcontaineritem)

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrContainerItemDescHighlight
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrcontaineritemtype"></a>
## PsrContainerItemType

### PsrContainerItemType Enumeration

Type of a [PsrContainerItem](data-models.md#group-psrapi-data-psrcontaineritem)

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrContainerItemType
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrcontainertype"></a>
## PsrContainerType

### PsrContainerType Enumeration

Type of a [PsrContainer](data-models.md#group-psrapi-data-psrcontainer)

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrContainerType
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrcredentialcheckresult"></a>
## PsrCredentialCheckResult

### PsrCredentialCheckResult Enumeration

Result state of a credential check.

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrCredentialCheckResult
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrdatastates"></a>
## PsrDataStates

### PsrDataStates Enumeration

State of a [PsrData](data-models.md#group-psrapi-data-psrdata) object

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
[FlagsAttribute]
public enum PsrDataStates
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrentityclass"></a>
## PsrEntityClass

### PsrEntityClass Enumeration

Die Klasse einer Tabelle in der Datenbank

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrEntityClass
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrentityobjecttype"></a>
## PsrEntityObjectType

### PsrEntityObjectType Enumeration

Type of a [PsrData](data-models.md#group-psrapi-data-psrdata)

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrEntityObjectType
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrescalationlevels"></a>
## PsrEscalationLevels

### PsrEscalationLevels Enumeration

The escalation level of a log message.

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrEscalationLevels
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psreventsources"></a>
## PsrEventSources

### PsrEventSources Enumeration

Source that can trigger an event

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrEventSources
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrexternallinktype"></a>
## PsrExternalLinkType

### PsrExternalLinkType Enumeration

Types of supported external link types

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrExternalLinkType
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrforwardingtypes"></a>
## PsrForwardingTypes

### PsrForwardingTypes Enumeration

Type of a forwarding.

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrForwardingTypes
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrincludedata"></a>
## PsrIncludeData

### PsrIncludeData Enumeration

Includable data

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrIncludeData
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrlicensemodule"></a>
## PsrLicenseModule

### PsrLicenseModule Enumeration

License modules

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrLicenseModule
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrlogbookevent"></a>
## PsrLogbookEvent

### PsrLogbookEvent Enumeration

Type of [PsrLogbook](data-models.md#group-psrapi-data-psrlogbook)

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrLogbookEvent
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrmultifactorauthtype"></a>
## PsrMultiFactorAuthType

### PsrMultiFactorAuthType Enumeration

Available multi-factor authentication types.

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrMultiFactorAuthType
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrmultifactorfield"></a>
## PsrMultiFactorField

### PsrMultiFactorField Enumeration

Felder, die vom Clienten gefüllt werden sollen

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
[FlagsAttribute]
public enum PsrMultiFactorField
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrnotifytriggerreasons"></a>
## PsrNotifyTriggerReasons

### PsrNotifyTriggerReasons Enumeration

Notification trigger types

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
[FlagsAttribute]
public enum PsrNotifyTriggerReasons
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrnotifytriggertype"></a>
## PsrNotifyTriggerType

### PsrNotifyTriggerType Enumeration

Trigger types

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrNotifyTriggerType
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psroptiongroup"></a>
## PsrOptionGroup

### PsrOptionGroup Enumeration

Option groups

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrOptionGroup
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrpolicycategory"></a>
## PsrPolicyCategory

### PsrPolicyCategory Enumeration

Policy category

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrPolicyCategory
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrprogresscode"></a>
## PsrProgressCode

### PsrProgressCode Enumeration

Code that describes the current progress of
server side process.

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrProgressCode
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrrealtimeeventtype"></a>
## PsrRealtimeEventType

### PsrRealtimeEventType Enumeration

Type of a realtime event.

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrRealtimeEventType
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrrights"></a>
## PsrRights

### PsrRights Enumeration

Data rights

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
[FlagsAttribute]
public enum PsrRights
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrsealopentype"></a>
## PsrSealOpenType

### PsrSealOpenType Enumeration

Der Typ der Ansicht eines Siegels welches geöffnet werden soll.
Je nach Siegellauf gibt es verschiedene Ansichten die für den Benutzer interessant sein könnten.
Muss der aktuelle Benutzer z.B. ein Siegel freigeben, ist der Freigabedialog interessant für ihn.
Kann er anfordern, dann ist es der Freigabe anfordern Dialog usw.

Type of the view that should be opened for a seal.
Example: OpenRequestReaction if the user has to react to a seal request
OpenRequestPermission if the user can request release

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrSealOpenType
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrsealstate"></a>
## PsrSealState

### PsrSealState Enumeration

State of a [PsrSeal](data-models.md#group-psrapi-data-psrseal)

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrSealState
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrserverkeytype"></a>
## PsrServerKeyType

### PsrServerKeyType Enumeration

Type of [PsrServerKey](data-models.md#group-psrapi-data-psrserverkey)

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrServerKeyType
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrservermessagetype"></a>
## PsrServerMessageType

### PsrServerMessageType Enumeration

Type of server message.

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrServerMessageType
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrserverstatus"></a>
## PsrServerStatus

### PsrServerStatus Enumeration

Status of the server

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrServerStatus
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrsyncoperation"></a>
## PsrSyncOperation

### PsrSyncOperation Enumeration

Syncoperation, which should be executed on the server

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrSyncOperation
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrtracecategories"></a>
## PsrTraceCategories

### PsrTraceCategories Enumeration

Log categories.

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
[FlagsAttribute]
public enum PsrTraceCategories
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-data-enums-psrtriggerconfigresult"></a>
## PsrTriggerConfigResult

### PsrTriggerConfigResult Enumeration

Result of which trigger configurations exist for an object.

Namespace:
[PsrApi.Data.Enums](#group-psrapi-data-enums)

#### Syntax

C#

```csharp
public enum PsrTriggerConfigResult
```

#### See Also

###### Reference

[PsrApi.Data.Enums Namespace](#group-psrapi-data-enums)


<a id="group-psrapi-psrapiexceptioncode"></a>
## PsrApiExceptionCode

### PsrApiExceptionCode Enumeration

Errors that happen in Netwrix Password Secure are marked with an exception code.

Namespace:
[PsrApi](browser-runtime.md#group-psrapi)

#### Syntax

C#

```csharp
public enum PsrApiExceptionCode
```

#### See Also

###### Reference

[PsrApi Namespace](browser-runtime.md#group-psrapi)
