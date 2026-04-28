# AI 协议入口

这是给 AI 的统一协议入口。

开始任何分析、实现、重构、生成代码之前，必须先阅读本文件，并继续阅读下面映射到的协议文件。

本文件不是给普通使用者看的，而是给 AI 执行任务时读取的硬规则入口。

## AI 回答规则

AI 不只是改代码时要遵守协议，回答问题、给建议、做方案判断时也必须遵守。

强制要求：

- 所有判断、建议、方案、目录落点、组件归属，都必须基于当前仓库结构和对应 `PROTOCOL.md`
- 如果仓库已有明确规则，优先按现有规则回答，禁止另起一套说法
- 信息不足时，可以说明缺少什么上下文，但不能为了回答而瞎编
- 如果用户想法与当前协议冲突，必须明确指出冲突点，并按协议给出建议
- 优先引用当前项目中的目录、包职责、已有约定和已有实现方式

简化原则：

- 先读协议，再回答
- 先看现有结构，再建议
- 不要脱离仓库乱编方案
- 不要直接套用别的项目做法

## 环境准备规则

如果任务开始时仓库环境尚未准备完成，AI 应先完成环境检查，再进入代码修改。

如果用户给的是模板地址、仓库地址或一个刚下载的新目录，AI 的第一件事必须是：

1. 判断仓库是否已经正确拉取
2. 判断是否保留了不该保留的模板 remote
3. 完成依赖安装
4. 检查可用的启动方式是 `mock` 还是本地 `dev`
5. 只有在环境可用后，才进入代码修改

优先获取模板的方式：

- 第一选择：`npx degit`
- 回退选择：`git clone` 后移除原模板 `.git` 并重新初始化

如果用户不会执行命令，但已经给出仓库地址或目标目录，AI 应直接代为执行这些准备步骤，而不是只给一段抽象说明。

至少检查：

- Node.js 版本是否满足 `>=20`
- `pnpm` 是否可用
- 根目录依赖是否已经安装
- 是否存在运行所需的环境变量文件
- 当前仓库是否已有未提交改动需要避让

基础命令：

```bash
pnpm install
pnpm dev
pnpm mock
pnpm build
pnpm lint
pnpm typecheck
```

其中：

- `pnpm build` 默认只构建真实应用（当前为 `apps/admin`、`apps/web`）
- `showcases/*` 不参与根级 `pnpm build`，按需单独本地运行或单独构建

环境文件约定：

- 根目录共享 env 只保留 `VITE_AUTH_PROXY`、`VITE_FILE_PROXY`
- 每个 app 自己维护 `.env.development`、`.env.production`
- app 级 env 统一使用 `VITE_API_PROXY`
- `pnpm dev` 会合并读取根目录共享 env 和当前 app 的 `.env.development`
- `pnpm mock` 直接使用 mock 运行模式
- 本地联调只应依赖 `VITE_*_PROXY`
- 不再使用 `VITE_*_URL` 作为请求前缀拼接配置

## mock 环境规则

当需求不依赖真实后端时，AI 应优先评估是否可以直接使用 mock 环境完成开发和验证。

优先使用 mock 的典型场景：

- 页面开发
- 设计稿还原
- 交互开发
- 表单开发
- 没有真实后端时的前端联调

需要谨慎说明 mock 边界的场景：

- 真实接口契约验证
- 真实登录与权限问题
- 文件服务真实行为
- 与后端联调的边界问题

AI 在使用 mock 时必须明确汇报：

- 当前是否处于 mock 模式
- 使用的命令是什么
- 当前 mock 能覆盖哪些请求
- 哪些部分仍需真实后端验证

## 项目 package 设计

这是一个基于 `pnpm workspace` + `turbo` 的 monorepo。

目录分为两层：

- `internal/*`：工程级内部标准
- `apps/*`：最终应用
- `packages/*`：共享能力

### internal 层

- `internal/tsconfig`
  统一 TypeScript 基础配置。
  根目录 `tsconfig*.json` 只应作为薄入口，不再散落重复编译选项。

- `internal/eslint-config`
  统一 ESLint flat config 规则工厂。
  app/package 本地 `eslint.config.*` 只应表达目录差异，不应复制整套 lint 规则。

- `internal/vite-config`
  统一 Vite 与 Vitest 工程配置。
  app 本地 `vite.config.*` 只应表达应用私有差异，如代理目标、端口、极少量局部覆盖。

### apps 层

- `apps/web`
  当前主业务应用。
  负责路由、页面、布局、页面状态编排、应用启动注入。

