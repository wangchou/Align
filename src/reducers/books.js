import immutable from 'object-path-immutable'
import {
  GOTO_PAGE,
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
} from '../utils/books'

const now = getNow()
const startOfWeek = getStartOfWeekTime()
export const intitialState = {
  byId: {
    [YEAR_BOOK_ID]: {
      id: YEAR_BOOK_ID,
      time: now, // bookmark time string
      unit: YEAR_UNIT,
      pageIdFormat: YEAR_PAGE_ID_FORMAT,
    },
    [MONTH_BOOK_ID]: {
      id: MONTH_BOOK_ID,
      time: now,
      unit: MONTH_UNIT,
      pageIdFormat: MONTH_PAGE_ID_FORMAT,
    },
    [WEEK_BOOK_ID]: {
      id: WEEK_BOOK_ID,
      time: startOfWeek,
      unit: WEEK_UNIT,
      pageIdFormat: WEEK_PAGE_ID_FORMAT,
    },
    [DAY_BOOK_ID]: {
      id: DAY_BOOK_ID,
      time: now,
      unit: DAY_UNIT,
      pageIdFormat: DAY_PAGE_ID_FORMAT,
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
    case GOTO_PAGE:
      return immutable.set(state, ['byId', action.payload.bookId, 'time'], action.payload.time)
  }
  return state
}
