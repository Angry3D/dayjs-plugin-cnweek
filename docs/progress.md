# 当前进度

最后更新：2026-05-30
语系：cn

本文档只追踪当前正在推进的阶段。已完成阶段应作为独立文件归档到 `docs/archive/`。

## 当前目标

执行最终发布前总检查，但不执行真实 npm 发布。

## 关联待办

暂无。当前 backlog 已清空，发布动作保留为最终人工步骤。

## 当前计划

1. 归档 `TODO-0008`、`TODO-0015`、`TODO-0016`。
2. 运行完整验证。
3. 检查 npm pack dry-run 内容。
4. 汇总需要维护者手动执行的最终发布步骤。

## 任务拆解

| 任务                   | 状态 | 备注                                                                  |
| ---------------------- | ---- | --------------------------------------------------------------------- |
| 归档剩余完成事项       | done | 已归档 `TODO-0008`、`TODO-0015`、`TODO-0016` 并清空 backlog。         |
| 运行完整验证           | done | 已运行 `pnpm run verify`。                                            |
| 检查 pack dry-run 内容 | done | tarball 包含 README、README.en、CHANGELOG、dist、LICENSE 和 package。 |
| 汇总人工发布步骤       | done | 已汇总人工步骤，不执行 tag、push 或 npm publish。                     |

## 状态

done

## 决策记录

- 本阶段只做发布前检查，不执行真实发布。
- `npm stage publish --access public` 必须由维护者本人执行。
- 发布前版本整理预计采用 `1.1.0`，但版本号更新应在维护者确认后执行。

## 阻塞项

暂无。

## 验证

- `pnpm run verify`
- `git diff --check`
- `npm pack --dry-run` 内容已通过 `pnpm run verify` 覆盖，包含：
  `CHANGELOG.md`、`LICENSE`、`README.en.md`、`README.md`、
  `dist/index.cjs`、`dist/index.d.ts`、`dist/index.mjs`、`package.json`。

## 下一步

等待维护者确认是否进入版本号与 changelog release 准备；真实 npm 发布仍保留为维护者最终手动步骤。
