import path from "node:path"
import { describe, expect, it } from "vitest"
import { findImportFindings, resolveProtectedPage, toLocations } from "./ast-helpers"

const adminUsersPageDir = resolveProtectedPage("accounts", "admin-users")
const adminUsersIndexFile = path.join(adminUsersPageDir, "index.tsx")
const adminUsersDataFile = path.join(adminUsersPageDir, "admin-users-data.tsx")

describe("admin shared query page import boundaries", () => {
  it("keeps page index away from table internals", () => {
    const findings = findImportFindings([adminUsersIndexFile], (node) => {
      const specifier = node.moduleSpecifier.getText().replace(/['"]/g, "")
      return specifier.startsWith("./table/") && specifier !== "./table"
    })

    expect(toLocations(findings)).toEqual([])
  })

  it("forces data layer to consume table logic directly instead of table entry", () => {
    const findings = findImportFindings([adminUsersDataFile], (node) => {
      const specifier = node.moduleSpecifier.getText().replace(/['"]/g, "")
      return specifier === "./table"
    })

    expect(toLocations(findings)).toEqual([])
  })

  it("keeps data layer from depending on page dialogs", () => {
    const findings = findImportFindings([adminUsersDataFile], (node) => {
      const specifier = node.moduleSpecifier.getText().replace(/['"]/g, "")
      return specifier.startsWith("./dialogs/")
    })

    expect(toLocations(findings)).toEqual([])
  })
})
