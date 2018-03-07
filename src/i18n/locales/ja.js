import {
  YEAR_BOOK_ID,
  MONTH_BOOK_ID,
  WEEK_BOOK_ID,
  DAY_BOOK_ID,
  DONE_BUTTON,
  YEAR_KEY,
  MONTH_KEY,
  WEEK_KEY,
  DAY_KEY,
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
  [YEAR_KEY]: '年',
  [MONTH_KEY]: '月',
  [WEEK_KEY]: '週',
  [DAY_KEY]: '日',
  [Keys[YEAR_BOOK_ID].thisTitleFormat]: '今年',
  [Keys[MONTH_BOOK_ID].thisTitleFormat]: '今月',
  [Keys[WEEK_BOOK_ID].thisTitleFormat]: '今週 (M月 D日～)',
  [Keys[DAY_BOOK_ID].thisTitleFormat]: '今天 (dddd)',
}
