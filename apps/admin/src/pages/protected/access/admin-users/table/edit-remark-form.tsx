import { useEffect, useState } from "react"
import { Input } from "@workspace/ui-components"
import type { AdminUserRow } from "../types"

export const remarkDraftStore = new Map<string, string>()

export function EditRemarkForm({ row }: { row: AdminUserRow }) {
  const [remark, setRemark] = useState(
    () => remarkDraftStore.get(row.user_id) ?? row.remark ?? ""
  )

  useEffect(() => {
    remarkDraftStore.set(row.user_id, remark)
    return () => {
      remarkDraftStore.delete(row.user_id)
    }
  }, [remark, row.user_id])

  return (
    <div className="grid gap-4 py-2">
      <div className="grid gap-2">
        <span className="text-sm font-medium">ID</span>
        <span className="font-mono text-sm text-muted-foreground">
          {row.display_id}
        </span>
      </div>
      <div className="grid gap-2">
        <span className="text-sm font-medium">显示名称</span>
        <span className="text-sm text-foreground">{row.display_name}</span>
      </div>
      <div className="grid gap-2">
        <span className="text-sm font-medium">备注</span>
        <Input value={remark} onValueChange={setRemark} placeholder="输入备注" />
      </div>
    </div>
  )
}
