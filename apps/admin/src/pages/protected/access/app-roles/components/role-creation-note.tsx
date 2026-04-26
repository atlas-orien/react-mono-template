import { AppNotice } from "@workspace/app-components"

export function RoleCreationNote() {
  return (
    <AppNotice
      title="App 角色创建说明"
      variant="warning"
      description={
        <span className="grid gap-1">
          <span>
            这里用于创建 App 角色，例如“会员”或“内容作者”。编码只是这个角色的唯一编号，方便系统保存和区分角色。
          </span>
          <span>
            创建后，角色默认没有权限；需要到“App 角色授权”页面勾选权限后，这个角色才会生效。
          </span>
        </span>
      }
    />
  )
}
