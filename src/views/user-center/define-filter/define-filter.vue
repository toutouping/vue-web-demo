<template>
  <div class="define-filter">
    <section class="user-info">
      <div class="title">
        <p>简介</p>
      </div>
      <div class="info">
        <p><a href="https://cn.vuejs.org/v2/guide/filters.html" target="_blank">过滤器 (filter) </a>Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：双花括号插值和 v-bind 表达式 (后者从 2.1.0+ 开始支持)。
          过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示</p>
        <script id="codeFilter" type="text/template">
          <!-- 在双花括号中 -->
          { { message | capitalize } }
          <!-- 在 `v-bind` 中 -->
          <div v-bind:id="rawId | formatId"></div>
        </script>
        <vue-markdown :source="codeFilter" v-highlight></vue-markdown>
      </div>
    </section>
  </div>
</template>


<script type="text/ecmascript-6">
  import VueMarkdown from 'vue-markdown';
  export default {
    data () {
      return {
        codeFilter: ''
      };
    },
    mounted () {
      this.codeFilter = document.getElementById('codeFilter').innerHTML;
    },
    components: {
      'vue-markdown': VueMarkdown
    }
  };
</script>

<style lang="stylus">
  .define-filter {
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
