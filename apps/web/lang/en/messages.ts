const messages = {
  web: {
    shell: {
      brand: {
        eyebrow: "Web App",
        title: "Web",
        description: "Member workspace",
      },
      navigation: {
        mobileLabel: "Primary navigation",
        workspace: "Workspace",
        profile: "Profile",
      },
      topbar: {
        meta: "Personal workspace",
      },
      account: {
        defaultName: "Member",
        defaultId: "member@example.com",
        logout: "Log out",
        actions: {
          profile: "Profile",
        },
      },
    },
  },
  login: {
    brand: "AI STANDARDIZED FRAMEWORK",
    hero: {
      titleLine1: "Describe your needs,",
      titleLine2: "let AI code by the framework.",
      desc1:
        "This is an AI-standardized development framework across pages, state, routes, APIs, and themes.",
      desc2:
        "You provide requirements, and AI implements features while following the project conventions.",
    },
    welcome: "WELCOME BACK",
    title: "Sign in to your account",
    subtitle:
      "Use your identifier and password to continue into the AI development workflow.",
    form: {
      password: {
        label: "Password",
        placeholder: "Enter password",
      },
      submit: "Sign in",
      submitting: "Signing in...",
      identifier: {
        label: "Identifier",
        placeholder: "Enter identifier",
      },
    },
    footer: {
      toRegisterPrefix: "Don't have an account?",
      toRegisterAction: "Register",
    },
    error: {
      invalidCredentials:
        "Login failed, please check your identifier and password.",
    },
  },
  profile: {
    title: "Profile",
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
      password: "Use at least 8 characters for your new password.",
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
      configured: "Configured",
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
  register: {
    brand: "AI STANDARDIZED FRAMEWORK",
    hero: {
      titleLine1: "Create your account,",
      titleLine2: "start AI development.",
      desc1:
        "After registering, you can let AI implement tasks with unified framework standards.",
      desc2:
        "Theme mode, i18n, and modular structure are ready for scalable iteration.",
    },
    welcome: "CREATE ACCOUNT",
    title: "Register your account",
    subtitle: "Fill in your information to get started.",
    form: {
      password: {
        label: "Password",
        placeholder: "Enter password",
      },
      confirmPassword: {
        label: "Confirm password",
        placeholder: "Enter password again",
      },
      submit: "Register",
      submitting: "Registering...",
      username: {
        label: "Username",
        placeholder: "Enter username",
      },
      displayName: {
        label: "Display name (optional)",
        placeholder: "Enter display name",
      },
      email: {
        label: "Email (optional)",
        placeholder: "Enter email",
      },
    },
    footer: {
      toLoginPrefix: "Already have an account?",
      toLoginAction: "Sign in",
    },
    error: {
      passwordMismatch: "Passwords do not match.",
    },
  },
} as const

export default messages
