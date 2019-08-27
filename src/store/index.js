import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules/index.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLogin: true, // 判断是否已经登录,
    lang: 'zh',
    sysSetting: {
      homeCurrentTab: 'none',
      currentTab: {},
      tabIndex: 0,
      homeTabs: []
    },
    userCenter: {
      homeCurrentTab: 'none',
      currentTab: {},
      tabIndex: 0,
      homeTabs: []
    }
  },
  mutations: {
    saveLogin (state) {
      state.isLogin = true;
    },
    SYS_ADD_TAB (state, menuNode) { // 增加页签
      let hasThisTab = false;
      let len = state.sysSetting.homeTabs.length;

      for (var i = 0; i < len; i++) { // 判断页签是否已经打开过
        if (state.sysSetting.homeTabs[i].id === menuNode.menuId) {
          state.sysSetting.homeCurrentTab = state.sysSetting.homeTabs[i].name;
          state.sysSetting.currentTab = state.sysSetting.homeTabs[i];
          state.sysSetting.homeTabs[i].timestamp = new Date().getTime();
          hasThisTab = true;
          break;
        }
      }

      if (!hasThisTab) {
        let menuName = state.lang === 'zh' ? menuNode.menuNameCn : menuNode.menuNameEn;

        state.sysSetting.currentTab = {
          id: menuNode.menuId,
          name: menuNode.menuId,
          title: menuName,
          component: menuNode.comp,
          url: menuNode.url,
          timestamp: new Date().getTime()
        };

        state.sysSetting.homeTabs.push(state.sysSetting.currentTab);
        state.sysSetting.homeCurrentTab = menuNode.menuId;
        ++state.sysSetting.tabIndex;
      }
    },
    SYS_CLICK_TAB (state, target) {// 点击页签
      let tabs = state.sysSetting.homeTabs;
      let activeName = state.sysSetting.homeCurrentTab;

      tabs.forEach((tab, index) => {
        if (tab.name === target.name) {
          activeName = tab.name;
          state.sysSetting.currentTab = tab;
          tab.timestamp = new Date().getTime(); // 更新该tab的时间戳
        }
      });
      state.sysSetting.homeCurrentTab = activeName;
    },
    SYS_REMOVE_TAB (state, targetName) {// 删除页签
      let tabs = state.sysSetting.homeTabs;
      let activeName = state.sysSetting.homeCurrentTab;

      tabs.forEach((tab, index) => {
        if (activeName === targetName) {// 删除的是当前打开的
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];

            if (nextTab) {
              activeName = nextTab.name;
              state.sysSetting.currentTab = nextTab;
            }
          }
        }
      });
      state.sysSetting.homeCurrentTab = activeName;
      state.sysSetting.homeTabs = tabs.filter(tab => tab.name !== targetName);
    },
    USER_ADD_TAB (state, menuNode) { // 增加页签
      let hasThisTab = false;
      let len = state.userCenter.homeTabs.length;

      for (var i = 0; i < len; i++) { // 判断页签是否已经打开过
        if (state.userCenter.homeTabs[i].id === menuNode.menuId) {
          state.userCenter.homeCurrentTab = state.userCenter.homeTabs[i].name;
          state.userCenter.currentTab = state.userCenter.homeTabs[i];
          state.userCenter.homeTabs[i].timestamp = new Date().getTime();
          hasThisTab = true;
          break;
        }
      }

      if (!hasThisTab) {
        let menuName = state.lang === 'zh' ? menuNode.menuNameCn : menuNode.menuNameEn;

        state.userCenter.currentTab = {
          id: menuNode.menuId,
          name: menuNode.menuId,
          title: menuName,
          component: menuNode.comp,
          url: menuNode.url,
          timestamp: new Date().getTime()
        };

        state.userCenter.homeTabs.push(state.userCenter.currentTab);
        state.userCenter.homeCurrentTab = menuNode.menuId;
        ++state.userCenter.tabIndex;
      }
    },
    USER_CLICK_TAB (state, target) {// 点击页签
      let tabs = state.userCenter.homeTabs;
      let activeName = state.userCenter.homeCurrentTab;

      tabs.forEach((tab, index) => {
        if (tab.name === target.name) {
          activeName = tab.name;
          state.userCenter.currentTab = tab;
          tab.timestamp = new Date().getTime(); // 更新该tab的时间戳
        }
      });
      state.userCenter.homeCurrentTab = activeName;
    },
    USER_REMOVE_TAB (state, targetName) {// 删除页签
      let tabs = state.userCenter.homeTabs;
      let activeName = state.userCenter.homeCurrentTab;

      tabs.forEach((tab, index) => {
        if (activeName === targetName) {// 删除的是当前打开的
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];

            if (nextTab) {
              activeName = nextTab.name;
              state.userCenter.currentTab = nextTab;
            }
          }
        }
      });
      state.userCenter.homeCurrentTab = activeName;
      state.userCenter.homeTabs = tabs.filter(tab => tab.name !== targetName);
    }
  },
  getters: {
        // 当前tab
    getSysHomeCurrentTab (state) {
      return state.sysSetting.homeCurrentTab || [];
    },
        // 已打开的tabs
    getSysHomeTabs (state) {
      return state.sysSetting.homeTabs || [];
    },
        // 当前tab
    getUserHomeCurrentTab (state) {
      return state.userCenter.homeCurrentTab || [];
    },
        // 已打开的tabs
    getUserHomeTabs (state) {
      return state.userCenter.homeTabs || [];
    }
  },
  actions: {// 增加页签 ，参数：{name:'',path:'',comp:''}
    sysAddTab ({commit}, target) {
      commit('SYS_ADD_TAB', target);
    },
    // 删除页签
    sysRemoveTab ({commit}, targetName) {
      commit('SYS_REMOVE_TAB', targetName);
    },
    // 点击页签
    sysClickTab ({commit}, targetName) {
      commit('SYS_CLICK_TAB', targetName);
    },
    // 增加页签 ，参数：{name:'',path:'',comp:''}
    userAddTab ({commit}, target) {
      commit('USER_ADD_TAB', target);
    },
    // 删除页签
    userRemoveTab ({commit}, targetName) {
      commit('USER_REMOVE_TAB', targetName);
    },
    // 点击页签
    userClickTab ({commit}, targetName) {
      commit('USER_CLICK_TAB', targetName);
    }
  },
  modules
});

export default store;
