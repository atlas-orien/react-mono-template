const messages = {
  admin: {
    navigation: {
      dashboard: "Dashboard",
      accountManagement: "Accounts",
      adminUsers: "Admin Users",
      appUsers: "App Users",
      accessControl: "Access Control",
      roles: "Roles",
      rolePermissions: "Role Permissions",
      appRoles: "App Roles",
      appRolePermissions: "App Role Permissions",
      examples: "Examples",
      datatableDemo: "DataTable Demo",
    },
    shell: {
      brand: {
        eyebrow: "Workspace",
        title: "Admin",
        description: "Enterprise",
      },
      notifications: {
        label: "Notifications",
        title: "Notifications",
        empty: "You're all caught up.",
        actions: {
          markAllRead: "Mark all as read",
          markRead: "Mark as read",
          dismiss: "Dismiss",
        },
        items: {
          weeklyReports: {
            title: "14 new weekly reports arrived",
            description:
              "Review the latest regional summaries and flagged changes before the afternoon sync.",
            time: "3 hours ago",
          },
          reply: {
            title: "Zhu Pianyou replied to you",
            description:
              "The access review note now includes the rollout window and the owner confirmation.",
            time: "Just now",
          },
          comment: {
            title: "Qu Lili commented on your update",
            description:
              "She asked whether the dashboard prototype should keep the current chart grouping.",
            time: "2024-01-01",
          },
          taskReminder: {
            title: "Task reminder",
            description:
              "The finance export checklist is still waiting for your final verification.",
            time: "1 day ago",
          },
        },
      },
      workspaceTabs: {
        clear: "Clear history",
      },
      account: {
        logout: "Log out",
        actions: {
          account: "Account",
          billing: "Billing",
          notifications: "Notifications",
        },
      },
    },
    dashboard: {
      heading: {
        title: "Dashboard",
        description:
          "Today’s operating metrics, business trends, and system status.",
      },
      metrics: {
        revenue: "Today Revenue",
        newUsers: "New Members",
        pendingTickets: "Pending Tickets",
        availability: "Availability",
      },
      days: {
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat",
        sun: "Sun",
      },
      charts: {
        revenueTrend: {
          title: "Revenue Trend",
          description: "Revenue and order volume over the last 7 days.",
        },
        userSegments: {
          title: "User Segments",
          description: "Member activity status distribution.",
        },
        channels: {
          title: "Channel Revenue",
          description: "This week’s contribution by channel.",
        },
        series: {
          revenue: "Revenue",
          orders: "Orders",
          channelShare: "Share",
        },
      },
      channels: {
        directStore: "Direct Store",
        partner: "Partners",
        miniProgram: "Mini Program",
        offline: "Offline Stores",
      },
      userSegments: {
        new: "New Users",
        active: "Active Users",
        silent: "Inactive Users",
      },
      orders: {
        title: "Latest Orders",
        description: "A real-time view of high-frequency business activity.",
        columns: {
          id: "Order ID",
          source: "Source",
          status: "Status",
          amount: "Amount",
        },
      },
      orderSources: {
        eastChina: "East China",
        directStore: "Direct Store",
        partner: "Partners",
        miniProgram: "Mini Program Store",
      },
      orderStatuses: {
        reviewing: "Reviewing",
        shipped: "Shipped",
        pendingPayment: "Pending Payment",
        completed: "Completed",
      },
      riskMonitor: {
        title: "Risk Monitor",
        description: "Common backlog and risk indicators for admin systems.",
      },
      risks: {
        refundBacklog: "Refund Backlog",
        permissionReview: "Permission Review",
        inventoryDelay: "Inventory Sync Delay",
      },
      servicesPanel: {
        title: "Service Status",
        description: "Health status of core services.",
        columns: {
          service: "Service",
          status: "Status",
          metric: "Metric",
        },
      },
      services: {
        apiGateway: "API Gateway",
        jobQueue: "Job Queue",
        notifications: "Notifications",
      },
      serviceStatuses: {
        normal: "Normal",
        watching: "Watching",
      },
    },
  },
  datatable: {
    insert: {
      label: "Insert",
      title: "Create customer",
      description: "Fill in the customer basics before saving.",
    },
    searchPlaceholder: "Search customers",
    fields: {
      keyword: "Keyword",
      keywordField: "Search In",
      keywordFieldAll: "All",
      keywordFieldId: "ID",
      keywordFieldName: "Name",
      keywordFieldOwner: "Owner",
      createdAt: "Created At",
      status: "Status",
      region: "Region",
    },
    options: {
      status: {
        active: "Active",
        paused: "Paused",
      },
    },
    actions: {
      deleteTitle: "Delete {{name}}?",
      deleteDescription:
        "This action will remove customer {{id}} from the current list.",
    },
  },
  login: {
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
