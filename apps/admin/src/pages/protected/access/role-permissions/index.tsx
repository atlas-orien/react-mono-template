import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui-components/stable/card"

import { RolePermissionEditor } from "./components/role-permission-editor"
import {
  RolePermissionTabs,
  RolePermissionTabsContent,
} from "./components/role-tabs"
import { useRolePermissionsPage } from "./use-role-permissions-page"

export default function RolePermissionsPage() {
  const page = useRolePermissionsPage()

  return (
    <div className="w-full min-w-0 space-y-4 px-4 pb-4">
      {page.roles.length > 0 && page.activeRole ? (
        <RolePermissionTabs
          activeRoleId={page.resolvedRoleId}
          roles={page.roles}
          onRoleChange={page.handleRoleChange}
        >
          {page.roles.map((role) => (
            <RolePermissionTabsContent key={role.id} value={String(role.id)}>
              <RolePermissionEditor
                activeRole={role}
                defaultExpandedIds={page.defaultExpandedIds}
                isSaving={page.isSaving}
                isTreeLoading={page.isTreeLoading}
                resourceTree={page.resourceTree}
                searchValue={page.searchValue}
                selectedCount={page.selectedPermissionIds.length}
                selectedPermissionIds={page.selectedPermissionIds}
                summary={page.summary}
                onReset={page.handleResetSelection}
                onSave={page.handleSave}
                onSearchChange={page.handleSearchChange}
                onSelectedPermissionIdsChange={
                  page.handleSelectedPermissionIdsChange
                }
              />
            </RolePermissionTabsContent>
          ))}
        </RolePermissionTabs>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>暂无可授权角色</CardTitle>
            <CardDescription>
              创建权限角色后，可以在这里配置该角色的权限覆盖集。
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}
