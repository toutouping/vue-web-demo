<template>
    <div class="base-collapse">
        <div :class="['header-wrapper', { actived: showContent }]" @click="onHeaderClick">
            <slot name="header"></slot>
            <i class="common-icon-arrow-down toggle-arrow"></i>
        </div>
        <div class="content-wrapper clearfix" v-show="showContent">
            <slot name="content"></slot>
        </div>
    </div>
</template>
<script>
    export default {
      name: 'BaseCollapse',
      props: {
        isCollapse: {
          type: Boolean,
          default: true
        }
      },
      data () {
        return {
          showContent: !this.isCollapse
        };
      },
      watch: {
        isCollapse (val) {
          this.showContent = !val;
        }
      },
      methods: {
        onHeaderClick () {
          this.showContent = !this.showContent;
        }
      }
    };
</script>
<style lang="stylus" scoped>
    @import 'src/scss/config.styl';
    .base-collapse {
        .header-wrapper {
            position: relative;
            padding: 0 24px;
            height: 50px;
            line-height: 50px;
            background: $blueDashBg;
            border-bottom: 1px solid $commonBorderColor;
            cursor: pointer;
            &:hover {
                background: $blueDarkBg;
            }
            &:first-child {
                border-top: 1px solid $commonBorderColor;
            }
            &.actived {
                .toggle-arrow {
                    transform: rotate(-180deg);
                }
            }
        }
        .toggle-arrow {
            position: absolute;
            font-size: 12px;
            top: 20px;
            right: 20px;
            transition: transform 0.2s ease-in-out;
        }
        .content-wrapper {
            padding: 10px;
        }
    }
</style>
