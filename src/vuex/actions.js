// 增加页签 ，参数：{name:'',path:'',comp:''}
const addTab = ({commit}, target) => {
  commit('ADD_TAB', target);
};

// 删除页签
const removeTab = ({commit}, targetName) => {
  commit('REMOVE_TAB', targetName);
};

// 点击页签
const clickTab = ({commit}, targetName) => {
  commit('CLICK_TAB', targetName);
};

export {
  addTab,
  removeTab,
  clickTab
};
