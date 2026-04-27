import type {
  DataTableBuiltInQueryField,
  DataTableQueryField,
} from "@workspace/app-components"
import type { AppUserTableQuery } from "../types"

export const statusOptions = [
  { label: "启用", value: "启用" },
  { label: "停用", value: "停用" },
] as const

export const timeFieldOptions = [
  { label: "创建时间", value: "created_at" },
  { label: "更新时间", value: "updated_at" },
] as const

export const appUserBuiltInQueryFields: DataTableBuiltInQueryField<AppUserTableQuery>[] = [
  {
    key: "keyword",
    type: "search",
    label: "关键字",
    placeholder: "搜索显示名称、ID、备注或角色",
  },
  {
    key: "timeField",
    type: "select",
    label: "时间字段",
    placeholder: "时间字段",
    options: timeFieldOptions.map((option) => ({
      label: option.label,
      value: option.value,
    })),
  },
  {
    key: "timeRange",
    type: "date-range",
    label: "时间范围",
    placeholder: "选择时间范围",
  },
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
