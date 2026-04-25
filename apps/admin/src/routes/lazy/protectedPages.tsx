import { lazy } from "react"

export const AdminUsersPage = lazy(
  () => import("@/pages/protected/access/admin-users"),
)
export const DashboardPage = lazy(() => import("@/pages/protected/dashboard"))
export const MenusPage = lazy(() => import("@/pages/protected/access/menus"))
export const OrdersPage = lazy(() => import("@/pages/protected/orders"))
export const RolePermissionsPage = lazy(
  () => import("@/pages/protected/access/role-permissions"),
)
export const RolesPage = lazy(() => import("@/pages/protected/access/roles"))
export const MembersPage = lazy(() => import("@/pages/protected/members"))
export const AccessBlueprintPage = lazy(
  () => import("@/pages/protected/access/blueprint"),
)
export const SettingsPage = lazy(() => import("@/pages/protected/settings"))
export const DataTablePage = lazy(() => import("@/pages/protected/data-table"))
export const UserRolesPage = lazy(
  () => import("@/pages/protected/access/user-roles"),
)
