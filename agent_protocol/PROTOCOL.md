# Codex Protocol Entry

This file is the first AI-facing contract for this repository. It is intentionally short and operational.

The project goal is not to let AI freely write React. The goal is to let a smart non-programmer obtain commercial-quality code by forcing AI through a small set of framework protocols.

## Non-Negotiable Workflow

Before any answer that includes architecture advice, file placement, implementation strategy, or code edits, the agent must do this in order:

1. Identify the target layer.
2. Read the relevant files under `agent_protocol/protocols/**`.
3. Inspect existing exports and reference implementations before inventing code.
4. Choose the smallest legal existing component or app-kit protocol.
5. Only write local app code for app-private business assembly.
6. Run the nearest package scripts required by the touched protocols.

Skipping step 3 is the most common failure mode. Do not start from JSX. Start from the framework inventory.

## Layer Decision Gate

Use this decision order every time:

1. `packages/ui-core`
   Primitive behavior, accessibility wiring, low-level structure. Apps should almost never edit or consume this directly.

2. `packages/ui-components`
   Stable product components with restricted APIs. This is the default source for app-level UI controls.

3. `packages/app-kit`
   Shared app composition: DataTable, MetricCards, shells, navigation surfaces, route feedback, profile page, date/time pickers, file upload, copyable text.

4. `packages/services`, `packages/locales`, `packages/ui-theme`, `packages/mock`
   Shared non-page capabilities.

5. `apps/*`
   Final assembly only: routes, page composition, app-specific API aggregation, app-specific state, app-specific business flows.

If code could reasonably serve a second app or a second page family, do not hide it in `apps/*` without first evaluating a package-level home.

## Inventory Check Required

Before creating a component, layout, table, form control, toast, shell, page scaffold, picker, upload UI, or feedback state, inspect the existing inventory:

- `packages/ui-components/package.json#exports`
- `packages/ui-components/src/index.ts`
- `packages/ui-components/src/components/stable/*`
- `packages/app-kit/package.json#exports`
- `packages/app-kit/src/index.ts`
- `packages/app-kit/src/components/*`
- `packages/app-kit/src/pages/*`
- `showcases/guide` for legal usage examples

If an existing export fits at least 70 percent of the need, use it first. If it almost fits but lacks a reusable capability, improve the shared package instead of forking the pattern inside an app.

## App Code Rules

App code should look like assembly code:

- route wiring
- page directory modules
- API adapter calls
- query/data hooks
- business-specific table columns and actions
- business-specific dialog contents
- app shell wiring

App code should not become a component library:

- no second design system
- no generic UI primitives
- no copied internal implementations from `ui-core`, `ui-components`, or `app-kit`
- no local replacement for DataTable, MetricCards, TopBar, SidebarShell, ToastProvider, route loading/error states, or stable form controls

## When Existing Code Violates Protocol

Existing violations are not templates.

If a touched area violates the protocol, move it toward the protocol when the change is small. If fixing it would expand the task, state the mismatch and avoid adding a new violation.

## Protocol Reading Map

Always read the closest applicable files:

- App work: `agent_protocol/protocols/apps/index.md`, then `agent_protocol/protocols/apps/<app>.md`
- Page work: also read `agent_protocol/protocols/page-types/*.md` that matches the page type
- DataTable usage: `agent_protocol/protocols/components/data-table.md`
- Stable component work: `agent_protocol/protocols/packages/ui-components.md`
- App-kit work: `agent_protocol/protocols/packages/app-kit.md`
- Primitive work: `agent_protocol/protocols/packages/ui-core.md`
- Service/mock/theme work: the matching file under `agent_protocol/protocols/packages/`

## Required Explanation In Substantial Changes

For non-trivial changes, before editing files, state:

- target layer
- protocols read
- existing inventory checked
- why the chosen implementation belongs there

This should be short, but it must happen. It prevents closed-door invention.
