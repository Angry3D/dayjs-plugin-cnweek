# @relaxcoder/dayjs-plugin-cnweek

A Day.js plugin for getting or setting the Chinese-style week of year.

一款 `dayjs` 插件，用于获取或设置“中国式第几周”。

## 什么是“中国式第几周”

本插件中的“中国式第几周”规则如下：

- 周一是一周的第一天，周日是一周的最后一天。
- 第 1 周从当年的 1 月 1 日开始，到当周周日结束，所以第 1 周可能不满 7 天。
- 中间周都是完整的自然周。
- 最后一周到当年的 12 月 31 日结束，所以最后一周也可能不满 7 天。

以 2023 年为例：

| 周数    | 日期范围                |
| ------- | ----------------------- |
| 第 1 周 | 2023-01-01 ~ 2023-01-01 |
| 第 2 周 | 2023-01-02 ~ 2023-01-08 |
| 第 3 周 | 2023-01-09 ~ 2023-01-15 |

## 安装

```bash
npm install dayjs @relaxcoder/dayjs-plugin-cnweek
```

也可以使用 pnpm：

```bash
pnpm add dayjs @relaxcoder/dayjs-plugin-cnweek
```

## 快速开始

```js
import dayjs from 'dayjs'
import cnWeek from '@relaxcoder/dayjs-plugin-cnweek'

dayjs.extend(cnWeek)

const info = dayjs('2023-01-12').cnWeek()

info.week // 3
info.start.format('YYYY-MM-DD') // '2023-01-09'
info.end.format('YYYY-MM-DD') // '2023-01-15'
```

设置到指定周：

```js
dayjs('2023-01-30').cnWeek(1).format('YYYY-MM-DD')
// '2023-01-01'

dayjs('2024-02-29').cnWeek(10).format('YYYY-MM-DD')
// '2024-03-07'
```

CommonJS：

```js
const dayjs = require('dayjs')
const cnWeek = require('@relaxcoder/dayjs-plugin-cnweek')

dayjs.extend(cnWeek)

dayjs('2023-01-12').cnWeek()
```

## API

### `cnWeek()`

获取当前日期所在的中国式周信息。

```ts
interface CnWeekInfo {
  week: number
  start: Dayjs
  end: Dayjs
}
```

示例：

```js
const info = dayjs('2024-02-29').cnWeek()

info.week // 9
info.start.format('YYYY-MM-DD') // '2024-02-26'
info.end.format('YYYY-MM-DD') // '2024-03-03'
```

### `cnWeek(week)`

设置到当前年份的指定中国式周，返回一个新的 Day.js 对象。

```ts
cnWeek(week: number | string): Dayjs
```

说明：

- `week` 可以是数字，也可以是可解析为整数的字符串。
- 如果 `week` 小于 1，会落到往年的对应周。
- 如果 `week` 大于当年最大周数，会落到后续年份的对应周。
- 如果 `week` 无法解析为数字，会返回原 Day.js 对象。

示例：

```js
dayjs('2023-01-30').cnWeek(2).format('YYYY-MM-DD')
// '2023-01-02'

dayjs('2023-01-30').cnWeek(0).format('YYYY-MM-DD')
// '2022-12-31'

dayjs('2024-02-29').cnWeek('10abc').format('YYYY-MM-DD')
// '2024-03-07'
```

## TypeScript

本包内置 TypeScript 类型声明。使用 `dayjs.extend(cnWeek)` 后，`Dayjs`
实例会获得 `cnWeek()` 和 `cnWeek(week)` 类型。

```ts
import dayjs from 'dayjs'
import cnWeek from '@relaxcoder/dayjs-plugin-cnweek'

dayjs.extend(cnWeek)

const info = dayjs().cnWeek()
```

## 兼容性

- 支持 ESM `import` 和 CommonJS `require`。
- 需要配合 `dayjs >=1.8.0 <2` 使用。
- 当前运行时代码不依赖 Node 专属 API。
- 包声明为无副作用模块，支持打包工具进行 tree shaking。

## License

MIT
