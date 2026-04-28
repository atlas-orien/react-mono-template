import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import type { AvatarUploadResult } from "@workspace/app-components"
import { meApi, updateProfileApi } from "@/api"
import type { RootState } from "@/store"
import { updateUser } from "@/store/authSlice"
import type { ProfilePageModel } from "./types"

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "U"
}

export function useProfilePage(): ProfilePageModel {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)
  const displayName = user?.name || t("profile.fallback.name")
  const displayId = user?.display_id || user?.id || t("profile.fallback.id")
  const email = user?.email || t("profile.fallback.email")
  const [name, setName] = useState(displayName)
  const [bio, setBio] = useState("")
  const [url, setUrl] = useState("")
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState("")

  useEffect(() => {
    setName(displayName)
  }, [displayName])

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
    email,
    avatarFallback: getInitial(displayName),
    name,
    bio,
    url,
    saving,
    status,
    setName,
    setBio,
    setUrl,
    saveProfile,
    uploadAvatar,
    removeAvatar,
  }
}
