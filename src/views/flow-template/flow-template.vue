<template>
    <div class="flow-template"
      id="pipelineCanvas"
      ref="pipelineCanvas">
      <div class="top-content">
        流程图示例
      </div>
      <div class="main-content">
        <div class="left">
          <menubar></menubar>
        </div>
        <div class="right" id="flow-contain">
          <NodeCanvas id="nodeCanvas"></NodeCanvas>
          <NodeTemplate />
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import module from './flow-template.js';
  export default {
    ...module
  };
</script>

<style lang="stylus" src="./flow-template.styl" scoped></style>

