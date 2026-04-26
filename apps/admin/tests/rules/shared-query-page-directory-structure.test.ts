import path from "node:path"
import { describe, expect, it } from "vitest"
import { fileExists, resolveProtectedPage } from "./ast-helpers"

const templatePages = [
  {
    name: "accounts/admin-users",
    dir: resolveProtectedPage("accounts", "admin-users"),
    requiredFiles: [
      "index.tsx",
      "types.ts",
      "constants.ts",
      "admin-users-data.tsx",
      "metrics/index.tsx",
      "table/index.ts",
      "table/logic.ts",
      "table/columns.tsx",
      "table/query-fields.ts",
      "table/status.ts",
      "table/sort.ts",
      "table/row-actions.ts",
      "dialogs/create-admin-user-dialog.tsx",
    ],
    forbiddenFiles: [
      "admin-users-config.tsx",
      "admin-users-table.ts",
      "admin-users-table-logic.ts",
      "admin-users-row-actions.ts",
      "admin-users-metrics.tsx",
      "use-admin-users-table.ts",
      "create-admin-user-dialog.tsx",
      "config",
    ],
  },
] as const

describe("admin shared query page directory structure", () => {
  it("keeps the approved template file set for admin template pages", () => {
    const missing = templatePages.flatMap((page) =>
      page.requiredFiles
        .filter((file) => !fileExists(path.join(page.dir, file)))
        .map((file) => `${page.name}/${file}`)
    )

    expect(missing).toEqual([])
  })

  it("does not keep legacy root-level template files around", () => {
    const forbidden = templatePages.flatMap((page) =>
      page.forbiddenFiles
        .filter((file) => fileExists(path.join(page.dir, file)))
        .map((file) => `${page.name}/${file}`)
    )

    expect(forbidden).toEqual([])
  })
})
