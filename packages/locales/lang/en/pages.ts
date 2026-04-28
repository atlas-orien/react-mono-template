const pages = {
  profile: {
    title: "Profile",
    loading: "Loading profile...",
    errorTitle: "Profile failed to load",
    sections: {
      account: "Account details",
      email: "Email",
      security: "Password",
    },
    fields: {
      id: "ID",
      email: "Email",
      name: "Name",
      currentPassword: "Current password",
      newPassword: "New password",
      confirmPassword: "Confirm password",
    },
    placeholders: {
      name: "Enter your display name",
      email: "Enter email address",
      currentPassword: "Enter current password",
      newPassword: "Enter new password",
      confirmPassword: "Enter new password again",
    },
    help: {
      name: "Your name may appear around this app where you contribute or are mentioned.",
      emailNotSet: "Set an email address for account recovery and notifications.",
      newPassword: "The new password must be at least 8 characters.",
    },
    avatar: {
      title: "Profile picture",
      edit: "Edit",
      upload: "Upload a photo...",
      uploading: "Uploading...",
      remove: "Remove photo",
      removeConfirm: {
        title: "Remove profile picture?",
        description:
          "Your current profile picture will be removed from your account.",
        cancel: "Cancel",
        action: "Remove photo",
      },
    },
    password: {
      configured: "Configured",
    },
    email: {
      notSet: "Not set. Add an email address.",
    },
    actions: {
      save: "Save profile",
      saving: "Saving...",
      setEmail: "Set email",
      changeEmail: "Change email",
      hideEmail: "Hide",
      updateEmail: "Update email",
      savingEmail: "Saving...",
      changePassword: "Change password",
      hidePassword: "Hide",
      updatePassword: "Update password",
      changingPassword: "Changing...",
    },
    status: {
      saved: "Profile saved.",
      failed: "Profile update failed.",
      avatarSaved: "Profile picture updated.",
      avatarRemoved: "Profile picture removed.",
      emailSaved: "Email updated.",
      passwordChanged: "Password changed.",
      passwordMismatch: "New passwords do not match.",
    },
    fallback: {
      id: "Unknown ID",
      email: "Email not set",
      name: "Member",
    },
  },
} as const

export default pages
