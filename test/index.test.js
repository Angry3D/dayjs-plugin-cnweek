import dayjs from 'dayjs'
import cnWeek from '../build/index'

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

  test.each([
    ['2023-01-01', { week: 1, start: '2023-01-01', end: '2023-01-01' }],
    ['2023-01-02', { week: 2, start: '2023-01-02', end: '2023-01-08' }],
    ['2023-01-08', { week: 2, start: '2023-01-02', end: '2023-01-08' }],
    ['2023-01-12', { week: 3, start: '2023-01-09', end: '2023-01-15' }],
    ['2021-01-01', { week: 1, start: '2021-01-01', end: '2021-01-03' }],
    ['2022-01-01', { week: 1, start: '2022-01-01', end: '2022-01-02' }],
    ['2024-01-01', { week: 1, start: '2024-01-01', end: '2024-01-07' }],
    ['2024-02-29', { week: 9, start: '2024-02-26', end: '2024-03-03' }],
    ['2020-12-31', { week: 53, start: '2020-12-28', end: '2020-12-31' }],
    ['2024-12-31', { week: 53, start: '2024-12-30', end: '2024-12-31' }],
    ['2018-12-31', { week: 53, start: '2018-12-31', end: '2018-12-31' }]
  ])('%s', (ymd, expected) => {
    expect(transform(ymd)).toEqual(expected)
  })
})

describe('set cnWeek', () => {
  function transform(ymd, week) {
    return dayjs(ymd).cnWeek(week).format('YYYY-MM-DD')
  }

  function expectSetWithinCnWeek(ymd, week, expectedYear, expectedWeek) {
    const result = dayjs(ymd).cnWeek(week)
    expect(result.year()).toBe(expectedYear)
    expect(result.cnWeek().week).toBe(expectedWeek)
  }

  test.each([
    ['2023-01-30', 1, '2023-01-01'],
    ['2023-01-30', 2, '2023-01-02'],
    ['2024-02-29', 1, '2024-01-04'],
    ['2024-02-29', 9, '2024-02-29'],
    ['2024-02-29', 10, '2024-03-07'],
    ['2024-02-29', '10abc', '2024-03-07'],
    ['2024-02-29', 53, '2024-12-31']
  ])('sets %s to week %s', (ymd, week, expected) => {
    expect(transform(ymd, week)).toBe(expected)
  })

  test.each([
    ['2023-01-30', 0, 2022, 53],
    ['2023-01-30', 54, 2024, 1],
    ['2024-06-12', 107, 2026, 1],
    ['2024-06-12', -52, 2023, 1]
  ])(
    'sets %s to cross-year week %s',
    (ymd, week, expectedYear, expectedWeek) => {
      expectSetWithinCnWeek(ymd, week, expectedYear, expectedWeek)
    }
  )

  test.each([
    ['2024-06-12', 1000, 2042, 45],
    ['2024-06-12', -1000, 2005, 8],
    ['2024-06-12', 10000, 2212, 28],
    ['2024-06-12', -10000, 1835, 23]
  ])(
    'sets %s to large cross-year week %s',
    (ymd, week, expectedYear, expectedWeek) => {
      expectSetWithinCnWeek(ymd, week, expectedYear, expectedWeek)
    }
  )

  test('returns itself when week value cannot be parsed as a number', () => {
    expect(transform('2024-02-29', 'abc')).toBe('2024-02-29')
  })
})
