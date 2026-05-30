# CI 基础验证流水线

日期：2026-05-30
语系：cn

## 目标

建立 GitHub Actions 基础验证流水线，让依赖安装、测试、构建和 npm 发布包 dry-run 在 push 和 PR 中自动执行。

## 关联待办

- TODO-0009：建立 CI 基础验证流水线

## 完成内容

- 新增 `.github/workflows/ci.yml`。
- CI 在 push 到 `master`、`main` 以及 pull request 时触发。
- CI 使用 Node 20 与 `pnpm@8.15.9`。
- CI 执行 `pnpm install --frozen-lockfile`、`pnpm test`、`pnpm run build`、`pnpm run pack:dry-run`。
- 更新项目事实，记录仓库已有 GitHub Actions CI 配置。

## 验证

- `pnpm run verify`：通过，1 个测试套件、22 个测试全部通过；构建和 pack dry-run 成功。
- CI workflow 静态检查：已确认 `.github/workflows/ci.yml` 包含依赖安装、测试、构建和 pack dry-run 步骤。

## 决策记录

- 本阶段只建立当前项目已有脚本的基础 CI，不引入 TypeScript typecheck。
- `typecheck` 等待 TypeScript 阶段补充后再纳入 CI。
- CI 使用 Node 20 与 `pnpm@8.15.9`，匹配当前本地验证环境和 `packageManager` 声明。

## 后续事项

- TODO-0004：迁移到 TypeScript 并发布类型声明。
- TODO-0014：建立 TypeScript 测试与类型验证策略。
