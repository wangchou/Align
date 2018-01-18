import {
  YEAR_BOOK_ID,
  MONTH_BOOK_ID,
  WEEK_BOOK_ID,
  DAY_BOOK_ID,
} from '../../constans';
import { getTitleFormatI18nKey } from '../utils';

export default {
  [getTitleFormatI18nKey(YEAR_BOOK_ID)]: 'YYYY年',
  [getTitleFormatI18nKey(MONTH_BOOK_ID)]: 'YYYY年 M月',
  [getTitleFormatI18nKey(WEEK_BOOK_ID)]: 'M月 D日 ddd ~ (第W週)',
  [getTitleFormatI18nKey(DAY_BOOK_ID)]: 'M月 D日 (ddd)',
};
