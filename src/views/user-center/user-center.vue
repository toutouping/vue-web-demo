<template>
<div class="user-center">
  <el-container class="home-wrapper">
    <!-- :class="{'hide-menu-wrapper': !showMenuFlag}" -->
    <transition name="aside-menu"><!-- 菜单 -->
      <el-aside v-show="showMenuFlag" class="aside-menu" width="200px">
          <el-menu
            :default-active="getUserHomeCurrentTab"
            class="aside-el-menu-vertical"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="isCollapse"
            unique-opened>
              <template
                  v-for="(item, index) in menuList"
                  v-if="!item.hidden">
                  <el-submenu v-if="item.children.length > 0" :index="item.menuId">
                      <template slot="title">
                          <i :class="item.iconCls"></i>
                          <template v-if="lang === 'zh'">{{item.menuNameCn}}</template>
                          <template v-if="lang === 'en'">{{item.menuNameEn}}</template>
                      </template>
                      <el-menu-item
                          v-for="(child, key) in item.children"
                          @click="userAddTab(child)"
                          :key = "key" :index="child.menuId" v-if="!child.hidden">
                            <template v-if="lang === 'zh'">{{child.menuNameCn}}</template>
                            <template v-if="lang === 'en'">{{child.menuNameEn}}</template>
                          </el-menu-item>
                  </el-submenu>
                  <el-menu-item v-if="!item.children.length > 0" @click="userAddTab(item)" :index="item.menuId">
                    <i :class="item.iconCls"></i>
                        <template v-if="lang === 'zh'">{{item.menuNameCn}}</template>
                        <template v-if="lang === 'en'">{{item.menuNameEn}}</template>
                  </el-menu-item>
              </template>
          </el-menu>
        </el-aside>
    </transition>
    <main class="main-wrapper">
      <!-- 导航栏 -->
      <!--<section class="navigation">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </section>-->
      <section class="home-content">
        <transition>
          <el-tabs
          v-if="getUserHomeTabs.length > 0"
          :value="getUserHomeCurrentTab"
          type="card"
          closable
          @tab-remove="userRemoveTab"
          @tab-click="userClickTab">
            <el-tab-pane
                v-for="(item, index) in getUserHomeTabs"
                :label="item.title"
                :name="item.name"
                :key="item.id">
                <component :is="item.component"></component>
            </el-tab-pane>
          </el-tabs>
        </transition>
        <div class="default-page" v-if="getUserHomeTabs.length === 0">
            default-page 默认展示内容
        </div>
      </section>
    </main>
  </el-container>
</div>
</template>

<script type="text/ecmascript-6">
import webMain from './user-center.js';
export default {
  ...webMain
};
</script>

<style lang="stylus" src="./user-center.styl" scoped></style>
