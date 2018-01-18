import I18n, { getLanguages } from 'react-native-i18n';
import moment from 'moment';
import en from './locales/en';
import zh from './locales/zh';
import ja from './locales/ja';
import { getTitleFormatI18nKey } from './utils';

getLanguages().then((languages) => {
  if (languages[0].startsWith('ja')) {
    moment.locale(
      'ja',
      { weekdays: ['日', '月', '火', '水', '木', '金', '土'] },
    );
  }
  if (languages[0].startsWith('zh')) {
    moment.locale(
      'zh',
      { weekdays: ['日', '一', '二', '三', '四', '五', '六'] },
    );
  }
});

I18n.fallbacks = true;

I18n.translations = {
  en,
  zh,
  ja,
};

export const getTitleFormatI18n = bookId => I18n.t(getTitleFormatI18nKey(bookId));

export default I18n;
