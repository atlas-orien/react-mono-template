const messages = {
  login: {
    brand: "AI 标准化开发框架",
    hero: {
      titleLine1: "说出你的需求，",
      titleLine2: "让 AI 按框架写代码。",
      desc1:
        "这是一个 AI 标准化开发框架，覆盖页面、状态、路由、接口与主题约束。",
      desc2:
        "你只需要描述需求，AI 会基于项目规范完成实现并保持结构一致。",
    },
    welcome: "欢迎回来",
    title: "登录你的账号",
    subtitle: "请输入标识和密码后继续体验 AI 开发流程。",
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
    footer: {
      toRegisterPrefix: "还没有账号？",
      toRegisterAction: "去注册",
      toGuidePrefix: "想先了解怎么用 AI 开发？",
      toGuideAction: "查看 Guide 说明",
    },
    error: {
      invalidCredentials: "登录失败，请检查标识和密码。",
    },
  },
  guide: {
    title: "Guide：AI 开发说明与组件风格预览",
    subtitle: "这个页面无需登录即可访问，先看按钮样式，再按规范与 AI 协作开发。",
    buttons: {
      title: "Button 样式与配色",
      subtitle: "可以在 theme 文件夹修改配色方案。",
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
      title: "如何用 AI 配合这个框架开发",
      intro: "推荐把需求写成固定流程，先约束 AI 再让 AI 写代码。",
      step1: "1. 先让 AI 阅读 ai_protocal 目录下全部协议文件。",
      step2: "2. 先让 AI 输出 Todo 清单，再开始改代码。",
      step3: "3. 每完成一项就勾选并划掉，便于中断后继续。",
      template:
        "推荐提问模板：先阅读 ai_protocal 目录，先列 Todo list 并逐条划掉，然后实现：<你的需求>。",
      tip:
        "这样做可以减少沟通成本、降低上下文丢失风险，并让代码结构保持一致。",
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
