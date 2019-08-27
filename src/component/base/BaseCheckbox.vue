<template>
    <div class="base-checkbox" @click.stop="onCheck">
        <span :class="['checkbox', { checked: checked }]">
        </span>
        <slot></slot>
    </div>
</template>
<script>
    export default {
      name: 'BaseCheckbox',
      props: ['isChecked'],
      data () {
        return {
          checked: this.isChecked || false
        };
      },
      watch: {
        isChecked (val) {
          this.checked = val;
        }
      },
      methods: {
        onCheck () {
          this.checked = !this.checked;
          this.$emit('checkCallback', this.checked);
        }
      }
    };
</script>
<style lang="stylus" scoped>
@import 'src/scss/config.styl';
.base-checkbox {
    display: inline-block;
    .checkbox {
        display: inline-block;
        position: relative;
        width: 14px;
        height: 14px;
        line-height: 14px;
        color: $whiteDefault;
        font-size: 12px;
        border: 1px solid $formBorderColor;
        border-radius: 2px;
        text-align: center;
        cursor: pointer;
        &:hover {
            border-color: $greyDark;
        }
        &.checked {
            background: $blueDefault;
            border-color: $blueDefault;
            &::after {
                content: "";
                position: absolute;
                left: 2px;
                top: 2px;
                height: 4px;
                width: 8px;
                border-left: 1px solid;
                border-bottom: 1px solid;
                border-color: $whiteDefault;
                transform: rotate(-45deg);
            }
        }
    }
}

</style>
