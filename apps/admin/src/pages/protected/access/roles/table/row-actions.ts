import { useMemo } from "react"
import type { DataTableRowActionsConfig } from "@workspace/app-components"
import { toast } from "@workspace/ui-components"
import { deleteRoleApi } from "@/api"
import type { RoleRow } from "../types"

export function useRoleRowActions(
  invalidateRoles: () => Promise<unknown>
): DataTableRowActionsConfig<RoleRow> {
  return useMemo(
    () => ({
      columnWidth: 56,
      edit: false,
      delete: {
        label: "删除",
        title: (row) => `删除角色 ${row.name}`,
        description: (row) =>
          `确认删除角色 ${row.name}（${row.code}）？删除前请确认该角色没有仍在使用的用户或权限关联。`,
        confirmLabel: "删除",
        onConfirm: async (row) => {
          await deleteRoleApi(row.id)
          await invalidateRoles()
          toast.success("角色已删除")
        },
      },
    }),
    [invalidateRoles]
  )
}
