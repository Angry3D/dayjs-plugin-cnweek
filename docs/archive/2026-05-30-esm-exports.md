# ESM 与现代 exports 入口

日期：2026-05-30
语系：cn

## 目标

采用 ES Module 并设计现代 `exports` 入口，同时保留 CommonJS fallback，降低对现有使用者的破坏性。

## 关联待办

- TODO-0005：采用 ES Module 并设计现代 `exports` 入口

## 完成内容

- 将 Rollup 输出调整为 `dist/index.mjs` 和 `dist/index.cjs`。
- 在 `package.json` 配置 `main`、`module`、`types` 和 `exports`。
- `exports` 提供 `types`、`import`、`require` 和 `default` 条件。
- README 增加 CommonJS 使用示例。
- 构建前清理 `build` 和 `dist`，避免本地旧产物进入 pack dry-run。
- 更新项目事实和 backlog 中与 ESM/exports 相关的记录。

## 验证

- `pnpm run verify`：通过，测试、类型检查、构建和 pack dry-run 全部通过。
- `pnpm install --frozen-lockfile`：通过。
- `node -e "const plugin = require('@relaxcoder/dayjs-plugin-cnweek'); console.log(typeof plugin)"`：输出 `function`。
- `node --input-type=module -e "import plugin from '@relaxcoder/dayjs-plugin-cnweek'; console.log(typeof plugin)"`：输出 `function`。
- `npm pack --dry-run` tarball 内容包含 `dist/index.mjs`、`dist/index.cjs` 和 `dist/index.d.ts`。

## 决策记录

- 采用 ESM 优先的现代入口，同时保留 CJS fallback。
- 暂不设置 `"type": "module"`，使用 `.mjs` 和 `.cjs` 后缀表达模块格式，避免影响现有 Jest 和 CommonJS 消费方式。
- `exports.types` 与顶层 `types` 同时保留，兼顾现代 TypeScript 解析和旧工具链。

## 后续事项

- TODO-0013：明确运行时兼容范围和包元数据。
- TODO-0008：继续完善 README 发布展示。
