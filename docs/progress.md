# 当前进度

最后更新：2026-05-30
语系：cn

本文档只追踪当前正在推进的阶段。已完成阶段应作为独立文件归档到 `docs/archive/`。

## 当前目标

迁移到 TypeScript 并建立类型验证策略。

## 关联待办

- TODO-0004：迁移到 TypeScript 并发布类型声明
- TODO-0014：建立 TypeScript 测试与类型验证策略

## 当前计划

1. 安装 TypeScript，并新增 `tsconfig.json`。
2. 将 `src/index.js` 迁移为 `src/index.ts`，声明 Day.js `cnWeek` 扩展类型。
3. 调整构建链路，生成 `dist/index.js` 与 `dist/index.d.ts`。
4. 新增类型验证用例，并把 `typecheck` 纳入本地验证与 CI。
5. 执行测试、构建、类型检查和 pack dry-run。

## 任务拆解

| 任务 | 状态 | 备注 |
| --- | --- | --- |
| 归档 TODO-0009 | done | 已创建归档并从 backlog 移除。 |
| 更新进度与 backlog 状态 | done | 已将 TODO-0004、TODO-0014 设为当前阶段。 |
| 安装并配置 TypeScript | done | 已增加 `typescript`、`tsconfig.json` 与脚本。 |
| 迁移源码与类型声明 | done | 已将 `src/index.js` 迁移为 `src/index.ts`。 |
| 增加类型验证 | done | 已验证插件类型扩展和公开 API 消费方式。 |
| 执行验证 | done | 已跑 test、typecheck、build、pack dry-run。 |

## 状态

done

## 决策记录

- 本阶段优先建立类型声明与类型验证，不同步迁移到 ES Module exports 策略。
- 当前 Jest 测试通过 `pnpm run build:ts` 生成的 `build/index.js` 验证 TS 源码行为，不额外引入 ts-jest 或 Babel TypeScript 预设。
- `typecheck` 覆盖 `src/**/*.ts` 和 `test/**/*.ts`，并已纳入本地 `verify` 与 CI。

## 阻塞项

暂无。

## 验证

- `pnpm run typecheck`：通过。
- `pnpm test`：通过，1 个测试套件、22 个测试全部通过。
- `pnpm run verify`：通过，测试、类型检查、构建和 pack dry-run 全部通过。
- `pnpm install --frozen-lockfile`：通过，锁文件与 `package.json` 对齐。
- `npm pack --dry-run` tarball 内容包含 `dist/index.js` 和 `dist/index.d.ts`。

## 下一步

等待用户确认后归档 TODO-0004 和 TODO-0014；下一阶段建议处理 TODO-0005，采用 ES Module 并设计现代 `exports` 入口。
