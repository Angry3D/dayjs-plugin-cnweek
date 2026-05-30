# 安全发布准备流程

日期：2026-05-30
语系：cn

## 目标

建立 npm 包发布前的安全准备流程，避免长期 npm token，明确发布前校验、人工发布边界、2FA 与后续 Trusted Publishing / OIDC / provenance 的关系。

## 关联待办

- TODO-0010：建立安全发布流程

## 完成内容

- 新增 `.github/workflows/release.yml`，在推送 `v*` tag 时执行发布前校验。
- 新增 `docs/release.md`，说明维护者发布步骤、npm 2FA 要求和人工 staged publish 边界。
- README 增加维护者发布入口。
- 明确当前默认流程不让 Codex 或 GitHub Actions 主动执行 `npm stage publish` 或 `npm publish`。
- 将 Trusted Publishing / OIDC / provenance 记录为后续可选升级路径，只有维护者明确授权 CI 发布命令时才启用。

## 验证

- `pnpm run verify`：通过。
- `git diff --check`：通过。
- 未执行真实 `npm stage publish`。

## 决策记录

- 发布作为整个优化工作的最后一步处理。
- `npm stage publish --access public` 由维护者本人执行，Codex 只提供步骤提示和校验支持。
- 当前仓库 workflow 只做 release check，不包含 npm 发布命令。

## 后续事项

- TODO-0011：建立版本管理与 changelog 流程。
- TODO-0012：增加代码质量脚本和静态检查。
- TODO-0006：改善 `cnWeek` 实现的可读性和输入处理。
- TODO-0008：优化 README 的发布展示完整性。
