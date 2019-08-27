import Vue from 'vue';
import {mapActions, mapGetters} from 'vuex';
import userApi from 'api/user';

export default {
  data () {
    return {
      lang: this.$i18n.locale, // 当前语言
      menuList: [], // 菜单集合
      showMenuFlag: true, // 是否展示菜单
      isCollapse: false // 是否折叠菜单
    };
  },
  mounted () {
    this.$Progress.start(); // 显示进度条 http://hilongjw.github.io/vue-progressbar/index.html
    userApi.getUserMenuList().then((res) => {
      this.menuList = res.data;
      this.$Progress.finish();
    });
  },
  methods: {
    ...mapActions([ // https://vuex.vuejs.org/zh-cn/actions.html
      'userAddTab',
      'userRemoveTab',
      'userClickTab'
    ])
  },
  computed: {
    ...mapGetters([ // https://vuex.vuejs.org/zh-cn/getters.html
      'getUserHomeCurrentTab',
      'getUserHomeTabs'
    ]),
    currentMenu () {
      return this.$store.state.userCenter.homeCurrentTab;
    }
  },
  components: {
    directiveInlay: () => import('views/user-center/directive-inlay/directive-inlay.vue'),
    directiveDefine: () => import('views/user-center/directive-define/directive-define.vue'),
    defineFilter: () => import('views/user-center/define-filter/define-filter.vue'),
    defineComponent: () => import('views/user-center/define-component/define-component.vue')
  }
};
