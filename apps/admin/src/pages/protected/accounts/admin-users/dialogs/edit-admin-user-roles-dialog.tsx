import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { QueryClient } from "@tanstack/react-query"
import type { TFunction } from "i18next"
import { toast } from "@workspace/ui-components"
import { Badge } from "@workspace/ui-components/stable/badge"
import { Button } from "@workspace/ui-components/stable/button"
import { Checkbox } from "@workspace/ui-components/stable/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui-components/stable/dialog"
import {
  listUserRolesApi,
  updateUserRolesApi,
  type UserRoleOptionResponse,
} from "@/api"
import { adminUsersQueryKey } from "../constants"
import type { AdminUserRow } from "../types"

const userRoleOptionsQueryKey = (userId: string) =>
  ["admin", "user-roles", userId] as const

export function EditAdminUserRolesDialog({
  onSaved,
  onOpenChange,
  open,
  row,
}: {
  onSaved: () => void
  onOpenChange: (open: boolean) => void
  open: boolean
  row: AdminUserRow | null
}) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const userId = row?.user_id ?? ""

  const rolesQuery = useQuery({
    queryKey: userRoleOptionsQueryKey(userId),
    queryFn: () => listUserRolesApi(userId),
    enabled: open && Boolean(userId),
  })

  const allRoleOptions = useMemo(() => rolesQuery.data ?? [], [rolesQuery.data])
  const visibleRoleOptions = useMemo(
    () => allRoleOptions.filter((role) => role.code !== "root"),
    [allRoleOptions]
  )
  const hiddenSelectedRoleIds = useMemo(
    () =>
      allRoleOptions
        .filter((role) => role.code === "root" && role.checked)
        .map((role) => role.id),
    [allRoleOptions]
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("admin.accounts.adminUsers.rolesDialog.title", {
              id: row ? ` ${row.display_id}` : "",
            })}
          </DialogTitle>
          <DialogDescription>
            {t("admin.accounts.adminUsers.rolesDialog.description")}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          {row ? (
            <div className="grid gap-1">
              <span className="text-sm font-medium">{row.display_name}</span>
              <span className="font-mono text-xs text-muted-foreground">
                {row.user_id}
              </span>
            </div>
          ) : null}

          {rolesQuery.isFetching ? (
            <div className="max-h-80 overflow-auto rounded-(--ui-radius-md) border border-(--app-border)">
              <div className="px-3 py-4 text-sm text-muted-foreground">
                {t("admin.accounts.adminUsers.rolesDialog.loading")}
              </div>
            </div>
          ) : visibleRoleOptions.length > 0 ? (
            <EditAdminUserRolesForm
              key={`${userId}:${rolesQuery.dataUpdatedAt}`}
              hiddenSelectedRoleIds={hiddenSelectedRoleIds}
              onClose={() => onOpenChange(false)}
              onSaved={onSaved}
              queryClient={queryClient}
              roleOptions={visibleRoleOptions}
              t={t}
              userId={userId}
            />
          ) : (
            <div className="max-h-80 overflow-auto rounded-(--ui-radius-md) border border-(--app-border)">
              <div className="px-3 py-4 text-sm text-muted-foreground">
                {t("admin.accounts.adminUsers.rolesDialog.empty")}
              </div>
            </div>
          )}
        </div>

        {rolesQuery.isFetching || visibleRoleOptions.length === 0 ? (
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {t("admin.accounts.adminUsers.rolesDialog.cancel")}
            </Button>
          </DialogFooter>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

function EditAdminUserRolesForm({
  hiddenSelectedRoleIds,
  onClose,
  onSaved,
  queryClient,
  roleOptions,
  t,
  userId,
}: {
  hiddenSelectedRoleIds: number[]
  onClose: () => void
  onSaved: () => void
  queryClient: QueryClient
  roleOptions: UserRoleOptionResponse[]
  t: TFunction
  userId: string
}) {
  const serverSelectedRoleIds = useMemo(
    () => roleOptions.filter((role) => role.checked).map((role) => role.id),
    [roleOptions]
  )
  const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>(
    serverSelectedRoleIds
  )

  const updateRolesMutation = useMutation({
    mutationFn: () =>
      updateUserRolesApi(userId, {
        roleIds: [...hiddenSelectedRoleIds, ...selectedRoleIds],
      }),
    onSuccess: async (roles) => {
      queryClient.setQueryData(userRoleOptionsQueryKey(userId), roles)
      await queryClient.refetchQueries({
        queryKey: adminUsersQueryKey,
      })
      onSaved()
      toast.success(t("admin.accounts.adminUsers.rolesDialog.success"))
      onClose()
    },
  })

  const toggleRole = (role: UserRoleOptionResponse, checked: boolean) => {
    setSelectedRoleIds((current) => {
      if (checked) {
        return current.includes(role.id) ? current : [...current, role.id]
      }

      return current.filter((roleId) => roleId !== role.id)
    })
  }

  const handleReset = () => {
    setSelectedRoleIds(serverSelectedRoleIds)
  }

  const handleSave = () => {
    updateRolesMutation.mutate()
  }

  return (
    <>
      <div className="max-h-80 overflow-auto rounded-(--ui-radius-md) border border-(--app-border)">
        {roleOptions.map((role) => {
          const checked = selectedRoleIds.includes(role.id)

          return (
            <label
              key={role.id}
              className="flex cursor-pointer items-start gap-3 border-b border-(--app-border) p-3 last:border-b-0"
            >
              <Checkbox
                checked={checked}
                disabled={updateRolesMutation.isPending}
                onCheckedChange={(value) => toggleRole(role, value === true)}
              />
              <span className="grid min-w-0 flex-1 gap-1">
                <span className="flex min-w-0 items-center gap-2">
                  <span className="truncate text-sm font-medium">
                    {role.name}
                  </span>
                  {checked ? (
                    <Badge variant="outline">
                      {t("admin.accounts.adminUsers.rolesDialog.selected")}
                    </Badge>
                  ) : null}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {role.code}
                </span>
              </span>
            </label>
          )
        })}
      </div>

      <DialogFooter>
        <Button
          variant="outline"
          onClick={onClose}
          disabled={updateRolesMutation.isPending}
        >
          {t("admin.accounts.adminUsers.rolesDialog.cancel")}
        </Button>
        <Button
          variant="outline"
          onClick={handleReset}
          disabled={updateRolesMutation.isPending}
        >
          {t("admin.accounts.adminUsers.rolesDialog.reset")}
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={updateRolesMutation.isPending}
        >
          {t("admin.accounts.adminUsers.rolesDialog.save")}
        </Button>
      </DialogFooter>
    </>
  )
}
