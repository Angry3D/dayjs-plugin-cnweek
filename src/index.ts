import type dayjs from 'dayjs'
import type { PluginFunc } from 'dayjs'

export interface CnWeekInfo {
  week: number
  start: dayjs.Dayjs
  end: dayjs.Dayjs
}

export type CnWeekValue = number | string

const CN_WEEK_CYCLE_YEARS = 400
const CN_WEEK_CYCLE_WEEKS = 21215

declare module 'dayjs' {
  interface Dayjs {
    cnWeek(): CnWeekInfo
    cnWeek(weekVal: CnWeekValue): dayjs.Dayjs
  }
}

const cnWeekPlugin: PluginFunc = (_option, dayClass, dayFactory) => {
  const proto = dayClass.prototype

  proto.cnWeek = function (this: dayjs.Dayjs, weekVal?: CnWeekValue) {
    if (typeof weekVal !== 'undefined') {
      const normalizedWeekVal = normalizeWeekValue(weekVal)

      if (Number.isNaN(normalizedWeekVal)) {
        return this
      }

      const target = normalizeCnWeekTarget(this, normalizedWeekVal)
      return setCnWeekInYear(target.date, target.week)
    }

    const startOfYearDay = this.startOf('y')
    const firstIsoWeekDay = getIsoWeekDay(startOfYearDay)

    const endOfYearDay = this.endOf('y')
    const curMs = this.valueOf()

    const fwStartDay = startOfYearDay
    const fwEndDay = getIsoEndOf(startOfYearDay)
    const fwStartMs = fwStartDay.valueOf()
    const fwEndMs = fwEndDay.valueOf()

    const lwStartDay = getIsoStartOf(endOfYearDay)
    const lwEndDay = endOfYearDay
    const lwStartMs = lwStartDay.valueOf()
    const lwEndMs = lwEndDay.valueOf()

    const week = getCnWeek(firstIsoWeekDay, getDayOfYear(this))
    let start: dayjs.Dayjs
    let end: dayjs.Dayjs

    if (curMs >= fwStartMs && curMs <= fwEndMs) {
      start = fwStartDay
      end = fwEndDay
    } else if (curMs >= lwStartMs && curMs <= lwEndMs) {
      start = lwStartDay
      end = lwEndDay
    } else {
      start = getIsoStartOf(this)
      end = getIsoEndOf(this)
    }

    return {
      week,
      start,
      end
    }
  } as dayjs.Dayjs['cnWeek']

  function normalizeWeekValue(weekVal: CnWeekValue) {
    return Number.parseInt(String(weekVal), 10)
  }

  function normalizeCnWeekTarget(date: dayjs.Dayjs, week: number) {
    let targetDate = date
    let targetWeek = week

    while (targetWeek < 1) {
      targetDate = targetDate.subtract(1, 'y')
      targetWeek += getMaxCnWeekOfYear(targetDate)

      const cycleCount = Math.floor((1 - targetWeek) / CN_WEEK_CYCLE_WEEKS)

      if (cycleCount > 0) {
        targetDate = targetDate.subtract(cycleCount * CN_WEEK_CYCLE_YEARS, 'y')
        targetWeek += cycleCount * CN_WEEK_CYCLE_WEEKS
      }
    }

    let targetMaxWeek = getMaxCnWeekOfYear(targetDate)

    while (targetWeek > targetMaxWeek) {
      targetWeek -= targetMaxWeek
      targetDate = targetDate.add(1, 'y')

      const cycleCount = Math.floor((targetWeek - 1) / CN_WEEK_CYCLE_WEEKS)

      if (cycleCount > 0) {
        targetDate = targetDate.add(cycleCount * CN_WEEK_CYCLE_YEARS, 'y')
        targetWeek -= cycleCount * CN_WEEK_CYCLE_WEEKS
      }

      targetMaxWeek = getMaxCnWeekOfYear(targetDate)
    }

    return {
      date: targetDate,
      week: targetWeek
    }
  }

  function setCnWeekInYear(date: dayjs.Dayjs, week: number) {
    const startOfYearDay = date.startOf('y')
    const firstIsoWeekDay = getIsoWeekDay(startOfYearDay)

    const endOfYearDay = date.endOf('y')
    const lastIsoWeekDay = getIsoWeekDay(endOfYearDay)

    const minWeek = 1
    const maxWeek = getMaxCnWeekOfYear(date)
    const currentIsoWeekDay = getIsoWeekDay(date)

    if (week === minWeek) {
      if (currentIsoWeekDay < firstIsoWeekDay) {
        return startOfYearDay
      }

      return startOfYearDay.add(currentIsoWeekDay - firstIsoWeekDay, 'd')
    }

    if (week === maxWeek) {
      if (currentIsoWeekDay > lastIsoWeekDay) {
        return endOfYearDay
      }

      return endOfYearDay.add(currentIsoWeekDay - lastIsoWeekDay, 'd')
    }

    return date.add(
      (week - getCnWeek(firstIsoWeekDay, getDayOfYear(date))) * 7,
      'd'
    )
  }

  function getMaxCnWeekOfYear(date: dayjs.Dayjs) {
    const startOfYearDay = date.startOf('y')
    const endOfYearDay = date.endOf('y')

    return getCnWeek(getIsoWeekDay(startOfYearDay), getDayOfYear(endOfYearDay))
  }

  function getCnWeek(firstIsoWeekDay: number, currentDay: number) {
    return Math.ceil((currentDay + firstIsoWeekDay - 1) / 7)
  }

  function getIsoWeekDay(date: dayjs.Dayjs) {
    return date.day() || 7
  }

  function getIsoStartOf(date: dayjs.Dayjs, startOf = true) {
    return startOf
      ? date.date(date.date() - (getIsoWeekDay(date) - 1)).startOf('d')
      : date.date(date.date() - 1 - (getIsoWeekDay(date) - 1) + 7).endOf('d')
  }

  function getIsoEndOf(date: dayjs.Dayjs) {
    return getIsoStartOf(date, false)
  }

  function getDayOfYear(date: dayjs.Dayjs) {
    return (
      Math.round(
        (dayFactory(date).startOf('d').valueOf() -
          dayFactory(date).startOf('y').valueOf()) /
          864e5
      ) + 1
    )
  }
}

export default cnWeekPlugin
