import { DataTable } from "@workspace/app-components"
import { RoleCreationNote } from "./components/role-creation-note"
import { useRolesData } from "./roles-data"
import { useCreateRoleInsertAction } from "./dialogs/create-role-dialog"
import { useRolesTable } from "./table"
import type { RoleRow, RoleTableQuery } from "./types"

export default function RolesPage() {
  const { fetchData, invalidateRoles } = useRolesData()
  const table = useRolesTable(fetchData, invalidateRoles)
  const insertAction = useCreateRoleInsertAction(invalidateRoles)

  return (
    <div className="w-full min-w-0 space-y-4">
      <RoleCreationNote />

      <div className="min-w-0 overflow-hidden">
        <DataTable<RoleRow, RoleTableQuery>
          columns={table.columns}
          fetchData={table.fetchData}
          getRowId={table.getRowId}
          initialPageSize={table.initialPageSize}
          initialQuery={table.initialQuery}
          insert={insertAction}
          builtInQueryFields={table.builtInQueryFields}
          queryFields={table.queryFields}
          queryTools={table.queryTools}
          pageSizeOptions={table.pageSizeOptions}
          selection={table.selection}
          bulkDelete={table.bulkDelete}
          bulkUpdate={table.bulkUpdate}
          rowActions={table.rowActions}
          compactColumns={table.compactColumns}
          compactRows={table.compactRows}
          fillWidth={table.fillWidth}
        />
      </div>
    </div>
  )
}
