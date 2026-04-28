import type { AvatarUploadResult } from "@workspace/app-components"

export interface ProfilePageModel {
  userAvatar?: string
  displayName: string
  displayId: string
  email: string
  hasEmail: boolean
  avatarFallback: string
  name: string
  emailInput: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
  saving: boolean
  emailSaving: boolean
  passwordSaving: boolean
  status: string
  emailStatus: string
  passwordStatus: string
  setName: (value: string) => void
  setEmailInput: (value: string) => void
  setCurrentPassword: (value: string) => void
  setNewPassword: (value: string) => void
  setConfirmPassword: (value: string) => void
  saveProfile: () => Promise<void>
  saveEmail: () => Promise<void>
  changePassword: () => Promise<void>
  uploadAvatar: (result: AvatarUploadResult) => Promise<void>
  removeAvatar: () => Promise<void>
}
