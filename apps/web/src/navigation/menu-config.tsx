import type { ReactNode } from "react"
import { BookOpenText, CircleHelp } from "lucide-react"

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
        id: "guide",
        label: "Guide",
        labelKey: "web.shell.navigation.guide",
        path: "/guide",
        icon: <BookOpenText />,
        matcher: (pathname) => pathname === "/" || pathname.startsWith("/guide"),
      },
      {
        id: "about",
        label: "About",
        labelKey: "web.shell.navigation.about",
        path: "/about",
        icon: <CircleHelp />,
        matcher: (pathname) => pathname.startsWith("/about"),
      },
    ],
  },
]
