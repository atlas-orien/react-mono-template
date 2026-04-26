import { ShieldCheck } from "lucide-react"
import { TreeView, type TreeNode } from "@workspace/ui-components"
import { Button } from "@workspace/ui-components/stable/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui-components/stable/card"
import { Input } from "@workspace/ui-components/stable/input"
import type { RoleResponse } from "@/api"
import { PermissionSummary } from "./permission-summary"
import type { PermissionSummaryType } from "../types"

export function RolePermissionEditor({
  activeRole,
  defaultExpandedIds,
  isSaving,
  isTreeLoading,
  onReset,
  onSave,
  onSearchChange,
  onSelectedPermissionIdsChange,
  resourceTree,
  searchValue,
  selectedCount,
  selectedPermissionIds,
  summary,
}: {
  activeRole: RoleResponse
  defaultExpandedIds: string[]
  isSaving: boolean
  isTreeLoading: boolean
  onReset: () => void
  onSave: () => void
  onSearchChange: (value: string) => void
  onSelectedPermissionIdsChange: (value: string[]) => void
  resourceTree: TreeNode[]
  searchValue: string
  selectedCount: number
  selectedPermissionIds: string[]
  summary: Record<PermissionSummaryType, number>
}) {
  return (
    <Card>
      <CardHeader>
        <div className="grid min-w-0 gap-3 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
          <div className="min-w-0">
            <CardTitle>{activeRole.name}</CardTitle>
            <CardDescription>
              编码：{activeRole.code}
              。服务端返回完整权限树，并标记当前角色已授权节点。
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={onReset}
              disabled={isTreeLoading}
            >
              重置勾选
            </Button>
            <Button
              variant="primary"
              onClick={onSave}
              disabled={isTreeLoading || isSaving}
            >
              保存 App 角色授权
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <Input
              value={searchValue}
              onValueChange={onSearchChange}
              placeholder="搜索权限名称"
            />
            <div className="flex items-center gap-2 text-sm text-(--app-muted-text) md:hidden">
              <ShieldCheck className="size-4" />
              已选择 {selectedCount} 项
            </div>
          </div>

          <PermissionSummary summary={summary} />

          <div className="rounded-(--ui-radius-md) border border-(--app-border) p-3">
            <TreeView
              data={resourceTree}
              value={selectedPermissionIds}
              onValueChange={onSelectedPermissionIdsChange}
              defaultExpandedIds={defaultExpandedIds}
              searchValue={searchValue}
              maxHeight={520}
              emptyLabel={
                isTreeLoading ? "权限树加载中。" : "没有匹配到权限项。"
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
