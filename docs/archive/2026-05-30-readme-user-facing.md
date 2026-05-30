# README 使用者文档整理

日期：2026-05-30
语系：cn

## 目标

优化 README 的 npm 发布展示完整性，让 README 更适合作为 npm 包详情页，突出安装、用法、API 和兼容性，减少维护者和开发细节。

## 关联待办

- TODO-0008：优化 README 的发布展示完整性

## 完成内容

- 移除 README 对本地 `image.png` 的依赖。
- 使用文字和表格解释“中国式第几周”。
- 重写安装、快速开始、API、TypeScript 和兼容性说明。
- 移除本地开发、发布和版本管理章节。
- 更新 changelog、项目事实、backlog 和 progress。

## 验证

- `pnpm run verify`：通过。
- `git diff --check`：通过。
- `npm pack --dry-run` tarball 内容包含重写后的 README。

## 决策记录

- README 面向 npm 使用者，不展示 CI、发布、安全、版本流程等维护者细节。
- npm 默认展示仍使用 `README.md`。

## 后续事项

- 最终发布前总检查。
