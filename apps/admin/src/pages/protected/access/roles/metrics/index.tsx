import { Fingerprint, KeyRound, ShieldCheck } from "lucide-react"
import type { MetricCardsItem } from "@workspace/app-components"
import type { RoleRow } from "../types"

export function buildRoleMetricCards(rows: readonly RoleRow[]): MetricCardsItem[] {
  return [
    {
      key: "all",
      label: "角色总数",
      value: `${rows.length}`,
      tail: "来自 roles 表的角色定义数量。",
      icon: <ShieldCheck className="size-4" />,
    },
    {
      key: "root",
      label: "Root 角色",
      value: `${rows.filter((row) => row.code === "root").length}`,
      tail: "系统内置的最高权限角色编码。",
      icon: <KeyRound className="size-4" />,
      variant: "accent",
    },
    {
      key: "codes",
      label: "角色编码",
      value: `${new Set(rows.map((row) => row.code)).size}`,
      tail: "roles.code 需要保持唯一。",
      icon: <Fingerprint className="size-4" />,
      variant: "success",
    },
  ]
}
