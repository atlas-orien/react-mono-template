import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import type { AvatarUploadResult } from "@workspace/app-kit/file-upload"
import type { AuthProfileModel } from "@workspace/app-kit/profile"
import { meApi, updateEmailApi, updatePasswordApi, updateProfileApi } from "@/api"
import type { RootState } from "@/store"
import { updateUser } from "@/store/authSlice"

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "U"
}

export function useProfilePage(): AuthProfileModel {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)
  const displayName = user?.name || t("profile.fallback.name")
  const displayId = user?.display_id || user?.id || t("profile.fallback.id")
  const email = user?.email ?? ""
  const displayEmail = email || t("profile.fallback.email")
  const hasEmail = Boolean(email)
  const [name, setName] = useState(displayName)
  const [emailInput, setEmailInput] = useState(email)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [saving, setSaving] = useState(false)
  const [emailSaving, setEmailSaving] = useState(false)
  const [passwordSaving, setPasswordSaving] = useState(false)
  const [status, setStatus] = useState("")
  const [emailStatus, setEmailStatus] = useState("")
  const [passwordStatus, setPasswordStatus] = useState("")

  useEffect(() => {
    setName(displayName)
  }, [displayName])

  useEffect(() => {
    setEmailInput(email)
  }, [email])

  const refreshMe = async () => {
    const nextUser = await meApi()
    dispatch(updateUser(nextUser))
  }

  const resolveError = (error: unknown) =>
    error instanceof Error ? error.message : t("profile.status.failed")

  const saveProfile = async () => {
    setSaving(true)
    setStatus("")
    try {
      await updateProfileApi({ displayName: name.trim() || null })
      await refreshMe()
      setStatus(t("profile.status.saved"))
    } catch (error) {
      setStatus(resolveError(error))
    } finally {
      setSaving(false)
    }
  }

  const saveEmail = async () => {
    setEmailSaving(true)
    setEmailStatus("")
    try {
      await updateEmailApi({ email: emailInput.trim() || null })
      await refreshMe()
      setEmailStatus(t("profile.status.emailSaved"))
    } catch (error) {
      setEmailStatus(resolveError(error))
    } finally {
      setEmailSaving(false)
    }
  }

  const changePassword = async () => {
    setPasswordSaving(true)
    setPasswordStatus("")
    try {
      if (newPassword !== confirmPassword) {
        setPasswordStatus(t("profile.status.passwordMismatch"))
        return
      }

      await updatePasswordApi({
        oldPassword: currentPassword,
        newPassword,
      })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setPasswordStatus(t("profile.status.passwordChanged"))
    } catch (error) {
      setPasswordStatus(resolveError(error))
    } finally {
      setPasswordSaving(false)
    }
  }

  const uploadAvatar = async (result: AvatarUploadResult) => {
    setSaving(true)
    setStatus("")
    try {
      await updateProfileApi({ avatar: result.key })
      await refreshMe()
      setStatus(t("profile.status.avatarSaved"))
    } catch (error) {
      setStatus(resolveError(error))
      throw error
    } finally {
      setSaving(false)
    }
  }

  const removeAvatar = async () => {
    setSaving(true)
    setStatus("")
    try {
      await updateProfileApi({ avatar: null })
      await refreshMe()
      setStatus(t("profile.status.avatarRemoved"))
    } catch (error) {
      setStatus(resolveError(error))
    } finally {
      setSaving(false)
    }
  }

  return {
    userAvatar: user?.avatar,
    displayName,
    displayId,
    email: displayEmail,
    hasEmail,
    avatarFallback: getInitial(displayName),
    name,
    emailInput,
    currentPassword,
    newPassword,
    confirmPassword,
    saving,
    emailSaving,
    passwordSaving,
    status,
    emailStatus,
    passwordStatus,
    setName,
    setEmailInput,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
    saveProfile,
    saveEmail,
    changePassword,
    uploadAvatar,
    removeAvatar,
  }
}
