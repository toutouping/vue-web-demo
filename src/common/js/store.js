import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: true // 判断是否已经登录
  },
  mutations: {
    saveLogin (state) {
      state.isLogin = true;
    }
  }
});
