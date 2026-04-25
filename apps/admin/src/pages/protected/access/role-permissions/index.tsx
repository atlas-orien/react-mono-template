import { useMemo, useState } from "react"
import { ShieldCheck, SquareMousePointer, Waypoints } from "lucide-react"
import { TreeView, type TreeNode } from "@workspace/ui-components"
import { Badge } from "@workspace/ui-components/stable/badge"
import { Button } from "@workspace/ui-components/stable/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui-components/stable/card"
import { Input } from "@workspace/ui-components/stable/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui-components/stable/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui-components/stable/table"
import {
  flattenPermissionTree,
  permissionTree,
  rolePermissionPresetMap,
  roles,
  type PermissionNode,
} from "../_shared/rbac-shared"

type ResourceSummaryType = "group" | "action" | "menu" | "api"

const kindLabelMap: Record<ResourceSummaryType, string> = {
  group: "分组",
  action: "操作",
  menu: "菜单",
  api: "API",
}

function toTreeNode(node: PermissionNode): TreeNode {
  return {
    id: node.id,
    label: node.name,
    searchText: `${node.name} ${node.code} ${node.description} ${node.path ?? ""}`,
    children: node.children?.map((child) => toTreeNode(child)),
  }
}

export default function RolePermissionsPage() {
  const [activeRoleId, setActiveRoleId] = useState(roles[0]?.id ?? "")
  const [searchValue, setSearchValue] = useState("")
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<string[]>(
    rolePermissionPresetMap[roles[0]?.id ?? ""] ?? [],
  )

  const flatPermissions = useMemo(() => flattenPermissionTree(permissionTree), [])
  const selectedResources = useMemo(
    () =>
      selectedPermissionIds
        .map((id) => flatPermissions.find((permission) => permission.id === id))
        .filter((permission): permission is PermissionNode => Boolean(permission)),
    [flatPermissions, selectedPermissionIds],
  )

  const resourceTree = useMemo<TreeNode[]>(
    () => permissionTree.map((node) => toTreeNode(node)),
    [],
  )

  const summary = useMemo(() => {
    const counts: Record<ResourceSummaryType, number> = {
      group: 0,
      action: 0,
      menu: 0,
      api: 0,
    }

    for (const resource of selectedResources) {
      counts[resource.kind] += 1
    }

    return counts
  }, [selectedResources])

  return (
    <div className="w-full min-w-0 space-y-4">
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

      <Tabs
        value={activeRoleId}
        onValueChange={(roleId) => {
          setActiveRoleId(roleId)
          setSelectedPermissionIds(rolePermissionPresetMap[roleId] ?? [])
          setSearchValue("")
        }}
      >
        <div className="flex min-w-0 flex-col gap-3 rounded-[var(--ui-radius-lg)] border border-(--app-border) bg-(--app-panel) p-2 lg:flex-row lg:items-center lg:justify-between">
          <TabsList>
            {roles.map((role) => (
              <TabsTrigger key={role.id} value={role.id}>
                {role.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="hidden shrink-0 items-center gap-2 text-sm text-(--app-muted-text) md:flex">
            <ShieldCheck className="size-4" />
            已选择 {selectedPermissionIds.length} 项
          </div>
        </div>

        {roles.map((role) => (
          <TabsContent key={role.id} value={role.id}>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="grid min-w-0 gap-3 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
                    <div className="min-w-0">
                      <CardTitle>{role.name}</CardTitle>
                      <CardDescription>
                        编码：{role.code}。统一用权限树维护菜单分组、操作码和接口能力。
                      </CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline">恢复预设</Button>
                      <Button variant="primary">保存角色授权</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                      <Input
                        value={searchValue}
                        onValueChange={setSearchValue}
                        placeholder="搜索权限名称、编码或接口路径"
                      />
                      <div className="flex items-center gap-2 text-sm text-(--app-muted-text) md:hidden">
                        <ShieldCheck className="size-4" />
                        已选择 {selectedPermissionIds.length} 项
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3">
                      {[
                        {
                          icon: <ShieldCheck className="size-4" />,
                          label: "分组",
                          value: summary.group,
                        },
                        {
                          icon: <SquareMousePointer className="size-4" />,
                          label: "操作",
                          value: summary.action,
                        },
                        {
                          icon: <Waypoints className="size-4" />,
                          label: "API",
                          value: summary.api,
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="flex min-h-18 items-center justify-between rounded-[var(--ui-radius-md)] border border-(--app-border) px-4 py-3"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-(--app-active-bg)">
                              {item.icon}
                            </span>
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <span className="text-xl font-semibold">{item.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-[var(--ui-radius-md)] border border-(--app-border) p-3">
                      <TreeView
                        data={resourceTree}
                        value={selectedPermissionIds}
                        onValueChange={setSelectedPermissionIds}
                        defaultExpandedIds={["perm-admin-user", "perm-admin-access"]}
                        searchValue={searchValue}
                        maxHeight={520}
                        emptyLabel="没有匹配到权限项。"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>本次勾选明细</CardTitle>
                  <CardDescription>
                    当前角色已选择的权限资源，方便保存前快速核对。
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table ariaLabel="selected permissions">
                    <TableHeader>
                      <TableRow>
                        <TableHead>名称</TableHead>
                        <TableHead>类型</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedResources.map((resource) => (
                        <TableRow key={resource.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{resource.name}</p>
                              <p className="text-xs text-(--app-muted-text)">
                                {resource.code}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>{kindLabelMap[resource.kind]}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
