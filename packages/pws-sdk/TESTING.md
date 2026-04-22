# SDK Testing

Use read-only smoke scripts for routine validation and a dedicated disposable area for write tests.

## Read-Only Checks

From `packages/pws-sdk`:

```bash
bun run live:smoke
bun run live:password-auth-smoke
bun run live:otp-auth-smoke
bun run live:filter-smoke
```

These scripts only authenticate, read data, apply filters, and log results.

## Write-Safe Workflow

Do not use production objects for write validation. Use a dedicated disposable OU or a dedicated test database.

Recommended setup:

- one dedicated parent OU for SDK test objects
- one dedicated naming prefix such as `sdk-test-`
- one cleanup pass after every run
- one account with only the rights needed for the test area

Suggested environment variables for local write tests:

```bash
PWS_TEST_WRITE_SAFE=1
PWS_TEST_ORGANISATION_UNIT_ID=<disposable-ou-id>
PWS_TEST_TEMPLATE_GROUP_ID=<template-group-id>
PWS_TEST_TAG_PREFIX=sdk-test
PWS_TEST_USER_PREFIX=sdk-test
```

Recommended write validation sequence:

1. Create a unique tag under the test prefix.
2. Create a password container in the disposable OU using that tag.
3. Read the password back and verify name, username, URL, notes, and tags.
4. Update the password container and verify the changes.
5. Read password history and confirm an additional entry exists.
6. Create a local user in the disposable OU and confirm list/read behavior.
7. Create a child OU in the disposable OU and resolve it through the SDK.
8. Read logbook entries for the created objects.
9. Delete the password, user, and child OU.
10. Delete the tag after the tagged data is gone.

Safety rules:

- bail out immediately if `PWS_TEST_WRITE_SAFE` is not `1`
- never default a write test to the current user OU
- always create unique names with a timestamp suffix
- always perform cleanup in reverse order
- if tag deletion fails with `Tag in Use`, inspect deleted/bin objects before retrying

## Manual Review Targets

When a live write path changes, manually inspect:

- browser payload parity against the web UI
- password create/update behavior
- tag deletion after object cleanup
- user creation and password policy constraints
- logbook visibility of the created objects
