# Changelog

本项目的变更记录遵循 [Keep a Changelog](https://keepachangelog.com/) 风格，并使用
SemVer 管理版本号。

## [Unreleased]

### Added

- 增加 TypeScript 构建与类型声明输出。
- 增加 ESM 优先入口和 CommonJS fallback。
- 增加 GitHub Actions CI 与 release check。
- 增加安全发布准备文档，明确人工 staged publish 边界。
- 增加 changelog 与版本管理流程文档。
- 增加格式检查和统一 lint 脚本，并纳入 CI 与 verify。
- 增加 cnWeek 边界测试矩阵。

### Changed

- 使用 pnpm 作为项目包管理器。
- 明确 npm 包发布文件边界和兼容性元数据。
- 明确 `dayjs` peer dependency 范围为 `>=1.8.0 <2`。
- 重构 `cnWeek(week)` 输入解析和跨年设置逻辑，保持兼容行为并减少深层递归。
- 重写 README 为面向 npm 使用者的说明，移除图片依赖和维护者细节。

## [1.0.0]

### Added

- 发布 `@relaxcoder/dayjs-plugin-cnweek` 初始版本。
