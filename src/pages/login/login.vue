<template>
  <div class="login" :class="'bg' + random" @keydown.stop="keydownFn" @click.stop="hideLangFn">
    <div class="f-content" :class="'right-bg' + random">
      <div class="detail">
        <div class="r-form">
          <div class="f-title">
            <span class="user">{{$t('login.userLogin')}}</span>
            <span class="lang" @click.stop="showLangFn">
              {{$t('login.languageDesc')}}
              <i class="down" :class="{'el-icon-arrow-down': !langFlag , 'el-icon-arrow-up': langFlag}"></i>
              <ul v-show="langFlag" class="lang-list">
                <li><a @click="changeLangFn('zh')">{{$t('login.chinese')}}</a></li>
                <li><a @click="changeLangFn('en')">{{$t('login.english')}}</a></li>
              </ul>
            </span>
          </div>
          <div class="content-wrapper">
            <span class="arrow"></span>
            <div class="f-input">
              <section class="input-content">
                <label class="icon user-icon">
                  <i class="icon-uniF0F0F9"></i>
                </label>
                <div class="input-wrapper">
                  <input type="text" name="user" v-model="userName" class="user" :placeholder="$t('login.username')">
                </div>
              </section>
              <section class="input-content">
                <label class="icon psw-icon">
                  <i class="icon-uniF13EF9"></i>
                </label>
                <div class="input-wrapper">
                  <input type="password" name="psw" v-model="password" class="psw" :placeholder="$t('login.password')">
                </div>
              </section>
            </div>
          </div>
          <p class="reme">
            <input type="checkbox"  id="saveUsername" name="reme-input">
            <label for="saveUsername" class="saveUsername" @click="rememberFn">
              <i class="checkbox" :class="{'checkbox-checked': rememberFlag}"></i>
              {{$t('login.remember')}}
            </label>
          </p>
          <a @click="loginFn" class="login-btn">{{$t('login.loginBtn')}}</a>
          <p class="err-message">{{errMessage}}</p>
        </div>

      </div>
    </div>
    <div class="r-header">
      <a href="">{{$t('login.helpCenter')}}</a>
      <a href="">{{$t('login.cialWebsite')}}</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import login from './login.js';
  export default {
    ...login
  };
</script>

<style lang="stylus" src="./login.styl" scoped></style>


