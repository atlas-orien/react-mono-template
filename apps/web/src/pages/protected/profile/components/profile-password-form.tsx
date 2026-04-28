import { useTranslation } from "react-i18next"
import { Button } from "@workspace/ui-components/stable/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui-components/stable/field"
import { Input } from "@workspace/ui-components/stable/input"
import type { ProfilePageModel } from "../types"

export interface ProfilePasswordFormProps {
  profile: ProfilePageModel
}

export function ProfilePasswordForm({ profile }: ProfilePasswordFormProps) {
  const { t } = useTranslation()
  const canChangePassword =
    profile.currentPassword.trim().length > 0 &&
    profile.newPassword.trim().length >= 8 &&
    profile.confirmPassword.trim().length > 0

  return (
    <section className="min-w-0 space-y-6">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold">
          {t("profile.sections.security")}
        </h2>
        <p className="text-sm text-(--app-muted-text)">
          {t("profile.help.password")}
        </p>
      </div>

      <FieldGroup>
        <Field>
          <FieldLabel>{t("profile.fields.currentPassword")}</FieldLabel>
          <Input
            type="password"
            value={profile.currentPassword}
            onValueChange={profile.setCurrentPassword}
            placeholder={t("profile.placeholders.currentPassword")}
            disabled={profile.passwordSaving}
          />
        </Field>

        <Field>
          <FieldLabel>{t("profile.fields.newPassword")}</FieldLabel>
          <Input
            type="password"
            value={profile.newPassword}
            onValueChange={profile.setNewPassword}
            placeholder={t("profile.placeholders.newPassword")}
            disabled={profile.passwordSaving}
          />
          <FieldDescription>
            {t("profile.help.newPassword")}
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel>{t("profile.fields.confirmPassword")}</FieldLabel>
          <Input
            type="password"
            value={profile.confirmPassword}
            onValueChange={profile.setConfirmPassword}
            placeholder={t("profile.placeholders.confirmPassword")}
            disabled={profile.passwordSaving}
          />
        </Field>
      </FieldGroup>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          variant="primary"
          onClick={() => void profile.changePassword()}
          disabled={profile.passwordSaving || !canChangePassword}
        >
          {profile.passwordSaving
            ? t("profile.actions.changingPassword")
            : t("profile.actions.changePassword")}
        </Button>
        {profile.passwordStatus ? (
          <span className="text-sm text-(--app-muted-text)">
            {profile.passwordStatus}
          </span>
        ) : null}
      </div>
    </section>
  )
}
