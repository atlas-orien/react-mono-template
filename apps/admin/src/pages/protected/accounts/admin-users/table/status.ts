import type { AdminUserStatus as ApiAdminUserStatus } from "@/api"
import type { AdminUserStatusLabel } from "../types"

export function mapApiStatusToLabel(
  status: ApiAdminUserStatus
): AdminUserStatusLabel {
  return status === "enabled" ? "启用" : "停用"
}

export function mapStatusLabelToApiStatus(
  status: AdminUserStatusLabel
): ApiAdminUserStatus {
  return status === "启用" ? "enabled" : "disabled"
}
