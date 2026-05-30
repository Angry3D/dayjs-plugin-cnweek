# 待办资源池

最后更新：2026-05-30
语系：cn

本文档是 `docs/progress.md` 的上游资源池，只存放尚未完成或仍需决策的候选事项、已确认待办、后续需求、问题修复、调研和优化项。

已完成事项不长期保留在本文档中。阶段完成并写入 `docs/archive/` 后，应从本文档移除，并在 `docs/archive/README.md` 的归档索引中登记。

## 编号规则

下一个待办 ID：TODO-0015

新增待办时使用上面的 ID，然后递增该值。不要依赖历史归档中的最大编号来推断下一个 ID。

## 状态值

- `candidate`：已发现或已提出，但尚未确认执行
- `todo`：已确认的后续事项
- `planned`：已进入当前或下一阶段计划
- `doing`：正在执行
- `blocked`：因缺少输入或外部条件暂时阻塞
- `done`：已完成，但尚未归档；归档后应从本文档移除

## 类型值

- `bug`
- `feature`
- `docs`
- `refactor`
- `chore`
- `research`
- `optimization`

## 当前待办

| ID | 优先级 | 状态 | 类型 | 事项 | 来源 | 证据 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TODO-0005 | P1 | done | optimization | 采用 ES Module 并设计现代 `exports` 入口 | 用户明确方向 + Node 包发布最佳实践复核 | 已配置 `module`、`exports.import`、`exports.require`、`exports.types`；Rollup 已输出 ESM 与 CJS 产物 | 已完成 ESM 优先和 CJS fallback 入口设计；等待用户确认后归档。 |
| TODO-0010 | P1 | candidate | chore | 建立安全发布流程 | npm 开源包最佳实践复核 | 当前仓库未见发布工作流；npm 开源包发布涉及账户权限、token 与供应链安全 | 启用 npm 2FA；优先评估 Trusted Publishing/OIDC 与 provenance；避免长期 npm token。代码侧可准备 release workflow。 |
| TODO-0011 | P2 | candidate | chore | 建立版本管理与 changelog 流程 | npm 开源包最佳实践复核 | 当前仓库未见 changelog 或 release 配置；`.npmignore` 中提到 `.releaserc` 但仓库未记录该文件 | 可评估 Changesets 或语义化 release；明确手动发布与 CI 发布边界。 |
| TODO-0012 | P2 | candidate | chore | 增加代码质量脚本和静态检查 | npm 开源包最佳实践复核 | 当前已有 `build`、`test`、`typecheck`、`verify` 脚本，但仍没有 `lint` 或格式检查脚本 | 后续评估 ESLint + Prettier 检查，并按需纳入 CI。 |
| TODO-0013 | P2 | candidate | docs | 明确运行时兼容范围和包元数据 | npm 开源包最佳实践复核 | 基于当前构建产物兼容性，用户已确认移除 `engines.node` 限制；当前已有现代 `exports`，但仍没有 `sideEffects`、兼容矩阵或明确 Day.js 版本范围说明；`peerDependencies.dayjs` 为 `*` | 后续评估 Day.js peer 范围、是否声明 `sideEffects: false`，并在 README 中说明兼容性。 |
| TODO-0006 | P2 | candidate | refactor | 改善 `cnWeek` 实现的可读性和输入处理 | 本次工程巡检 | `src/index.ts` 仍使用 `parseInt`；超大 `weekVal` 仍依赖递归跨年 | 保持行为兼容前提下处理；已有 TODO-0003 测试矩阵兜底。 |
| TODO-0008 | P3 | candidate | docs | 优化 README 的发布展示完整性 | 本次工程巡检 + npm 开源包最佳实践复核 | README 引用了本地 `image.png`，但 `.npmignore` 排除了 `image.png`；README 已补 pnpm 安装、TypeScript 类型说明和 CommonJS 示例 | 可改为稳定远程图片、保留包内图片，或用文字/表格替代图片说明；继续完善 API 和发布后使用示例。 |

## 维护规则

- `backlog = 当前资源池`，不要把它当作长期历史文件。
- 已完成事项归档后，从本文档移除。
- 已放弃事项如果有决策价值，应写入归档；如果只是无效候选，直接移除。
- 需要查历史时，阅读 `docs/archive/README.md` 和对应归档文件。
- 新增事项应尽量标注来源和证据。不要在缺少用户确认或项目证据时，把推断事项提升为已确认工作。
