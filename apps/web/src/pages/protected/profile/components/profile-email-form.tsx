import { useState } from "react"
import { Mail } from "lucide-react"
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

export interface ProfileEmailFormProps {
  profile: ProfilePageModel
}

export function ProfileEmailForm({ profile }: ProfileEmailFormProps) {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)
  const canSaveEmail =
    profile.emailInput.trim().length > 0 &&
    profile.emailInput.trim() !== profile.email

  return (
    <section className="min-w-0 border-t border-(--app-border) py-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-4">
          <span className="mt-1 flex size-5 shrink-0 items-center justify-center text-(--app-muted-text)">
            <Mail className="size-5" />
          </span>
          <div className="min-w-0 space-y-1">
            <h2 className="text-sm font-semibold">
              {t("profile.sections.email")}
            </h2>
            <p className="truncate text-sm text-(--app-muted-text)">
              {profile.hasEmail
                ? t("profile.email.configured")
                : t("profile.email.notSet")}
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="default"
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded
            ? t("profile.actions.hideEmail")
            : profile.hasEmail
              ? t("profile.actions.changeEmail")
              : t("profile.actions.setEmail")}
        </Button>
      </div>

      {expanded ? (
        <div className="mt-6 max-w-xl pl-9">
          <FieldGroup>
            <Field>
              <FieldLabel>{t("profile.fields.email")}</FieldLabel>
              <Input
                type="email"
                value={profile.emailInput}
                onValueChange={profile.setEmailInput}
                placeholder={t("profile.placeholders.email")}
                disabled={profile.emailSaving}
              />
              <FieldDescription>
                {profile.hasEmail
                  ? profile.email
                  : t("profile.help.emailNotSet")}
              </FieldDescription>
            </Field>
          </FieldGroup>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="primary"
              onClick={() => void profile.saveEmail()}
              disabled={profile.emailSaving || !canSaveEmail}
            >
              {profile.emailSaving
                ? t("profile.actions.savingEmail")
                : profile.hasEmail
                  ? t("profile.actions.updateEmail")
                  : t("profile.actions.setEmail")}
            </Button>
            {profile.emailStatus ? (
              <span className="text-sm text-(--app-muted-text)">
                {profile.emailStatus}
              </span>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  )
}
