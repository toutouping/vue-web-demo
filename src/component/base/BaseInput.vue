<template>
    <input
        type="text"
        class="base-input"
        ref="baseInput"
        :title="title"
        :value="value"
        :name="name"
        @input="onInput"
        @blur="onBlur"
        @keyup.enter="onKeyupEnter">
</template>
<script>
    export default {
      name: 'BaseInput',
      model: {
        prop: 'value',
        event: 'input'
      },
      props: ['value', 'name', 'title'],
      methods: {
        focus () {
          this.$refs.baseInput.focus();
        },
        select () {
          this.$refs.baseInput.select();
        },
        onInput (e) {
          this.$emit('input', e.target.value);
        },
        onBlur (e) {
          this.$emit('blur', e.target.value);
        },
        onKeyupEnter (e) {
          this.$emit('enter', e.target.value);
        }
      }
    };
</script>
<style lang="stylus" scoped>
@import 'src/scss/config.styl';
.base-input {
    display: inline-block;
    padding: 0 10px;
    width: 100%;
    height: 36px;
    line-height: 36px;
    color: #606266;
    font-size: 14px;
    background: #fff;
    border: 1px solid $commonBorderColor;
    border-radius: 4px;
    outline: 0;
    &:hover {
        border-color: #c0c4cc;
    }
    &:focus {
        border-color: #3c96ff;
    }
    &.disabled {
        color: #aaa;
        background: #fafafa;
        cursor: not-allowed;
    }
}
</style>
