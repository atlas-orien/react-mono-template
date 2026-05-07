import { useTranslation } from "react-i18next"
import { Badge } from "@workspace/ui-components"

export interface WorkbenchHeaderProps {
  totalTasks: number
  selectedLaneTaskCount: number
}

export function WorkbenchHeader({
  totalTasks,
  selectedLaneTaskCount,
}: WorkbenchHeaderProps) {
  const { t } = useTranslation()

  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        <Badge variant="secondary">{t("complexWorkbench.header.badge")}</Badge>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-(--app-text)">
            {t("complexWorkbench.header.title")}
          </h1>
          <p className="max-w-2xl text-sm/6 text-(--app-muted-text)">
            {t("complexWorkbench.header.description")}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <SummaryCount
          label={t("complexWorkbench.header.total")}
          value={totalTasks}
        />
        <SummaryCount
          label={t("complexWorkbench.header.selected")}
          value={selectedLaneTaskCount}
        />
      </div>
    </header>
  )
}

interface SummaryCountProps {
  label: string
  value: number
}

function SummaryCount({ label, value }: SummaryCountProps) {
  return (
    <div className="rounded-lg border border-(--app-border) bg-(--app-surface) px-4 py-3">
      <div className="text-xs font-medium text-(--app-muted-text)">
        {label}
      </div>
      <div className="text-xl font-semibold text-(--app-text)">{value}</div>
    </div>
  )
}
