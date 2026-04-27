import type {
  DataTableBuiltInQueryField,
  DataTableQueryField,
} from "@workspace/app-components"
import type { AppUserTableQuery } from "../types"

export const statusOptions = [
  { label: "启用", value: "启用" },
  { label: "停用", value: "停用" },
] as const

export const appUserBuiltInQueryFields: DataTableBuiltInQueryField<AppUserTableQuery>[] =
  [
    {
      key: "keyword",
      type: "search",
      label: "关键字",
      placeholder: "搜索显示名称、ID、备注或角色",
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
