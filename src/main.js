import Vue from 'vue';
import router from './router'; // 路由相关配置
import VueProgressBar from 'vue-progressbar';  // 进度条
import i18n from 'src/lang'; // 国际化
import Element from 'element-ui'; // 引入element-ui组件
import 'element-ui/lib/theme-chalk/index.css'; // 引入element-ui的样式
import store from 'src/store/index.js';
import directive from 'src/directive'; // 引入自定义指令
import App from './App';
import 'common/stylus/index.styl';
import jquery from 'jquery';

Vue.config.productionTip = false;  // 关闭生产模式下给出的提示

Vue.use(VueProgressBar, { // 进度条
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
});
Vue.use(directive);
Vue.use(Element, {// 注册Element组件
  i18n: (key, value) => i18n.t(key, value)
});

window.jquery = window.$ = jquery;
if (typeof window.gettext !== 'function') {
  window.gettext = function gettext (string) {
    return string;
  };
}

/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  store,
  el: '#app', //  相当于 new Vue({}).$mount('#app');
  template: '<App/>', // 1、可以通过在 #app 内加入<app></app>替代 2、或者 通过 render: h => h(App) 渲染一个视图，然后提供给el挂载
  components: { // vue2中可以通过 render: h => h(App) 渲染一个视图，然后提供给el挂载
    App
  }
});
