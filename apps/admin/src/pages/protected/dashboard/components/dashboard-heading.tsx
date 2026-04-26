import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui-components/stable/card"

export function DashboardHeading() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>控制台</CardTitle>
        <CardDescription>
          今日关键经营指标、运营趋势和系统状态概览。
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
