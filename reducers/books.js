import moment from 'moment';
import {
  CHANGE_BOOK_PAGE
} from '../actions/actionTypes';

const momentStr     = moment().format();
const weekMomentStr = moment().startOf('isoweek').format();
const intitialState = {
  byId: {
    "year book": {
      id: "year book",
      momentStr,
      unit: "year",
      titleFormat: "YYYY年",
      dataKeyFormat: "YYYY",
    },
    "month book": {
      id: "month book",
      momentStr,
      unit: "month",
      titleFormat: "YYYY年 M月",
      dataKeyFormat: "YYYY MMM",
    },
    "week book": {
      id: "week book",
      momentStr: weekMomentStr,
      unit: "weeks",
      titleFormat: "M月 D日 ddd ~ (第W週)",
      dataKeyFormat: "YYYY MM DD",
    },
    "day book": {
      id: "day book",
      momentStr,
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
      const bookModel = state.byId[action.bookId];
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.bookId]: {
            ...bookModel,
            momentStr: action.momentStr
          }
        }
      }
  }
  return state;
}
