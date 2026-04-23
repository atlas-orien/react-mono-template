import { useMemo, useRef } from "react"
import type { DataTableRowActionsConfig } from "@workspace/app-components"
import {
  EditAdminUserDialogContent,
  type EditAdminUserDialogContentHandle,
} from "../dialogs/edit-admin-user-dialog"
import type { AdminUserRow } from "../types"

export function useAdminUserRowActions(): DataTableRowActionsConfig<AdminUserRow> {
  const editDialogHandlesRef = useRef(
    new Map<string, EditAdminUserDialogContentHandle | null>()
  )

  return useMemo(() => {
    const setEditDialogHandle = (
      userId: string,
      handle: EditAdminUserDialogContentHandle | null
    ) => {
      if (handle) {
        editDialogHandlesRef.current.set(userId, handle)
        return
      }

      editDialogHandlesRef.current.delete(userId)
    }

    return {
      columnWidth: 118,
      edit: {
        label: "编辑",
        title: (row) => `编辑后台账号 ${row.display_id}`,
        description: "当前可编辑备注。保存接口接入后将直接提交到服务端。",
        renderContent: ({ row }) => (
          <EditAdminUserDialogContent
            row={row}
            ref={(handle) => setEditDialogHandle(row.user_id, handle)}
          />
        ),
        onConfirm: async (row) => {
          const remark =
            editDialogHandlesRef.current.get(row.user_id)?.getRemark() ??
            row.remark ??
            ""

          console.info("edit admin user", {
            user_id: row.user_id,
            remark,
          })
        },
      },
      delete: {
        label: "删除",
        title: (row) => `删除后台账号 ${row.display_id}`,
        description: (row) =>
          `确认删除后台账号 ${row.display_name}（${row.display_id}）？此操作当前仅展示交互，待删除接口接入后生效。`,
        confirmLabel: "删除",
        onConfirm: async (row) => {
          console.info("delete admin user", {
            user_id: row.user_id,
          })
        },
      },
      moreItems: [
        {
          key: "toggle-status",
          label: (row) => (row.status === "enabled" ? "停用" : "启用"),
          onClick: (row) => {
            console.info("toggle admin user status", {
              user_id: row.user_id,
              status: row.status === "enabled" ? "disabled" : "enabled",
            })
          },
        },
        {
          key: "assign-role",
          label: "编辑角色",
          onClick: (row) => {
            console.info("edit roles", row.user_id)
          },
        },
      ],
    }
  }, [])
}
