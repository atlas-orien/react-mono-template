import { type ReactNode, useMemo } from "react"
import { LogIn, UserPlus, UserRound } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router"
import {
  CopyableText,
  LanguageSwitch,
  type MobileBottomNavItem,
  SidebarShell,
  ThemeToggle,
  TopBar,
} from "@workspace/app-kit"
import { Button } from "@workspace/ui-components/stable/button"
import type { RootState } from "@/store"
import { logout } from "@/store/authSlice"
import { resetAccess } from "@/store/accessSlice"
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
  const mobileNavigationItems = useMemo<MobileBottomNavItem[]>(
    () =>
      webNavigationSections.flatMap((section) =>
        section.items.map((item) => {
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
        })
      ),
    [location.pathname, navigate, t]
  )

  const currentItem = webNavigationSections
    .flatMap((section) => section.items)
    .find((item) =>
      item.matcher
        ? item.matcher(location.pathname)
        : location.pathname === item.path
    )
  const topBarTitle =
    location.pathname.startsWith("/profile")
      ? t("pages:profile.title")
      : currentItem
        ? t(currentItem.labelKey ?? currentItem.label, currentItem.label)
        : t("web.shell.brand.title", "Web")

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
    dispatch(resetAccess())
    dispatch(logout())
    navigate("/home", { replace: true })
  }

  const isGuest = !user
  const displayName = user?.name || t("web.shell.account.guestName", "Guest")
  const displayId = user
    ? user.display_id || user.email || t("web.shell.account.defaultId")
    : t("web.shell.account.guestId", "Not signed in")

  const trailing = [
    <LanguageSwitch key="lang" />,
    <ThemeToggle key="theme" />,
    user ? null : (
      <Button key="login" variant="outline" size="sm" onClick={() => navigate("/login")}>
        {t("web.shell.account.login", "Sign in")}
      </Button>
    ),
    user ? null : (
      <Button key="register" size="sm" onClick={() => navigate("/register")}>
        {t("web.shell.account.register", "Register")}
      </Button>
    ),
  ].filter(Boolean) as ReactNode[]

  return (
    <SidebarShell
      brandEyebrow={t("web.shell.brand.eyebrow", "Web App")}
      brandTitle={t("web.shell.brand.title", "Web")}
      brandDescription={t("web.shell.brand.description", "Member workspace")}
      sections={sections}
      mobileNavigation={
        mobileNavigationItems.length
          ? {
              label: t(
                "web.shell.navigation.mobileLabel",
                "Primary navigation"
              ),
              items: mobileNavigationItems,
            }
          : undefined
      }
      header={
        <TopBar
          title={topBarTitle}
          meta={t("web.shell.topbar.meta", "Personal workspace")}
          trailing={trailing}
        />
      }
      footerAccount={
        {
          avatarAlt: displayName,
          avatarSrc: user?.avatar,
          avatarFallback: isGuest
            ? t("web.shell.account.guestFallback", "G")
            : displayName.charAt(0).toUpperCase(),
          displayName,
          displayId: user ? (
            <CopyableText value={displayId} textClassName="block truncate">
              {displayId}
            </CopyableText>
          ) : (
            <span className="block truncate">{displayId}</span>
          ),
          logout: user
            ? {
                label: t("web.shell.account.logout", "Log out"),
                onSelect: handleLogout,
              }
            : undefined,
          actions: user
            ? [
                {
                  icon: <UserRound />,
                  label: t("web.shell.account.actions.profile", "Profile"),
                  onSelect: () => navigate("/profile"),
                },
              ]
            : [
                {
                  icon: <LogIn />,
                  label: t("web.shell.account.login", "Sign in"),
                  onSelect: () => navigate("/login"),
                },
                {
                  icon: <UserPlus />,
                  label: t("web.shell.account.register", "Register"),
                  onSelect: () => navigate("/register"),
                },
              ],
        }
      }
    >
      {children}
    </SidebarShell>
  )
}
