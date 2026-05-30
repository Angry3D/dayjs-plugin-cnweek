# pnpm 版本单一来源

日期：2026-05-30
语系：cn

## 目标

让 GitHub Actions 复用 `package.json` 的 `packageManager` 声明作为 pnpm 版本来源，避免后续升级 pnpm 时需要维护多处版本号。

## 关联待办

- TODO-0018：让 CI 从 packageManager 读取 pnpm 版本

## 完成内容

- 移除 `.github/workflows/ci.yml` 中 `pnpm/action-setup@v4` 的显式 `version: 8.15.9`。
- 移除 `.github/workflows/release.yml` 中 `pnpm/action-setup@v4` 的显式 `version: 8.15.9`。
- 保留 `package.json` 中精确的 `packageManager: pnpm@8.15.9`，作为 pnpm 版本唯一事实源。
- 更新 `docs/project-facts.md`，记录 CI 通过 `package.json.packageManager` 确定 pnpm 版本。

## 验证

- `pnpm run verify`：通过，包含格式检查、类型检查、33 个 Jest 测试和 npm pack dry-run。

## 决策记录

- 不改为 `pnpm@latest`，避免不同时间进入项目的开发者拿到不同 pnpm 版本并产生锁文件噪音。
- 不在 workflow 中重复维护 pnpm 版本号，后续升级 pnpm 时只需要调整 `package.json.packageManager` 并重新验证。

## 后续事项

暂无。
