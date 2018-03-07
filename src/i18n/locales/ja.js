import {
  YEAR_BOOK_ID,
  MONTH_BOOK_ID,
  WEEK_BOOK_ID,
  DAY_BOOK_ID,
  DONE_BUTTON,
} from '../../constants'
import Keys from '../keys'

export default {
  [Keys[YEAR_BOOK_ID].titleFormat]: 'YYYY年',
  [Keys[MONTH_BOOK_ID].titleFormat]: 'YYYY年 M月',
  [Keys[WEEK_BOOK_ID].titleFormat]: 'M月 D日～ (第W週)',
  [Keys[DAY_BOOK_ID].titleFormat]: 'M月 D日 (dddd)',
  [Keys[YEAR_BOOK_ID].statusTitleFormat]: 'YYYY年',
  [Keys[MONTH_BOOK_ID].statusTitleFormat]: 'M月',
  [Keys[WEEK_BOOK_ID].statusTitleFormat]: 'M月D日～',
  [DONE_BUTTON]: '完了',
}
