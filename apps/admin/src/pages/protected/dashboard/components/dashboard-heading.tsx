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
          该页面仅作为演示页面。请开发者根据实际业务重新设计。
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
