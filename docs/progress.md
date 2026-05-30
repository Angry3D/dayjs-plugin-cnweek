# 当前进度

最后更新：2026-05-30
语系：cn

本文档只追踪当前正在推进的阶段。已完成阶段应作为独立文件归档到 `docs/archive/`。

## 当前目标

推进 `TODO-0011`：建立版本管理与 changelog 流程，为最终发布阶段准备清晰的版本号判断、变更记录和发布前检查规则。

## 关联待办

- `TODO-0011` 建立版本管理与 changelog 流程

## 当前计划

1. 盘点当前版本号、发布脚本、changelog 和 release 配置现状。
2. 选择适合当前仓库规模的版本管理方案，避免引入不必要的自动发版工具。
3. 增加 changelog、版本规则文档，并让 changelog 纳入 npm 包内容。
4. 运行必要验证，确认包内容与文档一致。

## 任务拆解

| 任务 | 状态 | 备注 |
| --- | --- | --- |
| 归档 `TODO-0010` 安全发布准备流程 | done | 已写入 `docs/archive/2026-05-30-safe-release-preparation.md` 并从 backlog 移除。 |
| 登记 `TODO-0011` 当前阶段 | done | 已将版本管理与 changelog 流程写入当前进度。 |
| 盘点版本与 release 现状 | done | 当前版本为 `1.0.0`，仓库原先没有 changelog 或 release 配置。 |
| 建立 changelog 和版本规则 | done | 已新增 `CHANGELOG.md`、`docs/versioning.md` 并更新包文件边界。 |
| 执行验证并沉淀结论 | done | 已运行 `pnpm run verify` 与 `git diff --check`，pack dry-run 包含 `CHANGELOG.md`。 |

## 状态

done

## 决策记录

- 当前仓库规模较小，先采用手动 SemVer + `CHANGELOG.md`，不引入 Changesets 或 semantic-release。
- 发布作为全部优化完成后的最后阶段；本阶段只准备版本与变更记录规则。
- `CHANGELOG.md` 应纳入 npm 包内容，方便消费者从发布包中查看变更。

## 阻塞项

暂无。

## 验证

- `pnpm run verify`
- `git diff --check`
- `npm pack --dry-run` 由 `pnpm run verify` 触发，tarball 内容包含 `CHANGELOG.md`

## 下一步

等待用户确认后归档 `TODO-0011`；下一阶段建议推进 `TODO-0012`，增加代码质量脚本和静态检查。真实发布仍保留到全部优化完成后的最终阶段。
