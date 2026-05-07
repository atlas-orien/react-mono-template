import { lazy } from "react"

export const HomePage = lazy(() => import("@/pages/site/home"))
export const ComplexWorkbenchPage = lazy(
  () => import("@/pages/site/complex-workbench")
)

export const ProfilePage = lazy(() =>
  import("@/pages/site/shared-pages").then((module) => ({
    default: module.ProfilePage,
  }))
)
