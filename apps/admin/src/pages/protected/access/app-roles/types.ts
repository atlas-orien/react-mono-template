export interface RoleRow {
  id: number
  name: string
  code: string
}

export interface RoleTableQuery {
  keyword: string
  keywordField: "all" | "id" | "name" | "code"
}
