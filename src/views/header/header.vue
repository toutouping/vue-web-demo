<template> <!-- 首页头部 -->
  <header class="header">
    <a href="" class="logo-content">
      {{$t('header.sysName')}}
    </a>
    <el-menu :default-active="activeSysIndex" class="sys-menu" mode="horizontal" @select="handleSelect">
      <el-menu-item index="sysSetting">{{$t('header.settingManage')}}</el-menu-item>
      <el-menu-item index="userCenter">{{$t('header.userCenter')}}</el-menu-item>
      <el-menu-item index="companyHelp">{{$t('header.companyHelp')}}</el-menu-item>
      <el-menu-item index="jsplumbLearn">学习jsplumb</el-menu-item>
      <el-menu-item index="flowTemplate">流程模板</el-menu-item>
    </el-menu>
    <el-dropdown @command="userOperationFn" class="user">
      <i class="user-icon"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">{{$t('header.logout')}}</el-dropdown-item>
        <el-dropdown-item command="setting">{{$t('header.setting')}}</el-dropdown-item>
        <el-dropdown-item command="zh">{{$t('header.zh')}}</el-dropdown-item>
        <el-dropdown-item command="en">{{$t('header.en')}}</el-dropdown-item>
        <el-dropdown-item command="help">{{$t('header.help')}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </header>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        showMenuFlag: true
      };
    },
    created () {
      // let lang = localStorage.getItem('langulage') || 'zh';
      let lang = 'zh';

      this.$i18n.locale = lang;
      this.$store.state.lang = lang;
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
          case 'userCenter':
            this.$router.push({path: '/userCenter'});
            break;
          case 'companyHelp':
            this.$router.push({path: '/companyHelp'});
            break;
          case 'jsplumbLearn':
            this.$router.push({path: '/jsplumbLearn'});
            break;
          case 'flowTemplate':
            this.$router.push({path: '/flowTemplate'});
            break;
        }
      },
      userOperationFn (command) {
        switch (command) {
          case 'help':
            this._helpFn();
            break;
          case 'setting':
            this._settingFn();
            break;
          case 'logout':
            this._logoutFn();
            break;
          case 'zh':
            localStorage.setItem('langulage', 'zh');
            this.$store.state.lang = 'zh';
            this.$router.go(0);
            break;
          case 'en':
            localStorage.setItem('langulage', 'en');
            this.$store.state.lang = 'en';
            this.$router.go(0);
            break;
        }
      },
      _settingFn () {
        console.log('setting');
      },
      _helpFn () {
        console.log('help');
      },
      _logoutFn () {
        this.$store.state.isLogin = false;
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
