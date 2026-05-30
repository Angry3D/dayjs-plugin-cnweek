# 当前进度

最后更新：2026-05-30
语系：cn

本文档只追踪当前正在推进的阶段。已完成阶段应作为独立文件归档到 `docs/archive/`。

## 当前目标

推进 `TODO-0016`：增加英文 README，并在 GitHub 上提供中英文手动切换入口。

## 关联待办

- `TODO-0016` 增加英文 README 与 GitHub 语言切换

## 当前计划

1. 新增 `README.en.md`，保持与中文 README 同样的使用者文档结构。
2. 在 `README.md` 顶部增加 English 切换链接。
3. 在 `README.en.md` 顶部增加简体中文切换链接。
4. 将 `README.en.md` 纳入 `package.json.files`。
5. 运行验证并记录结果。

## 任务拆解

| 任务                      | 状态 | 备注                                             |
| ------------------------- | ---- | ------------------------------------------------ |
| 登记 `TODO-0016` 当前阶段 | done | 已新增待办并切换当前进度。                       |
| 新增英文 README           | done | 已完整翻译当前中文使用者文档。                   |
| 增加语言切换入口          | done | 中英文 README 顶部已互链。                       |
| 更新发布包文件边界        | done | 已将 `README.en.md` 加入 `package.json.files`。  |
| 执行验证并沉淀结论        | done | 已运行 `pnpm run verify` 与 `git diff --check`。 |

## 状态

done

## 决策记录

- 默认 npm 展示仍使用 `README.md`。
- GitHub 手动切换通过 README 顶部互链实现。
- 英文 README 只面向使用者，不加入维护者发布或开发细节。

## 阻塞项

暂无。

## 验证

- `pnpm run verify`
- `git diff --check`
- `npm pack --dry-run` 由 `pnpm run verify` 触发，tarball 内容包含 `README.en.md`

## 下一步

等待用户确认是否归档 `TODO-0008`、`TODO-0015` 和 `TODO-0016`，再进入最终发布前总检查。
