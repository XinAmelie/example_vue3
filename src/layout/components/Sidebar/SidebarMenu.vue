<template>
  <!-- 一级 menu 菜单 -->
      <el-menu
        :uniqueOpened="true"
        default-active="2"
        :background-color="$store.getters.cssVar.menuBg"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="!$store.getters.siderbarOpened"
        router
      >
        <!--        // 具体菜单项目-->
        <el-menu-item index="/profile">
          <el-icon><Avatar></Avatar></el-icon>
          <span>个人中心</span>
        </el-menu-item>
<!--        // 有子集的菜单-->
        <el-sub-menu index="/user">
          <template #title>
            <el-icon><Avatar></Avatar></el-icon>
            <span>用户</span>
          </template>
            <el-menu-item index="/user/manage">员工管理</el-menu-item>
            <el-menu-item index="/user/roulelist">角色列表</el-menu-item>
        </el-sub-menu>

          <el-sub-menu index="/art">
            <template #title>
              <el-icon><Avatar></Avatar></el-icon>
              <span>文章</span>
            </template>
            <el-menu-item index="/art/artdetail">文章详情</el-menu-item>
            <el-menu-item index="/art/artcreate/editor">文章创作</el-menu-item>
          </el-sub-menu>

      </el-menu>
  </template>
<script setup>
import { Avatar } from '@element-plus/icons'
</script>

<style scoped>

</style>