- `apps/admin`
  商用后台应用。
  负责后台路由、页面、布局、权限编排、后台业务流程与管理台壳层装配。

### showcases 层

- `showcases/guide`
  示例与参考展示站点。
  用于展示共享组件、复合组件和推荐页面装配方式，给 AI 提供合法样例。

### packages 层

- `packages/services`
  全局服务层。
  放跨应用复用的 API 基础设施、query client 和错误模型。
  `group` 仅表示目标服务域，不表示路径前缀分组。

- `packages/locales`
  统一语言资源层。
  放共享语言资源、语言枚举、语言归一化、i18n 装配和组件文案 copy。
  默认不应再把共享语言包散落在 `apps/*/public/locales`。

- `packages/ui-theme`
  全局主题语义层。
  放 light/dark/system 共用的主题 token 和主题模式能力。

- `packages/ui-core`
  primitive 基础组件层。
  放行为契约、无障碍接线、最小样式能力和底层原语。

- `packages/ui-components`
  基础共享组件层。
  基于 `ui-core` 封装成给应用直接使用的简单/稳定组件。
  应用优先按分类路径导入，例如 `@workspace/ui-components/stable/button`。
  若需要通知/消息能力，应通过 `@workspace/ui-components/stable/toast` 使用，而不是直接暴露第三方库名。

- `packages/app-kit`
  应用级共享层。
  放共享页面、应用壳层、页面装配、布局语义、业务组合类组件，不要求稳定通用格式。

- `packages/mock`
  本地 mock 能力层。
  负责在没有真实后端时模拟接口与外部资源行为。

## AI 必须先判断改动落点

在开始写代码前，AI 必须先判断需求属于哪一层：

- 业务前台页面、路由、布局、页面交互流程：`apps/web`
- 后台页面、后台路由、权限编排、后台壳层：`apps/admin`
- 组件展示、样例表达、用法参考：`showcases/guide`
- 通用服务能力：`packages/services`
- 统一语言资源与 i18n 装配：`packages/locales`
- 主题变量和主题模式：`packages/ui-theme`
- primitive 原语和基础行为：`packages/ui-core`
- 共享产品组件：`packages/ui-components`
- 共享应用能力、共享页面、共享复合组件：`packages/app-kit`
- 本地 mock 能力：`packages/mock`

如果一个需求会同时影响多层，AI 必须先按分层拆解，再分别实现。

## package 依赖关系

默认依赖方向应保持如下：

```text
internal/*
  -> 只承载工程配置，不承载业务运行时代码

apps/*
  -> @workspace/app-kit
  -> @workspace/ui-components
  -> @workspace/services
  -> @workspace/ui-theme

showcases/*
  -> @workspace/app-kit
  -> @workspace/ui-components
  -> @workspace/services
  -> @workspace/ui-theme

@workspace/app-kit
  -> @workspace/ui-components
  -> @workspace/ui-core
  -> @workspace/locales
  -> 不依赖 apps

@workspace/ui-core
  -> @workspace/locales
  -> 不依赖 apps，不依赖 ui-components

@workspace/ui-components
  -> @workspace/ui-core
  -> @workspace/ui-theme

@workspace/services
  -> @workspace/locales
  -> 不依赖 UI 层

@workspace/mock
  -> 可以模拟服务行为
  -> 不承载页面和 UI 实现
```

这意味着：

- `internal/*` 是工程标准层，不是业务复用层
- 共享语言资源默认进入 `packages/locales`
- app 不应再各自维护整套 `public/locales`
- app 不应复制共享组件实现
- app 不应复制共享复合组件实现
- app 不应直接承接本应进入共享层的服务逻辑
- `ui-components` 是 app 使用共享基础 UI 的默认入口
- `@workspace/app-kit` 是 app 使用共享页面、应用壳层和复合装配能力的入口
- app 使用 `ui-components` 时，应优先使用 `stable/*` 或 `labs/*` 分类子路径
- `ui-core` 不是业务页面默认直连层
- `services` 不能依赖 UI
- `mock` 只负责模拟，不替代真实服务分层

## 读取顺序

1. 先读本文件
2. 再根据任务范围读取对应 `PROTOCOL.md`
3. 如果多个协议同时适用，遵循“越具体越优先”

规则优先级：

- 更接近实际改动目录的协议，优先级更高
- 下级协议覆盖上级协议
- 如果没有更具体规则，按上级协议执行

## 协议映射

### apps 层

