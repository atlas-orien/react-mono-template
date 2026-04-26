import { createElement, useMemo, useRef } from "react"
import type { DataTableRowActionsConfig } from "@workspace/app-components"
import { toast } from "@workspace/ui-components"
import { deleteAppUserApi, updateAppUserApi } from "@/api"
import {
  EditAppUserDialogContent,
  type EditAppUserDialogContentHandle,
} from "../dialogs/edit-app-user-dialog"
import type { AppUserRow } from "../types"

export function useAppUserRowActions(
  invalidateAppUsers: () => Promise<unknown>,
  onEditRoles: (row: AppUserRow) => void
): DataTableRowActionsConfig<AppUserRow> {
  const editDialogHandlesRef = useRef(
    new Map<string, EditAppUserDialogContentHandle | null>()
  )

  return useMemo(() => {
    const setEditDialogHandle = (
      userId: string,
      handle: EditAppUserDialogContentHandle | null
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
        title: (row) => `编辑 App 用户 ${row.display_id}`,
        description: "当前可编辑备注，保存后会同步到服务端。",
        renderContent: ({ row }) =>
          createElement(EditAppUserDialogContent, {
            row,
            ref: (handle) => setEditDialogHandle(row.user_id, handle),
          }),
        onConfirm: async (row) => {
          const remark =
            editDialogHandlesRef.current.get(row.user_id)?.getRemark() ??
            row.remark ??
            ""

          await updateAppUserApi(row.user_id, {
            remark: remark.trim() || null,
            status: row.status,
          })
          await invalidateAppUsers()
          toast.success("App 用户已更新")
        },
      },
      delete: {
        label: "删除",
        title: (row) => `删除 App 用户 ${row.display_id}`,
        description: (row) =>
          `确认删除 App 用户 ${row.display_name}（${row.display_id}）？删除后该账号将无法使用 App 权限。`,
        confirmLabel: "删除",
        onConfirm: async (row) => {
          await deleteAppUserApi(row.user_id)
          await invalidateAppUsers()
          toast.success("App 用户已删除")
        },
      },
      moreItems: [
        {
          key: "toggle-status",
          label: (row) => (row.status === "enabled" ? "停用" : "启用"),
          onClick: async (row) => {
            const nextStatus = row.status === "enabled" ? "disabled" : "enabled"

            await updateAppUserApi(row.user_id, {
              remark: row.remark,
              status: nextStatus,
            })
            await invalidateAppUsers()
            toast.success(
              nextStatus === "enabled" ? "App 用户已启用" : "App 用户已停用"
            )
          },
        },
        {
          key: "assign-role",
          label: "编辑角色",
          onClick: onEditRoles,
        },
      ],
    }
  }, [invalidateAppUsers, onEditRoles])
}
