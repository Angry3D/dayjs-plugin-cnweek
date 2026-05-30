# cnWeek 输入处理与跨年设置重构

日期：2026-05-30
语系：cn

## 目标

改善 `cnWeek` 设置逻辑的可读性和输入处理，在保持现有行为兼容的前提下，减少大跨度跨年 week 对递归调用的依赖。

## 关联待办

- TODO-0006：改善 `cnWeek` 实现的可读性和输入处理

## 完成内容

- 将 `weekVal` 解析抽成 `normalizeWeekValue`，显式保留 `parseInt` 兼容语义。
- 将跨年 week 设置抽成 `normalizeCnWeekTarget`，使用迭代归一化替代跨年递归。
- 将年份内设置逻辑抽成 `setCnWeekInYear`。
- 增加带后缀字符串和大跨度跨年 week 的回归测试。
- 更新 changelog、项目事实、backlog 和 progress。

## 验证

- `pnpm run verify`：通过。
- `git diff --check`：通过。
- Jest 测试从 22 条增加到 27 条。

## 决策记录

- 不改变公开 API 或既有兼容行为。
- `parseInt` 历史兼容语义继续保留，例如 `"10abc"` 仍按 `10` 处理。
- 大跨度跨年 week 使用迭代归一化，避免深层递归。

## 后续事项

- TODO-0008：优化 README 的发布展示完整性。
