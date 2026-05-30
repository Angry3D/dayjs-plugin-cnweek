# 归档

最后更新：2026-05-30
语系：cn

本目录存放已完成阶段的记录。每个完成阶段使用一个独立 Markdown 文件，不要把所有历史持续追加到单个文件中。

## 命名规范

使用以下格式：

```text
YYYY-MM-DD-short-stage-name.md
```

示例：

```text
2026-05-29-ai-docs-bootstrap.md
2026-05-30-build-config-optimization.md
2026-06-02-seo-metadata-pass.md
```

## 归档模板

创建新的归档文件时，可以使用 skill assets 中的 `archive-entry.md.template`。

## 归档索引

| 日期       | 归档文件                                       | 关联待办             | 阶段                           |
| ---------- | ---------------------------------------------- | -------------------- | ------------------------------ |
| 2026-05-30 | `2026-05-30-npm-package-boundary.md`           | TODO-0001, TODO-0002 | npm 发布包边界整改             |
| 2026-05-30 | `2026-05-30-pnpm-workflow.md`                  | TODO-0007            | pnpm 管理器与本地验证流程      |
| 2026-05-30 | `2026-05-30-cnweek-boundary-tests.md`          | TODO-0003            | cnWeek 边界测试矩阵            |
| 2026-05-30 | `2026-05-30-ci-workflow.md`                    | TODO-0009            | CI 基础验证流水线              |
| 2026-05-30 | `2026-05-30-typescript-types.md`               | TODO-0004, TODO-0014 | TypeScript 迁移与类型验证      |
| 2026-05-30 | `2026-05-30-esm-exports.md`                    | TODO-0005            | ESM 与现代 exports 入口        |
| 2026-05-30 | `2026-05-30-package-compatibility-metadata.md` | TODO-0013            | 运行时兼容范围和包元数据       |
| 2026-05-30 | `2026-05-30-safe-release-preparation.md`       | TODO-0010            | 安全发布准备流程               |
| 2026-05-30 | `2026-05-30-versioning-changelog.md`           | TODO-0011            | 版本管理与 changelog 流程      |
| 2026-05-30 | `2026-05-30-quality-checks.md`                 | TODO-0012            | 代码质量脚本和静态检查         |
| 2026-05-30 | `2026-05-30-cnweek-input-refactor.md`          | TODO-0006            | cnWeek 输入处理与跨年设置重构  |
| 2026-05-30 | `2026-05-30-readme-user-facing.md`             | TODO-0008            | README 使用者文档整理          |
| 2026-05-30 | `2026-05-30-large-week-normalization.md`       | TODO-0015            | 大跨度 week 归一化与 54 周测试 |
| 2026-05-30 | `2026-05-30-english-readme.md`                 | TODO-0016            | 英文 README 与语言切换         |
| 2026-05-30 | `2026-05-30-release-v1.1.0.md`                 | TODO-0017            | v1.1.0 发布                    |
| 2026-05-30 | `2026-05-30-pnpm-version-source.md`            | TODO-0018            | pnpm 版本单一来源              |

## 工作流

阶段完成后：

1. 在本目录创建新的归档文件。
2. 写入目标、关联待办、计划、完成内容、验证、决策和后续事项。
3. 在本文件的归档索引中登记新归档。
4. 从 `docs/backlog.md` 移除已归档事项。
5. 更新 `docs/progress.md`，让它只反映下一阶段或当前空状态。
