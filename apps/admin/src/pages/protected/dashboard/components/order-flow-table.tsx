import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui-components/stable/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui-components/stable/table"
import { orders } from "../dashboard-data"

export function OrderFlowTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>最新订单流</CardTitle>
        <CardDescription>高频业务动作的实时视图。</CardDescription>
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
  )
}
