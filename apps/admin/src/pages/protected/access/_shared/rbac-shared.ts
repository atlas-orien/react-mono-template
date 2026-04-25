export interface AdminUserRecord {
  id: string
  name: string
  email: string
  status: "启用" | "停用"
  lastLogin: string
  roles: string[]
}

export interface RoleRecord {
  id: string
  code: string
  name: string
  scope: string
  userCount: number
  permissionCount: number
  description: string
}

export interface PermissionNode {
  id: string
  code: string
  name: string
  kind: "group" | "menu" | "action" | "api"
  path?: string
  description: string
  children?: PermissionNode[]
}

export interface MenuNode {
  id: number
  name: string
  path: string
  permissionCode: string
  level: 1 | 2
  children?: MenuNode[]
}

export const adminUsers: AdminUserRecord[] = [
  {
    id: "9d64d1f0-2c54-4608-b8a0-87b0f6137001",
    name: "Avery Chen",
    email: "avery.chen@example.com",
    status: "启用",
    lastLogin: "2026-04-21 10:24",
    roles: ["超级管理员"],
  },
  {
    id: "fef40457-6344-4255-a4c7-9a1e303355b0",
    name: "Mila Zhou",
    email: "mila.zhou@example.com",
    status: "启用",
    lastLogin: "2026-04-21 09:40",
    roles: ["权限管理员", "审计员"],
  },
  {
    id: "c16e2f5d-4227-4d86-b7a4-45cbd827f527",
    name: "Noah Lin",
    email: "noah.lin@example.com",
    status: "停用",
    lastLogin: "2026-04-18 20:16",
    roles: ["运营主管"],
  },
]

export const roles: RoleRecord[] = [
  {
    id: "role-root",
    code: "root",
    name: "超级管理员",
    scope: "全局",
    userCount: 2,
    permissionCount: 18,
    description: "拥有后台全量读写能力，负责最终权限发布。",
  },
  {
    id: "role-security-admin",
    code: "security_admin",
    name: "权限管理员",
    scope: "权限域",
    userCount: 5,
    permissionCount: 11,
    description: "维护角色、权限和授权关系，不直接处理业务订单。",
  },
  {
    id: "role-ops-manager",
    code: "ops_manager",
    name: "运营主管",
    scope: "业务域",
    userCount: 14,
    permissionCount: 7,
    description: "负责业务运营，允许查看部分系统配置。",
  },
]

export const permissionTree: PermissionNode[] = [
  {
    id: "perm-admin-user",
    code: "admin:user",
    name: "后台账号",
    kind: "group",
    description: "后台管理员用户域。",
    children: [
      {
        id: "perm-admin-user-list",
        code: "admin:user:list",
        name: "查看后台账号",
        kind: "action",
        description: "查看后台账号列表。",
      },
      {
        id: "perm-admin-user-create",
        code: "admin:user:create",
        name: "创建后台账号",
        kind: "action",
        description: "创建新的后台账号。",
      },
      {
        id: "perm-admin-user-role-list",
        code: "admin:user_role:list",
        name: "查看用户角色",
        kind: "action",
        description: "查询指定用户绑定的角色。",
      },
      {
        id: "perm-admin-user-role-assign",
        code: "admin:user_role:assign",
        name: "分配用户角色",
        kind: "action",
        description: "给后台账号分配角色。",
      },
    ],
  },
  {
    id: "perm-admin-access",
    code: "admin:access",
    name: "权限中心",
    kind: "group",
    description: "权限系统入口。",
    children: [
      {
        id: "perm-admin-role-list",
        code: "admin:role:list",
        name: "查看角色",
        kind: "action",
        description: "查看角色列表。",
      },
      {
        id: "perm-admin-role-create",
        code: "admin:role:create",
        name: "创建角色",
        kind: "action",
        description: "新增角色定义。",
      },
      {
        id: "perm-admin-permission-list",
        code: "admin:permission:list",
        name: "查看权限资源",
        kind: "action",
        description: "查询权限树与资源定义。",
      },
      {
        id: "perm-admin-permission-create",
        code: "admin:permission:create",
        name: "创建权限资源",
        kind: "action",
        description: "新增权限节点。",
      },
      {
        id: "perm-admin-role-permission-grant",
        code: "admin:role_permission:grant",
        name: "角色授权",
        kind: "action",
        description: "给角色分配权限。",
      },
    ],
  },
]

export const menuTree: MenuNode[] = [
  {
    id: 100,
    name: "权限中心",
    path: "/access",
    permissionCode: "admin:access",
    level: 1,
    children: [
      {
        id: 110,
        name: "后台账号",
        path: "/access/admin-users",
        permissionCode: "admin:user",
        level: 2,
      },
      {
        id: 120,
        name: "权限角色",
        path: "/access/roles",
        permissionCode: "admin:role:list",
        level: 2,
      },
      {
        id: 140,
        name: "角色授权",
        path: "/access/role-permissions",
        permissionCode: "admin:role_permission:grant",
        level: 2,
      },
    ],
  },
]

export function flattenPermissionTree(
  nodes: PermissionNode[]
): PermissionNode[] {
  return nodes.flatMap((node) => [
    node,
    ...flattenPermissionTree(node.children ?? []),
  ])
}

export function collectPermissionIds(nodes: PermissionNode[]): string[] {
  return flattenPermissionTree(nodes).map((node) => node.id)
}

export const rolePermissionPresetMap: Record<string, string[]> = {
  "role-root": collectPermissionIds(permissionTree),
  "role-security-admin": [
    "perm-admin-access",
    "perm-admin-role-list",
    "perm-admin-role-create",
    "perm-admin-permission-list",
    "perm-admin-permission-create",
    "perm-admin-role-permission-grant",
    "perm-admin-user",
    "perm-admin-user-role-list",
    "perm-admin-user-role-assign",
  ],
  "role-ops-manager": [
    "perm-admin-access",
    "perm-admin-role-list",
    "perm-admin-permission-list",
    "perm-admin-user",
    "perm-admin-user-role-list",
  ],
}
