import moment from 'moment'
import { getTitleFormatI18n } from '../i18n'
import { WEEK_BOOK_ID } from '../constants'

export const getTime = (book, shift = 0) => moment(book.time)
  .add(shift, book.unit)
  .format()


export const getPageTitle = (book, shift = 0) => moment(book.time)
  .add(shift, book.unit)
  .format(getTitleFormatI18n(book.id))

export const getPagePageId = (book, shift = 0) => `${book.id}-${moment(book.time)
  .add(shift, book.unit)
  .format(book.pageIdFormat)}`

export const getStartOfWeekTime = () => moment().startOf('isoweek').format()

export const getNow = () => moment().format()

export const getNowPageTitle = (bookId) => moment(bookId === WEEK_BOOK_ID ? getStartOfWeekTime() : getNow())
  .format(getTitleFormatI18n(bookId))
