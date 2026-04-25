import { Badge } from "@workspace/ui-components/stable/badge"

export function RolePermissionsPageHeading() {
  return (
    <div className="flex min-w-0 flex-col gap-2 border-b border-(--app-border) pb-4">
      <div className="w-fit">
        <Badge variant="outline">Role Permissions</Badge>
      </div>
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold">角色授权</h1>
        <p className="mt-1 max-w-4xl text-sm text-(--app-muted-text)">
          按角色配置权限覆盖集，权限资源由服务端维护，页面只处理角色与权限之间的授权关系。
        </p>
      </div>
    </div>
  )
}
