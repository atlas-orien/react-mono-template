import type {
  DataTableBuiltInQueryField,
  DataTableQueryField,
} from "@workspace/app-components"
import type { AdminUserTableQuery } from "../types"

export const statusOptions = [
  { label: "启用", value: "启用" },
  { label: "停用", value: "停用" },
] as const

export const adminUserBuiltInQueryFields: DataTableBuiltInQueryField<AdminUserTableQuery>[] = [
  {
    key: "keyword",
    type: "search",
    label: "关键字",
    placeholder: "搜索显示名称、ID、备注或角色",
    fieldKey: "keywordField",
    fieldPlaceholder: "搜索字段",
    fieldOptions: [
      { label: "全部", value: "all" },
      { label: "显示名称", value: "display_name" },
      { label: "ID", value: "display_id" },
      { label: "备注", value: "remark" },
      { label: "角色", value: "role" },
    ],
  },
]

export const adminUserQueryFields: DataTableQueryField<AdminUserTableQuery>[] = [
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
