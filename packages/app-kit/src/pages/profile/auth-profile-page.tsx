import { ProfileAvatarSection } from "./profile-avatar-section"
import { ProfileEmailSection } from "./profile-email-section"
import { ProfileNameSection } from "./profile-name-section"
import { ProfilePasswordSection } from "./profile-password-section"
import type { AuthProfilePageProps } from "./types"

export function AuthProfilePage({ profile, labels }: AuthProfilePageProps) {
  return (
    <main className="w-full px-4 py-5 text-(--app-text) sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="border-b border-(--app-border) pb-4">
          <h1 className="text-2xl font-semibold tracking-normal">
            {labels.title}
          </h1>
        </header>

        <div className="grid gap-10 py-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <div className="space-y-8">
            <ProfileNameSection profile={profile} labels={labels} />
            <ProfileEmailSection profile={profile} labels={labels} />
            <ProfilePasswordSection profile={profile} labels={labels} />
          </div>
          <ProfileAvatarSection profile={profile} labels={labels} />
        </div>
      </div>
    </main>
  )
}
