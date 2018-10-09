<template>
  <div class="login" :class="'bg' + random" @keydown.stop="keydownFn" @click.stop="hideLangFn">
    <div class="f-content" :class="'right-bg' + random">
      <div class="detail">
        <div class="r-form">
          <div class="f-title">
            <span class="user">用户登录</span>
          </div>
          <div class="content-wrapper">
            <span class="arrow"></span>
            <div class="f-input">
              <section class="input-content">
                <label class="icon user-icon">
                  <i class="icon-uniF0F0F9"></i>
                </label>
                <div class="input-wrapper">
                  <input type="text" name="user" v-model="userName" class="user" :placeholder="'admin'">
                </div>
              </section>
              <section class="input-content">
                <label class="icon psw-icon">
                  <i class="icon-uniF13EF9"></i>
                </label>
                <div class="input-wrapper">
                  <input type="password" name="psw" v-model="password" class="psw" :placeholder="'123456'">
                </div>
              </section>
            </div>
          </div>
          <p class="reme">
            <input type="checkbox"  id="saveUsername" name="reme-input">
            <label for="saveUsername" class="saveUsername" @click="rememberFn">
              <i class="checkbox" :class="{'checkbox-checked': rememberFlag}"></i>
              记住用户名
            </label>
          </p>
          <a @click="loginFn" class="login-btn">登录</a>
          <p class="err-message">{{errMessage}}</p>
        </div>

      </div>
    </div>
    <div class="r-header">
      <a href="">帮助中心</a>
      <a href="">企业官网</a>
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


