import { useMemo, useState } from "react"
import type { DataTableInsertActionConfig } from "@workspace/app-components"
import { Input, toast } from "@workspace/ui-components"
import { createAppRoleApi } from "@/api"

export function useCreateRoleInsertAction(
  invalidateRoles: () => Promise<unknown>
): DataTableInsertActionConfig {
  const [name, setName] = useState("")
  const [code, setCode] = useState("")

  return useMemo(
    () => ({
      label: "新增 App 角色",
      title: "创建 App 角色",
      description:
        "编码只是 App 角色的唯一编号。创建后请到 App 角色授权页面配置权限。",
      renderContent: () => (
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <span className="text-sm font-medium">角色名</span>
            <Input
              value={name}
              onValueChange={setName}
              placeholder="输入角色名"
            />
          </div>
          <div className="grid gap-2">
            <span className="text-sm font-medium">编码</span>
            <Input
              value={code}
              onValueChange={setCode}
              placeholder="输入唯一角色编码，例如 ops_manager"
            />
          </div>
        </div>
      ),
      onConfirm: async () => {
        const trimmedName = name.trim()
        const trimmedCode = code.trim()

        if (!trimmedName) {
          throw new Error("role name is required")
        }
        if (!trimmedCode) {
          throw new Error("role code is required")
        }

        await createAppRoleApi({
          name: trimmedName,
          code: trimmedCode,
        })

        setName("")
        setCode("")
        await invalidateRoles()
        toast.success("App 角色已创建")
      },
    }),
    [code, invalidateRoles, name]
  )
}
