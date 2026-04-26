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
import { serviceStatus } from "../dashboard-data"

export function ServiceStatusTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>服务状态</CardTitle>
        <CardDescription>核心服务的健康状态。</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>服务</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>指标</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {serviceStatus.map((item) => (
              <TableRow key={item[0]}>
                <TableCell>{item[0]}</TableCell>
                <TableCell>{item[1]}</TableCell>
                <TableCell>{item[2]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
