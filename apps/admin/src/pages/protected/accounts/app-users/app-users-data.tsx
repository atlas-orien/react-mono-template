import { useCallback, useMemo } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import type { DataTableFetchResult } from "@workspace/app-components"
import { listAppUsersApi, type ListAppUsersRequest } from "@/api"
import { buildAppUserMetricCards } from "./metrics"
import { mapStatusLabelToApiStatus } from "./table/status"
import { appUserAuditColumns, appUsersFirstPageQueryKey } from "./constants"
import type {
  AppUserRow,
  AppUserTableQuery,
  AppUserTimeField,
} from "./types"

function mapAppUserRow(
  appUser: Awaited<ReturnType<typeof listAppUsersApi>>["items"][number]
): AppUserRow {
  return {
    user_id: appUser.userId,
    display_id: appUser.displayId?.trim() || appUser.userId,
    display_name: appUser.displayName?.trim() || "未设置显示名称",
    remark: appUser.remark ?? null,
    status: appUser.status,
    createdAt: appUser.createdAt ?? null,
    updatedAt: appUser.updatedAt ?? null,
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
  range: AppUserTableQuery["auditRange"]
) {
  if (!range?.from && !range?.to) return

  const from = range.from ? toStartOfDayIso(range.from) : undefined
  const to = range.to ? toEndOfDayIso(range.to) : undefined

  if (field === "createdAt") {
    params.createdAtFrom = from
    params.createdAtTo = to
    return
  }

  params.updatedAtFrom = from
  params.updatedAtTo = to
}

function buildAppUserListParams(
  page: number,
  pageSize: number,
  query: AppUserTableQuery
): ListAppUsersRequest {
  const params: ListAppUsersRequest = {
    page,
    pageSize,
  }
  const keyword = query.keyword.trim()

  if (keyword) {
    params.keyword = keyword
  }

  if (query.status) {
    params.status = mapStatusLabelToApiStatus(query.status)
  }

  const auditField =
    appUserAuditColumns.length > 1 ? query.auditField : appUserAuditColumns[0]

  if (!auditField) return params

  applyTimeRangeParams(params, auditField, query.auditRange)

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
    queryFn: async () => loadAppUserPage({ page: 1, pageSize: 10 }),
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
