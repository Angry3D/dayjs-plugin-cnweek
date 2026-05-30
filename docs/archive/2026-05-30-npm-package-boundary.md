# npm 发布包边界整改

日期：2026-05-30
语系：cn

## 目标

整改 npm 发布包内容边界，确保已发布插件后续版本的包入口与实际产物一致，并避免 AI 工作流文档进入 npm 包。

## 关联待办

- TODO-0001：修正 npm 发布包内容与入口一致性
- TODO-0002：避免 AI 工作流文档被发布到 npm 包

## 完成内容

- 在 `package.json` 增加 `files` 白名单，仅发布 `dist`、`README.md`、`LICENSE` 以及 npm 强制包含文件。
- 在 `package.json` 增加 `prepack`，执行 `npm run build`，确保 pack/publish 前生成 `dist/index.js`。
- 在 `.gitignore` 增加 `.npm-cache`，避免本地 npm 验证缓存进入工作区跟踪。
- 通过 pnpm 安装依赖后生成 `pnpm-lock.yaml`，用于稳定后续本地验证。
- 修正项目事实：当前项目是已经发布过的 npm 插件包，本阶段是优化整改。

## 验证

- `npm_config_cache=.npm-cache npm pack --dry-run`：修改前显示 tarball 包含 `AGENTS.md`、`docs/` 和 `.npm-cache`，且不包含 `dist/index.js`。
- `npm_config_cache=.npm-cache npm pack --dry-run --ignore-scripts`：发布白名单生效，未包含 `AGENTS.md`、`docs/` 和 `.npm-cache`。
- `pnpm test`：通过，1 个测试套件、5 个测试全部通过。
- `pnpm run build`：通过，生成 `dist/index.js`。
- `npm_config_cache=.npm-cache pnpm pack --dry-run`：通过，tarball 内容为 `dist/index.js`、`LICENSE`、`package.json`、`README.md`。
- `npm_config_cache=.npm-cache npm pack --dry-run`：通过，`prepack` 自动构建成功；tarball 内容为 `dist/index.js`、`LICENSE`、`README.md`、`package.json`。

## 决策记录

- 本阶段只处理 P0 发布内容边界，不纳入 TypeScript 或 ES Module 迁移。
- 已完成事项从 `docs/backlog.md` 移除；后续 pnpm 管理器声明、README 命令统一和 CI 仍保留为独立待办。

## 后续事项

- TODO-0007：明确 pnpm 为包管理器并稳定本地验证流程。
- TODO-0009：建立 CI 基础验证流水线。