- `apps/*` 通用规则：
  [apps/PROTOCOL.md](../apps/PROTOCOL.md)

- `apps/web` 业务应用规则：
  [apps/web/PROTOCOL.md](../apps/web/PROTOCOL.md)

- `apps/admin` 商用后台应用规则：
  [apps/admin/PROTOCOL.md](../apps/admin/PROTOCOL.md)

### showcases 层

- `showcases/*` 通用规则：
  [showcases/PROTOCOL.md](../showcases/PROTOCOL.md)

- `showcases/guide` 示例与参考展示规则：
  [showcases/guide/PROTOCOL.md](../showcases/guide/PROTOCOL.md)

### packages 层

- 通用服务层：
  [packages/services/PROTOCOL.md](../packages/services/PROTOCOL.md)

- 主题 token 层：
  [packages/ui-theme/PROTOCOL.md](../packages/ui-theme/PROTOCOL.md)

- primitive 基础组件层：
  [packages/ui-core/PROTOCOL.md](../packages/ui-core/PROTOCOL.md)

- 产品级共享组件层：
  [packages/ui-components/PROTOCOL.md](../packages/ui-components/PROTOCOL.md)

- 应用级共享层：
  [packages/app-kit/PROTOCOL.md](../packages/app-kit/PROTOCOL.md)

- 本地 mock 能力层：
  [packages/mock/PROTOCOL.md](../packages/mock/PROTOCOL.md)

## 按任务类型选择协议

- 新增或修改业务页面：
  先判断是 `web` 还是 `admin`
  再读 `apps/PROTOCOL.md` 和对应 app 的本地协议

- 新增 app 或调整 app 分层：
  必读 `apps/PROTOCOL.md`，再读目标 app 的本地协议

- 新增 showcase 或调整 showcase 分层：
  必读 `showcases/PROTOCOL.md`，再读目标 showcase 的本地协议

- 新增或修改后台页面、后台导航、权限菜单、后台壳层：
  必读 `apps/PROTOCOL.md`
  同时必读 `apps/admin/PROTOCOL.md`

- 新增或修改示例页、组件展示页、AI 参考样例：
  必读 `showcases/PROTOCOL.md`
  同时必读 `showcases/guide/PROTOCOL.md`

- 修改共享服务、API 基础设施、query、i18n、url：
  必读 `packages/services/PROTOCOL.md`

- 修改主题变量、light/dark token、主题模式：
  必读 `packages/ui-theme/PROTOCOL.md`

- 新增或改造 primitive 原语组件：
  必读 `packages/ui-core/PROTOCOL.md`

- 新增或改造共享产品组件：
  必读 `packages/ui-components/PROTOCOL.md`
  同时应参考 `showcases/guide/PROTOCOL.md` 中的合法展示方式

- 新增或改造共享页面、应用壳层或共享复合组件：
  必读 `packages/app-kit/PROTOCOL.md`

- 新增或改造本地 mock 能力：
  必读 `packages/mock/PROTOCOL.md`

## 强制判断规则

AI 在动手前必须先判断改动属于哪一层：

- 前台页面编排、路由、布局、页面状态：放 `apps/web`
- 后台页面编排、后台导航、权限编排、后台壳层：放 `apps/admin`
- 样例展示与参考页面：放 `showcases/guide`
- 可复用服务能力：放 `packages/services`
- 共享主题 token：放 `packages/ui-theme`
- primitive 原语能力：放 `packages/ui-core`
- 共享产品组件：放 `packages/ui-components`
- 共享页面、应用壳层、共享复合组件：放 `packages/app-kit`
- mock 接口与本地模拟能力：放 `packages/mock`

禁止跳过分层判断直接写代码。

## 完成前检查

AI 宣称完成前，必须按对应协议执行门禁命令。

最少要求不是固定一套，而是取决于改动落点：

- `apps/web` 改动：按 `apps/web/PROTOCOL.md` 执行
- `apps/admin` 改动：按 `apps/admin/PROTOCOL.md` 执行
- `showcases/guide` 改动：按 `showcases/guide/PROTOCOL.md` 执行
- `ui-components` 改动：按 `packages/ui-components/PROTOCOL.md` 执行，必要时同步补 `showcases/guide` 合法样例
- `ui-core` 改动：按 `packages/ui-core/PROTOCOL.md` 执行
- `mock` 改动：至少执行 `pnpm --filter @workspace/mock typecheck`
- `services` / `ui-theme` 改动：按各自协议执行

如果协议要求的检查没有通过，禁止宣称任务完成。
