import { CheckCheck, FolderTree, SquareMousePointer } from "lucide-react"
import { MetricCards } from "@workspace/app-components"
import type { PermissionSummaryType } from "../types"

export function PermissionSummary({
  selectedCount,
  summary,
}: {
  selectedCount: number
  summary: Record<PermissionSummaryType, number>
}) {
  return (
    <MetricCards
      layout="inline"
      items={[
        {
          icon: <FolderTree className="size-4" />,
          label: "分组",
          value: summary.group,
        },
        {
          icon: <SquareMousePointer className="size-4" />,
          label: "操作",
          value: summary.action,
        },
        {
          icon: <CheckCheck className="size-4" />,
          label: "已选",
          value: selectedCount,
        },
      ]}
    />
  )
}
