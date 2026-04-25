import type { TreeNode } from "@workspace/ui-components"
import type { RolePermissionTreeNode } from "@/api"
import type { PermissionSummaryType } from "../types"

export const permissionKindLabelMap: Record<PermissionSummaryType, string> = {
  group: "分组",
  action: "操作",
}

export function toTreeNode(node: RolePermissionTreeNode): TreeNode {
  return {
    id: String(node.id),
    label: node.name,
    searchText: node.name,
    children: node.children.map((child) => toTreeNode(child)),
  }
}

export function flattenPermissionTree(
  nodes: readonly RolePermissionTreeNode[]
): RolePermissionTreeNode[] {
  return nodes.flatMap((node) => [
    node,
    ...flattenPermissionTree(node.children),
  ])
}

export function collectCheckedPermissionIds(
  nodes: readonly RolePermissionTreeNode[]
): string[] {
  return flattenPermissionTree(nodes)
    .filter((node) => node.checked)
    .map((node) => String(node.id))
}

export function buildPermissionSummary(
  selectedResources: readonly RolePermissionTreeNode[]
): Record<PermissionSummaryType, number> {
  const counts: Record<PermissionSummaryType, number> = {
    group: 0,
    action: 0,
  }

  for (const resource of selectedResources) {
    counts[resource.kind] += 1
  }

  return counts
}
