# 运行时兼容范围和包元数据

日期：2026-05-30
语系：cn

## 目标

明确 npm 包的运行时兼容范围和关键包元数据，避免不必要限制消费者，同时提升打包工具和依赖解析体验。

## 关联待办

- TODO-0013：明确运行时兼容范围和包元数据

## 完成内容

- 在 `package.json` 声明 `sideEffects: false`。
- 将 `peerDependencies.dayjs` 从 `*` 收窄为 `>=1.8.0 <2`。
- README 增加兼容性说明，覆盖 ESM/CommonJS、TypeScript 类型、Day.js peer 范围、Node 运行限制和 tree shaking。
- 保持不声明 `engines.node`，避免基于当前构建产物不必要地限制消费者安装范围。
- 更新项目事实和 backlog 中与兼容范围、包元数据相关的记录。

## 验证

- `pnpm install --frozen-lockfile`：通过。
- `pnpm run verify`：通过，测试、类型检查、构建和 pack dry-run 全部通过。
- `npm pack --dry-run` tarball 内容包含 `dist/index.mjs`、`dist/index.cjs`、`dist/index.d.ts`、`README.md`、`LICENSE`、`package.json`。

## 决策记录

- 不恢复 `engines.node`，当前构建产物不需要限制 npm 包使用者的 Node 安装范围。
- Day.js peer 范围设置为 `>=1.8.0 <2`，避免 `*` 接受潜在破坏性大版本。
- 声明 `sideEffects: false`，因为插件模块本身只导出 Day.js plugin 函数；实际扩展行为由消费者显式 `dayjs.extend(cnWeek)` 触发。

## 后续事项

- TODO-0010：建立安全发布流程。
- TODO-0011：建立版本管理与 changelog 流程。
- TODO-0012：增加代码质量脚本和静态检查。
