import { useCallback, useMemo } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import type { DataTableFetchResult } from "@workspace/app-components"
import { listAppUsersApi, type ListAppUsersRequest } from "@/api"
import { buildAppUserMetricCards } from "./metrics"
import { mapStatusLabelToApiStatus } from "./table/status"
import { appUsersFirstPageQueryKey } from "./constants"
import type {
  AppUserRow,
  AppUserTableQuery,
  AppUserTimeField,
} from "./types"

function mapAppUserRow(
  appUser: Awaited<ReturnType<typeof listAppUsersApi>>["items"][number]
): AppUserRow {
  return {
    user_id: appUser.user_id,
    display_id: appUser.display_id?.trim() || appUser.user_id,
    display_name: appUser.display_name?.trim() || "未设置显示名称",
    remark: appUser.remark ?? null,
    status: appUser.status,
    roles: appUser.roles.map((role) => role.name),
  }
}

function toStartOfDayIso(value: Date) {
  const date = new Date(value)
  date.setHours(0, 0, 0, 0)
  return date.toISOString()
}

function toEndOfDayIso(value: Date) {
  const date = new Date(value)
  date.setHours(23, 59, 59, 999)
  return date.toISOString()
}

function applyTimeRangeParams(
  params: ListAppUsersRequest,
  field: AppUserTimeField,
  range: AppUserTableQuery["timeRange"]
) {
  if (!range?.from && !range?.to) return

  const from = range.from ? toStartOfDayIso(range.from) : undefined
  const to = range.to ? toEndOfDayIso(range.to) : undefined

  if (field === "created_at") {
    params.created_at_from = from
    params.created_at_to = to
    return
  }

  params.updated_at_from = from
  params.updated_at_to = to
}

function buildAppUserListParams(
  page: number,
  pageSize: number,
  query: AppUserTableQuery
): ListAppUsersRequest {
  const params: ListAppUsersRequest = {
    page,
    page_size: pageSize,
  }
  const keyword = query.keyword.trim()

  if (keyword) {
    params.keyword = keyword
  }

  if (query.status) {
    params.status = mapStatusLabelToApiStatus(query.status)
  }

  applyTimeRangeParams(params, query.timeField, query.timeRange)

  return params
}

export function useAppUsersData() {
  const queryClient = useQueryClient()

  const loadAppUserPage = useCallback(async (params: ListAppUsersRequest) => {
    const response = await listAppUsersApi(params)

    return {
      items: response.items.map(mapAppUserRow),
      total: response.total,
    }
  }, [])

  const appUsersQuery = useQuery({
    queryKey: appUsersFirstPageQueryKey,
    queryFn: async () => loadAppUserPage({ page: 1, page_size: 10 }),
  })

  const metricCards = useMemo(
    () => buildAppUserMetricCards(appUsersQuery.data),
    [appUsersQuery.data]
  )

  const fetchData = useCallback(
    async ({
      page,
      pageSize,
      query,
      signal,
    }: {
      page: number
      pageSize: number
      query: AppUserTableQuery
      signal: AbortSignal
    }): Promise<DataTableFetchResult<AppUserRow>> => {
      void signal
      const serverPage = await loadAppUserPage(
        buildAppUserListParams(page, pageSize, query)
      )

      return {
        items: serverPage.items,
        total: serverPage.total,
      }
    },
    [loadAppUserPage]
  )

  const invalidateAppUsers = useCallback(
    () =>
      queryClient.refetchQueries({
        queryKey: appUsersFirstPageQueryKey,
      }),
    [queryClient]
  )

  return {
    metricCards,
    fetchData,
    invalidateAppUsers,
  }
}
