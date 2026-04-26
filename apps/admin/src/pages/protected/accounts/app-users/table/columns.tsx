import { CopyableText } from "@workspace/app-components"
import { Badge } from "@workspace/ui-components/stable/badge"
import type { DataTableColumn } from "@workspace/app-components"
import { mapApiStatusToLabel } from "./status"
import type { AppUserRow } from "../types"

export const appUserColumns: DataTableColumn<AppUserRow>[] = [
  {
    key: "display_id",
    header: "ID",
    width: 180,
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
    width: 160,
    sortable: true,
    renderCell: (row) => <span className="font-medium">{row.display_name}</span>,
  },
  {
    key: "remark",
    header: "备注",
    width: 220,
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
    width: 100,
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
    width: 180,
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
    width: 88,
    sortable: true,
    renderCell: (row) => row.roles.length,
  },
]
