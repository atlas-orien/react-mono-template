import { ShieldCheck, ShieldOff, SquareUserRound, Users } from "lucide-react"
import type { DataTableFetchResult } from "@workspace/app-components"
import type { MetricCardsItem } from "@workspace/app-components"
import type { AppUserRow } from "../types"

export function buildAppUserMetricCards(
  pageData?: DataTableFetchResult<AppUserRow>
): MetricCardsItem[] {
  const rows = pageData?.items ?? []
  const total = pageData?.total ?? 0

  return [
    {
      key: "all",
      label: "App 用户总数",
      value: `${total}`,
      tail: "服务端返回的 App 用户总量。",
      icon: <SquareUserRound className="size-4" />,
    },
    {
      key: "enabled",
      label: "启用账号",
      value: `${rows.filter((row) => row.status === "enabled").length}`,
      tail: "具备正常 App 权限访问能力的账号。",
      icon: <ShieldCheck className="size-4" />,
      variant: "success",
    },
    {
      key: "disabled",
      label: "停用账号",
      value: `${rows.filter((row) => row.status === "disabled").length}`,
      tail: "已被禁用，需要人工恢复或复核。",
      icon: <ShieldOff className="size-4" />,
      variant: "danger",
    },
    {
      key: "multi-role",
      label: "多角色账号",
      value: `${rows.filter((row) => row.roles.length > 1).length}`,
      tail: "同时挂载多个角色的重点账号。",
      icon: <Users className="size-4" />,
      variant: "accent",
    },
  ]
}
