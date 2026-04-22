# Runtime Parity Notes

This file tracks known differences between the public web app behavior and the current `@kmuip/pws-api` runtime.

## Browser-Web-App Write Paths

Observed from the live web app:
- password container create uses `POST /api/WebService/AddContainerV2`
- user create uses `POST /api/WebService/AddOrganisationUnitUser2`
- organisational unit create uses `POST /api/WebService/AddOrganisationUnitGroup`

## Current Runtime Gaps

### Password Container Create

Current runtime path:
- `containerManager.addContainer(...)`
- forwards to `WebService/AddContainer`

Observed browser path:
- `WebService/AddContainerV2`

Practical impact:
- the runtime `addContainer()` path is not yet browser-parity complete for encrypted password container writes
- preserving `PlainTextValue` fixed one local serialization bug, but it did not make the `AddContainer` path match the browser flow
- the browser payload already contains encrypted item values and uses the V2 endpoint

Required parity work:
- implement `AddContainerV2` in the runtime service layer
- align the write payload to the browser-observed shape
- verify encrypted item and tag handling against the live web app

### Password Container Update

The current runtime still needs explicit browser-parity validation for encrypted password updates. The browser flow likely uses a write path closer to the create payload family than the current `UpdateContainer` assumptions.

Required parity work:
- capture a clean browser `UpdateContainer` or V2-equivalent write payload
- compare it to the runtime `updateContainer()` request shape
- adjust encrypted item serialization and right-key propagation if needed

## Client-Side Crypto Expectations

Observed browser create flows generate and submit client-derived values for:
- password hash and salt on user create
- keypairs and encrypted private keys on OU create
- keypairs and encrypted private keys on user create

The runtime should continue to treat these client-side crypto steps as required protocol behavior, not optional convenience work.

## Maintainer Rule

When the browser UI and the current runtime disagree on write operations:
- prefer the live browser payload shape
- document the gap here
- capture a reproducible HAR or payload sample before changing runtime behavior
