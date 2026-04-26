import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui-components/stable/card"
import { useTranslation } from "react-i18next"

export function DashboardHeading() {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("admin.dashboard.heading.title", "控制台")}</CardTitle>
        <CardDescription>
          {t(
            "admin.dashboard.heading.description",
            "今日关键经营指标、运营趋势和系统状态概览。"
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
