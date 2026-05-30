import dayjs from 'dayjs'
import cnWeek, { type CnWeekInfo } from '../src'

dayjs.extend(cnWeek)

const weekInfo: CnWeekInfo = dayjs('2024-02-29').cnWeek()
const currentWeek: number = weekInfo.week
const weekStart: dayjs.Dayjs = weekInfo.start
const weekEnd: dayjs.Dayjs = weekInfo.end
const movedByNumber: dayjs.Dayjs = dayjs('2024-02-29').cnWeek(10)
const movedByString: dayjs.Dayjs = dayjs('2024-02-29').cnWeek('10')

currentWeek.toFixed()
weekStart.format('YYYY-MM-DD')
weekEnd.format('YYYY-MM-DD')
movedByNumber.format('YYYY-MM-DD')
movedByString.format('YYYY-MM-DD')
