import type {
  DataTableFetchResult,
  DataTableSortState,
} from "@workspace/app-components"
import {
  roleInitialQuery,
  rolePageSizeOptions,
} from "../constants"
import { roleColumns } from "./columns"
import { roleBuiltInQueryFields } from "./query-fields"
import { useRoleRowActions } from "./row-actions"
import type { RoleRow, RoleTableQuery } from "../types"

export function useRolesTable(
  fetchData: (params: {
    page: number
    pageSize: number
    query: RoleTableQuery
    signal: AbortSignal
    sort: DataTableSortState | null
  }) => Promise<DataTableFetchResult<RoleRow>>,
  invalidateRoles: () => Promise<unknown>
) {
  const rowActions = useRoleRowActions(invalidateRoles)

  return {
    columns: roleColumns,
    fetchData,
    getRowId: (row: RoleRow) => row.id,
    initialPageSize: 10,
    initialQuery: roleInitialQuery,
    query: {
      builtInFields: roleBuiltInQueryFields,
      fields: [],
      tools: false,
    },
    pageSizeOptions: rolePageSizeOptions,
    rowActions,
    bulkDelete: false,
    bulkUpdate: false,
    compactColumns: true,
    compactRows: true,
    fillWidth: false,
  } as const
}
