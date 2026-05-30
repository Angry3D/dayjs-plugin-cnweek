# 当前进度

最后更新：2026-05-30
语系：cn

本文档只追踪当前正在推进的阶段。已完成阶段应作为独立文件归档到 `docs/archive/`。

## 当前目标

采用 ES Module 并设计现代 `exports` 入口。

## 关联待办

- TODO-0005：采用 ES Module 并设计现代 `exports` 入口

## 当前计划

1. 调整 Rollup 输出，生成 ESM 与 CJS 产物。
2. 更新 `package.json` 的 `main`、`module`、`types` 和 `exports`。
3. 保留 CJS fallback，降低对现有 CommonJS 使用者的破坏性。
4. 更新 README 使用示例和项目事实。
5. 执行类型检查、测试、构建和 pack dry-run。

## 任务拆解

| 任务 | 状态 | 备注 |
| --- | --- | --- |
| 归档 TODO-0004、TODO-0014 | done | 已创建归档并从 backlog 移除。 |
| 更新进度与 backlog 状态 | done | 已将 TODO-0005 设为当前阶段。 |
| 调整构建输出 | done | 已生成 `dist/index.mjs` 与 `dist/index.cjs`。 |
| 设计 package 入口 | done | 已配置 `exports.import`、`exports.require`、`exports.types`。 |
| 更新文档与验证 | done | 已更新 README、项目事实并执行完整验证。 |

## 状态

done

## 决策记录

- 采用 ESM 优先的现代入口，同时保留 CJS fallback。
- 暂不设置 `"type": "module"`，使用 `.mjs` 和 `.cjs` 后缀表达模块格式，避免影响现有 Jest 和 CommonJS 消费方式。
- 构建前清理 `build` 和 `dist`，避免本地旧产物进入 pack dry-run。

## 阻塞项

暂无。

## 验证

- `pnpm run verify`：通过，测试、类型检查、构建和 pack dry-run 全部通过。
- `pnpm install --frozen-lockfile`：通过。
- `node -e "const plugin = require('@relaxcoder/dayjs-plugin-cnweek'); console.log(typeof plugin)"`：输出 `function`。
- `node --input-type=module -e "import plugin from '@relaxcoder/dayjs-plugin-cnweek'; console.log(typeof plugin)"`：输出 `function`。
- `npm pack --dry-run` tarball 内容包含 `dist/index.mjs`、`dist/index.cjs` 和 `dist/index.d.ts`。

## 下一步

等待用户确认后归档 TODO-0005；下一阶段建议处理 TODO-0013，明确运行时兼容范围和包元数据。
