import type { ReactNode } from "react"
import {
  LayoutDashboard,
  Settings,
  ShieldCheck,
  UsersRound,
} from "lucide-react"

export interface NavigationSubItemConfig {
  id: string
  permissionCode: string
  label: string
  labelKey?: string
  href: string
  matcher?: (pathname: string) => boolean
}

export interface NavigationItemConfig {
  id: string
  permissionCode?: string
  label: string
  labelKey?: string
  path?: string
  icon?: ReactNode
  subItems?: NavigationSubItemConfig[]
}

export interface NavigationSectionConfig {
  id: string
  label: string
  items: NavigationItemConfig[]
}

export const navigationSections: NavigationSectionConfig[] = [
  {
    id: "platform",
    label: "Platform",
    items: [
      {
        id: "dashboard",
        permissionCode: "dashboard",
        label: "控制台",
        labelKey: "admin.navigation.dashboard",
        path: "/",
        icon: <LayoutDashboard />,
      },
      {
        id: "account-management",
        label: "账号管理",
        labelKey: "admin.navigation.accountManagement",
        icon: <UsersRound />,
        subItems: [
          {
            id: "admin-users",
            permissionCode: "accounts:admin_users",
            label: "后台账号",
            labelKey: "admin.navigation.adminUsers",
            href: "/accounts/admin-users",
            matcher: (pathname) => pathname.startsWith("/accounts/admin-users"),
          },
          {
            id: "app-users",
            permissionCode: "accounts:app_users",
            label: "App 用户",
            labelKey: "admin.navigation.appUsers",
            href: "/accounts/app-users",
            matcher: (pathname) => pathname.startsWith("/accounts/app-users"),
          },
        ],
      },
      {
        id: "access-control",
        label: "权限中心",
        labelKey: "admin.navigation.accessControl",
        icon: <ShieldCheck />,
        subItems: [
          {
            id: "roles",
            permissionCode: "access_control:roles",
            label: "权限角色",
            labelKey: "admin.navigation.roles",
            href: "/access/roles",
            matcher: (pathname) => pathname.startsWith("/access/roles"),
          },
          {
            id: "role-permissions",
            permissionCode: "access_control:role_permissions",
            label: "角色授权",
            labelKey: "admin.navigation.rolePermissions",
            href: "/access/role-permissions",
            matcher: (pathname) =>
              pathname.startsWith("/access/role-permissions"),
          },
          {
            id: "app-roles",
            permissionCode: "access_control:app_roles",
            label: "App 角色",
            labelKey: "admin.navigation.appRoles",
            href: "/access/app-roles",
            matcher: (pathname) => pathname.startsWith("/access/app-roles"),
          },
          {
            id: "app-role-permissions",
            permissionCode: "access_control:app_role_permissions",
            label: "App 角色授权",
            labelKey: "admin.navigation.appRolePermissions",
            href: "/access/app-role-permissions",
            matcher: (pathname) =>
              pathname.startsWith("/access/app-role-permissions"),
          },
        ],
      },
      {
        id: "system",
        label: "开发示例",
        labelKey: "admin.navigation.examples",
        icon: <Settings />,
        subItems: [
          {
            id: "datatable-demo",
            permissionCode: "access_control",
            label: "DataTable 示例",
            labelKey: "admin.navigation.datatableDemo",
            href: "/datatable",
            matcher: (pathname) => pathname.startsWith("/datatable"),
          },
        ],
      },
    ],
  },
]
