<template>
    <div
      ref="node"
      class="node-content"
      :id="node.id"
      :class="node.type"
      :style="nodeContainerStyle"
      @mouseenter="mouseEnter=true"
      @mouseleave="mouseEnter=false"
      @mouseup="changeNodePosition">
        <!-- 启动节点 -->
        <template v-if="node.type === 'start'">
          <div class="start-inner node-inner">
            <i class="el-icon-video-play"></i>
          </div>
        </template>
        <!-- 结束节点 -->
        <template v-else-if="node.type === 'end'">
          <div class="end-inner node-inner">
            <i class="el-icon-video-play"></i>
          </div>
        </template>
        <!-- 任务 -->
        <template v-else-if="node.type === 'task'">
          <div class="task-inner node-inner">
            <i :class="nodeIcoClass"></i>
            {{node.name}}
          </div>
        </template>
    </div>
</template>

<script type="text/ecmascript-6">
  import module from './node.js';
  export default {
    ...module
  };
</script>

<style lang="stylus" src="./node.styl" scoped></style>
