# 项目事实

最后更新：2026-05-30
语系：cn

本文档记录相对稳定的项目事实。不要用它追踪当前任务，也不要把长期历史归档堆在这里。

## 已确认事实

- 识别到项目文件：package.json, README.md。
- 仓库包含 `src/` 目录。
- 包名称：`@relaxcoder/dayjs-plugin-cnweek`。
- 当前 `package.json` 版本：`1.1.0`。
- 包描述：a plugin of dayjs, to get or set the chinese week
- 项目命令定义在 `package.json` 的 scripts 中。
- 包 CommonJS 入口声明为 `dist/index.cjs`。
- 包 ES Module 入口声明为 `dist/index.mjs`。
- `package.json` 包含现代 `exports` 入口，提供 `types`、`import`、`require` 和 `default` 条件。
- 源码入口为 `src/index.ts`，测试入口为 `test/index.test.js`。
- `cnWeek(week)` 设置逻辑会显式解析 week 输入，并对跨年 week 使用迭代归一化。
- 大跨度 `cnWeek(week)` 归一化使用 400 年 / 21215 周周期跳跃。
- 构建工具为 TypeScript + Rollup，测试工具为 Jest，转译配置使用 Babel。
- `dayjs` 声明为 peer dependency，范围为 `>=1.8.0 <2`，同时作为开发依赖用于测试。
- `package.json` 声明 `sideEffects: false`。
- 当前仓库记录 `pnpm-lock.yaml`。
- `package.json` 声明包管理器为 `pnpm@8.15.9`。
- 仓库包含 GitHub Actions CI 配置：`.github/workflows/ci.yml`。
- 仓库包含发布前校验 workflow：`.github/workflows/release.yml`。
- 仓库包含 Prettier 配置：`prettier.config.cjs`。
- 仓库包含 Prettier ignore 配置：`.prettierignore`。
- `package.json` 声明类型入口为 `dist/index.d.ts`。
- 项目包含 TypeScript 类型验证入口：`test/types.ts`。
- 维护者发布说明记录在 `docs/release.md`。
- 项目包含变更记录文件：`CHANGELOG.md`。
- 版本管理与 changelog 流程记录在 `docs/versioning.md`。
- `package.json.files` 包含 `CHANGELOG.md`，发布包会携带变更记录。
- README 面向 npm 使用者，主要包含安装、快速开始、API、TypeScript 和兼容性说明。
- README 不再依赖本地 `image.png` 展示中国式周数。
- 仓库包含英文 README：`README.en.md`。
- `README.md` 与 `README.en.md` 顶部提供中英文切换链接。
- `package.json.files` 包含 `README.en.md`，发布包会携带英文 README。
- 项目定位为已经发布过的 npm 开源插件包，当前目标是对现有工程做优化和整改。
- 用户已确认后续优化方向包括：使用 pnpm 作为包管理器、使用 ES Module 作为模块化方案、使用 TypeScript。

## 常用命令

- `build:ts`: `tsc -p tsconfig.build.json`
- `format`: `prettier --write .`
- `format:check`: `prettier --check .`
- `lint`: `pnpm run format:check && pnpm run typecheck`
- `build`: `rollup -c rollup.config.mjs`
- `test`: `jest`
- `typecheck`: `tsc --noEmit`
- `verify`: `pnpm run lint && pnpm test && pnpm run pack:dry-run`
- `release workflow verify step`: `pnpm run verify`

## 推断事实

暂无。

## 待确认事项

暂无。

## 证据来源

