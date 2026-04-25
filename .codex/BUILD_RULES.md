# Build And Script Rules

## Rule

For build, typecheck, lint, test, dev, preview, format, and clean operations in this repository:

- Always use the exact script defined in the nearest relevant `package.json`.
- At repo root, prefer root scripts such as `pnpm build`, `pnpm typecheck`, `pnpm lint`, `pnpm dev`, and `pnpm format`.
- For app or package scoped work, prefer `pnpm -C <dir> <script>` using the script defined in that package.
- Do not run ad hoc compile or build commands when a package script already exists.

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
```

## Verification

Before running a build-related command, verify the script source first:

```bash
rtk cat package.json
rtk cat apps/admin/package.json
```
