import type { RoleTableQuery } from "./types"

export const appRolesQueryKey = ["admin", "app-roles", "rows"] as const

export const roleInitialQuery: RoleTableQuery = {
  keyword: "",
  keywordField: "all",
}

export const rolePageSizeOptions = [10, 20, 50] as const
