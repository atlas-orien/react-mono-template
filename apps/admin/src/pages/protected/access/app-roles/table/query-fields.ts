import type {
  DataTableBuiltInQueryField,
} from "@workspace/app-components"
import type { RoleTableQuery } from "../types"

export const roleBuiltInQueryFields: DataTableBuiltInQueryField<RoleTableQuery>[] = [
  {
    key: "keyword",
    type: "search",
    label: "关键字",
    placeholder: "搜索角色 ID、角色名或编码",
    fieldKey: "keywordField",
    fieldPlaceholder: "搜索字段",
    fieldOptions: [
      { label: "全部", value: "all" },
      { label: "ID", value: "id" },
      { label: "角色名", value: "name" },
      { label: "编码", value: "code" },
    ],
  },
]

export const roleQueryFields = []
