import type {
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

const timeFieldOptions: readonly DataTableSelectOption[] =
  appUserAuditColumns.map((column) => ({
    label: timeFieldLabels[column],
    value: column,
  }))

const timeRangeQueryField: DataTableBuiltInQueryField<AppUserTableQuery> =
  appUserAuditColumns.length > 1
    ? {
        key: "timeRange",
        scopeKey: "timeField",
        type: "scoped-date-range",
        label: "时间字段",
        scopePlaceholder: "时间字段",
        rangePlaceholder: "选择时间范围",
        options: timeFieldOptions,
      }
    : {
        key: "timeRange",
        type: "date-range",
        label: timeFieldLabels[appUserAuditColumns[0]],
        placeholder: `选择${timeFieldLabels[appUserAuditColumns[0]]}`,
      }

export const appUserBuiltInQueryFields: DataTableBuiltInQueryField<AppUserTableQuery>[] = [
  {
    key: "keyword",
    type: "search",
    label: "关键字",
    placeholder: "搜索显示名称、ID、备注或角色",
  },
  timeRangeQueryField,
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
