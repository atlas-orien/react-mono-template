import type {
  DataTableFetchResult,
  DataTableSortState,
} from "@workspace/app-components"
import { adminUserColumns } from "./columns"
import {
  adminUserBuiltInQueryFields,
  adminUserQueryFields,
} from "./query-fields"
import {
  adminUserInitialQuery,
  adminUserPageSizeOptions,
} from "../constants"
import { useAdminUserRowActions } from "./row-actions"
import type { AdminUserRow, AdminUserTableQuery } from "../types"

export function useAdminUsersTable(
  fetchData: (params: {
    page: number
    pageSize: number
    query: AdminUserTableQuery
    signal: AbortSignal
    sort: DataTableSortState | null
  }) => Promise<DataTableFetchResult<AdminUserRow>>,
  invalidateAdminUsers: () => Promise<unknown>
) {
  const rowActions = useAdminUserRowActions(invalidateAdminUsers)

  return {
    columns: adminUserColumns,
    fetchData,
    getRowId: (row: AdminUserRow) => row.user_id,
    initialPageSize: 10,
    initialQuery: adminUserInitialQuery,
    builtInQueryFields: adminUserBuiltInQueryFields,
    queryFields: adminUserQueryFields,
    pageSizeOptions: adminUserPageSizeOptions,
    rowActions,
    selection: false,
    bulkDelete: false,
    bulkUpdate: false,
    compactColumns: true,
    compactRows: true,
    fillWidth: false,
  } as const
}
