<template>
  <div class="define-component">
    <section class="user-info">
      <div class="title">
        <p>简介</p>
      </div>
      <div class="info">
        <p><a href="https://cn.vuejs.org/v2/guide/components.html" target="_blank">组件 (Component) </a>是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素，
          Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以表现为用 is 特性进行了扩展的原生 HTML 元素。
        </p>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
};
</script>

<style lang="stylus">
.define-component {
  min-height: 500px;
  line-height: 24px;
  .user-info {
    font-size: 14px;
    background: #fafafa;
    margin-bottom: 20px;
    .title {
      background: #f0f1f3;
      height: 36px;
      line-height: 36px;
      p {
        display inline-block;
        height: 16px;
        line-height 16px;
        margin: 0 6px 0px 12px;
        padding-left: 6px;
        border-left: solid 4px #057ab8;
        vertical-align middle;
      }
    }
    .info {
      padding: 10px 20px;  
    }
  }
}
</style>


