import { Mail, ShieldCheck } from "lucide-react"
import { useTranslation } from "react-i18next"
import { ReadonlyInfoCard } from "@workspace/app-components"
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
        <div className="grid gap-3 sm:grid-cols-2">
          <ReadonlyInfoCard
            icon={<ShieldCheck />}
            label={t("profile.fields.id")}
            value={profile.displayId}
            copyable={Boolean(profile.displayId)}
          />
          <ReadonlyInfoCard
            icon={<Mail />}
            label={t("profile.fields.email")}
            value={profile.email}
            copyable={Boolean(profile.email)}
          />
        </div>
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
