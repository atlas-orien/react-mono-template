import type { DataTableAuditColumnKey } from "@workspace/app-components"
import type { AppUserTableQuery } from "./types"

export const appUserAuditColumns = ["createdAt"] as const satisfies readonly DataTableAuditColumnKey[]

export const appUserDefaultTimeField = appUserAuditColumns[0]

export const appUsersFirstPageQueryKey = [
  "admin",
  "app-users",
  "first-page",
] as const

export const appUserInitialQuery: AppUserTableQuery = {
  keyword: "",
  status: "",
  timeField: appUserDefaultTimeField,
  timeRange: undefined,
}

export const appUserPageSizeOptions = [10, 20, 50] as const
