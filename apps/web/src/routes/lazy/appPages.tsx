import { lazy } from "react"

export const HomePage = lazy(() => import("@/pages/protected/home"))

export const ProfilePage = lazy(() =>
  import("@/pages/protected/shared-pages").then((module) => ({
    default: module.ProfilePage,
  }))
)
