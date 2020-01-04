<template>
  <div class="node-menu">
    <el-menu :default-openeds="defaultOpeneds">
      <el-submenu :index="menu.id" v-for="menu in menuList" :key="menu.id">
          <template slot="title">
              <i :class="menu.ico"></i>
              <span>{{menu.name}}</span>
          </template>
          <!-- 可拖拽二级菜单 -->
          <el-menu-item-group>
            <draggable :sort="false" @end="addNodeFn" @choose="beginMoveFn"
              v-model="menu.children" :group="{ name: 'people', put: false }" :options="draggableOptions">
              <el-menu-item v-for="son in menu.children"
                :key="son.id"
                :index="son.id"
                :type="son.type">
                <i :class="son.ico"></i>{{son.name}}
              </el-menu-item>
            </draggable>
          </el-menu-item-group>
      </el-submenu>
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
