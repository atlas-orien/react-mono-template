import { useCallback, useState } from "react"
import { DataTable, MetricCards } from "@workspace/app-components"
import { appUserAuditColumns } from "./constants"
import { useAppUsersData } from "./app-users-data"
import { EditAppUserRolesDialog } from "./dialogs/edit-app-user-roles-dialog"
import { useAppUsersTable } from "./table"
import type { AppUserRow, AppUserTableQuery } from "./types"

export default function AppUsersPage() {
  const [roleDialogRow, setRoleDialogRow] = useState<AppUserRow | null>(null)
  const [tableRefreshKey, setTableRefreshKey] = useState(0)
  const { metricCards, fetchData, invalidateAppUsers } = useAppUsersData()
  const handleEditRoles = useCallback((row: AppUserRow) => {
    setRoleDialogRow(row)
  }, [])
  const table = useAppUsersTable(
    fetchData,
    invalidateAppUsers,
    handleEditRoles
  )

  return (
    <div className="w-full min-w-0 space-y-4">
      <MetricCards items={metricCards} />

      <div className="flex h-[calc(100vh-22rem)] min-h-160 min-w-0 flex-1 overflow-hidden">
        <DataTable<AppUserRow, AppUserTableQuery>
          key={tableRefreshKey}
          auditColumns={appUserAuditColumns}
          columns={table.columns}
          fetchData={table.fetchData}
          getRowId={table.getRowId}
          height="100%"
          initialPageSize={table.initialPageSize}
          initialQuery={table.initialQuery}
          queryTools={false}
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

      <EditAppUserRolesDialog
        onSaved={() => setTableRefreshKey((current) => current + 1)}
        open={Boolean(roleDialogRow)}
        row={roleDialogRow}
        onOpenChange={(open) => {
          if (!open) {
            setRoleDialogRow(null)
          }
        }}
      />
    </div>
  )
}
