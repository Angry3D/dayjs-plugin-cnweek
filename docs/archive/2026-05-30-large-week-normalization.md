# 大跨度 week 归一化与 54 周测试

日期：2026-05-30
语系：cn

## 目标

优化大跨度 `cnWeek(week)` 归一化性能，并补充 54 周年份测试。

## 关联待办

- TODO-0015：优化大跨度 week 归一化并补 54 周测试

## 完成内容

- 在 `normalizeCnWeekTarget` 中使用 400 年 / 21215 周周期跳跃。
- 保留 Day.js 年份加减行为，尤其是闰日裁剪表现。
- 补充 2012 年第 54 周测试。
- 补充 100000 / -100000 week 大跨度测试。
- 补充 2024-02-29 闰日年份裁剪回归测试。
- 更新 changelog、项目事实、backlog 和 progress。

## 验证

- `pnpm run verify`：通过。
- `git diff --check`：通过。
- Jest 测试从 27 条增加到 33 条。

## 决策记录

- 使用 400 年公历周期优化 `normalizeCnWeekTarget`。
- 运行时测试继续使用 JS，TypeScript 类型由 `test/types.ts` 覆盖。
- 不改变公开 API 或 `parseInt` 兼容语义。

## 后续事项

- 最终发布前总检查。
