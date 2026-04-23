import { CopyableText } from "@workspace/app-components"
import { Badge } from "@workspace/ui-components/stable/badge"
import type { DataTableColumn } from "@workspace/app-components"
import { mapApiStatusToLabel } from "./status"
import type { AdminUserRow } from "../types"

export const adminUserColumns: DataTableColumn<AdminUserRow>[] = [
  {
    key: "display_id",
    header: "ID",
    sortable: true,
    renderCell: (row) => (
      <CopyableText
        value={row.display_id}
        textClassName="font-mono text-sm"
      >
        {row.display_id}
      </CopyableText>
    ),
  },
  {
    key: "display_name",
    header: "显示名称",
    sortable: true,
    renderCell: (row) => <span className="font-medium">{row.display_name}</span>,
  },
  {
    key: "remark",
    header: "备注",
    sortable: true,
    renderCell: (row) =>
      row.remark?.trim() ? (
        row.remark
      ) : (
        <span className="text-sm text-(--app-muted-text)">无备注</span>
      ),
  },
  {
    key: "status",
    header: "状态",
    sortable: true,
    renderCell: (row) => (
      <Badge variant={row.status === "enabled" ? "default" : "outline"}>
        {mapApiStatusToLabel(row.status)}
      </Badge>
    ),
  },
  {
    key: "roles",
    header: "角色",
    renderCell: (row) =>
      row.roles.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {row.roles.map((role) => (
            <Badge key={role} variant="outline">
              {role}
            </Badge>
          ))}
        </div>
      ) : (
        <span className="text-sm text-(--app-muted-text)">未分配角色</span>
      ),
  },
  {
    key: "roleCount",
    header: "角色数",
    sortable: true,
    renderCell: (row) => row.roles.length,
  },
]
