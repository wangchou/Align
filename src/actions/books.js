import {
  GOTO_PAGE,
  GOTO_TODAY_PAGE
} from './actionTypes';

export const changeBookPage = (bookId, time) => ({
  type: GOTO_PAGE,
  bookId,
  time
});


export const gotoTodayPage = () => ({
  type: GOTO_TODAY_PAGE
});
