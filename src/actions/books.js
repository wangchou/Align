import {
  CHANGE_BOOK_PAGE
} from './actionTypes';

export const changeBookPage = (bookId, time) => ({
  type: CHANGE_BOOK_PAGE,
  bookId,
  time
});
