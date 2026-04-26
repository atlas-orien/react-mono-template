import { useCallback, useMemo } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import type {
  DataTableFetchResult,
  DataTableSortState,
} from "@workspace/app-components"
import { listAppUsersApi } from "@/api"
import { buildAppUserMetricCards } from "./metrics"
import { compareSortValues, getAppUserSortValue } from "./table/sort"
import {
  filterAppUsers,
  paginateAppUsers,
  sortAppUsers,
} from "./table/logic"
import { appUsersQueryKey } from "./constants"
import type { AppUserRow, AppUserTableQuery } from "./types"

export function useAppUsersData() {
  const queryClient = useQueryClient()

  const loadAppUserRows = useCallback(async (): Promise<AppUserRow[]> => {
    const appUsers = await listAppUsersApi()

    return appUsers.map((appUser) => {
      return {
        user_id: appUser.user_id,
        display_id: appUser.display_id?.trim() || appUser.user_id,
        display_name: appUser.display_name?.trim() || "未设置显示名称",
        remark: appUser.remark ?? null,
        status: appUser.status,
        roles: appUser.roles.map((role) => role.name),
      }
    })
  }, [])

  const appUsersQuery = useQuery({
    queryKey: appUsersQueryKey,
    queryFn: loadAppUserRows,
  })

  const metricCards = useMemo(
    () => buildAppUserMetricCards(appUsersQuery.data ?? []),
    [appUsersQuery.data]
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
      query: AppUserTableQuery
      signal: AbortSignal
      sort: DataTableSortState | null
    }): Promise<DataTableFetchResult<AppUserRow>> => {
      void signal
      const rows = await queryClient.ensureQueryData({
        queryKey: appUsersQueryKey,
        queryFn: loadAppUserRows,
      })

      const filteredRows = filterAppUsers(rows, query)
      const sortedRows = sortAppUsers(
        filteredRows,
        sort,
        getAppUserSortValue,
        compareSortValues
      )

      return paginateAppUsers(sortedRows, page, pageSize)
    },
    [loadAppUserRows, queryClient]
  )

  const invalidateAppUsers = useCallback(
    () =>
      queryClient.refetchQueries({
        queryKey: appUsersQueryKey,
      }),
    [queryClient]
  )

  return {
    metricCards,
    fetchData,
    invalidateAppUsers,
  }
}
