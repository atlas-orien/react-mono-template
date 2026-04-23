const messages = {
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
      toGuidePrefix: "Want to learn the AI workflow first?",
      toGuideAction: "Open Guide",
    },
    error: {
      invalidCredentials:
        "Login failed, please check your identifier and password.",
    },
  },
  guide: {
    title: "Guide: AI Workflow and Component Style Preview",
    subtitle:
      "This page is accessible without login. Review button styles first, then follow the AI workflow guide.",
    buttons: {
      title: "Button Variants and Color Styles",
      subtitle: "You can adjust the color scheme in the theme folder.",
      primary: "Primary",
      secondary: "Secondary",
      success: "Success",
      warning: "Warning",
      info: "Info",
      outline: "Outline",
      ghost: "Ghost",
      danger: "Danger",
    },
    guide: {
      title: "How to Build with AI in This Framework",
      intro:
        "Use a fixed request flow so AI follows project rules before coding.",
      step1: "1. Ask AI to read all files under ai_protocal first.",
      step2: "2. Ask AI to output a Todo checklist before making code changes.",
      step3:
        "3. Mark and strike each completed item to keep progress recoverable.",
      template:
        "Recommended prompt: Read the ai_protocal directory first. Create a Todo list first and strike through completed items. Then implement: <your requirement>.",
      tip:
        "This reduces communication overhead, improves recovery after interruptions, and keeps implementation structure consistent.",
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
