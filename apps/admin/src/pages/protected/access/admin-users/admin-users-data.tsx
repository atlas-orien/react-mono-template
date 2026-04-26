import { useCallback, useMemo } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import type {
  DataTableFetchResult,
  DataTableSortState,
} from "@workspace/app-components"
import { listAdminUsersApi } from "@/api"
import { buildAdminUserMetricCards } from "./metrics"
import { compareSortValues, getAdminUserSortValue } from "./table/sort"
import {
  filterAdminUsers,
  paginateAdminUsers,
  sortAdminUsers,
} from "./table/logic"
import { adminUsersQueryKey } from "./constants"
import type { AdminUserRow, AdminUserTableQuery } from "./types"

export function useAdminUsersData() {
  const queryClient = useQueryClient()

  const loadAdminUserRows = useCallback(async (): Promise<AdminUserRow[]> => {
    const adminUsers = await listAdminUsersApi()

    return adminUsers.map((adminUser) => {
      const roles = adminUser.admin_roles ?? adminUser.roles ?? []

      return {
        user_id: adminUser.user_id,
        display_id: adminUser.display_id?.trim() || adminUser.user_id,
        display_name: adminUser.display_name?.trim() || "未设置显示名称",
        remark: adminUser.remark ?? null,
        status: adminUser.status,
        roles: roles.map((role) => role.name),
      }
    })
  }, [])

  const adminUsersQuery = useQuery({
    queryKey: adminUsersQueryKey,
    queryFn: loadAdminUserRows,
  })

  const metricCards = useMemo(
    () => buildAdminUserMetricCards(adminUsersQuery.data ?? []),
    [adminUsersQuery.data]
  )

  const fetchData = useCallback(
    async ({
      page,
      pageSize,
      query,
      signal,
      sort,
    }: {
      page: number
      pageSize: number
      query: AdminUserTableQuery
      signal: AbortSignal
      sort: DataTableSortState | null
    }): Promise<DataTableFetchResult<AdminUserRow>> => {
      void signal
      const rows = await queryClient.ensureQueryData({
        queryKey: adminUsersQueryKey,
        queryFn: loadAdminUserRows,
      })

      const filteredRows = filterAdminUsers(rows, query)
      const sortedRows = sortAdminUsers(
        filteredRows,
        sort,
        getAdminUserSortValue,
        compareSortValues
      )

      return paginateAdminUsers(sortedRows, page, pageSize)
    },
    [loadAdminUserRows, queryClient]
  )

  const invalidateAdminUsers = useCallback(
    () =>
      queryClient.refetchQueries({
        queryKey: adminUsersQueryKey,
      }),
    [queryClient]
  )

  return {
    metricCards,
    fetchData,
    invalidateAdminUsers,
  }
}
