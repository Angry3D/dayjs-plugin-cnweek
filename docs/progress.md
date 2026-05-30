# 当前进度

最后更新：2026-05-30
语系：cn

本文档只追踪当前正在推进的阶段。已完成阶段应作为独立文件归档到 `docs/archive/`。

## 当前目标

评估并准备 `TODO-0010`：建立安全发布流程，优先确认 npm 2FA、人工 staged publish 边界、Trusted Publishing / OIDC / provenance 的可选升级路径与避免长期 npm token 的可行方案，并在仓库内补齐最小必要配置与文档。

## 关联待办

- `TODO-0010` 建立安全发布流程

## 当前计划

1. 盘点当前仓库的发布相关配置、工作流与包元数据，确认缺口。
2. 查证 npm 与 GitHub 官方最新发布安全实践，明确 2FA、Trusted Publishing / OIDC、provenance 的推荐落地方式。
3. 在不引入长期 npm token 的前提下，补齐只做发布前校验的 workflow 与配套文档。
4. 运行必要验证，记录未自动化部分与后续建议。

## 任务拆解

| 任务 | 状态 | 备注 |
| --- | --- | --- |
| 更新当前阶段文档并登记 `TODO-0010` | done | 已将安全发布流程评估写入当前进度。 |
| 盘点仓库现有发布配置与缺口 | done | 已确认当前仓库原先缺少 release workflow 与维护者发布说明。 |
| 查证 npm / GitHub 官方安全发布建议 | done | 已以官方文档为依据，确认 Trusted Publishing + provenance + 2FA 的落地方向。 |
| 准备最小可行发布配置与文档 | done | 已新增只做发布前校验的 `release.yml` 与 `docs/release.md`，并在 README 增加维护者发布说明入口。 |
| 执行验证并沉淀结论 | done | 已执行 `pnpm run verify` 与 `git diff --check`；未进行真实 npm 发布。 |

## 状态

done

## 决策记录

- 本阶段先以调研与准备为主，只有在能小步验证的情况下才补充 workflow 或文档，不做真实 npm 发布。
- 默认不使用长期 `NPM_TOKEN`，也不让 Codex 或 GitHub Actions 主动执行 `npm stage publish`。
- 将人工 staged publish 作为默认方案，以保留维护者 2FA 审批；如后续需要 OIDC / provenance，再由维护者明确授权 CI 发布步骤。

## 阻塞项

- 仓库内准备已完成，但仍需仓库维护者在 npm 后台启用 2FA，并移除旧的长期 npm token（如存在）。Trusted Publisher 仅在后续决定让 CI 执行发布命令时需要配置。

## 验证

- `pnpm run verify`
- `git diff --check`
- workflow 采用静态自检，不包含真实 `npm stage publish`

## 下一步

等待维护者按 `docs/release.md` 完成 npm 2FA 与发布权限检查；准备好下一个版本号后，通过 `v*` tag 触发 release check，再由维护者本人执行 staged publish。
