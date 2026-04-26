import { ShieldCheck, ShieldOff, SquareUserRound, Users } from "lucide-react"
import type { MetricCardsItem } from "@workspace/app-components"
import type { AdminUserRow } from "../types"

export function buildAdminUserMetricCards(
  rows: readonly AdminUserRow[]
): MetricCardsItem[] {
  return [
    {
      key: "all",
      label: "后台账号总数",
      value: `${rows.length}`,
      tail: "当前已注册为后台可登录账号的后台用户数量。",
      icon: <SquareUserRound className="size-4" />,
    },
    {
      key: "enabled",
      label: "启用账号",
      value: `${rows.filter((row) => row.status === "enabled").length}`,
      tail: "具备正常后台访问能力的账号。",
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
