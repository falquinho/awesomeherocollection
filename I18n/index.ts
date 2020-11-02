import I18n from 'react-native-i18n';
import pt from './locales/pt';
import en from './locales/en';

I18n.fallbacks = true;
I18n.translations = { en, pt };

export default I18n;