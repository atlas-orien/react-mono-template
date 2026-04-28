import type { ReactNode } from "react"
import { House } from "lucide-react"

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
        id: "home",
        label: "Home",
        labelKey: "web.shell.navigation.home",
        path: "/home",
        icon: <House />,
        matcher: (pathname) => pathname === "/" || pathname === "/home",
      },
    ],
  },
]
