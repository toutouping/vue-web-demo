<template>
  <div class="node-menu">
    <el-menu :default-openeds="defaultOpeneds">
      <!-- 菜单可拖拽 -->
       <draggable :sort="false"
          v-model="menuList"
          :group="{ name: 'draggableNodeGroup', put: false }"
          :options="draggableOptions"
          @end="addNodeFn"
          @choose="beginMoveFn">
          <el-submenu v-for="menu in menuList"
            :key="menu.id"
            :index="menu.id"
            :type="menu.type">
              <template slot="title">
                <span :title="menu.name">
                  <i :class="menu.ico"></i>
                </span>
              </template>
          </el-submenu>
       </draggable>
    </el-menu>
  </div>
</template>
<script type="text/ecmascript-6">
  import module from './node-menu.js';
  export default {
    ...module
  };
</script>

<style scoped lang="stylus" src="./node-menu.styl"></style>
