<template>
  <div class="app">
    <template v-if="$route.name ==='login'">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </template>
    <template v-if="$route.name !=='login'">
      <c-header></c-header>
      <!-- <keep-alive> 是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM -->
      <div class="router-wrapper">
        <keep-alive><router-view v-if="$route.meta.keepAlive"></router-view></keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </template>
    <!-- set progressbar -->
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import cHeader from 'views/header/header';

export default {
  name: 'app',
  components: {
    cHeader
  }
};
</script>

<style lang="stylus" scoped>
  .app{
    width: 100%;
    height: 100%;
    .router-wrapper {
      margin-top: 55px;
    }
  }
</style>
