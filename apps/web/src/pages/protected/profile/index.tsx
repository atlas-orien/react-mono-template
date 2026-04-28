import { useTranslation } from "react-i18next"
import { ProfileAvatar } from "./components/profile-avatar"
import { ProfileForm } from "./components/profile-form"
import { useProfilePage } from "./use-profile-page"

export default function ProfilePage() {
  const { t } = useTranslation()
  const profile = useProfilePage()

  return (
    <main className="w-full px-4 py-5 text-(--app-text) sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="border-b border-(--app-border) pb-4">
          <h1 className="text-2xl font-semibold tracking-normal">
            {t("profile.title")}
          </h1>
        </header>

        <div className="grid gap-10 py-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <ProfileForm profile={profile} />
          <ProfileAvatar profile={profile} />
        </div>
      </div>
    </main>
  )
}
