import Vue from 'vue';
import VueI18n from 'vue-i18n';  // 国际化
import elementEnLocale from 'element-ui/lib/locale/lang/en';
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN';
import {getLanguage} from 'common/js/util.js';
import enLocale from './en';
import zhLocale from './zh';

Vue.use(VueI18n); // 国际化

const i18n = new VueI18n({
  locale: getLanguage() || 'zh',
  messages: {
    en: {
      ...enLocale, // require('common/lang/en.js'),
      ...elementEnLocale
    },
    zh: {
      ...zhLocale, // require('common/lang/zh.js'),
      ...elementZhLocale
    }
  }
});

export default i18n;
