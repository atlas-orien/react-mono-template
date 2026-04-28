import { useTranslation } from "react-i18next"
import { Button } from "@workspace/ui-components/stable/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui-components/stable/field"
import { Input } from "@workspace/ui-components/stable/input"
import { Separator } from "@workspace/ui-components/stable/separator"
import type { ProfilePageModel } from "../types"

export interface ProfileFormProps {
  profile: ProfilePageModel
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const { t } = useTranslation()
  const canSaveName = profile.name.trim() !== profile.displayName

  return (
    <section className="min-w-0 space-y-6 lg:order-1">
      <FieldGroup>
        <Field>
          <FieldLabel>{t("profile.fields.name")}</FieldLabel>
          <Input
            value={profile.name}
            onValueChange={profile.setName}
            placeholder={t("profile.placeholders.name")}
            disabled={profile.saving}
          />
          <FieldDescription>{t("profile.help.name")}</FieldDescription>
        </Field>
      </FieldGroup>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">
          {t("profile.sections.account")}
        </h2>
        <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-[max-content_minmax(0,1fr)]">
          <dt className="font-medium text-(--app-muted-text)">
            {t("profile.fields.id")}
          </dt>
          <dd className="min-w-0 truncate font-medium">{profile.displayId}</dd>

          <dt className="font-medium text-(--app-muted-text)">
            {t("profile.fields.email")}
          </dt>
          <dd className="min-w-0 truncate font-medium">{profile.email}</dd>
        </dl>
      </section>

      <Separator />

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          variant="primary"
          onClick={() => void profile.saveProfile()}
          disabled={profile.saving || !canSaveName}
        >
          {profile.saving
            ? t("profile.actions.saving")
            : t("profile.actions.save")}
        </Button>
        {profile.status ? (
          <span className="text-sm text-(--app-muted-text)">
            {profile.status}
          </span>
        ) : null}
      </div>
    </section>
  )
}
