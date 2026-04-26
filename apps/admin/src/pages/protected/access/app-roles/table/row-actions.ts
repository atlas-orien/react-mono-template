import { useMemo } from "react"
import type { DataTableRowActionsConfig } from "@workspace/app-components"
import { toast } from "@workspace/ui-components"
import { deleteAppRoleApi } from "@/api"
import type { RoleRow } from "../types"

export function useRoleRowActions(
  invalidateRoles: () => Promise<unknown>
): DataTableRowActionsConfig<RoleRow> {
  return useMemo(
    () => ({
      columnWidth: 72,
      edit: false,
      delete: {
        label: "删除",
        title: (row) => `删除 App 角色 ${row.name}`,
        description: (row) =>
          `确认删除 App 角色 ${row.name}（${row.code}）？删除前请确认该角色没有仍在使用的用户或权限关联。`,
        confirmLabel: "删除",
        onConfirm: async (row) => {
          await deleteAppRoleApi(row.id)
          await invalidateRoles()
          toast.success("App 角色已删除")
        },
      },
    }),
    [invalidateRoles]
  )
}
