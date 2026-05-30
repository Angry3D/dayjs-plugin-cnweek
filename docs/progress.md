# 当前进度

最后更新：2026-05-30
语系：cn

本文档只追踪当前正在推进的阶段。已完成阶段应作为独立文件归档到 `docs/archive/`。

## 当前目标

准备 `v1.1.0` 版本与 changelog，但不执行 tag、push 或真实 npm 发布。

## 关联待办

- `TODO-0017` 准备 `v1.1.0` 版本与 changelog

## 当前计划

1. 将 `TODO-0017` 登记为当前阶段。
2. 将 `CHANGELOG.md` 的 `[Unreleased]` 内容落到 `1.1.0 - 2026-05-30`。
3. 更新 `package.json` 版本号为 `1.1.0`。
4. 运行完整验证和空白检查。
5. 提交 release prep 改动，并汇总维护者后续手动步骤。

## 任务拆解

| 任务                      | 状态 | 备注                                             |
| ------------------------- | ---- | ------------------------------------------------ |
| 登记 `TODO-0017` 当前阶段 | done | 已开始 release prep。                            |
| 更新 changelog            | done | 已将 `[Unreleased]` 内容移动到 `1.1.0`。         |
| 更新 package 版本号       | done | 已更新为 `1.1.0`。                               |
| 执行验证                  | done | 已运行 `pnpm run verify` 与 `git diff --check`。 |
| 提交 release prep         | done | 不创建 tag，不 push，不执行 npm 发布。           |

## 状态

done

## 决策记录

- 根据 `docs/versioning.md`，本轮新增 TypeScript 类型、ESM 入口和现代 exports，使用 `minor` 版本。
- 本阶段只准备发布提交，不执行真实发布。
- `npm stage publish --access public` 必须由维护者本人执行。

## 阻塞项

暂无。

## 验证

- `pnpm run format`
- `pnpm run verify`
- `git diff --check`
- `npm pack --dry-run` 内容已通过 `pnpm run verify` 覆盖，版本为 `1.1.0`。

## 下一步

提醒维护者手动 push、创建/推送 tag、等待 release check，并最终由维护者执行 npm staged publish。
