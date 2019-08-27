const templateList = {
  namespaced: true,
  state: {
    templateListData: [],
    commonTemplateData: []
  },
  mutations: {
    setTemplateListData (state, payload) {
      const {list, isCommon} = payload;

      if (isCommon) {
        state.commonTemplateData = list;
      } else {
        state.templateListData = list;
      }
    }
  },
  actions: {
  },
  getters: {}
};

export default templateList;
