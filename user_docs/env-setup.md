# 本地环境与 Mock 说明

这个文档是给使用者看的。

它说明这个项目本地有哪些运行方式，什么时候用本地 `dev`，什么时候用 `mock`。

对于不会命令行的使用者，最重要的一条是：

- 先把模板地址交给 AI
- 让 AI 先完成下载和环境准备
- 环境没准备好之前，不要先让 AI 直接改代码

## 建议的开始方式

推荐顺序：

1. 优先用 `npx` 下载模板
2. 让 AI 先安装依赖并检查环境
3. 优先从 `pnpm mock` 开始
4. 只有 mock 不够时，再切到本地 `pnpm dev`

如果你自己不会下载模板，也可以直接把仓库地址发给 AI，让 AI 先执行这件事。

## 两种常用运行方式

这个项目现在有两种主要开发方式：

1. 本地 dev 联调
2. mock 环境

## 1. 本地 dev 联调

适合：

- 你要联调本地或测试后端
- 你要验证真实接口行为
- 你要检查真实登录、文件上传等流程

常用命令：

```bash
pnpm install
pnpm dev
```

本地 `dev` 联调通常需要你准备对应的环境变量和后端服务。

默认读取的环境文件是：

- 根目录 `.env.development`
- 当前 app 的 `.env.development`

本地 `dev` 主要需要提供 dev proxy 目标，例如：

```env
VITE_AUTH_PROXY=http://localhost:9000
VITE_FILE_PROXY=http://localhost:9000
```

同时当前 app 还需要自己的 API 代理：

```env
VITE_API_PROXY=http://localhost:8000
```

如果这些 proxy 地址没有准备好，`pnpm dev` 通常无法完成本地真实联调。

## 2. mock 环境

适合：

- 你先做前端页面和交互
- 你暂时没有真实后端
- 你想先跑通登录、基本接口和上传相关前端流程
- 你希望 AI 先在本地稳定开发，不被后端阻塞

常用命令：

```bash
pnpm install
pnpm mock
```

如果你要显式指定 `web`，也可以：

```bash
pnpm mock web
```

## mock 环境的特点

mock 环境下：

- 不需要单独启动真实 `auth` 服务
- 不需要单独启动真实 `file` 服务
- 不需要额外配置多组后端端口
- 主要由浏览器里的 mock 拦截请求

你只需要启动前端自己这一个开发端口。

当前 mock 主要覆盖的是：

- 登录
- 注册
- 会话恢复与 refresh token
- 用户资料更新
- 文件签名、访问签名、删除签名
- mock 上传 / 删除 / 下载流程

## mock 环境使用什么配置

mock 模式不需要单独环境变量。

## 什么时候优先用 mock

下面这些场景，建议优先使用 mock：

- 页面开发
- 布局调整
- 交互开发
- 表单开发
- 设计稿还原
- 没有后端时的前端联调

## 什么时候仍然需要本地 dev 联调

下面这些场景，通常仍然建议接本地或测试后端验证：

- 真实接口字段是否完全一致
- 权限、鉴权、真实会话问题
- 文件服务的真实上传行为
- 和后端联调的边界问题
- 某些 mock 无法覆盖的联调边界

## 你可以怎样让 AI 选择运行方式

如果你想让 AI 优先用 mock，可以直接说：

```text
先阅读 agent_protocol/PROTOCOL.md。

这次先不要依赖真实后端。
请优先使用 mock 环境启动和开发。
如果 mock 不能覆盖当前需求，再告诉我差在哪里。
```

如果你想让 AI 优先用本地 `dev` 联调，可以直接说：

```text
先阅读 agent_protocol/PROTOCOL.md。

这次我希望接本地 dev 联调环境，不要使用 mock 作为默认方案。
请先检查还缺哪些环境变量和服务。
```

## 相关文档

- [用户文档首页](./README.md)
- [本地 Dev 联调清单](./dev-checklist.md)
- [Web 应用说明](./web-app-guide.md)
- [任务模板](./task-template.md)
- [Codex 协议入口](../agent_protocol/PROTOCOL.md)
