import moment from 'moment'
import { getTitleFormatI18n } from '../i18n'
import {
  CHECKED_CHECKBOX1,
  EMPTY_CHECKBOX1,
  MONTH_UNIT,
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


export const getPageTitle = (book, shift = 0) => moment(book.time)
  .add(shift, book.unit)
  .format(getTitleFormatI18n(book.id))

export const getPageId = (bookId, time, pageIdFormat) => `${bookId}-${time.format(pageIdFormat)}`

export const getBookPageId = (book, shift = 0) => getPageId(
  book.id,
  moment(book.time).add(shift, book.unit),
  book.pageIdFormat
)

export const getStartOfWeekTime = () => moment().startOf('isoweek').format()

export const getNow = () => moment().format()

export const getNowPageTitle = (bookId) => moment(bookId === WEEK_BOOK_ID ? getStartOfWeekTime() : getNow())
  .format(getTitleFormatI18n(bookId))

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

export const getCheckboxCount = (text) => {
  let checkedCheckboxCount = 0
  let emptyCheckboxCount = 0
  for (let i = 0; i < text.length; i += 1) {
    const ch = text.charAt(i)
    if (ch === CHECKED_CHECKBOX1) {
      checkedCheckboxCount++
    }
    if (ch === EMPTY_CHECKBOX1) {
      emptyCheckboxCount++
    }
  }
  return { checkedCheckboxCount, emptyCheckboxCount }
}
