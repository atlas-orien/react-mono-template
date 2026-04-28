import { useTranslation } from "react-i18next"
import { AvatarPhotoEditor } from "@workspace/app-components"
import type { ProfilePageModel } from "../types"

export interface ProfileAvatarProps {
  profile: ProfilePageModel
}

export function ProfileAvatar({ profile }: ProfileAvatarProps) {
  const { t } = useTranslation()

  return (
    <aside className="min-w-0 lg:order-2">
      <div className="space-y-3">
        <h2 className="text-sm font-semibold">{t("profile.avatar.title")}</h2>
        <AvatarPhotoEditor
          value={profile.userAvatar}
          alt={profile.displayName}
          fallback={profile.avatarFallback}
          disabled={profile.saving}
          labels={{
            edit: t("profile.avatar.edit"),
            upload: t("profile.avatar.upload"),
            uploading: t("profile.avatar.uploading"),
            remove: t("profile.avatar.remove"),
            removeConfirmTitle: t("profile.avatar.removeConfirm.title"),
            removeConfirmDescription: t(
              "profile.avatar.removeConfirm.description"
            ),
            removeConfirmCancel: t("profile.avatar.removeConfirm.cancel"),
            removeConfirmAction: t("profile.avatar.removeConfirm.action"),
          }}
          onUploaded={profile.uploadAvatar}
          onRemove={profile.removeAvatar}
        />
      </div>
    </aside>
  )
}
