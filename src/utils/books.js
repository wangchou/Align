import moment from 'moment'
import { getTitleFormatI18n } from '../i18n'

export const getTime = (book, shift = 0) => moment(book.time)
  .add(shift, book.unit)
  .format()


export const getPageTitle = (book, shift = 0) => moment(book.time)
  .add(shift, book.unit)
  .format(getTitleFormatI18n(book.id))

export const getPageDataKey = (book, shift = 0) => `${book.id}-${moment(book.time)
  .add(shift, book.unit)
  .format(book.dataKeyFormat)}`

export const getStartOfWeekTime = () => moment().startOf('isoweek').format()

export const getNow = () => moment().format()

