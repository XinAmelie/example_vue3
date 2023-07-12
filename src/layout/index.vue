<template>
  <div class="app-wrapper" :class="[$store.getters.siderbarOpened? 'opensidebar': 'hideSidebar']">
    <!-- 左侧 menu -->
    <Siderbar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{backgroundColor:$store.getters.cssVar.menuBg }"

    />
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部的 navbar -->
        <Navbar />
        <!--tags区域-->
        <TagsView></TagsView>
      </div>

      <!-- 内容区 -->
      <appmain></appmain>
    </div>
  </div>
</template>

<script setup>
import Siderbar from './components/Sidebar'
import Navbar from '@/layout/components/Navbar'
import appmain from './components/AppMain'
import variables from '@/styles/variables.module.scss'
import TagsView from '@/components/tagsView'

</script>

<style scoped lang="scss">

</style>
