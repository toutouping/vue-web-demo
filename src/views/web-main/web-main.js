import Vue from 'vue';
import api from 'api';
import store from 'common/js/store.js';

export default {
  data () {
    return {
      menuList: [],
      showMenuFlag: true
    };
  },
  created () {
    api.getMenuList().then((res) => {
      this.menuList = res.data;
    });
  },
  methods: {
    toggleMenu () {
      this.showMenuFlag = !this.showMenuFlag;
    },
    userOperationFn (command) {
      switch (command) {
        case 'setting':
          this._settingFn();
          break;
        case 'logout':
          this._logoutFn();
          break;
      }
    },
    _settingFn () {
      console.log('setting');
    },
    _logoutFn () {
      store.state.isLogin = false;
      this.$router.push('/login');
    }
  },
  computed: {

  }
};
