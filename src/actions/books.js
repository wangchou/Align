import {
  CHANGE_BOOK_PAGE,
  GOTO_TODAY_PAGE
} from './actionTypes';

export const changeBookPage = (bookId, time) => ({
  type: CHANGE_BOOK_PAGE,
  bookId,
  time
});


export const gotoTodayPage = () => ({
  type: GOTO_TODAY_PAGE
});
