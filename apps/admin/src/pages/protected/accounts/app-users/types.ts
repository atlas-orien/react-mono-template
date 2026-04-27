import type { AppUserStatus as ApiAppUserStatus } from "@/api"
import type {
  DataTableAuditColumnKey,
  DateRangeValue,
} from "@workspace/app-components"

export type AppUserStatusLabel = "启用" | "停用"
export type AppUserTimeField = DataTableAuditColumnKey

export interface AppUserRow {
  user_id: string
  display_id: string
  display_name: string
  remark: string | null
  status: ApiAppUserStatus
  createdAt: string | null
  updatedAt: string | null
  roles: string[]
}

export interface AppUserTableQuery {
  keyword: string
  status: "" | AppUserStatusLabel
  timeField: AppUserTimeField
  timeRange: DateRangeValue | undefined
}
