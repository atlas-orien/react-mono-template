import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router"

const STORAGE_KEY = "admin.workspace-tabs"

interface PersistedWorkspaceTab {
  path: string
}

interface UseWorkspaceTabsOptions {
  currentPath: string | null
  defaultPath: string | null
  labelsByPath: Record<string, string>
}

function readStoredTabs() {
  if (typeof window === "undefined") {
    return [] as PersistedWorkspaceTab[]
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)

    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw) as PersistedWorkspaceTab[]
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter(
      (item) => typeof item?.path === "string" && item.path.length > 0
    )
  } catch {
    return []
  }
}

function writeStoredTabs(tabs: PersistedWorkspaceTab[]) {
  if (typeof window === "undefined") {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tabs))
}

export function useWorkspaceTabs({
  currentPath,
  defaultPath,
  labelsByPath,
}: UseWorkspaceTabsOptions) {
  const location = useLocation()
  const navigate = useNavigate()
  const [tabs, setTabs] = useState<PersistedWorkspaceTab[]>(() =>
    readStoredTabs()
  )

  useEffect(() => {
    if (!currentPath) {
      return
    }

    setTabs((previous) => {
      const nextTab: PersistedWorkspaceTab = {
        path: currentPath,
      }

      const nextTabs = previous.some((item) => item.path === currentPath)
        ? previous.map((item) =>
            item.path === currentPath
              ? {
                  ...item,
                }
              : item
          )
        : [...previous, nextTab]

      writeStoredTabs(nextTabs)
      return nextTabs
    })
  }, [currentPath])

  const items = useMemo(
    () =>
      tabs
        .filter((tab) => Boolean(labelsByPath[tab.path]))
        .map((tab) => ({
          key: tab.path,
          href: tab.path,
          label: labelsByPath[tab.path] ?? tab.path,
          active: location.pathname === tab.path,
          onSelect: () => navigate(tab.path),
          onClose: () => {
            setTabs((previous) => {
              if (previous.length <= 1) {
                return previous
              }

              const closingIndex = previous.findIndex(
                (item) => item.path === tab.path
              )
              const nextTabs = previous.filter((item) => item.path !== tab.path)

              writeStoredTabs(nextTabs)

              if (location.pathname === tab.path) {
                const fallbackTab =
                  nextTabs[closingIndex - 1] ??
                  nextTabs[closingIndex] ??
                  nextTabs[nextTabs.length - 1]

                navigate(fallbackTab?.path ?? defaultPath ?? "/", {
                  replace: true,
                })
              }

              return nextTabs
            })
          },
        })),
    [defaultPath, labelsByPath, location.pathname, navigate, tabs]
  )

  return {
    clear: () => {
      const fallbackPath = currentPath ?? defaultPath
      const nextTabs = fallbackPath ? [{ path: fallbackPath }] : []

      writeStoredTabs(nextTabs)
      setTabs(nextTabs)
    },
    items,
  }
}
