import { createElement, useMemo, useRef } from "react"
import type { DataTableRowActionsConfig } from "@workspace/app-components"
import { toast } from "@workspace/ui-components"
import { deleteAdminUserApi, updateAdminUserApi } from "@/api"
import {
  EditAdminUserDialogContent,
  type EditAdminUserDialogContentHandle,
} from "../dialogs/edit-admin-user-dialog"
import type { AdminUserRow } from "../types"

export function useAdminUserRowActions(
  invalidateAdminUsers: () => Promise<unknown>
): DataTableRowActionsConfig<AdminUserRow> {
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
        description: "当前可编辑备注，保存后会同步到服务端。",
        renderContent: ({ row }) =>
          createElement(EditAdminUserDialogContent, {
            row,
            ref: (handle) => setEditDialogHandle(row.user_id, handle),
          }
        ),
        onConfirm: async (row) => {
          const remark =
            editDialogHandlesRef.current.get(row.user_id)?.getRemark() ??
            row.remark ??
            ""

          await updateAdminUserApi(row.user_id, {
            remark: remark.trim() || null,
            status: row.status,
          })
          await invalidateAdminUsers()
          toast.success("后台账号已更新")
        },
      },
      delete: {
        label: "删除",
        title: (row) => `删除后台账号 ${row.display_id}`,
        description: (row) =>
          `确认删除后台账号 ${row.display_name}（${row.display_id}）？删除后该账号将无法进入后台。`,
        confirmLabel: "删除",
        onConfirm: async (row) => {
          await deleteAdminUserApi(row.user_id)
          await invalidateAdminUsers()
          toast.success("后台账号已删除")
        },
      },
      moreItems: [
        {
          key: "toggle-status",
          label: (row) => (row.status === "enabled" ? "停用" : "启用"),
          onClick: async (row) => {
            const nextStatus = row.status === "enabled" ? "disabled" : "enabled"

            await updateAdminUserApi(row.user_id, {
              remark: row.remark,
              status: nextStatus,
            })
            await invalidateAdminUsers()
            toast.success(nextStatus === "enabled" ? "后台账号已启用" : "后台账号已停用")
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
  }, [invalidateAdminUsers])
}
