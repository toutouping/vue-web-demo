// 增加页签 ，参数：{name:'',path:'',comp:''}
const sysAddTab = ({commit}, target) => {
  commit('SYS_ADD_TAB', target);
};

// 删除页签
const sysRemoveTab = ({commit}, targetName) => {
  commit('SYS_REMOVE_TAB', targetName);
};

// 点击页签
const sysClickTab = ({commit}, targetName) => {
  commit('SYS_CLICK_TAB', targetName);
};

// 增加页签 ，参数：{name:'',path:'',comp:''}
const userAddTab = ({commit}, target) => {
  commit('USER_ADD_TAB', target);
};

// 删除页签
const userRemoveTab = ({commit}, targetName) => {
  commit('USER_REMOVE_TAB', targetName);
};

// 点击页签
const userClickTab = ({commit}, targetName) => {
  commit('USER_CLICK_TAB', targetName);
};

export {
  sysAddTab,
  sysRemoveTab,
  sysClickTab,
  userAddTab,
  userRemoveTab,
  userClickTab
};
