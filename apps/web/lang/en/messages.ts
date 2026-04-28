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
        home: "Home",
        profile: "Profile",
      },
      topbar: {
        meta: "Personal workspace",
      },
      account: {
        defaultName: "Member",
        defaultId: "member@example.com",
        login: "Sign in",
        register: "Register",
        logout: "Log out",
        actions: {
          profile: "Profile",
        },
      },
    },
  },
  home: {
    welcome: "Welcome back",
    publicWelcome: "Welcome",
    publicTitle: "Web workspace",
    publicSubtitle: "Public app pages use the same layout before and after sign-in.",
    fallbackName: "Member",
    actions: {
      profile: "Edit profile",
      login: "Sign in",
    },
    account: {
      title: "Account ready",
      description:
        "Your signed-in workspace is active. Private app data stays behind authentication.",
    },
    publicAccount: {
      title: "Public access",
      description:
        "You can browse shared pages here. Private account data is only available after sign-in.",
    },
    profile: {
      title: "Profile settings",
      description:
        "Update your display name, avatar, email, and password from your profile page.",
    },
    publicProfile: {
      title: "Personal features",
      description:
        "Sign in to manage your profile, avatar, email, and password.",
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
