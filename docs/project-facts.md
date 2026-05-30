# 项目事实

最后更新：2026-05-30
语系：cn

本文档记录相对稳定的项目事实。不要用它追踪当前任务，也不要把长期历史归档堆在这里。

## 已确认事实

- 识别到项目文件：package.json, README.md。
- 仓库包含 `src/` 目录。
- 包名称：`@relaxcoder/dayjs-plugin-cnweek`。
- 包描述：a plugin of dayjs, to get or set the chinese week
- 项目命令定义在 `package.json` 的 scripts 中。
- 包入口声明为 `dist/index.js`。
- 源码入口为 `src/index.js`，测试入口为 `test/index.test.js`。
- 构建工具为 Rollup，测试工具为 Jest，转译配置使用 Babel。
- `dayjs` 声明为 peer dependency，同时作为开发依赖用于测试。
- 当前仓库记录 `pnpm-lock.yaml`。
- `package.json` 声明包管理器为 `pnpm@8.15.9`。
- 项目定位为已经发布过的 npm 开源插件包，当前目标是对现有工程做优化和整改。
- 用户已确认后续优化方向包括：使用 pnpm 作为包管理器、使用 ES Module 作为模块化方案、使用 TypeScript。

## 常用命令

- `build`: `rollup -c rollup.config.mjs`
- `test`: `jest`

## 推断事实

暂无。

## 待确认事项

暂无。

## 证据来源

- `package.json` 包含 `scripts` 对象。
- 仓库根目录存在 `package.json`。
- `package.json` 的 `main` 字段为 `dist/index.js`。
- `package.json` 的 `peerDependencies` 包含 `dayjs`。
- `rollup.config.mjs` 存在，并以 `src/index.js` 为输入、`dist/index.js` 为输出。
- `jest.config.mjs` 存在，并匹配 `test/(.*).test.js$`。
- `babel.config.cjs` 存在。
- `src/index.js` 和 `test/index.test.js` 存在。
- 用户通过 pnpm 安装依赖后生成 `pnpm-lock.yaml`，并在 2026-05-30 的 npm 发布包边界整改阶段提交。
- 用户于 2026-05-30 明确说明当前工程是已经发布过的 npm 插件包，目前任务是对当前工程做优化和整改。
- 用户于 2026-05-30 明确后续优化方向为 pnpm、ES Module 和 TypeScript。
- 用户于 2026-05-30 明确要求 `package.json` 纳入 `"packageManager": "pnpm@8.15.9"` 和 `engines.node: ">=20 <21"`。
- 用户于 2026-05-30 根据当前构建产物兼容性判断，确认移除 `engines.node` 限制。

## 重要文件

- `package.json`
- `pnpm-lock.yaml`
- `README.md`
- `src/index.js`
- `test/index.test.js`
- `rollup.config.mjs`
- `jest.config.mjs`
- `babel.config.cjs`

## 目录说明

- `src/` 存在。
- `test/` 存在。
