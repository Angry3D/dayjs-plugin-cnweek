# TypeScript 迁移与类型验证

日期：2026-05-30
语系：cn

## 目标

将插件源码迁移到 TypeScript，发布类型声明，并建立基础类型验证策略。

## 关联待办

- TODO-0004：迁移到 TypeScript 并发布类型声明
- TODO-0014：建立 TypeScript 测试与类型验证策略

## 完成内容

- 安装 `typescript@5.6.3`。
- 将 `src/index.js` 迁移为 `src/index.ts`。
- 在源码中声明 Day.js `cnWeek()` 和 `cnWeek(weekVal)` 扩展类型。
- 新增 `tsconfig.json` 和 `tsconfig.build.json`。
- 新增 `typecheck` 脚本，并纳入 `verify` 和 CI。
- 新增 `test/types.ts`，验证公开类型消费方式。
- 调整构建流程，通过 `tsc` 生成 `build/index.js` 与 `dist/index.d.ts`，再由 Rollup 生成发布 JS。
- 在 `package.json` 配置 `types: "dist/index.d.ts"`。
- 更新 README，说明包内置 TypeScript 类型声明。

## 验证

- `pnpm run typecheck`：通过。
- `pnpm test`：通过，1 个测试套件、22 个测试全部通过。
- `pnpm run verify`：通过，测试、类型检查、构建和 pack dry-run 全部通过。
- `pnpm install --frozen-lockfile`：通过，锁文件与 `package.json` 对齐。
- `npm pack --dry-run` tarball 内容包含 `dist/index.js` 和 `dist/index.d.ts`。

## 决策记录

- 本阶段优先建立类型声明与类型验证，不同步迁移到 ES Module exports 策略。
- Jest 测试通过 `pnpm run build:ts` 生成的 `build/index.js` 验证 TS 源码行为，不额外引入 `ts-jest` 或 Babel TypeScript 预设。
- `typecheck` 覆盖 `src/**/*.ts` 和 `test/**/*.ts`。

## 后续事项

- TODO-0005：采用 ES Module 并设计现代 `exports` 入口。
- TODO-0006：在 TS 与边界测试保护下改善实现可读性和输入处理。
