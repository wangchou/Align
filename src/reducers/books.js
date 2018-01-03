import moment from 'moment';
import {
  GOTO_PAGE,
  GOTO_TODAY_PAGE
} from '../actions';
import {
  getNow,
  getStartOfWeekTime
} from '../utils/books';
import immutable from 'object-path-immutable'

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
  ids: ["year book", "month book", "week book", "day book"]
};

export default (state = intitialState, action) => {
  switch (action.type) {
    case GOTO_PAGE:
      return immutable.set(state, ["byId", action.bookId, "time"], action.time);
    case GOTO_TODAY_PAGE:
      const newById = { ...state.byId };
      state.ids.forEach(bookId => {
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