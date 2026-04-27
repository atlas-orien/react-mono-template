import type { DataTableBuiltInQueryField } from "@workspace/app-components"
import type { RoleTableQuery } from "../types"

export const roleBuiltInQueryFields: DataTableBuiltInQueryField<RoleTableQuery>[] = [
  {
    key: "keyword",
    type: "search",
    label: "关键字",
    placeholder: "搜索角色名称、ID 或编码",
  },
]
