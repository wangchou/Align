import {
  YEAR_BOOK_ID,
  MONTH_BOOK_ID,
  WEEK_BOOK_ID,
  DAY_BOOK_ID,
  DONE_BUTTON,
} from '../../constants'
import Keys from '../keys'

export default {
  [Keys[YEAR_BOOK_ID].titleFormat]: 'YYYY',
  [Keys[MONTH_BOOK_ID].titleFormat]: 'MMM YYYY',
  [Keys[WEEK_BOOK_ID].titleFormat]: 'MMM Do ～ ([week] W)',
  [Keys[DAY_BOOK_ID].titleFormat]: 'MMM Do (ddd)',
  [DONE_BUTTON]: 'Done',
}
