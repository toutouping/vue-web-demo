const atomList = {
  namespaced: true,
  state: {
    singleAtom: [],
    subAtom: [],
    searchAtomResult: []
  },
  mutations: {
    setSingleAtom (state, data) {
      state.singleAtom = [...data];
    },
    setSubAtom (state, data) {
      state.subAtom = [...data];
    },
    searchAtom (state, payload) {
      const dict = {
        'tasknode': 'singleAtom',
        'subflow': 'subAtom'
      };
      const data = state[dict[payload.type]];
      const reg = new RegExp(payload.text);

      state.searchAtomResult = data.filter(item => {
        return payload.exclude.indexOf(item.id) === -1 && reg.test(item.name);
      });
    }
  },
  actions: {
  },
  getters: {
    singleAtomGrouped (state) {
      const primaryData = state.singleAtom;
      const groups = [];
      const atomGrouped = [];

      primaryData.forEach(item => {
        const type = item.group_name;
        const index = groups.indexOf(type);

        if (index > -1) {
          atomGrouped[index].list.push(item);
        } else {
          const newGroup = {
            type,
            group_name: item.group_name,
            group_icon: item.group_icon,
            list: [item]
          };

          groups.push(type);
          atomGrouped.push(newGroup);
        }
      });

      return [...atomGrouped];
    }
  }
};

export default atomList;
