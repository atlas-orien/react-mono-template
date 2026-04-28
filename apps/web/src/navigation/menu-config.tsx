import type { ReactNode } from "react"

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

export const webNavigationSections: WebNavigationSectionConfig[] = []
