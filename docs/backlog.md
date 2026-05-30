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
| TODO-0001 | P0 | candidate | bug | 修正 npm 发布包内容与入口一致性 | 本次工程巡检 + npm 开源包最佳实践复核 | `package.json` 的 `main` 指向 `dist/index.js`；未构建时 `npm pack --dry-run` 未包含 `dist/index.js`，同时包含 `AGENTS.md` 和 `docs/` | 使用 `files` 白名单控制发布包内容，确保 `dist/`、类型声明、README、LICENSE 被包含，并通过 `pnpm pack --dry-run` 验证。 |
| TODO-0002 | P0 | candidate | bug | 避免 AI 工作流文档被发布到 npm 包 | 本次工程巡检 + npm 开源包最佳实践复核 | `npm_config_cache=.npm-cache npm pack --dry-run` 显示 tarball 包含 `AGENTS.md` 与 `docs/` | 可与 TODO-0001 合并实施；优先用 `files` 字段定义发布边界。 |
| TODO-0007 | P0 | candidate | chore | 明确 pnpm 为包管理器并稳定本地验证流程 | 用户明确方向 + 本次工程巡检 | 用户确认后续使用 pnpm；仓库没有锁文件；本地未安装依赖时 `npm test` 与 `npm run build` 均因命令缺失失败 | 增加 `packageManager`，生成并提交 `pnpm-lock.yaml`，统一 README 与脚本中的安装、测试、构建、打包命令。 |
| TODO-0009 | P0 | candidate | chore | 建立 CI 基础验证流水线 | npm 开源包最佳实践复核 | 当前仓库未见 GitHub Actions 配置；发布前缺少自动化验证链路 | 建议 CI 执行 `pnpm install --frozen-lockfile`、`pnpm test`、`pnpm build`、`pnpm typecheck`、`pnpm pack --dry-run`。 |
| TODO-0003 | P1 | candidate | bug | 补齐跨年份和边界日期测试矩阵 | 本次工程巡检 + TS/ESM 迁移风险复核 | 现有测试主要覆盖 2023 年 1 月少量 get/set 场景，缺少 12 月 31 日、闰年、1 月 1 日不同星期、跨多年 weekVal 等场景 | 这是日期插件的核心正确性保障，应优先于源码重构和模块迁移。 |
| TODO-0004 | P1 | candidate | feature | 迁移到 TypeScript 并发布类型声明 | 用户明确方向 + 本次工程巡检 + TypeScript 包发布最佳实践复核 | 用户确认后续使用 TypeScript；README 用 TS 风格描述 API，但仓库没有类型声明；`.npmignore` 还排除了 `types` | 将源码迁移到 `src/index.ts`，生成 `.d.ts`，配置 `types` / `exports.types`，声明 Day.js 插件扩展类型。 |
| TODO-0005 | P1 | candidate | optimization | 采用 ES Module 并设计现代 `exports` 入口 | 用户明确方向 + Node 包发布最佳实践复核 | 用户确认后续使用 ES Module；Rollup 当前只输出 UMD，`package.json` 只有 `main`，没有 `module` 或 `exports` | 建议以 ESM 为主，设置 `"type": "module"` 与 `exports`；是否保留 CJS fallback 需在实施前确认兼容策略。 |
| TODO-0010 | P1 | candidate | chore | 建立安全发布流程 | npm 开源包最佳实践复核 | 当前仓库未见发布工作流；npm 开源包发布涉及账户权限、token 与供应链安全 | 启用 npm 2FA；优先评估 Trusted Publishing/OIDC 与 provenance；避免长期 npm token。代码侧可准备 release workflow。 |
| TODO-0014 | P1 | candidate | chore | 建立 TypeScript 测试与类型验证策略 | 用户追问 + TS/ESM 迁移风险复核 | 用户关注使用 TS 后 Jest 是否需要同步调整；当前任务池未明确覆盖 TS 测试文件、类型测试或 Jest/Vitest 选型 | 评估继续使用 Jest 还是迁移 Vitest；至少支持 TS 测试文件或类型测试，验证 Day.js 插件扩展类型和公开 API 消费方式，并纳入 CI。 |
| TODO-0011 | P2 | candidate | chore | 建立版本管理与 changelog 流程 | npm 开源包最佳实践复核 | 当前仓库未见 changelog 或 release 配置；`.npmignore` 中提到 `.releaserc` 但仓库未记录该文件 | 可评估 Changesets 或语义化 release；明确手动发布与 CI 发布边界。 |
| TODO-0012 | P2 | candidate | chore | 增加代码质量脚本和静态检查 | npm 开源包最佳实践复核 | 当前仅有 `build` 与 `test` 脚本；没有 `lint`、`format`、`typecheck` 脚本 | 随 TS 迁移增加 `typecheck`，配置 ESLint + Prettier，CI 中纳入必要检查。 |
| TODO-0013 | P2 | candidate | docs | 明确运行时兼容范围和包元数据 | npm 开源包最佳实践复核 | 当前 `package.json` 没有 `engines`、`sideEffects`、兼容矩阵或明确 Day.js 版本范围说明；`peerDependencies.dayjs` 为 `*` | 评估 Node 支持版本、Day.js peer 范围、是否声明 `sideEffects: false`，并在 README 中说明兼容性。 |
| TODO-0006 | P2 | candidate | refactor | 改善 `cnWeek` 实现的可读性和输入处理 | 本次工程巡检 | `src/index.js` 使用 `parseInt`、宽松相等比较，并存在 `Ios`/`nowIosWeekDay` 拼写不一致；超大 `weekVal` 依赖递归跨年 | 保持行为兼容前提下处理；先用 TODO-0003 的测试兜底。 |
| TODO-0008 | P3 | candidate | docs | 优化 README 的发布展示完整性 | 本次工程巡检 + npm 开源包最佳实践复核 | README 引用了本地 `image.png`，但 `.npmignore` 排除了 `image.png`；README 当前也没有 pnpm 安装命令、ESM/TS 使用示例 | 可改为稳定远程图片、保留包内图片，或用文字/表格替代图片说明；补安装、API、类型和发布后使用示例。 |

## 维护规则

- `backlog = 当前资源池`，不要把它当作长期历史文件。
- 已完成事项归档后，从本文档移除。
- 已放弃事项如果有决策价值，应写入归档；如果只是无效候选，直接移除。
- 需要查历史时，阅读 `docs/archive/README.md` 和对应归档文件。
- 新增事项应尽量标注来源和证据。不要在缺少用户确认或项目证据时，把推断事项提升为已确认工作。
