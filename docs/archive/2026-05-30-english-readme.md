# 英文 README 与语言切换

日期：2026-05-30
语系：cn

## 目标

增加英文 README，并在 GitHub 上提供中英文手动切换入口。

## 关联待办

- TODO-0016：增加英文 README 与 GitHub 语言切换

## 完成内容

- 新增 `README.en.md`。
- 在 `README.md` 顶部增加 English 切换链接。
- 在 `README.en.md` 顶部增加简体中文切换链接。
- 将 `README.en.md` 加入 `package.json.files`。
- 更新 changelog、项目事实、backlog 和 progress。

## 验证

- `pnpm run verify`：通过。
- `git diff --check`：通过。
- `npm pack --dry-run` tarball 内容包含 `README.en.md`。

## 决策记录

- 默认 npm 展示仍使用 `README.md`。
- GitHub 手动切换通过 README 顶部互链实现。
- 英文 README 只面向使用者，不加入维护者发布或开发细节。

## 后续事项

- 最终发布前总检查。
