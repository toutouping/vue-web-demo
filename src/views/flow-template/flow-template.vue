<template>
    <div class="flow-template">
      <div class="top-content">
        流程图示例
      </div>
      <div class="main-content">
        <div class="left">
          <node-menu ref="nodeMenu" @add-node="addNodeFn"></node-menu>
        </div>
        <draggable class="right"
          :group="{ name: 'draggableNodeGroup', put: false }">
          <div id="flow-contain" class="flow-contain">
            <template v-for="node in (data && data.nodeList) || []">
                <node
                  v-show="node.show"
                  :id="node.id"
                  :node="node"
                  @change-node-site="changeNodeSite">
                </node>
            </template>
          </div>
        </draggable>
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

