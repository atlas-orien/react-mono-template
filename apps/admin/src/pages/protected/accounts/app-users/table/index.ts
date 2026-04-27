import type { DataTableFetchResult } from "@workspace/app-components"
import { appUserColumns } from "./columns"
import {
  appUserBuiltInQueryFields,
  appUserQueryFields,
} from "./query-fields"
import {
  appUserAuditColumns,
  appUserInitialQuery,
  appUserPageSizeOptions,
} from "../constants"
import { useAppUserRowActions } from "./row-actions"
import type { AppUserRow, AppUserTableQuery } from "../types"

export function useAppUsersTable(
  fetchData: (params: {
    page: number
    pageSize: number
    query: AppUserTableQuery
    signal: AbortSignal
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
    auditQuery: {
      columns: appUserAuditColumns,
      rangeKey: "timeRange",
      fieldKey: appUserAuditColumns.length > 1 ? "timeField" : undefined,
      label: "审计时间",
      fieldPlaceholder: "时间字段",
      rangePlaceholder: "选择时间范围",
    },
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
