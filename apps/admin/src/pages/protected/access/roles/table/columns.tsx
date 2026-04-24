import { CopyableText } from "@workspace/app-components"
import type { DataTableColumn } from "@workspace/app-components"
import type { RoleRow } from "../types"

export const roleColumns: DataTableColumn<RoleRow>[] = [
  {
    key: "id",
    header: "ID",
    width: 90,
    sortable: true,
    renderCell: (row) => row.id,
  },
  {
    key: "name",
    header: "角色名",
    width: 180,
    sortable: true,
    renderCell: (row) => <span className="font-medium">{row.name}</span>,
  },
  {
    key: "code",
    header: "编码",
    width: 180,
    sortable: true,
    renderCell: (row) => (
      <CopyableText
        value={row.code}
        textClassName="font-mono text-sm"
      >
        {row.code}
      </CopyableText>
    ),
  },
]
