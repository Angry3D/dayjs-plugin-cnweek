# 安全发布流程

最后更新：2026-05-30
语系：cn

本文档面向维护者，说明当前仓库推荐的 npm 安全发布准备与人工发布边界。

## 目标

- 不使用长期 `NPM_TOKEN`。
- Codex 与 GitHub Actions 不主动执行 `npm stage publish` 或 `npm publish`。
- 发布命令由维护者本人执行，并通过 npm 2FA 完成确认。
- 保留 Trusted Publishing / OIDC / provenance 作为后续可选升级路径。

## 当前方案

仓库包含 `.github/workflows/release.yml`，它只做发布前校验：

- 触发条件：推送 `v*` tag。
- 运行环境：GitHub-hosted runner + Node.js 24。
- 执行动作：`pnpm run verify`。

这个 workflow 不包含 npm 发布命令。`npm stage publish --access public` 由维护者在
完成本地复核后手动执行。

## npm 侧配置

当前默认流程不要求配置 Trusted Publisher。维护者需要先确认：

1. npm 账号已启用 2FA。
2. 包发布相关操作要求 2FA。
3. 仓库没有配置长期 `NPM_TOKEN`，如曾配置过应移除。

如果后续决定改用 GitHub Actions OIDC 发布，再在 npm 为
`@relaxcoder/dayjs-plugin-cnweek` 配置 Trusted Publisher：

1. Provider 选择 GitHub Actions。
2. Repository owner: `Angry3D`
3. Repository name: `dayjs-plugin-cnweek`
4. Workflow filename: `release.yml`
5. Triggering event: `push`
6. Branch / tag filter: `refs/tags/v*`
7. Allow publishing package: `@relaxcoder/dayjs-plugin-cnweek`
8. Allowed action 建议仅授权计划执行的 npm publish 命令

## GitHub Actions 侧配置

`release.yml` 当前只包含校验所需权限：

- `permissions.contents: read`

如果后续启用 Trusted Publishing，需要额外增加 `permissions.id-token: write`，并使用
GitHub-hosted runner。`package.json.repository.url` 必须与实际 GitHub 仓库精确匹配；
当前仓库记录为
`git+https://github.com/Angry3D/dayjs-plugin-cnweek.git`。

## 发布步骤

1. 本地完成改动并运行 `pnpm run verify`。
2. 更新 `package.json` 中的版本号。
3. 提交发布相关改动。
4. 创建并推送版本 tag，例如 `v1.0.1`。
5. 等待 GitHub Actions 的 `Release Check` workflow 完成。
6. 维护者本人执行 `npm stage publish --access public`。
7. 在 npm staging 中复核包内容。
8. 由有权限的维护者使用 2FA 执行审批，让 staged release 正式上线。

## 切换到全自动正式发布的条件

如果后续团队决定由 CI 执行 staged publish 或正式 publish，可按以下方式调整：

1. 在 `release.yml` 中增加 `permissions.id-token: write`。
2. 增加 `registry-url: https://registry.npmjs.org`。
3. 增加维护者确认后的 npm 发布命令，例如 `npm stage publish --access public`。
4. 在 npm Trusted Publisher 中仅授权对应 workflow 和对应发布动作。

启用这个路径后，OIDC 和 provenance 才会真正参与发布流程。在你明确授权前，仓库默认不让 CI 执行 npm 发布命令。
