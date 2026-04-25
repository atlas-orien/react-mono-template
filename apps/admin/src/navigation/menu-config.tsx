import type { ReactNode } from "react"
import {
  LayoutDashboard,
  Settings,
  ShieldCheck,
} from "lucide-react"

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
        id: "access-control",
        label: "权限中心",
        icon: <ShieldCheck />,
        subItems: [
          {
            id: "admin-users",
            permissionCode: "admin:user",
            label: "后台账号",
            href: "/access/admin-users",
            matcher: (pathname) => pathname.startsWith("/access/admin-users"),
          },
          {
            id: "roles",
            permissionCode: "admin:role:list",
            label: "权限角色",
            href: "/access/roles",
            matcher: (pathname) => pathname.startsWith("/access/roles"),
          },
          {
            id: "role-permissions",
            permissionCode: "admin:role_permission:grant",
            label: "角色授权",
            href: "/access/role-permissions",
            matcher: (pathname) => pathname.startsWith("/access/role-permissions"),
          },
          {
            id: "user-roles",
            permissionCode: "admin:user_role:list",
            label: "用户角色",
            href: "/access/user-roles",
            matcher: (pathname) => pathname.startsWith("/access/user-roles"),
          },
          {
            id: "menu-access",
            permissionCode: "admin:access",
            label: "菜单配置",
            href: "/access/menus",
            matcher: (pathname) => pathname.startsWith("/access/menus"),
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
            permissionCode: "admin:access",
            label: "订单管理",
            href: "/orders",
            matcher: (pathname) => pathname.startsWith("/orders"),
          },
          {
            id: "members",
            permissionCode: "admin:access",
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
            permissionCode: "admin:access",
            label: "控制台",
            href: "/",
            matcher: (pathname) => pathname === "/",
          },
          {
            id: "settings",
            permissionCode: "admin:access",
            label: "系统设置",
            href: "/settings",
            matcher: (pathname) => pathname.startsWith("/settings"),
          },
          {
            id: "datatable-demo",
            permissionCode: "admin:access",
            label: "DataTable 示例",
            href: "/datatable",
            matcher: (pathname) => pathname.startsWith("/datatable"),
          },
        ],
      },
    ],
  },
]
