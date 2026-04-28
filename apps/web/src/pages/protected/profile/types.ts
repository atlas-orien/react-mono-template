import type { AvatarUploadResult } from "@workspace/app-components"

export interface ProfilePageModel {
  userAvatar?: string
  displayName: string
  displayId: string
  email: string
  avatarFallback: string
  name: string
  bio: string
  url: string
  saving: boolean
  status: string
  setName: (value: string) => void
  setBio: (value: string) => void
  setUrl: (value: string) => void
  saveProfile: () => Promise<void>
  uploadAvatar: (result: AvatarUploadResult) => Promise<void>
  removeAvatar: () => Promise<void>
}
