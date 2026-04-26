import { useEffect, type ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import {
  CopyableText,
  LanguageSwitch,
  NotificationDropdown,
  SidebarShell,
  ThemeToggle,
  WorkspaceTabs,
} from "@workspace/app-components"
import { TopBar } from "@workspace/app-components/top-bar"
import { logout } from "@/store/authSlice"
import { resetAccess } from "@/store/accessSlice"
import type { RootState } from "@/store"
import { useAdminNavigation } from "@/navigation"
import { accountActions } from "./account-actions"
import { getAdminNotifications } from "./admin-notifications"
import { useWorkspaceTabs } from "./use-workspace-tabs"

export interface AdminAppShellProps {
  children: ReactNode
}

export function AdminAppShell({ children }: AdminAppShellProps) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const user = useSelector((state: RootState) => state.auth.user)
  const { currentItem, defaultPath, hasVisibleMenus, isLoading, sections } =
    useAdminNavigation()
  const notifications = getAdminNotifications(t)
  const workspaceTabs = useWorkspaceTabs({
    currentPath: currentItem?.path ?? null,
    currentLabel: currentItem?.label ?? null,
    defaultPath,
  })

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
    dispatch(resetAccess())
    dispatch(logout())
    navigate("/login", { replace: true })
  }

  useEffect(() => {
    if (isLoading || currentItem || !defaultPath || !hasVisibleMenus) {
      return
    }

    navigate(defaultPath, { replace: true })
  }, [currentItem, defaultPath, hasVisibleMenus, isLoading, navigate])

  return (
    <SidebarShell
      brandEyebrow={t("admin.shell.brand.eyebrow", "Workspace")}
      brandTitle={t("admin.shell.brand.title", "Admin")}
      brandDescription={t("admin.shell.brand.description", "Enterprise")}
      sections={sections}
      header={
        <>
          <TopBar
            title={currentItem?.label ?? t("admin.shell.brand.title", "Admin")}
            trailing={[
              <NotificationDropdown
                key="notifications"
                label={t("admin.shell.notifications.label", "Notifications")}
                panelTitle={t(
                  "admin.shell.notifications.title",
                  "Notifications"
                )}
                markAllLabel={t(
                  "admin.shell.notifications.actions.markAllRead",
                  "Mark all as read"
                )}
                emptyLabel={t(
                  "admin.shell.notifications.empty",
                  "You're all caught up."
                )}
                items={notifications}
              />,
              <LanguageSwitch key="lang" />,
              <ThemeToggle key="theme" />,
            ]}
          />
          <WorkspaceTabs
            label={t("admin.shell.workspaceTabs.label", "History")}
            items={workspaceTabs.items}
          />
        </>
      }
      footerAccount={{
        avatarAlt: user?.name ?? "Admin",
        avatarSrc: user?.avatar,
        avatarFallback: (user?.name ?? "A").charAt(0).toUpperCase(),
        displayName: user?.name ?? "Admin",
        displayId: (
          <CopyableText
            value={
              user?.display_id || user?.email || "workspace-admin@example.com"
            }
            textClassName="block truncate"
          >
            {user?.display_id || user?.email || "workspace-admin@example.com"}
          </CopyableText>
        ),
        logout: {
          label: t("admin.shell.account.logout", "Log out"),
          onSelect: handleLogout,
        },
        actions: accountActions.map((action) => ({
          ...action,
          label: t(action.labelKey, action.label),
          onSelect: () => navigate(action.path),
        })),
      }}
    >
      {children}
    </SidebarShell>
  )
}
