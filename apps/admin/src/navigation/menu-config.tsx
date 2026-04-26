import type { ReactNode } from "react"
import { LayoutDashboard, Settings, ShieldCheck, UsersRound } from "lucide-react"

export interface NavigationSubItemConfig {
  id: string
  permissionCode: string
  label: string
  href: string
  matcher?: (pathname: string) => boolean
}

export interface NavigationItemConfig {
  id: string
  permissionCode?: string
  label: string
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
        id: "account-management",
        label: "账号管理",
        icon: <UsersRound />,
        subItems: [
          {
            id: "admin-users",
            permissionCode: "user:list",
            label: "后台账号",
            href: "/accounts/admin-users",
            matcher: (pathname) => pathname.startsWith("/accounts/admin-users"),
          },
          {
            id: "app-users",
            permissionCode: "app_user:list",
            label: "App 用户",
            href: "/accounts/app-users",
            matcher: (pathname) => pathname.startsWith("/accounts/app-users"),
          },
        ],
      },
      {
        id: "access-control",
        label: "权限中心",
        icon: <ShieldCheck />,
        subItems: [
          {
            id: "roles",
            permissionCode: "role:list",
            label: "权限角色",
            href: "/access/roles",
            matcher: (pathname) => pathname.startsWith("/access/roles"),
          },
          {
            id: "role-permissions",
            permissionCode: "role_permission:list",
            label: "角色授权",
            href: "/access/role-permissions",
            matcher: (pathname) =>
              pathname.startsWith("/access/role-permissions"),
          },
          {
            id: "app-roles",
            permissionCode: "app_role:list",
            label: "App 角色",
            href: "/access/app-roles",
            matcher: (pathname) => pathname.startsWith("/access/app-roles"),
          },
          {
            id: "app-role-permissions",
            permissionCode: "app_role_permission:list",
            label: "App 角色授权",
            href: "/access/app-role-permissions",
            matcher: (pathname) =>
              pathname.startsWith("/access/app-role-permissions"),
          },
        ],
      },
      {
        id: "operations",
        label: "运营中心",
        icon: <LayoutDashboard />,
        subItems: [
          {
            id: "orders",
            permissionCode: "access",
            label: "订单管理",
            href: "/orders",
            matcher: (pathname) => pathname.startsWith("/orders"),
          },
          {
            id: "members",
            permissionCode: "access",
            label: "会员管理",
            href: "/members",
            matcher: (pathname) => pathname.startsWith("/members"),
          },
        ],
      },
      {
        id: "system",
        label: "系统配置",
        icon: <Settings />,
        subItems: [
          {
            id: "dashboard",
            permissionCode: "access",
            label: "控制台",
            href: "/",
            matcher: (pathname) => pathname === "/",
          },
          {
            id: "settings",
            permissionCode: "access",
            label: "系统设置",
            href: "/settings",
            matcher: (pathname) => pathname.startsWith("/settings"),
          },
          {
            id: "datatable-demo",
            permissionCode: "access",
            label: "DataTable 示例",
            href: "/datatable",
            matcher: (pathname) => pathname.startsWith("/datatable"),
          },
        ],
      },
    ],
  },
]
