# 代码质量脚本和静态检查

日期：2026-05-30
语系：cn

## 目标

增加统一的代码质量脚本，让格式检查和 TypeScript 静态检查可以在本地与 CI 中稳定执行。

## 关联待办

- TODO-0012：增加代码质量脚本和静态检查

## 完成内容

- 新增 `.prettierignore`，忽略依赖、构建产物、缓存、tgz 和 lockfile。
- 新增 `format`、`format:check`、`lint` 脚本。
- 将 `lint` 定义为 `format:check + typecheck`。
- 将 `lint` 纳入 CI 与 `verify`。
- 使用 Prettier 统一格式化现有源码、测试和 Markdown 表格。

## 验证

- `pnpm run lint`：通过。
- `pnpm run verify`：通过。
- `git diff --check`：通过。

## 决策记录

- 当前先使用已有 Prettier 和 TypeScript 能力，不新增 ESLint 依赖。
- `verify` 先执行 `lint`，再执行测试和 pack dry-run。

## 后续事项

- TODO-0006：改善 `cnWeek` 实现的可读性和输入处理。
- TODO-0008：优化 README 的发布展示完整性。
