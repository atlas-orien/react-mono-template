import { useEffect, useRef, useState, type ReactNode } from "react"
import { Camera, Mail, ShieldCheck } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { AvatarUploadField, CopyableText } from "@workspace/app-components"
import { Button } from "@workspace/ui-components/stable/button"
import { Input } from "@workspace/ui-components/stable/input"
import { NativeSelect } from "@workspace/ui-components/stable/native-select"
import { Textarea } from "@workspace/ui-components/stable/textarea"
import { meApi, updateProfileApi } from "@/api"
import type { RootState } from "@/store"
import { updateUser } from "@/store/authSlice"

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "U"
}

export default function ProfilePage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)
  const displayName = user?.name || t("profile.fallback.name")
  const displayId = user?.display_id || user?.id || t("profile.fallback.id")
  const email = user?.email || t("profile.fallback.email")
  const avatarFallback = getInitial(displayName)
  const [name, setName] = useState(displayName)
  const [bio, setBio] = useState("")
  const [url, setUrl] = useState("")
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState("")
  const avatarMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setName(displayName)
  }, [displayName])

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!avatarMenuRef.current) return
      if (!avatarMenuRef.current.contains(event.target as Node)) {
        setAvatarMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handlePointerDown)
    return () => document.removeEventListener("mousedown", handlePointerDown)
  }, [])

  const refreshMe = async () => {
    const nextUser = await meApi()
    dispatch(updateUser(nextUser))
  }

  const handleSave = async () => {
    setSaving(true)
    setStatus("")
    try {
      await updateProfileApi({ displayName: name.trim() || null })
      await refreshMe()
      setStatus(t("profile.status.saved"))
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : t("profile.status.failed")
      )
    } finally {
      setSaving(false)
    }
  }

  const handleRemoveAvatar = async () => {
    setSaving(true)
    setStatus("")
    try {
      await updateProfileApi({ avatar: null })
      await refreshMe()
      setAvatarMenuOpen(false)
      setStatus(t("profile.status.avatarRemoved"))
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : t("profile.status.failed")
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="w-full px-4 py-5 text-(--app-text) sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="border-b border-(--app-border) pb-4">
          <h1 className="text-2xl font-semibold tracking-normal">
            {t("profile.title")}
          </h1>
        </header>

        <div className="grid gap-10 py-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <section className="min-w-0 space-y-6 lg:order-1">
            <label className="block space-y-2">
              <span className="text-sm font-semibold">
                {t("profile.fields.name")}
              </span>
              <Input
                value={name}
                onValueChange={setName}
                placeholder={t("profile.placeholders.name")}
                disabled={saving}
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
                value={user?.email ? user.email : ""}
                onValueChange={() => undefined}
                disabled
                placeholder={t("profile.placeholders.email")}
                options={
                  user?.email ? [{ label: user.email, value: user.email }] : []
                }
              />
              <span className="block text-sm/6 text-(--app-muted-text)">
                {t("profile.help.email")}
              </span>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-semibold">
                {t("profile.fields.bio")}
              </span>
              <Textarea
                value={bio}
                onValueChange={setBio}
                placeholder={t("profile.placeholders.bio")}
                disabled
                rows={4}
              />
              <span className="block text-sm/6 text-(--app-muted-text)">
                {t("profile.help.bio")}
              </span>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-semibold">
                {t("profile.fields.url")}
              </span>
              <Input
                value={url}
                onValueChange={setUrl}
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
                  value={displayId}
                  copyable={Boolean(displayId)}
                />
                <ReadonlyInfo
                  icon={<Mail />}
                  label={t("profile.fields.email")}
                  value={email}
                  copyable={Boolean(user?.email)}
                />
              </div>
            </section>

            <div className="flex flex-wrap items-center gap-3 border-t border-(--app-border) pt-5">
              <Button
                type="button"
                variant="primary"
                onClick={() => void handleSave()}
                disabled={saving || name.trim() === displayName}
              >
                {saving
                  ? t("profile.actions.saving")
                  : t("profile.actions.save")}
              </Button>
              {status ? (
                <span className="text-sm text-(--app-muted-text)">
                  {status}
                </span>
              ) : null}
            </div>
          </section>

          <aside className="min-w-0 lg:order-2">
            <div className="space-y-3">
              <h2 className="text-sm font-semibold">
                {t("profile.avatar.title")}
              </h2>
              <div className="relative w-fit" ref={avatarMenuRef}>
                <div className="size-48 overflow-hidden rounded-full bg-[#0f1724] ring-1 ring-(--app-border) sm:size-56">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={displayName}
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center bg-[#1c2431] text-6xl font-semibold text-white">
                      {avatarFallback}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setAvatarMenuOpen((current) => !current)}
                  className="absolute right-3 bottom-4 inline-flex h-9 items-center gap-2 rounded-md border border-(--app-border) bg-(--surface) px-3 text-sm font-semibold text-(--app-text) shadow-(--ui-shadow-soft) transition hover:bg-(--app-active-bg)"
                >
                  <Camera className="size-4" />
                  {t("profile.avatar.edit")}
                </button>

                {avatarMenuOpen ? (
                  <div className="absolute right-0 z-30 mt-2 w-44 overflow-hidden rounded-md border border-(--app-border) bg-(--surface) p-1 shadow-(--ui-shadow-soft)">
                    <AvatarUploadField
                      value={user?.avatar}
                      alt={displayName}
                      fallback={avatarFallback}
                      disabled={saving}
                      onUploaded={async (result) => {
                        setSaving(true)
                        setStatus("")
                        try {
                          await updateProfileApi({ avatar: result.key })
                          await refreshMe()
                          setAvatarMenuOpen(false)
                          setStatus(t("profile.status.avatarSaved"))
                        } finally {
                          setSaving(false)
                        }
                      }}
                      onError={(error) => setStatus(error.message)}
                      renderTrigger={({
                        openFileDialog,
                        disabled,
                        uploading,
                      }) => (
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
                      onClick={() => void handleRemoveAvatar()}
                      disabled={saving || !user?.avatar}
                      className="flex w-full items-center rounded px-3 py-2 text-left text-sm font-medium transition hover:bg-(--app-active-bg) disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {t("profile.avatar.remove")}
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

function ReadonlyInfo({
  icon,
  label,
  value,
  copyable,
}: {
  icon: ReactNode
  label: string
  value: string
  copyable: boolean
}) {
  return (
    <div className="min-w-0 rounded-lg border border-(--app-border) bg-(--surface) p-3">
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-(--app-muted-text) [&_svg]:size-4">
        {icon}
        <span>{label}</span>
      </div>
      <div className="min-w-0 text-sm font-medium">
        {copyable ? (
          <CopyableText value={value} textClassName="truncate">
            {value}
          </CopyableText>
        ) : (
          <span className="block truncate">{value}</span>
        )}
      </div>
    </div>
  )
}
