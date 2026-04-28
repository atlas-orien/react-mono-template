import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { AvatarUploadField } from "@workspace/app-components"
import { meApi, updateProfileApi } from "@/api"
import type { RootState } from "@/store"
import { updateUser } from "@/store/authSlice"

export default function HeaderMe() {
  const { t } = useTranslation("components")
  const dispatch = useDispatch()
  const me = useSelector((state: RootState) => state.auth.user)
  const [menuOpen, setMenuOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return
      if (!menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", onClickOutside)
    return () => {
      document.removeEventListener("mousedown", onClickOutside)
    }
  }, [])

  if (!me) {
    return null
  }

  const displayName = me.name || t("header.me.fallbackName")
  const avatarText = displayName.charAt(0).toUpperCase()
  const avatarUrl = me.avatar || ""

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => {
            setMenuOpen((prev) => !prev)
          }}
          className="inline-flex items-center gap-3 rounded-full border border-(--app-border) bg-(--app-surface) px-3 py-2 text-sm text-(--app-text) shadow-(--ui-shadow-soft) transition hover:bg-(--app-active-bg)"
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="size-9 rounded-full object-cover"
            />
          ) : (
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-(--app-active-bg) font-semibold text-(--app-text)">
              {avatarText}
            </span>
          )}
          <span className="max-w-32 truncate font-medium">{displayName}</span>
          <svg
            className={`size-4 transition ${menuOpen ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 011.08 1.04l-4.25 4.51a.75.75 0 01-1.08 0l-4.25-4.51a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {menuOpen && (
          <div className="absolute right-0 z-20 mt-2 min-w-44 rounded-xl border border-(--app-border) bg-(--app-surface) p-1 shadow-(--ui-shadow-soft)">
            <AvatarUploadField
              value={avatarUrl}
              alt={displayName}
              fallback={avatarText}
              onUploaded={async (result) => {
                await updateProfileApi({ avatar: result.key })
                const nextUser = await meApi()
                dispatch(updateUser(nextUser))
                setMenuOpen(false)
              }}
              renderTrigger={({
                openFileDialog,
                disabled: uploadDisabled,
                uploading,
              }) => (
                <button
                  type="button"
                  onClick={openFileDialog}
                  disabled={uploadDisabled}
                  className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-(--app-text) transition hover:bg-(--app-active-bg) disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {uploading
                    ? t("avatarUpload.uploading")
                    : t("header.me.uploadAvatar")}
                </button>
              )}
            />
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-(--app-text) transition hover:bg-(--app-active-bg)"
            >
              {t("header.me.profile")}
            </Link>
            <Link
              to="/logout"
              onClick={() => setMenuOpen(false)}
              className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-(--destructive) transition hover:bg-(--app-active-bg)"
            >
              {t("header.me.logout")}
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
