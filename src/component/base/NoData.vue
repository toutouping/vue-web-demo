<template>
    <div class="no-data-wrapper">
        <div class="no-data">
            <i class="common-icon-no-data"></i>
            <p class="no-data-wording">
                <slot>{{ message || i18n.no_data }}</slot>
            </p>
        </div>
    </div>
</template>
<script>
    export default {
      name: 'NoData',
      props: {
        message: {
          type: String,
          default () {
            return '';
          }
        }
      },
      data () {
        return {
          i18n: {
            no_data: window.gettext('无数据')
          }
        };
      }
    };
</script>
<style lang="stylus" scoped>
    .no-data-wrapper {
        display: table;
        width: 100%;
        height: 100%;
        color: #999999;
        background: #ffffff;
    }
    .no-data {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }
    .common-icon-no-data {
        font-size: 40px;
    }
    .no-data-wording {
        margin-top: 20px;
        font-size: 14px;
    }
</style>
