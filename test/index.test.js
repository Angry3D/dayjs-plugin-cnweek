import dayjs from 'dayjs'
import cnWeek from '../src/index'

dayjs.extend(cnWeek)

describe('get cnWeek', () => {
  function transform(ymd) {
    const result = dayjs(ymd).cnWeek()
    return {
      week: result.week,
      start: result.start.format('YYYY-MM-DD'),
      end: result.end.format('YYYY-MM-DD')
    }
  }

  test('2023-01-01', () => {
    expect(transform('2023-01-01')).toEqual({
      week: 1,
      start: '2023-01-01',
      end: '2023-01-01'
    })
  })
  test('2023-01-02', () => {
    expect(transform('2023-01-02')).toEqual({
      week: 2,
      start: '2023-01-02',
      end: '2023-01-08'
    })
  })
  test('2023-01-08', () => {
    expect(transform('2023-01-08')).toEqual({
      week: 2,
      start: '2023-01-02',
      end: '2023-01-08'
    })
  })
  test('2023-01-12', () => {
    expect(transform('2023-01-12')).toEqual({
      week: 3,
      start: '2023-01-09',
      end: '2023-01-15'
    })
  })
})

describe('set cnWeek', () => {
  function transform(ymd, week) {
    return dayjs(ymd).cnWeek(week).format('YYYY-MM-DD')
  }
  function contain(ymd, ymdArray) {
    return ymdArray.includes(ymd)
  }

  test('2023-01-30', () => {
    // 非跨年的计算，除了第一周和最后一周不保证星期对齐，其余日期会保持星期对齐
    expect(transform('2023-01-30', 1)).toBe('2023-01-01')
    expect(transform('2023-01-30', 2)).toBe('2023-01-02')

    // 跨年的计算，只保证在指定周，不保证星期对齐
    expect(
      contain(transform('2023-01-30', 0), [
        '2022-12-26',
        '2022-12-27',
        '2022-12-28',
        '2022-12-29',
        '2022-12-30',
        '2022-12-31'
      ])
    ).toBe(true)
    expect(
      contain(transform('2023-01-30', 54), [
        '2024-01-01',
        '2024-01-02',
        '2024-01-03',
        '2024-01-04',
        '2024-01-05',
        '2024-01-06',
        '2024-01-07'
      ])
    ).toBe(true)
  })
})
