import {
  YEAR_BOOK_ID,
  MONTH_BOOK_ID,
  WEEK_BOOK_ID,
  DAY_BOOK_ID,
} from '../../constants';
import Keys from '../keys';

export default {
  [Keys[YEAR_BOOK_ID].titleFormat]: 'YYYY',
  [Keys[MONTH_BOOK_ID].titleFormat]: 'MMM YYYY',
  [Keys[WEEK_BOOK_ID].titleFormat]: 'MMM Do YYYY ～ ([week] W)',
  [Keys[DAY_BOOK_ID].titleFormat]: 'MMM Do YYYY (ddd)',
};
