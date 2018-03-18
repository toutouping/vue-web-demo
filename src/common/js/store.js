import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    saveLogin(state) { // 记录登录状态
      state.isLogin = true;
    }
  }
});
