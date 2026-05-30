# 当前进度

最后更新：2026-05-30
语系：cn

本文档只追踪当前正在推进的阶段。已完成阶段应作为独立文件归档到 `docs/archive/`。

## 当前目标

推进 `TODO-0012`：增加代码质量脚本和静态检查，让格式检查与 TypeScript 静态检查可以通过统一 lint 命令在本地和 CI 中执行。

## 关联待办

- `TODO-0012` 增加代码质量脚本和静态检查

## 当前计划

1. 归档已完成的 `TODO-0011`。
2. 基于现有 Prettier 和 TypeScript 配置补充质量检查脚本。
3. 增加 `.prettierignore`，避免检查构建产物、缓存和锁文件。
4. 将 lint 步骤纳入 CI 与 `verify`。
5. 运行验证并记录结果。

## 任务拆解

| 任务                                       | 状态 | 备注                                                                         |
| ------------------------------------------ | ---- | ---------------------------------------------------------------------------- |
| 归档 `TODO-0011` 版本管理与 changelog 流程 | done | 已写入 `docs/archive/2026-05-30-versioning-changelog.md` 并从 backlog 移除。 |
| 补充格式检查脚本                           | done | 已新增 `format`、`format:check` 与 `.prettierignore`。                       |
| 补充统一 lint 脚本                         | done | 已新增 `lint = format:check + typecheck`。                                   |
| 接入 CI 与 verify                          | done | 已在 CI 增加 lint 步骤，并让 `verify` 先执行 `lint`。                        |
| 执行验证并沉淀结论                         | done | 已运行 `pnpm run lint`、`pnpm run verify` 与 `git diff --check`。            |

## 状态

done

## 决策记录

- 当前先使用已有 Prettier 和 TypeScript 能力，不新增 ESLint 依赖。
- `lint` 聚合格式检查和 TypeScript 静态检查，避免本地与 CI 命令分裂。
- `verify` 先执行 `lint`，再执行测试和 pack dry-run。

## 阻塞项

暂无。

## 验证

- `pnpm run lint`
- `pnpm run verify`
- `git diff --check`

## 下一步

等待用户确认后归档 `TODO-0012`；下一阶段建议推进 `TODO-0006` 或 `TODO-0008`。真实发布仍保留到全部优化完成后的最终阶段。
