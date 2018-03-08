import {
  YEAR_BOOK_ID,
  MONTH_BOOK_ID,
  WEEK_BOOK_ID,
  DAY_BOOK_ID,
} from '../constants'

export default [
  YEAR_BOOK_ID,
  MONTH_BOOK_ID,
  WEEK_BOOK_ID,
  DAY_BOOK_ID,
].reduce((Keys, bookId) => ({
  ...Keys,
  [bookId]: {
    titleFormat: `${bookId}_pageTitleFormat`,
    statusTitleFormat: `${bookId}_statusTitleFormat`,
    thisTitleFormat: `${bookId}_thisTitleFormat`,
    numOfLines: `${bookId}_numOfLines`,
  },
}), {})
