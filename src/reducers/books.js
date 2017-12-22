import moment from 'moment';
import {
  CHANGE_BOOK_PAGE,
  GOTO_TODAY_PAGE
} from '../actions/actionTypes';
import {
  getNow,
  getStartOfWeekTime
} from '../utils/books';

const now = getNow();
const startOfWeek = getStartOfWeekTime();
const intitialState = {
  byId: {
    "year book": {
      id: "year book",
      time: now, // bookmark time string
      unit: "year",
      titleFormat: "YYYY年",
      dataKeyFormat: "YYYY",
    },
    "month book": {
      id: "month book",
      time: now,
      unit: "month",
      titleFormat: "YYYY年 M月",
      dataKeyFormat: "YYYY MMM",
    },
    "week book": {
      id: "week book",
      time: startOfWeek,
      unit: "weeks",
      titleFormat: "M月 D日 ddd ~ (第W週)",
      dataKeyFormat: "YYYY MM DD",
    },
    "day book": {
      id: "day book",
      time: now,
      unit: "day",
      titleFormat: "M月 D日 ddd",
      dataKeyFormat: "YYYY MMM DD",
    }
  },
  bookshelfIds: ["year book", "month book", "week book", "day book"]
};

export default (state = intitialState, action) => {
  switch (action.type) {
    case CHANGE_BOOK_PAGE:
      const book = state.byId[action.bookId];
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.bookId]: {
            ...book,
            time: action.time
          }
        }
      }
    case GOTO_TODAY_PAGE:
      const newById = { ...state.byId };
      state.bookshelfIds.forEach(bookId => {
        if (newById[bookId].unit !== 'weeks') {
          newById[bookId].time = getNow();
        } else {
          newById[bookId].time = getStartOfWeekTime();
        }
      });
      return {
        ...state,
        byId: newById
      };
  }
  return state;
}
