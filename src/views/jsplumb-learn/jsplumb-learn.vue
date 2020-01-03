<template>
    <div class="text">
        <div id="flowContainer" class="flow-container">
            <template v-for="node in (data && data.nodeList) || []">
                <div class="w" style="width: 30px; height: 30px; background: red;"
                    :id="node.id"
                    :key="node.id"
                    :node="node"></div>
            </template>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import module from './jsplumb-learn.js';
  export default {
    ...module
  };
</script>

<style scoped lang="stylus" src="./jsplumb-learn.styl"></style>
