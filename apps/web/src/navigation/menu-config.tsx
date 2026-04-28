import type { ReactNode } from "react"
import { UserRound } from "lucide-react"

export interface WebNavigationItemConfig {
  id: string
  label: string
  labelKey?: string
  path: string
  icon?: ReactNode
  matcher?: (pathname: string) => boolean
}

export interface WebNavigationSectionConfig {
  id: string
  label: string
  labelKey?: string
  items: WebNavigationItemConfig[]
}

export const webNavigationSections: WebNavigationSectionConfig[] = [
  {
    id: "workspace",
    label: "Workspace",
    labelKey: "web.shell.navigation.workspace",
    items: [
      {
        id: "profile",
        label: "Profile",
        labelKey: "web.shell.navigation.profile",
        path: "/profile",
        icon: <UserRound />,
        matcher: (pathname) =>
          pathname === "/" || pathname.startsWith("/profile"),
      },
    ],
  },
]
