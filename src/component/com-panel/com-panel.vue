<template>
  <div class="com-panel">
    <div class="header" @click="toggle" >{{title}}</div>
    <div class="content" ref="panel" v-show="showDetail">
      <div class="detail">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        height: '',
        showDetail: false
      };
    },
    props: {
      type: {
        type: String,
        default: 'normal'
      },
      show: {
        type: Boolean,
        default: true
      },
      title: {
        type: String
      }
    },
    created () {
      this.showDetail = this.show;
    },
    ready () {
      this.init();
    },
    methods: {
      toggle (event) {
        if (this.type !== 'normal') {
          this.showDetail = !this.showDetail;
          this.$emit('toggle', event);
        }
      },
      init () {
        if (this.type === 'normal') {
          this.show = true;
        } else {
          let target = this.$refs.panel;

          target.style.display = 'block';
          target.style.height = target.getBoundingClientRect().height + 'px';
          if (!this.show) target.style.display = 'none';
        }
      }
    }
  };
</script>

<style lang="stylus">
  .com-panel {
    border: 1px solid #ddd;
    border-bottom: 0;
    background-color: #fff;  
    .header {
      padding: 0 .5rem;
      line-height: 2.5;
      color: rgba(0,0,0,.87);
      background-color: #f5f5f5;
      border-bottom: 1px solid #ddd;
      cursor: pointer;
    }
    .content {
      -webkit-transition: height .3s ease;
      transition: height .3s ease;
      overflow: hidden;    
      border-bottom: 1px solid #ddd;
      .detail {
        padding: 10px;
      }
    }
  }
</style>
