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
import { Separator } from "@workspace/ui-components/stable/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui-components/stable/table"
import {
  permissionResourceTree,
  flattenPermissionResources,
  roleProfiles,
  type PermissionResourceNode,
} from "./_shared/access-shared"

type ResourceSummaryType = "menu" | "button" | "api"

const resourceTypeCopy: Record<ResourceSummaryType, string> = {
  menu: "菜单",
  button: "按钮",
  api: "API",
}

const resourceTypeAccent: Record<ResourceSummaryType, string> = {
  menu: "MN",
  button: "BT",
  api: "AP",
}

export default function AccessPage() {
  const [activeRoleId, setActiveRoleId] = useState(roleProfiles[1]?.id ?? "")
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<string[]>(
    roleProfiles[1]?.presetIds ?? [],
  )
  const [searchValue, setSearchValue] = useState("")

  const activeRole =
    roleProfiles.find((role) => role.id === activeRoleId) ?? roleProfiles[0]

  const flatResources = useMemo(
    () => flattenPermissionResources(permissionResourceTree),
    [],
  )

  const resourceTree = useMemo<TreeNode[]>(
    () => permissionResourceTree.map((node) => toTreeNode(node)),
    [],
  )

  const selectedResources = useMemo(
    () =>
      selectedPermissionIds
        .map((id) => flatResources.find((resource) => resource.id === id))
        .filter((resource): resource is PermissionResourceNode => Boolean(resource)),
    [flatResources, selectedPermissionIds],
  )

  const summary = useMemo(() => {
    const counts: Record<ResourceSummaryType, number> = {
      menu: 0,
      button: 0,
      api: 0,
    }

    for (const resource of selectedResources) {
      counts[resource.type] += 1
    }

    return counts
  }, [selectedResources])

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <Badge variant="outline">Role Permission</Badge>
          <CardTitle>角色权限配置</CardTitle>
          <CardDescription>
            统一用资源树管理菜单、按钮、API 三类权限，二级菜单单独编码并作为核心功能入口。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            {([
              {
                label: "菜单权限",
                value: `${summary.menu}`,
                description: "一级菜单 + 二级菜单都走同一套编码规则。",
                marker: resourceTypeAccent.menu,
              },
              {
                label: "按钮权限",
                value: `${summary.button}`,
                description: "页面内操作统一映射按钮码，前端按码显隐。",
                marker: resourceTypeAccent.button,
              },
              {
                label: "API 权限",
                value: `${summary.api}`,
                description: "接口权限作为最终兜底，不依赖菜单可见性。",
                marker: resourceTypeAccent.api,
              },
            ]).map((item) => (
              <div
                key={item.label}
                className="rounded-(--ui-radius-lg) border border-(--app-border) bg-(--app-panel) p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-(--app-muted-text)">{item.label}</p>
                    <p className="mt-2 text-2xl font-semibold">{item.value}</p>
                    <p className="mt-2 text-sm text-(--app-muted-text)">
                      {item.description}
                    </p>
                  </div>
                  <span className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-xl bg-(--app-active-bg) text-sm font-semibold text-(--app-muted-text)">
                    {item.marker}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)_360px]">
        <Card>
          <CardHeader>
            <CardTitle>角色列表</CardTitle>
            <CardDescription>切换角色后，右侧资源树会按预设权限集回填。</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {roleProfiles.map((role) => {
                const active = role.id === activeRoleId

                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => {
                      setActiveRoleId(role.id)
                      setSelectedPermissionIds(role.presetIds)
                    }}
                    className={`w-full rounded-(--ui-radius-lg) border px-4 py-3 text-left transition ${
                      active
                        ? "border-(--app-accent) bg-(--app-active-bg)"
                        : "border-(--app-border) bg-(--app-panel)"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium">{role.name}</p>
                        <p className="mt-1 text-sm text-(--app-muted-text)">
                          {role.description}
                        </p>
                      </div>
                      <Badge variant={active ? "default" : "outline"}>
                        {role.userCount} 人
                      </Badge>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-(--app-muted-text)">
                      <span>编码：{role.code}</span>
                      <span>范围：{role.scope}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <CardTitle>{activeRole?.name}</CardTitle>
                <CardDescription>
                  资源树里菜单支持两级，按钮和 API 作为叶子节点统一配置。
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">套用默认模板</Button>
                <Button variant="primary">保存权限配置</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
                <Input
                  value={searchValue}
                  onValueChange={setSearchValue}
                  placeholder="搜索菜单、按钮码或 API 路径"
                />
                <div className="flex items-center gap-2 text-sm text-(--app-muted-text)">
                  <ShieldCheck className="size-4" />
                  已选择 {selectedPermissionIds.length} 项资源
                </div>
              </div>

              <div className="rounded-(--ui-radius-lg) border border-(--app-border) p-3">
                <TreeView
                  data={resourceTree}
                  value={selectedPermissionIds}
                  onValueChange={setSelectedPermissionIds}
                  defaultExpandedIds={[
                    "menu:order-center",
                    "menu:system",
                    "menu:system.role-permission",
                  ]}
                  searchValue={searchValue}
                  maxHeight={540}
                  emptyLabel="没有匹配到权限资源。"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>本次配置摘要</CardTitle>
              <CardDescription>
                用于确认同一个角色下是否同时具备菜单可见、按钮可点和 API 可调三层能力。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {([
                  {
                    icon: <ShieldCheck className="size-4" />,
                    label: "菜单",
                    value: summary.menu,
                  },
                  {
                    icon: <SquareMousePointer className="size-4" />,
                    label: "按钮",
                    value: summary.button,
                  },
                  {
                    icon: <Waypoints className="size-4" />,
                    label: "API",
                    value: summary.api,
                  },
                ]).map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-(--ui-radius-lg) border border-(--app-border) p-3"
                  >
                    <div className="flex items-center gap-2 text-sm">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <span className="text-lg font-semibold">{item.value}</span>
                  </div>
                ))}
                <Separator />
                <div className="text-sm text-(--app-muted-text)">
                  建议后端保存时同时校验：
                  `menu.system.role-permission`
                  是否绑定对应 API，避免只开菜单不放接口。
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>已选资源</CardTitle>
              <CardDescription>编码、类型和路径放在一起，便于直接映射到后端表结构。</CardDescription>
            </CardHeader>
            <CardContent>
              <Table ariaLabel="selected permission resources">
                <TableHeader>
                  <TableRow>
                    <TableHead>资源</TableHead>
                    <TableHead>类型</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedResources.slice(0, 8).map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{resource.name}</div>
                          <div className="text-xs text-(--app-muted-text)">
                            {resource.code}
                            {resource.path ? ` · ${resource.path}` : ""}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{resourceTypeCopy[resource.type]}</TableCell>
                    </TableRow>
                  ))}
                  {selectedResources.length > 8 ? (
                    <TableRow>
                      <TableCell colSpan={2}>
                        <span className="text-sm text-(--app-muted-text)">
                          还有 {selectedResources.length - 8} 项已选资源，保存时一起提交。
                        </span>
                      </TableCell>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function toTreeNode(node: PermissionResourceNode): TreeNode {
  return {
    id: node.id,
    searchText: [node.name, node.code, node.path, node.method, node.description]
      .filter(Boolean)
      .join(" "),
    label: (
      <div className="flex min-w-0 items-center gap-2">
        <Badge variant="outline">{resourceTypeCopy[node.type]}</Badge>
        <div className="min-w-0">
          <div className="truncate font-medium">{node.name}</div>
          <div className="truncate text-xs text-(--app-muted-text)">
            {node.code}
            {node.level ? ` · ${node.level}级菜单` : ""}
            {node.path ? ` · ${node.path}` : ""}
          </div>
        </div>
      </div>
    ),
    children: node.children?.map((child) => toTreeNode(child)),
  }
}
