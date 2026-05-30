import type dayjs from 'dayjs'
import type { PluginFunc } from 'dayjs'

export interface CnWeekInfo {
  week: number
  start: dayjs.Dayjs
  end: dayjs.Dayjs
}

export type CnWeekValue = number | string

declare module 'dayjs' {
  interface Dayjs {
    cnWeek(): CnWeekInfo
    cnWeek(weekVal: CnWeekValue): dayjs.Dayjs
  }
}

const cnWeekPlugin: PluginFunc = (_option, dayClass, dayFactory) => {
  const proto = dayClass.prototype

  proto.cnWeek = function (this: dayjs.Dayjs, weekVal?: CnWeekValue) {
    const startOfYearDay = this.startOf('y')
    const firstIsoWeekDay = getIsoWeekDay(startOfYearDay)

    const endOfYearDay = this.endOf('y')
    const lastIsoWeekDay = getIsoWeekDay(endOfYearDay)

    if (typeof weekVal !== 'undefined') {
      const normalizedWeekVal = parseInt(String(weekVal))

      if (Number.isNaN(normalizedWeekVal)) {
        return this
      }

      const minWeek = 1
      const maxWeek = getCnWeek(firstIsoWeekDay, getDayOfYear(endOfYearDay))
      const nowIsoWeekDay = getIsoWeekDay(this)

      if (normalizedWeekVal === minWeek) {
        if (nowIsoWeekDay < firstIsoWeekDay) {
          return startOfYearDay
        }

        return startOfYearDay.add(nowIsoWeekDay - firstIsoWeekDay, 'd')
      }

      if (normalizedWeekVal === maxWeek) {
        if (nowIsoWeekDay > lastIsoWeekDay) {
          return endOfYearDay
        }

        return endOfYearDay.add(nowIsoWeekDay - lastIsoWeekDay, 'd')
      }

      if (normalizedWeekVal > minWeek && normalizedWeekVal < maxWeek) {
        return this.add((normalizedWeekVal - this.cnWeek().week) * 7, 'd')
      }

      if (normalizedWeekVal < minWeek) {
        const preYear = this.subtract(1, 'y')
        const preYearMaxWeek = getCnWeek(
          getIsoWeekDay(preYear.startOf('y')),
          getDayOfYear(preYear.endOf('y'))
        )

        return preYear.cnWeek(preYearMaxWeek + normalizedWeekVal)
      }

      if (normalizedWeekVal > maxWeek) {
        const nextYear = this.add(1, 'y')

        return nextYear.cnWeek(normalizedWeekVal - maxWeek)
      }

      return this
    }

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

  function getCnWeek(firstIsoWeekDay: number, currentDay: number) {
    return Math.ceil((currentDay + firstIsoWeekDay - 1) / 7)
  }

  function getIsoWeekDay(date: dayjs.Dayjs) {
    return date.day() || 7
  }

  function getIsoStartOf(date: dayjs.Dayjs, startOf = true) {
    return startOf
      ? date.date(date.date() - (getIsoWeekDay(date) - 1)).startOf('d')
      : date
          .date(date.date() - 1 - (getIsoWeekDay(date) - 1) + 7)
          .endOf('d')
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
