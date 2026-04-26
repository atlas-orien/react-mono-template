import { useMemo, useState } from "react"
import type { DataTableInsertActionConfig } from "@workspace/app-components"
import { Input, Select } from "@workspace/ui-components"
import { createAppUserApi, registerApi } from "@/api"

type CreateAppUserMode = "existing-account" | "new-account"

const createModeOptions = [
  { label: "已有账号转 App 用户", value: "existing-account" },
  { label: "新建账号并创建 App 用户", value: "new-account" },
] as const

export function useCreateAppUserInsertAction(
  invalidateAppUsers: () => Promise<unknown>
): DataTableInsertActionConfig {
  const [createMode, setCreateMode] =
    useState<CreateAppUserMode>("existing-account")
  const [existingIdentifier, setExistingIdentifier] = useState("")
  const [newUsername, setNewUsername] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newDisplayName, setNewDisplayName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [draftRemark, setDraftRemark] = useState("")

  return useMemo(
    () => ({
      label: "新增 App 用户",
      title: "创建 App 用户",
      description:
        "支持两种方式：直接将已有 auth 账号加入 App 用户，或先注册新账号，再立即创建 App 用户。",
      renderContent: () => (
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <span className="text-sm font-medium">创建方式</span>
            <Select
              value={createMode}
              onValueChange={(value) =>
                setCreateMode(value as CreateAppUserMode)
              }
              list={createModeOptions.map((option) => ({
                label: option.label,
                value: option.value,
              }))}
            />
          </div>

          {createMode === "existing-account" ? (
            <>
              <div className="grid gap-2">
                <span className="text-sm font-medium">账号</span>
                <Input
                  value={existingIdentifier}
                  onValueChange={setExistingIdentifier}
                  placeholder="输入用户名、邮箱或展示 ID"
                />
              </div>
            </>
          ) : (
            <>
              <div className="grid gap-2">
                <span className="text-sm font-medium">用户名</span>
                <Input
                  value={newUsername}
                  onValueChange={setNewUsername}
                  placeholder="输入新用户名"
                />
              </div>
              <div className="grid gap-2">
                <span className="text-sm font-medium">密码</span>
                <Input
                  value={newPassword}
                  onValueChange={setNewPassword}
                  placeholder="输入初始密码"
                  type="password"
                />
              </div>
              <div className="grid gap-2">
                <span className="text-sm font-medium">显示名称</span>
                <Input
                  value={newDisplayName}
                  onValueChange={setNewDisplayName}
                  placeholder="输入显示名称"
                />
              </div>
              <div className="grid gap-2">
                <span className="text-sm font-medium">邮箱（可选）</span>
                <Input
                  value={newEmail}
                  onValueChange={setNewEmail}
                  placeholder="输入邮箱"
                  type="email"
                />
              </div>
            </>
          )}

          <div className="grid gap-2">
            <span className="text-sm font-medium">备注</span>
            <Input
              value={draftRemark}
              onValueChange={setDraftRemark}
              placeholder="输入备注（可选）"
            />
          </div>
        </div>
      ),
      onConfirm: async () => {
        const trimmedRemark = draftRemark.trim()

        if (createMode === "existing-account") {
          const identifier = existingIdentifier.trim()

          if (!identifier) {
            throw new Error("identifier is required")
          }

          await createAppUserApi({
            identifier,
            remark: trimmedRemark || null,
          })
        } else {
          const username = newUsername.trim()
          const password = newPassword.trim()
          const displayName = newDisplayName.trim()
          const email = newEmail.trim()

          if (!username) {
            throw new Error("username is required")
          }
          if (!password) {
            throw new Error("password is required")
          }
          if (!displayName) {
            throw new Error("display_name is required")
          }

          await registerApi({
            username,
            password,
            display_name: displayName,
            email: email || undefined,
          })

          await createAppUserApi({
            identifier: username,
            remark: trimmedRemark || null,
          })
        }

        setCreateMode("existing-account")
        setExistingIdentifier("")
        setNewUsername("")
        setNewPassword("")
        setNewDisplayName("")
        setNewEmail("")
        setDraftRemark("")
        await invalidateAppUsers()
      },
    }),
    [
      createMode,
      draftRemark,
      existingIdentifier,
      invalidateAppUsers,
      newDisplayName,
      newEmail,
      newPassword,
      newUsername,
    ]
  )
}
