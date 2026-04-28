import { Mail, ShieldCheck } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "@workspace/ui-components/stable/button"
import { Input } from "@workspace/ui-components/stable/input"
import { NativeSelect } from "@workspace/ui-components/stable/native-select"
import { Textarea } from "@workspace/ui-components/stable/textarea"
import type { ProfilePageModel } from "../types"
import { ReadonlyInfo } from "./readonly-info"

export interface ProfileFormProps {
  profile: ProfilePageModel
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const { t } = useTranslation()
  const canSaveName = profile.name.trim() !== profile.displayName

  return (
    <section className="min-w-0 space-y-6 lg:order-1">
      <label className="block space-y-2">
        <span className="text-sm font-semibold">
          {t("profile.fields.name")}
        </span>
        <Input
          value={profile.name}
          onValueChange={profile.setName}
          placeholder={t("profile.placeholders.name")}
          disabled={profile.saving}
        />
        <span className="block text-sm/6 text-(--app-muted-text)">
          {t("profile.help.name")}
        </span>
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-semibold">
          {t("profile.fields.publicEmail")}
        </span>
        <NativeSelect
          value={profile.email}
          onValueChange={() => undefined}
          disabled
          placeholder={t("profile.placeholders.email")}
          options={
            profile.email
              ? [{ label: profile.email, value: profile.email }]
              : []
          }
        />
        <span className="block text-sm/6 text-(--app-muted-text)">
          {t("profile.help.email")}
        </span>
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-semibold">{t("profile.fields.bio")}</span>
        <Textarea
          value={profile.bio}
          onValueChange={profile.setBio}
          placeholder={t("profile.placeholders.bio")}
          disabled
          rows={4}
        />
        <span className="block text-sm/6 text-(--app-muted-text)">
          {t("profile.help.bio")}
        </span>
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-semibold">{t("profile.fields.url")}</span>
        <Input
          value={profile.url}
          onValueChange={profile.setUrl}
          placeholder={t("profile.placeholders.url")}
          disabled
          type="url"
        />
      </label>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">
          {t("profile.sections.account")}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ReadonlyInfo
            icon={<ShieldCheck />}
            label={t("profile.fields.id")}
            value={profile.displayId}
            copyable={Boolean(profile.displayId)}
          />
          <ReadonlyInfo
            icon={<Mail />}
            label={t("profile.fields.email")}
            value={profile.email}
            copyable={Boolean(profile.email)}
          />
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3 border-t border-(--app-border) pt-5">
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
