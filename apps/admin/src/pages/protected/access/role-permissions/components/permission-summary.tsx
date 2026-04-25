import { ShieldCheck, SquareMousePointer } from "lucide-react"
import type { PermissionSummaryType } from "../types"

export function PermissionSummary({
  summary,
}: {
  summary: Record<PermissionSummaryType, number>
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {[
        {
          icon: <ShieldCheck className="size-4" />,
          label: "分组",
          value: summary.group,
        },
        {
          icon: <SquareMousePointer className="size-4" />,
          label: "操作",
          value: summary.action,
        },
      ].map((item) => (
        <div
          key={item.label}
          className="flex min-h-18 items-center justify-between rounded-[var(--ui-radius-md)] border border-(--app-border) px-4 py-3"
        >
          <div className="flex min-w-0 items-center gap-3">
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-(--app-active-bg)">
              {item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
          </div>
          <span className="text-xl font-semibold">{item.value}</span>
        </div>
      ))}
    </div>
  )
}
