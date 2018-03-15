import immutable from 'object-path-immutable'
import {
  ACTION,
  YEAR_BOOK_ID,
  MONTH_BOOK_ID,
  WEEK_BOOK_ID,
  DAY_BOOK_ID,
  YEAR_PAGE_ID_FORMAT,
  MONTH_PAGE_ID_FORMAT,
  WEEK_PAGE_ID_FORMAT,
  DAY_PAGE_ID_FORMAT,
  YEAR_UNIT, MONTH_UNIT, WEEK_UNIT, DAY_UNIT,
} from '../constants'
import {
  getNow,
  getStartOfWeekTime,
  getPageId,
} from 'utils'

const now = getNow()
const startOfWeek = getStartOfWeekTime()
export const intitialState = {
  byId: {
    [YEAR_BOOK_ID]: {
      id: YEAR_BOOK_ID,
      currentPageId: getPageId(YEAR_BOOK_ID, now),
    },
    [MONTH_BOOK_ID]: {
      id: MONTH_BOOK_ID,
      currentPageId: getPageId(MONTH_BOOK_ID, now),
    },
    [WEEK_BOOK_ID]: {
      id: WEEK_BOOK_ID,
      currentPageId: getPageId(WEEK_BOOK_ID, startOfWeek),
    },
    [DAY_BOOK_ID]: {
      id: DAY_BOOK_ID,
      currentPageId: getPageId(DAY_BOOK_ID, now),
    },
  },
  ids: [
    YEAR_BOOK_ID,
    MONTH_BOOK_ID,
    WEEK_BOOK_ID,
    DAY_BOOK_ID,
  ],
}

export default (state = intitialState, action) => {
  switch (action.type) {
    case ACTION.GOTO_PAGE:
      return immutable.set(state, ['byId', action.payload.bookId, 'currentPageId'], action.payload.pageId)
  }
  return state
}
