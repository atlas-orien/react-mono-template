import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui-components/stable/card"
import { Progress } from "@workspace/ui-components/stable/progress"
import { riskItems } from "../dashboard-data"

export function RiskMonitor() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>风险监控</CardTitle>
        <CardDescription>后台系统常见待办和风险指标。</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {riskItems.map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{item.label}</span>
                <span>{item.value}%</span>
              </div>
              <Progress value={item.value} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
