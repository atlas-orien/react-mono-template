import type { AppUserStatus as ApiAppUserStatus } from "@/api"

export type AppUserStatusLabel = "启用" | "停用"

export interface AppUserRow {
  user_id: string
  display_id: string
  display_name: string
  remark: string | null
  status: ApiAppUserStatus
  roles: string[]
}

export interface AppUserTableQuery {
  keyword: string
  keywordField: "all" | "display_name" | "display_id" | "remark" | "role"
  status: "" | AppUserStatusLabel
}
