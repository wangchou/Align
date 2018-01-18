import I18n from 'react-native-i18n';
import en from './locales/en';
import { getTitleFormatI18nKey } from './utils';

I18n.fallbacks = true;

I18n.translations = {
  en,
};

export const getTitleFormatI18n = bookId => I18n.t(getTitleFormatI18nKey(bookId));

export default I18n;
