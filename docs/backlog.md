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
| TODO-0004 | P1 | done | feature | 迁移到 TypeScript 并发布类型声明 | 用户明确方向 + 本次工程巡检 + TypeScript 包发布最佳实践复核 | 已将源码迁移到 `src/index.ts`，构建生成 `dist/index.d.ts`，`package.json` 已配置 `types` | 已完成 TypeScript 迁移和类型声明发布准备；`exports.types` 留待 TODO-0005 统一设计；等待用户确认后归档。 |
| TODO-0005 | P1 | candidate | optimization | 采用 ES Module 并设计现代 `exports` 入口 | 用户明确方向 + Node 包发布最佳实践复核 | 用户确认后续使用 ES Module；Rollup 当前只输出 UMD，`package.json` 只有 `main`，没有 `module` 或 `exports` | 建议以 ESM 为主，设置 `"type": "module"` 与 `exports`；是否保留 CJS fallback 需在实施前确认兼容策略。 |
| TODO-0010 | P1 | candidate | chore | 建立安全发布流程 | npm 开源包最佳实践复核 | 当前仓库未见发布工作流；npm 开源包发布涉及账户权限、token 与供应链安全 | 启用 npm 2FA；优先评估 Trusted Publishing/OIDC 与 provenance；避免长期 npm token。代码侧可准备 release workflow。 |
| TODO-0014 | P1 | done | chore | 建立 TypeScript 测试与类型验证策略 | 用户追问 + TS/ESM 迁移风险复核 | 已新增 `typecheck`、`test/types.ts`，并将类型检查纳入 `verify` 与 CI | 已完成基础类型验证策略；Jest 继续通过构建后的 JS 验证行为，未额外引入测试框架迁移；等待用户确认后归档。 |
| TODO-0011 | P2 | candidate | chore | 建立版本管理与 changelog 流程 | npm 开源包最佳实践复核 | 当前仓库未见 changelog 或 release 配置；`.npmignore` 中提到 `.releaserc` 但仓库未记录该文件 | 可评估 Changesets 或语义化 release；明确手动发布与 CI 发布边界。 |
| TODO-0012 | P2 | candidate | chore | 增加代码质量脚本和静态检查 | npm 开源包最佳实践复核 | 当前已有 `build`、`test`、`typecheck`、`verify` 脚本，但仍没有 `lint` 或格式检查脚本 | 后续评估 ESLint + Prettier 检查，并按需纳入 CI。 |
| TODO-0013 | P2 | candidate | docs | 明确运行时兼容范围和包元数据 | npm 开源包最佳实践复核 | 基于当前构建产物兼容性，用户已确认移除 `engines.node` 限制；当前仍没有 `sideEffects`、兼容矩阵或明确 Day.js 版本范围说明；`peerDependencies.dayjs` 为 `*` | 后续评估 Day.js peer 范围、是否声明 `sideEffects: false`，并在 README 中说明兼容性。 |
| TODO-0006 | P2 | candidate | refactor | 改善 `cnWeek` 实现的可读性和输入处理 | 本次工程巡检 | `src/index.ts` 仍使用 `parseInt`；超大 `weekVal` 仍依赖递归跨年 | 保持行为兼容前提下处理；已有 TODO-0003 测试矩阵兜底。 |
| TODO-0008 | P3 | candidate | docs | 优化 README 的发布展示完整性 | 本次工程巡检 + npm 开源包最佳实践复核 | README 引用了本地 `image.png`，但 `.npmignore` 排除了 `image.png`；README 已补 pnpm 安装和 TypeScript 类型说明，但仍缺少 ESM/exports 发布后使用示例 | 可改为稳定远程图片、保留包内图片，或用文字/表格替代图片说明；补 API、ESM/exports 和发布后使用示例。 |

## 维护规则

- `backlog = 当前资源池`，不要把它当作长期历史文件。
- 已完成事项归档后，从本文档移除。
- 已放弃事项如果有决策价值，应写入归档；如果只是无效候选，直接移除。
- 需要查历史时，阅读 `docs/archive/README.md` 和对应归档文件。
- 新增事项应尽量标注来源和证据。不要在缺少用户确认或项目证据时，把推断事项提升为已确认工作。
