import { type ReactNode, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router"
import {
  CopyableText,
  LanguageSwitch,
  SidebarShell,
  ThemeToggle,
  TopBar,
} from "@workspace/app-components"
import type { RootState } from "@/store"
import { logout } from "@/store/authSlice"
import { webNavigationSections } from "@/navigation"

export interface WebAppShellProps {
  children: ReactNode
}

export function WebAppShell({ children }: WebAppShellProps) {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const user = useSelector((state: RootState) => state.auth.user)

  const sections = useMemo(
    () =>
      webNavigationSections.map((section) => ({
        key: section.id,
        label: t(section.labelKey ?? section.label, section.label),
        items: section.items.map((item) => {
          const active = item.matcher
            ? item.matcher(location.pathname)
            : location.pathname === item.path

          return {
            key: item.id,
            label: t(item.labelKey ?? item.label, item.label),
            href: item.path,
            active,
            icon: item.icon,
            onSelect: () => navigate(item.path),
          }
        }),
      })),
    [location.pathname, navigate, t]
  )

  const currentItem = webNavigationSections
    .flatMap((section) => section.items)
    .find((item) =>
      item.matcher ? item.matcher(location.pathname) : location.pathname === item.path
    )

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
    dispatch(logout())
    navigate("/login", { replace: true })
  }

  const displayName = user?.name || t("web.shell.account.defaultName", "Member")
  const displayId =
    user?.display_id ||
    user?.email ||
    t("web.shell.account.defaultId", "member@example.com")

  return (
    <SidebarShell
      brandEyebrow={t("web.shell.brand.eyebrow", "Web App")}
      brandTitle={t("web.shell.brand.title", "Web")}
      brandDescription={t("web.shell.brand.description", "Member workspace")}
      sections={sections}
      header={
        <TopBar
          title={
            currentItem
              ? t(currentItem.labelKey ?? currentItem.label, currentItem.label)
              : t("web.shell.brand.title", "Web")
          }
          meta={t("web.shell.topbar.meta", "Personal workspace")}
          trailing={[
            <LanguageSwitch key="lang" />,
            <ThemeToggle key="theme" />,
          ]}
        />
      }
      footerAccount={{
        avatarAlt: displayName,
        avatarSrc: user?.avatar,
        avatarFallback: displayName.charAt(0).toUpperCase(),
        displayName,
        displayId: (
          <CopyableText value={displayId} textClassName="block truncate">
            {displayId}
          </CopyableText>
        ),
        logout: {
          label: t("web.shell.account.logout", "Log out"),
          onSelect: handleLogout,
        },
      }}
    >
      {children}
    </SidebarShell>
  )
}
