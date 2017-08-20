import moment from 'moment';
import {
  CHANGE_BOOK_PAGE
} from '../actions/actionTypes';

const now = moment().format();
const startOfWeek = moment().startOf('isoweek').format();
const intitialState = {
  byId: {
    "year book": {
      id: "year book",
      time: now, // bookmark time
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
  }
  return state;
}
