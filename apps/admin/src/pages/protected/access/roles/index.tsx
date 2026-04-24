import { DataTable, MetricCards } from "@workspace/app-components"
import { useRolesData } from "./roles-data"
import { useCreateRoleInsertAction } from "./dialogs/create-role-dialog"
import { useRolesTable } from "./table"
import type { RoleRow, RoleTableQuery } from "./types"

export default function RolesPage() {
  const { metricCards, fetchData, invalidateRoles } = useRolesData()
  const table = useRolesTable(fetchData, invalidateRoles)
  const insertAction = useCreateRoleInsertAction(invalidateRoles)

  return (
    <div className="w-full min-w-0 space-y-4">
      <MetricCards items={metricCards} />

      <div className="flex h-[calc(100vh-22rem)] min-h-160 min-w-0 flex-1 overflow-hidden">
        <DataTable<RoleRow, RoleTableQuery>
          columns={table.columns}
          fetchData={table.fetchData}
          getRowId={table.getRowId}
          height="100%"
          initialPageSize={table.initialPageSize}
          initialQuery={table.initialQuery}
          insert={insertAction}
          builtInQueryFields={table.builtInQueryFields}
          queryFields={table.queryFields}
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
