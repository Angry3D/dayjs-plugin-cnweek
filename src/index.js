export default (option, dayClass, dayFactory) => {
  const proto = dayClass.prototype

  proto.cnWeek = function (weekVal) {
    const startOfYearDay = this.startOf('y')
    const firstIsoWeekDay = _getIsoWeekDay(startOfYearDay)

    const endOfYearDay = this.endOf('y')
    const lastIsoWeekDay = _getIsoWeekDay(endOfYearDay)

    if (!this.$utils().u(weekVal)) {
      // 规整化 weekVal
      weekVal = parseInt(weekVal)
      if (isNaN(weekVal)) {
        return this
      }
      const minWeek = 1,
        maxWeek = _getCnWeek(
          firstIsoWeekDay,
          _getDayOfYear(endOfYearDay, dayFactory)
        )
      const nowIosWeekDay = _getIsoWeekDay(this)
      if (weekVal == minWeek) {
        // 等于最小周
        if (nowIosWeekDay < firstIsoWeekDay) {
          return startOfYearDay
        }
        return startOfYearDay.add(nowIosWeekDay - firstIsoWeekDay, 'd')
      } else if (weekVal == maxWeek) {
        // 等于最大周
        if (nowIosWeekDay > lastIsoWeekDay) {
          return endOfYearDay
        }
        return endOfYearDay.add(nowIosWeekDay - lastIsoWeekDay, 'd')
      } else if (weekVal > minWeek && weekVal < maxWeek) {
        // 处于最小周和最大周之间
        return this.add((weekVal - this.cnWeek().week) * 7, 'd')
      } else if (weekVal < minWeek) {
        // 小于最小周
        const preYear = this.subtract(1, 'y')
        const preYearMaxWeek = _getCnWeek(
          _getIsoWeekDay(preYear.startOf('y')),
          _getDayOfYear(preYear.endOf('y'), dayFactory)
        )
        return preYear.cnWeek(preYearMaxWeek + weekVal)
      } else if (weekVal > maxWeek) {
        // 大于最大周
        const nextYear = this.add(1, 'y')
        return nextYear.cnWeek(weekVal - maxWeek)
      }
      return this
    }

    // current
    const curMs = this.valueOf()
    // first week
    const fwStartDay = startOfYearDay,
      fwEndDay = _getIosEndOf(startOfYearDay),
      fwStartMs = fwStartDay.valueOf(),
      fwkEndMs = fwEndDay.valueOf()

    // last week
    const lwStartDay = _getIsoStartOf(endOfYearDay),
      lwEndDay = endOfYearDay,
      lwStartMs = lwStartDay.valueOf(),
      lwEndMs = lwEndDay.valueOf()

    const week = _getCnWeek(firstIsoWeekDay, _getDayOfYear(this, dayFactory))
    let start, end
    if (curMs >= fwStartMs && curMs <= fwkEndMs) {
      // 判断是否为第一周
      start = fwStartDay
      end = fwEndDay
    } else if (curMs >= lwStartMs && curMs <= lwEndMs) {
      // 判断是否为最后一周
      start = lwStartDay
      end = lwEndDay
    } else {
      // 其余为中间周
      start = _getIsoStartOf(this)
      end = _getIosEndOf(this)
    }

    return {
      week,
      start,
      end
    }
  }

  function _getCnWeek(firstIsoWeekDay, currentDay) {
    return Math.ceil((currentDay + firstIsoWeekDay - 1) / 7)
  }

  function _getIsoWeekDay(dayjs) {
    return dayjs.day() || 7
  }

  function _getIsoStartOf(dayjs, startOf) {
    const utils = dayjs.$utils()
    const isStartOf = !utils.u(startOf) ? startOf : true
    return isStartOf
      ? dayjs.date(dayjs.date() - (_getIsoWeekDay(dayjs) - 1)).startOf('d')
      : dayjs
          .date(dayjs.date() - 1 - (_getIsoWeekDay(dayjs) - 1) + 7)
          .endOf('d')
  }
  function _getIosEndOf(dayjs) {
    return _getIsoStartOf(dayjs, false)
  }

  function _getDayOfYear(dayjs, d) {
    return (
      Math.round((d(dayjs).startOf('d') - d(dayjs).startOf('y')) / 864e5) + 1
    )
  }
}
