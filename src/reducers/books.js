import immutable from 'object-path-immutable';
import {
  GOTO_PAGE,
  YEAR_BOOK_ID,
  MONTH_BOOK_ID,
  WEEK_BOOK_ID,
  DAY_BOOK_ID,
} from '../actions';
import {
  getNow,
  getStartOfWeekTime,
} from '../utils/books';

const now = getNow();
const startOfWeek = getStartOfWeekTime();
export const intitialState = {
  byId: {
    [YEAR_BOOK_ID]: {
      id: YEAR_BOOK_ID,
      time: now, // bookmark time string
      unit: 'year',
      titleFormat: 'YYYY年',
      dataKeyFormat: 'YYYY',
    },
    [MONTH_BOOK_ID]: {
      id: MONTH_BOOK_ID,
      time: now,
      unit: 'month',
      titleFormat: 'YYYY年 M月',
      dataKeyFormat: 'YYYY MMM',
    },
    [WEEK_BOOK_ID]: {
      id: WEEK_BOOK_ID,
      time: startOfWeek,
      unit: 'weeks',
      titleFormat: 'M月 D日 ddd ~ (第W週)',
      dataKeyFormat: 'YYYY W',
    },
    [DAY_BOOK_ID]: {
      id: DAY_BOOK_ID,
      time: now,
      unit: 'day',
      titleFormat: 'M月 D日 (ddd)',
      dataKeyFormat: 'YYYY MMM DD',
    },
  },
  ids: [
    YEAR_BOOK_ID,
    MONTH_BOOK_ID,
    WEEK_BOOK_ID,
    DAY_BOOK_ID,
  ],
};

export default (state = intitialState, action) => {
  switch (action.type) {
    case GOTO_PAGE:
      return immutable.set(state, ['byId', action.payload.bookId, 'time'], action.payload.time);
  }
  return state;
};
