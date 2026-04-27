# DataTable protocol

本协议用于约束 `@workspace/app-components` 中 `DataTable` 的设计边界、使用方式和 AI 默认行为。

当任务涉及以下任一内容时，必须阅读本文件：

- 新增或修改 `DataTable` 本身
- 在 app 中接入 `DataTable`
- 调整列表页 query / row action / bulk action / insert action
- 调整 admin 列表页表格 header 布局
- 讨论 `DataTable` 是否应该支持某种能力

## 1. 宪章

`DataTable` 是 admin 场景的核心框架组件，不是自由拼装的通用玩具组件。

它的目标是：

- 提供稳定、受控、可复用的列表页框架
- 统一 admin 场景的查询、批量操作、行操作和分页排序行为
- 允许合理配置，但禁止无边界外放内部结构

AI 必须默认把 `DataTable` 视为“框架和边界”，而不是“可随意定制的底层表格”。

## 2. 核心原则

- 外部可以配置，但不允许乱改内部骨架。
- `DataTable` 优先统一 admin 主路径，而不是覆盖所有个性化需求。
- 如果某种需求会破坏统一 header / query / action 结构，默认不支持。
- 允许新增能力前，必须先判断它是否属于大多数 admin 列表页的稳定模式。

## 3. Header 结构（强制）

`DataTable` header 固定分成两个大区域：

- 左侧：query 区
- 右侧：action 区

左侧 query 区固定分成两层：

- 第一行：框架内建 query 区
- 第二行：业务补充 query 区

### 第一行 built-in query 区

只允许承载框架主查询条件：

- 主搜索
- 搜索范围
- 日期范围
- 框架工具按钮（如 reset / refresh）

这些能力必须通过 `builtInQueryFields` 驱动，而不是让业务自己拼 header。

### 第二行 custom query 区

业务补充条件只能通过 `queryFields` 放在第二行。

默认适合放：

- 状态
- 区域
- 类型
- 标签

不适合放：

- 顶部主搜索
- 批量操作按钮
- 任意自定义 header toolbar

## 4. Query 规则（强制）

### `builtInQueryFields`

用于框架内建主查询。

允许类型：

- `search`
- `select`
- `date-range`
- `scoped-date-range`

默认规则：

- 主搜索优先使用 `type: "search"`
- 若搜索需要字段切换，必须整合在同一个搜索组件中，不再拆成独立控件
- 若时间范围可以匹配多个标准时间字段，必须使用 `type: "scoped-date-range"`
- HTTP JSON 使用 camelCase，标准审计时间字段固定为 `createdAt` / `updatedAt`
- built-in query 必须保持第一行视觉稳定

### `queryFields`

用于业务补充筛选。

默认规则：

- 放第二行
- 默认采用紧凑布局
- `select` 类型应按内容宽度收缩，不要占用过多水平空间

AI 禁止把主搜索类条件放到 `queryFields`。

### 审计时间字段

后台列表的标准审计时间字段固定为：

- `createdAt`
- `updatedAt`

如果页面需要展示这两个字段，应优先开启 `DataTable` 的 `auditColumns` 能力，而不是在每个页面手写重复列。

如果页面只查询一个时间字段，继续使用 `date-range`。如果页面需要在 `createdAt` 和 `updatedAt` 之间切换查询字段，必须使用 `scoped-date-range`，不要显示两个时间范围选择器。

## 5. Action 规则（强制）

### 顶部 action 区

顶部 action 区是右侧固定区域，只允许承载框架级主操作：

- `insert`
- `bulkUpdate`
- `bulkDelete`

顺序固定：

1. `insert`
2. `bulkUpdate`
3. `bulkDelete`

默认规则：

- 支持分别关闭
- 区域宽度应根据可见按钮数量自动收缩
- mobile 可竖排
- desktop 默认横排
- 主按钮默认使用 icon-only + tooltip

### `toolbarActions`

仅作为框架保留插槽，不应用于替代内建主操作。

AI 禁止把大块业务操作直接塞进 `toolbarActions`，除非用户明确要求且不破坏整体框架。

### 行级操作 `rowActions`

行级操作仅用于：

- `edit`
- `delete`
- `moreItems`

默认规则：

- `moreItems` 只有显式配置时才显示
- action 列宽度按可见按钮数量自动计算
- 行级操作图标与批量/顶部操作图标应保持语义区分

## 6. Selection / Bulk 规则

- `selection` 是一等能力，不应被当成零散附加逻辑。
- 当 `bulkDelete` 或 `bulkUpdate` 开启时，可以自动开启选择能力。
- 若业务明确不需要批量能力，应允许关闭。
- AI 不应为了少量页面需求把选择行为改成不可预测。

## 7. Dialog 规则

`DataTable` 内建 dialog 用于统一核心交互：

- `insert`
- row `edit`
- row `delete`
- `bulkUpdate`
- `bulkDelete`

默认规则：

- `insert` 使用可配置 dialog
- `bulkDelete` 复用 delete 确认结构
- 文案必须可 i18n
- 对话框结构优先统一，不要每个页面各搞一套

## 8. 响应式规则

AI 修改 `DataTable` 时，必须同时考虑：

- desktop
- mobile

默认要求：

- query 区优先保留空间
- action 区按内容收缩
- 顶部主操作在小屏可竖排
- header 不应因为局部 flex 改动而意外断成多行

如果某次改动会影响 header 行内结构，必须优先检查：

- built-in query group 是否被拉伸
- tool group 是否错误参与 query group 的内部布局
- action 区是否仍然垂直居中

## 9. AI 默认决策规则

当 AI 被要求“新增列表页”或“在 admin 中使用表格”时，默认应：

1. 优先使用 `DataTable`
2. 主查询放入 `builtInQueryFields`
3. 业务补充筛选放入 `queryFields`
4. 行级操作优先使用 `rowActions`
5. 批量操作优先使用 `bulkUpdate` / `bulkDelete`
6. 新增操作优先使用 `insert`

AI 不应默认：

- 自己在 app 页面里重新手写一套 table header
- 复制 `DataTable` 内部实现到业务页
- 为单页面特例破坏 `DataTable` 统一行为

## 10. 禁止事项

- 禁止把 `DataTable` 改成任意布局容器。
- 禁止为了满足少数页面，把 header 完全外放给业务自定义。
- 禁止新增“万能透传型 props”来逃避框架设计。
- 禁止把业务特例直接写死进组件核心。
- 禁止在 app 中绕过 `DataTable` 自己复制 bulk action / row action / query header 逻辑。

## 11. 推荐接入方式

推荐：

- `builtInQueryFields`：主搜索、日期范围、固定主筛选
- `queryFields`：状态、区域、分类等附加筛选
- `insert`：新增
- `bulkUpdate` / `bulkDelete`：批量操作
- `rowActions.edit` / `rowActions.delete`：单行标准操作

不推荐：

- 用 `toolbarActions` 搭一整套自己的顶部操作栏
- 把主搜索拆成多个分离组件塞进 `queryFields`
- 通过大量页面级 patch 来修 `DataTable` 的视觉差异

## 12. 完成标准

涉及 `DataTable` 的任务，只有同时满足以下条件才算完成：

1. 不破坏 query / action 两区结构
2. 不破坏 built-in 第一行 / custom 第二行规则
3. 不引入新的无边界透传
4. 至少在一个真实 app 页面完成验证
5. `pnpm build` 通过

如果只是视觉调整，也必须检查：

- desktop header 是否稳定
- mobile header 是否仍可用
- 关闭部分 action 后区域是否自动收缩
