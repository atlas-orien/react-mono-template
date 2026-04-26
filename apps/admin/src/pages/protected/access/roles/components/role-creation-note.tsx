import { AppNotice } from "@workspace/app-components"

export function RoleCreationNote() {
  return (
    <AppNotice
      title="角色创建说明"
      variant="warning"
      description={
        <span className="grid gap-1">
          <span>
            这里用于创建角色，例如“运营人员”或“客服主管”。编码只是这个角色的唯一编号，方便系统保存和区分角色。
          </span>
          <span>
            创建后，角色默认没有权限；需要到“角色授权”页面勾选权限后，这个角色才会生效。
          </span>
        </span>
      }
    />
  )
}
