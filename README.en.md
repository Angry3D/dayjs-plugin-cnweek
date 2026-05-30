# @relaxcoder/dayjs-plugin-cnweek

[简体中文](README.md) | English

A Day.js plugin for getting or setting the Chinese-style week of year.

## What Is the Chinese-Style Week of Year?

This plugin uses the following rules:

- Monday is the first day of a week, and Sunday is the last day of a week.
- Week 1 starts on January 1 and ends on the first Sunday of the year, so week
  1 may contain fewer than 7 days.
- Middle weeks are regular full weeks.
- The last week ends on December 31, so it may also contain fewer than 7 days.

For example, in 2023:

| Week   | Date range              |
| ------ | ----------------------- |
| Week 1 | 2023-01-01 ~ 2023-01-01 |
| Week 2 | 2023-01-02 ~ 2023-01-08 |
| Week 3 | 2023-01-09 ~ 2023-01-15 |

## Installation

```bash
npm install dayjs @relaxcoder/dayjs-plugin-cnweek
```

Or with pnpm:

```bash
pnpm add dayjs @relaxcoder/dayjs-plugin-cnweek
```

## Quick Start

```js
import dayjs from 'dayjs'
import cnWeek from '@relaxcoder/dayjs-plugin-cnweek'

dayjs.extend(cnWeek)

const info = dayjs('2023-01-12').cnWeek()

info.week // 3
info.start.format('YYYY-MM-DD') // '2023-01-09'
info.end.format('YYYY-MM-DD') // '2023-01-15'
```

Set a date to a specific Chinese-style week:

```js
dayjs('2023-01-30').cnWeek(1).format('YYYY-MM-DD')
// '2023-01-01'

dayjs('2024-02-29').cnWeek(10).format('YYYY-MM-DD')
// '2024-03-07'
```

CommonJS:

```js
const dayjs = require('dayjs')
const cnWeek = require('@relaxcoder/dayjs-plugin-cnweek')

dayjs.extend(cnWeek)

dayjs('2023-01-12').cnWeek()
```

## API

### `cnWeek()`

Gets the Chinese-style week information for the current date.

```ts
interface CnWeekInfo {
  week: number
  start: Dayjs
  end: Dayjs
}
```

Example:

```js
const info = dayjs('2024-02-29').cnWeek()

info.week // 9
info.start.format('YYYY-MM-DD') // '2024-02-26'
info.end.format('YYYY-MM-DD') // '2024-03-03'
```

### `cnWeek(week)`

Sets the date to the specified Chinese-style week in the current year and
returns a new Day.js object.

```ts
cnWeek(week: number | string): Dayjs
```

Notes:

- `week` can be a number or a string that can be parsed as an integer.
- If `week` is less than 1, the result falls into the corresponding week of a
  previous year.
- If `week` is greater than the maximum week of the current year, the result
  falls into the corresponding week of a future year.
- If `week` cannot be parsed as a number, the original Day.js object is
  returned.

Examples:

```js
dayjs('2023-01-30').cnWeek(2).format('YYYY-MM-DD')
// '2023-01-02'

dayjs('2023-01-30').cnWeek(0).format('YYYY-MM-DD')
// '2022-12-31'

dayjs('2024-02-29').cnWeek('10abc').format('YYYY-MM-DD')
// '2024-03-07'
```

## TypeScript

This package includes built-in TypeScript declarations. After
`dayjs.extend(cnWeek)`, Day.js instances get the `cnWeek()` and `cnWeek(week)`
methods.

```ts
import dayjs from 'dayjs'
import cnWeek from '@relaxcoder/dayjs-plugin-cnweek'

dayjs.extend(cnWeek)

const info = dayjs().cnWeek()
```

## Compatibility

- Supports ESM `import` and CommonJS `require`.
- Requires `dayjs >=1.8.0 <2`.
- The runtime code does not depend on Node-specific APIs.
- The package is marked as side-effect free for tree shaking.

## License

MIT
