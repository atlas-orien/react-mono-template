import { lazy } from "react"

export const ProfilePage = lazy(() =>
  import("@/pages/protected/shared-pages").then((module) => ({
    default: module.ProfilePage,
  }))
)
