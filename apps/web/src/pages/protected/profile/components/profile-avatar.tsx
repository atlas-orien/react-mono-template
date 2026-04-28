import { useEffect, useRef, useState } from "react"
import { Camera } from "lucide-react"
import { useTranslation } from "react-i18next"
import { AvatarUploadField } from "@workspace/app-components"
import type { ProfilePageModel } from "../types"

export interface ProfileAvatarProps {
  profile: ProfilePageModel
}

export function ProfileAvatar({ profile }: ProfileAvatarProps) {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!menuRef.current) return
      if (!menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handlePointerDown)
    return () => document.removeEventListener("mousedown", handlePointerDown)
  }, [])

  return (
    <aside className="min-w-0 lg:order-2">
      <div className="space-y-3">
        <h2 className="text-sm font-semibold">{t("profile.avatar.title")}</h2>
        <div className="relative w-fit" ref={menuRef}>
          <div className="size-48 overflow-hidden rounded-full bg-[#0f1724] ring-1 ring-(--app-border) sm:size-56">
            {profile.userAvatar ? (
              <img
                src={profile.userAvatar}
                alt={profile.displayName}
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center bg-[#1c2431] text-6xl font-semibold text-white">
                {profile.avatarFallback}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="absolute right-3 bottom-4 inline-flex h-9 items-center gap-2 rounded-md border border-(--app-border) bg-(--surface) px-3 text-sm font-semibold text-(--app-text) shadow-(--ui-shadow-soft) transition hover:bg-(--app-active-bg)"
          >
            <Camera className="size-4" />
            {t("profile.avatar.edit")}
          </button>

          {menuOpen ? (
            <div className="absolute right-0 z-30 mt-2 w-44 overflow-hidden rounded-md border border-(--app-border) bg-(--surface) p-1 shadow-(--ui-shadow-soft)">
              <AvatarUploadField
                value={profile.userAvatar}
                alt={profile.displayName}
                fallback={profile.avatarFallback}
                disabled={profile.saving}
                onUploaded={async (result) => {
                  await profile.uploadAvatar(result)
                  setMenuOpen(false)
                }}
                renderTrigger={({ openFileDialog, disabled, uploading }) => (
                  <button
                    type="button"
                    onClick={openFileDialog}
                    disabled={disabled}
                    className="flex w-full items-center rounded px-3 py-2 text-left text-sm font-medium transition hover:bg-(--app-active-bg) disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {uploading
                      ? t("profile.avatar.uploading")
                      : t("profile.avatar.upload")}
                  </button>
                )}
              />
              <button
                type="button"
                onClick={() => {
                  void profile.removeAvatar()
                  setMenuOpen(false)
                }}
                disabled={profile.saving || !profile.userAvatar}
                className="flex w-full items-center rounded px-3 py-2 text-left text-sm font-medium transition hover:bg-(--app-active-bg) disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t("profile.avatar.remove")}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  )
}
