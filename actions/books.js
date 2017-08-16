import {
  CHANGE_BOOK_PAGE
} from './actionTypes';

export const changeBookPage = (bookId, momentStr) => ({
  type: CHANGE_BOOK_PAGE,
  bookId,
  momentStr
});
