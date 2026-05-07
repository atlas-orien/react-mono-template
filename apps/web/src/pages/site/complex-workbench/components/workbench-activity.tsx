import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui-components"
import type { WorkbenchActivityItem } from "../types"

export interface WorkbenchActivityProps {
  activity: WorkbenchActivityItem[]
}

export function WorkbenchActivity({ activity }: WorkbenchActivityProps) {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("complexWorkbench.activity.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-3">
          {activity.map((item) => (
            <li
              key={item.id}
              className="grid gap-1 rounded-md border border-(--app-border) bg-(--app-muted-bg) p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-(--app-text)">
                  {t(item.messageKey)}
                </span>
                <time className="text-xs text-(--app-muted-text)">
                  {item.createdAt}
                </time>
              </div>
              <span className="text-sm text-(--app-muted-text)">
                {t(item.taskTitleKey)}
              </span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}
