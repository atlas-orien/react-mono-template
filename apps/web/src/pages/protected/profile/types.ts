import type { AvatarUploadResult } from "@workspace/app-components"

export interface ProfilePageModel {
  userAvatar?: string
  displayName: string
  displayId: string
  email: string
  avatarFallback: string
  name: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
  saving: boolean
  passwordSaving: boolean
  status: string
  passwordStatus: string
  setName: (value: string) => void
  setCurrentPassword: (value: string) => void
  setNewPassword: (value: string) => void
  setConfirmPassword: (value: string) => void
  saveProfile: () => Promise<void>
  changePassword: () => Promise<void>
  uploadAvatar: (result: AvatarUploadResult) => Promise<void>
  removeAvatar: () => Promise<void>
}
