import type {
  AppUserRow,
  AppUserStatusLabel,
  AppUserTableQuery,
} from "../types"
import { mapStatusLabelToApiStatus } from "./status"

export function filterAppUsers(
  rows: readonly AppUserRow[],
  query: AppUserTableQuery
) {
  return rows.filter((row) => {
    const keyword = query.keyword.trim().toLowerCase()
    const searchCandidatesByField = {
      all: [row.display_name, row.display_id, row.user_id, row.remark ?? "", ...row.roles],
      display_name: [row.display_name],
      display_id: [row.display_id],
      remark: row.remark ? [row.remark] : [],
      role: row.roles,
    } as const
    const searchCandidates =
      searchCandidatesByField[query.keywordField || "all"]

    const matchesKeyword =
      keyword.length === 0 ||
      searchCandidates.some((candidate) =>
        candidate.toLowerCase().includes(keyword)
      )

    const matchesStatus =
      query.status.length === 0 ||
      mapStatusLabelToApiStatus(query.status as AppUserStatusLabel) === row.status

    return matchesKeyword && matchesStatus
  })
}

export function sortAppUsers(
  rows: readonly AppUserRow[],
  sort: { columnKey: string; direction: "asc" | "desc" } | null,
  getSortValue: (row: AppUserRow, columnKey: string) => string | number,
  compareSortValues: (left: string | number, right: string | number) => number
) {
  if (!sort) return [...rows]

  return [...rows].sort((left, right) => {
    const leftValue = getSortValue(left, sort.columnKey)
    const rightValue = getSortValue(right, sort.columnKey)
    const result = compareSortValues(leftValue, rightValue)

    return sort.direction === "asc" ? result : -result
  })
}

export function paginateAppUsers(
  rows: readonly AppUserRow[],
  page: number,
  pageSize: number
) {
  const start = (page - 1) * pageSize
  const end = start + pageSize

  return {
    items: rows.slice(start, end),
    total: rows.length,
  }
}
