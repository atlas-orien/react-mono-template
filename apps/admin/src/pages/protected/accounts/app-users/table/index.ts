import type {
  DataTableFetchResult,
  DataTableSortState,
} from "@workspace/app-components"
import { appUserColumns } from "./columns"
import {
  appUserBuiltInQueryFields,
  appUserQueryFields,
} from "./query-fields"
import { appUserInitialQuery, appUserPageSizeOptions } from "../constants"
import { useAppUserRowActions } from "./row-actions"
import type { AppUserRow, AppUserTableQuery } from "../types"

export function useAppUsersTable(
  fetchData: (params: {
    page: number
    pageSize: number
    query: AppUserTableQuery
    signal: AbortSignal
    sort: DataTableSortState | null
  }) => Promise<DataTableFetchResult<AppUserRow>>,
  invalidateAppUsers: () => Promise<unknown>,
  onEditRoles: (row: AppUserRow) => void
) {
  const rowActions = useAppUserRowActions(invalidateAppUsers, onEditRoles)

  return {
    columns: appUserColumns,
    fetchData,
    getRowId: (row: AppUserRow) => row.user_id,
    initialPageSize: 10,
    initialQuery: appUserInitialQuery,
    builtInQueryFields: appUserBuiltInQueryFields,
    queryFields: appUserQueryFields,
    pageSizeOptions: appUserPageSizeOptions,
    rowActions,
    selection: false,
    bulkDelete: false,
    bulkUpdate: false,
    compactColumns: true,
    compactRows: true,
    fillWidth: false,
  } as const
}
