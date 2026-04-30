# Web 应用说明

这个文档是给使用者看的，用来说明当前主业务应用 `apps/web` 是什么、怎么运行、适合承载什么类型的需求。

## 它是什么

`apps/web` 是当前主业务应用。

这里主要承载：

- 页面
- 路由
- 布局
- 登录和会话相关流程
- 页面级业务交互

如果你的需求是“改某个业务页面”或者“调整某个业务流程”，大多数情况下都会落在这里。

## 快速开始

```bash
pnpm install
pnpm dev
```

如果你想在没有真实后端的情况下启动 mock 环境：

```bash
pnpm mock
```

mock 模式下不需要单独启动真实的 `auth`、`file` 或其他后端服务。

更完整的说明请看：

- [env-setup.md](./env-setup.md)

## 环境变量

根据需要准备环境变量文件。

本地 `pnpm dev` 默认读取根目录 `.env.development`。
同时也会读取当前 app 自己的 `.env.development`。

如果你要跑真实联调环境，通常至少需要这些 proxy 地址：

```env
VITE_AUTH_PROXY=http://localhost:9000
VITE_FILE_PROXY=http://localhost:9000
```

以及当前 app 自己的 API 代理：

```env
VITE_API_PROXY=http://localhost:8000
```

mock 模式不需要单独 `.env.mock` 或额外开关配置。

这意味着：

- 不需要再配置真实 `auth` 服务地址
- 不需要再配置真实 `file` 服务地址
- 也不需要为 mock 再准备多组端口
- 你只需要启动前端自己这一个开发端口

## 它适合承载什么需求

适合：

- 新增或修改页面
- 新增或调整路由
- 修改页面布局
- 串联已有接口完成业务流程
- 调整页面级状态和交互

不适合直接沉淀这些内容：

- 多个页面都会复用的共享组件
- 全局主题 token
- 通用 API 基础设施
- 通用错误模型或 query 基础能力

这些通常应进入 `packages/*` 的共享层。

## 你可以怎样向 AI 描述需求

```text
先阅读 agent_protocol/PROTOCOL.md。

我要修改 apps/web：
1. 目标是……
2. 影响的页面或路由是……
3. 我希望最终效果是……
4. 如果这是页面私有需求，请不要抽成共享能力
```

如果你不确定是不是应该改 `apps/web`，也可以直接让 AI 先判断。

## 相关文档

- [用户文档首页](./README.md)
- [框架思想](./framework-thinking.md)
- [Codex 协议入口](../agent_protocol/PROTOCOL.md)
