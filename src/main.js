import Vue from 'vue';
import App from './App';
import router from './router'; // 路由相关配置
import VueI18n from 'vue-i18n';  // 国际化
import Element from 'element-ui'; // 引入element-ui组件
import VueProgressBar from 'vue-progressbar';  // 进度条
import store from 'src/vuex/store.js';
import 'element-ui/lib/theme-chalk/index.css'; // 引入element-ui的样式
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';

import {getLanguage} from 'common/js/util.js';
import 'common/stylus/index.styl';

Vue.config.productionTip = false;  // 关闭生产模式下给出的提示

Vue.use(VueProgressBar, { // 进度条
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
});

Vue.use(VueI18n); // 国际化
const i18n = new VueI18n({
  locale: getLanguage(),
  messages: {
    en: {
      ...require('common/lang/en.js'),
      ...enLocale
    },
    zh: {
      ...require('common/lang/zh.js'),
      ...zhLocale
    }
  }
});

Vue.use(Element, {// 注册Element组件
  i18n: (key, value) => i18n.t(key, value)
});

/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  store,
  // el: '#app',
  // template: '<App/>',
  // components: {
  //   App
  // }
  render: h => h(App) /* render函数是渲染一个视图，然后提供给el挂载 */
}).$mount('#app');
