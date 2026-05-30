# pnpm 管理器与本地验证流程

日期：2026-05-30
语系：cn

## 目标

明确 pnpm 为项目包管理器，并稳定本地测试、构建和 npm 发布包 dry-run 验证流程。

## 关联待办

- TODO-0007：明确 pnpm 为包管理器并稳定本地验证流程

## 完成内容

- 在 `package.json` 增加 `packageManager`，声明项目使用 `pnpm@8.15.9`。
- 将 `prepack` 统一为 `pnpm run build`。
- 增加 `pack:dry-run` 脚本，通过 `npm_config_cache=.npm-cache npm pack --dry-run` 检查发布包边界。
- 增加 `verify` 脚本，聚合执行测试与 pack dry-run。
- 在 `README.md` 补充 pnpm 安装、本地开发和完整验证命令。
- 根据当前 `dist/index.js` 构建产物兼容性判断，移除 `engines.node` 限制，避免不必要收窄 npm 包使用者安装范围。
- 更新项目事实和 backlog 中与 pnpm、运行时兼容范围相关的记录。

## 验证

- `pnpm test`：通过，1 个测试套件、5 个测试全部通过。
- `pnpm run build`：通过，生成 `dist/index.js`。
- `pnpm run pack:dry-run`：通过，tarball 内容为 `dist/index.js`、`LICENSE`、`package.json`、`README.md`。
- `pnpm run verify`：通过，当前环境为 `node v20.19.5`、`pnpm 8.15.9`；聚合执行测试与 pack dry-run。

## 决策记录

- 本阶段只处理 pnpm 管理器声明和本地验证流程，不迁移 TypeScript 或 ES Module。
- 使用 `pnpm@8.15.9` 作为 `packageManager` 声明。
- `pnpm@8.15.9` 不支持 `pnpm pack --dry-run`，因此通过 `pnpm run pack:dry-run` 统一入口，内部使用 npm dry-run 完成发布包边界检查。
- `npm_config_cache=.npm-cache` 用于避免 npm dry-run 向用户 Home 目录写日志或缓存。
- 当前构建产物为 UMD 输出，未使用 Node 20 专属能力；因此不在 npm 包中声明 `engines.node: ">=20 <21"`。

## 后续事项

- TODO-0009：建立 CI 基础验证流水线。
- TODO-0003：补齐跨年份和边界日期测试矩阵。
- TODO-0013：继续评估 Day.js peer 范围、`sideEffects` 和 README 兼容性说明。
