import Vue from 'vue';
import {mapActions, mapGetters} from 'vuex';
import api from 'api/index';
import store from 'src/vuex/store.js';

export default {
  data () {
    return {
      // lang: this.$i18n.locale, // 当前语言
      menuList: [], // 菜单集合
      showMenuFlag: true, // 是否展示菜单
      isCollapse: false // 是否折叠菜单
    };
  },
  mounted () {
    this.$Progress.start(); // 显示进度条 http://hilongjw.github.io/vue-progressbar/index.html
    api.getSysMenuList().then((res) => {
      this.menuList = res.data;
      this.$Progress.finish();
    });
  },
  methods: {
    ...mapActions([ // https://vuex.vuejs.org/zh-cn/actions.html
      'sysAddTab',
      'sysRemoveTab',
      'sysClickTab'
    ])
  },
  computed: {
    ...mapGetters([ // https://vuex.vuejs.org/zh-cn/getters.html
      'getSysHomeCurrentTab',
      'getSysHomeTabs'
    ])
  },
  components: {
    schollInfo: () => import('views/sys-setting/scholl-info/scholl-info.vue') // 异步组件

  }
};
