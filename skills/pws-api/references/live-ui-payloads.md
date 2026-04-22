# Live UI Payloads

This file captures payload shapes observed from the Netwrix Password Secure web app against a live v26.3.100.34058 environment.

Use these shapes as the strongest browser-facing runtime reference when:
- the bundled docs are vague
- the current JS runtime package differs from the web app
- you need to model write operations exactly

## Password Container Create

The web app creates password containers with `POST /api/WebService/AddContainerV2`.

Important points:
- the UI does not call `AddContainer`
- encrypted item values are already materialized in `Items[].Value`
- tags are included inline as `container.DataTags`
- the container payload is broad and close to the hydrated runtime object shape

Representative shape:

```json
{
  "container": {
    "$type": "PsrDataLayer.Structure.MtoContainer, PsrDataLayer",
    "BaseContainerId": "<form-id>",
    "DataStates": 1,
    "DataTags": [
      {
        "DataId": "00000000-0000-0000-0000-000000000000",
        "TagId": "<tag-id>",
        "Tag": {
          "$type": "PsrDataLayer.Structure.MtoTag, PsrDataLayer",
          "Name": "<tag-name>",
          "Id": "<tag-id>"
        }
      }
    ],
    "IsDocumentLink": false,
    "Items": [
      {
        "Name": "Description",
        "BaseContainerItemId": "<base-item-id>",
        "ContainerItemType": 0,
        "Position": 0,
        "Value": "<description>"
      },
      {
        "Name": "Username",
        "BaseContainerItemId": "<base-item-id>",
        "ContainerItemType": 13,
        "Position": 1,
        "Value": "<username>"
      },
      {
        "Name": "Password",
        "BaseContainerItemId": "<base-item-id>",
        "ContainerItemType": 1,
        "Position": 2,
        "Quality": 33,
        "Value": "<encrypted-secret>"
      }
    ]
  }
}
```

## Tag Create

The web app creates tags with `POST /api/WebService/AddTag`.

Observed shape:

```json
{
  "tag": {
    "$type": "PsrDataLayer.Structure.MtoTag, PsrDataLayer",
    "Name": "<tag-name>"
  }
}
```

## Organisational Unit Create

The web app creates organisational units with `POST /api/WebService/AddOrganisationUnitGroup`.

Observed shape:

```json
{
  "group": {
    "GroupName": "<ou-name>"
  },
  "publicKey": "<public-key>",
  "encryptedGroupPrivateKey": "<encrypted-private-key>",
  "parentOrganisationUnitId": "<parent-ou-id>"
}
```

Important points:
- the browser flow treats an OU as an organisation unit group create
- the UI generates and submits both the public key and the encrypted private key

## User Create

The web app creates users with `POST /api/WebService/AddOrganisationUnitUser2`.

Observed shape:

```json
{
  "user": {
    "HasToChangePasswordOnNextLogin": true,
    "RestrictiveUser": false,
    "FirstName": "<first-name>",
    "LastName": "<last-name>",
    "UserName": "<username>"
  },
  "userPasswordHash": "<password-hash>",
  "userPasswordSalt": "<password-salt>",
  "publicKey": "<public-key>",
  "encryptedUserPrivateKey": "<encrypted-user-private-key>",
  "encryptedCurrentUserPrivateKey": "<encrypted-current-user-private-key>",
  "clientHashAlgorithm": 2,
  "parentOrganisationUnitId": "<parent-ou-id>"
}
```

Important points:
- the UI uses `AddOrganisationUnitUser2`, not the older `AddOrganisationUnitUser`
- the browser flow computes password hash and salt client-side
- the browser flow also generates and encrypts the user keypair client-side

## Logbook Read

The web app loads logbook entries with:
- `POST /api/WebService/GetLogbookCount`
- `POST /api/WebService/GetLogbookEntrys`

Both use a `ListFilter` payload with:
- `Page`
- `PageSize`
- `PageOrder`
- `FilterGroups`
- timestamp bounds

Representative top-level shape:

```json
{
  "filter": {
    "$type": "PsrDataLayer.FilterObjects.ListFilter, PsrDataLayer",
    "First": 1000,
    "Page": 0,
    "PageOrder": "TimeStampUtc",
    "PageOrderAsc": false,
    "PageSize": 15,
    "SaveFilter": false,
    "FilterGroups": [
      {
        "$type": "PsrDataLayer.FilterObjects.ListFilterGroupDataObject, PsrDataLayer",
        "DataObjectFilters": []
      },
      {
        "$type": "PsrDataLayer.FilterObjects.ListFilterGroupLogbookEvent, PsrDataLayer",
        "EventFilters": []
      }
    ]
  }
}
```

## Use This Reference Carefully

- These shapes are runtime-observed, not simplified teaching examples.
- For browser parity work, prefer these payloads over older wrapper assumptions.
- If the target environment exposes a different app version, re-capture before assuming exact field parity.
