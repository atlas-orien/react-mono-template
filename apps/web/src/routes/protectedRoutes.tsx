import { Suspense, type ReactNode } from "react"
import type { RouteObject } from "react-router"
import { PageLoading, RouteErrorBoundary } from "@workspace/app-kit"
import AppLayout from "@/layouts/AppLayout"
import { ProfilePage } from "@/routes/lazy/protectedPages"

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
      element: withSuspense(<ProfilePage />),
    },
    {
      path: "profile",
      element: withSuspense(<ProfilePage />),
    },
  ],
}
