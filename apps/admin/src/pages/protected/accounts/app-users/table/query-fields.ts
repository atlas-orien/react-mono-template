import type {
  DataTableAuditColumnKey,
  DataTableBuiltInQueryField,
  DataTableQueryField,
  DataTableSelectOption,
} from "@workspace/app-components"
import { appUserAuditColumns } from "../constants"
import type { AppUserTableQuery } from "../types"

export const statusOptions = [
  { label: "启用", value: "启用" },
  { label: "停用", value: "停用" },
] as const

const timeFieldLabels = {
  createdAt: "创建时间",
  updatedAt: "更新时间",
} as const

const auditColumns =
  appUserAuditColumns as readonly DataTableAuditColumnKey[]

const timeFieldOptions: readonly DataTableSelectOption[] =
  auditColumns.map((column) => ({
    label: timeFieldLabels[column],
    value: column,
  }))

function getTimeRangeQueryField():
  | DataTableBuiltInQueryField<AppUserTableQuery>
  | null {
  if (auditColumns.length === 0) return null

  if (auditColumns.length === 1) {
    const timeField = auditColumns[0]

    return {
      key: "timeRange",
      type: "date-range",
      label: timeFieldLabels[timeField],
      placeholder: `选择${timeFieldLabels[timeField]}`,
    }
  }

  return {
    key: "timeRange",
    scopeKey: "timeField",
    type: "scoped-date-range",
    label: "时间字段",
    scopePlaceholder: "时间字段",
    rangePlaceholder: "选择时间范围",
    options: timeFieldOptions,
  }
}

const timeRangeQueryField = getTimeRangeQueryField()

export const appUserBuiltInQueryFields: DataTableBuiltInQueryField<AppUserTableQuery>[] =
  [
    {
      key: "keyword",
      type: "search",
      label: "关键字",
      placeholder: "搜索显示名称、ID、备注或角色",
    },
    ...(timeRangeQueryField ? [timeRangeQueryField] : []),
  ]

export const appUserQueryFields: DataTableQueryField<AppUserTableQuery>[] = [
  {
    key: "status",
    type: "select",
    label: "状态",
    placeholder: "状态",
    options: statusOptions.map((option) => ({
      label: option.label,
      value: option.value,
    })),
  },
]
