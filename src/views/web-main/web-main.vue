<template>
<div class="web-main">
  <header class="header">
    <a href="" class="logo-content">
      <span class="logo icon-uniF0ADF9"></span>系统管理
    </a>
    <span @click.stop="toggleMenu" class="toggle-menu icon-uniF0CAF9"></span>
    <el-dropdown @command="userOperationFn" class="user">
      <i class="user-icon"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="setting">设置</el-dropdown-item>
        <el-dropdown-item command="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </header>
  <el-container class="main-wrapper">
    <!-- :class="{'hide-menu-wrapper': !showMenuFlag}" -->
    <transition name="aside-menu">
      <el-aside v-show="showMenuFlag" class="main-aside" width="200px">
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened>
              <template
                  v-for="(item, index) in menuList"
                  v-if="!item.hidden">
                  <el-submenu
                      v-if="item.children.length > 0"
                      :index="index + ''">
                      <template slot="title">
                          <i :class="item.iconCls"></i>
                          {{ item.menuNameCn }}
                      </template>
                      <el-menu-item
                          v-for="(child, key) in item.children"
                          :key = "key"
                          :index="child.url"
                          v-if="!child.hidden">
                          {{ child.menuNameCn }}
                      </el-menu-item>
                  </el-submenu>
                  <el-menu-item v-if="!item.children.length > 0" :index="index + ''">
                    <i :class="item.iconCls"></i>
                    {{ item.menuNameCn }}
                  </el-menu-item>
              </template>
          </el-menu>
        </el-aside>
    </transition>
    <el-main>
      main
    </el-main>
  </el-container>
</div>
</template>

<script type="text/ecmascript-6">
import webMain from './web-main.js';
export default {
  ...webMain
};
</script>

<style lang="stylus" src="./web-main.styl" scoped></style>
