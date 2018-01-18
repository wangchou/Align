import {
  YEAR_BOOK_ID,
  MONTH_BOOK_ID,
  WEEK_BOOK_ID,
  DAY_BOOK_ID,
} from '../../constans';
import { getTitleFormatI18nKey } from '../utils';

export default {
  [getTitleFormatI18nKey(YEAR_BOOK_ID)]: 'YYYY',
  [getTitleFormatI18nKey(MONTH_BOOK_ID)]: 'MMM YYYY',
  [getTitleFormatI18nKey(WEEK_BOOK_ID)]: 'MMM Do YYYY ～ ([week] W)',
  [getTitleFormatI18nKey(DAY_BOOK_ID)]: 'MMM Do YYYY (ddd)',
};
