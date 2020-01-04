<template>
    <div class="jsplumb-learn">
      <div class="menu-content">
        <node-menu ref="nodeMenu" @add-node="addNodeFn"></node-menu>
      </div>
      <draggable :group="{ name: 'people', put: false }" class="flex-container">
        <div id="flowContainer" class="flow-container">
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
</template>
<script type="text/ecmascript-6">
  import module from './jsplumb-learn.js';
  export default {
    ...module
  };
</script>

<style scoped lang="stylus" src="./jsplumb-learn.styl"></style>
