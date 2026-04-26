import type { AppUserStatus as ApiAppUserStatus } from "@/api"
import type { AppUserStatusLabel } from "../types"

export function mapApiStatusToLabel(
  status: ApiAppUserStatus
): AppUserStatusLabel {
  return status === "enabled" ? "启用" : "停用"
}

export function mapStatusLabelToApiStatus(
  status: AppUserStatusLabel
): ApiAppUserStatus {
  return status === "启用" ? "enabled" : "disabled"
}
