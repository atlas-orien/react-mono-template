import { AuthProfilePage } from "@workspace/app-kit/profile"
import { useProfileLabels } from "./use-profile-labels"
import { useProfilePage } from "./use-profile-page"

export default function ProfilePage() {
  const profile = useProfilePage()
  const labels = useProfileLabels()

  return <AuthProfilePage profile={profile} labels={labels} />
}
