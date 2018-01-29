// 当前tab
export const getSysHomeCurrentTab = state => {
  return state.sysSetting.homeCurrentTab || [];
};

// 已打开的tabs
export const getSysHomeTabs = state => {
  return state.sysSetting.homeTabs || [];
};

// 当前tab
export const getUserHomeCurrentTab = state => {
  return state.userCenter.homeCurrentTab || [];
};

// 已打开的tabs
export const getUserHomeTabs = state => {
  return state.userCenter.homeTabs || [];
};
