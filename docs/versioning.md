# 版本管理与变更记录

最后更新：2026-05-30
语系：cn

本文档说明当前项目的版本号、changelog 和最终发布准备规则。

## 当前策略

- 使用 SemVer 管理 `package.json` 的 `version`。
- 使用 `CHANGELOG.md` 记录用户可见变更。
- 暂不引入 Changesets、semantic-release 或自动发版工具。
- 发布 npm 仍由维护者本人执行，Codex 和 GitHub Actions 不主动执行 `npm stage publish`。

这个策略适合当前仓库规模：流程清楚、依赖少、发布权仍由维护者掌握。

## 版本号规则

- `patch`：修复 bug、补文档、补测试、构建流程小修，且不改变公开 API。
- `minor`：新增向后兼容能力、类型增强、新入口或新的公开行为。
- `major`：移除或改变现有公开 API、改变运行时语义、收窄消费者兼容范围。

如果一次发布同时包含多类变更，选择影响最大的版本级别。

## Changelog 规则

`CHANGELOG.md` 保留一个 `[Unreleased]` 区块，用来记录尚未发布的变更。
每次阶段性优化完成后，将面向使用者有意义的变更写入该区块。

推荐分类：

- `Added`：新增能力、入口、文档、测试或流程。
- `Changed`：兼容调整、行为调整、构建输出或元数据变化。
- `Fixed`：bug 修复。
- `Removed`：移除能力、文件、配置或兼容入口。
- `Security`：安全相关修复或发布安全流程变化。

内部 AI 工作流文档的纯维护变更，只有在影响发布、使用或维护流程时才写入 changelog。

## 最终发布前流程

发布作为本轮优化的最后一步处理。准备发布时按以下顺序执行：

1. 确认所有计划内优化已经完成并提交。
2. 复核 `CHANGELOG.md` 的 `[Unreleased]` 内容。
3. 根据 SemVer 选择下一个版本号。
4. 将 `[Unreleased]` 下的内容移动到新版本标题，例如 `## [1.1.0] - 2026-05-30`。
5. 更新 `package.json` 的 `version`。
6. 运行 `pnpm run verify`。
7. 提交版本变更，提交信息建议为 `chore: release vX.Y.Z`。
8. 创建并推送 `vX.Y.Z` tag，让 GitHub Actions 执行 release check。
9. release check 通过后，由维护者本人执行 `npm stage publish --access public`。
10. 维护者在 npm staging 中复核包内容，并使用 2FA 审批正式上线。

## 当前未发布变更判断

当前 `package.json` 版本仍为 `1.0.0`。本轮优化完成后，预计至少需要发布一个
`minor` 版本，因为已经新增 TypeScript 类型声明、ESM 入口和现代 `exports` 配置。
