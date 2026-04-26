import { ShieldCheck } from "lucide-react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui-components/stable/tabs"
import type { RoleResponse } from "@/api"

export function RolePermissionTabs({
  activeRoleId,
  children,
  onRoleChange,
  roles,
  selectedCount,
}: {
  activeRoleId: string
  children: React.ReactNode
  onRoleChange: (roleId: string) => void
  roles: readonly RoleResponse[]
  selectedCount: number
}) {
  return (
    <Tabs value={activeRoleId} onValueChange={onRoleChange}>
      <div className="flex min-w-0 flex-col gap-3 rounded-(--ui-radius-lg) border border-(--app-border) bg-(--app-panel) p-2 lg:flex-row lg:items-center lg:justify-between">
        <TabsList>
          {roles.map((role) => (
            <TabsTrigger key={role.id} value={String(role.id)}>
              {role.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="hidden shrink-0 items-center gap-2 text-sm text-(--app-muted-text) md:flex">
          <ShieldCheck className="size-4" />
          已选择 {selectedCount} 项
        </div>
      </div>
      {children}
    </Tabs>
  )
}

export { TabsContent as RolePermissionTabsContent }
