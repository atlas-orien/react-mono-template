import { Badge } from "@workspace/ui-components/stable/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui-components/stable/card"
import { Progress } from "@workspace/ui-components/stable/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui-components/stable/table"

const metricCards = [
  { label: "GMV", value: "¥ 2.84M", delta: "+12.4%", marker: "GM" },
  { label: "活跃会员", value: "18,420", delta: "+6.8%", marker: "MB" },
  { label: "待处理告警", value: "07", delta: "-2", marker: "AL" },
  { label: "在途订单", value: "126", delta: "+14", marker: "OD" },
]

const orders = [
  ["SO-20260413-01", "华东大区", "待复核", "¥ 128,000"],
  ["SO-20260413-02", "直营商城", "已发货", "¥ 52,600"],
  ["SO-20260413-03", "渠道伙伴", "待付款", "¥ 310,500"],
]

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <Badge variant="outline">Overview</Badge>
          <CardTitle>Admin Dashboard</CardTitle>
          <CardDescription>
            页面结构参考你给的 admin demo，但实现已经换成当前仓库自己的组件体系。
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((card) => (
          <Card key={card.label}>
            <CardContent>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-(--app-muted-text)">{card.label}</p>
                  <p className="mt-2 text-3xl font-semibold">{card.value}</p>
                  <p className="mt-2 text-sm text-(--success)">{card.delta}</p>
                </div>
                <span className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-xl bg-(--app-active-bg) text-sm font-semibold text-(--app-muted-text)">
                  {card.marker}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <Card>
          <CardHeader>
            <CardTitle>最新订单流</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>单号</TableHead>
                  <TableHead>来源</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>金额</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order[0]}>
                    <TableCell>{order[0]}</TableCell>
                    <TableCell>{order[1]}</TableCell>
                    <TableCell>{order[2]}</TableCell>
                    <TableCell>{order[3]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>风险监控</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {[
                ["退款工单积压", 62],
                ["权限变更待审", 38],
                ["库存同步延迟", 14],
              ].map(([label, value]) => (
                <div key={String(label)} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{label}</span>
                    <span>{value}%</span>
                  </div>
                  <Progress value={Number(value)} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
