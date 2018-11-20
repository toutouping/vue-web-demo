<template> <!-- 首页头部 -->
  <header class="header">
    <a href="" class="logo-content">
      VUE案例系统
    </a>
    <el-menu :default-active="activeSysIndex" class="sys-menu" mode="horizontal" @select="handleSelect">
      <el-menu-item index="sysSetting">配置管理</el-menu-item>
      <el-menu-item index="companyHelp">企业帮助</el-menu-item>
    </el-menu>
    <el-dropdown @command="userOperationFn" class="user">
      <i class="user-icon"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">注销</el-dropdown-item>
        <el-dropdown-item command="help">企业帮助</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </header>
</template>

<script type="text/ecmascript-6">
  import store from 'src/vuex/store.js';

  export default {
    data () {
      return {
        showMenuFlag: true
      };
    },
    created () {
      let lang = localStorage.getItem('langulage') || 'zh';

      // this.$i18n.locale = lang;
      store.state.lang = lang;
    },
    computed: {
      activeSysIndex () {
        return this.$route.path && this.$route.path.length > 1 ? this.$route.path.slice(1) : 'settingManage';
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        switch (key) {
          case 'sysSetting':
            this.$router.push({path: '/sysSetting'});
            break;
          case 'companyHelp':
            this.$router.push({path: '/companyHelp'});
            break;
        }
      },
      userOperationFn (command) {
        switch (command) {
          case 'help':
            this._helpFn();
            break;
          case 'logout':
            this._logoutFn();
            break;
        }
      },
      _helpFn () {
        this.$router.push({path: '/companyHelp'});
      },
      _logoutFn () {
        store.state.isLogin = false;
        window.location.href = 'index.html';
        // this.$router.push('/login');
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .header {
    position: fixed;
    top: 0;
    z-index: 1020;
    box-sizing: border-box;
    padding: 0 20px;
    width: 100%;
    height: 55px;
    line-height: 55px;
    background-color: #fff;
    border-bottom: 1px solid #c2cfd6;
    .logo-content {
      font-size: 18px;
      color: #36a2cd;
      font-weight: bold;
      .logo {
        margin-right: 5px;
      }
    }
    .sys-menu {
      display: inline-block;
      margin-left: 150px;
      height: 100%;
      vertical-align: top;
      border-bottom: 1px solid #c2cfd6;
      li {
        height: 100%;
      }
    }
    .toggle-menu {
      font-size: 18px;
      color: #697f8a;
      margin-left: 60px;
      cursor: pointer;
      &:hover {
        color: #455056;
      }
    }
    .user {
      position: absolute;
      top: 10px;
      right: 30px;
      width: 30px;
      height: 30px;
      .user-icon {
        display: inline-block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-image: url('./user-logo.png');
        background-repeat: no-repeat;
        background-size: 100%;
        cursor: pointer;
      }
    }
  }
</style>
