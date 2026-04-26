import type { AppUserTableQuery } from "./types"

export const appUsersQueryKey = ["admin", "app-users", "rows"] as const

export const appUserInitialQuery: AppUserTableQuery = {
  keyword: "",
  keywordField: "all",
  status: "",
}

export const appUserPageSizeOptions = [10, 20, 50] as const
