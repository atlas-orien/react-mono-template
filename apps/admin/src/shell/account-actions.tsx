import type { ReactNode } from "react"
import { BadgeCheck, Bell, CreditCard } from "lucide-react"

export interface AccountActionConfig {
  label: string
  labelKey: string
  icon: ReactNode
  path: string
}

export const accountActions: AccountActionConfig[] = [
  {
    icon: <BadgeCheck />,
    label: "Account",
    labelKey: "admin.shell.account.actions.account",
    path: "/accounts/admin-users",
  },
  {
    icon: <CreditCard />,
    label: "Billing",
    labelKey: "admin.shell.account.actions.billing",
    path: "/access",
  },
  {
    icon: <Bell />,
    label: "Notifications",
    labelKey: "admin.shell.account.actions.notifications",
    path: "/access",
  },
]
