import type {
  DataTableFetchResult,
  DataTableSortState,
} from "@workspace/app-components"
import {
  roleInitialQuery,
  rolePageSizeOptions,
} from "../constants"
import { roleColumns } from "./columns"
import {
  roleBuiltInQueryFields,
  roleQueryFields,
} from "./query-fields"
import type { RoleRow, RoleTableQuery } from "../types"

export function useRolesTable(
  fetchData: (params: {
    page: number
    pageSize: number
    query: RoleTableQuery
    signal: AbortSignal
    sort: DataTableSortState | null
  }) => Promise<DataTableFetchResult<RoleRow>>
) {
  return {
    columns: roleColumns,
    fetchData,
    getRowId: (row: RoleRow) => row.id,
    initialPageSize: 10,
    initialQuery: roleInitialQuery,
    builtInQueryFields: roleBuiltInQueryFields,
    queryFields: roleQueryFields,
    pageSizeOptions: rolePageSizeOptions,
    selection: false,
    bulkDelete: false,
    bulkUpdate: false,
    compactColumns: true,
    compactRows: true,
    fillWidth: false,
  } as const
}
