import moment from 'moment'
import {
  getTitleFormatI18n,
  getThisTitleFormatI18n,
  getStatusTitleFormatI18n,
} from '../i18n'
import {
  CHECKED_CHECKBOX1,
  EMPTY_CHECKBOX1,
  MONTH_UNIT,
  WEEK_UNIT,
  DAY_UNIT,
  YEAR_BOOK_ID,
  MONTH_BOOK_ID,
  WEEK_BOOK_ID,
  DAY_BOOK_ID,
  YEAR_PAGE_ID_FORMAT,
  MONTH_PAGE_ID_FORMAT,
  WEEK_PAGE_ID_FORMAT,
  DAY_PAGE_ID_FORMAT,
} from '../constants'

export const getTime = (book, shift = 0) => moment(book.time)
  .add(shift, book.unit)
  .format()

export const getPageTitle = (bookId, time) => {
  const generalTitle = moment(time).format(getTitleFormatI18n(bookId))
  const now = (bookId === WEEK_BOOK_ID) ? getStartOfWeekTime() : getNow()
  const nowTitle = moment(now).format(getTitleFormatI18n(bookId))
  if(nowTitle === generalTitle) {
    return moment(now).format(getThisTitleFormatI18n(bookId))
  }
  return generalTitle
}

export const getBookPageTitle = (book, shift = 0) => getPageTitle(
  book.id,
  moment(book.time).add(shift, book.unit)
)

export const getPageId = (bookId, time, pageIdFormat) => `${bookId}-${time.format(pageIdFormat)}`

export const getBookPageId = (book, shift = 0) => getPageId(
  book.id,
  moment(book.time).add(shift, book.unit),
  book.pageIdFormat
)

export const getStartOfWeekTime = () => moment().startOf('isoweek').format()

export const getNow = () => moment().format()

export const getNowStatusTitle = (bookId) => moment(bookId === WEEK_BOOK_ID ? getStartOfWeekTime() : getNow())
  .format(getStatusTitleFormatI18n(bookId))

export const getNowPageId = (book) => {
  const time = (book.id === WEEK_BOOK_ID) ? getStartOfWeekTime() : getNow()
  return getPageId(book.id, moment(time), book.pageIdFormat)
}

export const getTimeFromPageId = (pageId) => {
  const array = pageId.split('-')
  const bookId = array[0]
  const timeString = array[1]
  if(bookId === YEAR_BOOK_ID) return moment(timeString, YEAR_PAGE_ID_FORMAT)
  if(bookId === MONTH_BOOK_ID) return moment(timeString, MONTH_PAGE_ID_FORMAT)
  if(bookId === WEEK_BOOK_ID) return moment(timeString, WEEK_PAGE_ID_FORMAT)
  if(bookId === DAY_BOOK_ID) return moment(timeString, DAY_PAGE_ID_FORMAT)
  return null
}

export const getMonthChildPageIds = (yearPageId) => {
  const yearTime = getTimeFromPageId(yearPageId)
  const shifts = [...Array(12).keys()]
  return shifts.map( shift => {
    let monthTime = moment(yearTime).add(shift, MONTH_UNIT)
    return getPageId(MONTH_BOOK_ID, monthTime, MONTH_PAGE_ID_FORMAT)
  })
}

export const getWeekChildPageIds = (monthPageId) => {
  const monthTime = getTimeFromPageId(monthPageId)
  const monthStr = monthTime.format('M')
  const weekPageIds = []
  weekTime = monthTime.startOf('isoweek')
  if(weekTime.format('M') !== monthStr) { weekTime.add(1, WEEK_UNIT) }

  while(weekTime.format('M') === monthStr) {
    weekPageIds.push(getPageId(WEEK_BOOK_ID, weekTime, WEEK_PAGE_ID_FORMAT))
    weekTime.add(1, WEEK_UNIT)
  }

  return weekPageIds
}

export const getDayChildPageIds = (weekPageId) => {
  const weekTime = getTimeFromPageId(weekPageId)
  const shifts = [...Array(7).keys()]
  return shifts.map( shift => {
    let dayTime = moment(weekTime).add(shift, DAY_UNIT)
    return getPageId(DAY_BOOK_ID, dayTime, DAY_PAGE_ID_FORMAT)
  })
}

export const getChildPageIds = (parentPageId) => {
  const array = parentPageId.split('-')
  const bookId = array[0]
  const timeString = array[1]
  if(bookId === YEAR_BOOK_ID) return getMonthChildPageIds(parentPageId)
  if(bookId === MONTH_BOOK_ID) return getWeekChildPageIds(parentPageId)
  if(bookId === WEEK_BOOK_ID) return getDayChildPageIds(parentPageId)
  return []
}

export const getCheckboxCount = (text) => {

  let checkedCount = 0
  let emptyCount = 0
  if(text) {
    for (let i = 0; i < text.length; i += 1) {
      const ch = text.charAt(i)
      if (ch === CHECKED_CHECKBOX1) {
        checkedCount++
      }
      if (ch === EMPTY_CHECKBOX1) {
        emptyCount++
      }
    }
  }
  return { checkedCount, emptyCount }
}
