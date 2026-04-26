# Build And Script Rules

## Rule

For build, typecheck, lint, test, dev, preview, format, and clean operations in this repository:

- Always use the exact script defined in the nearest relevant `package.json`.
- At repo root, prefer root scripts such as `pnpm build`, `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm rules`, `pnpm dev`, and `pnpm format`.
- For app or package scoped work, prefer `pnpm -C <dir> <script>` using the script defined in that package.
- Do not run ad hoc compile or build commands when a package script already exists.
- The root `package.json` is the source of truth for workspace-wide verification scripts.

## Required Verification After Code Changes

After modifying source code, package metadata, protocol files that affect AI/code behavior, build config, tests, or rules, run verification before finishing.

Minimum required gate:

```bash
rtk pnpm rules
```

`pnpm rules` is mandatory after code changes because it enforces repository architecture and AI-facing boundaries. Do not replace it with ad hoc `vitest`, `tsc`, or package-only checks unless the user explicitly limits the scope and accepts the narrower verification.

Also run the nearest relevant package scripts based on the files changed:

- TypeScript / React / package API changes: `rtk pnpm typecheck` or `rtk pnpm -C <dir> typecheck`
- UI / Tailwind / TSX changes: `rtk pnpm lint` or `rtk pnpm -C <dir> lint`
- Behavior or testable logic changes: `rtk pnpm test` or `rtk pnpm -C <dir> test`
- Build or app runtime changes: `rtk pnpm build` or `rtk pnpm -C <dir> build`

If a required script fails because of a pre-existing unrelated issue, report the exact failing file and command, then run the next closest non-ad-hoc script when available. Do not silently substitute raw commands for package scripts.

## Forbidden Without Explicit User Request

Do not run these commands directly unless the user explicitly asks for that exact command:

```bash
tsc
pnpm exec tsc
npx tsc
vite build
vitest
eslint
```

Use the corresponding `package.json` script instead.

If a package does not expose a needed script, prefer the root script. Only use a raw command for diagnosis after confirming no package script exists and after explaining why.

## TypeScript Safety

- Never run a root-level TypeScript emit command.
- Never use `tsc` in a way that can emit `.js` into `src/`.
- If diagnosing build behavior, inspect the relevant `package.json` script first, then use that script to reproduce.

## Tailwind Class Safety

- Tailwind canonical class checks are part of the package `lint` scripts via `eslint-plugin-better-tailwindcss`.
- After editing React/TSX UI, className strings, `cn(...)`, `cva(...)`, or Tailwind utility classes, run the nearest relevant lint script so canonical class warnings are visible in the terminal.
- For admin UI work, use:

```bash
rtk pnpm -C apps/admin run lint
```

- For broader workspace verification, use:

```bash
rtk pnpm lint
```

- Fix reported canonical class issues such as `rounded-[var(--ui-radius-lg)]` -> `rounded-(--ui-radius-lg)` before considering the task complete.
- Do not rely on VS Code Tailwind IntelliSense alone; command-line lint must be clean when the task touches Tailwind classes.

## Examples

```bash
rtk pnpm build
rtk pnpm -C apps/admin build
rtk pnpm -C apps/web test
rtk pnpm typecheck
rtk pnpm rules
```

## Verification

Before running a build-related command, verify the script source first:

```bash
rtk cat package.json
rtk cat apps/admin/package.json
```
