import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui-components/stable/card"
import {
  CategoryBarChart,
  DonutChart,
  TrendLineChart,
} from "@workspace/ui-components/stable/chart"
import { channelStats, revenueTrend, userSegments } from "../dashboard-data"

export function DashboardCharts() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
      <Card>
        <CardHeader>
          <CardTitle>成交趋势</CardTitle>
          <CardDescription>最近 7 天成交额与订单量走势。</CardDescription>
        </CardHeader>
        <CardContent>
          <TrendLineChart
            data={revenueTrend}
            xKey="day"
            series={[
              { key: "revenue", label: "成交额" },
              { key: "orders", label: "订单量" },
            ]}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>用户结构</CardTitle>
          <CardDescription>会员活跃状态占比。</CardDescription>
        </CardHeader>
        <CardContent>
          <DonutChart data={userSegments} />
        </CardContent>
      </Card>
    </div>
  )
}

export function ChannelChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>渠道成交</CardTitle>
        <CardDescription>本周各渠道成交贡献。</CardDescription>
      </CardHeader>
      <CardContent>
        <CategoryBarChart
          data={channelStats}
          xKey="channel"
          valueKey="value"
          label="成交占比"
        />
      </CardContent>
    </Card>
  )
}
