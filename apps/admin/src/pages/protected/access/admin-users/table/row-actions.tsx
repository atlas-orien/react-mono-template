import type { DataTableRowActionsConfig } from "@workspace/app-components"
import { EditRemarkForm, remarkDraftStore } from "./edit-remark-form"
import type { AdminUserRow } from "../types"

export const adminUserRowActions: DataTableRowActionsConfig<AdminUserRow> = {
  columnWidth: 118,
  edit: {
    label: "编辑",
    title: (row) => `编辑后台账号 ${row.display_id}`,
    description: "当前可编辑备注。保存接口接入后将直接提交到服务端。",
    renderContent: ({ row }) => <EditRemarkForm row={row} />,
    onConfirm: async (row) => {
      const remark = remarkDraftStore.get(row.user_id) ?? row.remark ?? ""
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
      key: "assign-role",
      label: "编辑角色",
      onClick: (row) => {
        console.info("edit roles", row.user_id)
      },
    },
  ],
}
