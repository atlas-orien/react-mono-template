import { useMemo, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ShieldCheck, SquareMousePointer } from "lucide-react"
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
import { toast } from "@workspace/ui-components"
import {
  listRolePermissionsApi,
  listRolesApi,
  updateRolePermissionsApi,
  type PermissionKind,
  type RolePermissionTreeNode,
} from "@/api"

type PermissionSummaryType = Extract<PermissionKind, "group" | "action">

const kindLabelMap: Record<PermissionSummaryType, string> = {
  group: "分组",
  action: "操作",
}

const rolesQueryKey = ["admin", "role-permissions", "roles"] as const
const emptyPermissionTree: RolePermissionTreeNode[] = []

function rolePermissionQueryKey(roleId: string) {
  return ["admin", "role-permissions", roleId] as const
}

function toTreeNode(node: RolePermissionTreeNode): TreeNode {
  return {
    id: String(node.id),
    label: node.name,
    searchText: node.name,
    children: node.children.map((child) => toTreeNode(child)),
  }
}

function flattenPermissionTree(
  nodes: readonly RolePermissionTreeNode[]
): RolePermissionTreeNode[] {
  return nodes.flatMap((node) => [
    node,
    ...flattenPermissionTree(node.children),
  ])
}

function collectCheckedPermissionIds(
  nodes: readonly RolePermissionTreeNode[]
): string[] {
  return flattenPermissionTree(nodes)
    .filter((node) => node.checked)
    .map((node) => String(node.id))
}

export default function RolePermissionsPage() {
  const queryClient = useQueryClient()
  const [activeRoleId, setActiveRoleId] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [selectedPermissionIdsByRole, setSelectedPermissionIdsByRole] = useState<
    Record<string, string[]>
  >({})

  const rolesQuery = useQuery({
    queryKey: rolesQueryKey,
    queryFn: listRolesApi,
  })

  const roles = rolesQuery.data ?? []
  const resolvedActiveRoleId = activeRoleId || (roles[0] ? String(roles[0].id) : "")

  const rolePermissionsQuery = useQuery({
    queryKey: rolePermissionQueryKey(resolvedActiveRoleId),
    queryFn: () => listRolePermissionsApi(Number(resolvedActiveRoleId)),
    enabled: resolvedActiveRoleId.length > 0,
  })

  const updateRolePermissionsMutation = useMutation({
    mutationFn: async () => {
      const permissionIds = selectedPermissionIds.map((id) => Number(id))

      return updateRolePermissionsApi(Number(resolvedActiveRoleId), {
        permission_ids: permissionIds,
      })
    },
    onSuccess: (tree) => {
      queryClient.setQueryData(rolePermissionQueryKey(resolvedActiveRoleId), tree)
      setSelectedPermissionIdsByRole((current) => ({
        ...current,
        [resolvedActiveRoleId]: collectCheckedPermissionIds(tree),
      }))
      toast.success("角色授权已保存")
    },
  })

  const activeRole = roles.find((role) => String(role.id) === resolvedActiveRoleId)
  const permissionTree = rolePermissionsQuery.data ?? emptyPermissionTree
  const serverSelectedPermissionIds = useMemo(
    () => collectCheckedPermissionIds(permissionTree),
    [permissionTree]
  )
  const selectedPermissionIds =
    Object.prototype.hasOwnProperty.call(
      selectedPermissionIdsByRole,
      resolvedActiveRoleId
    )
      ? selectedPermissionIdsByRole[resolvedActiveRoleId]
      : serverSelectedPermissionIds
  const flatPermissions = useMemo(
    () => flattenPermissionTree(permissionTree),
    [permissionTree]
  )
  const selectedResources = useMemo(
    () =>
      selectedPermissionIds
        .map((id) => flatPermissions.find((permission) => String(permission.id) === id))
        .filter(
          (permission): permission is RolePermissionTreeNode => Boolean(permission)
        ),
    [flatPermissions, selectedPermissionIds]
  )
  const resourceTree = useMemo<TreeNode[]>(
    () => permissionTree.map((node) => toTreeNode(node)),
    [permissionTree]
  )
  const defaultExpandedIds = useMemo(
    () => permissionTree.map((node) => String(node.id)),
    [permissionTree]
  )
  const summary = useMemo(() => {
    const counts: Record<PermissionSummaryType, number> = {
      group: 0,
      action: 0,
    }

    for (const resource of selectedResources) {
      counts[resource.kind] += 1
    }

    return counts
  }, [selectedResources])

  const resetSelection = () => {
    setSelectedPermissionIdsByRole((current) => ({
      ...current,
      [resolvedActiveRoleId]: serverSelectedPermissionIds,
    }))
  }

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

      {roles.length > 0 ? (
        <Tabs
          value={resolvedActiveRoleId}
          onValueChange={(roleId) => {
            setActiveRoleId(roleId)
            setSearchValue("")
          }}
        >
          <div className="flex min-w-0 flex-col gap-3 rounded-[var(--ui-radius-lg)] border border-(--app-border) bg-(--app-panel) p-2 lg:flex-row lg:items-center lg:justify-between">
            <TabsList>
              {roles.map((role) => (
                <TabsTrigger key={role.id} value={String(role.id)}>
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
            <TabsContent key={role.id} value={String(role.id)}>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="grid min-w-0 gap-3 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
                      <div className="min-w-0">
                        <CardTitle>{role.name}</CardTitle>
                        <CardDescription>
                          编码：{role.code}。服务端返回完整权限树，并标记当前角色已授权节点。
                        </CardDescription>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          onClick={resetSelection}
                          disabled={rolePermissionsQuery.isFetching}
                        >
                          重置勾选
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => updateRolePermissionsMutation.mutate()}
                          disabled={
                            !activeRole ||
                            rolePermissionsQuery.isFetching ||
                            updateRolePermissionsMutation.isPending
                          }
                        >
                          保存角色授权
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                        <Input
                          value={searchValue}
                          onValueChange={setSearchValue}
                          placeholder="搜索权限名称"
                        />
                        <div className="flex items-center gap-2 text-sm text-(--app-muted-text) md:hidden">
                          <ShieldCheck className="size-4" />
                          已选择 {selectedPermissionIds.length} 项
                        </div>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
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
                          onValueChange={(value) => {
                            setSelectedPermissionIdsByRole((current) => ({
                              ...current,
                              [resolvedActiveRoleId]: value,
                            }))
                          }}
                          defaultExpandedIds={defaultExpandedIds}
                          searchValue={searchValue}
                          maxHeight={520}
                          emptyLabel={
                            rolePermissionsQuery.isLoading
                              ? "权限树加载中。"
                              : "没有匹配到权限项。"
                          }
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
                              <span className="font-medium">{resource.name}</span>
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
