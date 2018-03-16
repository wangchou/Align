import immutable from 'object-path-immutable'
import {
  getNow,
  getStartOfWeekTime,
  getPageId,
} from 'utils'
import {
  ACTION,
  YEAR_BOOK_ID,
  MONTH_BOOK_ID,
  WEEK_BOOK_ID,
  DAY_BOOK_ID,
} from '../constants'

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
