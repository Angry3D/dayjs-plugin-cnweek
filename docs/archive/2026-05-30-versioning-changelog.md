# 版本管理与 changelog 流程

日期：2026-05-30
语系：cn

## 目标

建立轻量版本管理与 changelog 流程，让最终发布前可以明确判断版本号、整理用户可见变更，并避免过早引入自动发版工具。

## 关联待办

- TODO-0011：建立版本管理与 changelog 流程

## 完成内容

- 新增 `CHANGELOG.md`，使用 `[Unreleased]` 记录尚未发布的变更。
- 新增 `docs/versioning.md`，记录手动 SemVer、changelog 维护规则和最终发布前流程。
- 将 `CHANGELOG.md` 加入 `package.json.files`，确保 npm 包携带变更记录。
- README 增加版本管理与 changelog 文档入口。
- 更新项目事实、backlog 和 progress。

## 验证

- `pnpm run verify`：通过。
- `git diff --check`：通过。
- `npm pack --dry-run` tarball 内容包含 `CHANGELOG.md`。

## 决策记录

- 当前仓库规模较小，先采用手动 SemVer + `CHANGELOG.md`。
- 暂不引入 Changesets、semantic-release 或自动发版工具。
- 发布作为全部优化完成后的最终阶段，由维护者本人执行 npm 发布动作。

## 后续事项

- TODO-0012：增加代码质量脚本和静态检查。
- TODO-0006：改善 `cnWeek` 实现的可读性和输入处理。
- TODO-0008：优化 README 的发布展示完整性。
