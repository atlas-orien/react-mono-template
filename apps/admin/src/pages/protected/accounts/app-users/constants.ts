import type { AppUserTableQuery } from "./types"

export const appUsersFirstPageQueryKey = [
  "admin",
  "app-users",
  "first-page",
] as const

export const appUserInitialQuery: AppUserTableQuery = {
  keyword: "",
  status: "",
  timeField: "created_at",
  timeRange: undefined,
}

export const appUserPageSizeOptions = [10, 20, 50] as const
