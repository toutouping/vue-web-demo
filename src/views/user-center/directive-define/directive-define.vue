<template>
  <div class="directive-define">
    <section class="user-info">
      <div class="title">
        <p>简介</p>
      </div>
      <div class="info">
        <p><a href="https://cn.vuejs.org/v2/guide/custom-directive.html" target="_blank">指令 (directive) </a>代码复用和抽象的主要形式是组件。然而，有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。</p>
      </div>
    </section>
  </div>
</template>


<script type="text/ecmascript-6">
  export default {
  };
</script>

<style lang="stylus">
  .directive-define {
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
