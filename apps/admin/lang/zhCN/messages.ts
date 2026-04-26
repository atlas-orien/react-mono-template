const messages = {
  admin: {
    navigation: {
      dashboard: "控制台",
      accountManagement: "账号管理",
      adminUsers: "后台账号",
      appUsers: "App 用户",
      accessControl: "权限中心",
      roles: "权限角色",
      rolePermissions: "角色授权",
      appRoles: "App 角色",
      appRolePermissions: "App 角色授权",
      examples: "开发示例",
      datatableDemo: "DataTable 示例",
    },
    shell: {
      brand: {
        eyebrow: "Workspace",
        title: "Admin",
        description: "Enterprise",
      },
      notifications: {
        label: "通知",
        title: "通知",
        empty: "暂时没有新的通知。",
        actions: {
          markAllRead: "全部标记为已读",
          markRead: "标记已读",
          dismiss: "忽略通知",
        },
        items: {
          weeklyReports: {
            title: "收到了 14 份新周报",
            description: "请在下午同步前查看最新的大区摘要和重点变更。",
            time: "3 小时前",
          },
          reply: {
            title: "朱偏右 回复了你",
            description: "权限审核备注里已经补充了发布时间窗口和负责人确认。",
            time: "刚刚",
          },
          comment: {
            title: "曲丽丽 评论了你",
            description: "她在确认控制台原型是否继续保留现在这组图表分区。",
            time: "2024-01-01",
          },
          taskReminder: {
            title: "待办提醒",
            description: "财务导出检查单还在等待你的最终确认。",
            time: "1 天前",
          },
        },
      },
      account: {
        logout: "退出登录",
        actions: {
          account: "账号",
          billing: "计费",
          notifications: "通知",
        },
      },
    },
    dashboard: {
      heading: {
        title: "控制台",
        description: "今日关键经营指标、运营趋势和系统状态概览。",
      },
      metrics: {
        revenue: "今日成交额",
        newUsers: "新增会员",
        pendingTickets: "待处理工单",
        availability: "系统可用率",
      },
      days: {
        mon: "周一",
        tue: "周二",
        wed: "周三",
        thu: "周四",
        fri: "周五",
        sat: "周六",
        sun: "周日",
      },
      charts: {
        revenueTrend: {
          title: "成交趋势",
          description: "最近 7 天成交额与订单量走势。",
        },
        userSegments: {
          title: "用户结构",
          description: "会员活跃状态占比。",
        },
        channels: {
          title: "渠道成交",
          description: "本周各渠道成交贡献。",
        },
        series: {
          revenue: "成交额",
          orders: "订单量",
          channelShare: "成交占比",
        },
      },
      channels: {
        directStore: "直营商城",
        partner: "渠道伙伴",
        miniProgram: "小程序",
        offline: "线下门店",
      },
      userSegments: {
        new: "新用户",
        active: "活跃用户",
        silent: "沉默用户",
      },
      orders: {
        title: "最新订单流",
        description: "高频业务动作的实时视图。",
        columns: {
          id: "单号",
          source: "来源",
          status: "状态",
          amount: "金额",
        },
      },
      orderSources: {
        eastChina: "华东大区",
        directStore: "直营商城",
        partner: "渠道伙伴",
        miniProgram: "小程序商城",
      },
      orderStatuses: {
        reviewing: "待复核",
        shipped: "已发货",
        pendingPayment: "待付款",
        completed: "已完成",
      },
      riskMonitor: {
        title: "风险监控",
        description: "后台系统常见待办和风险指标。",
      },
      risks: {
        refundBacklog: "退款工单积压",
        permissionReview: "权限变更待审",
        inventoryDelay: "库存同步延迟",
      },
      servicesPanel: {
        title: "服务状态",
        description: "核心服务的健康状态。",
        columns: {
          service: "服务",
          status: "状态",
          metric: "指标",
        },
      },
      services: {
        apiGateway: "API 网关",
        jobQueue: "任务队列",
        notifications: "消息通知",
      },
      serviceStatuses: {
        normal: "正常",
        watching: "观察中",
      },
    },
  },
  datatable: {
    insert: {
      label: "新增",
      title: "新增客户",
      description: "填写客户基础信息后保存。",
    },
    searchPlaceholder: "搜索客户",
    fields: {
      keyword: "关键字",
      keywordField: "搜索字段",
      keywordFieldAll: "全部",
      keywordFieldId: "ID",
      keywordFieldName: "名称",
      keywordFieldOwner: "负责人",
      createdAt: "创建时间",
      status: "状态",
      region: "区域",
    },
    options: {
      status: {
        active: "启用",
        paused: "暂停",
      },
    },
    actions: {
      deleteTitle: "删除 {{name}}？",
      deleteDescription: "此操作会将客户 {{id}} 从当前列表中移除。",
    },
  },
  login: {
    form: {
      password: {
        label: "密码",
        placeholder: "请输入密码",
      },
      submit: "登录",
      submitting: "登录中...",
      identifier: {
        label: "标识",
        placeholder: "请输入标识",
      },
    },
  },
  register: {
    brand: "AI 标准化开发框架",
    hero: {
      titleLine1: "创建账号，",
      titleLine2: "开始 AI 开发。",
      desc1: "注册后即可在统一规范下，让 AI 按框架要求完成开发任务。",
      desc2: "同样支持主题切换、多语言和模块化结构，便于持续迭代。",
    },
    welcome: "创建新账号",
    title: "注册你的账号",
    subtitle: "填写信息后即可进入框架体验。",
    form: {
      password: {
        label: "密码",
        placeholder: "请输入密码",
      },
      confirmPassword: {
        label: "确认密码",
        placeholder: "请再次输入密码",
      },
      submit: "注册",
      submitting: "注册中...",
      username: {
        label: "用户名",
        placeholder: "请输入用户名",
      },
      displayName: {
        label: "显示名称（可选）",
        placeholder: "请输入显示名称",
      },
      email: {
        label: "邮箱（可选）",
        placeholder: "请输入邮箱",
      },
    },
    footer: {
      toLoginPrefix: "已有账号？",
      toLoginAction: "去登录",
    },
    error: {
      passwordMismatch: "两次输入的密码不一致。",
    },
  },
} as const

export default messages
