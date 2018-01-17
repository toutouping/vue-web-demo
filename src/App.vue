<template>
  <div class="app">
    <!-- <keep-alive> 是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM -->
    <keep-alive><router-view v-if="$route.meta.keepAlive"></router-view></keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>

    <!-- set progressbar -->
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
};
</script>

<style lang="stylus" scoped>
  .app{
    width: 100%;
    height: 100%;
  }
</style>
