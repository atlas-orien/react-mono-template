import { SearchInput, TreeView, type TreeNode } from "@workspace/ui-components"
import { Button } from "@workspace/ui-components/stable/button"
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
    <section className="space-y-4">
      <div>
        <div className="grid min-w-0 gap-3">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold">{activeRole.name}</h2>
            <p className="mt-1 text-sm text-(--app-muted-text)">
              编码：{activeRole.code}
              。服务端返回完整权限树，并标记当前角色已授权节点。
            </p>
          </div>
          <div className="flex flex-wrap justify-start gap-2">
            <Button variant="outline" onClick={onReset} disabled={isTreeLoading}>
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
      </div>

      <div className="space-y-4">
        <div className="w-full max-w-80">
          <SearchInput
            value={searchValue}
            onValueChange={onSearchChange}
            placeholder="搜索权限名称"
          />
        </div>

        <PermissionSummary selectedCount={selectedCount} summary={summary} />

        <div className="rounded-(--ui-radius-md) bg-(--app-panel) p-3">
          <TreeView
            data={resourceTree}
            value={selectedPermissionIds}
            onValueChange={onSelectedPermissionIdsChange}
            defaultExpandedIds={defaultExpandedIds}
            searchValue={searchValue}
            maxHeight={520}
            emptyLabel={isTreeLoading ? "权限树加载中。" : "没有匹配到权限项。"}
          />
        </div>
      </div>
    </section>
  )
}
