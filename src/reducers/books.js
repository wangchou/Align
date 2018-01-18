import immutable from 'object-path-immutable'
import {
  GOTO_PAGE,
  YEAR_BOOK_ID,
  MONTH_BOOK_ID,
  WEEK_BOOK_ID,
  DAY_BOOK_ID,
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
      unit: 'year',
      dataKeyFormat: 'YYYY',
    },
    [MONTH_BOOK_ID]: {
      id: MONTH_BOOK_ID,
      time: now,
      unit: 'month',
      dataKeyFormat: 'YYYY MMM',
    },
    [WEEK_BOOK_ID]: {
      id: WEEK_BOOK_ID,
      time: startOfWeek,
      unit: 'weeks',
      dataKeyFormat: 'YYYY W',
    },
    [DAY_BOOK_ID]: {
      id: DAY_BOOK_ID,
      time: now,
      unit: 'day',
      dataKeyFormat: 'YYYY MMM DD',
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
