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
import type { RolePermissionTreeNode } from "@/api"
import { permissionKindLabelMap } from "../tree/logic"

export function SelectedPermissionsTable({
  selectedResources,
}: {
  selectedResources: readonly RolePermissionTreeNode[]
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>本次勾选明细</CardTitle>
        <CardDescription>
          当前角色已选择的权限资源，方便保存前快速核对。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table ariaLabel="selected permissions">
          <TableHeader>
            <TableRow>
              <TableHead>名称</TableHead>
              <TableHead>类型</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedResources.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell>
                  <span className="font-medium">{resource.name}</span>
                </TableCell>
                <TableCell>{permissionKindLabelMap[resource.kind]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
