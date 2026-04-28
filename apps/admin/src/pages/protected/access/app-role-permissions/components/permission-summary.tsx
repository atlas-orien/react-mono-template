import { useTranslation } from "react-i18next"
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
  const { t } = useTranslation()

  return (
    <MetricCards
      layout="inline"
      items={[
        {
          icon: <FolderTree className="size-4" />,
          label: t("admin.access.appRolePermissions.summary.group"),
          value: summary.group,
        },
        {
          icon: <SquareMousePointer className="size-4" />,
          label: t("admin.access.appRolePermissions.summary.action"),
          value: summary.action,
        },
        {
          icon: <CheckCheck className="size-4" />,
          label: t("admin.access.appRolePermissions.summary.selected"),
          value: selectedCount,
        },
      ]}
    />
  )
}
