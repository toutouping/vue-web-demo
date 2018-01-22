import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';

Vue.use(Vuex);

let state = {
  isLogin: true, // 判断是否已经登录,
  lang: 'zh',
  homeCurrentTab: '0',
  currentTab: {},
  tabIndex: 0,
  homeTabs: []
};

let mutations = {
  saveLogin (state) {
    state.isLogin = true;
  },
  ADD_TAB (state, menuNode) { // 增加页签
    let hasThisTab = false;
    let len = state.homeTabs.length;

    for (var i = 0; i < len; i++) { // 判断页签是否已经打开过
      if (state.homeTabs[i].id === menuNode.menuId) {
        state.homeCurrentTab = state.homeTabs[i].name;
        state.currentTab = state.homeTabs[i];
        state.homeTabs[i].timestamp = new Date().getTime();
        hasThisTab = true;
        break;
      }
    }

    if (!hasThisTab) {
      let newTabName = state.tabIndex + '';
      let menuName = state.lang === 'zh' ? menuNode.menuNameCn : menuNode.menuNameEn;

      console.log(Vue.i18n);
      state.currentTab = {
        id: menuNode.menuId,
        name: newTabName,
        title: menuName,
        component: menuNode.comp,
        url: menuNode.url,
        timestamp: new Date().getTime()
      };

      state.homeTabs.push(state.currentTab);
      state.homeCurrentTab = newTabName;
      ++state.tabIndex;
    }
  },
  CLICK_TAB (state, target) {// 点击页签
    let tabs = state.homeTabs;
    let activeName = state.homeCurrentTab;

    tabs.forEach((tab, index) => {
      if (tab.name === target.name) {
        activeName = tab.name;
        state.currentTab = tab;
        tab.timestamp = new Date().getTime(); // 更新该tab的时间戳
      }
    });
    state.homeCurrentTab = activeName;
  },
  REMOVE_TAB (state, targetName) {// 删除页签
    let tabs = state.homeTabs;
    let activeName = state.homeCurrentTab;

    tabs.forEach((tab, index) => {
      if (activeName === targetName) {// 删除的是当前打开的
        if (tab.name === targetName) {
          let nextTab = tabs[index + 1] || tabs[index - 1];

          if (nextTab) {
            activeName = nextTab.name;
            state.currentTab = nextTab;
          }
        }
      }
    });
    state.homeCurrentTab = activeName;
    state.homeTabs = tabs.filter(tab => tab.name !== targetName);
  }
};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
});
