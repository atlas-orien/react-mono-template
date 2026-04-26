# apps 协议

`apps/*` 是最终消费层。

这里的目标不是“自由开发页面”，而是让 AI 在最终应用里仍然按框架边界工作。

## 1. 宪章

- app 负责最终页面、路由、状态编排与业务流程。
- app 不是共享能力沉淀层。
- app 不得绕过 packages 分层重新发明一套 UI 体系。
- 非程序员指挥 AI 时，app 层应尽量只做装配与业务判断，不做底层设计。

## 2. 默认分层规则

- primitive 能力：`@workspace/ui-core`
- 稳定基础协议：`@workspace/ui-components`
- 共享复合协议：`@workspace/app-components`
- 单个 app 私有实现：对应 `apps/*`

如果一段代码未来可能被第二个 app 复用，就不应先写死在某个 app 里。

## 3. AI 在 app 层的默认行为

AI 在 app 中开发功能时，必须按以下顺序：

1. 先判断需求属于哪一层。
2. 优先复用 `ui-components` 与 `app-components`。
3. 只有在确实属于 app 私有时，才在 app 内新增实现。
4. 若现有共享层能力不足，应优先回到对应包补能力，而不是在 app 里硬绕过去。

## 4. app 层禁止事项

- 禁止在多个 app 中复制同一套 UI 或服务实现。
- 禁止在 app 页面里直接散落 primitive 级实现，除非协议明确允许。
- 禁止把共享复合组件内部结构复制到页面中。
- 禁止 app 私自演化出第二套共享组件体系。

## 5. 本目录下 app 的角色

- `web`：真实业务应用
- `admin`：商用后台应用

## 6. 本地协议要求

- 每个 app 都必须有自己的 `PROTOCOL.md`。
- 顶层 `apps/PROTOCOL.md` 负责统一 app 层总原则。
- 具体 app 的协议负责定义本地特殊规则。
- 若某类页面已经沉淀为稳定页面类型协议，应优先放在 `apps/page-protocols/*.PROTOCOL.md` 中按类型管理。
- AI 在 app 中写页面时，除了读取 app 本地协议，还应判断是否存在对应页面类型协议。
- AI 在 app 中写页面时，必须先遵守 `apps/page-protocols/page-directory-structure.PROTOCOL.md` 和 `apps/page-protocols/page-index-usage.PROTOCOL.md`，再套用具体页面类型协议。

## 7. 完成定义

只有在以下条件同时满足时，app 改动才算完成：

- 分层判断正确。
- 没有把共享能力错误地下沉到 app。
- 没有绕过共享包边界。
- 对应 app 的本地门禁通过。