- `package.json` 包含 `scripts` 对象。
- 仓库根目录存在 `package.json`。
- `package.json` 的 `main` 字段为 `dist/index.cjs`。
- `package.json` 的 `module` 字段为 `dist/index.mjs`。
- `package.json` 的 `peerDependencies` 包含 `dayjs`。
- `rollup.config.mjs` 存在，并以 `build/index.js` 为输入，输出 `dist/index.mjs` 和 `dist/index.cjs`。
- `jest.config.mjs` 存在，并匹配 `test/(.*).test.js$`。
- `babel.config.cjs` 存在。
- `src/index.ts`、`test/index.test.js` 和 `test/types.ts` 存在。
- `src/index.ts` 包含 `normalizeWeekValue`、`normalizeCnWeekTarget` 和 `setCnWeekInYear` helper。
- `test/index.test.js` 覆盖带后缀字符串解析、大跨度跨年 week 设置和 54 周年份。
- `.github/workflows/release.yml` 存在，会在 `v*` tag 推送后执行 `pnpm run verify`，不包含 npm 发布命令。
- `.github/workflows/ci.yml` 存在，会执行 install、test、lint、build 和 pack dry-run。
- `docs/release.md` 说明 npm 2FA、人工 staged publish 边界，以及 Trusted Publishing / OIDC / provenance 的后续可选升级路径。
- `prettier.config.cjs` 存在，配置 80 字符宽度、单引号、无分号和无 trailing comma。
- `.prettierignore` 存在，忽略依赖、构建产物、缓存、tgz 和 lockfile。
- `CHANGELOG.md` 存在，并包含 `[Unreleased]` 与 `[1.0.0]` 区块。
- `docs/versioning.md` 存在，记录手动 SemVer、changelog 维护规则和最终发布前流程。
- `package.json.files` 包含 `CHANGELOG.md`。
- `README.md` 使用文字和表格解释中国式周数，并移除本地开发、发布和版本管理章节。
- `README.en.md` 存在，并与 `README.md` 互相提供语言切换入口。
- 用户通过 pnpm 安装依赖后生成 `pnpm-lock.yaml`，并在 2026-05-30 的 npm 发布包边界整改阶段提交。
- 用户于 2026-05-30 明确说明当前工程是已经发布过的 npm 插件包，目前任务是对当前工程做优化和整改。
- 用户于 2026-05-30 明确后续优化方向为 pnpm、ES Module 和 TypeScript。
- 用户于 2026-05-30 确认 `@relaxcoder/dayjs-plugin-cnweek@1.1.0` 已成功发布。
- 用户于 2026-05-30 明确要求 `package.json` 纳入 `"packageManager": "pnpm@8.15.9"` 和 `engines.node: ">=20 <21"`。
- 用户于 2026-05-30 根据当前构建产物兼容性判断，确认移除 `engines.node` 限制。
- 2026-05-30 新增 `.github/workflows/ci.yml`，CI 使用 Node 20 与 `pnpm@8.15.9`，执行 install、test、build 和 pack dry-run。
- 2026-05-30 将源码迁移到 TypeScript，并通过 `tsc` 生成 `build/index.js` 与 `dist/index.d.ts`。
- 2026-05-30 配置 ESM 优先入口和 CJS fallback，发布入口为 `exports.import`、`exports.require`、`exports.types`。
- 2026-05-30 明确包元数据：`sideEffects: false`，`peerDependencies.dayjs` 为 `>=1.8.0 <2`，README 增加兼容性说明。
- 2026-05-30 新增 `release.yml` 与 `docs/release.md`，默认只自动执行发布前校验；`npm stage publish` 由维护者本人执行，以避免长期 npm token 并保留 2FA 审批。
- 2026-05-30 新增 `CHANGELOG.md` 与 `docs/versioning.md`，采用手动 SemVer + changelog 流程，并将真实发布保留到最终阶段。
- 2026-05-30 增加 `format`、`format:check`、`lint` 脚本，并将 lint 纳入 CI 与 `verify`。
- 2026-05-30 重构 `cnWeek(week)` 输入解析与跨年设置逻辑，保留 `parseInt` 兼容语义，并用迭代归一化替代跨年递归。
- 2026-05-30 使用 400 年 / 21215 周周期优化大跨度 `cnWeek(week)` 归一化，并补充 54 周年份测试。
- 2026-05-30 新增 `README.en.md`，并在中英文 README 顶部提供 GitHub 手动语言切换入口。
- 2026-05-30 重写 README 为面向 npm 使用者的说明，移除 `image.png` 依赖和维护者细节。

## 重要文件

- `package.json`
- `pnpm-lock.yaml`
- `README.md`
- `README.en.md`
- `CHANGELOG.md`
- `docs/release.md`
- `docs/versioning.md`
- `.prettierignore`
- `prettier.config.cjs`
- `src/index.ts`
- `test/index.test.js`
- `test/types.ts`
- `rollup.config.mjs`
- `jest.config.mjs`
- `babel.config.cjs`
- `tsconfig.json`
- `tsconfig.build.json`
- `.github/workflows/release.yml`

## 目录说明

- `src/` 存在。
- `test/` 存在。
