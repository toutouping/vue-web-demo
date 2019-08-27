<template>
    <div class="list-wrapper-title">
        <span class="list-wrapper-border">|</span>
        <span class="list-wrapper-name">{{ title }}</span>
    </div>
</template>

<script>
    export default {
      name: 'BaseTitle',
      props: ['title']
    };
</script>

<style lang='scss' scoped>
.list-wrapper-title {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #dde4eb;
    .list-wrapper-border {
        color:#a3c5fd;
    }
    .list-wrapper-name {
        margin-left: 10px;
        font-size: 14px;
        font-weight:600;
        color: #313238;
    }
}
</style>
