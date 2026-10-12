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

更完整的说明请看：

- [env-setup.md](./env-setup.md)

## 环境变量

根据需要准备环境变量文件。

本地 `pnpm dev` 默认读取根目录 `.env.development`。
同时也会读取当前 app 自己的 `.env.development`。

可以先检查根目录 `env.shared.example`，再执行 `pnpm env:init` 生成本地 env 文件。

如果你要跑真实联调环境，通常至少需要这些 proxy 地址：

```env
VITE_AUTH_PROXY=http://localhost:9000
VITE_FILE_PROXY=http://localhost:9000
```

以及当前 app 自己的 API 代理：

```env
VITE_API_PROXY=http://localhost:8000
```

当前框架不再提供浏览器 mock 模式。开发时默认通过 dev proxy 对接本地服务端。

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
先阅读 AGENT_PROTOCOL/PROTOCOL.md。

我要修改 apps/web：
1. 目标是……
2. 影响的页面或路由是……
3. 我希望最终效果是……
4. 如果这是页面私有需求，请不要抽成共享能力
```

如果你不确定是不是应该改 `apps/web`，也可以直接让 AI 先判断。

## 相关文档

### Auth 与文件服务的头像协议

Auth 的 `/auth/user/me` 返回 `avatar: { object_key: "..." }` 或 `null`。
共享认证服务将 object key 和 `bucket_id=avatar` 传给 `/file/sign/access`，
使用返回的 `download_url` 展示头像；公开或私有读取策略由 File Service 配置决定。
头像上传使用 `PUT /file/sign/upload/avatar?ext=png`，请求体是原始文件，携带 JWT。
上传成功后只把返回的 `key` 保存到 Auth，不把上传响应的 `url` 当作私有访问地址。
服务端代理上传的前端超时为五分钟；部署反向代理也需要允许 File Service 的 50 MiB 请求体。

- [用户文档首页](./README.md)
- [框架思想](./framework-thinking.md)
- [Codex 协议入口](../AGENT_PROTOCOL/PROTOCOL.md)
