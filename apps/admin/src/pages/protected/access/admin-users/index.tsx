import { DataTable, MetricCards } from "@workspace/app-components"
import { useAdminUsersData } from "./admin-users-data"
import { useCreateAdminUserInsertAction } from "./dialogs/create-admin-user-dialog"
import { useAdminUsersTable } from "./table"
import type { AdminUserRow, AdminUserTableQuery } from "./types"

export default function AdminUsersPage() {
  const { metricCards, fetchData, invalidateAdminUsers } = useAdminUsersData()
  const table = useAdminUsersTable(fetchData, invalidateAdminUsers)
  const insertAction = useCreateAdminUserInsertAction(invalidateAdminUsers)

  return (
    <div className="w-full min-w-0 space-y-4">
      <MetricCards items={metricCards} />

      <div className="flex h-[calc(100vh-22rem)] min-h-160 min-w-0 flex-1 overflow-hidden">
        <DataTable<AdminUserRow, AdminUserTableQuery>
          columns={table.columns}
          fetchData={table.fetchData}
          getRowId={table.getRowId}
          height="100%"
          initialPageSize={table.initialPageSize}
          initialQuery={table.initialQuery}
          insert={insertAction}
          selection={table.selection}
          bulkDelete={table.bulkDelete}
          bulkUpdate={table.bulkUpdate}
          builtInQueryFields={table.builtInQueryFields}
          queryFields={table.queryFields}
          pageSizeOptions={table.pageSizeOptions}
          rowActions={table.rowActions}
          compactColumns={table.compactColumns}
          compactRows={table.compactRows}
          fillWidth={table.fillWidth}
        />
      </div>
    </div>
  )
}
