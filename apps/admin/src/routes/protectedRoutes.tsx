import { Suspense, type ReactNode } from "react"
import type { RouteObject } from "react-router"
import { Navigate } from "react-router"
import { PageLoading, RouteErrorBoundary } from "@workspace/app-components"
import AppLayout from "@/layouts/AppLayout"
import {
  AdminUsersPage,
  DataTablePage,
  DashboardPage,
  MembersPage,
  OrdersPage,
  RolePermissionsPage,
  RolesPage,
  SettingsPage,
} from "@/routes/lazy/protectedPages"

function withSuspense(node: ReactNode) {
  return <Suspense fallback={<PageLoading />}>{node}</Suspense>
}

export const protectedRoutes: RouteObject = {
  path: "/",
  element: <AppLayout />,
  errorElement: <RouteErrorBoundary />,
  children: [
    {
      index: true, // Default path `/`
      element: withSuspense(<DashboardPage />),
    },
    {
      path: "orders",
      element: withSuspense(<OrdersPage />),
    },
    {
      path: "members",
      element: withSuspense(<MembersPage />),
    },
    {
      path: "access",
      element: <Navigate to="/access/admin-users" replace />,
    },
    {
      path: "access/admin-users",
      element: withSuspense(<AdminUsersPage />),
    },
    {
      path: "access/roles",
      element: withSuspense(<RolesPage />),
    },
    {
      path: "access/role-permissions",
      element: withSuspense(<RolePermissionsPage />),
    },
    {
      path: "settings",
      element: withSuspense(<SettingsPage />),
    },
    {
      path: "datatable",
      element: withSuspense(<DataTablePage />),
    },
  ],
}
