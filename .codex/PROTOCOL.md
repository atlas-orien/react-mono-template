# Protocol Entry Rules

This repository is protocol-driven. Before making app-level changes, the agent
must load the matching protocol document and use it as the implementation
contract.

## Mandatory App Protocols

Read the relevant protocol before editing files:

- `apps/admin/**` -> read `apps/admin/PROTOCOL.md`
- `apps/web/**` -> read `apps/web/PROTOCOL.md`

If a task touches both apps, read both documents before making edits.

## What The Protocol Controls

The app protocol decides:

- where new files belong
- how pages are split
- how routes and shells are wired
- how API calls are aggregated
- how locale text is added
- which shared packages must be checked before writing local code
- which verification commands are required

Do not treat an app page as a blank-page implementation task. Follow the
protocol first, then inspect existing reference pages, then edit.

## Admin Gate

For `apps/admin`, the agent must especially follow:

- DataTable page structure and data mode rules
- navigation and permission centralization
- app API aggregation
- locale-only user-facing copy
- shared package reuse before local implementation

Reference protocol: `apps/admin/PROTOCOL.md`.

## Web Gate

For `apps/web`, the agent must especially follow:

- web route and auth layout rules
- business app assembly style
- shared package reuse before local implementation
- app API aggregation
- locale-only user-facing copy

Reference protocol: `apps/web/PROTOCOL.md`.

## If Protocol And Code Disagree

If existing code appears to violate the protocol, do not copy the violation as a
new pattern. Prefer moving the touched area toward the protocol. If that would
expand the task significantly, report the mismatch and make the smallest change
that does not add another violation.

